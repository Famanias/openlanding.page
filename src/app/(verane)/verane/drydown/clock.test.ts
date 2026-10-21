import { describe, expect, test } from "vitest";
import { formatHour, hourToProgress, progressToHour, stepHour } from "./clock";

describe("clock logic", () => {
  describe("formatHour", () => {
    test("formats integer hours with zero minutes", () => {
      expect(formatHour(0)).toBe("H 00:00");
      expect(formatHour(3)).toBe("H 03:00");
      expect(formatHour(12)).toBe("H 12:00");
    });

    test("formats fractional hours into rounded minutes", () => {
      expect(formatHour(0.3333)).toBe("H 00:20");
      expect(formatHour(3.3333)).toBe("H 03:20");
      expect(formatHour(0.75)).toBe("H 00:45");
      expect(formatHour(5.5)).toBe("H 05:30");
    });

    test("clamps negative and out-of-range hours gracefully", () => {
      expect(formatHour(-1)).toBe("H 00:00");
      expect(formatHour(13)).toBe("H 12:00");
    });
  });

  describe("progressToHour & hourToProgress curve", () => {
    test("maps 0 progress to 0 hours and 1 progress to 12 hours", () => {
      expect(progressToHour(0)).toBe(0);
      expect(progressToHour(1)).toBe(12);
      expect(hourToProgress(0)).toBe(0);
      expect(hourToProgress(12)).toBe(1);
    });

    test("applies quadratic ease-in curve so top notes get more scroll space", () => {
      // At progress 0.25, hour = 12 * 0.25^2 = 0.75 (45 minutes)
      expect(progressToHour(0.25)).toBeCloseTo(0.75, 5);
      expect(hourToProgress(0.75)).toBeCloseTo(0.25, 5);

      // At progress 0.5, hour = 12 * 0.25 = 3.0
      expect(progressToHour(0.5)).toBeCloseTo(3.0, 5);
      expect(hourToProgress(3.0)).toBeCloseTo(0.5, 5);
    });

    test("clamps out of bounds progress and hour", () => {
      expect(progressToHour(-0.2)).toBe(0);
      expect(progressToHour(1.5)).toBe(12);
      expect(hourToProgress(-2)).toBe(0);
      expect(hourToProgress(20)).toBe(1);
    });
  });

  describe("stepHour keyboard controls", () => {
    test("steps forward and backward by 15 minutes (0.25h)", () => {
      expect(stepHour(1.0, "next15")).toBe(1.25);
      expect(stepHour(1.0, "prev15")).toBe(0.75);
    });

    test("steps forward and backward by 1 full hour", () => {
      expect(stepHour(2.5, "nextHour")).toBe(3.5);
      expect(stepHour(2.5, "prevHour")).toBe(1.5);
    });

    test("jumps to start and end", () => {
      expect(stepHour(5, "start")).toBe(0);
      expect(stepHour(5, "end")).toBe(12);
    });

    test("clamps at boundaries", () => {
      expect(stepHour(0.1, "prev15")).toBe(0);
      expect(stepHour(11.9, "next15")).toBe(12);
      expect(stepHour(0, "prevHour")).toBe(0);
      expect(stepHour(12, "nextHour")).toBe(12);
    });
  });
});
