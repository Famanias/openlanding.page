import { describe, expect, it } from "vitest";
import { FETCH_DURATION, idleBob, throwArc } from "./fetch";

describe("the fetch throw", () => {
  it("starts and ends at rest", () => {
    expect(throwArc(0)).toEqual({ x: 0, y: 0, z: 0, spin: 0 });
    const end = throwArc(1);
    expect(end.x).toBeCloseTo(0, 6);
    expect(end.y).toBeCloseTo(0, 6);
    expect(end.z).toBeCloseTo(0, 6);
  });

  it("never drops below the floor", () => {
    for (let t = 0; t <= 1; t += 0.01) expect(throwArc(t).y).toBeGreaterThanOrEqual(0);
  });

  it("flies high and away, then comes back in from the right with bounces", () => {
    const up = Array.from({ length: 30 }, (_, i) => throwArc(i / 100));
    expect(Math.max(...up.map((p) => p.y))).toBeGreaterThan(1.5);
    expect(Math.min(...up.map((p) => p.z))).toBeLessThan(-2);
    for (const t of [0.65, 0.75, 0.85]) expect(throwArc(t).x).toBeGreaterThan(0);
    // at least two separate touches of the floor on the way back
    let touches = 0;
    let wasUp = true;
    for (let t = 0.55; t < 1; t += 0.002) {
      const low = throwArc(t).y < 0.02;
      if (low && wasUp) touches++;
      wasUp = !low;
    }
    expect(touches).toBeGreaterThanOrEqual(2);
  });

  it("clamps time outside 0..1 and lasts under two seconds", () => {
    expect(throwArc(-1)).toEqual(throwArc(0));
    expect(throwArc(5)).toEqual(throwArc(1));
    expect(FETCH_DURATION).toBeLessThanOrEqual(2);
  });

  it("bobs gently while idle, breathing between bounds", () => {
    for (let t = 0; t < 10; t += 0.1) {
      expect(idleBob(t)).toBeGreaterThanOrEqual(0);
      expect(idleBob(t)).toBeLessThanOrEqual(0.12);
    }
  });
});
