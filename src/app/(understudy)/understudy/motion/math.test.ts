import { describe, expect, it } from "vitest";
import { clamp, lerp, range, stagger, wrap } from "./math";

describe("motion math", () => {
  it("clamps into a range", () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("interpolates", () => {
    expect(lerp(0, 10, 0.25)).toBe(2.5);
    expect(lerp(4, 4, 0.9)).toBe(4);
  });

  it("maps a slice of progress to 0..1", () => {
    expect(range(0.5, 0.4, 0.6)).toBeCloseTo(0.5);
    expect(range(0.1, 0.4, 0.6)).toBe(0);
    expect(range(0.9, 0.4, 0.6)).toBe(1);
    expect(range(0.5, 0.5, 0.5)).toBe(1);
  });

  it("wraps into a period, including negatives", () => {
    expect(wrap(12, 10)).toBe(2);
    expect(wrap(-3, 10)).toBe(7);
    expect(wrap(0, 10)).toBe(0);
  });

  it("staggers and caps the total delay", () => {
    expect(stagger(0, 70)).toBe(0);
    expect(stagger(3, 70)).toBe(210);
    expect(stagger(20, 70, 600)).toBe(600);
  });
});
