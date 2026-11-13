export function heroProgress(scrollY: number, start: number, distance: number): number {
  if (![scrollY, start, distance].every(Number.isFinite) || distance <= 0) return 0;
  return Math.max(0, Math.min(1, (scrollY - start) / distance));
}
