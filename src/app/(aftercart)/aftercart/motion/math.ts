export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

export function progressFromOffsets(scrollTop: number, sectionTop: number, sectionHeight: number, viewportHeight: number): number {
  const travel = Math.max(sectionHeight - viewportHeight, 1);
  return clamp((scrollTop - sectionTop) / travel, 0, 1);
}

export function staggerDelay(index: number, stagger: number, cap: number): number {
  return Math.min(Math.max(index, 0) * stagger, cap);
}
