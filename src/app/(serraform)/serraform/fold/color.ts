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
