export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** 0 at `start`, 1 at `end`, clamped; start === end is a step. */
export function progress(value: number, start: number, end: number): number {
  if (end === start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Scroll progress of a tall section whose sticky stage is one viewport high. */
export function sectionProgress(scrollY: number, sectionTop: number, sectionHeight: number, viewportHeight: number): number {
  return progress(scrollY, sectionTop, sectionTop + Math.max(1, sectionHeight - viewportHeight));
}

/** Delay for the nth child, capped so long lists never feel slow. */
export function staggerDelay(index: number, stepMs: number, capMs = 600): number {
  return Math.min(capMs, Math.max(0, index) * stepMs);
}

/** Pointer position inside a box mapped to a tilt in degrees (rotateX, rotateY). */
export function tiltAngles(px: number, py: number, maxDeg: number): { rotateX: number; rotateY: number } {
  const nx = clamp(px, 0, 1) * 2 - 1;
  const ny = clamp(py, 0, 1) * 2 - 1;
  return { rotateX: -ny * maxDeg, rotateY: nx * maxDeg };
}

/** Quint ease-out; used by number tweens and the throw. */
export function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 5);
}

export function easeInOutCubic(t: number): number {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}
