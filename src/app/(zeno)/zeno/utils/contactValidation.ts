export interface ContactFormInput {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export const PROJECT_TYPES = [
  'Brand Strategy & Positioning',
  'Visual Identity & Typography',
  'Campaign & Art Direction',
  'Digital Experience & Flagship Web',
  'Full-Scope Brand World',
] as const;

export function validateContactForm(input: ContactFormInput): {
  isValid: boolean;
  errors: ContactValidationErrors;
} {
  const errors: ContactValidationErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedType = input.projectType.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name or studio affiliation.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please provide a contact email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  if (!trimmedType) {
    errors.projectType = 'Please select a primary discipline or scope.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please share a brief overview of your project or timeline.';
  } else if (trimmedMessage.length < 12) {
    errors.message = 'Please include a bit more detail (at least 12 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatProjectBrief(input: ContactFormInput): string {
  return [
    'ZENO. — PROJECT INQUIRY BRIEF (2026)',
    '----------------------------------------',
    `From: ${input.name.trim()} <${input.email.trim()}>`,
    `Scope / Discipline: ${input.projectType.trim()}`,
    '',
    'Project Direction & Context:',
    input.message.trim(),
    '----------------------------------------',
    'Prepared via ZENO. Interactive Studio Template',
  ].join('\n');
}

export function buildMailtoHref(recipientEmail: string, input: ContactFormInput): string {
  const subject = encodeURIComponent(`ZENO. Project Inquiry — ${input.projectType.trim()} (${input.name.trim()})`);
  const body = encodeURIComponent(formatProjectBrief(input));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
