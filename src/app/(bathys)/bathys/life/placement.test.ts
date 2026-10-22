import { describe, expect, it } from "vitest";
import { placeCreature, travelX } from "./placement";

const base = { docMax: 7000, vh: 900, parallax: 0.7 };

describe("placeCreature", () => {
  it("centres the creature when its depth is reached", () => {
    const p = placeCreature({ ...base, center: 0.5, scrollY: 3500 });
    expect(p.y).toBeCloseTo(450);
    expect(p.visibility).toBe(1);
    expect(p.progress).toBeCloseTo(0.5);
  });

  it("is invisible long before and long after its depth", () => {
    expect(placeCreature({ ...base, center: 0.5, scrollY: 500 }).visibility).toBe(0);
    expect(placeCreature({ ...base, center: 0.5, scrollY: 6500 }).visibility).toBe(0);
  });

  it("rises up the screen as you scroll down, slower than the page", () => {
    const a = placeCreature({ ...base, center: 0.5, scrollY: 3200 });
    const b = placeCreature({ ...base, center: 0.5, scrollY: 3400 });
    expect(b.y).toBeLessThan(a.y);
    expect(a.y - b.y).toBeCloseTo(200 * base.parallax);
    expect(b.progress).toBeGreaterThan(a.progress);
  });

  it("fades in and out smoothly and never leaves [0, 1]", () => {
    let last = 0;
    for (let y = 2000; y <= 3500; y += 50) {
      const v = placeCreature({ ...base, center: 0.5, scrollY: y }).visibility;
      expect(v).toBeGreaterThanOrEqual(last - 1e-9);
      expect(v).toBeLessThanOrEqual(1);
      last = v;
    }
  });
});

describe("travelX", () => {
  it("runs between the two anchors and stays monotonic", () => {
    expect(travelX(0, 0.9, 0.2, 1000)).toBeCloseTo(900);
    expect(travelX(1, 0.9, 0.2, 1000)).toBeCloseTo(200);
    let last = Infinity;
    for (let p = 0; p <= 1; p += 0.05) {
      const x = travelX(p, 0.9, 0.2, 1000);
      expect(x).toBeLessThanOrEqual(last + 1e-9);
      last = x;
    }
  });
});
