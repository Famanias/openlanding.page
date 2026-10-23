export type FieldWalkInput = {
  name: string;
  farm: string;
  email: string;
  acres: string;
  goal: string;
};

export type FieldWalkErrors = Partial<Record<keyof FieldWalkInput, string>>;

export type FieldWalkResult =
  | { ok: true; data: FieldWalkInput }
  | { ok: false; errors: FieldWalkErrors };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFieldWalk(input: FieldWalkInput): FieldWalkResult {
  const data: FieldWalkInput = {
    name: input.name.trim(),
    farm: input.farm.trim(),
    email: input.email.trim(),
    acres: input.acres.trim(),
    goal: input.goal.trim(),
  };
  const errors: FieldWalkErrors = {};

  if (!data.name) errors.name = "Add your name.";
  if (!data.farm) errors.farm = "Add your farm or field name.";
  if (!emailPattern.test(data.email)) errors.email = "Enter a valid email.";
  const acres = Number(data.acres);
  if (!data.acres || !Number.isFinite(acres) || acres <= 0) errors.acres = "Enter a positive acreage.";
  if (data.goal.length > 600) errors.goal = "Keep the note under 600 characters.";

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}

