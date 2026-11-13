export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(edge0) || !Number.isFinite(edge1)) {
    return 0;
  }
  if (edge1 === edge0) return x >= edge1 ? 1 : 0;
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function damp(current: number, target: number, lambda: number, dt: number): number {
  if (!Number.isFinite(current)) return target;
  if (!Number.isFinite(target)) return current;
  if (!Number.isFinite(dt) || dt <= 0) return current;
  const factor = 1 - Math.exp(-lambda * dt);
  return current + (target - current) * factor;
}

export function boundedProgress(value: number, start: number, end: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(start) || !Number.isFinite(end)) {
    return 0;
  }
  if (end <= start) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}
