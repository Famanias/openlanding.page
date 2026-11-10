export type Inquiry = { name: string; email: string };
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const name = inquiry.name.trim();
  const email = inquiry.email.trim();
  const errors: InquiryErrors = {};
  if (!name) errors.name = "Enter your name.";
  else if (name.length > 100) errors.name = "Keep your name under 100 characters.";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}
