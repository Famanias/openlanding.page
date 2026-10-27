import { clamp } from "../motion/math";

/** The dial's night arc: 23:04 at lower left (210°), sweeping clockwise over the top to 07:00 at lower right (−30°). */
export const DIAL = { size: 132, cx: 66, cy: 66, r: 50, start: 210, sweep: 240 } as const;

export function dialPoint(p: number, r: number = DIAL.r) {
  const a = ((DIAL.start - DIAL.sweep * clamp(p)) * Math.PI) / 180;
  return { x: DIAL.cx + r * Math.cos(a), y: DIAL.cy - r * Math.sin(a) };
}

/** Pointer position (in dial px) → progress along the arc, clamped to the night. */
export function dialProgress(x: number, y: number) {
  let deg = (Math.atan2(DIAL.cy - y, x - DIAL.cx) * 180) / Math.PI; // −180…180, 0 = right, y up
  if (deg < -90) deg += 360; // keep the bottom gap (−90° … −150°) on the ends
  return clamp((DIAL.start - deg) / DIAL.sweep);
}

export function arcPath(r: number = DIAL.r) {
  const a = dialPoint(0, r);
  const b = dialPoint(1, r);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 1 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}
