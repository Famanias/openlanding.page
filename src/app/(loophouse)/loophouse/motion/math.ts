/**
 * Pure motion maths for LOOPHOUSE.
 */

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

export function calculateProgress(current: number, start: number, end: number): number {
  if (end <= start) return 0;
  return clamp((current - start) / (end - start), 0, 1);
}

export function staggerDelay(index: number, baseMs: number = 0, stepMs: number = 70, maxMs: number = 600): number {
  return Math.min(baseMs + index * stepMs, maxMs);
}
