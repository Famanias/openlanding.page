import { FEELINGS, SIZES, type Feeling, type BunchSize } from "../bouquet/model";
export type JoinValues = { name: string; email: string; feeling: string; size: string };
export type JoinErrors = Partial<Record<keyof JoinValues, string>>;
export function validateJoin(values: JoinValues): JoinErrors {
  const errors: JoinErrors = {};
  if (!values.name.trim() || values.name.trim().length > 80) errors.name = "A first name, up to 80 characters, please.";
  if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "A lovely email address needs an @ and a domain.";
  if (!FEELINGS.some((item) => item === values.feeling)) errors.feeling = "Pick one of our three flower feelings.";
  if (!SIZES.some((item) => item === values.size)) errors.size = "Pick a bunch size.";
  return errors;
}
export type BouquetSelection = { feeling: Feeling; size: BunchSize };
