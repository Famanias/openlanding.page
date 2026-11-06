export function calculateParallaxOffset(
  scrollY: number,
  maxOffset: number = 110,
  factor: number = 0.22
): number {
  if (scrollY <= 0) return 0;
  const rawOffset = scrollY * factor;
  return Math.min(rawOffset, maxOffset);
}
