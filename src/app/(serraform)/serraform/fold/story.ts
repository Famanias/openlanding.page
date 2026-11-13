import { boundedProgress, smoothstep } from '../motion/math';

export function storyProgress(scrollY: number, start: number, end: number): number {
  return boundedProgress(scrollY, start, end);
}

/**
 * Timeline:
 * - p = 0..0.12: hold opening 0
 * - p = 0.12..0.62: interpolate 0 -> 100 with smoothstep
 * - p = 0.62..0.82: hold opening 100
 * - p = 0.82..1.00: interpolate 100 -> 50 with smoothstep
 */
export function storyOpening(progress: number): number {
  if (!Number.isFinite(progress)) return 0;
  const p = Math.min(1, Math.max(0, progress));

  if (p <= 0.12) return 0;
  if (p <= 0.62) return 100 * smoothstep(0.12, 0.62, p);
  if (p <= 0.82) return 100;
  return 100 - 50 * smoothstep(0.82, 1.0, p);
}

/**
 * Chapters:
 * - [0, 0.34) -> 0
 * - [0.34, 0.72) -> 1
 * - [0.72, 1] -> 2
 */
export function storyChapter(progress: number): 0 | 1 | 2 {
  if (!Number.isFinite(progress)) return 0;
  const p = Math.min(1, Math.max(0, progress));
  if (p < 0.34) return 0;
  if (p < 0.72) return 1;
  return 2;
}
