import { describe, expect, it } from "vitest";
import { NOTE_LIMIT, firstInvalid, hasErrors, holdReference, validateHold } from "./validation";

const valid = { name: "Mina Ito", email: "mina@example.com", note: "" };

describe("elsewhere hold validation", () => {
  it("accepts a name and a complete address", () => {
    expect(validateHold(valid)).toEqual({});
    expect(hasErrors(validateHold(valid))).toBe(false);
  });

  it("requires a name of at least two characters", () => {
    expect(validateHold({ ...valid, name: "" }).name).toBe("Tell us whose name goes on the lockbox.");
    expect(validateHold({ ...valid, name: "  M " }).name).toBeDefined();
    expect(validateHold({ ...valid, name: "Mo" }).name).toBeUndefined();
  });

  it("tells a missing address from an incomplete one", () => {
    expect(validateHold({ ...valid, email: "  " }).email).toBe("We need an address for the lockbox code.");
    for (const email of ["mina", "mina@", "mina@example", "mina @example.com", "@example.com"]) {
      expect(validateHold({ ...valid, email }).email).toBe("That address doesn't look complete.");
    }
    expect(validateHold({ ...valid, email: " mina@example.com " }).email).toBeUndefined();
  });

  it("keeps the optional note short", () => {
    expect(validateHold({ ...valid, note: "x".repeat(NOTE_LIMIT) }).note).toBeUndefined();
    expect(validateHold({ ...valid, note: "x".repeat(NOTE_LIMIT + 1) }).note).toContain("280");
  });

  it("names the first invalid field in visual order", () => {
    expect(firstInvalid(validateHold({ name: "", email: "", note: "" }))).toBe("name");
    expect(firstInvalid(validateHold({ ...valid, email: "nope" }))).toBe("email");
    expect(firstInvalid({})).toBeNull();
  });
});

describe("elsewhere hold reference", () => {
  it("prints a six-character tag", () => {
    expect(holdReference("mina@example.com|5|3")).toMatch(/^EW-[0-9A-Z]{6}$/);
  });

  it("is stable for the same request and different for another", () => {
    expect(holdReference("a|5|3")).toBe(holdReference("a|5|3"));
    expect(holdReference("a|5|3")).not.toBe(holdReference("a|5|4"));
    expect(holdReference("")).toMatch(/^EW-[0-9A-Z]{6}$/);
  });

  it("avoids look-alike letters", () => {
    for (let i = 0; i < 200; i++) expect(holdReference(`seed-${i}`)).not.toMatch(/[ILOU]/);
  });
});
