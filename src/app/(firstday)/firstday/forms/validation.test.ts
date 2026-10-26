import { describe, it, expect } from "vitest";
import { validateSignup } from "./validation";
describe("first-day signup", () => {
  it("requires a name and a usable email, and accepts ordinary addresses", () => {
    expect(validateSignup(" ", "bad")).toEqual({
      name: "Tell us your first name.",
      email: "Enter a valid email address.",
    });
    expect(validateSignup("Ada", "ada@example.com")).toEqual({});
    expect(
      validateSignup("Ada", "a".repeat(255) + "@example.com").email,
    ).toBeDefined();
  });
});
