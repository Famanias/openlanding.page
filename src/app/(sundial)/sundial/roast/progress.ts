/**
 * Progress (0..1) through a pinned section from its bounding client rect.
 */
export function calculateScrollProgress(
  rectTop: number,
  rectHeight: number,
  windowHeight: number,
): number {
  const travel = rectHeight - windowHeight;
  if (travel <= 0) return 0;

  const scrolled = -rectTop;
  const progress = scrolled / travel;
  return Math.max(0, Math.min(1, progress));
}
