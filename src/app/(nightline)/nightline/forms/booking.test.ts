import { describe, expect, it } from "vitest";
import { validateBooking } from "./booking";

describe("nightline booking validation", () => {
  it("returns field errors for empty input", () => {
    expect(validateBooking({ name: "", email: "", city: "" })).toEqual({
      name: "Add your name",
      email: "Enter a work email",
      city: "Choose a departure city",
    });
  });

  it("accepts a valid work email and city", () => {
    expect(validateBooking({ name: "Mina", email: "mina@studio.eu", city: "Paris" })).toEqual({});
  });
});
