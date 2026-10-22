import { describe, expect, it } from "vitest";
import { briefReference, isValid, NOTE_MAX, validateBrief, type BriefInput } from "./brief";

const GOOD: BriefInput = { brand: "Fernhill Plants", email: "hello@fernhill.example", category: "Houseplants", pack: "half", note: "" };

describe("validateBrief", () => {
  it("accepts a complete brief", () => {
    expect(isValid(validateBrief(GOOD))).toBe(true);
  });

  it("asks for every missing field", () => {
    const errors = validateBrief({ brand: "", email: "", category: "", pack: "", note: "" });
    expect(Object.keys(errors).sort()).toEqual(["brand", "category", "email", "pack"]);
  });

  it("rejects malformed emails", () => {
    for (const email of ["nope", "a@b", "a b@c.de", "@x.com"]) {
      expect(validateBrief({ ...GOOD, email }).email).toBeTruthy();
    }
    expect(validateBrief({ ...GOOD, email: " ok@x.io " }).email).toBeUndefined();
  });

  it("only takes categories and packs we actually offer", () => {
    expect(validateBrief({ ...GOOD, category: "Crypto" }).category).toBeTruthy();
    expect(validateBrief({ ...GOOD, pack: "mega" }).pack).toBeTruthy();
  });

  it("caps the note", () => {
    expect(validateBrief({ ...GOOD, note: "x".repeat(NOTE_MAX) }).note).toBeUndefined();
    expect(validateBrief({ ...GOOD, note: "x".repeat(NOTE_MAX + 1) }).note).toBeTruthy();
  });
});

describe("briefReference", () => {
  it("is stable for the same brief and ignores case and padding", () => {
    expect(briefReference(GOOD)).toBe(briefReference({ ...GOOD, brand: "  FERNHILL plants ", email: "HELLO@fernhill.example" }));
  });

  it("differs when the pack changes and looks like SA-H1234", () => {
    expect(briefReference(GOOD)).toMatch(/^SA-H[0-9A-Z]{4}$/);
    expect(briefReference({ ...GOOD, pack: "whole" })).toMatch(/^SA-W/);
  });
});
