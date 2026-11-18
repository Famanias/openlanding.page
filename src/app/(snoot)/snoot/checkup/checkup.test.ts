import { describe, expect, it } from "vitest";
import {
  BODY_END,
  BODY_START,
  CHAPTERS,
  FRANK_WIDTH,
  bodyXAt,
  chapterIndexAt,
  ecgPath,
  isAllClear,
  pieceYAt,
  progressForChapter,
  stageProgress,
  trackOffset,
} from "./checkup";

describe("the nose-to-tail check-up", () => {
  it("has six chapters running nose to tail along Frank", () => {
    expect(CHAPTERS.map((c) => c.id)).toEqual(["nose", "ears", "heart", "belly", "paws", "tail"]);
    for (let i = 1; i < CHAPTERS.length; i++) expect(CHAPTERS[i].x).toBeGreaterThan(CHAPTERS[i - 1].x);
    for (const c of CHAPTERS) {
      expect(c.x).toBeGreaterThan(0);
      expect(c.x).toBeLessThan(FRANK_WIDTH);
      expect(c.services.length).toBeGreaterThanOrEqual(3);
      expect(c.reading.length).toBeGreaterThan(0);
    }
  });

  it("measures stage progress from the section's real offsets", () => {
    // section 4000 px tall starting at 1000, viewport 800: travel is 3200
    expect(stageProgress(0, 1000, 4000, 800)).toBe(0);
    expect(stageProgress(1000, 1000, 4000, 800)).toBe(0);
    expect(stageProgress(2600, 1000, 4000, 800)).toBe(0.5);
    expect(stageProgress(4200, 1000, 4000, 800)).toBe(1);
    expect(stageProgress(9999, 1000, 4000, 800)).toBe(1);
    // a section no taller than the viewport is done as soon as it is reached
    expect(stageProgress(1000, 1000, 600, 800)).toBe(1);
  });

  it("walks the stethoscope from just before the nose to just past the tail", () => {
    expect(bodyXAt(0)).toBe(BODY_START);
    expect(bodyXAt(1)).toBe(BODY_END);
    expect(BODY_START).toBeLessThanOrEqual(CHAPTERS[0].x);
    expect(BODY_END).toBeGreaterThanOrEqual(CHAPTERS[CHAPTERS.length - 1].x);
    expect(bodyXAt(0.5)).toBe((BODY_START + BODY_END) / 2);
    expect(bodyXAt(-1)).toBe(BODY_START);
  });

  it("picks the chapter nearest the stethoscope", () => {
    CHAPTERS.forEach((c, i) => expect(chapterIndexAt(c.x)).toBe(i));
    expect(chapterIndexAt(-100)).toBe(0);
    expect(chapterIndexAt(FRANK_WIDTH + 100)).toBe(CHAPTERS.length - 1);
    const mid = (CHAPTERS[1].x + CHAPTERS[2].x) / 2;
    expect(chapterIndexAt(mid - 1)).toBe(1);
    expect(chapterIndexAt(mid + 1)).toBe(2);
  });

  it("rests the chest-piece on each body part and glides between them", () => {
    for (const c of CHAPTERS) expect(pieceYAt(c.x)).toBe(c.y);
    const [a, b] = CHAPTERS;
    expect(pieceYAt((a.x + b.x) / 2)).toBeCloseTo((a.y + b.y) / 2, 6);
    expect(pieceYAt(-500)).toBe(CHAPTERS[0].y);
    expect(pieceYAt(FRANK_WIDTH * 2)).toBe(CHAPTERS[CHAPTERS.length - 1].y);
  });

  it("slides the track so the examined point sits under the anchor", () => {
    // Frank drawn 5200 px wide on screen (2x the viewBox), anchor at 500 px
    expect(trackOffset(0, 5200, 500)).toBe(500);
    expect(trackOffset(FRANK_WIDTH / 2, 5200, 500)).toBe(500 - 2600);
    expect(trackOffset(FRANK_WIDTH, 5200, 500)).toBe(500 - 5200);
  });

  it("draws a heartbeat trace with one spike per chapter", () => {
    const d = ecgPath(1000, 50, [200, 600]);
    expect(d.startsWith("M0 50")).toBe(true);
    expect(d.endsWith("L1000 50")).toBe(true);
    // each spike rises well above and dips below the baseline
    const ys = [...d.matchAll(/L[\d.]+ ([\d.-]+)/g)].map((m) => Number(m[1]));
    expect(Math.min(...ys)).toBeLessThan(20);
    expect(Math.max(...ys)).toBeGreaterThan(60);
    expect(d.match(/L/g)!.length).toBeGreaterThanOrEqual(1 + 2 * 4);
  });

  it("finds the scroll progress that puts each chapter under the stethoscope", () => {
    CHAPTERS.forEach((c, i) => {
      expect(bodyXAt(progressForChapter(i))).toBeCloseTo(c.x, 6);
      expect(chapterIndexAt(bodyXAt(progressForChapter(i)))).toBe(i);
    });
    expect(progressForChapter(-3)).toBe(progressForChapter(0));
    expect(progressForChapter(99)).toBe(progressForChapter(CHAPTERS.length - 1));
  });

  it("calls the all clear only at the very end", () => {
    expect(isAllClear(0.5)).toBe(false);
    expect(isAllClear(0.95)).toBe(false);
    expect(isAllClear(0.97)).toBe(true);
    expect(isAllClear(1)).toBe(true);
  });
});
