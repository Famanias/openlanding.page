export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(current: number, target: number, amount: number): number {
  return current + (target - current) * amount;
}

export function stagger(index: number, base = 0.28, step = 0.07): number {
  return base + index * step;
}
