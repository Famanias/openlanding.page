export function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function pinProgress(y: number, top: number, height: number, viewport: number): number {
  return height > viewport ? clamp((y - top) / (height - viewport)) : 0;
}
