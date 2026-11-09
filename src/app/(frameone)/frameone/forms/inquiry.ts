export type Inquiry = { name: string; email: string; project: string };
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;
export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = inquiry.name.trim();
  const email = inquiry.email.trim();
  const project = inquiry.project.trim();
  if (!name || name.length > 100) errors.name = "Enter your name (up to 100 characters).";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (project.length < 10 || project.length > 2000) errors.project = "Describe your project in 10 to 2,000 characters.";
  return errors;
}
