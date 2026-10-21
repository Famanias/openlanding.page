/** Wholesale enquiry validation — client-side only, no network. */

export interface WholesaleFields {
  name: string;
  business: string;
  email: string;
  volume: string;
  message: string;
}

export type WholesaleErrors = Partial<Record<keyof WholesaleFields, string>>;

export const VOLUME_OPTIONS = [
  { value: "2-5", label: "2–5 kg a week" },
  { value: "5-15", label: "5–15 kg a week" },
  { value: "15+", label: "15+ kg a week" },
  { value: "office", label: "Office or studio (under 2 kg)" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateWholesale(fields: WholesaleFields): WholesaleErrors {
  const errors: WholesaleErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Tell us who we're talking to.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "That name looks too short.";
  }

  if (!fields.business.trim()) {
    errors.business = "Which business is this for?";
  }

  if (!fields.email.trim()) {
    errors.email = "We need an email to reply to.";
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "That email doesn't look right.";
  }

  if (!VOLUME_OPTIONS.some((o) => o.value === fields.volume)) {
    errors.volume = "Pick a weekly volume.";
  }

  if (fields.message.length > 600) {
    errors.message = "Keep it under 600 characters.";
  }

  return errors;
}

export function isValidWholesale(fields: WholesaleFields): boolean {
  return Object.keys(validateWholesale(fields)).length === 0;
}
