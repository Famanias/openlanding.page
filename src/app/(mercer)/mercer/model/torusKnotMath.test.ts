import { describe, expect, it } from "vitest";
import { buildGeodesicRibbonGeometry, calculateTorusKnotPoint, generateTorusKnotSamples } from "./torusKnotMath";

describe("procedural (2,3) torus knot", () => {
  it("closes after one period and preserves a clear central aperture", () => {
    expect(calculateTorusKnotPoint(0).distanceTo(calculateTorusKnotPoint(2 * Math.PI))).toBeLessThan(1e-10);
    const points = generateTorusKnotSamples(120);
    expect(points).toHaveLength(120);
    for (const point of points) {
      expect(Math.hypot(point.x, point.y)).toBeGreaterThan(1.3);
      expect(Math.hypot(point.x, point.y)).toBeLessThan(2.7);
    }
  });

  it("builds a finite, indexed ribbon with matching normals, colors and a closed seam", () => {
    const geometry = buildGeodesicRibbonGeometry(60, 8, 0.45, 0.12);
    const positions = geometry.getAttribute("position");
    expect(positions.count).toBe(61 * 9);
    expect(geometry.getAttribute("normal").count).toBe(positions.count);
    expect(geometry.getAttribute("color").count).toBe(positions.count);
    expect(geometry.getIndex()?.count).toBe(60 * 8 * 6);
    expect(Array.from(positions.array).every(Number.isFinite)).toBe(true);
    for (let column = 0; column <= 8; column++) {
      for (let axis = 0; axis < 3; axis++) {
        expect(positions.array[column * 3 + axis]).toBeCloseTo(positions.array[(60 * 9 + column) * 3 + axis], 5);
      }
    }
    geometry.dispose();
  });

  it("rejects invalid dimensions before allocating geometry", () => {
    expect(() => generateTorusKnotSamples(0)).toThrow(RangeError);
    expect(() => buildGeodesicRibbonGeometry(10, 0, 0.4, 0.1)).toThrow(RangeError);
    expect(() => buildGeodesicRibbonGeometry(20, 8, Infinity, 0.1)).toThrow(RangeError);
  });
});
