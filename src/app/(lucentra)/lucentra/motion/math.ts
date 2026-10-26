export function clamp01(value: number): number { return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0)); }
export function lerp(a: number, b: number, t: number): number { return a + (b - a) * clamp01(t); }
export function sectionProgress(scrollY: number, top: number, height: number, viewport: number): number {
  const span = Math.max(1, height - viewport);
  return clamp01((scrollY - top) / span);
}
export function stagger(index: number, step: number, max = 600): number { return Math.min(max, Math.max(0, index) * step); }
