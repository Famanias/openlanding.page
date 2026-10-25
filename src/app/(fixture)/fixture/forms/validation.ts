export type Brief = {
  name: string;
  email: string;
  store: string;
  needs: string[];
  budget: string;
  note: string;
};

export type BriefErrors = Partial<Record<keyof Brief, string>>;

export const EMPTY_BRIEF: Brief = { name: "", email: "", store: "", needs: [], budget: "", note: "" };

export const NEEDS = [
  { id: "shell", label: "Setup" },
  { id: "fixtures", label: "Theme" },
  { id: "wiring", label: "Apps" },
  { id: "signage", label: "Speed + conversion" },
  { id: "open", label: "Care plan" },
] as const;

export const BUDGETS = [
  { id: "under-3k", label: "Under €3k" },
  { id: "3-6k", label: "€3–6k" },
  { id: "6-12k", label: "€6–12k" },
  { id: "12k-plus", label: "€12k +" },
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HOST = /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;

/** "https://www.Shop.com/collections" → "shop.com"; null when it isn't a plausible store host. */
export function normaliseStore(input: string): string | null {
  const host = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0] ?? "";
  return HOST.test(host) ? host : null;
}

export function validateBrief(brief: Brief): BriefErrors {
  const errors: BriefErrors = {};
  if (brief.name.trim().length < 2) errors.name = "Tell us who to ask for.";
  if (!EMAIL.test(brief.email.trim())) errors.email = "Enter a valid email.";
  if (!normaliseStore(brief.store)) errors.store = "Enter your store address, like yourshop.com.";
  if (brief.needs.length === 0) errors.needs = "Pick at least one thing to fit.";
  if (!brief.budget) errors.budget = "Pick a budget range.";
  if (brief.note.length > 600) errors.note = "Keep it under 600 characters.";
  return errors;
}

/** Deterministic "FX-1234-AB" reference so the confirmation slip reads like a real booking. */
export function bookingReference(brief: Brief): string {
  const seed = `${brief.email.trim().toLowerCase()}|${normaliseStore(brief.store) ?? ""}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  const digits = String(hash % 10000).padStart(4, "0");
  const letters = (hash >>> 14).toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").padStart(2, "X").slice(-2);
  return `FX-${digits}-${letters}`;
}
