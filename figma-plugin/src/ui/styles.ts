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

function parseGradientStops(
  rawStops: string[],
  resolve: (css: string) => RgbaColor | null
): SerializedGradientStop[] {
  const parsed: Array<{ color: RgbaColor; pos: number | null }> = [];
  for (const raw of rawStops) {
    const tokens = splitTopLevel(raw, "space");
    if (!tokens.length) continue;
    const color = resolve(tokens[0]);
    if (!color) continue;
    const positions = tokens
      .slice(1)
      .filter((t) => t.endsWith("%"))
      .map((t) => Math.max(0, Math.min(1, parseFloat(t) / 100)));
    if (positions.length >= 2) {
      parsed.push({ color, pos: positions[0] }, { color, pos: positions[1] });
    } else {
      parsed.push({ color, pos: positions[0] ?? null });
    }
  }
  if (parsed.length < 2) return [];

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

  return parsed.map((s) => ({ position: s.pos!, color: s.color }));
}

export function parseCssGradient(
  gradientCss: string,
  resolveColor?: (css: string) => RgbaColor | null
): SerializedGradientPaint | null {
  const match = gradientCss.trim().match(/^(?:repeating-)?(linear|radial)-gradient\(([\s\S]+)\)$/i);
  if (!match) return null;

  const resolve = resolveColor ?? ((css: string) => parseCssColor(css));
  const args = splitTopLevelComma(match[2]);
  if (args.length < 2) return null;

  if (match[1].toLowerCase() === "linear") {
    const angle = parseGradientAngleDeg(args[0]);
    const stopArgs = angle !== null ? args.slice(1) : args;
    const stops = parseGradientStops(stopArgs, resolve);
    if (stops.length < 2) return null;
    return {
      type: "GRADIENT_LINEAR",
      gradientTransform: linearGradientTransform(angle ?? 180),
      stops,
    };
  }

  const firstTokens = splitTopLevel(args[0], "space");
  const firstIsStop = firstTokens.length > 0 && resolve(firstTokens[0]) !== null;
  const stops = parseGradientStops(firstIsStop ? args : args.slice(1), resolve);
  if (stops.length < 2) return null;
  return {
    type: "GRADIENT_RADIAL",
    gradientTransform: [
      [1, 0, 0],
      [0, 1, 0],
    ],
    stops,
  };
}

export function parseCssBackgroundLayers(
  backgroundImage: string,
  resolveColor?: (css: string) => RgbaColor | null
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
    const paint = parseCssGradient(part, resolveColor);
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

    effects.push({
      type: inset ? "INNER_SHADOW" : "DROP_SHADOW",
      offsetX: lengths[0],
      offsetY: lengths[1],
      radius: Math.max(0, lengths[2] ?? 0),
      spread: lengths[3] ?? 0,
      color: color ?? { r: 0, g: 0, b: 0, a: 1 },
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
