import { describe, expect, it } from "vitest";
import { BENCH_STOPS, benchReducer, benchSnapshot, clamp01, sampleAt, type BenchState } from "./state";

describe("lucentra bench state", () => {
  it("clamps progress to the usable range", () => {
    expect(clamp01(-2)).toBe(0);
    expect(clamp01(0.4)).toBe(0.4);
    expect(clamp01(2)).toBe(1);
  });

  it("interpolates the specimen at the first and last stops", () => {
    expect(sampleAt(0).label).toBe("clear");
    expect(sampleAt(1).label).toBe("ready");
    expect(sampleAt(0.5).progress).toBeCloseTo(0.5);
  });

  it("keeps reducer state bounded and ignores unknown presets", () => {
    const initial: BenchState = { progress: 0, preset: "quartz", active: 0 };
    const moved = benchReducer(initial, { type: "progress", value: 4 });
    expect(moved.progress).toBe(1);
    expect(benchReducer(moved, { type: "preset", id: "missing" })).toEqual(moved);
  });

  it("returns a stable readout for every named stop", () => {
    for (const stop of BENCH_STOPS) {
      const snapshot = benchSnapshot(stop.progress, "quartz");
      expect(snapshot.label).toBe(stop.label);
      expect(snapshot.ior).toBeGreaterThan(1);
      expect(snapshot.roughness).toBeGreaterThanOrEqual(0);
    }
  });
});
