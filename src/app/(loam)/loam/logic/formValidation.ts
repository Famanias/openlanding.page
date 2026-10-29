/**
 * Pure client-side validation logic for the Chapter 6 "Request a sample kit" form.
 * Zero UI/DOM dependencies so validation rules can be unit-tested.
 */

export type SampleKitUseCase = 'packaging' | 'panels' | 'other';

export interface SampleKitFormValues {
  name: string;
  workEmail: string;
  company: string;
  useCase: SampleKitUseCase;
  note: string;
}

export interface SampleKitFormErrors {
  name?: string;
  workEmail?: string;
  company?: string;
  useCase?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateSampleKitForm(values: SampleKitFormValues): {
  isValid: boolean;
  errors: SampleKitFormErrors;
} {
  const errors: SampleKitFormErrors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  const trimmedEmail = values.workEmail ? values.workEmail.trim() : '';
  if (!trimmedEmail) {
    errors.workEmail = 'Please enter your work email.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.workEmail = 'Please enter a valid work email address.';
  }

  if (!values.company || values.company.trim().length < 2) {
    errors.company = 'Please enter your company or studio name.';
  }

  if (!['packaging', 'panels', 'other'].includes(values.useCase)) {
    errors.useCase = 'Please select an intended application.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
