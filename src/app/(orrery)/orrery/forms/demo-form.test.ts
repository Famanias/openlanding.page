import { describe, expect, test } from "vitest";
import { validateDemo } from "./demo-form";

describe("validateDemo", () => {
  test("returns every error for an empty, malformed submission", () => {
    expect(validateDemo({ name: "", email: "x", company: "" })).toEqual({
      name: "Add your name",
      email: "Enter a work email",
      company: "Add your company",
    });
  });

  test("returns no errors for a valid submission", () => {
    expect(validateDemo({ name: "Ada", email: "ada@studio.co", company: "Studio" })).toEqual({});
  });

  test("treats whitespace-only fields as empty", () => {
    expect(validateDemo({ name: "  ", email: "ada@studio.co", company: "\t" })).toEqual({
      name: "Add your name",
      company: "Add your company",
    });
  });
});
