export type InquiryInput = { name: string; email: string; peak: string; days: string; support: string; note: string };
export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>;
export type InquiryResult = { ok: true; data: InquiryInput } | { ok: false; errors: InquiryErrors };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(input: InquiryInput): InquiryResult {
  const data = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, value.trim()])) as InquiryInput;
  const errors: InquiryErrors = {};
  if (!data.name) errors.name = "Add your name.";
  if (!emailPattern.test(data.email)) errors.email = "Enter a valid email.";
  if (!data.peak) errors.peak = "Choose a peak.";
  const days = Number(data.days);
  if (!Number.isFinite(days) || days < 14 || days > 70) errors.days = "Choose planning days from 14 to 70.";
  if (!["route", "guided", "private"].includes(data.support)) errors.support = "Choose a support mode.";
  if (data.note.length > 600) errors.note = "Keep the note under 600 characters.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

