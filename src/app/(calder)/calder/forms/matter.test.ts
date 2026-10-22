import { describe, expect, it } from "vitest";
import { docketNumber, isValid, MATTER_OPTIONS, validateMatter, type MatterInput } from "./matter";

const good: MatterInput = {
  name: "Ines Alvarez",
  email: "ines@example.com",
  matter: MATTER_OPTIONS[1],
  message: "My co-founder wants to leave and we have no agreement.",
};

describe("validateMatter", () => {
  it("accepts a complete filing", () => {
    expect(isValid(validateMatter(good))).toBe(true);
  });

  it("flags every empty field", () => {
    const errors = validateMatter({ name: "", email: "", matter: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "matter", "message", "name"]);
  });

  it("rejects a malformed email and an unknown matter", () => {
    expect(validateMatter({ ...good, email: "ines@" }).email).toBeDefined();
    expect(validateMatter({ ...good, email: "a b@c.co" }).email).toBeDefined();
    expect(validateMatter({ ...good, matter: "Parking tickets" }).matter).toBeDefined();
  });

  it("accepts 'not sure yet' as a matter", () => {
    expect(validateMatter({ ...good, matter: MATTER_OPTIONS[MATTER_OPTIONS.length - 1] }).matter).toBeUndefined();
  });

  it("limits the message length", () => {
    expect(validateMatter({ ...good, message: "x".repeat(601) }).message).toMatch(/600/);
    expect(validateMatter({ ...good, message: "short" }).message).toBeDefined();
  });
});

describe("docketNumber", () => {
  it("has the CR-26-0000 shape", () => {
    expect(docketNumber(good)).toMatch(/^CR-26-\d{4}$/);
  });

  it("is stable for the same filing and ignores case and padding", () => {
    expect(docketNumber(good)).toBe(docketNumber({ ...good, name: "  INES Alvarez ", email: "Ines@Example.com" }));
  });

  it("differs when the filing differs", () => {
    expect(docketNumber(good)).not.toBe(docketNumber({ ...good, email: "someone@else.example" }));
  });
});
