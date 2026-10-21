const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Side = "a" | "b";
export type SubscribeFields = { email: string; side: string };
export type SubscribeErrors = { email?: string; side?: string };

/** Returns an error message per invalid field; an empty object means the form is valid. */
export function validateSubscribe({ email, side }: SubscribeFields): SubscribeErrors {
  const errors: SubscribeErrors = {};
  if (!EMAIL.test(email.trim())) errors.email = "Enter a valid email";
  if (side !== "a" && side !== "b") errors.side = "Pick Side A or Side B";
  return errors;
}
