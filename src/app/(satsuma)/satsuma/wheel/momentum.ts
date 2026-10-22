/** The wheel's drift, drag and coast. Pure maths in frame units per second; the component owns the clock. */

/** Right → left, in frame units per second. */
export const DRIFT = -50;
/** Share of a fling's speed still left one second after release. */
export const RETAINED_PER_SECOND = 0.05;
/** A fling can't exceed this, so a flick of the wrist never spins the wheel into a blur. */
export const MAX_FLING = 4200;
/** Below this a fling is considered spent and the drift carries on alone. */
export const REST = 2;

export type Sample = { t: number; x: number };

export function decayFling(velocity: number, dt: number): number {
  const v = velocity * Math.pow(RETAINED_PER_SECOND, dt);
  return Math.abs(v) < REST ? 0 : v;
}

/** Offset after `dt` seconds of drift plus whatever fling is left. */
export function advance(offset: number, fling: number, dt: number, drift = DRIFT): number {
  return offset + (drift + fling) * dt;
}

/** Release velocity (units/s) from recent pointer samples. Only the last `windowMs` count. */
export function flingFrom(samples: readonly Sample[], windowMs = 90): number {
  if (samples.length < 2) return 0;
  const last = samples[samples.length - 1];
  const recent = samples.filter((s) => last.t - s.t <= windowMs);
  const first = recent[0];
  const dt = (last.t - first.t) / 1000;
  if (dt <= 0) return 0;
  const v = (last.x - first.x) / dt;
  return Math.max(-MAX_FLING, Math.min(MAX_FLING, v));
}

/** Keep a sample list to the last ~200ms so it never grows during a long drag. */
export function pushSample(samples: Sample[], sample: Sample, keepMs = 200): Sample[] {
  const next = [...samples, sample];
  while (next.length > 2 && sample.t - next[0].t > keepMs) next.shift();
  return next;
}

/** 0 → 1 ease for the cylinder assembling on load. */
export function assembleBend(elapsedMs: number, delayMs = 450, durationMs = 1700): number {
  const t = Math.min(1, Math.max(0, (elapsedMs - delayMs) / durationMs));
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
