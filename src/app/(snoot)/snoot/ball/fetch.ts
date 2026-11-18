import { clamp } from "../motion/math";

/** Seconds for one full throw: away, fetched off-screen, bounced back in. */
export const FETCH_DURATION = 1.9;

export type BallPose = { x: number; y: number; z: number; spin: number };

/**
 * Where the ball is `t` (0–1) through a throw, in scene units with the floor at y = 0.
 *  0.00–0.30  thrown up and away into the distance
 *  0.30–0.55  off-screen (somebody is fetching it)
 *  0.55–1.00  bounced back in from the right, three bounces settling to rest
 */
export function throwArc(tInput: number): BallPose {
  const t = clamp(tInput);
  const spin = t * Math.PI * 6;
  if (t <= 0.3) {
    const u = t / 0.3;
    return { x: 0.9 * u, y: 3.4 * u - 1.3 * u * u, z: -(14 * u) + 0, spin };
  }
  if (t < 0.55) return { x: 5, y: 0, z: 0, spin };
  const v = (t - 0.55) / 0.45;
  const decay = (1 - v) ** 2;
  return {
    x: 5 * (1 - v) ** 1.6,
    y: Math.abs(Math.sin(3 * Math.PI * v)) * 1.2 * decay,
    z: 0,
    spin,
  };
}

/** The idle "breathe": a slow, small hop above the floor (period 2.4 s). */
export function idleBob(seconds: number): number {
  return 0.06 * (1 - Math.cos((2 * Math.PI * seconds) / 2.4));
}
