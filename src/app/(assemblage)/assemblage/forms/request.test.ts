import { describe, expect, it } from "vitest";
import { validateRequest } from "./request";

describe("validateRequest", () => {
  it("requires a name, work email and company", () => {
    expect(validateRequest({ name: "", email: "bad", company: "", note: "" })).toEqual({
      name: "Add your name",
      email: "Enter a work email",
      company: "Add your company",
    });
  });

  it("accepts a complete request", () => {
    expect(validateRequest({ name: "Mara Ivers", email: "mara@fieldnotes.press", company: "Field Notes", note: "" })).toEqual({});
  });
});
