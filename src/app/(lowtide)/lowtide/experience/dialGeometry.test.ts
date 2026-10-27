import { describe, expect, it } from "vitest";
import { DIAL, dialPoint, dialProgress } from "./dialGeometry";

describe("moon dial geometry", () => {
  it("round-trips progress through the arc", () => {
    for (const p of [0, 0.2, 0.5, 0.8, 1]) {
      const { x, y } = dialPoint(p);
      expect(dialProgress(x, y)).toBeCloseTo(p, 6);
    }
  });

  it("puts midnight-ish at the top of the dial", () => {
    const { x, y } = dialPoint(0.5);
    expect(x).toBeCloseTo(DIAL.cx, 6);
    expect(y).toBeCloseTo(DIAL.cy - DIAL.r, 6);
  });

  it("clamps pointer positions in the bottom gap to the nearest end", () => {
    expect(dialProgress(DIAL.cx - 5, DIAL.cy + 60)).toBe(0);
    expect(dialProgress(DIAL.cx + 5, DIAL.cy + 60)).toBe(1);
  });
});
