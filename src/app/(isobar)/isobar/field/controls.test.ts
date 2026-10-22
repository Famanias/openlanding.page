import { describe, expect, it } from "vitest";
import {
  CHAMBERS,
  DEFAULT_WEATHER_MAP,
  chamberForProgress,
  clampSlider,
  mapSliderStateToFieldTuning,
  updateWeatherMap,
} from "./controls";

describe("isobar transect chambers", () => {
  it("exposes the four ordered chambers", () => {
    expect(CHAMBERS.map((chamber) => chamber.label)).toEqual([
      "Surface",
      "Shear",
      "Cross-section",
      "Calm",
    ]);
    expect(CHAMBERS.map((chamber) => chamber.number)).toEqual([
      "01 / 04",
      "02 / 04",
      "03 / 04",
      "04 / 04",
    ]);
  });

  it("selects a chamber and local progress from a clamped scroll value", () => {
    expect(chamberForProgress(-0.2)).toMatchObject({ id: "surface", index: 0, localProgress: 0 });
    expect(chamberForProgress(0.125)).toMatchObject({ id: "surface", index: 0, localProgress: 0.5 });
    expect(chamberForProgress(0.25)).toMatchObject({ id: "shear", index: 1, localProgress: 0 });
    expect(chamberForProgress(0.68).localProgress).toBeCloseTo(0.72);
    expect(chamberForProgress(0.68)).toMatchObject({ id: "cross-section", index: 2 });
    expect(chamberForProgress(1.2)).toMatchObject({ id: "calm", index: 3, localProgress: 1 });
  });
});

describe("weather-map controls", () => {
  it("clamps finite slider values and normalises invalid input", () => {
    expect(clampSlider(-4)).toBe(0);
    expect(clampSlider(42.5)).toBe(42.5);
    expect(clampSlider(110)).toBe(100);
    expect(clampSlider(Number.NaN)).toBe(0);
    expect(clampSlider(Number.POSITIVE_INFINITY)).toBe(100);
    expect(clampSlider(Number.NEGATIVE_INFINITY)).toBe(0);
  });

  it("updates one slider immutably while preserving the other controls", () => {
    const next = updateWeatherMap(DEFAULT_WEATHER_MAP, "drift", 88);
    expect(next).toEqual({ density: 62, drift: 88, contour: 74 });
    expect(DEFAULT_WEATHER_MAP).toEqual({ density: 62, drift: 38, contour: 74 });
    expect(updateWeatherMap(next, "density", -20).density).toBe(0);
    expect(updateWeatherMap(next, "contour", 140).contour).toBe(100);
  });

  it("maps the slider state to stable field tuning values", () => {
    const quiet = mapSliderStateToFieldTuning({ density: 0, drift: 0, contour: 0 });
    const full = mapSliderStateToFieldTuning({ density: 100, drift: 100, contour: 100 });

    expect(quiet).toMatchObject({ density: 0, drift: 0, contour: 0 });
    expect(full).toMatchObject({ density: 100, drift: 100, contour: 100 });
    expect(full.frequency).toBeGreaterThan(quiet.frequency);
    expect(full.speed).toBeGreaterThan(quiet.speed);
    expect(full.depth).toBeGreaterThan(quiet.depth);
    expect(full.amplitude).toBeGreaterThan(quiet.amplitude);
    expect(mapSliderStateToFieldTuning({ density: -1, drift: 101, contour: Number.NaN })).toMatchObject({
      density: 0,
      drift: 100,
      contour: 0,
    });
  });
});
