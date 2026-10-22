import { describe, it, expect } from "vitest";
import {
  MAX_DEPTH,
  calculatePressure,
  calculateLightAbsorption,
  calculateWaterTemp,
  getOceanZone,
  depthToProgress,
  progressToDepth,
} from "./physics";

describe("descent/physics", () => {
  it("defines MAX_DEPTH as 10,928 metres", () => {
    expect(MAX_DEPTH).toBe(10928);
  });

  describe("calculatePressure", () => {
    it("returns atmospheric pressure at surface (0 m)", () => {
      const p = calculatePressure(0);
      expect(p.bar).toBeCloseTo(1.0, 1);
      expect(p.mpa).toBeCloseTo(0.1, 1);
    });

    it("calculates realistic pressure at 1,000 m (~102 bar)", () => {
      const p = calculatePressure(1000);
      expect(p.bar).toBeGreaterThan(100);
      expect(p.bar).toBeLessThan(105);
      expect(p.mpa).toBeCloseTo(p.bar / 10, 2);
    });

    it("calculates hadal hydrostatic load at 10,928 m (~1,114 bar)", () => {
      const p = calculatePressure(MAX_DEPTH);
      expect(p.bar).toBeGreaterThan(1110);
      expect(p.bar).toBeLessThan(1120);
      expect(p.mpa).toBeGreaterThan(111);
    });
  });

  describe("calculateLightAbsorption", () => {
    it("returns 1.0 (100% transmission) at surface", () => {
      expect(calculateLightAbsorption(0)).toBe(1.0);
    });

    it("drops below 1% transmission past 1,000 m (Bathypelagic)", () => {
      expect(calculateLightAbsorption(1000)).toBeLessThan(0.02);
    });

    it("is completely 0 in the Hadal zone", () => {
      expect(calculateLightAbsorption(6000)).toBe(0);
      expect(calculateLightAbsorption(MAX_DEPTH)).toBe(0);
    });
  });

  describe("calculateWaterTemp", () => {
    it("returns warm surface temperature at 0 m", () => {
      expect(calculateWaterTemp(0)).toBe(26.0);
    });

    it("drops through the thermocline by 1,000 m", () => {
      const temp1000 = calculateWaterTemp(1000);
      expect(temp1000).toBeLessThanOrEqual(4.5);
      expect(temp1000).toBeGreaterThanOrEqual(3.5);
    });

    it("levels out at near-freezing in the deep hadal trench", () => {
      const tempHadal = calculateWaterTemp(MAX_DEPTH);
      expect(tempHadal).toBeLessThanOrEqual(2.0);
      expect(tempHadal).toBeGreaterThanOrEqual(1.5);
    });
  });

  describe("getOceanZone", () => {
    it("classifies depths into their respective oceanographic zones", () => {
      expect(getOceanZone(50).name).toBe("Epipelagic");
      expect(getOceanZone(500).name).toBe("Mesopelagic");
      expect(getOceanZone(2500).name).toBe("Bathypelagic");
      expect(getOceanZone(5000).name).toBe("Abyssopelagic");
      expect(getOceanZone(10000).name).toBe("Hadopelagic");
    });
  });

  describe("depthToProgress and progressToDepth", () => {
    it("converts depth to 0-1 progress correctly", () => {
      expect(depthToProgress(0)).toBe(0);
      expect(depthToProgress(MAX_DEPTH)).toBe(1);
      expect(depthToProgress(MAX_DEPTH / 2)).toBeCloseTo(0.5, 2);
    });

    it("inverts progress to depth accurately", () => {
      expect(progressToDepth(0)).toBe(0);
      expect(progressToDepth(1)).toBe(MAX_DEPTH);
      expect(progressToDepth(0.5)).toBeCloseTo(MAX_DEPTH / 2, 0);
    });
  });
});
