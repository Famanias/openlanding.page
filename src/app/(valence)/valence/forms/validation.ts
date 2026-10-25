import type { BuyerRoleId, CompanySizeBand } from "../content/funnelData";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface LeadCaptureInput {
  fullName: string;
  workEmail: string;
  companyName: string;
  companySize: CompanySizeBand;
  role: BuyerRoleId;
}

export type LeadCaptureErrors = Partial<Record<keyof LeadCaptureInput, string>>;

export function validateSqueezeEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return "Enter your work email to unlock the 14-page digest.";
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Enter a valid email address (e.g. alex@company.com).";
  }
  return null;
}

export function validateLeadCaptureForm(input: LeadCaptureInput): LeadCaptureErrors {
  const errors: LeadCaptureErrors = {};
  const name = input.fullName.trim();
  const email = input.workEmail.trim();
  const company = input.companyName.trim();

  if (name.length < 2) {
    errors.fullName = "Add your full name.";
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.workEmail = "Enter a valid work email address.";
  }
  if (company.length < 2) {
    errors.companyName = "Add your company or team name.";
  }
  return errors;
}

function deterministicDigits(seed: string): string {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const num = Math.abs(hash) % 10000;
  return String(num).padStart(4, "0");
}

export function mintSqueezePassCode(email: string, cohortId: string): string {
  const normalized = `${email.trim().toLowerCase()}::${cohortId.trim().toLowerCase()}`;
  return `SQ-26-${deterministicDigits(normalized)}`;
}

export function mintDossierKey(input: LeadCaptureInput): string {
  const normalized = [
    input.fullName.trim().toLowerCase(),
    input.workEmail.trim().toLowerCase(),
    input.companyName.trim().toLowerCase(),
    input.companySize,
    input.role,
  ].join("::");
  return `VL-2026-${deterministicDigits(normalized)}`;
}
