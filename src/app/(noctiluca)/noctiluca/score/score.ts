/**
 * Room V, the Score Room: visitors compose the room's light from three dials.
 * Colour is built in OKLCH so every hue gets the same perceived ramp, then
 * converted to sRGB for the shader and for the CSS poster.
 */

export type Rgb = [number, number, number];

export type Score = {
  /** OKLCH hue, 0–360. */
  hue: number;
  /** 0–100: how fast the light flows. */
  drift: number;
  /** 0–100: how large the forms are. */
  bloom: number;
};

export const DEFAULT_SCORE: Score = { hue: 300, drift: 35, bloom: 55 };

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

function linearToSrgb(x: number): number {
  return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}

/** OKLCH (L 0–1, C, h°) → gamma-encoded sRGB 0–1, chroma reduced until in gamut. */
export function oklchToSrgb(l: number, c: number, h: number): Rgb {
  let chroma = c;
  for (let i = 0; i < 24; i++) {
    const rad = (h * Math.PI) / 180;
    const a = chroma * Math.cos(rad);
    const b = chroma * Math.sin(rad);
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.291485548 * b;
    const L = l_ ** 3;
    const M = m_ ** 3;
    const S = s_ ** 3;
    const r = 4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
    const g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
    const bl = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;
    const inGamut = [r, g, bl].every((v) => v >= -1e-4 && v <= 1 + 1e-4);
    if (inGamut || chroma < 1e-4) {
      return [r, g, bl].map((v) => {
        const out = clamp01(linearToSrgb(clamp01(v)));
        return Math.abs(out) < 1e-9 ? 0 : out;
      }) as Rgb;
    }
    chroma *= 0.86;
  }
  return [l, l, l];
}

const wrap = (h: number) => ((h % 360) + 360) % 360;

/** Four stops from deep to highlight, each a little further round the wheel. */
export function scorePalette(hue: number): Rgb[] {
  const h = wrap(hue);
  return [
    oklchToSrgb(0.14, 0.05, h),
    oklchToSrgb(0.34, 0.12, wrap(h + 18)),
    oklchToSrgb(0.64, 0.17, wrap(h + 38)),
    oklchToSrgb(0.9, 0.07, wrap(h + 70)),
  ];
}

/** Approximate dominant wavelength for an OKLCH hue; null on the non-spectral purple line. */
const ANCHORS: [number, number][] = [
  [30, 620],
  [65, 595],
  [100, 575],
  [145, 530],
  [195, 490],
  [265, 465],
  [300, 420],
];

export function dominantWavelength(hue: number): number | null {
  const h = wrap(hue);
  if (h < ANCHORS[0][0] || h > ANCHORS[ANCHORS.length - 1][0]) return null;
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const [h0, nm0] = ANCHORS[i];
    const [h1, nm1] = ANCHORS[i + 1];
    if (h >= h0 && h <= h1) {
      return Math.round(nm0 + ((h - h0) / (h1 - h0)) * (nm1 - nm0));
    }
  }
  return null;
}

export function scoreReadout({ hue, drift, bloom }: Score): string {
  const nm = dominantWavelength(hue);
  const colour = nm === null ? "purple line" : `${nm} nm`;
  return `${colour} · drift ${(drift / 100).toFixed(2)} · bloom ${Math.round(bloom)}%`;
}

export function scoreUniforms({ drift, bloom }: Score) {
  return {
    speed: 0.04 + (drift / 100) * 0.36,
    scale: 0.6 + (bloom / 100) * 1.4,
  };
}

export function srgbToCss([r, g, b]: Rgb): string {
  return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;
}
