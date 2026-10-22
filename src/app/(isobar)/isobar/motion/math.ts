export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

export function easeOut(value: number): number {
  const t = clamp(value);
  return 1 - Math.pow(1 - t, 4);
}

export function stagger(index: number, base = 70): number {
  return Math.max(0, index) * base;
}
