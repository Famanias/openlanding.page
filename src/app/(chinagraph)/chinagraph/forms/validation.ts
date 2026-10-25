export type Role = "customer" | "stockist" | "press";

export type SheetRequest = { name: string; email: string; street: string; city: string; country: string; role: Role | "" };
export type RequestErrors = Partial<Record<keyof SheetRequest, string>>;

export const EMPTY_REQUEST: SheetRequest = { name: "", email: "", street: "", city: "", country: "", role: "" };

export const ROLES: { id: Role; label: string }[] = [
  { id: "customer", label: "I wear it" },
  { id: "stockist", label: "I stock it" },
  { id: "press", label: "I write about it" },
];

export const COUNTRIES = ["United Kingdom", "Ireland", "France", "Belgium", "Netherlands", "Germany", "Denmark", "Japan", "United States", "Elsewhere"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateRequest(request: SheetRequest): RequestErrors {
  const errors: RequestErrors = {};
  if (request.name.trim().length < 2) errors.name = "Who should we address it to?";
  if (!EMAIL.test(request.email.trim())) errors.email = "That email won't reach us.";
  if (request.street.trim().length < 3) errors.street = "We post it, so we need a street.";
  if (request.city.trim().length < 2) errors.city = "Which city?";
  if (!request.country) errors.country = "Pick a country.";
  if (!request.role) errors.role = "Tell us who it's for.";
  return errors;
}

/** The printed sheet's run number: a stable four-digit number from the request. */
export function sheetNumber(request: SheetRequest): string {
  const seed = `${request.email.trim().toLowerCase()}|${request.city.trim().toLowerCase()}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return String(hash % 10000).padStart(4, "0");
}
