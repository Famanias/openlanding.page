import type {
  RgbaColor,
  SerializedEffect,
  SerializedGradientPaint,
  SerializedGradientStop,
} from "../shared/types";
import { parseCssColor } from "./color";

export function splitTopLevelComma(input: string): string[] {
  return splitTopLevel(input, ",");
}

function splitTopLevel(input: string, delimiter: "," | "space"): string[] {
  const out: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let start = 0;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quote) {
      if (ch === "\\" && i + 1 < input.length) i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "(") depth++;
    else if (ch === ")" && depth > 0) depth--;
    else if (depth === 0 && (delimiter === "," ? ch === "," : /\s/.test(ch))) {
      const part = input.slice(start, i).trim();
      if (part) out.push(part);
      start = i + 1;
    }
  }
  const tail = input.slice(start).trim();
  if (tail) out.push(tail);
  return out;
}

const DIRECTION_ANGLES: Record<string, number> = {
  "to top": 0,
  "to top right": 45,
  "to right top": 45,
  "to right": 90,
  "to bottom right": 135,
  "to right bottom": 135,
  "to bottom": 180,
  "to bottom left": 225,
  "to left bottom": 225,
  "to left": 270,
  "to top left": 315,
  "to left top": 315,
};

function parseGradientAngleDeg(token: string): number | null {
  const lower = token.trim().toLowerCase();
  if (lower in DIRECTION_ANGLES) return DIRECTION_ANGLES[lower];
  const m = lower.match(/^(-?[\d.]+)(deg|rad|grad|turn)$/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (m[2] === "turn") return n * 360;
  if (m[2] === "rad") return (n * 180) / Math.PI;
  if (m[2] === "grad") return n * 0.9;
  return n;
}

function linearGradientTransform(angleDeg: number): [[number, number, number], [number, number, number]] {
  const rad = (angleDeg * Math.PI) / 180;
  const z = (n: number): number => (Math.abs(n) < 1e-12 ? 0 : n);
  const dx = z(Math.sin(rad));
  const dy = z(-Math.cos(rad));
  // Scale so the gradient line spans the farthest corners of the [0,1]x[0,1] node box.
  const scale = 1 / (Math.abs(dx) + Math.abs(dy) || 1);
  const a = z(dx * scale);
  const b = z(dy * scale);
  return [
    [a, b, z(0.5 - 0.5 * (a + b))],
    [z(-b), a, z(0.5 - 0.5 * (a - b))],
  ];
}

export interface ResolvedBackgroundBox {
  x: number;
  y: number;
  width: number;
  height: number;
  isZero: boolean;
  isFullBox: boolean;
}

function parseLengthOrPercent(token: string, refDim: number): number | null {
  const trimmed = token.trim().toLowerCase();
  if (!trimmed || trimmed === "auto") return null;
  const calcMatch = trimmed.match(
    /^calc\(\s*(-?[\d.]+)(%|px)\s*([+-])\s*(-?[\d.]+)(%|px)\s*\)$/i
  );
  if (calcMatch) {
    const a = calcMatch[2] === "%" ? (parseFloat(calcMatch[1]) / 100) * refDim : parseFloat(calcMatch[1]);
    const b = calcMatch[5] === "%" ? (parseFloat(calcMatch[4]) / 100) * refDim : parseFloat(calcMatch[4]);
    return calcMatch[3] === "-" ? a - b : a + b;
  }
  if (trimmed.endsWith("%")) {
    const n = parseFloat(trimmed);
    return Number.isFinite(n) ? (n / 100) * refDim : null;
  }
  const n = parseFloat(trimmed);
  return Number.isFinite(n) ? n : null;
}

function parsePositionCoord(token: string, boxDim: number, layerDim: number): number {
  const lower = token.trim().toLowerCase();
  if (lower === "left" || lower === "top") return 0;
  if (lower === "center") return (boxDim - layerDim) / 2;
  if (lower === "right" || lower === "bottom") return boxDim - layerDim;
  const calcMatch = lower.match(
    /^calc\(\s*(-?[\d.]+)%\s*([+-])\s*(-?[\d.]+)px\s*\)$/i
  );
  if (calcMatch) {
    const pct = parseFloat(calcMatch[1]) / 100;
    const px = parseFloat(calcMatch[3]);
    const base = (boxDim - layerDim) * pct;
    return calcMatch[2] === "-" ? base - px : base + px;
  }
  if (lower.endsWith("%")) {
    const pct = parseFloat(lower);
    return Number.isFinite(pct) ? (boxDim - layerDim) * (pct / 100) : 0;
  }
  const n = parseFloat(lower);
  return Number.isFinite(n) ? n : 0;
}

export function resolveBackgroundLayerBox(
  bgSizeRaw: string,
  bgPosRaw: string,
  boxW: number,
  boxH: number
): ResolvedBackgroundBox {
  const sizeStr = (bgSizeRaw || "").trim().toLowerCase();
  let width = boxW;
  let height = boxH;

  if (sizeStr && sizeStr !== "auto" && sizeStr !== "auto auto" && sizeStr !== "cover" && sizeStr !== "contain") {
    const tokens = splitTopLevel(sizeStr, "space");
    const wParsed = tokens[0] ? parseLengthOrPercent(tokens[0], boxW) : null;
    const hParsed = tokens[1] ? parseLengthOrPercent(tokens[1], boxH) : null;
    if (wParsed !== null) width = Math.max(0, wParsed);
    if (hParsed !== null) height = Math.max(0, hParsed);
  }

  const isZero = width <= 0.01 || height <= 0.01;
  const posTokens = splitTopLevel((bgPosRaw || "").trim(), "space");
  const x = posTokens[0] ? parsePositionCoord(posTokens[0], boxW, width) : 0;
  const y = posTokens[1]
    ? parsePositionCoord(posTokens[1], boxH, height)
    : posTokens[0]
      ? (boxH - height) / 2
      : 0;

  const isFullBox =
    !isZero &&
    width >= boxW * 0.98 &&
    height >= boxH * 0.98 &&
    Math.abs(x) <= 1.5 &&
    Math.abs(y) <= 1.5;

  return { x, y, width, height, isZero, isFullBox };
}

function parseGradientStops(
  rawStops: string[],
  resolve: (css: string) => RgbaColor | null,
  refLengthPx?: number
): { stops: SerializedGradientStop[]; maxPxStop: number | null } {
  const parsed: Array<{ color: RgbaColor; pos: number | null }> = [];
  let maxPxStop: number | null = null;
  let hasPercentStop = false;

  const rawParsed: Array<{
    color: RgbaColor;
    pctPositions: number[];
    pxPositions: number[];
  }> = [];

  for (const raw of rawStops) {
    const tokens = splitTopLevel(raw, "space");
    if (!tokens.length) continue;
    const color = resolve(tokens[0]);
    if (!color) continue;
    const pctPositions: number[] = [];
    const pxPositions: number[] = [];
    for (const t of tokens.slice(1)) {
      if (t.endsWith("%")) {
        const v = parseFloat(t);
        if (Number.isFinite(v)) {
          hasPercentStop = true;
          pctPositions.push(Math.max(0, Math.min(1, v / 100)));
        }
      } else if (/^-?[\d.]+px$/i.test(t) || t === "0") {
        const v = parseFloat(t);
        if (Number.isFinite(v)) {
          pxPositions.push(v);
          if (maxPxStop === null || v > maxPxStop) maxPxStop = v;
        }
      }
    }
    rawParsed.push({ color, pctPositions, pxPositions });
  }

  const effectivePxDenom =
    refLengthPx && refLengthPx > 0
      ? refLengthPx
      : !hasPercentStop && maxPxStop && maxPxStop > 0
        ? maxPxStop
        : null;

  for (const item of rawParsed) {
    const positions =
      item.pctPositions.length > 0
        ? item.pctPositions
        : effectivePxDenom !== null && item.pxPositions.length > 0
          ? item.pxPositions.map((px) => Math.max(0, Math.min(1, px / effectivePxDenom)))
          : [];
    if (positions.length >= 2) {
      parsed.push({ color: item.color, pos: positions[0] }, { color: item.color, pos: positions[1] });
    } else {
      parsed.push({ color: item.color, pos: positions[0] ?? null });
    }
  }
  if (parsed.length < 2) return { stops: [], maxPxStop };

  if (parsed[0].pos === null) parsed[0].pos = 0;
  if (parsed[parsed.length - 1].pos === null) parsed[parsed.length - 1].pos = 1;

  for (let i = 0; i < parsed.length; i++) {
    if (parsed[i].pos !== null) continue;
    let next = i + 1;
    while (parsed[next].pos === null) next++;
    const prevPos = parsed[i - 1].pos!;
    const step = (parsed[next].pos! - prevPos) / (next - i + 1);
    for (let k = i; k < next; k++) parsed[k].pos = prevPos + step * (k - i + 1);
  }

  return {
    stops: parsed.map((s) => ({ position: s.pos!, color: s.color })),
    maxPxStop: !hasPercentStop ? maxPxStop : null,
  };
}

function buildRadialGradientTransform(
  prelude: string | null,
  box: { width: number; height: number } | undefined,
  explicitRadiusPx: number | null
): [[number, number, number], [number, number, number]] {
  const identity: [[number, number, number], [number, number, number]] = [
    [1, 0, 0],
    [0, 1, 0],
  ];
  if (!box || box.width <= 0 || box.height <= 0) return identity;

  let cx = 0.5;
  let cy = 0.5;
  let rx = 0.5;
  let ry = 0.5;

  if (prelude) {
    const atMatch = prelude.match(/\bat\s+(.+)$/i);
    if (atMatch) {
      const posTokens = splitTopLevel(atMatch[1].trim(), "space");
      if (posTokens[0]) {
        cx = parsePositionCoord(posTokens[0], box.width, 0) / box.width;
      }
      if (posTokens[1]) {
        cy = parsePositionCoord(posTokens[1], box.height, 0) / box.height;
      }
    }
    const beforeAt = prelude.replace(/\bat\s+.+$/i, "").trim();
    const sizeTokens = splitTopLevel(beforeAt, "space").filter(
      (t) => !/^(?:circle|ellipse|closest-side|farthest-side|closest-corner|farthest-corner)$/i.test(t)
    );
    if (sizeTokens.length >= 2) {
      const wVal = parseLengthOrPercent(sizeTokens[0], box.width);
      const hVal = parseLengthOrPercent(sizeTokens[1], box.height);
      if (wVal && wVal > 0) rx = wVal / box.width;
      if (hVal && hVal > 0) ry = hVal / box.height;
    } else if (sizeTokens.length === 1) {
      const rVal = parseLengthOrPercent(sizeTokens[0], Math.max(box.width, box.height));
      if (rVal && rVal > 0) {
        rx = rVal / box.width;
        ry = rVal / box.height;
      }
    }
  }

  if (explicitRadiusPx && explicitRadiusPx > 0) {
    rx = explicitRadiusPx / box.width;
    ry = explicitRadiusPx / box.height;
  }

  const sx = 0.5 / Math.max(1e-4, rx);
  const sy = 0.5 / Math.max(1e-4, ry);
  const z = (n: number): number => (Math.abs(n) < 1e-12 ? 0 : n);
  return [
    [z(sx), 0, z(0.5 - sx * cx)],
    [0, z(sy), z(0.5 - sy * cy)],
  ];
}

export function parseCssGradient(
  gradientCss: string,
  resolveColor?: (css: string) => RgbaColor | null,
  box?: { width: number; height: number }
): SerializedGradientPaint | null {
  const match = gradientCss.trim().match(/^(?:repeating-)?(linear|radial)-gradient\(([\s\S]+)\)$/i);
  if (!match) return null;

  const resolve = resolveColor ?? ((css: string) => parseCssColor(css));
  const args = splitTopLevelComma(match[2]);
  if (args.length < 2) return null;

  if (match[1].toLowerCase() === "linear") {
    const angle = parseGradientAngleDeg(args[0]);
    const effectiveAngle = angle ?? 180;
    const stopArgs = angle !== null ? args.slice(1) : args;
    const rad = (effectiveAngle * Math.PI) / 180;
    const lineLen =
      box && box.width > 0 && box.height > 0
        ? Math.abs(Math.sin(rad)) * box.width + Math.abs(Math.cos(rad)) * box.height
        : undefined;
    const { stops } = parseGradientStops(stopArgs, resolve, lineLen);
    if (stops.length < 2) return null;
    return {
      type: "GRADIENT_LINEAR",
      gradientTransform: linearGradientTransform(effectiveAngle),
      stops,
    };
  }

  const firstTokens = splitTopLevel(args[0], "space");
  const firstIsStop = firstTokens.length > 0 && resolve(firstTokens[0]) !== null;
  const prelude = firstIsStop ? null : args[0];
  const { stops, maxPxStop } = parseGradientStops(firstIsStop ? args : args.slice(1), resolve);
  if (stops.length < 2) return null;
  return {
    type: "GRADIENT_RADIAL",
    gradientTransform: buildRadialGradientTransform(prelude, box, maxPxStop),
    stops,
  };
}

export function parseCssBackgroundLayers(
  backgroundImage: string,
  resolveColor?: (css: string) => RgbaColor | null,
  box?: { width: number; height: number }
): Array<{ kind: "gradient"; paint: SerializedGradientPaint } | { kind: "url"; url: string }> {
  const trimmed = backgroundImage.trim();
  if (!trimmed || trimmed.toLowerCase() === "none") return [];

  const layers: Array<{ kind: "gradient"; paint: SerializedGradientPaint } | { kind: "url"; url: string }> = [];
  for (const part of splitTopLevelComma(trimmed)) {
    const urlMatch = part.match(/^url\(([\s\S]+)\)$/i);
    if (urlMatch) {
      const url = urlMatch[1].trim().replace(/^(['"])([\s\S]*)\1$/, "$2").trim();
      if (url) layers.push({ kind: "url", url });
      continue;
    }
    const paint = parseCssGradient(part, resolveColor, box);
    if (paint) layers.push({ kind: "gradient", paint });
  }
  return layers;
}

const LENGTH_RE = /^-?(?:\d+\.?\d*|\.\d+)(?:px)?$/i;

export function parseCssBoxShadows(
  boxShadow: string,
  resolveColor?: (css: string) => RgbaColor | null
): SerializedEffect[] {
  const trimmed = boxShadow.trim();
  if (!trimmed || trimmed.toLowerCase() === "none") return [];

  const resolve = resolveColor ?? ((css: string) => parseCssColor(css));
  const effects: SerializedEffect[] = [];

  for (const layer of splitTopLevelComma(trimmed)) {
    let inset = false;
    const lengths: number[] = [];
    let color: RgbaColor | null = null;

    for (const token of splitTopLevel(layer, "space")) {
      if (token.toLowerCase() === "inset") inset = true;
      else if (LENGTH_RE.test(token)) lengths.push(parseFloat(token));
      else if (!color) color = resolve(token);
    }
    if (lengths.length < 2) continue;

    const resolvedColor = color ?? { r: 0, g: 0, b: 0, a: 1 };
    const offsetX = lengths[0];
    const offsetY = lengths[1];
    const radius = Math.max(0, lengths[2] ?? 0);
    const spread = lengths[3] ?? 0;

    if (
      resolvedColor.a <= 0 ||
      (offsetX === 0 && offsetY === 0 && radius === 0 && spread === 0)
    ) {
      continue;
    }

    effects.push({
      type: inset ? "INNER_SHADOW" : "DROP_SHADOW",
      offsetX,
      offsetY,
      radius,
      spread,
      color: resolvedColor,
    });
  }
  return effects;
}

export function parseCornerRadii(
  style: Pick<
    CSSStyleDeclaration,
    "borderTopLeftRadius" | "borderTopRightRadius" | "borderBottomRightRadius" | "borderBottomLeftRadius"
  >,
  boxWidth: number,
  boxHeight: number
): [number, number, number, number] {
  const minSide = Math.max(0, Math.min(boxWidth, boxHeight));
  const maxRadius = minSide / 2;

  const parseOne = (raw: string): number => {
    const first = raw.trim().split(/\s+/)[0] || "0";
    const px = first.endsWith("%") ? (parseFloat(first) / 100) * minSide : parseFloat(first);
    if (!Number.isFinite(px) || px <= 0) return 0;
    return Math.min(px, maxRadius);
  };

  return [
    parseOne(style.borderTopLeftRadius),
    parseOne(style.borderTopRightRadius),
    parseOne(style.borderBottomRightRadius),
    parseOne(style.borderBottomLeftRadius),
  ];
}
