import { clamp, lerp } from "../motion/math";

/**
 * Where a creature sits in the viewport for a given scroll position.
 * Creatures are anchored to a depth in the page (a dive fraction) and move at
 * `parallax` x the scroll speed, so they read as part of the water behind the
 * content rather than something travelling across it.
 */
export type Placement = {
  /** Vertical position in viewport pixels. */
  y: number;
  /** 0 when off screen, 1 when comfortably in view. */
  visibility: number;
  /** 0 as the creature enters at the bottom, 1 as it leaves at the top. */
  progress: number;
};

export type PlacementInput = {
  scrollY: number;
  docMax: number;
  vh: number;
  /** Dive fraction (0 surface, 1 floor) at which the creature is centred. */
  center: number;
  /** < 1 so it lags the page; the further from 1, the deeper it feels. */
  parallax: number;
};

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

export function placeCreature({ scrollY, docMax, vh, center, parallax }: PlacementInput): Placement {
  const dy = (center * Math.max(docMax, 1) - scrollY) * parallax;
  const edge = Math.abs(dy);
  const visibility = smooth(clamp(1 - (edge - vh * 0.3) / (vh * 0.42), 0, 1));
  const progress = clamp(0.5 - dy / (vh * 1.5), 0, 1);
  return { y: vh * 0.5 + dy, visibility, progress };
}

/** Horizontal travel between two viewport fractions, eased so it lingers mid-screen. */
export function travelX(progress: number, from: number, to: number, vw: number): number {
  const eased = progress < 0.5 ? 2 * progress * progress : 1 - 2 * (1 - progress) * (1 - progress);
  return lerp(from, to, lerp(progress, eased, 0.5)) * vw;
}
