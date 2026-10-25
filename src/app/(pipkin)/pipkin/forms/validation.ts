export type ListValues = { name: string; email: string; leaning: string };
export type ListErrors = Partial<Record<keyof ListValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateList(values: ListValues): ListErrors {
  const errors: ListErrors = {};
  if (values.name.trim().length < 2) errors.name = "Tell us what to call you (2+ letters).";
  if (!EMAIL.test(values.email.trim())) errors.email = "That email looks a little off. Try name@place.com.";
  if (!values.leaning) errors.leaning = "Pick the jar you lean towards.";
  return errors;
}

export const isValid = (errors: ListErrors) => Object.keys(errors).length === 0;
