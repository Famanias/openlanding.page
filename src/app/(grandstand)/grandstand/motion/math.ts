export function progress(top: number, height: number, viewport: number): number {
  return Math.max(0, Math.min(1, -top / Math.max(1, height - viewport)));
}
