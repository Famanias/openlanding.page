import { describe, expect, it } from "vitest";
import { validateInquiry } from "./inquiry";

describe("inquiry validation", () => {
  it("requires a name, valid email and a useful project description", () => {
    const errors = validateInquiry({ name: " ", email: "person@", project: "short" });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.project).toBeTruthy();
  });

  it("accepts a complete inquiry after trimming surrounding whitespace", () => {
    expect(validateInquiry({ name: " Ari Vale ", email: " ari@example.com ", project: " A short film about the coast. " })).toEqual({});
  });

  it("rejects oversized fields instead of accepting an unbounded payload", () => {
    expect(validateInquiry({ name: "x".repeat(101), email: "a@example.com", project: "x".repeat(2001) })).toMatchObject({
      name: expect.any(String), project: expect.any(String),
    });
  });
});
