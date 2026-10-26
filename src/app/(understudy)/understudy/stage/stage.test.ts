import { describe, expect, it } from "vitest";
import { flowProgress, pinProgress, toneAt, type SceneBox } from "./progress";
import { lensPlace, rowLayout } from "./lens";
import { callbacksAt, digitsOf } from "./odometer";
import { archInset } from "./arch";

describe("pinProgress", () => {
  it("is 0 before the pin, 1 after it, linear while held", () => {
    // a 3000px scene on a 1000px screen holds for 2000px of scroll
    expect(pinProgress(0, 500, 3000, 1000)).toBe(0);
    expect(pinProgress(1500, 500, 3000, 1000)).toBeCloseTo(0.5);
    expect(pinProgress(2500, 500, 3000, 1000)).toBe(1);
    expect(pinProgress(9000, 500, 3000, 1000)).toBe(1);
  });

  it("treats a scene no taller than the screen as passed once reached", () => {
    expect(pinProgress(499, 500, 900, 1000)).toBe(0);
    expect(pinProgress(500, 500, 900, 1000)).toBe(1);
  });
});

describe("flowProgress", () => {
  it("runs from the scene top reaching the line to its bottom reaching it", () => {
    // the reading line sits 60% down a 1000px screen
    expect(flowProgress(0, 1000, 2000, 1000)).toBe(0);
    expect(flowProgress(400, 1000, 2000, 1000)).toBe(0);
    expect(flowProgress(1400, 1000, 2000, 1000)).toBeCloseTo(0.5);
    expect(flowProgress(2400, 1000, 2000, 1000)).toBe(1);
  });
});

describe("toneAt", () => {
  const boxes: SceneBox[] = [
    { top: 0, height: 1000, tone: "light" },
    { top: 1000, height: 2000, tone: "dark" },
    { top: 3000, height: 1000, tone: "light" },
  ];
  it("reports the tone of the scene under the probe line", () => {
    // probe at the bottom of a 1000px screen, where the dock sits
    expect(toneAt(boxes, 0, 1000, 0.9)).toBe("light");
    expect(toneAt(boxes, 600, 1000, 0.9)).toBe("dark");
    expect(toneAt(boxes, 2500, 1000, 0.9)).toBe("light");
  });
  it("falls back to light outside every scene", () => {
    expect(toneAt(boxes, 9000, 1000, 0.9)).toBe("light");
  });
  it("lets a pinned scene hand over its tone part-way through its hold", () => {
    const hero: SceneBox[] = [{ top: 0, height: 3000, tone: "light", darkFrom: 0.4 }];
    expect(toneAt(hero, 400, 1000, 0.5)).toBe("light"); // p = 0.2
    expect(toneAt(hero, 1200, 1000, 0.5)).toBe("dark"); // p = 0.6
  });
});

describe("archInset", () => {
  it("is the small mark at rest and the whole screen when open", () => {
    const rest = archInset(0, 1440, 900, { w: 120, h: 150, y: 600 });
    expect(rest.left).toBeCloseTo(660);
    expect(rest.right).toBeCloseTo(660);
    expect(rest.top).toBeCloseTo(525);
    expect(rest.bottom).toBeCloseTo(225);
    expect(rest.radius).toBeCloseTo(60);
    const open = archInset(1, 1440, 900, { w: 120, h: 150, y: 600 });
    expect(open).toEqual({ top: 0, right: 0, bottom: 0, left: 0, radius: 0 });
  });

  it("grows evenly and never goes negative", () => {
    const half = archInset(0.5, 1440, 900, { w: 120, h: 150, y: 600 });
    expect(half.left).toBeGreaterThan(0);
    expect(half.left).toBeLessThan(660);
    expect(half.top).toBeGreaterThanOrEqual(0);
    expect(half.bottom).toBeGreaterThanOrEqual(0);
  });
});

describe("lens", () => {
  it("leaves the centre flat and lifts the edges into a bowl", () => {
    const mid = lensPlace(0, 700, 1);
    expect(mid.y).toBeCloseTo(0);
    expect(mid.rotate).toBeCloseTo(0);
    expect(mid.scale).toBeCloseTo(1);
    const right = lensPlace(700, 700, 1);
    const left = lensPlace(-700, 700, 1);
    expect(right.y).toBeLessThan(0); // screen y: up is negative
    expect(right.y).toBeCloseTo(left.y);
    expect(right.rotate).toBeLessThan(0); // the right edge climbs, so it turns anticlockwise
    expect(left.rotate).toBeCloseTo(-right.rotate);
    expect(right.scale).toBeLessThan(1);
  });

  it("is flat when the bend is off", () => {
    expect(lensPlace(600, 700, 0)).toEqual({ y: 0, rotate: 0, scale: 1 });
  });

  it("lays a looping row out around the centre", () => {
    const xs = rowLayout(4, 200, 0).map((p) => p.x);
    expect(xs).toEqual([-400, -200, 0, 200]);
    const shifted = rowLayout(4, 200, 250).map((p) => p.x);
    expect(shifted).toEqual([-150, 50, 250, -350]);
    // one whole period puts every item back where it started
    expect(rowLayout(4, 200, 800).map((p) => p.x)).toEqual(xs);
  });
});

describe("odometer", () => {
  it("counts callbacks in even steps across the slice", () => {
    expect(callbacksAt(0, 10)).toBe(0);
    expect(callbacksAt(0.05, 10)).toBe(0);
    expect(callbacksAt(0.1, 10)).toBe(1);
    expect(callbacksAt(0.55, 10)).toBe(5);
    expect(callbacksAt(1, 10)).toBe(10);
  });

  it("splits a count into fixed-width digits", () => {
    expect(digitsOf(7, 2)).toEqual([0, 7]);
    expect(digitsOf(12, 2)).toEqual([1, 2]);
    expect(digitsOf(345, 2)).toEqual([4, 5]);
  });
});
