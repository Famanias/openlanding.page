import type { RgbaColor } from "../shared/types";

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

const parseAlpha = (raw: string | undefined): number => {
  if (!raw || raw === "none") return raw === "none" ? 0 : 1;
  const v = raw.endsWith("%") ? parseFloat(raw) / 100 : parseFloat(raw);
  return Number.isFinite(v) ? clamp01(v) : 1;
};

const parseChannel = (raw: string, max = 255): number => {
  if (raw === "none") return 0;
  const v = raw.endsWith("%") ? (parseFloat(raw) / 100) * max : parseFloat(raw);
  return Number.isFinite(v) ? v : NaN;
};

const parseAngleDeg = (raw: string): number => {
  if (raw === "none") return 0;
  const n = parseFloat(raw);
  if (!Number.isFinite(n)) return NaN;
  if (raw.endsWith("turn")) return n * 360;
  if (raw.endsWith("rad")) return (n * 180) / Math.PI;
  if (raw.endsWith("grad")) return n * 0.9;
  return n;
};

const linearToSrgb = (c: number): number => {
  const s = c < 0 ? -1 : 1;
  const a = Math.abs(c);
  return s * (a <= 0.0031308 ? 12.92 * a : 1.055 * a ** (1 / 2.4) - 0.055);
};

const srgbToLinear = (c: number): number => {
  const s = c < 0 ? -1 : 1;
  const a = Math.abs(c);
  return s * (a <= 0.04045 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4);
};

const hslToRgb = (hDeg: number, s: number, l: number, a: number): RgbaColor => {
  const h = (((hDeg % 360) + 360) % 360) / 60;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = l - c / 2;
  const [r1, g1, b1] =
    h < 1 ? [c, x, 0] : h < 2 ? [x, c, 0] : h < 3 ? [0, c, x] : h < 4 ? [0, x, c] : h < 5 ? [x, 0, c] : [c, 0, x];
  return { r: clamp01(r1 + m), g: clamp01(g1 + m), b: clamp01(b1 + m), a };
};

const oklabToSrgb = (L: number, a: number, b: number, alpha: number): RgbaColor => {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return {
    r: clamp01(linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    g: clamp01(linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    b: clamp01(linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
    a: alpha,
  };
};

let canvasCtx: CanvasRenderingContext2D | null | undefined;
const getCanvasCtx = (): CanvasRenderingContext2D | null => {
  if (canvasCtx !== undefined) return canvasCtx;
  if (typeof document === "undefined") return (canvasCtx = null);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  return (canvasCtx = canvas.getContext("2d", { willReadFrequently: true }));
};

const resolveViaCanvas = (css: string): RgbaColor | null => {
  const ctx = getCanvasCtx();
  if (!ctx) return null;
  ctx.fillStyle = "#010203";
  ctx.fillStyle = css;
  if (ctx.fillStyle === "#010203") {
    ctx.fillStyle = "#040506";
    ctx.fillStyle = css;
    if (ctx.fillStyle === "#040506") return null;
  }
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return { r: r / 255, g: g / 255, b: b / 255, a: a / 255 };
};

const splitArgsAndAlpha = (body: string, allow4thAlpha: boolean): [string[], string | undefined] => {
  const [main, alpha] = body.split("/").map((s) => s.trim());
  const parts = main.includes(",") ? main.split(",").map((s) => s.trim()) : main.split(/\s+/).filter(Boolean);
  if (alpha !== undefined) return [parts, alpha];
  return allow4thAlpha && parts.length === 4 ? [parts.slice(0, 3), parts[3]] : [parts, undefined];
};

export function parseCssColor(
  input: string,
  fallbackResolver?: (css: string) => RgbaColor | null
): RgbaColor | null {
  const s = input.trim().toLowerCase();
  if (!s) return null;
  if (s === "transparent") return { r: 0, g: 0, b: 0, a: 0 };

  if (s[0] === "#") {
    const h = s.slice(1);
    if (h.length === 3 || h.length === 4) {
      const n = [...h].map((c) => parseInt(c + c, 16) / 255);
      return n.some(Number.isNaN) ? null : { r: n[0], g: n[1], b: n[2], a: n[3] ?? 1 };
    }
    if (h.length === 6 || h.length === 8) {
      const n = [0, 2, 4, 6].slice(0, h.length / 2).map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
      return n.some(Number.isNaN) ? null : { r: n[0], g: n[1], b: n[2], a: n[3] ?? 1 };
    }
    return null;
  }

  const fn = s.match(/^([a-z-]+)\((.+)\)$/);
  if (fn) {
    const [, name, body] = fn;
    const [parts, alphaRaw] = splitArgsAndAlpha(body, name !== "color");
    const a = parseAlpha(alphaRaw);

    if ((name === "rgb" || name === "rgba") && parts.length === 3) {
      const [r, g, b] = parts.map((p) => parseChannel(p, 255) / 255);
      if ([r, g, b].some(Number.isNaN)) return null;
      return { r: clamp01(r), g: clamp01(g), b: clamp01(b), a };
    }

    if ((name === "hsl" || name === "hsla") && parts.length === 3) {
      const h = parseAngleDeg(parts[0]);
      const sat = clamp01(parseChannel(parts[1], 100) / 100);
      const lig = clamp01(parseChannel(parts[2], 100) / 100);
      if ([h, sat, lig].some(Number.isNaN)) return null;
      return hslToRgb(h, sat, lig, a);
    }

    if (name === "color" && parts.length === 4) {
      const [space, c0, c1, c2] = parts;
      const [v0, v1, v2] = [c0, c1, c2].map((p) => parseChannel(p, 1));
      if ([v0, v1, v2].some(Number.isNaN)) return null;
      if (space === "srgb") return { r: clamp01(v0), g: clamp01(v1), b: clamp01(v2), a };
      if (space === "srgb-linear") {
        return { r: clamp01(linearToSrgb(v0)), g: clamp01(linearToSrgb(v1)), b: clamp01(linearToSrgb(v2)), a };
      }
      if (space === "display-p3") {
        const [lr, lg, lb] = [srgbToLinear(v0), srgbToLinear(v1), srgbToLinear(v2)];
        return {
          r: clamp01(linearToSrgb(1.2249401 * lr - 0.2249402 * lg)),
          g: clamp01(linearToSrgb(-0.042057 * lr + 1.042057 * lg)),
          b: clamp01(linearToSrgb(-0.0196376 * lr - 0.078636 * lg + 1.0982736 * lb)),
          a,
        };
      }
    }

    if ((name === "oklab" || name === "oklch") && parts.length === 3) {
      const L = parseChannel(parts[0], 1);
      if (name === "oklab") {
        const oa = parseChannel(parts[1], 0.4);
        const ob = parseChannel(parts[2], 0.4);
        if (![L, oa, ob].some(Number.isNaN)) return oklabToSrgb(L, oa, ob, a);
      } else {
        const C = parseChannel(parts[1], 0.4);
        const H = (parseAngleDeg(parts[2]) * Math.PI) / 180;
        if (![L, C, H].some(Number.isNaN)) return oklabToSrgb(L, C * Math.cos(H), C * Math.sin(H), a);
      }
    }
  }

  return fallbackResolver?.(input) ?? resolveViaCanvas(input);
}
