import { describe, expect, it } from "vitest";
import { EMPTY_REQUEST, sheetNumber, validateRequest, type SheetRequest } from "./validation";

const valid: SheetRequest = { name: "Ada Okafor", email: "ada@studio-okafor.co.uk", street: "14 Chatham Place", city: "London", country: "United Kingdom", role: "stockist" };

describe("CHINAGRAPH printed-sheet request", () => {
  it("accepts a complete request", () => {
    expect(validateRequest(valid)).toEqual({});
  });

  it("flags every missing field", () => {
    expect(Object.keys(validateRequest(EMPTY_REQUEST)).sort()).toEqual(["city", "country", "email", "name", "role", "street"]);
  });

  it("explains a bad email", () => {
    expect(validateRequest({ ...valid, email: "ada@" }).email).toBe("That email won't reach us.");
  });

  it("numbers the printed sheet from the request, stable and four digits", () => {
    const n = sheetNumber(valid);
    expect(n).toMatch(/^\d{4}$/);
    expect(sheetNumber(valid)).toBe(n);
    expect(sheetNumber({ ...valid, email: "someone@else.com" })).not.toBe(n);
  });
});
