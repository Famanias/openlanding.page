import { describe, expect, it } from "vitest";
import { validateJoin } from "./validation";

describe("joining the flower club", () => {
  it("keeps an invalid email out of the success state", () => {
    expect(validateJoin({ name: "Lena", email: "lena@", feeling: "daydream", size: "little" })).toHaveProperty("email");
  });
  it("accepts an ordinary name and valid bouquet selection", () => {
    expect(validateJoin({ name: "Léna", email: "lena@example.com", feeling: "sunbeam", size: "lovely" })).toEqual({});
  });
  it("rejects blank names, oversized values, and unlisted choices", () => {
    const errors = validateJoin({ name: " ", email: "x".repeat(255), feeling: "rose", size: "giant" });
    expect(Object.keys(errors).sort()).toEqual(["email", "feeling", "name", "size"]);
  });
});
