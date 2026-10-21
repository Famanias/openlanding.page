/** Page-turn maths: pure functions, so the feel of the leaf can be tested without a browser. */
export type Direction = 1 | -1;

/** Share of a turn at which letting go finishes it instead of settling back. */
export const COMPLETE_AT = 0.4;
/** Pointer speed (px per ms, toward finishing the turn) that counts as a flick. */
export const FLICK_SPEED = 0.6;
/** How far the pointer travels for a full turn, in page widths. */
const TRAVEL = 1.1;
/** Time constant (ms) of the settle animation. */
const SETTLE_MS = 100;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Turn progress (0 = untouched, 1 = finished) from where a drag started and where it is now.
 * A forward turn is dragged leftwards, a backward turn rightwards. `base` lets a re-grab
 * continue from the leaf's current progress instead of jumping.
 */
export function dragProgress(startX: number, x: number, pageWidth: number, direction: Direction, base = 0): number {
  const travelled = direction === 1 ? startX - x : x - startX;
  return clamp01(base + travelled / (pageWidth * TRAVEL));
}

/** Where a released leaf should go. `velocity` is px/ms, positive when it moves toward finishing. */
export function settleTarget(progress: number, velocity: number): 0 | 1 {
  if (velocity >= FLICK_SPEED) return 1;
  if (velocity <= -FLICK_SPEED) return 0;
  return progress >= COMPLETE_AT ? 1 : 0;
}

/** One animation frame of the settle: an ease-out that never overshoots and snaps when it arrives. */
export function stepProgress(progress: number, target: 0 | 1, dtMs: number): number {
  const next = progress + (target - progress) * (1 - Math.exp(-dtMs / SETTLE_MS));
  return Math.abs(target - next) < 0.002 ? target : next;
}

/** The leaf's own turn value: 0 lying on the right, 1 lying on the left. */
export function leafTurn(direction: Direction, progress: number): number {
  return direction === 1 ? progress : 1 - progress;
}

/** A continuous position through the book, e.g. 3.25 is a quarter of the way from spread 3 to 4. */
export function bookPosition(spread: number, direction: Direction, progress: number): number {
  return spread + direction * progress;
}

/**
 * Horizontal offset of the leaves, in percent of the book width. A closed cover sits half a page
 * off-centre so the single page is centred on screen; the offset eases away as the book opens.
 */
export function bookShift(position: number, leafCount: number): number {
  const opening = 1 - clamp01(position);
  const closing = clamp01(position - (leafCount - 1));
  return -25 * opening + 25 * closing + 0;
}

/** The tape counter's reading, 0..999, for a position through the book. */
export function tapeCount(position: number, spreadCount: number): number {
  return Math.round(clamp01(position / (spreadCount - 1)) * 999);
}
