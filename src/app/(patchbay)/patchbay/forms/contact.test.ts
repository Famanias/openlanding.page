import { describe, expect, it } from "vitest";
import { briefAsText, briefReference, validateContact, type ContactFields } from "./contact";

const valid: ContactFields = { name: "Sam", email: "sam@studio.co", role: "ai", message: "We need an eval harness for our support bot." };

describe("validateContact", () => {
  it("accepts a complete brief", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("flags each bad field", () => {
    const errors = validateContact({ name: " ", email: "nope", role: "", message: "short" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "role"]);
  });

  it("rejects an over-long message", () => {
    expect(validateContact({ ...valid, message: "x".repeat(601) }).message).toMatch(/under 600/);
  });
});

describe("briefReference", () => {
  it("is deterministic and brief-specific", () => {
    expect(briefReference(valid)).toBe(briefReference({ ...valid }));
    expect(briefReference(valid)).not.toBe(briefReference({ ...valid, role: "web" }));
    expect(briefReference(valid)).toMatch(/^PB-[0-9A-Z]{6}$/);
  });
});

describe("briefAsText", () => {
  it("contains the reference and trimmed fields", () => {
    const text = briefAsText({ ...valid, name: "  Sam " }, "PB-ABC123");
    expect(text).toContain("Brief PB-ABC123");
    expect(text).toContain("From: Sam <sam@studio.co>");
  });
});
