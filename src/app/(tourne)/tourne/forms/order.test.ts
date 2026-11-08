import { describe, expect, it } from "vitest";
import { orderReference, quoteOrder, validateOrder } from "./order";

const valid = { name: "Mina Ito", email: "mina@example.com", postcode: "98101", note: "" };

describe("validateOrder", () => {
  it("accepts a complete order", () => {
    expect(validateOrder(valid)).toEqual({});
  });

  it("reports each invalid field", () => {
    const errors = validateOrder({ name: " ", email: "nope", postcode: "1", note: "x".repeat(281) });
    expect(Object.keys(errors).sort()).toEqual(["email", "name", "note", "postcode"]);
  });
});

describe("quoteOrder", () => {
  it("adds shipping and takes longer for big pieces", () => {
    const small = quoteOrder(100, 15, 400);
    const large = quoteOrder(100, 35, 7000);
    expect(small.weeks).toBe(5);
    expect(large.weeks).toBe(6);
    expect(large.shippingUsd).toBeGreaterThan(small.shippingUsd);
    expect(small.totalUsd).toBe(100 + small.shippingUsd);
  });
});

describe("orderReference", () => {
  it("is deterministic, prefixed and six characters long", () => {
    const a = orderReference(["moon-jar", 20, "ash"]);
    expect(a).toBe(orderReference(["moon-jar", 20, "ash"]));
    expect(a).toMatch(/^TN-[0-9A-Z]{6}$/);
    expect(a).not.toBe(orderReference(["moon-jar", 21, "ash"]));
  });
});
