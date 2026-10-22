import { describe, expect, it } from "vitest";
import { ticketCode, validateAppointment } from "./appointment";

describe("validateAppointment", () => {
  it("requires the short booking brief", () => {
    expect(validateAppointment({ name: "", email: "bad", service: "" })).toEqual({
      name: "Add your name.",
      email: "Enter a work email.",
      service: "Choose the work you need help with.",
    });
  });

  it("accepts a complete appointment request", () => {
    expect(validateAppointment({ name: "Maya", email: "maya@example.com", service: "testing" })).toEqual({});
  });

  it("creates a stable field ticket code", () => {
    expect(ticketCode("testing")).toBe("TC-TEST");
  });
});
