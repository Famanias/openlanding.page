import { clamp, wrap } from "../motion/math";

export type LensPlace = { y: number; rotate: number; scale: number };

/**
 * The company rows on the dark house are seen through a wide lens, like the inside of a
 * cylinder: flat in the middle, climbing and turning towards the edges. `x` is the item's
 * distance from the centre in px, `half` is half the screen width, `bend` 0..1 fades it in.
 */
export function lensPlace(x: number, half: number, bend: number, depth = 46, turn = 9): LensPlace {
  if (bend <= 0) return { y: 0, rotate: 0, scale: 1 };
  const d = clamp(x / Math.max(1, half), -1.4, 1.4);
  return {
    y: -depth * d * d * bend,
    rotate: -turn * d * bend,
    scale: 1 - 0.16 * d * d * bend,
  };
}

/** Centred x positions for a looping row of `count` slots `slot` px wide, shifted by `offset`. */
export function rowLayout(count: number, slot: number, offset: number): { x: number }[] {
  const period = count * slot;
  return Array.from({ length: count }, (_, i) => ({ x: wrap(i * slot + offset, period) - period / 2 }));
}
