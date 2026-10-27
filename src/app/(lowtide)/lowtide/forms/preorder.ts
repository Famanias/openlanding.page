export const FINISHES = ["moonstone", "tidewater", "driftwood"] as const;
export type Finish = (typeof FINISHES)[number];
export const RING_SIZES = [6, 7, 8, 9, 10, 11, 12, 13] as const;

export type PreorderInput = { email: string; size: string; finish: string };
export type PreorderField = keyof PreorderInput;
export type PreorderResult =
  | { ok: true; value: { email: string; size: number; finish: Finish } }
  | { ok: false; errors: Partial<Record<PreorderField, string>> };

export const PREORDER_MESSAGES: Record<PreorderField, string> = {
  email: "Add an email so we can write when your ring ships.",
  size: "Pick a ring size from 6 to 13.",
  finish: "Choose a finish.",
};

export function validatePreorder(input: PreorderInput): PreorderResult {
  const errors: Partial<Record<PreorderField, string>> = {};
  const email = input.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = PREORDER_MESSAGES.email;
  const size = /^\d+$/.test(input.size.trim()) ? Number(input.size) : NaN;
  if (!(RING_SIZES as readonly number[]).includes(size)) errors.size = PREORDER_MESSAGES.size;
  if (!(FINISHES as readonly string[]).includes(input.finish)) errors.finish = PREORDER_MESSAGES.finish;
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { email, size, finish: input.finish as Finish } };
}
