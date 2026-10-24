export type Brief = { name: string; email: string; story: string };
export type BriefErrors = Partial<Record<keyof Brief, string>>;
export function validateBrief(brief: Brief): BriefErrors {
  const errors: BriefErrors = {};
  if (!brief.name.trim()) errors.name = "What should we call you?";
  else if (brief.name.length > 100) errors.name = "Keep your name under 100 characters.";
  if (brief.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email.trim())) errors.email = "Add a valid email address.";
  if (brief.story.trim().length < 15) errors.story = "Tell us a little about your idea (at least 15 characters).";
  else if (brief.story.length > 2000) errors.story = "Keep your idea under 2,000 characters.";
  return errors;
}
