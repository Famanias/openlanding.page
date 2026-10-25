import { describe, expect, it } from "vitest";
import { FITTING_REASONS, frameReference, isValid, validateFitting, type FittingInput } from "./fitting";

const GOOD: FittingInput = {
  name: "Mina Park",
  email: "mina@example.com",
  reason: "Screen work",
  frame: "Arc 01",
  note: "I move between studio and train every day.",
};

describe("validateFitting", () => {
  it("accepts a complete fitting request", () => {
    expect(isValid(validateFitting(GOOD))).toBe(true);
  });

  it("requires the contact and calibration choices", () => {
    const errors = validateFitting({ name: "", email: "", reason: "", frame: "", note: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "frame", "name", "reason"]);
  });

  it("rejects malformed emails and unknown reasons", () => {
    expect(validateFitting({ ...GOOD, email: "nope" }).email).toBeTruthy();
    expect(validateFitting({ ...GOOD, reason: "Everything" }).reason).toBeTruthy();
    expect(FITTING_REASONS).toContain("Screen work");
  });

  it("caps the optional note", () => {
    expect(validateFitting({ ...GOOD, note: "x".repeat(240) }).note).toBeUndefined();
    expect(validateFitting({ ...GOOD, note: "x".repeat(241) }).note).toBeTruthy();
  });
});

describe("frameReference", () => {
  it("is stable for equivalent casing and spacing", () => {
    expect(frameReference(GOOD)).toBe(frameReference({ ...GOOD, name: "  MINA park " }));
    expect(frameReference(GOOD)).toMatch(/^NU-[A-Z0-9]{4}$/);
  });
});
