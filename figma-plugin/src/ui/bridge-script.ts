import {
  DEFAULT_VIEWPORT_WIDTH,
  type SerializedDocument,
  type SerializedEffect,
  type SerializedFrameNode,
  type SerializedGradientPaint,
  type SerializedImageAsset,
  type SerializedLayoutMeta,
  type SerializedNode,
  type SerializedPaint,
  type SerializedSvgNode,
  type SerializedTextNode,
  type SerializedTextRange,
} from "../shared/types";
import { parseCssColor } from "./color";
import {
  captureCanvasBytes,
  captureVideoPosterBytes,
  extractImageBytes,
  hashBytes,
  type ExtractedMedia,
} from "./media";
import {
  parseCornerRadii,
  parseCssBackgroundLayers,
  parseCssBoxShadows,
  parseCssGradient,
  resolveBackgroundLayerBox,
  splitTopLevelComma,
} from "./styles";
import { inlineSvgElement } from "./svg-inline";

const CLIP_OVERFLOW_VALUES = new Set(["hidden", "clip", "scroll", "auto"]);
const IGNORED_TAGS = new Set([
  "script",
  "style",
  "noscript",
  "template",
  "link",
  "meta",
  "head",
  "title",
  "base",
  "source",
  "track",
  "option",
  "datalist",
  "param",
  "area",
  "map",
  "col",
  "colgroup",
]);
const NON_INLINE_TEXT_TAGS = new Set([
  "img",
  "svg",
  "canvas",
  "video",
  "iframe",
  "input",
  "textarea",
  "select",
  "button",
  "hr",
]);
const SEMANTIC_TAG_NAMES: Record<string, string> = {
  header: "Header",
  nav: "Nav",
  main: "Main",
  footer: "Footer",
  aside: "Aside",
  form: "Form",
  section: "Section",
  article: "Article",
  ul: "List",
  ol: "List",
  li: "Item",
  img: "Image",
  svg: "SVG",
  canvas: "Canvas",
  video: "Video",
  input: "Input",
  textarea: "Textarea",
  select: "Select",
};
const LANDMARK_TAGS = new Set(["header", "nav", "main", "footer", "aside", "form"]);
const UTILITY_CLASS_RE =
  /^(?:flex|grid|block|inline|hidden|relative|absolute|fixed|sticky|w-|h-|min-|max-|p-|px-|py-|pt-|pr-|pb-|pl-|m-|mx-|my-|mt-|mr-|mb-|ml-|gap-|text-|font-|bg-|border|rounded|items-|justify-|overflow-|opacity-|z-|transition|duration|ease|translate|scale|rotate|inset|top-|right-|bottom-|left-|col-|row-|space-)/;

interface BoxRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface ClipRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface SerializerContext {
  doc: Document;
  win: Window;
  viewportWidth: number;
  scrollX: number;
  scrollY: number;
  assets: Record<string, SerializedImageAsset>;
  urlCache: Map<string, Promise<string | null>>;
  mediaTasks: Array<() => Promise<void>>;
  nextId: (prefix: string) => string;
}

interface TextSegment {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: "normal" | "italic";
  lineHeightPx: number;
  letterSpacingPx: number;
  fills: SerializedPaint[];
  textDecoration: "NONE" | "UNDERLINE" | "STRIKETHROUGH";
  textCase: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";
  href?: string;
}

const truncate = (text: string, maxLen: number): string => {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLen) return normalized;
  return `${normalized.slice(0, maxLen - 1).trimEnd()}…`;
};

const parseOpacity = (raw: string): number => {
  const n = parseFloat(raw);
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 1;
};

const parsePx = (raw: string): number => {
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
};

const parseFontWeight = (raw: string): number => {
  const lower = raw.trim().toLowerCase();
  if (lower === "normal") return 400;
  if (lower === "bold") return 700;
  const n = parseFloat(lower);
  return Number.isFinite(n) ? Math.round(n) : 400;
};

const parseFontStyle = (raw: string): "normal" | "italic" => {
  const lower = raw.trim().toLowerCase();
  return lower === "italic" || lower === "oblique" ? "italic" : "normal";
};

const parseLineHeightPx = (raw: string, fontSize: number): number => {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed || trimmed === "normal") return Math.round(fontSize * 1.2 * 100) / 100;
  const n = parseFloat(trimmed);
  if (!Number.isFinite(n) || n <= 0) return Math.round(fontSize * 1.2 * 100) / 100;
  return trimmed.endsWith("px") ? n : n * fontSize;
};

const parseTextAlign = (raw: string): "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED" => {
  const lower = raw.trim().toLowerCase();
  if (lower === "center" || lower === "-webkit-center") return "CENTER";
  if (lower === "right" || lower === "end" || lower === "-webkit-right") return "RIGHT";
  if (lower === "justify") return "JUSTIFIED";
  return "LEFT";
};

const parseTextDecoration = (raw: string): "NONE" | "UNDERLINE" | "STRIKETHROUGH" => {
  const lower = raw.toLowerCase();
  if (lower.includes("underline")) return "UNDERLINE";
  if (lower.includes("line-through")) return "STRIKETHROUGH";
  return "NONE";
};

const parseTextCase = (raw: string): "ORIGINAL" | "UPPER" | "LOWER" | "TITLE" => {
  const lower = raw.trim().toLowerCase();
  if (lower === "uppercase") return "UPPER";
  if (lower === "lowercase") return "LOWER";
  if (lower === "capitalize") return "TITLE";
  return "ORIGINAL";
};

const normalizePosition = (raw: string): string | undefined => {
  const pos = raw.trim().toLowerCase();
  return pos && pos !== "static" ? pos : undefined;
};

const objectFitToScaleMode = (objectFit: string): "FILL" | "FIT" => {
  const fit = objectFit.trim().toLowerCase();
  return fit === "contain" || fit === "scale-down" ? "FIT" : "FILL";
};

const backgroundSizeToScaleMode = (
  bgSize: string,
  bgRepeat?: string
): "FILL" | "FIT" | "TILE" => {
  const lower = bgSize.trim().toLowerCase();
  if (lower.includes("contain")) return "FIT";
  if (lower.includes("cover") || lower.includes("100%")) return "FILL";
  if (bgRepeat && bgRepeat.toLowerCase().includes("no-repeat")) return "FILL";
  if (lower === "auto" || lower === "auto auto" || /^(?:\d|\.)/.test(lower)) return "TILE";
  return "FILL";
};

const sanitizeHref = (raw: string | null | undefined): string | undefined => {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  return /^(?:https?:|mailto:)/i.test(trimmed) ? trimmed : undefined;
};

const waitFrameAndSettle = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    if (typeof requestAnimationFrame === "function") {
      // Fall back to a timer if Chromium suspends rAF in a throttled/backgrounded iframe.
      const fallback = setTimeout(finish, ms + 50);
      requestAnimationFrame(() => {
        clearTimeout(fallback);
        setTimeout(finish, ms);
      });
    } else {
      setTimeout(finish, ms);
    }
  });

export function isClippingOverflow(
  overflowX: string,
  overflowY: string
): { clipsX: boolean; clipsY: boolean; clipsContent: boolean } {
  const clipsX = CLIP_OVERFLOW_VALUES.has(overflowX.trim().toLowerCase());
  const clipsY = CLIP_OVERFLOW_VALUES.has(overflowY.trim().toLowerCase());
  return { clipsX, clipsY, clipsContent: clipsX || clipsY };
}

export function deriveNodeName(meta: {
  tag: string;
  id?: string;
  classList: string[];
  ariaLabel?: string;
  textPreview?: string;
  role?: string;
}): string {
  const tag = meta.tag.toLowerCase();
  const aria = meta.ariaLabel?.trim();
  const preview = meta.textPreview?.trim();

  if (tag === "button" || meta.role?.toLowerCase() === "button") {
    const label = preview || aria;
    return label ? `Button · ${truncate(label, 32)}` : "Button";
  }
  if (tag === "a") {
    const label = preview || aria;
    return label ? `Link · ${truncate(label, 32)}` : "Link";
  }
  if (LANDMARK_TAGS.has(tag)) {
    return SEMANTIC_TAG_NAMES[tag];
  }
  if (aria) return truncate(aria, 40);
  if (meta.id?.trim()) return meta.id.trim();

  const semanticClass = meta.classList.find((c) => c && !UTILITY_CLASS_RE.test(c));
  const fallbackClass = semanticClass ?? meta.classList.find(Boolean);
  if (fallbackClass) return truncate(fallbackClass, 40);

  if (meta.role?.trim()) {
    const r = meta.role.trim();
    return r.charAt(0).toUpperCase() + r.slice(1);
  }
  return SEMANTIC_TAG_NAMES[tag] ?? tag;
}

export function collapseRedundantWrappers(node: SerializedNode): SerializedNode {
  if (node.type !== "FRAME") return node;

  const children = node.children.map(collapseRedundantWrappers);
  const layout = node.layout;
  const hasFlexSpacing =
    layout !== undefined &&
    (layout.display === "flex" || layout.display === "inline-flex") &&
    (layout.rowGap > 0 ||
      layout.columnGap > 0 ||
      layout.paddingTop > 0 ||
      layout.paddingRight > 0 ||
      layout.paddingBottom > 0 ||
      layout.paddingLeft > 0);

  const isUnstyledSingleWrapper =
    children.length === 1 &&
    node.fills.length === 0 &&
    node.strokes.length === 0 &&
    node.effects.length === 0 &&
    node.cornerRadius.every((r) => r === 0) &&
    !node.clipsContent &&
    node.opacity >= 0.999 &&
    !node.rotation &&
    !hasFlexSpacing;

  if (!isUnstyledSingleWrapper) {
    return children === node.children ? node : { ...node, children };
  }

  const child = children[0];
  // Never collapse a wrapper whose bounding box differs from its child (e.g. padded or
  // max-width centered containers like .container / .cr-wrap), since parent Auto Layout
  // and coordinate alignment depend on preserving that container box.
  const sameBox =
    Math.abs(node.x - child.x) <= 1 &&
    Math.abs(node.y - child.y) <= 1 &&
    Math.abs(node.width - child.width) <= 1 &&
    Math.abs(node.height - child.height) <= 1;
  if (!sameBox) {
    return children === node.children ? node : { ...node, children };
  }

  if ((node.position === "absolute" || node.position === "fixed") && !child.position) {
    return { ...child, position: node.position };
  }
  return child;
}

function triggerInjectedIntersectionObservers(win: Window, onlyInViewport: boolean): void {
  const fn = (win as unknown as { __h2f_triggerAllIntersectionObservers?: (v: boolean) => void })
    .__h2f_triggerAllIntersectionObservers;
  if (typeof fn === "function") {
    try {
      fn(onlyInViewport);
    } catch {
      // Ignore user-land observer callback errors.
    }
  }
}

function collapsePureStickyRunways(doc: Document, win: Window): void {
  const vh = win.innerHeight || 1080;
  for (const el of Array.from(doc.querySelectorAll("*"))) {
    const tag = el.tagName.toLowerCase();
    if (tag === "html" || tag === "body" || tag === "main" || tag === "header" || tag === "nav") {
      continue;
    }
    const cs = win.getComputedStyle(el);
    if (cs.position !== "sticky") continue;
    const parent = el.parentElement;
    if (!parent) continue;
    const parentTag = parent.tagName.toLowerCase();
    if (parentTag === "html" || parentTag === "body" || parentTag === "main") continue;

    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (parentRect.height < Math.max(vh * 1.4, elRect.height * 1.4)) continue;
    if (parentRect.height - elRect.height < 400) continue;

    // Preserve multi-column layouts where a non-sticky flow sibling occupies the lower area
    // (e.g. sticky sidebar alongside a long list). Only collapse empty scroll runways.
    let hasLowerFlowSibling = false;
    for (const sibling of Array.from(parent.children)) {
      if (sibling === el) continue;
      const scs = win.getComputedStyle(sibling);
      if (scs.display === "none" || scs.position === "absolute" || scs.position === "fixed") {
        continue;
      }
      const sr = sibling.getBoundingClientRect();
      if (sr.width <= 0 || sr.height <= 0) continue;
      if (sr.bottom > elRect.bottom + 120) {
        hasLowerFlowSibling = true;
        break;
      }
    }
    if (hasLowerFlowSibling) continue;

    (parent as HTMLElement).style.setProperty("height", "auto", "important");
    (parent as HTMLElement).style.setProperty("min-height", "0px", "important");
    (el as HTMLElement).style.setProperty("position", "relative", "important");
    (el as HTMLElement).style.setProperty("top", "auto", "important");
  }
}

export async function prepareDocument(): Promise<void> {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  // Inject zero-duration transitions/animations and force content-visibility:visible before scrolling.
  if (!document.querySelector('style[data-h2f-prep="true"]')) {
    const style = document.createElement("style");
    style.setAttribute("data-h2f-prep", "true");
    style.textContent = [
      "*, *::before, *::after {",
      "  content-visibility: visible !important;",
      "  scroll-behavior: auto !important;",
      "  transition-duration: 0ms !important;",
      "  transition-delay: 0ms !important;",
      "  animation-delay: 0ms !important;",
      "  animation-duration: 1ms !important;",
      "  animation-iteration-count: 1 !important;",
      "}",
    ].join("\n");
    (document.head || document.documentElement).appendChild(style);
  }

  const pendingWaits: Array<Promise<unknown>> = [];
  for (const img of Array.from(document.querySelectorAll("img"))) {
    if (img.loading === "lazy" || img.getAttribute("loading") === "lazy") {
      img.loading = "eager";
      img.setAttribute("loading", "eager");
    }
    if (!img.complete) {
      pendingWaits.push(
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
      );
    } else if (typeof img.decode === "function") {
      pendingWaits.push(img.decode().catch(() => undefined));
    }
  }
  if (document.fonts?.ready) {
    pendingWaits.push(document.fonts.ready.catch(() => undefined));
  }
  if (pendingWaits.length > 0) {
    await Promise.race([
      Promise.allSettled(pendingWaits),
      new Promise<void>((resolve) => setTimeout(resolve, 4000)),
    ]);
  }

  triggerInjectedIntersectionObservers(window, true);
  await waitFrameAndSettle(40);

  const getMaxScroll = (): number =>
    Math.max(
      0,
      Math.max(document.documentElement?.scrollHeight ?? 0, document.body?.scrollHeight ?? 0) - window.innerHeight
    );

  const step = Math.max(300, Math.floor(window.innerHeight * 0.45));
  let y = step;
  while (y <= getMaxScroll() && y <= 100_000) {
    window.scrollTo(0, y);
    window.dispatchEvent(new Event("scroll"));
    triggerInjectedIntersectionObservers(window, true);
    await waitFrameAndSettle(45);
    const max = getMaxScroll();
    if (y >= max) break;
    y = Math.min(max, y + step);
  }

  // Final sweep triggers any remaining viewport observers (e.g. elements whose x > Figma's 380px UI width).
  triggerInjectedIntersectionObservers(window, false);
  await waitFrameAndSettle(45);

  window.scrollTo(0, 0);
  window.dispatchEvent(new Event("scroll"));
  await waitFrameAndSettle(40);

  collapsePureStickyRunways(document, window);
  await waitFrameAndSettle(25);

  if (typeof document.getAnimations === "function") {
    for (const anim of document.getAnimations()) {
      try {
        const endTime = anim.effect?.getComputedTiming().endTime;
        if (typeof endTime === "number" && Number.isFinite(endTime)) {
          anim.currentTime = endTime;
        }
      } catch {
        // Ignore animations with non-seekable timelines.
      }
    }
  }
}

function getPageRect(el: Element, win: Window, offsetX = 0, offsetY = 0): BoxRect {
  const r = el.getBoundingClientRect();
  const scrollX = win.scrollX || win.pageXOffset || 0;
  const scrollY = win.scrollY || win.pageYOffset || 0;
  const left = r.left + scrollX + offsetX;
  const top = r.top + scrollY + offsetY;
  return {
    left,
    top,
    right: left + r.width,
    bottom: top + r.height,
    width: r.width,
    height: r.height,
  };
}

function intersectsClip(rect: BoxRect, clip: ClipRect): boolean {
  return (
    rect.right > clip.left &&
    rect.left < clip.right &&
    rect.bottom > clip.top &&
    rect.top < clip.bottom
  );
}

function registerAsset(ctx: SerializerContext, media: ExtractedMedia | null): string | null {
  if (!media || media.bytes.length === 0) return null;
  const id = hashBytes(media.bytes);
  if (!ctx.assets[id]) {
    ctx.assets[id] = { mime: media.mime, bytes: media.bytes };
  }
  return id;
}

function extractUrlAsset(
  ctx: SerializerContext,
  url: string,
  imgEl?: HTMLImageElement
): Promise<string | null> {
  if (!url) return Promise.resolve(null);
  const existing = ctx.urlCache.get(url);
  if (existing && !imgEl) return existing;

  const task = extractImageBytes(url, { fetchTimeoutMs: 4000, imgEl }).then((media) =>
    registerAsset(ctx, media)
  );
  if (!existing) ctx.urlCache.set(url, task);
  return task;
}

function scheduleSlotMedia(
  slots: Array<SerializedPaint | null>,
  ctx: SerializerContext,
  loader: () => Promise<SerializedPaint | null>
): void {
  const slotIndex = slots.length;
  slots.push(null);
  ctx.mediaTasks.push(async () => {
    const paint = await loader();
    if (paint) slots[slotIndex] = paint;
  });
}

function extractStrokes(style: CSSStyleDeclaration): {
  strokes: SerializedPaint[];
  strokeWeight?: number;
  strokeWeights?: [number, number, number, number];
} {
  const sides = [
    { w: parsePx(style.borderTopWidth), s: style.borderTopStyle, c: style.borderTopColor },
    { w: parsePx(style.borderRightWidth), s: style.borderRightStyle, c: style.borderRightColor },
    { w: parsePx(style.borderBottomWidth), s: style.borderBottomStyle, c: style.borderBottomColor },
    { w: parsePx(style.borderLeftWidth), s: style.borderLeftStyle, c: style.borderLeftColor },
  ];
  let maxWeight = 0;
  let strokeColor: ReturnType<typeof parseCssColor> = null;
  const strokeWeights: [number, number, number, number] = [0, 0, 0, 0];
  for (let i = 0; i < sides.length; i++) {
    const side = sides[i];
    if (side.w <= 0 || side.s === "none" || side.s === "hidden") continue;
    const parsed = parseCssColor(side.c);
    if (!parsed || parsed.a <= 0) continue;
    strokeWeights[i] = side.w;
    if (!strokeColor) strokeColor = parsed;
    if (side.w > maxWeight) maxWeight = side.w;
  }
  if (!strokeColor || maxWeight <= 0) return { strokes: [] };
  return {
    strokes: [{ type: "SOLID", color: strokeColor }],
    strokeWeight: maxWeight,
    strokeWeights,
  };
}

function extractEffects(style: CSSStyleDeclaration): SerializedEffect[] {
  const effects = parseCssBoxShadows(style.boxShadow);
  const readBlur = (raw: string | undefined): number | null => {
    if (!raw || raw === "none") return null;
    const match = raw.match(/blur\(\s*([\d.]+)px\s*\)/i);
    if (!match) return null;
    const r = parseFloat(match[1]);
    return Number.isFinite(r) && r > 0 ? r : null;
  };
  const layerBlur = readBlur(style.filter);
  if (layerBlur !== null) effects.push({ type: "LAYER_BLUR", radius: layerBlur });
  const backdropBlur = readBlur(
    style.backdropFilter || (style as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter
  );
  if (backdropBlur !== null) effects.push({ type: "BACKGROUND_BLUR", radius: backdropBlur });
  return effects;
}

function isBackgroundClipText(style: CSSStyleDeclaration): boolean {
  const clip = (
    style.backgroundClip ||
    (style as unknown as { webkitBackgroundClip?: string }).webkitBackgroundClip ||
    ""
  )
    .trim()
    .toLowerCase();
  return clip === "text";
}

function rasterizeGradientTileToPng(
  paint: SerializedPaint,
  tileW: number,
  tileH: number
): ExtractedMedia | null {
  if (typeof document === "undefined" || (paint.type !== "GRADIENT_LINEAR" && paint.type !== "GRADIENT_RADIAL")) {
    return null;
  }
  const w = Math.max(1, Math.min(512, Math.round(tileW)));
  const h = Math.max(1, Math.min(512, Math.round(tileH)));
  try {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const toCssRgba = (c: { r: number; g: number; b: number; a: number }) =>
      `rgba(${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)}, ${c.a})`;

    if (paint.type === "GRADIENT_LINEAR") {
      // Recover gradient start/end in tile space by inverting the 2x3 transform on (0,0.5) and (1,0.5).
      const [[a, b, tx], [c, d, ty]] = paint.gradientTransform;
      const det = a * d - b * c;
      if (Math.abs(det) < 1e-8) return null;
      const inv = (gx: number, gy: number): [number, number] => {
        const dx = gx - tx;
        const dy = gy - ty;
        return [((d * dx - b * dy) / det) * w, ((-c * dx + a * dy) / det) * h];
      };
      const [x0, y0] = inv(0, 0.5);
      const [x1, y1] = inv(1, 0.5);
      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      for (const s of paint.stops) grad.addColorStop(s.position, toCssRgba(s.color));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else {
      const [[sx, , tx], [, sy, ty]] = paint.gradientTransform;
      const cx = (Math.abs(sx) > 1e-6 ? (0.5 - tx) / sx : 0.5) * w;
      const cy = (Math.abs(sy) > 1e-6 ? (0.5 - ty) / sy : 0.5) * h;
      const r = Math.max(0.5, (Math.abs(sx) > 1e-6 ? 0.5 / Math.abs(sx) : 0.5) * Math.max(w, h));
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      for (const s of paint.stops) grad.addColorStop(s.position, toCssRgba(s.color));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl || dataUrl === "data:,") return null;
    const comma = dataUrl.indexOf(",");
    if (comma === -1) return null;
    const bin = atob(dataUrl.slice(comma + 1));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return { bytes, mime: "image/png" };
  } catch {
    return null;
  }
}

function collectBoxFillSlots(
  style: CSSStyleDeclaration,
  ctx: SerializerContext,
  rect?: BoxRect
): { slots: Array<SerializedPaint | null>; bgChildren: SerializedNode[] } {
  const slots: Array<SerializedPaint | null> = [];
  const bgChildren: SerializedNode[] = [];
  if (isBackgroundClipText(style)) {
    return { slots, bgChildren };
  }

  const bgColor = parseCssColor(style.backgroundColor);
  if (bgColor && bgColor.a > 0) {
    slots.push({ type: "SOLID", color: bgColor });
  }

  const rawParts =
    style.backgroundImage && style.backgroundImage !== "none"
      ? splitTopLevelComma(style.backgroundImage)
      : [];
  const bgSizes = splitTopLevelComma(style.backgroundSize || "");
  const bgPositions = splitTopLevelComma(style.backgroundPosition || "");
  const bgRepeats = splitTopLevelComma(style.backgroundRepeat || "");
  const boxDims = rect && rect.width > 0 && rect.height > 0 ? { width: rect.width, height: rect.height } : undefined;

  // CSS background-image lists top layer first; Figma fills stack bottom-to-top.
  for (let i = rawParts.length - 1; i >= 0; i--) {
    const part = rawParts[i];
    const sizeStr = bgSizes[i] ?? bgSizes[0] ?? "";
    const posStr = bgPositions[i] ?? bgPositions[0] ?? "";
    const repeatStr = (bgRepeats[i] ?? bgRepeats[0] ?? style.backgroundRepeat ?? "").toLowerCase();

    const urlMatch = part.match(/^url\(([\s\S]+)\)$/i);
    if (urlMatch) {
      const url = urlMatch[1].trim().replace(/^(['"])([\s\S]*)\1$/, "$2").trim();
      if (!url) continue;
      if (boxDims) {
        const resolved = resolveBackgroundLayerBox(sizeStr, posStr, boxDims.width, boxDims.height);
        if (resolved.isZero) continue;
      }
      const scaleMode = backgroundSizeToScaleMode(sizeStr, repeatStr);
      scheduleSlotMedia(slots, ctx, async () => {
        const assetId = await extractUrlAsset(ctx, url);
        return assetId ? { type: "IMAGE", assetId, scaleMode } : null;
      });
      continue;
    }

    if (boxDims && rect) {
      const resolved = resolveBackgroundLayerBox(sizeStr, posStr, boxDims.width, boxDims.height);
      if (resolved.isZero) {
        // Skip invisible zero-sized gradient layers (e.g. hover underline `background-size: 0 1px`).
        continue;
      }
      if (!resolved.isFullBox) {
        const sizedPaint = parseCssGradient(part, undefined, {
          width: resolved.width,
          height: resolved.height,
        });
        if (!sizedPaint) continue;
        if (repeatStr.includes("no-repeat")) {
          bgChildren.push({
            id: ctx.nextId("bg"),
            type: "FRAME",
            name: "Background layer",
            x: rect.left + resolved.x,
            y: rect.top + resolved.y,
            width: Math.max(0.5, resolved.width),
            height: Math.max(0.5, resolved.height),
            opacity: 1,
            fills: [sizedPaint],
            strokes: [],
            cornerRadius: [0, 0, 0, 0],
            effects: [],
            clipsContent: false,
            position: "absolute",
            children: [],
          });
        } else {
          // Repeating sub-box gradient pattern (e.g. 16x16 dot grid or 32x32 grid lines).
          const tileMedia = rasterizeGradientTileToPng(sizedPaint, resolved.width, resolved.height);
          const assetId = registerAsset(ctx, tileMedia);
          if (assetId) {
            slots.push({ type: "IMAGE", assetId, scaleMode: "TILE" });
          }
        }
        continue;
      }
    }

    const paint = parseCssGradient(part, undefined, boxDims);
    if (paint) slots.push(paint);
  }
  return { slots, bgChildren };
}

function borderSideWidth(widthRaw: string, styleRaw: string): number {
  const s = (styleRaw || "").trim().toLowerCase();
  if (s === "none" || s === "hidden") return 0;
  return parsePx(widthRaw);
}

function extractLayoutMeta(style: CSSStyleDeclaration): SerializedLayoutMeta | undefined {
  const display = style.display.trim().toLowerCase();
  if (display !== "flex" && display !== "inline-flex" && display !== "grid" && display !== "inline-grid") {
    return undefined;
  }
  return {
    display,
    flexDirection: style.flexDirection || "row",
    flexWrap: style.flexWrap || "nowrap",
    justifyContent: style.justifyContent || "flex-start",
    alignItems: style.alignItems || "stretch",
    rowGap: parsePx(style.rowGap),
    columnGap: parsePx(style.columnGap),
    paddingTop: parsePx(style.paddingTop) + borderSideWidth(style.borderTopWidth, style.borderTopStyle),
    paddingRight: parsePx(style.paddingRight) + borderSideWidth(style.borderRightWidth, style.borderRightStyle),
    paddingBottom: parsePx(style.paddingBottom) + borderSideWidth(style.borderBottomWidth, style.borderBottomStyle),
    paddingLeft: parsePx(style.paddingLeft) + borderSideWidth(style.borderLeftWidth, style.borderLeftStyle),
  };
}

function hasVisibleBackgroundImage(style: CSSStyleDeclaration, rect?: BoxRect): boolean {
  if (!style.backgroundImage || style.backgroundImage === "none" || isBackgroundClipText(style)) {
    return false;
  }
  if (!rect || rect.width <= 0 || rect.height <= 0) return true;
  const parts = splitTopLevelComma(style.backgroundImage);
  const bgSizes = splitTopLevelComma(style.backgroundSize || "");
  const bgPositions = splitTopLevelComma(style.backgroundPosition || "");
  for (let i = 0; i < parts.length; i++) {
    const resolved = resolveBackgroundLayerBox(
      bgSizes[i] ?? bgSizes[0] ?? "",
      bgPositions[i] ?? bgPositions[0] ?? "",
      rect.width,
      rect.height
    );
    if (!resolved.isZero) return true;
  }
  return false;
}

function hasVisualBoxDecoration(style: CSSStyleDeclaration, rect?: BoxRect): boolean {
  if (!isBackgroundClipText(style)) {
    const bg = parseCssColor(style.backgroundColor);
    if (bg && bg.a > 0) return true;
    if (hasVisibleBackgroundImage(style, rect)) return true;
  }
  if (parseCssBoxShadows(style.boxShadow).length > 0) return true;
  if (extractStrokes(style).strokes.length > 0) return true;
  if (isClippingOverflow(style.overflowX, style.overflowY).clipsContent) return true;
  const d = style.display.trim().toLowerCase();
  if (d !== "inline" && d !== "contents") {
    const pad =
      parsePx(style.paddingTop) +
      parsePx(style.paddingRight) +
      parsePx(style.paddingBottom) +
      parsePx(style.paddingLeft);
    if (pad > 0) return true;
  }
  return false;
}

interface ParsedTransform2D {
  tx: number;
  ty: number;
  scaleX: number;
  scaleY: number;
  rotationDeg: number;
}

function parseTransform2D(transform: string | undefined): ParsedTransform2D {
  const identity: ParsedTransform2D = { tx: 0, ty: 0, scaleX: 1, scaleY: 1, rotationDeg: 0 };
  if (!transform || transform === "none") return identity;
  const trimmed = transform.trim();
  if (trimmed.startsWith("matrix(") && trimmed.endsWith(")")) {
    const nums = trimmed.slice(7, -1).split(",").map((s) => parseFloat(s.trim()));
    if (nums.length >= 6 && nums.slice(0, 6).every(Number.isFinite)) {
      const [a, b, c, d, tx, ty] = nums;
      return {
        tx,
        ty,
        scaleX: Math.hypot(a, b),
        scaleY: Math.hypot(c, d),
        rotationDeg: (Math.atan2(b, a) * 180) / Math.PI,
      };
    }
  } else if (trimmed.startsWith("matrix3d(") && trimmed.endsWith(")")) {
    const nums = trimmed.slice(9, -1).split(",").map((s) => parseFloat(s.trim()));
    if (nums.length >= 16 && nums.slice(0, 16).every(Number.isFinite)) {
      return {
        tx: nums[12],
        ty: nums[13],
        scaleX: Math.hypot(nums[0], nums[1], nums[2]),
        scaleY: Math.hypot(nums[4], nums[5], nums[6]),
        rotationDeg: (Math.atan2(nums[1], nums[0]) * 180) / Math.PI,
      };
    }
  }
  return identity;
}

function hasZeroScaleTransform(transform: string | undefined, cssScale?: string): boolean {
  if (cssScale && cssScale !== "none") {
    const parts = cssScale.trim().split(/\s+/).map((p) => parseFloat(p));
    if (parts.some((n) => Number.isFinite(n) && Math.abs(n) <= 1e-6)) return true;
  }
  const t = parseTransform2D(transform);
  return t.scaleX <= 1e-6 || t.scaleY <= 1e-6;
}

function isFullyClippedByClipPath(clipPath: string | undefined): boolean {
  if (!clipPath || clipPath === "none") return false;
  const lower = clipPath.trim().toLowerCase();
  if (/^circle\(\s*0(?:%|px)?\b/.test(lower)) return true;
  const insetMatch = lower.match(/^inset\(([^)]+)\)/);
  if (insetMatch) {
    const parts = insetMatch[1].trim().split(/\s+/);
    const pct = (raw: string | undefined): number | null =>
      raw && raw.endsWith("%") ? parseFloat(raw) : null;
    const t = pct(parts[0]);
    const r = pct(parts[1] ?? parts[0]);
    const b = pct(parts[2] ?? parts[0]);
    const l = pct(parts[3] ?? parts[1] ?? parts[0]);
    if (t !== null && b !== null && t + b >= 99.5) return true;
    if (l !== null && r !== null && l + r >= 99.5) return true;
  }
  return false;
}

function unquoteCssContent(raw: string): string {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).replace(/\\(["'\\])/g, "$1");
  }
  return "";
}

function hasActivePseudo(el: Element, pseudo: "::before" | "::after", win: Window): boolean {
  const ps = win.getComputedStyle(el, pseudo);
  const content = ps.content;
  if (!content || content === "none" || content === "normal") return false;
  if (
    ps.display === "none" ||
    ps.visibility === "hidden" ||
    parseOpacity(ps.opacity) <= 0 ||
    hasZeroScaleTransform(ps.transform, (ps as unknown as { scale?: string }).scale) ||
    isFullyClippedByClipPath(ps.clipPath)
  ) {
    return false;
  }
  if (unquoteCssContent(content).trim().length > 0) return true;
  return parsePx(ps.width) > 0 && parsePx(ps.height) > 0 && hasVisualBoxDecoration(ps);
}

function getElementMeta(el: Element, textPreview?: string) {
  return {
    tag: el.tagName.toLowerCase(),
    id: el.id || undefined,
    classList: Array.from(el.classList),
    ariaLabel: el.getAttribute("aria-label") || undefined,
    role: el.getAttribute("role") || undefined,
    textPreview,
  };
}

function makeTextSegment(text: string, style: CSSStyleDeclaration, href?: string): TextSegment {
  const fontSize = parsePx(style.fontSize) || 16;
  const color = parseCssColor(style.color) ?? { r: 0, g: 0, b: 0, a: 1 };
  let fills: SerializedPaint[] = [{ type: "SOLID", color }];
  if (isBackgroundClipText(style) && color.a <= 0.01 && style.backgroundImage && style.backgroundImage !== "none") {
    const gradLayers = parseCssBackgroundLayers(style.backgroundImage).filter(
      (l): l is { kind: "gradient"; paint: SerializedGradientPaint } => l.kind === "gradient"
    );
    if (gradLayers.length > 0) {
      fills = gradLayers.reverse().map((l) => l.paint);
    }
  }
  return {
    text,
    fontFamily: style.fontFamily || "Inter, sans-serif",
    fontSize,
    fontWeight: parseFontWeight(style.fontWeight),
    fontStyle: parseFontStyle(style.fontStyle),
    lineHeightPx: parseLineHeightPx(style.lineHeight, fontSize),
    letterSpacingPx: parsePx(style.letterSpacing),
    fills,
    textDecoration: parseTextDecoration(style.textDecorationLine || style.textDecoration),
    textCase: parseTextCase(style.textTransform),
    href,
  };
}

function canTreatAsPureInlineNodes(nodes: ChildNode[], win: Window): boolean {
  let hasText = false;
  for (const child of nodes) {
    if (child.nodeType === 3) {
      if ((child.textContent || "").trim().length > 0) hasText = true;
      continue;
    }
    if (child.nodeType !== 1) continue;
    const childEl = child as Element;
    const tag = childEl.tagName.toLowerCase();
    if (IGNORED_TAGS.has(tag)) continue;
    if (tag === "br") continue;
    if (NON_INLINE_TEXT_TAGS.has(tag)) return false;

    const cs = win.getComputedStyle(childEl);
    if (cs.display === "none") continue;
    if (cs.display !== "inline" && cs.display !== "contents") return false;
    if (parseOpacity(cs.opacity) <= 0 || cs.visibility === "hidden") continue;
    if (hasVisualBoxDecoration(cs)) return false;
    if (hasActivePseudo(childEl, "::before", win) || hasActivePseudo(childEl, "::after", win)) return false;
    if (childEl.shadowRoot) return false;

    if (!canTreatAsPureInlineNodes(Array.from(childEl.childNodes), win)) return false;
    if ((childEl.textContent || "").trim().length > 0) hasText = true;
  }
  return hasText;
}

function collectInlineSegments(
  nodes: ChildNode[],
  inheritedStyle: CSSStyleDeclaration,
  inheritedHref: string | undefined,
  win: Window,
  out: TextSegment[]
): void {
  for (const node of nodes) {
    if (node.nodeType === 3) {
      const raw = node.textContent || "";
      if (!raw) continue;
      const ws = (inheritedStyle.whiteSpace || "normal").toLowerCase();
      const preserve = ws === "pre" || ws === "pre-wrap" || ws === "break-spaces";
      const normalized = preserve
        ? raw.replace(/\r/g, "")
        : ws === "pre-line"
          ? raw.replace(/\r/g, "").replace(/[ \t]+/g, " ")
          : raw.replace(/[\r\n\t ]+/g, " ");
      if (normalized) {
        out.push(makeTextSegment(normalized, inheritedStyle, inheritedHref));
      }
      continue;
    }
    if (node.nodeType !== 1) continue;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();
    if (IGNORED_TAGS.has(tag)) continue;
    if (tag === "br") {
      out.push(makeTextSegment("\n", inheritedStyle, inheritedHref));
      continue;
    }
    const cs = win.getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || parseOpacity(cs.opacity) <= 0) continue;
    const href = tag === "a" ? sanitizeHref(el.getAttribute("href")) ?? inheritedHref : inheritedHref;
    collectInlineSegments(Array.from(el.childNodes), cs, href, win, out);
  }
}

function buildTextNodeFromNodes(
  nodes: ChildNode[],
  baseStyle: CSSStyleDeclaration,
  baseHref: string | undefined,
  boxOverride: BoxRect | null,
  clip: ClipRect,
  ctx: SerializerContext,
  offsetX = 0,
  offsetY = 0
): SerializedTextNode | null {
  const segments: TextSegment[] = [];
  collectInlineSegments(nodes, baseStyle, baseHref, ctx.win, segments);
  if (segments.length === 0) return null;

  const preserveWs = ["pre", "pre-wrap", "break-spaces"].includes(
    (baseStyle.whiteSpace || "normal").toLowerCase()
  );

  let characters = "";
  const resolvedSegments: Array<{ start: number; end: number; seg: TextSegment }> = [];

  for (const seg of segments) {
    let text = seg.text;
    if (!preserveWs && (characters.length === 0 || characters.endsWith(" ") || characters.endsWith("\n"))) {
      text = text.replace(/^ +/, "");
    }
    if (!text) continue;
    const start = characters.length;
    characters += text;
    resolvedSegments.push({ start, end: characters.length, seg });
  }

  if (!preserveWs) {
    characters = characters.replace(/ +$/, "");
  }
  if (!characters.trim()) return null;

  let rect = boxOverride;
  let rangeRect: BoxRect | null = null;
  let singleLine = false;

  if (nodes.length > 0) {
    try {
      const range = ctx.doc.createRange();
      range.setStartBefore(nodes[0]);
      range.setEndAfter(nodes[nodes.length - 1]);
      const r = range.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        rangeRect = {
          left: r.left + ctx.scrollX + offsetX,
          top: r.top + ctx.scrollY + offsetY,
          right: r.left + ctx.scrollX + offsetX + r.width,
          bottom: r.top + ctx.scrollY + offsetY + r.height,
          width: r.width,
          height: r.height,
        };
      }
      if (!characters.includes("\n")) {
        const ws = (baseStyle.whiteSpace || "normal").trim().toLowerCase();
        if (ws === "nowrap") {
          singleLine = true;
        } else {
          const clientRects = Array.from(range.getClientRects()).filter(
            (cr) => cr.width > 0.5 && cr.height > 0.5
          );
          if (clientRects.length > 0) {
            const firstMid = clientRects[0].top + clientRects[0].height / 2;
            const threshold = Math.max(4, resolvedSegments[0].seg.fontSize * 0.65);
            singleLine = clientRects.every(
              (cr) => Math.abs(cr.top + cr.height / 2 - firstMid) <= threshold
            );
          }
        }
      }
    } catch {
      if (!rect) return null;
    }
  }

  // For single-line text, keep the tight glyph box (rangeRect) when available so its (x, y)
  // aligns accurately with Figma's WIDTH_AND_HEIGHT sizing; for multi-line text, prefer boxOverride
  // (the element's full content box width) so wrapped lines aren't constrained to tight glyph bounds.
  if (singleLine && rangeRect) {
    rect = rangeRect;
  } else if (!rect) {
    rect = rangeRect;
  }

  if (!rect || rect.width <= 0 || rect.height <= 0) return null;
  if (!intersectsClip(rect, clip)) return null;

  const base = resolvedSegments[0].seg;
  const ranges: SerializedTextRange[] = [];

  for (const item of resolvedSegments) {
    const end = Math.min(item.end, characters.length);
    if (item.start >= end) continue;
    const s = item.seg;
    const range: SerializedTextRange = { start: item.start, end };
    let differs = false;
    if (s.fontFamily !== base.fontFamily) { range.fontFamily = s.fontFamily; differs = true; }
    if (s.fontSize !== base.fontSize) { range.fontSize = s.fontSize; differs = true; }
    if (s.fontWeight !== base.fontWeight) { range.fontWeight = s.fontWeight; differs = true; }
    if (s.fontStyle !== base.fontStyle) { range.fontStyle = s.fontStyle; differs = true; }
    if (s.textDecoration !== base.textDecoration) { range.textDecoration = s.textDecoration; differs = true; }
    if (s.textCase !== base.textCase) { range.textCase = s.textCase; differs = true; }
    if (s.letterSpacingPx !== base.letterSpacingPx) { range.letterSpacingPx = s.letterSpacingPx; differs = true; }
    if (s.lineHeightPx !== base.lineHeightPx) { range.lineHeightPx = s.lineHeightPx; differs = true; }
    if (s.href && s.href !== base.href) { range.href = s.href; differs = true; }
    if (JSON.stringify(s.fills) !== JSON.stringify(base.fills)) { range.fills = s.fills; differs = true; }
    if (differs) ranges.push(range);
  }

  const textStrokeWidth = parsePx(
    (baseStyle as unknown as { webkitTextStrokeWidth?: string }).webkitTextStrokeWidth || ""
  );
  const textStrokeColor =
    textStrokeWidth > 0
      ? parseCssColor(
          (baseStyle as unknown as { webkitTextStrokeColor?: string }).webkitTextStrokeColor || ""
        )
      : null;

  return {
    id: ctx.nextId("txt"),
    type: "TEXT",
    name: truncate(characters, 40),
    x: rect.left,
    y: rect.top,
    width: Math.max(1, rect.width),
    height: Math.max(1, rect.height),
    opacity: parseOpacity(baseStyle.opacity),
    characters,
    fontFamily: base.fontFamily,
    fontSize: base.fontSize,
    fontWeight: base.fontWeight,
    fontStyle: base.fontStyle,
    lineHeightPx: base.lineHeightPx,
    letterSpacingPx: base.letterSpacingPx,
    textAlign: parseTextAlign(baseStyle.textAlign),
    textDecoration: base.textDecoration,
    textCase: base.textCase,
    fills: base.fills,
    ...(textStrokeColor && textStrokeColor.a > 0
      ? {
          strokes: [{ type: "SOLID" as const, color: textStrokeColor }],
          strokeWeight: textStrokeWidth,
        }
      : {}),
    ranges,
    href: base.href,
    position: normalizePosition(baseStyle.position),
    singleLine,
  };
}

function serializePseudoElement(
  el: Element,
  pseudo: "::before" | "::after",
  parentRect: BoxRect,
  parentStyle: CSSStyleDeclaration,
  clip: ClipRect,
  ctx: SerializerContext
): { node: SerializedNode; behind: boolean } | null {
  const ps = ctx.win.getComputedStyle(el, pseudo);
  const content = ps.content;
  if (!content || content === "none" || content === "normal") return null;
  if (
    ps.display === "none" ||
    ps.visibility === "hidden" ||
    hasZeroScaleTransform(ps.transform, (ps as unknown as { scale?: string }).scale) ||
    isFullyClippedByClipPath(ps.clipPath)
  ) {
    return null;
  }
  const opacity = parseOpacity(ps.opacity);
  if (opacity <= 0) return null;

  const w = parsePx(ps.width);
  const h = parsePx(ps.height);
  const t2d = parseTransform2D(ps.transform);
  const pos = normalizePosition(ps.position);
  const isPositioned = pos === "absolute" || pos === "fixed";

  let leftOff = 0;
  let topOff = 0;
  if (isPositioned) {
    leftOff =
      ps.left !== "auto"
        ? parsePx(ps.left)
        : ps.right !== "auto"
          ? parentRect.width - parsePx(ps.right) - w
          : 0;
    topOff =
      ps.top !== "auto"
        ? parsePx(ps.top)
        : ps.bottom !== "auto"
          ? parentRect.height - parsePx(ps.bottom) - h
          : 0;
  } else {
    leftOff = parsePx(parentStyle.paddingLeft) + borderSideWidth(parentStyle.borderLeftWidth, parentStyle.borderLeftStyle);
    const padTop = parsePx(parentStyle.paddingTop) + borderSideWidth(parentStyle.borderTopWidth, parentStyle.borderTopStyle);
    const padBottom = parsePx(parentStyle.paddingBottom) + borderSideWidth(parentStyle.borderBottomWidth, parentStyle.borderBottomStyle);
    const pDisplay = parentStyle.display.trim().toLowerCase();
    if (pDisplay === "flex" || pDisplay === "inline-flex") {
      const innerH = Math.max(0, parentRect.height - padTop - padBottom);
      topOff = padTop + Math.max(0, (innerH - h) / 2);
      if (pseudo === "::after" && parentStyle.flexDirection !== "column") {
        const padRight = parsePx(parentStyle.paddingRight) + borderSideWidth(parentStyle.borderRightWidth, parentStyle.borderRightStyle);
        leftOff = Math.max(leftOff, parentRect.width - padRight - w);
      }
    } else {
      topOff = padTop;
    }
  }

  leftOff += t2d.tx;
  topOff += t2d.ty;

  const rect: BoxRect = {
    left: parentRect.left + leftOff,
    top: parentRect.top + topOff,
    right: parentRect.left + leftOff + w,
    bottom: parentRect.top + topOff + h,
    width: w,
    height: h,
  };
  const zIndex = parseInt(ps.zIndex, 10);
  const behind = Number.isFinite(zIndex) && zIndex < 0;

  const makePseudoTextNode = (
    textValue: string,
    tRect: BoxRect,
    nodeOpacity: number
  ): SerializedTextNode => {
    const fontSize = parsePx(ps.fontSize) || 16;
    const color = parseCssColor(ps.color) ?? { r: 0, g: 0, b: 0, a: 1 };
    return {
      id: ctx.nextId("txt"),
      type: "TEXT",
      name: truncate(textValue, 40),
      x: tRect.left,
      y: tRect.top,
      width: tRect.width,
      height: tRect.height,
      opacity: nodeOpacity,
      characters: textValue,
      fontFamily: ps.fontFamily || "Inter, sans-serif",
      fontSize,
      fontWeight: parseFontWeight(ps.fontWeight),
      fontStyle: parseFontStyle(ps.fontStyle),
      lineHeightPx: parseLineHeightPx(ps.lineHeight, fontSize),
      letterSpacingPx: parsePx(ps.letterSpacing),
      textAlign: parseTextAlign(ps.textAlign),
      textDecoration: parseTextDecoration(ps.textDecorationLine || ps.textDecoration),
      textCase: parseTextCase(ps.textTransform),
      fills: [{ type: "SOLID", color }],
      ranges: [],
      position: pos,
      singleLine: !textValue.includes("\n"),
    };
  };

  const text = unquoteCssContent(content);
  const hasBoxDecor = hasVisualBoxDecoration(ps, rect);
  if (text.trim() && !hasBoxDecor) {
    const fontSize = parsePx(ps.fontSize) || 16;
    const textW = w > 0 ? w : Math.max(1, text.length * fontSize * 0.6);
    const textH = h > 0 ? h : parseLineHeightPx(ps.lineHeight, fontSize);
    const tRect: BoxRect = {
      left: rect.left,
      top: rect.top,
      right: rect.left + textW,
      bottom: rect.top + textH,
      width: textW,
      height: textH,
    };
    if (!intersectsClip(tRect, clip)) return null;
    return { node: makePseudoTextNode(text, tRect, opacity), behind };
  }

  if (w <= 0 || h <= 0 || !intersectsClip(rect, clip)) return null;
  const { slots, bgChildren } = collectBoxFillSlots(ps, ctx, rect);
  const urlMatch = content.match(/^url\(([\s\S]+)\)$/i);
  if (urlMatch) {
    const url = urlMatch[1].trim().replace(/^(['"])([\s\S]*)\1$/, "$2").trim();
    scheduleSlotMedia(slots, ctx, async () => {
      const assetId = await extractUrlAsset(ctx, url);
      return assetId ? { type: "IMAGE", assetId, scaleMode: "FILL" } : null;
    });
  }
  const { strokes, strokeWeight, strokeWeights } = extractStrokes(ps);
  const effects = extractEffects(ps);

  const children: SerializedNode[] = [...bgChildren];
  if (text.trim() && hasBoxDecor) {
    const padLeft = parsePx(ps.paddingLeft) + parsePx(ps.borderLeftWidth);
    const padTop = parsePx(ps.paddingTop) + parsePx(ps.borderTopWidth);
    const padRight = parsePx(ps.paddingRight) + parsePx(ps.borderRightWidth);
    const padBottom = parsePx(ps.paddingBottom) + parsePx(ps.borderBottomWidth);
    const innerRect: BoxRect = {
      left: rect.left + padLeft,
      top: rect.top + padTop,
      right: rect.right - padRight,
      bottom: rect.bottom - padBottom,
      width: Math.max(1, w - padLeft - padRight),
      height: Math.max(1, h - padTop - padBottom),
    };
    children.push(makePseudoTextNode(text, innerRect, 1));
  }

  if (children.length === 0 && slots.length === 0 && strokes.length === 0 && effects.length === 0) {
    return null;
  }

  return {
    node: {
      id: ctx.nextId("frm"),
      type: "FRAME",
      name: pseudo,
      x: rect.left,
      y: rect.top,
      width: w,
      height: h,
      opacity,
      fills: slots as unknown as SerializedPaint[],
      strokes,
      strokeWeight,
      strokeWeights,
      cornerRadius: parseCornerRadii(ps, w, h),
      effects,
      clipsContent: isClippingOverflow(ps.overflowX, ps.overflowY).clipsContent,
      position: pos,
      ...(Math.abs(t2d.rotationDeg) > 0.5 ? { rotation: -t2d.rotationDeg } : {}),
      children,
    },
    behind,
  };
}

function serializeChildNodes(
  nodes: ChildNode[],
  parentStyle: CSSStyleDeclaration,
  parentHref: string | undefined,
  clip: ClipRect,
  ctx: SerializerContext,
  offsetX: number,
  offsetY: number
): SerializedNode[] {
  const out: SerializedNode[] = [];
  let pendingInline: ChildNode[] = [];

  const flushInline = () => {
    if (pendingInline.length === 0) return;
    const textNode = buildTextNodeFromNodes(
      pendingInline,
      parentStyle,
      parentHref,
      null,
      clip,
      ctx,
      offsetX,
      offsetY
    );
    pendingInline = [];
    if (textNode) out.push(textNode);
  };

  for (const child of nodes) {
    if (child.nodeType === 3) {
      pendingInline.push(child);
      continue;
    }
    if (child.nodeType !== 1) continue;

    const childEl = child as Element;
    const tag = childEl.tagName.toLowerCase();
    if (IGNORED_TAGS.has(tag)) continue;

    if (tag === "br") {
      pendingInline.push(child);
      continue;
    }

    const cs = ctx.win.getComputedStyle(childEl);
    if (cs.display === "none") continue;

    if (cs.display === "contents") {
      flushInline();
      const href = tag === "a" ? sanitizeHref(childEl.getAttribute("href")) ?? parentHref : parentHref;
      out.push(
        ...serializeChildNodes(
          Array.from((childEl.shadowRoot ?? childEl).childNodes),
          cs,
          href,
          clip,
          ctx,
          offsetX,
          offsetY
        )
      );
      continue;
    }

    const isPlainInline =
      cs.display === "inline" &&
      !NON_INLINE_TEXT_TAGS.has(tag) &&
      !childEl.shadowRoot &&
      !hasVisualBoxDecoration(cs) &&
      !hasActivePseudo(childEl, "::before", ctx.win) &&
      !hasActivePseudo(childEl, "::after", ctx.win) &&
      canTreatAsPureInlineNodes([childEl], ctx.win);

    if (isPlainInline) {
      pendingInline.push(childEl);
      continue;
    }

    flushInline();
    out.push(...serializeElement(childEl, clip, ctx, parentHref, offsetX, offsetY));
  }

  flushInline();
  return out;
}

function serializeFormControlChildren(
  el: Element,
  tag: string,
  style: CSSStyleDeclaration,
  rect: BoxRect,
  ctx: SerializerContext
): SerializedNode[] {
  const padLeft = parsePx(style.paddingLeft) + borderSideWidth(style.borderLeftWidth, style.borderLeftStyle);
  const padRight = parsePx(style.paddingRight) + borderSideWidth(style.borderRightWidth, style.borderRightStyle);
  const padTop = parsePx(style.paddingTop) + borderSideWidth(style.borderTopWidth, style.borderTopStyle);
  const padBottom = parsePx(style.paddingBottom) + borderSideWidth(style.borderBottomWidth, style.borderBottomStyle);
  const innerW = Math.max(1, rect.width - padLeft - padRight);
  const innerH = Math.max(1, rect.height - padTop - padBottom);

  if (tag === "input") {
    const input = el as HTMLInputElement;
    const type = (input.type || "text").toLowerCase();
    if (type === "hidden" || type === "checkbox" || type === "radio") return [];
    if (type === "range") {
      const min = parseFloat(input.min || "0");
      const max = parseFloat(input.max || "100");
      const val = parseFloat(input.value || "50");
      const ratio = Number.isFinite(min) && Number.isFinite(max) && max > min
        ? Math.max(0, Math.min(1, (val - min) / (max - min)))
        : 0.5;
      const accent =
        parseCssColor(style.accentColor) ??
        parseCssColor(style.color) ??
        { r: 0.94, g: 0.65, b: 0.29, a: 1 };
      const trackColor = parseCssColor(style.color) ?? { r: 0.5, g: 0.5, b: 0.5, a: 0.4 };
      const trackH = 2;
      const thumbW = 14;
      const thumbH = Math.min(rect.height, 24);
      const trackY = rect.top + (rect.height - trackH) / 2;
      const thumbX = rect.left + ratio * Math.max(0, rect.width - thumbW);
      const thumbY = rect.top + (rect.height - thumbH) / 2;
      return [
        {
          id: ctx.nextId("frm"),
          type: "FRAME",
          name: "Range Track",
          x: rect.left,
          y: trackY,
          width: rect.width,
          height: trackH,
          opacity: 0.4,
          fills: [{ type: "SOLID", color: { ...trackColor, a: 1 } }],
          strokes: [],
          cornerRadius: [1, 1, 1, 1],
          effects: [],
          clipsContent: false,
          position: "absolute",
          children: [],
        },
        {
          id: ctx.nextId("frm"),
          type: "FRAME",
          name: "Range Thumb",
          x: thumbX,
          y: thumbY,
          width: thumbW,
          height: thumbH,
          opacity: 1,
          fills: [{ type: "SOLID", color: accent }],
          strokes: [],
          cornerRadius: [2, 2, 2, 2],
          effects: [],
          clipsContent: false,
          position: "absolute",
          children: [],
        },
      ];
    }

    const rawVal = input.value || "";
    const text = rawVal || input.placeholder || "";
    if (!text.trim()) return [];
    const fontSize = parsePx(style.fontSize) || 16;
    const lineHeightPx = parseLineHeightPx(style.lineHeight, fontSize);
    const placeholderColor = rawVal
      ? null
      : parseCssColor(ctx.win.getComputedStyle(el, "::placeholder").color);
    const baseColor = parseCssColor(style.color) ?? { r: 0, g: 0, b: 0, a: 1 };
    const color = rawVal
      ? baseColor
      : placeholderColor ?? { ...baseColor, a: baseColor.a * 0.55 };
    const textY = rect.top + padTop + Math.max(0, (innerH - lineHeightPx) / 2);
    return [
      {
        id: ctx.nextId("txt"),
        type: "TEXT",
        name: truncate(text, 40),
        x: rect.left + padLeft,
        y: textY,
        width: innerW,
        height: Math.min(innerH, lineHeightPx),
        opacity: 1,
        characters: text,
        fontFamily: style.fontFamily || "Inter, sans-serif",
        fontSize,
        fontWeight: parseFontWeight(style.fontWeight),
        fontStyle: parseFontStyle(style.fontStyle),
        lineHeightPx,
        letterSpacingPx: parsePx(style.letterSpacing),
        textAlign: parseTextAlign(style.textAlign),
        textDecoration: "NONE",
        textCase: parseTextCase(style.textTransform),
        fills: [{ type: "SOLID", color }],
        ranges: [],
        singleLine: true,
      },
    ];
  }

  if (tag === "textarea") {
    const ta = el as HTMLTextAreaElement;
    const rawVal = ta.value || "";
    const text = rawVal || ta.placeholder || "";
    if (!text.trim()) return [];
    const fontSize = parsePx(style.fontSize) || 16;
    const lineHeightPx = parseLineHeightPx(style.lineHeight, fontSize);
    const placeholderColor = rawVal
      ? null
      : parseCssColor(ctx.win.getComputedStyle(el, "::placeholder").color);
    const baseColor = parseCssColor(style.color) ?? { r: 0, g: 0, b: 0, a: 1 };
    const color = rawVal
      ? baseColor
      : placeholderColor ?? { ...baseColor, a: baseColor.a * 0.55 };
    return [
      {
        id: ctx.nextId("txt"),
        type: "TEXT",
        name: truncate(text, 40),
        x: rect.left + padLeft,
        y: rect.top + padTop,
        width: innerW,
        height: Math.max(lineHeightPx, innerH),
        opacity: 1,
        characters: text,
        fontFamily: style.fontFamily || "Inter, sans-serif",
        fontSize,
        fontWeight: parseFontWeight(style.fontWeight),
        fontStyle: parseFontStyle(style.fontStyle),
        lineHeightPx,
        letterSpacingPx: parsePx(style.letterSpacing),
        textAlign: parseTextAlign(style.textAlign),
        textDecoration: "NONE",
        textCase: parseTextCase(style.textTransform),
        fills: [{ type: "SOLID", color }],
        ranges: [],
        singleLine: !text.includes("\n"),
      },
    ];
  }

  if (tag === "select") {
    const sel = el as HTMLSelectElement;
    const label =
      sel.selectedOptions?.[0]?.textContent?.trim() ||
      sel.options?.[sel.selectedIndex]?.textContent?.trim() ||
      sel.options?.[0]?.textContent?.trim() ||
      "";
    if (!label) return [];
    const fontSize = parsePx(style.fontSize) || 16;
    const lineHeightPx = parseLineHeightPx(style.lineHeight, fontSize);
    const color = parseCssColor(style.color) ?? { r: 0, g: 0, b: 0, a: 1 };
    const textY = rect.top + padTop + Math.max(0, (innerH - lineHeightPx) / 2);
    return [
      {
        id: ctx.nextId("txt"),
        type: "TEXT",
        name: truncate(label, 40),
        x: rect.left + padLeft,
        y: textY,
        width: innerW,
        height: Math.min(innerH, lineHeightPx),
        opacity: 1,
        characters: label,
        fontFamily: style.fontFamily || "Inter, sans-serif",
        fontSize,
        fontWeight: parseFontWeight(style.fontWeight),
        fontStyle: parseFontStyle(style.fontStyle),
        lineHeightPx,
        letterSpacingPx: parsePx(style.letterSpacing),
        textAlign: parseTextAlign(style.textAlign),
        textDecoration: "NONE",
        textCase: parseTextCase(style.textTransform),
        fills: [{ type: "SOLID", color }],
        ranges: [],
        singleLine: true,
      },
    ];
  }

  return [];
}

function isPureUnstyledTextSubtree(node: SerializedNode): boolean {
  if (node.type === "TEXT") return true;
  if (node.type !== "FRAME") return false;
  if (
    node.fills.length > 0 ||
    node.strokes.length > 0 ||
    node.effects.length > 0 ||
    node.cornerRadius.some((r) => r > 0)
  ) {
    return false;
  }
  return node.children.length > 0 && node.children.every(isPureUnstyledTextSubtree);
}

function shouldClipFrame(
  overflowClips: boolean,
  slots: Array<SerializedPaint | null>,
  strokes: SerializedPaint[],
  effects: SerializedEffect[],
  cornerRadius: [number, number, number, number],
  children: SerializedNode[],
  rect: BoxRect
): boolean {
  if (!overflowClips) return false;
  // Unstyled overflow:clip/hidden wrappers around text (e.g. .ew-line / .cr-line / .h-line reveal masks)
  // should not clip their visible text in Figma, where minor font width differences would chop off words.
  if (
    slots.length === 0 &&
    strokes.length === 0 &&
    effects.length === 0 &&
    cornerRadius.every((r) => r === 0) &&
    children.length > 0 &&
    children.every(isPureUnstyledTextSubtree)
  ) {
    const xSlack = Math.max(8, rect.width * 0.02);
    const allCenteredInside = children.every((c) => {
      const midY = c.y + c.height / 2;
      return (
        c.x >= rect.left - xSlack &&
        c.x + c.width <= rect.right + xSlack &&
        midY >= rect.top - 4 &&
        midY <= rect.bottom + 4
      );
    });
    if (allCenteredInside) return false;
  }
  return true;
}

function serializeElement(
  el: Element,
  parentClip: ClipRect,
  ctx: SerializerContext,
  inheritedHref: string | undefined,
  offsetX = 0,
  offsetY = 0
): SerializedNode[] {
  const tag = el.tagName.toLowerCase();
  if (IGNORED_TAGS.has(tag)) return [];

  const style = ctx.win.getComputedStyle(el);
  if (style.display === "none") return [];

  const href = tag === "a" ? sanitizeHref(el.getAttribute("href")) ?? inheritedHref : inheritedHref;

  // Never measure or clip display:contents wrappers (e.g. #standalone-root); splice children directly.
  if (style.display === "contents") {
    const contentSource = el.shadowRoot ?? el;
    return serializeChildNodes(
      Array.from(contentSource.childNodes),
      style,
      href,
      parentClip,
      ctx,
      offsetX,
      offsetY
    );
  }

  const opacity = parseOpacity(style.opacity);
  if (opacity <= 0) return [];
  if (style.visibility === "hidden" || style.visibility === "collapse") return [];
  if (
    hasZeroScaleTransform(style.transform, (style as unknown as { scale?: string }).scale) ||
    isFullyClippedByClipPath(style.clipPath)
  ) {
    return [];
  }

  const rect = getPageRect(el, ctx.win, offsetX, offsetY);
  if (rect.width <= 0 || rect.height <= 0) return [];

  if (
    rect.width <= 1 &&
    rect.height <= 1 &&
    (style.clipPath === "inset(50%)" || style.clip === "rect(0px, 0px, 0px, 0px)")
  ) {
    return [];
  }

  const position = normalizePosition(style.position);
  const activeClip: ClipRect =
    position === "fixed"
      ? { left: 0, top: -Infinity, right: ctx.viewportWidth, bottom: Infinity }
      : parentClip;

  if (!intersectsClip(rect, activeClip)) return [];

  if (tag === "svg") {
    const svg = inlineSvgElement(el as SVGSVGElement, (node) => ctx.win.getComputedStyle(node));
    if (!svg) return [];
    const svgNode: SerializedSvgNode = {
      id: ctx.nextId("svg"),
      type: "SVG",
      name: deriveNodeName(getElementMeta(el)),
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      opacity,
      svg,
      position,
    };
    return [svgNode];
  }

  const overflowClip = isClippingOverflow(style.overflowX, style.overflowY);
  const childClip: ClipRect = {
    left: overflowClip.clipsX ? Math.max(activeClip.left, rect.left) : activeClip.left,
    right: overflowClip.clipsX ? Math.min(activeClip.right, rect.right) : activeClip.right,
    top: overflowClip.clipsY ? Math.max(activeClip.top, rect.top) : activeClip.top,
    bottom: overflowClip.clipsY ? Math.min(activeClip.bottom, rect.bottom) : activeClip.bottom,
  };

  if (tag === "img" || tag === "canvas" || tag === "video") {
    const { slots, bgChildren } = collectBoxFillSlots(style, ctx, rect);
    const scaleMode = objectFitToScaleMode(style.objectFit);

    if (tag === "img") {
      const img = el as HTMLImageElement;
      const src = img.currentSrc || img.src || img.getAttribute("src") || "";
      scheduleSlotMedia(slots, ctx, async () => {
        const assetId = await extractUrlAsset(ctx, src, img);
        return assetId ? { type: "IMAGE", assetId, scaleMode } : null;
      });
    } else if (tag === "canvas") {
      const canvas = el as HTMLCanvasElement;
      scheduleSlotMedia(slots, ctx, async () => {
        const assetId = registerAsset(ctx, await captureCanvasBytes(canvas));
        return assetId ? { type: "IMAGE", assetId, scaleMode: "FILL" } : null;
      });
    } else {
      const video = el as HTMLVideoElement;
      scheduleSlotMedia(slots, ctx, async () => {
        const assetId = registerAsset(ctx, await captureVideoPosterBytes(video));
        return assetId ? { type: "IMAGE", assetId, scaleMode } : null;
      });
    }

    const { strokes, strokeWeight, strokeWeights } = extractStrokes(style);
    const effects = extractEffects(style);
    if (slots.length === 0 && bgChildren.length === 0 && strokes.length === 0 && effects.length === 0) {
      return [];
    }

    const mediaFrame: SerializedFrameNode = {
      id: ctx.nextId("img"),
      type: "FRAME",
      name: deriveNodeName(getElementMeta(el, el.getAttribute("alt") || undefined)),
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      opacity,
      fills: slots as unknown as SerializedPaint[],
      strokes,
      strokeWeight,
      strokeWeights,
      cornerRadius: parseCornerRadii(style, rect.width, rect.height),
      effects,
      clipsContent: true,
      position,
      children: bgChildren,
    };
    return [mediaFrame];
  }

  if (
    !el.shadowRoot &&
    tag !== "iframe" &&
    tag !== "input" &&
    tag !== "textarea" &&
    tag !== "select" &&
    style.display !== "flex" &&
    style.display !== "inline-flex" &&
    style.display !== "grid" &&
    style.display !== "inline-grid" &&
    !hasActivePseudo(el, "::before", ctx.win) &&
    !hasActivePseudo(el, "::after", ctx.win) &&
    canTreatAsPureInlineNodes(Array.from(el.childNodes), ctx.win)
  ) {
    const hasBoxStyle = hasVisualBoxDecoration(style, rect);
    const padL = parsePx(style.paddingLeft) + borderSideWidth(style.borderLeftWidth, style.borderLeftStyle);
    const padR = parsePx(style.paddingRight) + borderSideWidth(style.borderRightWidth, style.borderRightStyle);
    const padT = parsePx(style.paddingTop) + borderSideWidth(style.borderTopWidth, style.borderTopStyle);
    const padB = parsePx(style.paddingBottom) + borderSideWidth(style.borderBottomWidth, style.borderBottomStyle);
    const contentBox: BoxRect | null =
      style.display === "inline"
        ? null
        : {
            left: rect.left + padL,
            top: rect.top + padT,
            right: rect.right - padR,
            bottom: rect.bottom - padB,
            width: Math.max(1, rect.width - padL - padR),
            height: Math.max(1, rect.height - padT - padB),
          };
    const textNode = buildTextNodeFromNodes(
      Array.from(el.childNodes),
      style,
      href,
      contentBox,
      activeClip,
      ctx,
      offsetX,
      offsetY
    );
    if (!hasBoxStyle) {
      return textNode ? [textNode] : [];
    }
    const { slots, bgChildren } = collectBoxFillSlots(style, ctx, rect);
    const { strokes, strokeWeight, strokeWeights } = extractStrokes(style);
    const effects = extractEffects(style);
    const cornerRadius = parseCornerRadii(style, rect.width, rect.height);
    const frameChildren: SerializedNode[] = [...bgChildren, ...(textNode ? [textNode] : [])];
    return [
      {
        id: ctx.nextId("frm"),
        type: "FRAME",
        name: deriveNodeName(getElementMeta(el, textNode?.characters)),
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        opacity,
        fills: slots as unknown as SerializedPaint[],
        strokes,
        strokeWeight,
        strokeWeights,
        cornerRadius,
        effects,
        clipsContent: shouldClipFrame(
          overflowClip.clipsContent,
          slots,
          strokes,
          effects,
          cornerRadius,
          frameChildren,
          rect
        ),
        layout: extractLayoutMeta(style),
        position,
        children: frameChildren,
      },
    ];
  }

  const { slots, bgChildren } = collectBoxFillSlots(style, ctx, rect);
  const { strokes, strokeWeight, strokeWeights } = extractStrokes(style);
  const effects = extractEffects(style);
  const children: SerializedNode[] = [...bgChildren];

  const beforePseudo = serializePseudoElement(el, "::before", rect, style, childClip, ctx);
  const afterPseudo = serializePseudoElement(el, "::after", rect, style, childClip, ctx);
  if (beforePseudo) children.push(beforePseudo.node);
  if (afterPseudo?.behind) children.push(afterPseudo.node);

  if (tag === "input" || tag === "textarea" || tag === "select") {
    children.push(...serializeFormControlChildren(el, tag, style, rect, ctx));
  } else if (tag === "iframe") {
    try {
      const iframeDoc = (el as HTMLIFrameElement).contentDocument;
      const iframeWin = (el as HTMLIFrameElement).contentWindow;
      if (iframeDoc?.body && iframeWin) {
        const innerCtx: SerializerContext = {
          ...ctx,
          doc: iframeDoc,
          win: iframeWin,
          scrollX: iframeWin.scrollX || 0,
          scrollY: iframeWin.scrollY || 0,
        };
        const innerOffX = rect.left + parsePx(style.borderLeftWidth) + parsePx(style.paddingLeft);
        const innerOffY = rect.top + parsePx(style.borderTopWidth) + parsePx(style.paddingTop);
        children.push(
          ...serializeChildNodes(
            Array.from(iframeDoc.body.childNodes),
            iframeWin.getComputedStyle(iframeDoc.body),
            undefined,
            childClip,
            innerCtx,
            innerOffX,
            innerOffY
          )
        );
      }
    } catch {
      // Cross-origin iframe cannot be inspected; keep outer frame box only.
    }
  } else {
    const contentSource = el.shadowRoot ?? el;
    children.push(
      ...serializeChildNodes(
        Array.from(contentSource.childNodes),
        style,
        href,
        childClip,
        ctx,
        offsetX,
        offsetY
      )
    );
  }

  if (afterPseudo && !afterPseudo.behind) children.push(afterPseudo.node);

  if (children.length === 0 && slots.length === 0 && strokes.length === 0 && effects.length === 0) {
    return [];
  }

  const textPreview =
    tag === "button" || tag === "a" ? truncate(el.textContent || "", 32) || undefined : undefined;
  const cornerRadius = parseCornerRadii(style, rect.width, rect.height);

  return [
    {
      id: ctx.nextId("frm"),
      type: "FRAME",
      name: deriveNodeName(getElementMeta(el, textPreview)),
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      opacity,
      fills: slots as unknown as SerializedPaint[],
      strokes,
      strokeWeight,
      strokeWeights,
      cornerRadius,
      effects,
      clipsContent: shouldClipFrame(
        overflowClip.clipsContent,
        slots,
        strokes,
        effects,
        cornerRadius,
        children,
        rect
      ),
      layout: extractLayoutMeta(style),
      position,
      children,
    },
  ];
}

function finalizeFrameNodes(nodes: SerializedNode[]): SerializedNode[] {
  const out: SerializedNode[] = [];
  for (const node of nodes) {
    if (node.type !== "FRAME") {
      out.push(node);
      continue;
    }
    const fills = (node.fills as Array<SerializedPaint | null>).filter(
      (f): f is SerializedPaint => f !== null
    );
    const children = finalizeFrameNodes(node.children);
    if (
      children.length === 0 &&
      fills.length === 0 &&
      node.strokes.length === 0 &&
      node.effects.length === 0
    ) {
      continue;
    }
    out.push({ ...node, fills, children });
  }
  return out;
}

export async function serializeDocumentFromRoot(
  root: HTMLElement,
  options: { viewportWidth: number; runId: string }
): Promise<SerializedDocument> {
  const doc = root.ownerDocument || document;
  const win = doc.defaultView || window;
  let seq = 0;

  const ctx: SerializerContext = {
    doc,
    win,
    viewportWidth: options.viewportWidth,
    scrollX: win.scrollX || win.pageXOffset || 0,
    scrollY: win.scrollY || win.pageYOffset || 0,
    assets: {},
    urlCache: new Map(),
    mediaTasks: [],
    nextId: (prefix) => `${prefix}-${++seq}`,
  };

  const bodyStyle = win.getComputedStyle(root);
  const rootRect = root.getBoundingClientRect();
  const isBody = root === doc.body;
  const rootX = isBody ? 0 : rootRect.left + ctx.scrollX;
  const rootY = isBody ? 0 : rootRect.top + ctx.scrollY;
  const rootWidth = options.viewportWidth;
  const rootHeight = Math.max(
    rootRect.height,
    root.scrollHeight,
    isBody ? doc.documentElement?.scrollHeight ?? 0 : 0,
    1
  );

  const rootBox: BoxRect = {
    left: rootX,
    top: rootY,
    right: rootX + rootWidth,
    bottom: rootY + rootHeight,
    width: rootWidth,
    height: rootHeight,
  };
  let rootBg = collectBoxFillSlots(bodyStyle, ctx, rootBox);
  if (isBody && rootBg.slots.length === 0 && doc.documentElement) {
    rootBg = collectBoxFillSlots(win.getComputedStyle(doc.documentElement), ctx, rootBox);
  }
  const rootFillSlots = rootBg.slots;

  const docClip =
    isBody && doc.documentElement
      ? isClippingOverflow(
          win.getComputedStyle(doc.documentElement).overflowX,
          win.getComputedStyle(doc.documentElement).overflowY
        )
      : { clipsX: false, clipsY: false, clipsContent: false };
  const bodyClip = isClippingOverflow(bodyStyle.overflowX, bodyStyle.overflowY);
  const clipsX = bodyClip.clipsX || docClip.clipsX;
  const clipsY = bodyClip.clipsY || docClip.clipsY;

  const rootClip: ClipRect = {
    left: clipsX ? rootX : -Infinity,
    right: clipsX ? rootX + rootWidth : Infinity,
    top: clipsY ? rootY : -Infinity,
    bottom: clipsY ? rootY + rootHeight : Infinity,
  };

  // Capture all DOM geometry & computed styles in one synchronous frame to prevent rAF/scroll drift.
  const rawChildren = serializeChildNodes(
    Array.from((root.shadowRoot ?? root).childNodes),
    bodyStyle,
    undefined,
    rootClip,
    ctx,
    0,
    0
  );

  await Promise.all(ctx.mediaTasks.map((task) => task()));

  const rootFills = rootFillSlots.filter((f): f is SerializedPaint => f !== null);
  if (rootFills.length === 0) {
    rootFills.push({ type: "SOLID", color: { r: 1, g: 1, b: 1, a: 1 } });
  }

  const rootFrame: SerializedFrameNode = {
    id: "root",
    type: "FRAME",
    name: doc.title || "Page",
    x: rootX,
    y: rootY,
    width: rootWidth,
    height: rootHeight,
    opacity: parseOpacity(bodyStyle.opacity),
    fills: rootFills,
    strokes: [],
    cornerRadius: [0, 0, 0, 0],
    effects: [],
    clipsContent: clipsX || clipsY,
    layout: extractLayoutMeta(bodyStyle),
    children: finalizeFrameNodes(rawChildren).map(collapseRedundantWrappers),
  };

  return {
    runId: options.runId,
    title: doc.title || "Untitled Page",
    viewportWidth: options.viewportWidth,
    assets: ctx.assets,
    root: rootFrame,
  };
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const globalBag = window as unknown as Record<string, unknown>;
  globalBag.__h2f_prepareDocument = prepareDocument;
  globalBag.__h2f_serializeDocumentFromRoot = serializeDocumentFromRoot;

  window.addEventListener("message", async (event: MessageEvent) => {
    const data = event.data as { type?: string; runId?: string; viewportWidth?: number } | null;
    if (!data || data.type !== "h2f:capture" || typeof data.runId !== "string") return;

    const target =
      event.source && typeof (event.source as Window).postMessage === "function"
        ? (event.source as Window)
        : window.parent;

    try {
      await prepareDocument();
      const doc = await serializeDocumentFromRoot(document.body, {
        viewportWidth: data.viewportWidth || DEFAULT_VIEWPORT_WIDTH,
        runId: data.runId,
      });
      target.postMessage({ type: "h2f:serialized", runId: data.runId, document: doc }, "*");
    } catch (err) {
      target.postMessage(
        {
          type: "h2f:error",
          runId: data.runId,
          message: err instanceof Error ? err.message : String(err),
        },
        "*"
      );
    }
  });

  let readyPosted = false;
  const postReady = () => {
    if (readyPosted) return;
    readyPosted = true;
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "h2f:ready" }, "*");
    }
  };
  const scheduleReady = () => {
    // Allow deferred hydration/module scripts and initial effects to mount before capture begins.
    const cap = setTimeout(postReady, 2500);
    const finish = () => {
      clearTimeout(cap);
      waitFrameAndSettle(40).then(postReady);
    };
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleReady, { once: true });
  } else {
    scheduleReady();
  }
}
