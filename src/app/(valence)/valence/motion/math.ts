export function clamp(value: number, min: number, max: number): number {
  if (min > max) return min;
  return Math.min(max, Math.max(min, value));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

export function progress(value: number, start: number, end: number): number {
  const span = end - start;
  if (span <= 0) return 0;
  return clamp((value - start) / span, 0, 1);
}

export function staggerDelayMs(index: number, stepMs = 70, maxMs = 600): number {
  return clamp(Math.max(0, index) * stepMs, 0, maxMs);
}

export function tiltAngles(
  normX: number,
  normY: number,
  maxDeg = 4,
): { rx: number; ry: number } {
  const x = clamp(normX, 0, 1);
  const y = clamp(normY, 0, 1);
  return {
    rx: Number(((0.5 - y) * 2 * maxDeg).toFixed(2)),
    ry: Number(((x - 0.5) * 2 * maxDeg).toFixed(2)),
  };
}
