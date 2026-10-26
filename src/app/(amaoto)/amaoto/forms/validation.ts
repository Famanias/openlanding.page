export type CommissionFields = { name: string; email: string; occasion: string };
export function validateCommission(fields: CommissionFields) {
  const errors: Partial<Record<keyof CommissionFields, string>> = {};
  if (!fields.name.trim()) errors.name = "Add your name";
  if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) errors.email = "Enter a work email";
  if (!fields.occasion.trim()) errors.occasion = "Add your occasion";
  return errors;
}
