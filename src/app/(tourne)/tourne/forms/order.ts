export type OrderFields = { name: string; email: string; postcode: string; note: string };
export type OrderErrors = Partial<Record<keyof OrderFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateOrder(fields: OrderFields): OrderErrors {
  const errors: OrderErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Tell us who the vessel is for.";
  if (!EMAIL.test(fields.email.trim())) errors.email = "That email doesn't look right.";
  if (fields.postcode.trim().length < 3) errors.postcode = "We need a postcode to quote shipping.";
  if (fields.note.length > 280) errors.note = "Keep the note under 280 characters.";
  return errors;
}

export type OrderQuote = { weeks: number; shippingUsd: number; totalUsd: number };

/** Taller and wider vessels take longer to dry, and cost more to ship. */
export function quoteOrder(priceUsd: number, heightCm: number, volumeMl: number): OrderQuote {
  const weeks = heightCm > 30 || volumeMl > 6000 ? 6 : 5;
  const shippingUsd = 18 + Math.round(volumeMl / 500) * 2;
  return { weeks, shippingUsd, totalUsd: priceUsd + shippingUsd };
}

/** Stable short reference derived from the order's own specification. */
export function orderReference(parts: readonly (string | number)[]): string {
  let hash = 2166136261;
  for (const char of parts.join("|")) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `TN-${(hash >>> 0).toString(36).toUpperCase().padStart(6, "0").slice(0, 6)}`;
}
