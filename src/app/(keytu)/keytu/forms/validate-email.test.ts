import { describe, expect, test } from "vitest";
import { validateEmail } from "./validate-email";

describe("validateEmail", () => {
  test("accepts a normal address", () => {
    expect(validateEmail("a@b.co")).toBeNull();
    expect(validateEmail("  climber@keytu.equipment  ")).toBeNull();
  });

  test("rejects malformed or empty input", () => {
    expect(validateEmail("nope")).toBe("Enter a valid email");
    expect(validateEmail("")).toBe("Enter a valid email");
    expect(validateEmail("a@b")).toBe("Enter a valid email");
  });
});
