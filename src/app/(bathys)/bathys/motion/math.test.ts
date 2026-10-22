import { describe, it, expect } from "vitest";
import { clamp, lerp, progress, staggerDelay, normalizeAngle } from "./math";

describe("motion/math", () => {
  describe("clamp", () => {
    it("clamps values below the minimum", () => {
      expect(clamp(-5, 0, 100)).toBe(0);
    });

    it("clamps values above the maximum", () => {
      expect(clamp(150, 0, 100)).toBe(100);
    });

    it("keeps values within range unchanged", () => {
      expect(clamp(42, 0, 100)).toBe(42);
    });
  });

  describe("lerp", () => {
    it("linearly interpolates between two numbers", () => {
      expect(lerp(0, 100, 0.5)).toBe(50);
      expect(lerp(10, 20, 0.25)).toBe(12.5);
      expect(lerp(50, 100, 0)).toBe(50);
      expect(lerp(50, 100, 1)).toBe(100);
    });
  });

  describe("progress", () => {
    it("computes normalized 0-1 progress between start and end", () => {
      expect(progress(50, 0, 100)).toBe(0.5);
      expect(progress(0, 0, 100)).toBe(0);
      expect(progress(100, 0, 100)).toBe(1);
    });

    it("clamps progress to 0 and 1 by default", () => {
      expect(progress(-20, 0, 100)).toBe(0);
      expect(progress(140, 0, 100)).toBe(1);
    });

    it("handles zero range without divide by zero", () => {
      expect(progress(5, 10, 10)).toBe(0);
    });
  });

  describe("staggerDelay", () => {
    it("computes staggered delay with base offset", () => {
      expect(staggerDelay(0, 100, 50)).toBe(100);
      expect(staggerDelay(1, 100, 50)).toBe(150);
      expect(staggerDelay(3, 0, 70)).toBe(210);
    });
  });

  describe("normalizeAngle", () => {
    it("keeps angles within 0 to 360 degrees", () => {
      expect(normalizeAngle(45)).toBe(45);
      expect(normalizeAngle(370)).toBe(10);
      expect(normalizeAngle(-30)).toBe(330);
    });
  });
});
