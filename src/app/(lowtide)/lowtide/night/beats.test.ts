import { describe, expect, it } from "vitest";
import { BEAT_WINDOW, chapterWeights } from "./beats";
import { CHAPTER_IDS, CHAPTER_POINTS } from "./clock";

describe("chapter weights", () => {
  it("gives each chapter full weight on its own point and none to the others", () => {
    for (const id of CHAPTER_IDS) {
      const w = chapterWeights(CHAPTER_POINTS[id]);
      expect(w[id]).toBe(1);
      for (const other of CHAPTER_IDS) if (other !== id) expect(w[other]).toBe(0);
    }
  });

  it("fades out beyond the beat window", () => {
    expect(chapterWeights(CHAPTER_POINTS.proof + BEAT_WINDOW * 2).proof).toBe(0);
  });

  it("is partial inside the window", () => {
    const mid = chapterWeights(CHAPTER_POINTS.proof + BEAT_WINDOW / 2).proof;
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });

  it("gives a chapter its full window on the side away from a close neighbour", () => {
    // reveal sits close to dawn, but the approach from the proof side keeps the full window
    expect(chapterWeights(CHAPTER_POINTS.reveal - BEAT_WINDOW * 0.6).reveal).toBeGreaterThan(0);
    expect(chapterWeights(CHAPTER_POINTS.dawn - BEAT_WINDOW * 0.6).dawn).toBe(0);
  });

  it("keeps the close reveal and dawn chapters apart", () => {
    const between = (CHAPTER_POINTS.reveal + CHAPTER_POINTS.dawn) / 2;
    const w = chapterWeights(between);
    expect(w.reveal).toBe(0);
    expect(w.dawn).toBe(0);
  });
});
