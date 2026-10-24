import { describe, expect, it } from "vitest";
import { validateInquiry, type InquiryInput } from "./validation";

const valid: InquiryInput = {
  name: "Mara Chen",
  email: "mara@example.com",
  peak: "everest",
  days: "21",
  support: "guided",
  note: "I want to understand the route and the preparation before choosing a season.",
};

describe("HIYAS inquiry validation", () => {
  it("rejects missing name, invalid email, and missing route", () => {
    const result = validateInquiry({ ...valid, name: "", email: "mara@", peak: "" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors).toMatchObject({ name: "Add your name.", email: "Enter a valid email.", peak: "Choose a peak." });
  });

  it("rejects planning days outside the allowed band", () => {
    expect(validateInquiry({ ...valid, days: "4" })).toMatchObject({ ok: false });
    expect(validateInquiry({ ...valid, days: "80" })).toMatchObject({ ok: false });
  });

  it("caps the inquiry note", () => {
    const result = validateInquiry({ ...valid, note: "x".repeat(601) });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.note).toBe("Keep the note under 600 characters.");
  });

  it("returns trimmed data for a valid request", () => {
    const result = validateInquiry({ ...valid, name: "  Mara Chen  ", note: "  Ready to plan.  " });
    expect(result).toEqual({ ok: true, data: { ...valid, name: "Mara Chen", note: "Ready to plan." } });
  });
});

