import { it, expect } from "vitest";
import { validateEmail } from "./validation";
it("accepts useful email addresses and explains invalid input", () => {
  expect(validateEmail("")).toBe("Enter your email address.");
  expect(validateEmail("wrong")).toBe("Enter an email address like you@example.com.");
  expect(validateEmail("person@example.com")).toBeNull();
  expect(validateEmail("a".repeat(255) + "@example.com")).not.toBeNull();
});
