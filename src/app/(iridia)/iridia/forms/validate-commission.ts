export interface CommissionFormData {
  fullName: string;
  email: string;
  installationScale: "monumental" | "pavilion" | "gallery" | "digital" | "";
  wavelengthBand: "solar" | "auroral" | "laser" | "broadband" | "";
  targetDate: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof CommissionFormData, string>>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCommissionForm(data: CommissionFormData): ValidationResult {
  const errors: Partial<Record<keyof CommissionFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your name (minimum 2 characters).";
  }

  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid architectural or studio email address.";
  }

  if (!data.installationScale) {
    errors.installationScale = "Please select an installation scale tier.";
  }

  if (!data.wavelengthBand) {
    errors.wavelengthBand = "Please select a target optical wavelength band.";
  }

  if (!data.targetDate) {
    errors.targetDate = "Please select a proposed commission date.";
  } else {
    const selected = new Date(data.targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selected.getTime()) || selected < today) {
      errors.targetDate = "Commission date must be in the future.";
    }
  }

  if (data.notes && data.notes.length > 500) {
    errors.notes = "Notes must not exceed 500 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
