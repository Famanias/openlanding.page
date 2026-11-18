/** Pure motion maths shared by the check-up engine and the primitives. */

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Where `value` sits between `start` and `end`, clamped to 0..1. A zero-length range is a step. */
export function progress(value: number, start: number, end: number): number {
  if (end === start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start));
}

export function easeOutQuint(t: number): number {
  return 1 - (1 - clamp(t)) ** 5;
}

/** Per-child stagger in milliseconds (the 70 ms `--stagger` token), capped at 600 ms. */
export function staggerDelay(index: number, step = 70, cap = 600): number {
  return Math.min(Math.max(0, index) * step, cap);
}

/**
 * A small, repeatable "hand-made" offset for organic staggers: the same index always gets the same delay,
 * but neighbours never line up exactly. Golden-ratio hashing keeps the spread even.
 */
export function jitter(index: number, range = 60): number {
  const fraction = (Math.abs(index) * 0.6180339887 + 0.137) % 1;
  return Math.floor(fraction * range);
}

/**
 * The brand's primary verb: a wag. A damped sine in degrees that starts at rest, swings past both sides
 * and settles. `t` is seconds since the trigger.
 */
export function wag(t: number, amplitude = 14, frequency = 2.6, decay = 2.4): number {
  if (t <= 0) return 0;
  return amplitude * Math.exp(-decay * t) * Math.sin(2 * Math.PI * frequency * t);
}

/** Frame-rate independent easing toward a target. */
export function damp(current: number, target: number, lambda: number, dtSeconds: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * dtSeconds));
}

/** Rounds so CSS custom properties stay short. */
export function round(value: number, decimals = 3): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
