import { describe, expect, it } from "vitest";
import {
  contentProgress,
  indexForDrag,
  indexForWheel,
  parallaxOffset,
  springStep,
  targetX,
  wrapIndex,
} from "./deck";

describe("alpine reel deck math", () => {
  it("wraps the infinite deck without leaking negative indexes", () => {
    expect(wrapIndex(-1, 14)).toBe(13);
    expect(wrapIndex(14, 14)).toBe(0);
    expect(wrapIndex(29, 14)).toBe(1);
  });

  it("computes a centered target from the left pad and pitch", () => {
    expect(targetX(320, 850, 2)).toBe(-1380);
  });

  it("takes a measured spring step toward the target", () => {
    expect(springStep(0, 100, 0.11)).toBeCloseTo(11);
    expect(springStep(50, 100, 0.11)).toBeCloseTo(55.5);
  });

  it("moves the image slower than the slide for parallax", () => {
    expect(parallaxOffset(120, 1.2)).toBeCloseTo(-100);
  });

  it("commits a drag only after fourteen percent of the viewport", () => {
    expect(indexForDrag(-100, 1000, 2, 14)).toBe(2);
    expect(indexForDrag(-150, 1000, 2, 14)).toBe(3);
    expect(indexForDrag(150, 1000, 0, 14)).toBe(13);
  });

  it("maps wheel direction to one adjacent peak", () => {
    expect(indexForWheel(0, 80, 850, 14)).toBe(1);
    expect(indexForWheel(0, -80, 850, 14)).toBe(13);
  });

  it("keeps content hidden until the incoming frame is near center", () => {
    expect(contentProgress(0, 1000)).toBe(1);
    expect(contentProgress(400, 1000)).toBeGreaterThan(0);
    expect(contentProgress(600, 1000)).toBe(0);
  });
});
