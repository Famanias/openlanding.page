import { describe, expect, test } from "vitest";
import { FRAGRANCES, getFragranceBySlug } from "./fragrances";

describe("fragrances library", () => {
  test("contains exactly the four annual editions", () => {
    expect(FRAGRANCES).toHaveLength(4);
    const slugs = FRAGRANCES.map((f) => f.slug);
    expect(slugs).toEqual([
      "premiere-heure",
      "iris-calcaire",
      "fumee-lente",
      "nuit-doratoire",
    ]);
  });

  test("each fragrance has a valid number, title, lead notes, and edition stamp", () => {
    for (const f of FRAGRANCES) {
      expect(f.number).toMatch(/^Nº \d$/);
      expect(f.title).toBeTruthy();
      expect(f.subtitle).toBeTruthy();
      expect(f.description).toBeTruthy();
      expect(f.editionStamp).toContain("400");
      expect(f.macerationMonths).toBe(18);
    }
  });

  test("each fragrance has notes in all three tiers with non-regressive timings", () => {
    for (const f of FRAGRANCES) {
      const topNotes = f.notes.filter((n) => n.tier === "top");
      const heartNotes = f.notes.filter((n) => n.tier === "heart");
      const baseNotes = f.notes.filter((n) => n.tier === "base");

      expect(topNotes.length).toBeGreaterThanOrEqual(1);
      expect(heartNotes.length).toBeGreaterThanOrEqual(1);
      expect(baseNotes.length).toBeGreaterThanOrEqual(1);

      for (const n of f.notes) {
        expect(n.onset).toBeGreaterThanOrEqual(0);
        expect(n.fade).toBeGreaterThanOrEqual(n.onset);
        expect(n.gone).toBeGreaterThan(n.fade);
      }
    }
  });

  test("getFragranceBySlug finds fragrance or returns default", () => {
    expect(getFragranceBySlug("iris-calcaire").title).toBe("Iris Calcaire");
    expect(getFragranceBySlug("unknown-slug").slug).toBe("iris-calcaire");
  });
});
