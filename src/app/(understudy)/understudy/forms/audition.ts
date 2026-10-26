import { partById } from "../content/parts";

export type Audition = { name: string; email: string; part: string };
export type AuditionErrors = Partial<Record<keyof Audition, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateAudition(input: Audition): AuditionErrors {
  const errors: AuditionErrors = {};
  const name = input.name.trim();
  if (!name) errors.name = "Tell us what to put on your call sheet.";
  else if (name.length > 60) errors.name = "Keep it under 60 characters.";
  const email = input.email.trim();
  if (!email) errors.email = "We send your call time here.";
  else if (email.length > 254 || !EMAIL.test(email)) errors.email = "That doesn't look like an email address.";
  if (!partById(input.part)) errors.part = "Pick the part you want to rehearse.";
  return errors;
}

export const isValid = (errors: AuditionErrors) => Object.keys(errors).length === 0;

const REF = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** A stable call-sheet reference from the entry, like US-7K2Q. */
export function callSheetRef(input: Audition): string {
  let h = 2166136261;
  for (const ch of `${input.name.trim().toLowerCase()}|${input.email.trim().toLowerCase()}|${input.part}`) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += REF[h % REF.length];
    h = Math.floor(h / REF.length);
  }
  return `US-${out}`;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Your first call time: the next weekday at 09:00, never today. */
export function firstCallTime(from: Date): { day: string; date: Date } {
  const next = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1, 9, 0, 0, 0);
  while (next.getDay() === 0 || next.getDay() === 6) next.setDate(next.getDate() + 1);
  return { day: DAYS[next.getDay()], date: next };
}
