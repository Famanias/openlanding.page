import { PACKAGES } from "../data";
export type Brief = { name: string; email: string; package: string; story: string };
export type BriefErrors = Partial<Record<keyof Brief, string>>;
export function validateBrief(brief: Brief): BriefErrors {
  const errors: BriefErrors = {};
  if (brief.name.trim().length < 2 || brief.name.length > 100) errors.name = "A name between 2 and 100 characters, please.";
  if (brief.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email.trim())) errors.email = "Please enter an email address I can reply to.";
  if (!PACKAGES.some(item => item.id === brief.package) && brief.package !== "unsure") errors.package = "Choose a commission type, or pick ‘Not sure yet’.";
  if (brief.story.trim().length < 20 || brief.story.length > 3000) errors.story = "Tell me a little more—between 20 and 3,000 characters.";
  return errors;
}
