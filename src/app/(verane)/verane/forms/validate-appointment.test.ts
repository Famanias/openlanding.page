import { describe, expect, test } from "vitest";
import {
  validateAppointment,
  type AppointmentFields,
} from "./validate-appointment";

describe("validateAppointment", () => {
  const validFields: AppointmentFields = {
    name: "Hélène de Saint-Germain",
    email: "helene@example.fr",
    edition: "iris-calcaire",
    season: "printemps",
    guests: "2",
  };

  test("accepts fully valid appointment submission", () => {
    expect(validateAppointment(validFields)).toEqual({});
  });

  test("rejects missing or whitespace name", () => {
    expect(validateAppointment({ ...validFields, name: "" }).name).toBe(
      "Please provide your name",
    );
    expect(validateAppointment({ ...validFields, name: "   " }).name).toBe(
      "Please provide your name",
    );
  });

  test("rejects missing or invalid email format", () => {
    expect(validateAppointment({ ...validFields, email: "" }).email).toBe(
      "Please provide a valid email",
    );
    expect(validateAppointment({ ...validFields, email: "helene@" }).email).toBe(
      "Please provide a valid email",
    );
    expect(
      validateAppointment({ ...validFields, email: "no spaces@domain.com" }).email,
    ).toBe("Please provide a valid email");
  });

  test("rejects unselected fragrance or invalid season", () => {
    expect(validateAppointment({ ...validFields, edition: "" }).edition).toBe(
      "Please select an edition or consultation",
    );
    expect(validateAppointment({ ...validFields, season: "" }).season).toBe(
      "Please select a preferred season",
    );
  });

  test("returns all errors at once when empty", () => {
    const empty: AppointmentFields = {
      name: "",
      email: "",
      edition: "",
      season: "",
      guests: "1",
    };
    const errors = validateAppointment(empty);
    expect(Object.keys(errors).sort()).toEqual(["edition", "email", "name", "season"]);
  });
});
