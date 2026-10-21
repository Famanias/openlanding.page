export type ClockStep =
  | "next15"
  | "prev15"
  | "nextHour"
  | "prevHour"
  | "start"
  | "end";

/** Format a decimal hour (0..12) into "H HH:MM" format. */
export function formatHour(hour: number): string {
  const clamped = Math.max(0, Math.min(12, hour));
  const totalMinutes = Math.round(clamped * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const padH = h.toString().padStart(2, "0");
  const padM = m.toString().padStart(2, "0");
  return `H ${padH}:${padM}`;
}

/**
 * Progress (0..1) -> Hour (0..12)
 * Quadratic curve: hour = 12 * progress^2
 * Gives top notes (first 45 min) the first 25% of scroll travel.
 */
export function progressToHour(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  return 12 * (p * p);
}

/**
 * Hour (0..12) -> Progress (0..1)
 * Inverted quadratic: progress = sqrt(hour / 12)
 */
export function hourToProgress(hour: number): number {
  const h = Math.max(0, Math.min(12, hour));
  return Math.sqrt(h / 12);
}

/** Compute updated hour when stepped via keyboard / buttons. */
export function stepHour(currentHour: number, step: ClockStep): number {
  let next = currentHour;
  switch (step) {
    case "next15":
      next = currentHour + 0.25;
      break;
    case "prev15":
      next = currentHour - 0.25;
      break;
    case "nextHour":
      next = currentHour + 1;
      break;
    case "prevHour":
      next = currentHour - 1;
      break;
    case "start":
      next = 0;
      break;
    case "end":
      next = 12;
      break;
  }
  return Math.max(0, Math.min(12, Math.round(next * 100) / 100));
}
