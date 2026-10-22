import { describe, expect, it } from "vitest";
import { validateBooking } from "./booking";

describe("validateBooking", () => {
  it("requires the three pieces of an honest invitation", () => {
    expect(validateBooking({ name: "", email: "wrong", goal: "" })).toEqual({
      name: "Add your name so the invitation has a person on it.",
      email: "Use an email address we can reply to.",
      goal: "Choose the work you want the page to do.",
    });
  });

  it("accepts a complete booking request", () => {
    expect(validateBooking({ name: "Maya", email: "maya@example.com", goal: "calendar" })).toEqual({});
  });
});
