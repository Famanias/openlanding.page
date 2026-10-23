import { describe, expect, it } from "vitest";
import { contourPoint, rainfallAt, progressAtRainfall, waterBudget, watershedPhase } from "./water";

describe("RILL watershed maths", () => {
  it("maps scroll progress to an integer rainfall value", () => {
    expect(rainfallAt(0)).toBe(0);
    expect(rainfallAt(0.525)).toBe(42);
    expect(rainfallAt(1)).toBe(80);
    expect(rainfallAt(-1)).toBe(0);
  });

  it("maps the rain gauge back to scroll progress", () => {
    expect(progressAtRainfall(42)).toBe(0.525);
    expect(progressAtRainfall(-5)).toBe(0);
    expect(progressAtRainfall(100)).toBe(1);
  });

  it("changes phase at the ridge, swale, storage and root-zone handoffs", () => {
    expect(watershedPhase(0.1)).toBe("ridge");
    expect(watershedPhase(0.25)).toBe("swale");
    expect(watershedPhase(0.6)).toBe("storage");
    expect(watershedPhase(0.9)).toBe("root-zone");
  });

  it("marks the 42 mm threshold as ready", () => {
    expect(waterBudget(0)).toMatchObject({ runoff: 0, storage: 0, rootZone: 0, status: "dry" });
    expect(waterBudget(30).status).toBe("holding");
    expect(waterBudget(42).status).toBe("ready");
    expect(waterBudget(42).rootZone).toBeGreaterThan(waterBudget(30).rootZone);
  });

  it("returns a deterministic contour point for the animated drop", () => {
    expect(contourPoint(0)).toEqual({ x: 8, y: 18 });
    expect(contourPoint(1)).toEqual({ x: 92, y: 82 });
    expect(contourPoint(0.5).x).toBeGreaterThan(8);
    expect(contourPoint(0.5).y).toBeGreaterThan(18);
  });
});

