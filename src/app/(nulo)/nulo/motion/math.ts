export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export function progress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

export function staggerDelay(index: number, step: number, cap: number): number {
  return Math.min(index * step, cap);
}

export function tiltAngles(x: number, y: number, max: number): { rx: number; ry: number } {
  const ry = (clamp(x, 0, 1) - 0.5) * 2 * max;
  const rx = (0.5 - clamp(y, 0, 1)) * 2 * max;
  return { rx: rx + 0, ry: ry + 0 };
}
