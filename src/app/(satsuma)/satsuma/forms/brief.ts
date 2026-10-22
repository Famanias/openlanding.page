import { packById } from "../content/packs";
import { CATEGORIES } from "../content/steps";

export type BriefInput = {
  brand: string;
  email: string;
  category: string;
  pack: string;
  note: string;
};

export type BriefField = keyof BriefInput;
export type BriefErrors = Partial<Record<BriefField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const NOTE_MAX = 280;

/** Client-side rules. Nothing leaves the browser: this is a template. */
export function validateBrief(input: BriefInput): BriefErrors {
  const errors: BriefErrors = {};
  if (input.brand.trim().length < 2) errors.brand = "Add your brand name.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Add an email so your maker can reply.";
  if (!CATEGORIES.includes(input.category)) errors.category = "Pick what you sell.";
  if (!packById(input.pack)) errors.pack = "Choose a pack.";
  if (input.note.length > NOTE_MAX) errors.note = `Keep the note to ${NOTE_MAX} characters.`;
  return errors;
}

export function isValid(errors: BriefErrors): boolean {
  return Object.keys(errors).length === 0;
}

function hash(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 33) ^ text.charCodeAt(i)) >>> 0;
  return h;
}

/** A stable, friendly reference for the confirmation card, derived from the brief so a re-send matches. */
export function briefReference(input: BriefInput): string {
  const code = hash(`${input.brand.trim().toLowerCase()}|${input.email.trim().toLowerCase()}|${input.pack}`)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")
    .slice(-4);
  return `SA-${input.pack.slice(0, 1).toUpperCase()}${code}`;
}
