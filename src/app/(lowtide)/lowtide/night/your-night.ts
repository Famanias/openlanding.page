import { clamp } from "../motion/math";

export const CYCLE_MIN = 90;

export type NightPlan = {
  bedMin: number;
  wakeMin: number;
  durationMin: number;
  cycleCount: number;
  /** Minutes after bedtime where one cycle ends and the next begins (the lightest moments). */
  cycleBoundariesMin: number[];
  /** Minutes after bedtime when the ring buzzes you awake. */
  smartWakeMin: number;
  windowMin: number;
};

export type NightError = "format" | "same-time" | "too-long";

function parseClock(s: string): number | null {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(s.trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

export function planNight(bed: string, wake: string, windowMin = 30): { ok: true; plan: NightPlan } | { ok: false; error: NightError } {
  const bedMin = parseClock(bed);
  const wakeMin = parseClock(wake);
  if (bedMin === null || wakeMin === null) return { ok: false, error: "format" };
  const durationMin = (((wakeMin - bedMin) % 1440) + 1440) % 1440;
  if (durationMin === 0) return { ok: false, error: "same-time" };
  if (durationMin > 16 * 60) return { ok: false, error: "too-long" };

  const win = clamp(windowMin, 10, 30);
  const cycleBoundariesMin: number[] = [];
  for (let b = CYCLE_MIN; b < durationMin; b += CYCLE_MIN) cycleBoundariesMin.push(b);
  const last = cycleBoundariesMin[cycleBoundariesMin.length - 1];
  const smartWakeMin = last !== undefined && durationMin - last <= win ? last : durationMin;

  return {
    ok: true,
    plan: {
      bedMin,
      wakeMin,
      durationMin,
      cycleCount: Math.max(1, Math.round(durationMin / CYCLE_MIN)),
      cycleBoundariesMin,
      smartWakeMin,
      windowMin: win,
    },
  };
}
