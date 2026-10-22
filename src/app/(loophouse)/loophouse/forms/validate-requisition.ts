export interface RequisitionFormData {
  memberName: string;
  memberEmail: string;
  tradeDiscipline: string;
  loanDuration: number;
  workshopInductionCertified: boolean;
  notes?: string;
}

export type RequisitionErrors = Partial<Record<keyof RequisitionFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequisition(data: RequisitionFormData): {
  isValid: boolean;
  errors: RequisitionErrors;
} {
  const errors: RequisitionErrors = {};

  if (!data.memberName || data.memberName.trim().length < 2) {
    errors.memberName = "Enter your full name or workshop badge ID";
  }

  if (!data.memberEmail || !EMAIL_REGEX.test(data.memberEmail.trim())) {
    errors.memberEmail = "Enter a valid email for requisition verification";
  }

  if (!data.tradeDiscipline || data.tradeDiscipline.trim() === "") {
    errors.tradeDiscipline = "Select a primary trade discipline";
  }

  if (!data.loanDuration || data.loanDuration < 1 || data.loanDuration > 14) {
    errors.loanDuration = "Requisition duration must be between 1 and 14 days";
  }

  if (!data.workshopInductionCertified) {
    errors.workshopInductionCertified = "Safety induction confirmation is required";
  }

  if (data.notes && data.notes.length > 400) {
    errors.notes = "Project notes must not exceed 400 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
