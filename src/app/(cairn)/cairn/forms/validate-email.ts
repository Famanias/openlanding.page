const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the error message, or null when the address looks valid. */
export function validateEmail(email: string): string | null {
  return EMAIL.test(email.trim()) ? null : "Enter a valid email";
}
