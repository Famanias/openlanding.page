export function clamp(value: number, min = 0, max = 1) { return Math.min(max, Math.max(min, value)); }
export function lerp(a: number, b: number, amount: number) { return a + (b - a) * amount; }
export function progressFromRange(value: number, start: number, end: number) { return clamp((value - start) / Math.max(1, end - start)); }
export function stagger(index: number, step: number, max: number) { return Math.min(max, Math.max(0, index * step)); }
