export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** 0 at `start`, 1 at `end`, clamped; start === end acts as a step function. */
export function progress(value: number, start: number, end: number): number {
  if (end === start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Scroll progress of a tall section whose sticky viewport stage covers one screen. */
export function sectionProgress(
  scrollY: number,
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number,
): number {
  return progress(scrollY, sectionTop, sectionTop + Math.max(1, sectionHeight - viewportHeight));
}

/** Capped stagger delay in milliseconds so long lists never feel sluggish. */
export function staggerDelay(index: number, stepMs: number, capMs = 600): number {
  return Math.min(capMs, Math.max(0, index) * stepMs);
}

/** Normalized pointer position inside an element box mapped to +/- maxDeg tilt angles. */
export function tiltAngles(px: number, py: number, maxDeg: number): { rotateX: number; rotateY: number } {
  const nx = clamp(px, 0, 1) * 2 - 1;
  const ny = clamp(py, 0, 1) * 2 - 1;
  return { rotateX: -ny * maxDeg, rotateY: nx * maxDeg };
}

/** Crisp clockwork exponential deceleration with zero overshoot. */
export function easeOutExpo(t: number): number {
  const c = clamp(t, 0, 1);
  return c === 1 ? 1 : 1 - Math.pow(2, -10 * c);
}

/** Smooth quintic ease-out for tabular number count-ups. */
export function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 5);
}
