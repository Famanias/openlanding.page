export type SignupErrors = { name?: string; email?: string };
export function validateSignup(name: string, email: string): SignupErrors {
  const errors: SignupErrors = {};
  if (!name.trim() || name.trim().length > 80)
    errors.name = "Tell us your first name.";
  if (
    email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  )
    errors.email = "Enter a valid email address.";
  return errors;
}
