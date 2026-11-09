export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

export function sectionProgress(top: number, sectionHeight: number, viewportHeight: number): number {
  const travel = sectionHeight - viewportHeight;
  return travel <= 0 ? 0 : clamp(-top / travel);
}
