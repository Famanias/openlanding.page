/** Pure motion maths shared by the scroll engine and the primitives. */

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

export function easeOutQuint(t: number): number {
  return 1 - (1 - clamp(t)) ** 5;
}

export function easeInOutCubic(t: number): number {
  const c = clamp(t);
  return c < 0.5 ? 4 * c * c * c : 1 - (-2 * c + 2) ** 3 / 2;
}

/** Per-child stagger in milliseconds, capped so a long list never waits more than `cap`. */
export function staggerDelay(index: number, step = 80, cap = 640): number {
  return Math.min(Math.max(0, index) * step, cap);
}

/** Frame-rate independent easing toward a target: the same feel at 60 Hz and 120 Hz. */
export function damp(current: number, target: number, lambda: number, dtSeconds: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * dtSeconds));
}

/** Rounds to a fixed number of decimals so CSS custom properties stay short. */
export function round(value: number, decimals = 3): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
