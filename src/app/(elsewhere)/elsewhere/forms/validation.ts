/** Client-side validation for the hold request. Nothing is sent anywhere: this is a template. */

export type HoldFields = { name: string; email: string; note: string };
export type HoldErrors = Partial<Record<keyof HoldFields, string>>;

export const NOTE_LIMIT = 280;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateHold(fields: HoldFields): HoldErrors {
  const errors: HoldErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  if (name.length < 2) errors.name = "Tell us whose name goes on the lockbox.";
  if (!email) errors.email = "We need an address for the lockbox code.";
  else if (!EMAIL.test(email)) errors.email = "That address doesn't look complete.";
  if (fields.note.length > NOTE_LIMIT) errors.note = `Keep the note under ${NOTE_LIMIT} characters.`;
  return errors;
}

export function hasErrors(errors: HoldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** The first invalid field in visual order, for focus management. */
export function firstInvalid(errors: HoldErrors): keyof HoldFields | null {
  for (const key of ["name", "email", "note"] as const) if (errors[key]) return key;
  return null;
}

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/**
 * A stable six-character hold reference for the key tag, e.g. `EW-7K2M9Q`. It is a hash of the request,
 * not an identifier: the same details always print the same tag.
 */
export function holdReference(seed: string): string {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  let value = hash >>> 0;
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += ALPHABET[value % ALPHABET.length];
    value = Math.floor(value / ALPHABET.length) ^ ((hash >>> (i * 3)) & 0xff);
  }
  return `EW-${code}`;
}
