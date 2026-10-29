export type Vec3 = [number, number, number];
export type RGB = Vec3;
export const clamp01 = (n: number) =>
  Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerpVec3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];
export function smoothstep(a: number, b: number, x: number) {
  if (a === b) return Number.isFinite(x) && x >= b ? 1 : 0;
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}
export function createSeededRandom(seed: number) {
  let n = seed >>> 0;
  return () => {
    n += 0x6d2b79f5;
    let t = Math.imul(n ^ (n >>> 15), 1 | n);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rgb = (hex: string): RGB =>
  [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }) as RGB;
export const PALETTE = {
  paper: rgb("#F4ECDD"),
  ink: rgb("#1A1613"),
  gold: rgb("#B8923A"),
  sakura: rgb("#F2B8C6"),
  indigo: rgb("#2B3A55"),
  red: rgb("#C8412B"),
};
export const scaleRgb = (c: RGB, n: number): RGB =>
  c.map((x) => clamp01(x * n)) as RGB;
export const cssRgb = (c: RGB) =>
  `rgb(${c
    .map((x) => {
      x = clamp01(x);
      return Math.round(
        (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055) *
          255,
      );
    })
    .join(" ")})`;
export const addVec3 = (a: Vec3, b: Vec3): Vec3 => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];
