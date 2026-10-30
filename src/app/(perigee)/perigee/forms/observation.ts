export const TARGET_BANDS = [
  "Optical Geodesic",
  "X-Ray Accretion",
  "Gravitational Wave",
] as const;

export type TargetBandOption = (typeof TARGET_BANDS)[number];

export interface ObservationFormInput {
  observerName: string;
  institutionEmail: string;
  targetBand: TargetBandOption;
  inclinationAngle: string;
  note?: string;
}

export type ObservationFormField = keyof ObservationFormInput;

export interface ValidatedObservationRecord {
  observerName: string;
  institutionEmail: string;
  targetBand: TargetBandOption;
  inclinationAngle: number;
  note: string;
  timestampIso: string;
}

export type ObservationFormResult =
  | { ok: true; value: ValidatedObservationRecord }
  | { ok: false; errors: Partial<Record<ObservationFormField, string>> };

export function validateObservationForm(input: ObservationFormInput): ObservationFormResult {
  const errors: Partial<Record<ObservationFormField, string>> = {};

  const name = input.observerName.trim();
  if (!name) {
    errors.observerName = "Observer Name is required to allocate an ephemeris slot.";
  }

  const email = input.institutionEmail.trim();
  if (!email || !email.includes("@")) {
    errors.institutionEmail = "Valid Institution / Email address is required.";
  }

  const angleNum = Number.parseFloat(input.inclinationAngle);
  if (Number.isNaN(angleNum) || angleNum < 0 || angleNum > 90) {
    errors.inclinationAngle = "Inclination Angle must be between 0.0° and 90.0°.";
  }

  if (!TARGET_BANDS.includes(input.targetBand)) {
    errors.targetBand = "Valid target observation band must be selected.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      observerName: name,
      institutionEmail: email,
      targetBand: input.targetBand,
      inclinationAngle: angleNum,
      note: (input.note ?? "").trim(),
      timestampIso: new Date().toISOString().slice(11, 19) + " UTC",
    },
  };
}
