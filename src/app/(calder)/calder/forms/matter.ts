import { MATTER_TITLES } from "../content/firm";

export type MatterInput = {
  name: string;
  email: string;
  matter: string;
  message: string;
};

export type MatterField = keyof MatterInput;
export type MatterErrors = Partial<Record<MatterField, string>>;

export const NOT_SURE = "Not sure yet";
export const MATTER_OPTIONS: string[] = [...MATTER_TITLES, NOT_SURE];
export const MESSAGE_MAX = 600;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Client-side rules. Nothing leaves the browser: this is a template. */
export function validateMatter(input: MatterInput): MatterErrors {
  const errors: MatterErrors = {};
  if (input.name.trim().length < 2) errors.name = "Please add your name.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Add an email address we can reply to.";
  if (!MATTER_OPTIONS.includes(input.matter)) errors.matter = "Choose the closest kind of matter.";
  if (input.message.trim().length < 10) errors.message = "A sentence or two is enough to begin.";
  else if (input.message.length > MESSAGE_MAX) errors.message = `Keep it to ${MESSAGE_MAX} characters for now.`;
  return errors;
}

export function isValid(errors: MatterErrors): boolean {
  return Object.keys(errors).length === 0;
}

function hash(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 33) ^ text.charCodeAt(i)) >>> 0;
  return h;
}

/** A stable docket number for the seal, derived from the filing so a re-send matches: CR-26-0000. */
export function docketNumber(input: MatterInput): string {
  const digits = (hash(`${input.name.trim().toLowerCase()}|${input.email.trim().toLowerCase()}|${input.matter}`) % 10000)
    .toString()
    .padStart(4, "0");
  return `CR-26-${digits}`;
}
