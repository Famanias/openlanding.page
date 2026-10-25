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

export function staggerDelay(index: number, stepMs: number, capMs = 600): string {
  return `${Math.min(capMs, Math.max(0, index) * Math.max(0, stepMs))}ms`;
}

/** Pointer position inside a box → rotateX/rotateY in degrees, each bounded by ±max/2. */
export function tiltFromPointer(x: number, y: number, width: number, height: number, max: number): { rx: number; ry: number } {
  const px = clamp01(width ? x / width : 0.5) - 0.5;
  const py = clamp01(height ? y / height : 0.5) - 0.5;
  const round = (n: number) => Math.round(n * 100) / 100 + 0;
  return { rx: round(-py * max), ry: round(px * max) };
}
