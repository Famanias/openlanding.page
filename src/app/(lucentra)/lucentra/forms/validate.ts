export type BriefInput = { name: string; email: string; surface: string };
export type BriefErrors = Partial<Record<keyof BriefInput, string>>;
const surfaces = new Set(["quartz", "milk", "blue-hour", "edge"]);

export function validateBrief(input: BriefInput): BriefErrors {
  const errors: BriefErrors = {};
  if (!input.name.trim()) errors.name = "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = "Use a work email format.";
  if (!surfaces.has(input.surface)) errors.surface = "Choose a starting surface.";
  return errors;
}
