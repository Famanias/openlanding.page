/**
 * Lumen Motion Math Utilities
 * Pure deterministic functions for scroll progress and value clamping.
 */

/**
 * Clamps a value between min and max. Defaults to [0, 1].
 */
export function clamp(value: number, min = 0, max = 1): number {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculates normalized linear progress of value between start and end.
 * If end <= start: returns 0 if value < start, 1 if value >= start.
 */
export function progress(value: number, start: number, end: number): number {
  if (end <= start) {
    return value >= start ? 1 : 0;
  }
  return clamp((value - start) / (end - start), 0, 1);
}
