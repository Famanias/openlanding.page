import { describe, it, expect } from "vitest";
import { FLAVORS, FILTERS, STOPS, NOTES, FAQS, WEEK, filterFlavors } from "./shop";

describe("pipkin shop data", () => {
  it("has six flavours with unique ids, tones and lid numbers", () => {
    expect(FLAVORS).toHaveLength(6);
    expect(new Set(FLAVORS.map((f) => f.id)).size).toBe(6);
    expect(new Set(FLAVORS.map((f) => f.tone)).size).toBe(6);
    expect(new Set(FLAVORS.map((f) => f.lid)).size).toBe(6);
  });

  it("filters flavours and never returns an empty shelf", () => {
    expect(filterFlavors("all")).toHaveLength(6);
    for (const f of FILTERS) expect(filterFlavors(f.id).length).toBeGreaterThan(0);
    expect(filterFlavors("floral").every((f) => f.tags.includes("floral"))).toBe(true);
  });

  it("has five trip stops in order and a matching week", () => {
    expect(STOPS.map((s) => s.id)).toEqual(["ordered", "cooked", "packed", "road", "door"]);
    expect(WEEK).toHaveLength(5);
  });

  it("has unique notes and complete questions", () => {
    expect(new Set(NOTES.map((n) => n.id)).size).toBe(NOTES.length);
    for (const q of FAQS) {
      expect(q.q.endsWith("?")).toBe(true);
      expect(q.a.length).toBeGreaterThan(20);
    }
  });
});
