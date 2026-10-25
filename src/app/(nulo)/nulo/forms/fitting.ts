export type FittingInput = {
  name: string;
  email: string;
  reason: string;
  frame: string;
  note: string;
};

export type FittingField = keyof FittingInput;
export type FittingErrors = Partial<Record<FittingField, string>>;

export const FITTING_REASONS = ["Screen work", "City days", "Night driving"] as const;
export const FITTING_FRAMES = ["Arc 01", "Fold 02", "Halo 03"] as const;
export const NOTE_MAX = 240;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateFitting(input: FittingInput): FittingErrors {
  const errors: FittingErrors = {};
  if (input.name.trim().length < 2) errors.name = "Add your name.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Add a working email.";
  if (!FITTING_REASONS.includes(input.reason as (typeof FITTING_REASONS)[number])) errors.reason = "Choose a day mode.";
  if (!FITTING_FRAMES.includes(input.frame as (typeof FITTING_FRAMES)[number])) errors.frame = "Choose a frame.";
  if (input.note.length > NOTE_MAX) errors.note = `Keep the note to ${NOTE_MAX} characters.`;
  return errors;
}

export function isValid(errors: FittingErrors): boolean {
  return Object.keys(errors).length === 0;
}

function hash(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i += 1) h = (Math.imul(h, 33) ^ text.charCodeAt(i)) >>> 0;
  return h;
}

export function frameReference(input: FittingInput): string {
  const code = hash(`${input.name.trim().toLowerCase()}|${input.email.trim().toLowerCase()}|${input.frame}`)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")
    .slice(-4);
  return `NU-${code}`;
}
