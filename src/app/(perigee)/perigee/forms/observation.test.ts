import { describe, it, expect } from "vitest";
import {
  TARGET_BANDS,
  validateObservationForm,
  type ObservationFormInput,
} from "./observation";

describe("validateObservationForm", () => {
  const validInput: ObservationFormInput = {
    observerName: "Dr. Kip Thorne",
    institutionEmail: "thorne@caltech.edu",
    targetBand: "Optical Geodesic",
    inclinationAngle: "81.4",
    note: "Primary photon ring study",
  };

  it("accepts valid observation telemetry inputs", () => {
    const result = validateObservationForm(validInput);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.observerName).toBe("Dr. Kip Thorne");
      expect(result.value.institutionEmail).toBe("thorne@caltech.edu");
      expect(result.value.targetBand).toBe("Optical Geodesic");
      expect(result.value.inclinationAngle).toBe(81.4);
      expect(result.value.note).toBe("Primary photon ring study");
    }
  });

  it("rejects an empty observer name", () => {
    const result = validateObservationForm({ ...validInput, observerName: "   " });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.observerName).toBeDefined();
    }
  });

  it("rejects invalid or missing email addresses", () => {
    const resultNoAt = validateObservationForm({ ...validInput, institutionEmail: "thorne.caltech.edu" });
    expect(resultNoAt.ok).toBe(false);
    if (!resultNoAt.ok) {
      expect(resultNoAt.errors.institutionEmail).toBeDefined();
    }

    const resultEmpty = validateObservationForm({ ...validInput, institutionEmail: "" });
    expect(resultEmpty.ok).toBe(false);
    if (!resultEmpty.ok) {
      expect(resultEmpty.errors.institutionEmail).toBeDefined();
    }
  });

  it("validates inclination angle bounds between 0.0 and 90.0 degrees", () => {
    const resultNegative = validateObservationForm({ ...validInput, inclinationAngle: "-5" });
    expect(resultNegative.ok).toBe(false);

    const resultOver90 = validateObservationForm({ ...validInput, inclinationAngle: "95.5" });
    expect(resultOver90.ok).toBe(false);

    const resultNaN = validateObservationForm({ ...validInput, inclinationAngle: "invalid" });
    expect(resultNaN.ok).toBe(false);

    const resultZero = validateObservationForm({ ...validInput, inclinationAngle: "0.0" });
    expect(resultZero.ok).toBe(true);

    const resultNinety = validateObservationForm({ ...validInput, inclinationAngle: "90.0" });
    expect(resultNinety.ok).toBe(true);
  });

  it("rejects invalid target bands", () => {
    const result = validateObservationForm({
      ...validInput,
      targetBand: "Gamma Ray Burst" as any,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.targetBand).toBeDefined();
    }
  });

  it("contains all three valid TARGET_BANDS", () => {
    expect(TARGET_BANDS).toEqual([
      "Optical Geodesic",
      "X-Ray Accretion",
      "Gravitational Wave",
    ]);
  });
});
