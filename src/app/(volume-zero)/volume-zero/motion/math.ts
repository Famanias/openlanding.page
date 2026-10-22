export type SectionOffsets = { scrollY: number; top: number; height: number; viewport: number };

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

export function smoothstep(value: number): number {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

export function progressFromOffsets({ scrollY, top, height, viewport }: SectionOffsets): number {
  const travel = Math.max(1, height - viewport);
  return clamp01((scrollY - top) / travel);
}

export function staggerDelay(index: number, stepMs: number): string {
  return `${Math.max(0, index) * Math.max(0, stepMs)}ms`;
}
