import { describe, expect, test } from "vitest";
import {
  COMPLETE_AT,
  FLICK_SPEED,
  bookPosition,
  bookShift,
  dragProgress,
  leafTurn,
  settleTarget,
  stepProgress,
  tapeCount,
} from "./turn";

describe("dragProgress", () => {
  const pageWidth = 400;

  test("dragging a forward turn leftwards raises progress", () => {
    expect(dragProgress(800, 800, pageWidth, 1)).toBe(0);
    expect(dragProgress(800, 580, pageWidth, 1)).toBeGreaterThan(0.4);
    expect(dragProgress(800, 580, pageWidth, 1)).toBeLessThan(0.6);
  });

  test("dragging a backward turn rightwards raises progress", () => {
    expect(dragProgress(100, 320, pageWidth, -1)).toBeGreaterThan(0.4);
    expect(dragProgress(100, -200, pageWidth, -1)).toBe(0);
  });

  test("stays inside 0..1", () => {
    expect(dragProgress(800, -9999, pageWidth, 1)).toBe(1);
    expect(dragProgress(800, 9999, pageWidth, 1)).toBe(0);
  });

  test("a re-grab continues from the leaf's current progress", () => {
    const base = 0.5;
    expect(dragProgress(500, 500, pageWidth, 1, base)).toBe(0.5);
    expect(dragProgress(500, 600, pageWidth, 1, base)).toBeLessThan(0.5);
    expect(dragProgress(500, 100, pageWidth, 1, base)).toBe(1);
  });
});

describe("settleTarget", () => {
  test("completes once past the threshold, otherwise settles back", () => {
    expect(settleTarget(COMPLETE_AT + 0.01, 0)).toBe(1);
    expect(settleTarget(COMPLETE_AT - 0.01, 0)).toBe(0);
  });

  test("a fast flick overrides position in either direction", () => {
    expect(settleTarget(0.1, FLICK_SPEED + 0.1)).toBe(1);
    expect(settleTarget(0.9, -(FLICK_SPEED + 0.1))).toBe(0);
  });

  test("a slow drift does not count as a flick", () => {
    expect(settleTarget(0.2, FLICK_SPEED - 0.1)).toBe(0);
  });
});

describe("stepProgress", () => {
  test("moves toward the target and never overshoots", () => {
    let p = 0;
    let last = p;
    for (let i = 0; i < 200; i++) {
      p = stepProgress(p, 1, 16);
      expect(p).toBeGreaterThanOrEqual(last);
      expect(p).toBeLessThanOrEqual(1);
      last = p;
    }
    expect(p).toBe(1);
  });

  test("works downward too and snaps when close", () => {
    expect(stepProgress(0.0005, 0, 16)).toBe(0);
    expect(stepProgress(0.8, 0, 16)).toBeLessThan(0.8);
  });

  test("a longer frame moves further than a shorter one", () => {
    expect(stepProgress(0, 1, 32)).toBeGreaterThan(stepProgress(0, 1, 8));
  });
});

describe("leafTurn and bookPosition", () => {
  test("a forward turn takes the leaf from 0 to 1, a backward turn from 1 to 0", () => {
    expect(leafTurn(1, 0)).toBe(0);
    expect(leafTurn(1, 1)).toBe(1);
    expect(leafTurn(-1, 0)).toBe(1);
    expect(leafTurn(-1, 1)).toBe(0);
  });

  test("the book position moves with the turn", () => {
    expect(bookPosition(3, 1, 0.25)).toBe(3.25);
    expect(bookPosition(3, -1, 0.25)).toBe(2.75);
  });
});

describe("bookShift", () => {
  test("a closed front cover sits half a page left of centre, a closed back cover half a page right", () => {
    expect(bookShift(0, 7)).toBe(-25);
    expect(bookShift(7, 7)).toBe(25);
  });

  test("an open book is centred", () => {
    for (const p of [1, 3.5, 6]) expect(bookShift(p, 7)).toBe(0);
  });

  test("opens smoothly during the first and last turns", () => {
    expect(bookShift(0.5, 7)).toBe(-12.5);
    expect(bookShift(6.5, 7)).toBe(12.5);
  });
});

describe("tapeCount", () => {
  test("reads 000 at the cover and 999 at the back cover", () => {
    expect(tapeCount(0, 8)).toBe(0);
    expect(tapeCount(7, 8)).toBe(999);
  });

  test("rises monotonically with position", () => {
    let last = -1;
    for (let p = 0; p <= 7; p += 0.25) {
      const c = tapeCount(p, 8);
      expect(c).toBeGreaterThanOrEqual(last);
      last = c;
    }
  });
});
