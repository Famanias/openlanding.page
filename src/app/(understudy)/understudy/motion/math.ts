export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Where `value` sits between `start` and `end`, clamped to 0..1. A zero-length range is already passed. */
export const range = (value: number, start: number, end: number) =>
  end <= start ? (value >= end ? 1 : 0) : clamp((value - start) / (end - start));

export const wrap = (value: number, period: number) => ((value % period) + period) % period;

/** Delay for the nth child, capped so long lists never wait more than `cap` ms. */
export const stagger = (index: number, step: number, cap = Infinity) => Math.min(index * step, cap);
