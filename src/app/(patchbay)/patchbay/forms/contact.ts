import type { RoleId } from "../content/roles";

export type ContactFields = { name: string; email: string; role: RoleId | ""; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 600;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Tell me who's writing.";
  if (!EMAIL.test(fields.email.trim())) errors.email = "That email doesn't look right.";
  if (!fields.role) errors.role = "Pick the kind of work this is about.";
  const length = fields.message.trim().length;
  if (length < MESSAGE_MIN) errors.message = `A few more words, please (${MESSAGE_MIN - length} to go).`;
  if (length > MESSAGE_MAX) errors.message = `Keep it under ${MESSAGE_MAX} characters.`;
  return errors;
}

/** Stable short reference derived from the brief itself, so the same brief always gets the same ticket. */
export function briefReference(fields: ContactFields): string {
  let hash = 2166136261;
  for (const char of [fields.name, fields.email, fields.role, fields.message].join("|")) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `PB-${(hash >>> 0).toString(36).toUpperCase().padStart(7, "0").slice(0, 6)}`;
}

/** The template has no backend, so the brief is prepared as a local file and never claimed as sent. */
export function briefAsText(fields: ContactFields, reference: string): string {
  return [`Brief ${reference}`, `From: ${fields.name.trim()} <${fields.email.trim()}>`, `Role: ${fields.role}`, "", fields.message.trim(), ""].join("\n");
}
