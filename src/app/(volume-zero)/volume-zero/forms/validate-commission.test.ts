import { describe, expect, it } from "vitest";
import { validateCommission } from "./validate-commission";

describe("commission form validation", () => {
  it("requires a name and a valid email", () => {
    expect(validateCommission({ name: "", email: "", room: "" })).toEqual({
      name: "Name is required.",
      email: "Email is required.",
    });
    expect(validateCommission({ name: "Mara", email: "mara@", room: "" }).email).toBe("Enter a valid email.");
  });

  it("accepts a trimmed name and a valid email", () => {
    expect(validateCommission({ name: "  Mara  ", email: "mara@example.com", room: "Theatre" })).toEqual({});
  });
});
