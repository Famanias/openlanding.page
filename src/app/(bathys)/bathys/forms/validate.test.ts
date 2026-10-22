import { describe, it, expect } from "vitest";
import { validateCharterForm, type CharterFormValues } from "./validate";

describe("forms/validate", () => {
  const validForm: CharterFormValues = {
    name: "Dr. Elena Rostova",
    email: "elena.rostova@ifremer.fr",
    organization: "IFREMER Hadal Research Group",
    trenchZone: "mariana",
    payloadMassKg: 120,
    missionWindow: "2026-Q4",
    requirements: "Sediment coring at 10,900m with Raman spectroscopy validation.",
  };

  it("passes validation with valid values", () => {
    const errors = validateCharterForm(validForm);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("requires a valid name (at least 2 characters)", () => {
    const errors = validateCharterForm({ ...validForm, name: " " });
    expect(errors.name).toBe("Enter principal investigator name");
  });

  it("validates email format", () => {
    const errors = validateCharterForm({ ...validForm, email: "invalid-email" });
    expect(errors.email).toBe("Enter a valid institutional email address");
  });

  it("requires organization name", () => {
    const errors = validateCharterForm({ ...validForm, organization: "" });
    expect(errors.organization).toBe("Enter institution or research agency");
  });

  it("validates payload mass (1 to 500 kg)", () => {
    const errorsZero = validateCharterForm({ ...validForm, payloadMassKg: 0 });
    expect(errorsZero.payloadMassKg).toBe("Payload mass must be between 1 and 500 kg");

    const errorsOver = validateCharterForm({ ...validForm, payloadMassKg: 600 });
    expect(errorsOver.payloadMassKg).toBe("Payload mass must be between 1 and 500 kg");
  });

  it("requires a selected trench zone", () => {
    const errors = validateCharterForm({ ...validForm, trenchZone: "" });
    expect(errors.trenchZone).toBe("Select hadal target zone");
  });

  it("requires scientific requirements description (min 10 characters)", () => {
    const errors = validateCharterForm({ ...validForm, requirements: "Short" });
    expect(errors.requirements).toBe("Describe mission parameters (min 10 characters)");
  });
});
