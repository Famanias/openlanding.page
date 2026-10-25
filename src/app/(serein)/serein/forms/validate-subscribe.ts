export type SubscribeValues = { name: string; email: string };
export type SubscribeErrors = Partial<Record<keyof SubscribeValues, string>>;

export function validateSubscribe(values: SubscribeValues): SubscribeErrors {
  const errors: SubscribeErrors = {};
  if (!values.name.trim()) errors.name = "Add your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email";
  return errors;
}
