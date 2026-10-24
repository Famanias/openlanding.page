export function clamp01(value: number): number { return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0)); }
export function lerp(a: number, b: number, t: number): number { return a + (b - a) * clamp01(t); }
export function progressFromOffsets(rectTop: number, rectHeight: number, viewportHeight: number): number { const travel = Math.max(0, rectHeight - viewportHeight); return travel === 0 ? 0 : clamp01(-rectTop / travel); }

