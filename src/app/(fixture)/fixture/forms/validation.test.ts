import { describe, expect, it } from "vitest";
import { EMPTY_BRIEF, bookingReference, normaliseStore, validateBrief, type Brief } from "./validation";

const valid: Brief = {
  name: "Ines Vos",
  email: "ines@fennelandclay.com",
  store: "https://fennelandclay.com/",
  needs: ["fixtures", "signage"],
  budget: "6-12k",
  note: "",
};

describe("FIXTURE walk-through brief", () => {
  it("accepts a complete brief", () => {
    expect(validateBrief(valid)).toEqual({});
  });

  it("flags every missing field on an empty brief", () => {
    expect(Object.keys(validateBrief(EMPTY_BRIEF)).sort()).toEqual(["budget", "email", "name", "needs", "store"]);
  });

  it("rejects malformed emails and store addresses", () => {
    expect(validateBrief({ ...valid, email: "ines@" }).email).toBe("Enter a valid email.");
    expect(validateBrief({ ...valid, store: "my shop" }).store).toBe("Enter your store address, like yourshop.com.");
  });

  it("limits the note length", () => {
    expect(validateBrief({ ...valid, note: "x".repeat(601) }).note).toBe("Keep it under 600 characters.");
  });

  it("normalises store addresses", () => {
    expect(normaliseStore("https://Fennelandclay.com/")).toBe("fennelandclay.com");
    expect(normaliseStore("www.spokesmith.nl/collections/all")).toBe("spokesmith.nl");
    expect(normaliseStore("ritual-roast.myshopify.com")).toBe("ritual-roast.myshopify.com");
    expect(normaliseStore("nope")).toBeNull();
    expect(normaliseStore("")).toBeNull();
  });

  it("builds a stable booking reference", () => {
    const first = bookingReference(valid);
    expect(first).toMatch(/^FX-\d{4}-[A-Z0-9]{2}$/);
    expect(bookingReference(valid)).toBe(first);
    expect(bookingReference({ ...valid, email: "other@shop.com" })).not.toBe(first);
  });
});
