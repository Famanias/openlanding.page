import { clamp, progress } from "../motion/math";

/**
 * The brief's scroll maths. A tall section holds a sticky stage; how far the visitor has scrolled through the
 * runway (section height minus one viewport) becomes 0–1, and that is split across the clauses.
 */

/** 0–1 through the runway. Before the section it is 0; after the runway it is 1. */
export function runwayProgress(scrollY: number, sectionTop: number, sectionHeight: number, viewportHeight: number): number {
  const runway = sectionHeight - viewportHeight;
  return progress(scrollY, sectionTop, sectionTop + Math.max(runway, 1));
}

/** Share of the runway reserved at the end for the seal to press and the sheet to hold. */
export const SEAL_TAIL = 0.12;

/** How much of clause `index` is written (0–1). Clauses are written one after another and overlap a little. */
export function clauseProgress(p: number, index: number, count: number): number {
  const span = (1 - SEAL_TAIL) / count;
  const start = index * span;
  return progress(p, start, start + span * 0.85);
}

/** The clause being written now: the first one that is not yet complete, or the last. */
export function activeClause(p: number, count: number): number {
  const span = (1 - SEAL_TAIL) / count;
  return clamp(Math.floor(p / span), 0, count - 1);
}

/** The seal presses once every clause is written. */
export function isSealed(p: number): boolean {
  return p >= 1 - SEAL_TAIL * 0.7;
}

/** "p. 2 of 4": the sheet's page counter follows the active clause. */
export function pageLabel(active: number, count: number): string {
  return `p. ${clamp(active, 0, count - 1) + 1} of ${count}`;
}
