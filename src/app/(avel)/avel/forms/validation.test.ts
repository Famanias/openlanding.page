import { describe, expect, it } from "vitest";
import { isValidEmail } from "./validation";

describe("demo signup", () => {
  it("accepts a plausible email and rejects invalid input", () => {
    expect(isValidEmail("hello@example.com")).toBe(true);
    expect(isValidEmail("hello example.com")).toBe(false);
    expect(isValidEmail("x@company")).toBe(false);
    expect(isValidEmail("".padEnd(300, "a") + "@example.com")).toBe(false);
  });
});
