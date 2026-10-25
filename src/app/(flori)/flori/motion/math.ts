export function progressAt(scroll: number, start: number, distance: number): number {
  if (distance <= 0) return scroll >= start ? 1 : 0;
  return Math.max(0, Math.min(1, (scroll - start) / distance));
}
