import { describe, expect, it } from "vitest";
import { validateBooking, type BookingValues } from "./booking";

const valid: BookingValues = {
  name: "Mina Park",
  email: "mina@example.com",
  shop: "Kindred Goods",
  focus: "conversion",
};

describe("AFTERCART booking validation", () => {
  it("reports the required fields", () => {
    expect(validateBooking({ name: "", email: "", shop: "", focus: "" })).toEqual({
      name: "Add your name.",
      email: "Enter a work email.",
      shop: "Add your shop name.",
      focus: "Choose the area that needs care.",
    });
  });

  it("rejects malformed email and unsupported focus values", () => {
    expect(validateBooking({ ...valid, email: "mina@", focus: "random" })).toEqual({
      email: "Enter a work email.",
      focus: "Choose the area that needs care.",
    });
  });

  it("accepts a complete booking brief", () => {
    expect(validateBooking(valid)).toEqual({});
  });
});
