export type DemoInput = { name: string; email: string; company: string };
export type DemoErrors = Partial<Record<keyof DemoInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDemo(input: DemoInput): DemoErrors {
  const errors: DemoErrors = {};
  if (!input.name.trim()) errors.name = "Add your name";
  if (!EMAIL.test(input.email.trim())) errors.email = "Enter a work email";
  if (!input.company.trim()) errors.company = "Add your company";
  return errors;
}
