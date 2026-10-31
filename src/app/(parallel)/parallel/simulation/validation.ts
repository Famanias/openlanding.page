export type IndustryCategory =
  | 'Mobility'
  | 'Energy'
  | 'Logistics'
  | 'Infrastructure'
  | 'Other';

export interface DemoRequestInput {
  fullName: string;
  workEmail: string;
  company: string;
  industry: IndustryCategory | '';
  modelingGoal?: string;
}

export interface DemoRequestValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof DemoRequestInput, string>>;
}

export type ValidationResult = DemoRequestValidationResult;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateDemoRequest(
  input: DemoRequestInput
): DemoRequestValidationResult {
  const errors: Partial<Record<keyof DemoRequestInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length === 0) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!input.workEmail || !EMAIL_REGEX.test(input.workEmail.trim())) {
    errors.workEmail = 'Please provide a valid work email address.';
  }

  if (!input.company || input.company.trim().length === 0) {
    errors.company = 'Please specify your organization or agency.';
  }

  if (!input.industry) {
    errors.industry = 'Please select your primary operational domain.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
