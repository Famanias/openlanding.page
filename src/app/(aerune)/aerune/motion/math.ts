export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

export function progressFromOffsets(scroll: number, start: number, end: number): number {
  if (end <= start) return 0;
  return clamp((scroll - start) / (end - start), 0, 1);
}
