import { describe, expect, it } from "vitest";
import { CHAPTER_IDS } from "../night/clock";
import { CHAPTERS, chapter, PRODUCT, SENSORS, STATS, TESTIMONIALS } from "./story";

describe("story content", () => {
  it("has one chapter per night chapter, in order", () => {
    expect(CHAPTERS.map((c) => c.id)).toEqual([...CHAPTER_IDS]);
  });

  it("opens and turns on the agreed lines", () => {
    expect(chapter("hook").headline).toBe("Let the tide go out.");
    expect(chapter("hook").quietLine).toBe("A sleep ring for people who can't put the phone down.");
    expect(chapter("smart-wake").headline).toBe("We wake you on the outgoing tide.");
  });

  it("cites a source for every statistic", () => {
    expect(STATS.length).toBeGreaterThan(0);
    for (const s of STATS) {
      expect(s.sourceUrl.startsWith("https://")).toBe(true);
      expect(s.source.length).toBeGreaterThan(0);
    }
  });

  it("reads three sensors", () => {
    expect(SENSORS.map((s) => s.id)).toEqual(["heart", "temperature", "breathing"]);
  });

  it("keeps the product facts", () => {
    expect(PRODUCT.price).toBe(279);
    expect(PRODUCT.subscription).toBe(false);
    expect(PRODUCT.sizes).toEqual([6, 7, 8, 9, 10, 11, 12, 13]);
    expect(PRODUCT.finishes.map((f) => f.id)).toEqual(["moonstone", "tidewater", "driftwood"]);
    expect(PRODUCT.batteryDays).toBe(7);
  });

  it("has three testimonials and no filler copy", () => {
    expect(TESTIMONIALS).toHaveLength(3);
    const all = JSON.stringify({ CHAPTERS, SENSORS, TESTIMONIALS, PRODUCT, STATS }).toLowerCase();
    expect(all).not.toContain("lorem");
  });
});
