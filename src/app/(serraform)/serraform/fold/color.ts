export interface HsvColor {
  h: number; // 0..359
  s: number; // 0..100
  v: number; // 0..100
}

export interface RgbColor {
  r: number; // 0..255
  g: number; // 0..255
  b: number; // 0..255
}

const HEX_RE = /^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Normalizes #RGB, RGB, #RRGGBB, or RRGGBB into uppercase #RRGGBB.
 * Returns null for incomplete or invalid color strings.
 */
export function normalizeHex(input: string): string | null {
  const trimmed = input.trim();
  if (!HEX_RE.test(trimmed)) return null;
  const raw = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;
  if (raw.length === 3) {
    const expanded = raw
      .split('')
      .map((ch) => ch + ch)
      .join('');
    return `#${expanded.toUpperCase()}`;
  }
  return `#${raw.toUpperCase()}`;
}

export function hexToRgb(hex: string): RgbColor {
  const norm = normalizeHex(hex) ?? '#000000';
  const n = parseInt(norm.slice(1), 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clampByte = (n: number) =>
    Math.max(0, Math.min(255, Math.round(Number.isFinite(n) ? n : 0)));
  const toPair = (n: number) => clampByte(n).toString(16).padStart(2, '0').toUpperCase();
  return `#${toPair(r)}${toPair(g)}${toPair(b)}`;
}

/**
 * Converts sRGB hex to HSV (h in [0, 359], s in [0, 100], v in [0, 100]).
 * Preserves fallbackHue when saturation is zero so gray/black/white edits remain predictable.
 */
export function hexToHsv(hex: string, fallbackHue = 0): HsvColor {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;

  let h = Number.isFinite(fallbackHue) ? ((fallbackHue % 360) + 360) % 360 : 0;
  if (d > 1e-6) {
    if (max === rn) {
      h = 60 * (((gn - bn) / d) % 6);
    } else if (max === gn) {
      h = 60 * ((bn - rn) / d + 2);
    } else {
      h = 60 * ((rn - gn) / d + 4);
    }
    if (h < 0) h += 360;
  }

  const s = max <= 1e-6 ? 0 : (d / max) * 100;
  const v = max * 100;

  return {
    h: Math.round(h) % 360,
    s: Math.round(s),
    v: Math.round(v),
  };
}

export function hsvToRgb(h: number, s: number, v: number): RgbColor {
  const hue = Number.isFinite(h) ? ((h % 360) + 360) % 360 : 0;
  const sat = Math.max(0, Math.min(100, Number.isFinite(s) ? s : 0)) / 100;
  const val = Math.max(0, Math.min(100, Number.isFinite(v) ? v : 0)) / 100;

  const c = val * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = val - c;

  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (hue < 60) {
    rp = c; gp = x; bp = 0;
  } else if (hue < 120) {
    rp = x; gp = c; bp = 0;
  } else if (hue < 180) {
    rp = 0; gp = c; bp = x;
  } else if (hue < 240) {
    rp = 0; gp = x; bp = c;
  } else if (hue < 300) {
    rp = x; gp = 0; bp = c;
  } else {
    rp = c; gp = 0; bp = x;
  }

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

/**
 * Linearly mixes two sRGB hex colors (t = 0 returns a, t = 1 returns b).
 */
export function mixHex(hexA: string, hexB: string, t: number): string {
  const k = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex(
    a.r + (b.r - a.r) * k,
    a.g + (b.g - a.g) * k,
    a.b + (b.b - a.b) * k,
  );
}

export function hexWithAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export interface Oklab {
  L: number;
  a: number;
  b: number;
}

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export interface PrintContrastAssessment {
  contrastRatio: number;
  deltaE: number;
  deltaL: number;
  isLowContrast: boolean;
  direction: 'lighter' | 'darker';
}

function srgbChannelToLinear(channel255: number): number {
  const v = channel255 / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb255(linear: number): number {
  const clamped = Math.max(0, Math.min(1, linear));
  const encoded =
    clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(1, encoded)) * 255);
}

export function hexToOklab(hex: string): Oklab {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbChannelToLinear(r);
  const G = srgbChannelToLinear(g);
  const B = srgbChannelToLinear(b);

  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);

  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function hexToOklch(hex: string): Oklch {
  const { L, a, b } = hexToOklab(hex);
  const c = Math.hypot(a, b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c, h };
}

function oklabToLinearSrgb(L: number, a: number, b: number): [number, number, number] {
  const l = L + 0.3963377774 * a + 0.2158037573 * b;
  const m = L - 0.1055613458 * a - 0.0638541728 * b;
  const s = L - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l * l * l;
  const m3 = m * m * m;
  const s3 = s * s * s;

  return [
    +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
}

function isInSrgbGamut(rLin: number, gLin: number, bLin: number): boolean {
  const eps = 1e-4;
  return (
    rLin >= -eps &&
    rLin <= 1 + eps &&
    gLin >= -eps &&
    gLin <= 1 + eps &&
    bLin >= -eps &&
    bLin <= 1 + eps
  );
}

/**
 * Converts OKLCH to the nearest in-gamut sRGB hex by binary-searching chroma
 * at the target lightness and hue.
 */
export function oklchToHex(l: number, c: number, h: number): string {
  const L = Math.max(0, Math.min(1, l));
  const C = Math.max(0, c);
  const rad = (h * Math.PI) / 180;
  const cosH = Math.cos(rad);
  const sinH = Math.sin(rad);

  const [r0, g0, b0] = oklabToLinearSrgb(L, C * cosH, C * sinH);
  if (isInSrgbGamut(r0, g0, b0)) {
    return rgbToHex(linearToSrgb255(r0), linearToSrgb255(g0), linearToSrgb255(b0));
  }

  let lo = 0;
  let hi = C;
  for (let i = 0; i < 14; i += 1) {
    const mid = (lo + hi) * 0.5;
    const [r, g, b] = oklabToLinearSrgb(L, mid * cosH, mid * sinH);
    if (isInSrgbGamut(r, g, b)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const [r, g, b] = oklabToLinearSrgb(L, lo * cosH, lo * sinH);
  return rgbToHex(linearToSrgb255(r), linearToSrgb255(g), linearToSrgb255(b));
}

export function colorDistanceOklab(hexA: string, hexB: string): number {
  const a = hexToOklab(hexA);
  const b = hexToOklab(hexB);
  return Math.hypot(a.L - b.L, a.a - b.a, a.b - b.b);
}

export function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Evaluates print legibility on felt panels using both WCAG relative-luminance
 * contrast ratio and OKLab perceptual color difference.
 */
export function evaluatePrintContrast(
  baseHex: string,
  printHex: string,
): PrintContrastAssessment {
  const ratio = contrastRatio(baseHex, printHex);
  const labBase = hexToOklab(baseHex);
  const labPrint = hexToOklab(printHex);
  const deltaL = Math.abs(labBase.L - labPrint.L);
  const deltaE = Math.hypot(deltaL, labBase.a - labPrint.a, labBase.b - labPrint.b);
  const isLowContrast = ratio < 1.8 || (ratio < 2.35 && deltaE < 0.22);
  const direction: 'lighter' | 'darker' = labBase.L < 0.58 ? 'lighter' : 'darker';

  return {
    contrastRatio: ratio,
    deltaE,
    deltaL,
    isLowContrast,
    direction,
  };
}

const CONTRAST_SUGGESTION_POOL = [
  '#FFFCF8', // Porcelain ivory
  '#4B202A', // Deep oxblood plum
  '#2B2426', // Charcoal umber
  '#F3E8E4', // Blush ivory
  '#E4C578', // Pale warm gold
  '#2E5240', // Pine green
  '#D8C4A7', // Flax oat
  '#9A463D', // Clay terracotta
] as const;

/**
 * Suggests a legible, editorial contrasting print pigment for the given base felt.
 */
export function suggestContrastingPrintColor(
  baseHex: string,
  currentPrintHex?: string,
): string {
  const baseNorm = normalizeHex(baseHex) ?? '#D8C4A7';
  const currentNorm = (currentPrintHex ? normalizeHex(currentPrintHex) : null) ?? '';
  const baseLab = hexToOklab(baseNorm);
  const preferLight = baseLab.L < 0.58;

  let bestHex: string = preferLight ? '#FFFCF8' : '#2B2426';
  let bestScore = -Infinity;

  for (const candidate of CONTRAST_SUGGESTION_POOL) {
    if (candidate === baseNorm) continue;
    const assessment = evaluatePrintContrast(baseNorm, candidate);
    if (assessment.isLowContrast) continue;

    const candLab = hexToOklab(candidate);
    const sameDirection = preferLight ? candLab.L > baseLab.L : candLab.L < baseLab.L;
    let score = assessment.contrastRatio + assessment.deltaE * 6;
    if (sameDirection) score += 8;
    if (candidate === '#FFFCF8' && preferLight) score += 1.5;
    if (candidate === '#4B202A' && !preferLight) score += 1.2;
    if (candidate === currentNorm) score -= 20;

    if (score > bestScore) {
      bestScore = score;
      bestHex = candidate;
    }
  }

  return bestHex;
}
