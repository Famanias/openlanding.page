import { describe, expect, it } from "vitest";
import { isValidBrief, MESSAGE_MAX, validateBrief, type BriefInput } from "./validate-brief";

const VALID: BriefInput = {
  name: "Mara Ito",
  email: "mara@northline.example",
  field: "A responsive light field for a museum entrance.",
  message: "The experience should feel slow, spatial, and legible from the street.",
};

describe("validateBrief", () => {
  it("accepts a complete brief", () => {
    expect(validateBrief(VALID)).toEqual({});
    expect(isValidBrief(VALID)).toBe(true);
  });

  it("requires a meaningful name, email, and field description", () => {
    const errors = validateBrief({ name: " ", email: "", field: " ", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "field", "name"]);
  });

  it("rejects malformed email addresses but accepts surrounding whitespace", () => {
    for (const email of ["nope", "a@b", "a b@example.com", "@example.com"]) {
      expect(validateBrief({ ...VALID, email }).email).toBe("Add a valid email.");
    }
    expect(validateBrief({ ...VALID, email: "  hello@example.co  " }).email).toBeUndefined();
  });

  it("caps the optional message at the documented limit", () => {
    expect(validateBrief({ ...VALID, message: "x".repeat(MESSAGE_MAX) }).message).toBeUndefined();
    expect(validateBrief({ ...VALID, message: "x".repeat(MESSAGE_MAX + 1) }).message).toBe(
      `Keep the note to ${MESSAGE_MAX} characters.`,
    );
  });

  it("reports every problem together", () => {
    const errors = validateBrief({ name: "x", email: "bad", field: "", message: "" });
    expect(errors).toEqual({
      email: "Add a valid email.",
      field: "Tell us what you want to shape.",
      name: "Add your name.",
    });
    expect(isValidBrief({ ...VALID, name: "" })).toBe(false);
  });
});
