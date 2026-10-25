export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

export function progressFromOffsets(offset: number, start: number, end: number): number {
  if (end <= start) return 0;
  return clamp01((offset - start) / (end - start));
}

export function staggerDelay(index: number, step = 70, cap = 600): number {
  return Math.min(cap, Math.max(0, index) * step);
}
