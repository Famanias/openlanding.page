/** Pure motion maths shared by the scroll chrome and the primitives. */

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Where `value` sits between `start` and `end`, clamped to 0..1. A zero-length range is already complete. */
export function progress(value: number, start: number, end: number): number {
  if (end === start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start));
}

/** A count-up should land hard, like a bucket set down: fast start, no overshoot. */
export function easeOutQuart(t: number): number {
  return 1 - (1 - clamp(t)) ** 4;
}

/** Per-child stagger in milliseconds, capped so a long list never waits more than `cap`. */
export function staggerDelay(index: number, step = 60, cap = 540): number {
  return Math.min(Math.max(0, index) * step, cap);
}

/** Rounds to a fixed number of decimals so CSS custom properties stay short. */
export function round(value: number, decimals = 3): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

/** Pull toward the pointer for a magnetic button: proportional to the offset from centre, capped at `max` px. */
export function magnetOffset(pointer: number, centre: number, strength = 0.3, max = 12): number {
  return clamp((pointer - centre) * strength, -max, max);
}
