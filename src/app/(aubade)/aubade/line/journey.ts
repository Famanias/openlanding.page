import { LEGS, STATIONS } from "../content/line";
import { clamp, lerp, progress, wrap } from "../motion/math";

/** How far the far layer (rate 1) travels across the whole line, in percent of a layer's width. */
export const TRAVEL = 300;
/** Layers are 200% wide and their artwork repeats every 50%. */
export const LAYER_PERIOD = 50;
/** Share of the line over which the tunnel mouth closes (before Brig) or opens (after Domodossola). */
export const TUNNEL_RAMP = 0.04;

type Offsets = { scrollY: number; top: number; height: number; viewport: number };

/** Scroll position → 0–1 progress through a sticky track. Offsets are cached by the caller. */
export function progressFromOffsets({ scrollY, top, height, viewport }: Offsets): number {
  return progress(scrollY, top, top + Math.max(0, height - viewport));
}

export function legAt(p: number): number {
  const i = LEGS.findIndex((leg) => p < leg.end);
  return i === -1 ? LEGS.length - 1 : Math.max(0, i);
}

export function legProgress(p: number): number {
  const leg = LEGS[legAt(p)];
  return progress(p, leg.start, leg.end);
}

const DEPARTURE = parseClock(STATIONS[0].time);

export function parseClock(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatClock(minutes: number): string {
  const m = Math.round(wrap(minutes, 1440));
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Minutes since midnight of the departure day; times before departure belong to the next morning. */
function onTheNight(time: string): number {
  const m = parseClock(time);
  return m < DEPARTURE ? m + 1440 : m;
}

function interpolate(p: number, read: (i: number) => number): number {
  const t = clamp(p, 0, 1);
  const next = STATIONS.findIndex((s) => s.at >= t);
  if (next <= 0) return read(0);
  const a = STATIONS[next - 1];
  const b = STATIONS[next];
  return lerp(read(next - 1), read(next), progress(t, a.at, b.at));
}

export function clockAt(p: number): string {
  return formatClock(interpolate(p, (i) => onTheNight(STATIONS[i].time)));
}

export function kmAt(p: number): number {
  return Math.round(interpolate(p, (i) => STATIONS[i].km));
}

/** Horizontal offset of a landscape layer, in percent of its own width, looping every LAYER_PERIOD. */
export function layerShift(p: number, rate: number): number {
  return wrap(p * rate * TRAVEL, LAYER_PERIOD);
}

const TUNNEL = LEGS.find((leg) => leg.id === "tunnel")!;

/** How closed the tunnel mouth is coming in (enter) and how far it has passed going out (exit), 0–1 each. */
export function tunnelMouth(p: number): { enter: number; exit: number } {
  return {
    enter: progress(p, TUNNEL.start - TUNNEL_RAMP, TUNNEL.start),
    exit: progress(p, TUNNEL.end, TUNNEL.end + TUNNEL_RAMP),
  };
}

const EPS = 1e-3;

/** Keyboard stepping: the next leg's start, or back to the current (then previous) leg's start. */
export function stepTarget(p: number, dir: 1 | -1): number {
  if (dir === 1) return LEGS.find((leg) => leg.start > p + EPS)?.start ?? 1;
  const before = LEGS.filter((leg) => leg.start < p - EPS);
  return before.at(-1)?.start ?? 0;
}
