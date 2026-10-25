export function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

export function lerp(start: number, end: number, t: number): number {
  const clamped = clamp(t, 0, 1);
  return start + (end - start) * clamped;
}

export function progress(val: number, start: number, end: number): number {
  if (end <= start) return 1;
  return clamp((val - start) / (end - start), 0, 1);
}

export function staggerDelay(index: number, stepMs = 70, maxMs = 420): number {
  return clamp(Math.max(0, index) * stepMs, 0, maxMs);
}

export function magneticOffset(delta: number, maxPull = 10, radius = 100): number {
  if (radius <= 0) return 0;
  const ratio = clamp(delta / radius, -1, 1);
  return ratio * maxPull;
}
