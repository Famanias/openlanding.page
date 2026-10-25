import { dwell, nearestStop, sectionProgress } from "../motion/math";

export const STOP_COUNT = 5;

export type TripPose = {
  /** 0..1 through the pinned section */
  p: number;
  /** 0..4, lingering on every stop */
  s: number;
  /** the stop the stage is "at" right now */
  stop: number;
};

/** Everything the stage needs from one scroll reading. Pure so it can be tested without a DOM. */
export function tripPose(scrollY: number, top: number, height: number, viewportH: number, stops = STOP_COUNT): TripPose {
  const p = sectionProgress(scrollY, top, height, viewportH);
  const s = dwell(p, stops);
  return { p, s, stop: nearestStop(s, stops) };
}

/** Scroll offset (page px) at which a stop is centred, for deep links like #trip-3. */
export function scrollForStop(stop: number, top: number, height: number, viewportH: number, stops = STOP_COUNT): number {
  const travel = Math.max(0, height - viewportH);
  const clamped = Math.min(Math.max(stop, 0), stops - 1);
  return top + (clamped / (stops - 1)) * travel;
}

/** A stop's local progress: 0 when two stops away, 1 when centred, back to 0 two stops past. */
export function stopFocus(s: number, stop: number): number {
  return Math.max(0, 1 - Math.abs(s - stop));
}
