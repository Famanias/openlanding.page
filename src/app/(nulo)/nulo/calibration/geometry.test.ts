import { describe, expect, it } from "vitest";
import { focusState, modeAt, normalizeAngle, snapAngle, type CalibrationMode } from "./geometry";

describe("calibration geometry", () => {
  it("normalizes a dial angle into one revolution", () => {
    expect(normalizeAngle(-30)).toBe(330);
    expect(normalizeAngle(390)).toBe(30);
    expect(normalizeAngle(720)).toBe(0);
  });

  it("maps three equal dial sectors to readable modes", () => {
    expect(modeAt(0)).toBe("screen");
    expect(modeAt(119.9)).toBe("screen");
    expect(modeAt(120)).toBe("street");
    expect(modeAt(239.9)).toBe("street");
    expect(modeAt(240)).toBe("night");
    expect(modeAt(-1)).toBe("night");
  });

  it("snaps an arbitrary angle to the nearest calibration marker", () => {
    expect(snapAngle(12)).toBe(0);
    expect(snapAngle(118)).toBe(120);
    expect(snapAngle(247)).toBe(240);
    expect(snapAngle(359)).toBe(0);
  });

  it("returns bounded focus values for every mode", () => {
    const modes: CalibrationMode[] = ["screen", "street", "night"];
    for (const mode of modes) {
      const state = focusState(mode, 100);
      expect(state.mode).toBe(mode);
      expect(state.aperture).toBeGreaterThanOrEqual(0.2);
      expect(state.aperture).toBeLessThanOrEqual(0.86);
      expect(state.transmission).toBeGreaterThanOrEqual(0.58);
      expect(state.transmission).toBeLessThanOrEqual(0.96);
    }
  });
});
