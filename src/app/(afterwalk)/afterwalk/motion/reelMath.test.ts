import { describe, expect, it } from "vitest";
import { nextStaticReelOffset, rescaleReelPhase, wrapReelOffset } from "./reelMath";

describe("continuous postcard reel", () => {
  it("wraps both directions to the identical position one photo cycle away", () => {
    expect(wrapReelOffset(0, 500)).toBe(-500);
    expect(wrapReelOffset(-100, 500)).toBe(-600);
    expect(wrapReelOffset(-600, 500)).toBe(-600);
    expect(wrapReelOffset(100, 500)).toBe(-900);
    expect(wrapReelOffset(-500, 500)).toBe(-500);
    expect(wrapReelOffset(-1000, 500)).toBe(-500);
    expect(wrapReelOffset(0, 0)).toBe(0);
    expect(wrapReelOffset(Number.NaN, 500)).toBe(-500);
  });

  it("preserves fractional progress when card sizes change", () => {
    expect(rescaleReelPhase(-125, 500, 800)).toBe(-200);
    expect(rescaleReelPhase(-625, 500, 800)).toBe(-200);
    expect(rescaleReelPhase(125, 500, 800)).toBe(-600);
    expect(rescaleReelPhase(-100, 0, 800)).toBe(0);
  });

  it("wraps the still-view controls at the ends without autoplay", () => {
    expect(nextStaticReelOffset(0, 300, 700, 1)).toBe(300);
    expect(nextStaticReelOffset(600, 300, 700, 1)).toBe(700);
    expect(nextStaticReelOffset(700, 300, 700, 1)).toBe(0);
    expect(nextStaticReelOffset(0, 300, 700, -1)).toBe(700);
    expect(nextStaticReelOffset(400, 300, 700, -1)).toBe(100);
    expect(nextStaticReelOffset(0, 300, 0, 1)).toBe(0);
  });
});
