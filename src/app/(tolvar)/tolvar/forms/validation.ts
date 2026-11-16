export type EstimateFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  comments: string;
};

export type FieldName = keyof EstimateFields;
export type EstimateErrors = Partial<Record<FieldName, string>>;

export const EMPTY_FIELDS: EstimateFields = { firstName: "", lastName: "", email: "", phone: "", company: "", comments: "" };

/** In the order they appear on the form, so the first error is also the first field on screen. */
export const REQUIRED: FieldName[] = ["firstName", "lastName", "email", "phone"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function digits(value: string): string {
  return value.replace(/\D/g, "");
}

export function validateEstimate(fields: EstimateFields): EstimateErrors {
  const errors: EstimateErrors = {};
  if (!fields.firstName.trim()) errors.firstName = "We need a first name to ask for.";
  if (!fields.lastName.trim()) errors.lastName = "And a last name.";
  if (!fields.email.trim()) errors.email = "An email, so we can send the estimate.";
  else if (!EMAIL.test(fields.email.trim())) errors.email = "That email looks short a piece.";
  const phone = digits(fields.phone);
  if (!phone) errors.phone = "A number Dale can call back.";
  else if (phone.length < 10) errors.phone = "That number is short a few digits.";
  else if (phone.length > 11) errors.phone = "That number has too many digits.";
  if (fields.comments.length > 1200) errors.comments = "Keep it under 1,200 characters. The rest can wait for the call.";
  return errors;
}

export function firstInvalid(errors: EstimateErrors): FieldName | null {
  const order: FieldName[] = [...REQUIRED, "company", "comments"];
  return order.find((name) => errors[name]) ?? null;
}

export function isValid(errors: EstimateErrors): boolean {
  return Object.keys(errors).length === 0;
}

/** A ticket number for the confirmation, made from the caller's own number so it is stable without a clock. */
export function ticketNumber(phone: string): string {
  const d = digits(phone);
  return `T-${d.slice(-4).padStart(4, "0")}`;
}
