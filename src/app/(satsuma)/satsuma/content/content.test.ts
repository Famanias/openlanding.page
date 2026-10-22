import { describe, expect, it } from "vitest";
import { MAKERS, makerById } from "./makers";
import { formatUsd, packById, PACKS, perReel } from "./packs";
import { REELS, SCENE_IDS } from "./reels";
import { segmentWedges } from "./segments";
import { CATEGORIES, STEPS } from "./steps";

describe("reels", () => {
  it("fills the ten tiles of the 5×2 sheet, one scene each, no repeats", () => {
    expect(REELS).toHaveLength(10);
    expect(new Set(REELS.map((r) => r.scene)).size).toBe(10);
    expect(REELS.map((r) => r.scene)).toEqual([...SCENE_IDS]);
  });

  it("credits every reel to a maker on the page", () => {
    const names = new Set(MAKERS.map((m) => m.name));
    for (const reel of REELS) expect(names.has(reel.maker)).toBe(true);
  });
});

describe("makers", () => {
  it("have unique ids and real scenes", () => {
    expect(new Set(MAKERS.map((m) => m.id)).size).toBe(MAKERS.length);
    for (const m of MAKERS) {
      expect(SCENE_IDS).toContain(m.scene);
      expect(m.rating).toBeGreaterThanOrEqual(4);
      expect(m.rating).toBeLessThanOrEqual(5);
    }
    expect(makerById("hana")?.city).toBe("Kyoto");
    expect(makerById("nobody")).toBeUndefined();
  });
});

describe("packs", () => {
  it("get cheaper per reel as they grow", () => {
    const rates = PACKS.map(perReel);
    expect(rates).toEqual([80, 70, 60]);
    for (let i = 1; i < rates.length; i++) expect(rates[i]).toBeLessThan(rates[i - 1]);
  });

  it("mark exactly one pack as the popular one", () => {
    expect(PACKS.filter((p) => p.popular)).toHaveLength(1);
    expect(packById("half")?.popular).toBe(true);
  });

  it("formats dollars with separators", () => {
    expect(formatUsd(1440)).toBe("$1,440");
    expect(formatUsd(480)).toBe("$480");
  });
});

describe("steps and categories", () => {
  it("number the steps in order", () => {
    expect(STEPS.map((s) => s.n)).toEqual(["01", "02", "03"]);
  });
  it("list distinct categories", () => {
    expect(new Set(CATEGORIES).size).toBe(CATEGORIES.length);
  });
});

describe("segmentWedges", () => {
  it("makes one closed wedge per reel", () => {
    for (const n of [6, 12, 24]) {
      const wedges = segmentWedges(n, 50, 50, 14, 46);
      expect(wedges).toHaveLength(n);
      for (const w of wedges) {
        expect(w.path.startsWith("M")).toBe(true);
        expect(w.path.endsWith("Z")).toBe(true);
      }
    }
  });

  it("spaces wedge centres evenly around the turn", () => {
    const wedges = segmentWedges(6, 0, 0, 10, 40);
    expect(wedges[0].angle).toBeCloseTo(30, 6);
    expect(wedges[1].angle - wedges[0].angle).toBeCloseTo(60, 6);
  });

  it("starts the first wedge at twelve o'clock, clockwise", () => {
    const [first] = segmentWedges(4, 50, 50, 10, 40, 0);
    expect(first.path.startsWith("M50 10A")).toBe(true);
  });
});
