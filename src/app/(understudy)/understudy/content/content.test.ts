import { describe, expect, it } from "vitest";
import { CALLBACKS, COMPANIES, HOUSE_ROWS, companyById } from "./companies";
import { FIELDS, PARTS, partById, partsIn } from "./parts";
import { FAQ, SUGGESTED } from "./faq";

describe("companies", () => {
  it("has unique ids and resolves every callback", () => {
    expect(new Set(COMPANIES.map((c) => c.id)).size).toBe(COMPANIES.length);
    CALLBACKS.forEach((id) => expect(companyById(id).id).toBe(id));
    expect(CALLBACKS).toHaveLength(10);
  });

  it("splits every company across the two house rows", () => {
    expect(HOUSE_ROWS[0].length + HOUSE_ROWS[1].length).toBe(COMPANIES.length);
  });

  it("throws on an unknown company", () => {
    expect(() => companyById("nope")).toThrow();
  });
});

describe("parts", () => {
  it("has ten parts, each at a known company in a listed field", () => {
    expect(PARTS).toHaveLength(10);
    const fields = new Set(FIELDS.map((f) => f.id));
    PARTS.forEach((p) => {
      expect(fields.has(p.field)).toBe(true);
      expect(() => companyById(p.company)).not.toThrow();
      expect(p.weeks).toBeGreaterThanOrEqual(5);
      expect(p.tools.length).toBeGreaterThan(0);
    });
  });

  it("puts tagged parts first in Popular and filters by field", () => {
    const popular = partsIn("all");
    expect(popular).toHaveLength(PARTS.length);
    const firstUntagged = popular.findIndex((p) => p.tag === null);
    expect(popular.slice(firstUntagged).every((p) => p.tag === null)).toBe(true);
    expect(partsIn("data").map((p) => p.id)).toEqual(["product-analyst", "data-scientist"]);
  });

  it("gives every field at least one part", () => {
    FIELDS.filter((f) => f.id !== "all").forEach((f) => expect(partsIn(f.id).length).toBeGreaterThan(0));
  });

  it("finds a part by id", () => {
    expect(partById("ai-engineer")?.title).toBe("AI Engineer");
    expect(partById("nope")).toBeUndefined();
  });
});

describe("faq", () => {
  it("has unique ids and suggestions that exist", () => {
    expect(new Set(FAQ.map((f) => f.id)).size).toBe(FAQ.length);
    SUGGESTED.forEach((id) => expect(FAQ.some((f) => f.id === id)).toBe(true));
  });
});
