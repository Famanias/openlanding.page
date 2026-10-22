/**
 * Pure maths for Isobar's scroll-driven colour field.
 *
 * The renderer can treat a transect as a small set of stops in field space
 * and ask for one interpolated sample per animation frame. There is no DOM or
 * renderer dependency here, which keeps the behaviour deterministic in tests
 * and safe to call from a client component.
 */

export type FieldStop = {
  /** Optional position in the transect. When omitted, stops are evenly spaced. */
  at?: number;
  x: number;
  y: number;
  z: number;
  /** Rotation of the field's flow, in degrees. */
  twist?: number;
  /** Relative scale of the field forms. */
  spread?: number;
};

export type FieldSample = {
  x: number;
  y: number;
  z: number;
  twist: number;
  spread: number;
  /** Index of the stop at the beginning of the active segment. */
  segment: number;
  /** Local 0–1 progress inside the active segment. */
  segmentProgress: number;
};

/** Keep a number inside an inclusive interval. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Linear interpolation. `t` is intentionally not clamped. */
export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Map a value into a clamped 0–1 interval. A zero-width interval is done. */
export function progress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Alias that reads naturally at scroll call sites. */
export const progressBetween = progress;

function stopPositions(stops: readonly FieldStop[]): number[] {
  if (stops.length === 1) return [0];
  return stops.map((stop, index) => stop.at ?? index / (stops.length - 1));
}

/**
 * Sample a piecewise-linear 3D field transect.
 *
 * Stops are expected in path order. Explicit `at` positions may be used for
 * uneven spacing; otherwise the stops occupy equal portions of [0, 1]. Values
 * outside the transect clamp to its first or final stop. The overload with the
 * progress argument first is provided for the common `fieldTransect(p, stops)`
 * animation-loop style.
 */
export function fieldTransect(stops: readonly FieldStop[], value: number): FieldSample;
export function fieldTransect(value: number, stops: readonly FieldStop[]): FieldSample;
export function fieldTransect(
  first: readonly FieldStop[] | number,
  second: readonly FieldStop[] | number,
): FieldSample {
  const stops = (typeof first === "number" ? second : first) as readonly FieldStop[];
  const value = (typeof first === "number" ? first : second) as number;

  if (!Array.isArray(stops) || stops.length === 0) {
    throw new Error("fieldTransect requires at least one stop");
  }

  const positions = stopPositions(stops);
  const p = clamp(value, 0, 1);

  if (stops.length === 1 || p <= positions[0]) {
    return sampleStop(stops[0], 0, 0);
  }

  const lastIndex = stops.length - 1;
  if (p >= positions[lastIndex]) {
    return sampleStop(stops[lastIndex], lastIndex, 1);
  }

  let segment = 0;
  while (segment < lastIndex - 1 && p >= positions[segment + 1]) segment += 1;

  const start = stops[segment];
  const end = stops[segment + 1];
  const span = positions[segment + 1] - positions[segment];
  const local = span > 0 ? clamp((p - positions[segment]) / span, 0, 1) : 1;

  return {
    x: lerp(start.x, end.x, local),
    y: lerp(start.y, end.y, local),
    z: lerp(start.z, end.z, local),
    twist: lerp(start.twist ?? 0, end.twist ?? 0, local),
    spread: lerp(start.spread ?? 1, end.spread ?? 1, local),
    segment,
    segmentProgress: local,
  };
}

/** More descriptive alias for components that render a sample at each frame. */
export const sampleTransect = fieldTransect;

function sampleStop(stop: FieldStop, segment: number, segmentProgress: number): FieldSample {
  return {
    x: stop.x,
    y: stop.y,
    z: stop.z,
    twist: stop.twist ?? 0,
    spread: stop.spread ?? 1,
    segment,
    segmentProgress,
  };
}
