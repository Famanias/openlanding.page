export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}
export function sectionProgress(
  scroll: number,
  top: number,
  height: number,
  viewport: number,
) {
  return clamp((scroll - top) / Math.max(1, height - viewport));
}
export function stageAt(progress: number, count: number) {
  return Math.min(Math.max(0, count - 1), Math.floor(clamp(progress) * count));
}
