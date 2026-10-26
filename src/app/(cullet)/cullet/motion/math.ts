export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Where `value` sits between `start` and `end`, clamped to 0..1. A zero-length range is already passed. */
export const range = (value: number, start: number, end: number) =>
  end <= start ? (value >= end ? 1 : 0) : clamp((value - start) / (end - start));

/** Delay for the nth child, capped so long lists never wait more than `cap` ms. */
export const stagger = (index: number, step: number, cap = Infinity) => Math.min(index * step, cap);

export const easeInCubic = (t: number) => t * t * t;
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Overshoots by ~10% and settles: the glass landing back in its frame. */
export const easeOutBack = (t: number, c1 = 1.45) => 1 + (c1 + 1) * (t - 1) ** 3 + c1 * (t - 1) ** 2;

/** Frame-rate independent smoothing: the share of the gap to close this frame for a time constant `tau` seconds. */
export const smoothing = (dt: number, tau: number) => 1 - Math.exp(-dt / tau);
