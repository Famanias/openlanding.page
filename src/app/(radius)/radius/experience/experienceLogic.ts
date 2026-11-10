export type TerrainZone = "city" | "mixed" | "rough";

export function getTerrain(value: number): { zone: TerrainZone; progress: number } {
  const progress = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const zone = progress < 34 ? "city" : progress < 67 ? "mixed" : "rough";
  return { zone, progress };
}

export function validateInterest(values: { name: string; email: string }): Partial<Record<"name" | "email", string>> {
  const errors: Partial<Record<"name" | "email", string>> = {};
  const email = values.email.trim();

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}
