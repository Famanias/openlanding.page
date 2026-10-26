import { clamp, wrap } from "../motion/math";

/**
 * The parts carousel is one endless ring of cards. Each card's x comes from its index and the
 * ring's offset, wrapped into one period with a slot of lead on the left, so a card that leaves
 * on one side re-enters on the other without a seam.
 */
export const loopX = (index: number, count: number, slot: number, offset: number) =>
  wrap(index * slot + offset + slot, count * slot) - slot;

/** How many times to repeat a set of `count` cards so the ring covers the screen plus a card each side. */
export const repsFor = (count: number, slot: number, viewport: number) =>
  count <= 0 ? 1 : Math.max(1, Math.ceil((viewport + 2 * slot) / (count * slot)));

export type ArcPlace = { y: number; rotate: number; scale: number };

/**
 * The ring seen from the front: flat at the centre, the cards lifting and turning outward as
 * they come round the edges. `x` is the card centre's distance from the screen centre.
 */
export function arcPlace(x: number, half: number, lift = 34, turn = 5): ArcPlace {
  const d = clamp(x / Math.max(1, half), -1.3, 1.3);
  if (d === 0) return { y: 0, rotate: 0, scale: 1 };
  return { y: lift * d * d, rotate: turn * d, scale: 1 - 0.05 * d * d };
}

/** After a fling, the speed eases back to the drift: `keep` of the difference is left after one second. */
export const coast = (velocity: number, drift: number, dt: number, keep = 0.06) =>
  velocity === drift ? drift : drift + (velocity - drift) * keep ** dt;

export type Sample = { x: number; t: number };

/** Release speed in px/s from the pointer samples of the last 90ms, clamped to ±3000. */
export function flingVelocity(samples: Sample[], window = 90, max = 3000): number {
  if (samples.length < 2) return 0;
  const last = samples[samples.length - 1];
  const first = samples.find((s) => last.t - s.t <= window) ?? samples[0];
  const dt = last.t - first.t;
  if (dt <= 0) return 0;
  return clamp(((last.x - first.x) / dt) * 1000, -max, max);
}

/** One frame of a glide (prev/next, bring-into-view): a fixed share of what's left, then the rest under half a pixel. */
export function glideStep(remaining: number, dt: number, rate = 0.0008): number {
  if (Math.abs(remaining) < 0.5) return remaining;
  return remaining * (1 - rate ** dt);
}
