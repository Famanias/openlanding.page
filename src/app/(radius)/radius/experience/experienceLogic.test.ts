import { describe, expect, it } from "vitest";
import { getTerrain, validateInterest } from "./experienceLogic";

describe("street plan terrain", () => {
  it("maps the slider to a city, mixed, or rough route at the intended boundaries", () => {
    expect(getTerrain(0).zone).toBe("city");
    expect(getTerrain(33).zone).toBe("city");
    expect(getTerrain(34).zone).toBe("mixed");
    expect(getTerrain(66).zone).toBe("mixed");
    expect(getTerrain(67).zone).toBe("rough");
    expect(getTerrain(100).zone).toBe("rough");
  });

  it("keeps the illustrated route position inside the slider bounds", () => {
    expect(getTerrain(-8).progress).toBe(0);
    expect(getTerrain(120).progress).toBe(100);
    expect(getTerrain(Number.NaN).progress).toBe(0);
  });
});

describe("order interest demo validation", () => {
  it("requires a name and a plausible email", () => {
    expect(validateInterest({ name: "  ", email: "" })).toHaveProperty("name");
    expect(validateInterest({ name: "  ", email: "" })).toHaveProperty("email");
    expect(validateInterest({ name: "Rider", email: "not an email" })).toHaveProperty("email");
    expect(validateInterest({ name: "Rider", email: "rider@example" })).toHaveProperty("email");
  });

  it("accepts trimmed valid details without reporting errors", () => {
    expect(validateInterest({ name: "  Alex Rider  ", email: " alex@example.com " })).toEqual({});
  });

  it("rejects oversized email input", () => {
    expect(validateInterest({ name: "Alex", email: `${"a".repeat(250)}@example.com` })).toHaveProperty("email");
  });
});
