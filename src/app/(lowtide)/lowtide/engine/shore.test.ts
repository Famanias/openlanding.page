import { describe, expect, it } from "vitest";
import { CHAPTER_POINTS } from "../night/clock";
import { chapterX, HIGH_Y, LOW_Y, sandBase, SHORE_LENGTH, shoreZ, waterLevel } from "./shore";

describe("shore layout", () => {
  it("maps tide to a water height between low and high water", () => {
    expect(waterLevel(1)).toBeCloseTo(HIGH_Y, 10);
    expect(waterLevel(0)).toBeCloseTo(LOW_Y, 10);
    expect(waterLevel(0.5)).toBeCloseTo((HIGH_Y + LOW_Y) / 2, 10);
  });

  it("finds where the water meets the sloping sand", () => {
    for (const y of [LOW_Y, 0, HIGH_Y]) expect(sandBase(shoreZ(y))).toBeCloseTo(y, 10);
  });

  it("pulls the shoreline away from the camera as the tide drops", () => {
    expect(shoreZ(waterLevel(0))).toBeLessThan(shoreZ(waterLevel(1)) - 40);
  });

  it("places each chapter along the shore by its night progress", () => {
    expect(chapterX("hook")).toBe(0);
    expect(chapterX("dawn")).toBe(SHORE_LENGTH);
    expect(chapterX("sensors")).toBeCloseTo(CHAPTER_POINTS.sensors * SHORE_LENGTH, 10);
  });
});
