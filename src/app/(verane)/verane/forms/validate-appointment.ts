const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface AppointmentFields {
  name: string;
  email: string;
  edition: string;
  season: string;
  guests: string;
  notes?: string;
}

export type AppointmentErrors = {
  name?: string;
  email?: string;
  edition?: string;
  season?: string;
};

/** Validate the private salon appointment form. Pure validation function. */
export function validateAppointment(fields: AppointmentFields): AppointmentErrors {
  const errors: AppointmentErrors = {};

  if (!fields.name || fields.name.trim().length === 0) {
    errors.name = "Please provide your name";
  }

  if (!fields.email || !EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = "Please provide a valid email";
  }

  if (!fields.edition || fields.edition.trim().length === 0) {
    errors.edition = "Please select an edition or consultation";
  }

  if (!fields.season || fields.season.trim().length === 0) {
    errors.season = "Please select a preferred season";
  }

  return errors;
}
