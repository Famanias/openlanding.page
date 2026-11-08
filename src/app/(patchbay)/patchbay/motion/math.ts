export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number): number => from + (to - from) * t;

/** Normalised 0–1 position of `value` between `start` and `end`; a zero-width range resolves to 0. */
export function progress(value: number, start: number, end: number): number {
  if (end === start) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Delay for the nth child of a cascade, capped so long lists never feel slow. */
export function staggerDelay(index: number, stepMs: number, capMs = 600): number {
  return Math.min(Math.max(index, 0) * stepMs, capMs);
}

export function easeOutCubic(t: number): number {
  const x = clamp(t, 0, 1);
  return 1 - (1 - x) ** 3;
}

export type SpringState = { value: number; velocity: number };

/**
 * One semi-implicit Euler step of a damped spring. Sub-steps keep it stable
 * when a tab was throttled and `dtSeconds` is large.
 */
export function springStep(state: SpringState, target: number, dtSeconds: number, stiffness = 220, damping = 17): SpringState {
  const steps = Math.max(1, Math.ceil(dtSeconds / (1 / 120)));
  const h = Math.min(dtSeconds, 0.1) / steps;
  let { value, velocity } = state;
  for (let i = 0; i < steps; i += 1) {
    velocity += (-stiffness * (value - target) - damping * velocity) * h;
    value += velocity * h;
  }
  return { value, velocity };
}

export function isSettled(state: SpringState, target: number, epsilon = 0.05): boolean {
  return Math.abs(state.value - target) < epsilon && Math.abs(state.velocity) < epsilon;
}
