export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * clamp01(amount);
}

/** Progress (0–1) of a tall section whose sticky stage is pinned while it travels past the viewport. */
export function progressFromOffsets(rectTop: number, rectHeight: number, viewportHeight: number): number {
  const travel = Math.max(0, rectHeight - viewportHeight);
  if (travel === 0) return 0;
  return clamp01(-rectTop / travel);
}

/** 0 when an element's top meets the viewport's bottom, 1 when its bottom leaves the top. */
export function passProgress(rectTop: number, rectHeight: number, viewportHeight: number): number {
  const total = viewportHeight + rectHeight;
  if (total <= 0) return 0;
  return clamp01((viewportHeight - rectTop) / total);
}

/** Re-maps `value` so that [start, end] becomes [0, 1]. */
export function segment(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

/** A strobe: 0 outside [start, end], rising linearly to 1 at the middle and falling back. */
export function flashCurve(value: number, start: number, end: number): number {
  if (value <= start || value >= end) return 0;
  const t = (value - start) / (end - start);
  return 1 - Math.abs(t * 2 - 1);
}

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
