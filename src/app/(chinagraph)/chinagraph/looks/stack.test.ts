import { describe, expect, it } from "vitest";
import { activeLook, lookArrivals, lookFlash } from "./stack";

describe("CHINAGRAPH look stack", () => {
  it("has the first look already in place and the rest sliding over one viewport each", () => {
    // container at y=5000, viewport 1000 px, six looks
    expect(lookArrivals(4000, 5000, 1000, 6)).toEqual([1, 0, 0, 0, 0, 0]);
    expect(lookArrivals(5500, 5000, 1000, 6)).toEqual([1, 0.5, 0, 0, 0, 0]);
    expect(lookArrivals(7250, 5000, 1000, 6)).toEqual([1, 1, 1, 0.25, 0, 0]);
    expect(lookArrivals(99999, 5000, 1000, 6)).toEqual([1, 1, 1, 1, 1, 1]);
  });

  it("can hold the first look for extra viewports before the next one arrives", () => {
    // lead = 1: look 1 holds while the sheet scrolls away, then look 2 slides over during the second viewport
    expect(lookArrivals(5500, 5000, 1000, 3, 1)).toEqual([1, 0, 0]);
    expect(lookArrivals(6500, 5000, 1000, 3, 1)).toEqual([1, 0.5, 0]);
    expect(lookArrivals(8000, 5000, 1000, 3, 1)).toEqual([1, 1, 1]);
  });

  it("names the look that holds most of the screen", () => {
    expect(activeLook([1, 0, 0])).toBe(0);
    expect(activeLook([1, 0.49, 0])).toBe(0);
    expect(activeLook([1, 0.5, 0])).toBe(1);
    expect(activeLook([1, 1, 0.8])).toBe(2);
  });

  it("strobes as a look lands and is dark again once it has arrived", () => {
    expect(lookFlash(0)).toBe(0);
    expect(lookFlash(0.5)).toBe(0);
    expect(lookFlash(0.9)).toBeGreaterThan(0.9);
    // arrival clamps at 1: a strobe still lit there would stay on screen
    expect(lookFlash(1)).toBe(0);
  });

  it("guards a zero viewport", () => {
    expect(lookArrivals(10, 0, 0, 3)).toEqual([1, 1, 1]);
  });
});
