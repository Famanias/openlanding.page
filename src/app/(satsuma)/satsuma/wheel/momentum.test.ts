import { describe, expect, it } from "vitest";
import { advance, assembleBend, decayFling, DRIFT, flingFrom, MAX_FLING, pushSample, RETAINED_PER_SECOND } from "./momentum";

describe("drift", () => {
  it("moves right → left at about 50 units a second", () => {
    expect(DRIFT).toBe(-50);
    expect(advance(0, 0, 1)).toBe(-50);
    expect(advance(100, 0, 0.5)).toBe(75);
  });
});

describe("fling decay", () => {
  it("leaves about 5% of the speed after one second", () => {
    expect(RETAINED_PER_SECOND).toBe(0.05);
    expect(decayFling(1000, 1)).toBeCloseTo(50, 6);
  });

  it("is frame-rate independent: two half-seconds equal one second", () => {
    const once = decayFling(1000, 1);
    const twice = decayFling(decayFling(1000, 0.5), 0.5);
    expect(twice).toBeCloseTo(once, 6);
  });

  it("settles to exactly zero so the drift takes over", () => {
    let v = 800;
    for (let i = 0; i < 400; i++) v = decayFling(v, 1 / 60);
    expect(v).toBe(0);
  });

  it("keeps the direction of the fling", () => {
    expect(decayFling(-500, 0.2)).toBeLessThan(0);
    expect(decayFling(500, 0.2)).toBeGreaterThan(0);
  });
});

describe("flingFrom", () => {
  it("is zero without enough samples", () => {
    expect(flingFrom([])).toBe(0);
    expect(flingFrom([{ t: 0, x: 0 }])).toBe(0);
  });

  it("measures units per second over the last 90ms", () => {
    const samples = [
      { t: 0, x: 0 },
      { t: 100, x: 500 }, // too old to count
      { t: 150, x: 520 },
      { t: 190, x: 560 },
    ];
    // 100→190 is 90ms; 500→560 is 60 units.
    expect(flingFrom(samples)).toBeCloseTo((60 / 90) * 1000, 4);
  });

  it("clamps absurd flicks", () => {
    expect(flingFrom([{ t: 0, x: 0 }, { t: 10, x: 9999 }])).toBe(MAX_FLING);
    expect(flingFrom([{ t: 0, x: 0 }, { t: 10, x: -9999 }])).toBe(-MAX_FLING);
  });

  it("is zero if the pointer stopped before release", () => {
    expect(flingFrom([{ t: 0, x: 10 }, { t: 100, x: 10 }])).toBe(0);
  });
});

describe("pushSample", () => {
  it("drops samples older than the keep window but never below two", () => {
    let s = [{ t: 0, x: 0 }];
    for (let t = 20; t <= 1000; t += 20) s = pushSample(s, { t, x: t });
    expect(s.length).toBeLessThan(14);
    expect(s.length).toBeGreaterThanOrEqual(2);
    expect(pushSample([{ t: 0, x: 0 }], { t: 5000, x: 1 })).toHaveLength(2);
  });
});

describe("assembleBend", () => {
  it("waits, then eases from a flat row to the full cylinder", () => {
    expect(assembleBend(0)).toBe(0);
    expect(assembleBend(450)).toBe(0);
    expect(assembleBend(1000)).toBeGreaterThan(0.5);
    expect(assembleBend(1000)).toBeLessThan(1);
    expect(assembleBend(5000)).toBe(1);
  });
});
