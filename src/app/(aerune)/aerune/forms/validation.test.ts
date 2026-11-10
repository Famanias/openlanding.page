import { describe, expect, it } from "vitest";
import { validateInquiry } from "./validation";

describe("local inquiry validation", () => {
  it("asks for a name and a usable email", () => {
    expect(validateInquiry({ name: " ", email: "not-an-email" })).toEqual({
      name: "Enter your name.",
      email: "Enter a valid email address.",
    });
  });

  it("accepts trimmed values and rejects excessively long input", () => {
    expect(validateInquiry({ name: "  Mika Ito  ", email: "  mika@example.com  " })).toEqual({});
    expect(validateInquiry({ name: "x".repeat(101), email: `${"a".repeat(250)}@example.com` })).toEqual({
      name: "Keep your name under 100 characters.",
      email: "Enter a valid email address.",
    });
  });
});
