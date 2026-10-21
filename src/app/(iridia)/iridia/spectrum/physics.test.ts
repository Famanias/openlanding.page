import { describe, it, expect } from "vitest";
import {
  cauchyRefraction,
  calculateAbbeNumber,
  wavelengthToHue,
  calculateFlux,
  calculateCameraOrbit,
  clamp,
  lerp,
} from "./physics";
import { SPECTRAL_PRESETS, PRESET_ORDER } from "./presets";

describe("IRIDIA Optical Physics Mathematics", () => {
  describe("cauchyRefraction", () => {
    it("calculates dispersion correctly according to Cauchy equation", () => {
      const a = 1.5;
      const b = 0.005; // microns²
      // at 500 nm (0.5 um), n = 1.5 + 0.005 / 0.25 = 1.52
      const n500 = cauchyRefraction(a, b, 500);
      expect(n500).toBeCloseTo(1.52, 4);

      // at 1000 nm (1.0 um), n = 1.5 + 0.005 / 1.0 = 1.505
      const n1000 = cauchyRefraction(a, b, 1000);
      expect(n1000).toBeCloseTo(1.505, 4);
    });

    it("shorter wavelengths yield higher refractive index (normal dispersion)", () => {
      const a = 1.6;
      const b = 0.008;
      const blue = cauchyRefraction(a, b, 450);
      const red = cauchyRefraction(a, b, 650);
      expect(blue).toBeGreaterThan(red);
    });

    it("handles zero or negative wavelength safely", () => {
      expect(cauchyRefraction(1.5, 0.01, 0)).toBe(1.5);
      expect(cauchyRefraction(1.5, 0.01, -100)).toBe(1.5);
    });
  });

  describe("calculateAbbeNumber", () => {
    it("calculates standard Abbe number for crown glass", () => {
      // Crown glass approx: nD = 1.523, nF = 1.529, nC = 1.520
      // Vd = (1.523 - 1) / (1.529 - 1.520) = 0.523 / 0.009 = ~58.11
      const vd = calculateAbbeNumber(1.523, 1.529, 1.52);
      expect(vd).toBeCloseTo(58.11, 1);
    });

    it("avoids division by zero if dispersion is near zero", () => {
      expect(calculateAbbeNumber(1.5, 1.5, 1.5)).toBe(100.0);
    });
  });

  describe("wavelengthToHue", () => {
    it("maps spectral extremes and key wavelengths to logical hue angles", () => {
      const violetHue = wavelengthToHue(400);
      expect(violetHue).toBeGreaterThan(240);

      const cyanHue = wavelengthToHue(480);
      expect(cyanHue).toBeGreaterThanOrEqual(180);
      expect(cyanHue).toBeLessThan(220);

      const yellowHue = wavelengthToHue(589);
      expect(yellowHue).toBeGreaterThan(50);
      expect(yellowHue).toBeLessThan(90);

      const redHue = wavelengthToHue(680);
      expect(redHue).toBeLessThan(30);
    });

    it("clamps wavelengths outside 380-700nm", () => {
      expect(wavelengthToHue(200)).toBe(wavelengthToHue(380));
      expect(wavelengthToHue(1000)).toBe(wavelengthToHue(700));
    });
  });

  describe("calculateFlux", () => {
    it("computes realistic radiative flux density in lm/m²", () => {
      const flux = calculateFlux(1.618, 589);
      expect(flux).toBeGreaterThan(1000);
      expect(flux).toBeLessThan(3000);
    });
  });

  describe("calculateCameraOrbit", () => {
    it("calculates initial resting position at scrollProgress 0 and center pointer", () => {
      const orbit = calculateCameraOrbit(0, 0, 0);
      expect(orbit.pitchDeg).toBe(-2);
      expect(orbit.yawDeg).toBe(0);
      expect(orbit.rollDeg).toBe(0);
    });

    it("reacts with pointer parallax bias", () => {
      const right = calculateCameraOrbit(0, 1, 0);
      const left = calculateCameraOrbit(0, -1, 0);
      expect(right.yawDeg).toBeGreaterThan(left.yawDeg);
      expect(right.rollDeg).toBeLessThan(left.rollDeg);
    });

    it("clamps out of range input safely", () => {
      const orbit = calculateCameraOrbit(1.5, 3, -5);
      expect(Number.isFinite(orbit.pitchDeg)).toBe(true);
      expect(Number.isFinite(orbit.yawDeg)).toBe(true);
      expect(Number.isFinite(orbit.translationZ)).toBe(true);
    });
  });

  describe("clamp and lerp", () => {
    it("clamps values inside bounds", () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it("lerps linearly", () => {
      expect(lerp(0, 100, 0.5)).toBe(50);
      expect(lerp(10, 20, 0)).toBe(10);
      expect(lerp(10, 20, 1)).toBe(20);
    });
  });

  describe("Preset Integrity", () => {
    it("defines 5 complete presets matching PRESET_ORDER", () => {
      expect(PRESET_ORDER).toHaveLength(5);
      for (const id of PRESET_ORDER) {
        const p = SPECTRAL_PRESETS[id];
        expect(p).toBeDefined();
        expect(p.name).toBeTruthy();
        expect(p.wavelengthNm).toBeGreaterThan(380);
        expect(p.wavelengthNm).toBeLessThan(700);
        expect(p.refractiveIndex).toBeGreaterThan(1.3);
        expect(p.uniformStops).toHaveLength(4);
        expect(p.hexStops).toHaveLength(4);
        expect(p.cssGradient).toContain("linear-gradient");
      }
    });
  });
});
