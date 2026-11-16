import { describe, expect, it } from "vitest";
import { EMPTY_FIELDS, digits, firstInvalid, isValid, ticketNumber, validateEstimate, type EstimateFields } from "./validation";

const good: EstimateFields = {
  firstName: "Ana",
  lastName: "Lindqvist",
  email: "ana@example.com",
  phone: "(218) 555-0199",
  company: "",
  comments: "30 by 40 basement, walkout on the south side.",
};

describe("tolvar estimate validation", () => {
  it("passes a complete request; company and comments are optional", () => {
    expect(validateEstimate(good)).toEqual({});
    expect(isValid(validateEstimate(good))).toBe(true);
  });

  it("asks for all four required fields on an empty form", () => {
    const errors = validateEstimate(EMPTY_FIELDS);
    expect(Object.keys(errors).sort()).toEqual(["email", "firstName", "lastName", "phone"]);
    expect(isValid(errors)).toBe(false);
  });

  it("treats whitespace as empty", () => {
    expect(validateEstimate({ ...good, firstName: "   " }).firstName).toBeDefined();
  });

  it("rejects malformed emails", () => {
    for (const email of ["ana", "ana@", "ana@example", "@example.com", "ana example@x.com"]) {
      expect(validateEstimate({ ...good, email }).email, email).toBeDefined();
    }
  });

  it("accepts ten digits in any punctuation, or eleven with a country code", () => {
    for (const phone of ["2185550199", "218.555.0199", "218 555 0199", "+1 (218) 555-0199"]) {
      expect(validateEstimate({ ...good, phone }).phone, phone).toBeUndefined();
    }
  });

  it("rejects numbers that are too short or too long", () => {
    expect(validateEstimate({ ...good, phone: "555-0199" }).phone).toMatch(/short/);
    expect(validateEstimate({ ...good, phone: "+44 20 7946 09588" }).phone).toMatch(/too many/);
  });

  it("caps the comments", () => {
    expect(validateEstimate({ ...good, comments: "x".repeat(1201) }).comments).toBeDefined();
    expect(validateEstimate({ ...good, comments: "x".repeat(1200) }).comments).toBeUndefined();
  });

  it("points at the first invalid field in form order", () => {
    expect(firstInvalid(validateEstimate(EMPTY_FIELDS))).toBe("firstName");
    expect(firstInvalid(validateEstimate({ ...good, email: "", phone: "" }))).toBe("email");
    expect(firstInvalid({})).toBeNull();
  });

  it("strips to digits and builds a stable ticket number", () => {
    expect(digits("(218) 555-0199")).toBe("2185550199");
    expect(ticketNumber("(218) 555-0199")).toBe("T-0199");
    expect(ticketNumber("12")).toBe("T-0012");
  });
});
