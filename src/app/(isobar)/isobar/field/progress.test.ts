import { describe, expect, it } from "vitest";
import { clamp, fieldTransect, lerp, progress, sampleTransect } from "./progress";

describe("isobar field progress maths", () => {
  it("clamps values to an inclusive range", () => {
    expect(clamp(-2, 0, 1)).toBe(0);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
    expect(clamp(3, 0, 1)).toBe(1);
  });

  it("linearly interpolates without changing the supplied parameter", () => {
    expect(lerp(0, 100, 0.25)).toBe(25);
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
    expect(lerp(10, 20, 1.5)).toBe(25);
  });

  it("maps scroll values to clamped progress", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(-10, 0, 100)).toBe(0);
    expect(progress(140, 0, 100)).toBe(1);
    expect(progress(5, 5, 5)).toBe(1);
    expect(progress(4, 5, 5)).toBe(0);
  });

  const stops = [
    { x: 0, y: 10, z: 0, twist: 0, spread: 1 },
    { x: 10, y: 0, z: -5, twist: 90, spread: 2 },
    { x: 20, y: 20, z: 10, twist: 180, spread: 1.5 },
  ] as const;

  it("samples an evenly spaced 3D transect", () => {
    expect(fieldTransect(stops, 0)).toEqual({
      x: 0,
      y: 10,
      z: 0,
      twist: 0,
      spread: 1,
      segment: 0,
      segmentProgress: 0,
    });
    expect(fieldTransect(stops, 0.25)).toEqual({
      x: 5,
      y: 5,
      z: -2.5,
      twist: 45,
      spread: 1.5,
      segment: 0,
      segmentProgress: 0.5,
    });
    expect(fieldTransect(stops, 0.75)).toEqual({
      x: 15,
      y: 10,
      z: 2.5,
      twist: 135,
      spread: 1.75,
      segment: 1,
      segmentProgress: 0.5,
    });
  });

  it("clamps transect samples at both ends and supports progress-first calls", () => {
    expect(fieldTransect(stops, -1).x).toBe(0);
    expect(fieldTransect(2, stops).x).toBe(20);
    expect(sampleTransect(0.5, stops)).toEqual({
      x: 10,
      y: 0,
      z: -5,
      twist: 90,
      spread: 2,
      segment: 1,
      segmentProgress: 0,
    });
  });

  it("uses explicit stop positions for an uneven transect", () => {
    const uneven = [
      { at: 0, x: 0, y: 0, z: 0 },
      { at: 0.8, x: 8, y: 16, z: 0 },
      { at: 1, x: 10, y: 20, z: 4 },
    ];
    expect(fieldTransect(uneven, 0.4)).toEqual({
      x: 4,
      y: 8,
      z: 0,
      twist: 0,
      spread: 1,
      segment: 0,
      segmentProgress: 0.5,
    });
  });

  it("rejects an empty transect instead of returning an invalid frame", () => {
    expect(() => fieldTransect([], 0.5)).toThrow("at least one stop");
  });
});
