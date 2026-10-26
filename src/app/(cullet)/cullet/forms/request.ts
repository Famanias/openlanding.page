/** The "Open studio" seat request: rules for the form, kept pure so they're tested. */
export const ROLES = ["Product design", "3D & motion", "Web & frontend", "Brand & packaging"] as const;
export const TEAMS = ["Just me", "2–10", "11–50", "51+"] as const;

export type SeatRequest = { email: string; role: string; team: string };
export type SeatErrors = Partial<Record<keyof SeatRequest, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(req: SeatRequest): SeatErrors {
  const errors: SeatErrors = {};
  const email = req.email.trim();
  if (!email) errors.email = "Add the email your seat should go to.";
  else if (email.length > 254 || !EMAIL.test(email)) errors.email = "That email doesn't look complete.";
  if (!(ROLES as readonly string[]).includes(req.role)) errors.role = "Pick what you'll use glass for.";
  if (!(TEAMS as readonly string[]).includes(req.team)) errors.team = "Pick a team size.";
  return errors;
}

export const firstError = (errors: SeatErrors): keyof SeatRequest | null =>
  (["email", "role", "team"] as const).find((k) => errors[k]) ?? null;

/** A stable seat number from the email, so the confirmation reads the same on every submit. */
export function seatNumber(email: string): string {
  let h = 2166136261;
  for (const ch of email.trim().toLowerCase()) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return String(1000 + ((h >>> 0) % 9000));
}

/** The first material a role is handed on day one. */
export function starterFor(role: string): string {
  switch (role) {
    case "3D & motion": return "Dense flint";
    case "Web & frontend": return "Frosted quartz";
    case "Brand & packaging": return "Opal film";
    default: return "Crown silica";
  }
}
