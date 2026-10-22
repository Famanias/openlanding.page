export type CommissionValues = { name: string; email: string; room: string; note?: string };
export type CommissionErrors = Partial<Record<keyof CommissionValues, string>>;

export function validateCommission(values: CommissionValues): CommissionErrors {
  const errors: CommissionErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email.";
  return errors;
}
