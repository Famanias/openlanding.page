export type RequestValues = { name: string; email: string; company: string; note: string };
export type RequestErrors = Partial<Record<keyof RequestValues, string>>;

export function validateRequest(values: RequestValues): RequestErrors {
  const errors: RequestErrors = {};
  if (!values.name.trim()) errors.name = "Add your name";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a work email";
  if (!values.company.trim()) errors.company = "Add your company";
  return errors;
}
