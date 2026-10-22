export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function progress(value: number, start: number, end: number): number {
  if (start === end) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}

export function staggerDelay(index: number, baseDelay: number, stagger: number): number {
  return baseDelay + index * stagger;
}

export function normalizeAngle(deg: number): number {
  const mod = deg % 360;
  return mod < 0 ? mod + 360 : mod;
}
