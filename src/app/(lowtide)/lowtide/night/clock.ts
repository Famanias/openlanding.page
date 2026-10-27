import { clamp } from "../motion/math";

/** The night runs 23:04 → 07:00, in minutes past the first midnight (values above 1440 are the next morning). */
export const NIGHT_START = 23 * 60 + 4;
export const NIGHT_END = 24 * 60 + 7 * 60;

export const CHAPTER_IDS = ["hook", "problem", "sensors", "smart-wake", "proof", "reveal", "dawn"] as const;
export type ChapterId = (typeof CHAPTER_IDS)[number];

/** Each chapter rests on a low tide (except the hook at high tide and dawn). */
export const CHAPTER_CLOCK: Record<ChapterId, number> = {
  hook: NIGHT_START,
  problem: 1440 + 40,
  sensors: 1440 + 2 * 60 + 15,
  "smart-wake": 1440 + 3 * 60 + 50,
  proof: 1440 + 5 * 60 + 25,
  reveal: 1440 + 6 * 60 + 40,
  dawn: NIGHT_END,
};

export const progressToClock = (p: number) => NIGHT_START + clamp(p) * (NIGHT_END - NIGHT_START);

export const clockToProgress = (min: number) => clamp((min - NIGHT_START) / (NIGHT_END - NIGHT_START));

export function formatClock(min: number) {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

export const CHAPTER_POINTS = Object.fromEntries(
  CHAPTER_IDS.map((id) => [id, clockToProgress(CHAPTER_CLOCK[id])]),
) as Record<ChapterId, number>;
