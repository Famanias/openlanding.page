export const LOOP_COPIES = 5;
export const SLIDE_WIDTH_VW = 80;
export const SLIDE_GAP_VW = 5;
export const PITCH_VW = SLIDE_WIDTH_VW + SLIDE_GAP_VW;
export const AUTO_START_INDEX = 1;
export const AUTO_END_INDEX = 0;
export const DRAG_THRESHOLD = 0.14;

export function wrapIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function targetX(leftPadPx: number, pitchPx: number, index: number): number {
  return leftPadPx - index * pitchPx;
}

export function springStep(current: number, target: number, factor = 0.11): number {
  return current + (target - current) * factor;
}

export function parallaxOffset(deltaX: number, ratio = 1.2): number {
  if (ratio <= 0) return 0;
  return -deltaX / ratio;
}

export function smoothstep(value: number): number {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

export function indexForDrag(deltaX: number, viewportWidth: number, current: number, total: number, threshold = DRAG_THRESHOLD): number {
  if (viewportWidth <= 0 || Math.abs(deltaX) < viewportWidth * threshold) return current;
  return wrapIndex(current + (deltaX < 0 ? 1 : -1), total);
}

export function indexForWheel(current: number, delta: number, pitchPx: number, total: number): number {
  if (pitchPx <= 0 || delta === 0) return current;
  return wrapIndex(current + (delta > 0 ? 1 : -1), total);
}

export function contentProgress(deltaX: number, slideWidthPx: number): number {
  if (slideWidthPx <= 0) return 0;
  return smoothstep(1 - Math.abs(deltaX) / (slideWidthPx * 0.55));
}
