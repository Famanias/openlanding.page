import { describe, expect, it } from "vitest";
import { CHAPTER_CLOCK, CHAPTER_IDS, CHAPTER_POINTS, clockToProgress, formatClock, NIGHT_END, NIGHT_START, progressToClock } from "./clock";

describe("night clock", () => {
  it("runs from 23:04 to 07:00", () => {
    expect(NIGHT_START).toBe(1384);
    expect(NIGHT_END).toBe(1860);
    expect(formatClock(progressToClock(0))).toBe("23:04");
    expect(formatClock(progressToClock(1))).toBe("07:00");
  });

  it("clamps progress outside the night", () => {
    expect(formatClock(progressToClock(-0.3))).toBe("23:04");
    expect(formatClock(progressToClock(1.7))).toBe("07:00");
  });

  it("formats minutes past the first midnight as a 24 h clock", () => {
    expect(formatClock(CHAPTER_CLOCK.problem)).toBe("00:40");
    expect(formatClock(CHAPTER_CLOCK.sensors)).toBe("02:15");
    expect(formatClock(CHAPTER_CLOCK["smart-wake"])).toBe("03:50");
    expect(formatClock(CHAPTER_CLOCK.proof)).toBe("05:25");
    expect(formatClock(CHAPTER_CLOCK.reveal)).toBe("06:40");
  });

  it("orders the seven chapters", () => {
    expect(CHAPTER_IDS).toEqual(["hook", "problem", "sensors", "smart-wake", "proof", "reveal", "dawn"]);
  });

  it("places each chapter on the progress line", () => {
    expect(CHAPTER_POINTS.hook).toBe(0);
    expect(CHAPTER_POINTS.problem).toBeCloseTo(96 / 476, 6);
    expect(CHAPTER_POINTS.dawn).toBe(1);
  });

  it("round-trips progress and clock", () => {
    expect(clockToProgress(progressToClock(0.37))).toBeCloseTo(0.37, 6);
  });
});
