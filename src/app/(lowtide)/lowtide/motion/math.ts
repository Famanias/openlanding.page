export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const invLerp = (a: number, b: number, v: number) => (a === b ? 0 : clamp((v - a) / (b - a)));

export function smoothstep(e0: number, e1: number, x: number) {
  const t = invLerp(e0, e1, x);
  return t * t * (3 - 2 * t);
}

/** Frame-rate independent exponential approach: the same total dt gives the same result however it is split. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));
