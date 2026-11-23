import type {
  ImportSettings,
  ImportSummary,
  RgbaColor,
  SerializedDocument,
  SerializedEffect,
  SerializedFrameNode,
  SerializedImageAsset,
  SerializedNode,
  SerializedPaint,
  SerializedTextNode,
} from "../shared/types";
import { preloadDocumentFonts, resolveFontForText } from "./fonts";
import { computeAutoLayoutConfig } from "./layout";

export interface BuildPageOptions {
  onProgress?: (current: number, total: number) => void;
  onRootFrame?: (frame: FrameNode) => void;
}

interface StyleRegistry {
  paintStyles: Map<string, PaintStyle>;
  textStyles: Map<string, TextStyle>;
  createdCount: number;
}

interface BuildContext {
  figmaApi: PluginAPI;
  settings: ImportSettings;
  imageHashes: Map<string, string>;
  resolvedFonts: Map<string, FontName>;
  styles: StyleRegistry | null;
  summary: ImportSummary;
  totalNodes: number;
  processedNodes: number;
  onProgress?: (current: number, total: number) => void;
}

const clamp01 = (n: number): number =>
  Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 1;

const toRgb = (c: RgbaColor): RGB => ({
  r: clamp01(c.r),
  g: clamp01(c.g),
  b: clamp01(c.b),
});

const toRgba = (c: RgbaColor): RGBA => ({
  r: clamp01(c.r),
  g: clamp01(c.g),
  b: clamp01(c.b),
  a: clamp01(c.a),
});

function isValidFigmaHyperlinkUrl(href: string | undefined): href is string {
  return typeof href === "string" && /^(?:https?:\/\/|mailto:)\S+/i.test(href.trim());
}

export function countSerializedNodes(node: SerializedNode): number {
  if (node.type !== "FRAME") return 1;
  let total = 1;
  for (const child of node.children) {
    total += countSerializedNodes(child);
  }
  return total;
}

function bytesFingerprint(bytes: Uint8Array): string {
  let hash = 2166136261;
  for (let i = 0; i < bytes.length; i++) {
    hash ^= bytes[i];
    hash = Math.imul(hash, 16777619);
  }
  return `${bytes.length}:${hash >>> 0}`;
}

function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function registerDocumentAssets(
  assets: Record<string, SerializedImageAsset>,
  figmaApi: PluginAPI,
  warnings: string[]
): { imageHashes: Map<string, string>; imageCount: number } {
  const imageHashes = new Map<string, string>();
  const byContent = new Map<string, Array<{ bytes: Uint8Array; hash: string }>>();
  let imageCount = 0;

  for (const [assetId, asset] of Object.entries(assets)) {
    if (imageHashes.has(assetId)) continue;
    const rawBytes =
      asset.bytes instanceof Uint8Array ? asset.bytes : new Uint8Array(asset.bytes);
    if (rawBytes.length === 0) continue;

    const fp = bytesFingerprint(rawBytes);
    const bucket = byContent.get(fp);
    const existing = bucket?.find((entry) => bytesEqual(entry.bytes, rawBytes));
    if (existing) {
      imageHashes.set(assetId, existing.hash);
      continue;
    }

    try {
      const created = figmaApi.createImage(rawBytes);
      imageHashes.set(assetId, created.hash);
      if (bucket) bucket.push({ bytes: rawBytes, hash: created.hash });
      else byContent.set(fp, [{ bytes: rawBytes, hash: created.hash }]);
      imageCount++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      warnings.push(`Skipped image "${assetId}": ${msg}`);
    }
  }

  return { imageHashes, imageCount };
}

function convertPaints(
  paints: SerializedPaint[],
  imageHashes: Map<string, string>
): Paint[] {
  const out: Paint[] = [];
  for (const paint of paints) {
    if (paint.type === "SOLID") {
      out.push({
        type: "SOLID",
        color: toRgb(paint.color),
        opacity: clamp01(paint.color.a),
      });
    } else if (paint.type === "GRADIENT_LINEAR" || paint.type === "GRADIENT_RADIAL") {
      if (paint.stops.length < 2) continue;
      out.push({
        type: paint.type,
        gradientTransform: paint.gradientTransform,
        gradientStops: paint.stops.map((stop) => ({
          position: clamp01(stop.position),
          color: toRgba(stop.color),
        })),
        ...(paint.opacity !== undefined ? { opacity: clamp01(paint.opacity) } : {}),
      });
    } else if (paint.type === "IMAGE") {
      const imageHash = imageHashes.get(paint.assetId);
      if (!imageHash) continue;
      out.push({
        type: "IMAGE",
        imageHash,
        scaleMode: paint.scaleMode,
        ...(paint.opacity !== undefined ? { opacity: clamp01(paint.opacity) } : {}),
      });
    }
  }
  return out;
}

function convertEffects(effects: SerializedEffect[]): Effect[] {
  return effects.map((effect) => {
    if (effect.type === "DROP_SHADOW" || effect.type === "INNER_SHADOW") {
      return {
        type: effect.type,
        color: toRgba(effect.color ?? { r: 0, g: 0, b: 0, a: 0.25 }),
        offset: { x: effect.offsetX ?? 0, y: effect.offsetY ?? 0 },
        radius: Math.max(0, effect.radius),
        ...(effect.spread !== undefined ? { spread: effect.spread } : {}),
        visible: true,
        blendMode: "NORMAL",
      };
    }
    return {
      type: effect.type,
      radius: Math.max(0, effect.radius),
      visible: true,
    };
  });
}

function solidPaintKey(color: RGB, opacity: number): string {
  const r = Math.round(clamp01(color.r) * 255);
  const g = Math.round(clamp01(color.g) * 255);
  const b = Math.round(clamp01(color.b) * 255);
  const a = Math.round(clamp01(opacity) * 100) / 100;
  return `${r},${g},${b},${a}`;
}

function formatPaintStyleName(color: RGB, opacity: number): string {
  const hex = [color.r, color.g, color.b]
    .map((v) => Math.round(clamp01(v) * 255).toString(16).padStart(2, "0"))
    .join("");
  const alpha = Math.round(clamp01(opacity) * 100);
  return alpha < 100 ? `Colors/#${hex} (${alpha}%)` : `Colors/#${hex}`;
}

function textStyleKey(
  fontName: FontName,
  fontSize: number,
  lineHeight: LineHeight | undefined,
  letterSpacing: LetterSpacing | undefined,
  textCase: TextCase | undefined,
  textDecoration: TextDecoration | undefined
): string {
  const lh =
    !lineHeight || lineHeight.unit === "AUTO"
      ? "AUTO"
      : `${lineHeight.value}:${lineHeight.unit}`;
  const ls = letterSpacing ? `${letterSpacing.value}:${letterSpacing.unit}` : "0:PIXELS";
  return [
    fontName.family,
    fontName.style,
    fontSize,
    lh,
    ls,
    textCase ?? "ORIGINAL",
    textDecoration ?? "NONE",
  ].join("::");
}

async function initStyleRegistry(figmaApi: PluginAPI): Promise<StyleRegistry> {
  const [existingPaint, existingText] = await Promise.all([
    figmaApi.getLocalPaintStylesAsync(),
    figmaApi.getLocalTextStylesAsync(),
  ]);

  const paintStyles = new Map<string, PaintStyle>();
  for (const style of existingPaint) {
    if (style.paints.length === 1 && style.paints[0].type === "SOLID") {
      const p = style.paints[0];
      paintStyles.set(solidPaintKey(p.color, p.opacity ?? 1), style);
    }
  }

  const textStyles = new Map<string, TextStyle>();
  for (const style of existingText) {
    if (style.fontName && typeof style.fontSize === "number") {
      textStyles.set(
        textStyleKey(
          style.fontName,
          style.fontSize,
          style.lineHeight,
          style.letterSpacing,
          style.textCase,
          style.textDecoration
        ),
        style
      );
    }
  }

  return { paintStyles, textStyles, createdCount: 0 };
}

async function bindSolidFillStyle(
  node: FrameNode | TextNode,
  paints: Paint[],
  ctx: BuildContext
): Promise<void> {
  if (!ctx.styles || paints.length !== 1 || paints[0].type !== "SOLID") return;
  if (typeof node.setFillStyleIdAsync !== "function") return;

  const solid = paints[0];
  const opacity = solid.opacity ?? 1;
  const key = solidPaintKey(solid.color, opacity);
  let style = ctx.styles.paintStyles.get(key);
  if (!style) {
    style = ctx.figmaApi.createPaintStyle();
    style.name = formatPaintStyleName(solid.color, opacity);
    style.paints = [solid];
    ctx.styles.paintStyles.set(key, style);
    ctx.styles.createdCount++;
  }
  await node.setFillStyleIdAsync(style.id);
}

async function bindTextStyle(
  node: TextNode,
  fontName: FontName,
  fontSize: number,
  lineHeight: LineHeight,
  letterSpacing: LetterSpacing,
  textCase: TextCase,
  textDecoration: TextDecoration,
  ctx: BuildContext
): Promise<void> {
  if (!ctx.styles || typeof node.setTextStyleIdAsync !== "function") return;

  const key = textStyleKey(
    fontName,
    fontSize,
    lineHeight,
    letterSpacing,
    textCase,
    textDecoration
  );
  let style = ctx.styles.textStyles.get(key);
  if (!style) {
    style = ctx.figmaApi.createTextStyle();
    style.name = `${fontName.family}/${fontName.style} ${Math.round(fontSize)}px`;
    style.fontName = fontName;
    style.fontSize = fontSize;
    style.lineHeight = lineHeight;
    style.letterSpacing = letterSpacing;
    style.textCase = textCase;
    style.textDecoration = textDecoration;
    ctx.styles.textStyles.set(key, style);
    ctx.styles.createdCount++;
  }
  await node.setTextStyleIdAsync(style.id);
}

async function tickNodeProgress(ctx: BuildContext): Promise<void> {
  ctx.summary.nodeCount++;
  ctx.processedNodes++;
  if (ctx.processedNodes % 40 === 0) {
    ctx.onProgress?.(ctx.processedNodes, ctx.totalNodes);
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  }
}

async function buildTextNode(
  node: SerializedTextNode,
  ctx: BuildContext
): Promise<TextNode> {
  const textNode = ctx.figmaApi.createText();
  const baseFont = resolveFontForText(
    ctx.resolvedFonts,
    node.fontFamily,
    node.fontWeight,
    node.fontStyle
  );
  const fontSize = Math.max(1, node.fontSize || 16);
  const lineHeight: LineHeight =
    node.lineHeightPx > 0
      ? { value: node.lineHeightPx, unit: "PIXELS" }
      : { unit: "AUTO" };
  const letterSpacing: LetterSpacing = {
    value: node.letterSpacingPx || 0,
    unit: "PIXELS",
  };
  const textDecoration: TextDecoration = node.textDecoration ?? "NONE";
  const textCase: TextCase = node.textCase ?? "ORIGINAL";
  const fills = convertPaints(node.fills, ctx.imageHashes);

  textNode.name = node.name;
  // Set fontName to a preloaded font before assigning characters.
  textNode.fontName = baseFont;
  textNode.fontSize = fontSize;
  textNode.characters = node.characters;
  textNode.textAlignHorizontal = node.textAlign;
  textNode.lineHeight = lineHeight;
  textNode.letterSpacing = letterSpacing;
  textNode.textDecoration = textDecoration;
  textNode.textCase = textCase;
  textNode.fills = fills;
  if (textNode.characters.length > 0 && node.href) {
    if (isValidFigmaHyperlinkUrl(node.href)) {
      try {
        textNode.hyperlink = { type: "URL", value: node.href.trim() };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        ctx.summary.warnings.push(`Skipped hyperlink on "${node.name}": ${msg}`);
      }
    } else {
      ctx.summary.warnings.push(`Skipped unsupported hyperlink "${node.href}" on "${node.name}"`);
    }
  }
  textNode.textAutoResize = "NONE";
  textNode.resize(Math.max(1, node.width), Math.max(1, node.height));
  textNode.opacity = clamp01(node.opacity);

  // Bind base styles before mixed-character ranges so range overrides stay intact.
  await bindTextStyle(
    textNode,
    baseFont,
    fontSize,
    lineHeight,
    letterSpacing,
    textCase,
    textDecoration,
    ctx
  );
  await bindSolidFillStyle(textNode, fills, ctx);

  const len = node.characters.length;
  for (const range of node.ranges) {
    const start = Math.max(0, range.start);
    const end = Math.min(len, range.end);
    if (start >= end) continue;

    if (
      range.fontFamily !== undefined ||
      range.fontWeight !== undefined ||
      range.fontStyle !== undefined
    ) {
      const rangeFont = resolveFontForText(
        ctx.resolvedFonts,
        range.fontFamily ?? node.fontFamily,
        range.fontWeight ?? node.fontWeight,
        range.fontStyle ?? node.fontStyle
      );
      if (typeof textNode.setRangeFontName === "function") {
        textNode.setRangeFontName(start, end, rangeFont);
      }
    }
    if (range.fontSize !== undefined && typeof textNode.setRangeFontSize === "function") {
      textNode.setRangeFontSize(start, end, Math.max(1, range.fontSize));
    }
    if (range.fills !== undefined && typeof textNode.setRangeFills === "function") {
      const rangeFills = convertPaints(range.fills, ctx.imageHashes);
      if (rangeFills.length > 0) {
        textNode.setRangeFills(start, end, rangeFills);
      }
    }
    if (
      range.textDecoration !== undefined &&
      typeof textNode.setRangeTextDecoration === "function"
    ) {
      textNode.setRangeTextDecoration(start, end, range.textDecoration);
    }
    if (range.textCase !== undefined && typeof textNode.setRangeTextCase === "function") {
      textNode.setRangeTextCase(start, end, range.textCase);
    }
    if (
      range.letterSpacingPx !== undefined &&
      typeof textNode.setRangeLetterSpacing === "function"
    ) {
      textNode.setRangeLetterSpacing(start, end, {
        value: range.letterSpacingPx,
        unit: "PIXELS",
      });
    }
    if (
      range.lineHeightPx !== undefined &&
      range.lineHeightPx > 0 &&
      typeof textNode.setRangeLineHeight === "function"
    ) {
      textNode.setRangeLineHeight(start, end, {
        value: range.lineHeightPx,
        unit: "PIXELS",
      });
    }
    if (
      textNode.characters.length > 0 &&
      range.href !== undefined &&
      typeof textNode.setRangeHyperlink === "function"
    ) {
      if (isValidFigmaHyperlinkUrl(range.href)) {
        try {
          textNode.setRangeHyperlink(start, end, { type: "URL", value: range.href.trim() });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          ctx.summary.warnings.push(`Skipped range hyperlink on "${node.name}": ${msg}`);
        }
      } else {
        ctx.summary.warnings.push(`Skipped unsupported range hyperlink "${range.href}" on "${node.name}"`);
      }
    }
  }

  await tickNodeProgress(ctx);
  return textNode;
}

async function buildFrameNode(
  node: SerializedFrameNode,
  ctx: BuildContext
): Promise<FrameNode> {
  const frame = ctx.figmaApi.createFrame();
  const fills = convertPaints(node.fills, ctx.imageHashes);
  const strokes = convertPaints(node.strokes, ctx.imageHashes);

  frame.name = node.name;
  frame.opacity = clamp01(node.opacity);
  frame.clipsContent = node.clipsContent;
  frame.fills = fills;
  frame.strokes = strokes;
  if (strokes.length > 0) {
    if (node.strokeWeight !== undefined) {
      frame.strokeWeight = Math.max(0, node.strokeWeight);
    }
    if (node.strokeWeights) {
      const [t, r, b, l] = node.strokeWeights.map((w) => Math.max(0, w));
      if (t !== r || t !== b || t !== l) {
        frame.strokeTopWeight = t;
        frame.strokeRightWeight = r;
        frame.strokeBottomWeight = b;
        frame.strokeLeftWeight = l;
      }
    }
  }
  frame.topLeftRadius = Math.max(0, node.cornerRadius[0] ?? 0);
  frame.topRightRadius = Math.max(0, node.cornerRadius[1] ?? 0);
  frame.bottomRightRadius = Math.max(0, node.cornerRadius[2] ?? 0);
  frame.bottomLeftRadius = Math.max(0, node.cornerRadius[3] ?? 0);
  frame.effects = convertEffects(node.effects);
  if (node.rotation !== undefined && node.rotation !== 0) {
    frame.rotation = node.rotation;
  }

  const autoLayout =
    ctx.settings.useAutoLayout && node.layout
      ? computeAutoLayoutConfig(node.layout, node.children)
      : null;

  if (autoLayout) {
    frame.layoutMode = autoLayout.layoutMode;
    frame.primaryAxisSizingMode = "FIXED";
    frame.counterAxisSizingMode = "FIXED";
    frame.primaryAxisAlignItems = autoLayout.primaryAxisAlignItems;
    frame.counterAxisAlignItems = autoLayout.counterAxisAlignItems;
    frame.layoutWrap = autoLayout.layoutWrap;
    frame.itemSpacing = autoLayout.itemSpacing;
    if (autoLayout.counterAxisSpacing !== undefined) {
      frame.counterAxisSpacing = autoLayout.counterAxisSpacing;
    }
    frame.paddingTop = autoLayout.paddingTop;
    frame.paddingRight = autoLayout.paddingRight;
    frame.paddingBottom = autoLayout.paddingBottom;
    frame.paddingLeft = autoLayout.paddingLeft;
  } else {
    frame.layoutMode = "NONE";
  }

  frame.resize(Math.max(1, node.width), Math.max(1, node.height));
  await bindSolidFillStyle(frame, fills, ctx);
  await tickNodeProgress(ctx);

  for (const child of node.children) {
    const childFigmaNode = await buildNode(child, ctx);
    if (!childFigmaNode) continue;

    frame.appendChild(childFigmaNode);
    const relX = child.x - node.x;
    const relY = child.y - node.y;
    childFigmaNode.x = relX;
    childFigmaNode.y = relY;

    // Figma throws if layoutPositioning="ABSOLUTE" is set outside an Auto Layout parent.
    if (
      frame.layoutMode !== "NONE" &&
      (child.position === "absolute" || child.position === "fixed")
    ) {
      childFigmaNode.layoutPositioning = "ABSOLUTE";
      childFigmaNode.x = relX;
      childFigmaNode.y = relY;
    }
  }

  return frame;
}

async function buildNode(
  node: SerializedNode,
  ctx: BuildContext
): Promise<SceneNode | null> {
  if (node.type === "FRAME") {
    return buildFrameNode(node, ctx);
  }
  if (node.type === "TEXT") {
    return buildTextNode(node, ctx);
  }

  try {
    const svgFrame = ctx.figmaApi.createNodeFromSvg(node.svg);
    svgFrame.name = node.name;
    svgFrame.opacity = clamp01(node.opacity);
    svgFrame.resize(Math.max(1, node.width), Math.max(1, node.height));
    await tickNodeProgress(ctx);
    return svgFrame;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    ctx.summary.warnings.push(`Skipped SVG "${node.name}": ${msg}`);
    return null;
  }
}

export async function buildFigmaPage(
  doc: SerializedDocument,
  settings: ImportSettings,
  originX: number,
  figmaApi: PluginAPI = figma,
  options?: BuildPageOptions
): Promise<ImportSummary> {
  const warnings: string[] = [];
  const { imageHashes, imageCount } = registerDocumentAssets(
    doc.assets,
    figmaApi,
    warnings
  );
  const { resolved, substitutions } = await preloadDocumentFonts(
    [doc.root],
    figmaApi
  );
  const styles = settings.createStyles
    ? await initStyleRegistry(figmaApi)
    : null;

  const summary: ImportSummary = {
    nodeCount: 0,
    imageCount,
    ...(settings.createStyles ? { styleCount: 0 } : {}),
    substitutedFonts: substitutions,
    warnings,
  };

  const ctx: BuildContext = {
    figmaApi,
    settings,
    imageHashes,
    resolvedFonts: resolved,
    styles,
    summary,
    totalNodes: countSerializedNodes(doc.root),
    processedNodes: 0,
    onProgress: options?.onProgress,
  };

  const rootFrame = await buildFrameNode(doc.root, ctx);
  figmaApi.currentPage.appendChild(rootFrame);
  rootFrame.x = originX;
  rootFrame.y = 0;
  options?.onRootFrame?.(rootFrame);

  if (styles) {
    summary.styleCount = styles.createdCount;
  }
  return summary;
}
