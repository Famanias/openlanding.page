import { smoothstep } from "../motion/math";
import { CHAPTER_IDS, CHAPTER_POINTS, type ChapterId } from "./clock";

/** How far (in progress) a chapter's moment reaches either side of its point. */
export const BEAT_WINDOW = 0.06;

/**
 * Each side of a chapter gets its own window: at most BEAT_WINDOW, and never more than half the gap to the
 * neighbour on that side, so close chapters (reveal, dawn) never overlap but keep their full approach elsewhere.
 */
const WINDOWS = Object.fromEntries(
  CHAPTER_IDS.map((id, i) => {
    const side = (n: ChapterId | undefined) => (n ? Math.min(BEAT_WINDOW, Math.abs(CHAPTER_POINTS[n] - CHAPTER_POINTS[id]) / 2) : BEAT_WINDOW);
    return [id, { before: side(CHAPTER_IDS[i - 1]), after: side(CHAPTER_IDS[i + 1]) }];
  }),
) as Record<ChapterId, { before: number; after: number }>;

/** Presence of each chapter's moment at progress p: 1 on its point, easing to 0 at the edge of its window. */
export function chapterWeights(p: number): Record<ChapterId, number> {
  return Object.fromEntries(
    CHAPTER_IDS.map((id) => {
      const d = p - CHAPTER_POINTS[id];
      const win = d < 0 ? WINDOWS[id].before : WINDOWS[id].after;
      return [id, 1 - smoothstep(0, win, Math.abs(d))];
    }),
  ) as Record<ChapterId, number>;
}
