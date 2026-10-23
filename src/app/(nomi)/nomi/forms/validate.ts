export type WalkthroughFields = { name: string; email: string; students: string };

export type WalkthroughResult = { ok: true } | { ok: false; field: "email"; message: string };

export const EMAIL_MESSAGE = "Add a studio email so we know where to reply.";

/** The form is local-only, so the one rule is a reachable-looking studio email. */
export function validateWalkthrough({ email }: WalkthroughFields): WalkthroughResult {
  const value = email.trim();
  const at = value.indexOf("@");
  if (at < 1 || at === value.length - 1) return { ok: false, field: "email", message: EMAIL_MESSAGE };
  return { ok: true };
}
