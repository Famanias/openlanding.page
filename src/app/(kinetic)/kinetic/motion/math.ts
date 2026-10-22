/** Pure motion maths shared across Kinetic components. No DOM, no React. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Frame-rate independent exponential smoothing factor for a rate in 1/s. */
export function damp(rate: number, dt: number): number {
  return 1 - Math.exp(-rate * Math.max(0, dt));
}

/** Where `value` sits between `start` and `end`, as 0–1. */
export function progress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Per-item delay for a cascade, capped so long lists never stall. */
export function staggerDelay(index: number, step: number, cap: number): number {
  return Math.min(index * step, cap);
}

/** Pointer position inside a card (0–1 on each axis) → tilt in degrees. */
export function tiltAngles(x: number, y: number, max: number): { rx: number; ry: number } {
  const ry = (clamp(x, 0, 1) - 0.5) * 2 * max;
  const rx = (0.5 - clamp(y, 0, 1)) * 2 * max;
  return { rx: rx + 0, ry: ry + 0 };
}

/** Wrap into [0, period), for looping layers. */
export function wrap(value: number, period: number): number {
  return ((value % period) + period) % period;
}
