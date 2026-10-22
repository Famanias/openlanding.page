/** Client-side brief validation. Nothing is sent anywhere. */

export interface BriefInput {
  name: string;
  email: string;
  /** A short description of the field, site, or experience to shape. */
  field: string;
  /** Optional context for the creative brief. */
  message: string;
}

export type BriefField = keyof BriefInput;
export type BriefErrors = Partial<Record<BriefField, string>>;

export const MESSAGE_MAX = 600;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Return one human-readable error per invalid brief field. */
export function validateBrief(input: BriefInput): BriefErrors {
  const errors: BriefErrors = {};

  if (input.name.trim().length < 2) {
    errors.name = "Add your name.";
  }

  if (!EMAIL.test(input.email.trim())) {
    errors.email = "Add a valid email.";
  }

  if (!input.field.trim()) {
    errors.field = "Tell us what you want to shape.";
  }

  if (input.message.length > MESSAGE_MAX) {
    errors.message = `Keep the note to ${MESSAGE_MAX} characters.`;
  }

  return errors;
}

export function isValidBrief(input: BriefInput): boolean {
  return Object.keys(validateBrief(input)).length === 0;
}

/** Short alias for form submit handlers. */
export const isValid = isValidBrief;
