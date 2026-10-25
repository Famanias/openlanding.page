import { describe, expect, it } from "vitest";
import { chapterIndex, extractContour, moveChapter, wheelDirection, wrapActivity } from "./logic";

describe("picture-book navigation", () => {
  it("stays on the first and last chapter at the book's edges", () => {
    expect(moveChapter(0, -1, 6)).toBe(0);
    expect(moveChapter(5, 1, 6)).toBe(5);
    expect(moveChapter(2, 1, 6)).toBe(3);
  });
  it("opens a linked chapter and falls back safely for unknown links", () => {
    expect(chapterIndex("#little-adventures")).toBe(3);
    expect(chapterIndex("#unknown")).toBe(0);
  });
  it("lets the activity carousel loop in either direction", () => {
    expect(wrapActivity(-1, 5)).toBe(4);
    expect(wrapActivity(5, 5)).toBe(0);
    expect(wrapActivity(7, 5)).toBe(2);
  });
  it("determines wheel direction from horizontal or vertical scroll deltas", () => {
    expect(wheelDirection(0, 50)).toBe(1);
    expect(wheelDirection(0, -50)).toBe(-1);
    expect(wheelDirection(60, 0)).toBe(1);
    expect(wheelDirection(-60, 0)).toBe(-1);
    expect(wheelDirection(2, 3)).toBe(0);
  });
  it("extracts mountain contour silhouette by trimming bottom closure", () => {
    expect(extractContour("M0 540C110 490 290 476 1600 506V900H0Z")).toBe("M0 540C110 490 290 476 1600 506");
  });
});
