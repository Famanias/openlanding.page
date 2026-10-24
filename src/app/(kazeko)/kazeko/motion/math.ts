export function clamp(value: number, min = 0, max = 1): number {
  return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
}

export function progressFromOffsets(scroll: number, start: number, height: number, viewport: number): number {
  const travel = height - viewport;
  return travel <= 0 ? (scroll >= start ? 1 : 0) : clamp((scroll - start) / travel);
}
