export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
export const progress = (scroll: number, start: number, end: number) => end <= start ? 0 : clamp((scroll - start) / (end - start));
export function durationInMs(value: string): number {
  const number = parseFloat(value);
  return Number.isFinite(number) ? Math.max(0, number * (value.trim().endsWith("ms") ? 1 : 1000)) : 0;
}
