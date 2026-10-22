/** Pure motion maths shared by the primitives. No DOM, no React. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Where `value` sits between `start` and `end`, as 0–1. A zero-width window counts as done. */
export function progress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Per-item delay for a cascade, capped so a long list never keeps the last item waiting. */
export function staggerDelay(index: number, step: number, cap: number): number {
  return Math.min(index * step, cap);
}

/** Pointer position inside a card (0–1 on each axis) → tilt in degrees. Top edge tips toward the viewer. */
export function tiltAngles(x: number, y: number, max: number): { rx: number; ry: number } {
  const ry = (clamp(x, 0, 1) - 0.5) * 2 * max;
  const rx = (0.5 - clamp(y, 0, 1)) * 2 * max;
  return { rx: rx + 0, ry: ry + 0 }; // + 0 turns -0 into 0
}
