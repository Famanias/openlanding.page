import { describe, expect, it } from "vitest";
import { PARTS } from "./parts";
import { COMPANIES } from "./companies";
import { FAQ } from "./faq";
import {
  filterFaq,
  filterParts,
  getAdjacentParts,
  getCompanyProfiles,
  getCompanySectors,
  getPartSyllabus,
} from "./catalog";

describe("understudy catalog helpers", () => {
  it("filters parts by field and search query", () => {
    expect(filterParts("", "all")).toHaveLength(PARTS.length);
    expect(filterParts("", "design").every((p) => p.field === "design")).toBe(true);
    const figmaMatches = filterParts("figma", "all");
    expect(figmaMatches.some((p) => p.id === "product-designer")).toBe(true);
    expect(filterParts("nonexistent-role-xyz", "all")).toEqual([]);
  });

  it("builds a complete 4-stage syllabus for every valid part and returns null otherwise", () => {
    for (const part of PARTS) {
      const detail = getPartSyllabus(part.id);
      expect(detail).not.toBeNull();
      expect(detail!.syllabus).toHaveLength(4);
      expect(detail!.company.id).toBe(part.company);
      expect(detail!.castRoles.length).toBeGreaterThanOrEqual(4);
    }
    expect(getPartSyllabus("missing-part")).toBeNull();
  });

  it("wraps adjacent parts cleanly across boundaries", () => {
    const first = getAdjacentParts(PARTS[0].id);
    expect(first?.prev.id).toBe(PARTS[PARTS.length - 1].id);
    expect(first?.next.id).toBe(PARTS[1].id);
    expect(getAdjacentParts("unknown")).toBeNull();
  });

  it("returns company profiles and unique sectors matching directory", () => {
    const all = getCompanyProfiles("all");
    expect(all).toHaveLength(COMPANIES.length);
    const sectors = getCompanySectors();
    expect(sectors.length).toBeGreaterThan(5);
    const fintech = getCompanyProfiles("Fintech");
    expect(fintech.every((c) => c.sector === "Fintech")).toBe(true);
  });

  it("filters FAQ entries by keyword or question text", () => {
    expect(filterFaq("")).toHaveLength(FAQ.length);
    expect(filterFaq("89").some((f) => f.id === "price")).toBe(true);
    expect(filterFaq("hours").some((f) => f.id === "time")).toBe(true);
  });
});
