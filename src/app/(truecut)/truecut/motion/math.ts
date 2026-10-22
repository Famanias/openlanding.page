export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

export function progress(value: number, start: number, end: number): number {
  if (end === start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start));
}
