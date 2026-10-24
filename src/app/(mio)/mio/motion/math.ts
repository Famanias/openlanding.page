export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}
export function progress(value: number, start: number, end: number) {
  return end <= start ? 0 : clamp((value - start) / (end - start));
}
export function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * clamp(amount);
}
