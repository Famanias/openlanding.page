import { describe, it, expect } from "vitest";
import {
  validateWholesale,
  isValidWholesale,
  VOLUME_OPTIONS,
  type WholesaleFields,
} from "./validate-wholesale";

const valid: WholesaleFields = {
  name: "Dana Okafor",
  business: "Third Place Café",
  email: "dana@thirdplace.cafe",
  volume: "5-15",
  message: "We serve two filter options and pull espresso all day.",
};

describe("validateWholesale", () => {
  it("accepts a fully valid enquiry", () => {
    expect(validateWholesale(valid)).toEqual({});
    expect(isValidWholesale(valid)).toBe(true);
  });

  it("requires name, business, email and volume", () => {
    const errors = validateWholesale({
      name: "",
      business: "",
      email: "",
      volume: "",
      message: "",
    });
    expect(errors.name).toBeTruthy();
    expect(errors.business).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.volume).toBeTruthy();
    expect(isValidWholesale({ ...valid, name: "" })).toBe(false);
  });

  it("rejects malformed emails", () => {
    expect(validateWholesale({ ...valid, email: "dana@" }).email).toBeTruthy();
    expect(validateWholesale({ ...valid, email: "not-an-email" }).email).toBeTruthy();
    expect(validateWholesale({ ...valid, email: " a@b.co " }).email).toBeUndefined();
  });

  it("rejects unknown volume options", () => {
    expect(validateWholesale({ ...valid, volume: "1kg" }).volume).toBeTruthy();
  });

  it("caps the message at 600 characters", () => {
    expect(validateWholesale({ ...valid, message: "x".repeat(601) }).message).toBeTruthy();
    expect(validateWholesale({ ...valid, message: "x".repeat(600) }).message).toBeUndefined();
  });

  it("trims whitespace before judging name and business", () => {
    expect(validateWholesale({ ...valid, name: "  Al  " }).name).toBeUndefined();
    expect(validateWholesale({ ...valid, business: "   " }).business).toBeTruthy();
  });

  it("offers four volume options", () => {
    expect(VOLUME_OPTIONS).toHaveLength(4);
  });
});
