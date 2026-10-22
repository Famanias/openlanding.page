export type CharterFormValues = {
  name: string;
  email: string;
  organization: string;
  trenchZone: string;
  payloadMassKg: number;
  missionWindow: string;
  requirements: string;
};

export type CharterFormErrors = Partial<Record<keyof CharterFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCharterForm(values: CharterFormValues): CharterFormErrors {
  const errors: CharterFormErrors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Enter principal investigator name";
  }

  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid institutional email address";
  }

  if (!values.organization || values.organization.trim().length < 2) {
    errors.organization = "Enter institution or research agency";
  }

  if (!values.trenchZone || values.trenchZone.trim() === "") {
    errors.trenchZone = "Select hadal target zone";
  }

  if (
    typeof values.payloadMassKg !== "number" ||
    isNaN(values.payloadMassKg) ||
    values.payloadMassKg < 1 ||
    values.payloadMassKg > 500
  ) {
    errors.payloadMassKg = "Payload mass must be between 1 and 500 kg";
  }

  if (!values.requirements || values.requirements.trim().length < 10) {
    errors.requirements = "Describe mission parameters (min 10 characters)";
  }

  return errors;
}
