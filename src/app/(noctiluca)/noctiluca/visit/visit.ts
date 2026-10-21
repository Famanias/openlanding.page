/** Timed entry: one group every 20 minutes, so no room ever holds more than a few people. */

export const PRICE_EUR = 18;
export const LATE_PRICE_EUR = 22;
export const MAX_GUESTS = 8;

const OPEN_MIN = 10 * 60;
const LAST_ENTRY_MIN = 19 * 60 + 20;
const LATE_LAST_ENTRY_MIN = 22 * 60 + 20;
const LATE_FROM_MIN = 19 * 60 + 40;
const STEP_MIN = 20;

/** Parse "YYYY-MM-DD" as a local calendar day. */
export function parseDay(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getMonth() === Number(m[2]) - 1 ? d : null;
}

const pad = (n: number) => String(n).padStart(2, "0");
const toClock = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
const toMinutes = (clock: string) => {
  const [h, m] = clock.split(":").map(Number);
  return h * 60 + m;
};

export function slotsFor(day: string): string[] {
  const d = parseDay(day);
  if (!d || d.getDay() === 1) return [];
  const last = d.getDay() === 5 ? LATE_LAST_ENTRY_MIN : LAST_ENTRY_MIN;
  const out: string[] = [];
  for (let t = OPEN_MIN; t <= last; t += STEP_MIN) out.push(toClock(t));
  return out;
}

export function isLateSlot(day: string, slot: string): boolean {
  const d = parseDay(day);
  return !!d && d.getDay() === 5 && toMinutes(slot) >= LATE_FROM_MIN;
}

export function entryTotal(day: string, slot: string, guests: number): number {
  return guests * (isLateSlot(day, slot) ? LATE_PRICE_EUR : PRICE_EUR);
}

export type EntryDraft = { date: string; slot: string; guests: string; email: string };
export type EntryErrors = Partial<Record<keyof EntryDraft, string>>;

export function validateEntry(draft: EntryDraft, now: Date = new Date()): EntryErrors {
  const errors: EntryErrors = {};
  const day = parseDay(draft.date);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (!day) errors.date = "Pick a day to visit.";
  else if (day < startOfToday) errors.date = "That day has already gone.";
  else if (day.getDay() === 1) errors.date = "The house is closed on Mondays.";

  if (!errors.date && !slotsFor(draft.date).includes(draft.slot)) errors.slot = "Choose an entry time.";
  if (errors.date && !draft.slot) errors.slot = "Choose an entry time.";

  const guests = Number(draft.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) errors.guests = "Book for 1–8 guests.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) errors.email = "Enter an email for your tickets.";

  return errors;
}
