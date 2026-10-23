export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * clamp01(amount);
}

export function progressFromOffsets(rectTop: number, rectHeight: number, viewportHeight: number): number {
  const travel = Math.max(0, rectHeight - viewportHeight);
  if (travel === 0) return 0;
  return clamp01(-rectTop / travel);
}

export function staggerDelay(index: number, baseMilliseconds: number): string {
  return `${Math.max(0, index) * Math.max(0, baseMilliseconds)}ms`;
}

