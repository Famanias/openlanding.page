/**
 * Calculate progress (0..1) through a pinned section using its bounding client rect.
 *
 * @param rectTop - getBoundingClientRect().top of the outer section
 * @param rectHeight - offsetHeight or getBoundingClientRect().height of the outer section
 * @param windowHeight - window.innerHeight
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
