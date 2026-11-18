import { describe, expect, it } from "vitest";
import { CATEGORIES, TEMPLATES } from "./templates";
import { CATEGORY_COPY, getCategoryHubById, getCategoryHubSummaries } from "./category-copy";

describe("category-copy", () => {
  it("provides hand-authored copy for every non-all category id", () => {
    const ids = CATEGORIES.filter((c) => c.id !== "all").map((c) => c.id);
    expect(Object.keys(CATEGORY_COPY).sort()).toEqual([...ids].sort());

    for (const id of ids) {
      const entry = CATEGORY_COPY[id as keyof typeof CATEGORY_COPY];
      expect(entry.h1.trim().length, `${id} h1`).toBeGreaterThan(8);
      expect(entry.blurb.trim().length, `${id} blurb`).toBeGreaterThan(20);
      expect(entry.intro.trim().length, `${id} intro`).toBeGreaterThan(80);
      expect(entry.metaDescription.trim().length, `${id} metaDescription`).toBeGreaterThan(50);
    }
  });

  it("summarizes active categories with counts and resolves valid/invalid ids", () => {
    const summaries = getCategoryHubSummaries(TEMPLATES);
    expect(summaries.length).toBeGreaterThan(0);
    for (const summary of summaries) {
      expect(summary.count).toBeGreaterThan(0);
      expect(summary.templates).toHaveLength(summary.count);
      expect(getCategoryHubById(summary.id, TEMPLATES)?.id).toBe(summary.id);
    }
    expect(getCategoryHubById("all", TEMPLATES)).toBeUndefined();
    expect(getCategoryHubById("nonexistent-category", TEMPLATES)).toBeUndefined();
  });
});
