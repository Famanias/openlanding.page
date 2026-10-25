import { flashCurve, segment } from "../motion/math";

/** The strobe as a look lands: peaks just before full arrival, dark again at 1 (where arrival clamps). */
export function lookFlash(arrive: number): number {
  return flashCurve(arrive, 0.8, 1);
}

/**
 * Arrival (0–1) of each sticky look. Look 0 is already full screen (the sheet enlarged into it);
 * every later look slides up over the previous one during one viewport of scroll.
 */
export function lookArrivals(scrollY: number, containerTop: number, viewportHeight: number, count: number, lead = 0): number[] {
  return Array.from({ length: count }, (_, i) => {
    if (i === 0 || viewportHeight <= 0) return 1;
    const start = containerTop + (i - 1 + lead) * viewportHeight;
    return segment(scrollY, start, start + viewportHeight);
  });
}

/** The look that covers most of the screen. */
export function activeLook(arrivals: number[]): number {
  let active = 0;
  arrivals.forEach((arrival, index) => { if (arrival >= 0.5) active = index; });
  return active;
}
