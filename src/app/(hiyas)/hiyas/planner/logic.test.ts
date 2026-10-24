import { describe, expect, it } from "vitest";
import { PEAKS, INITIAL_PLANNER_STATE, altitudeAt, campStops, clampPlannerDays, plannerReducer, plannerSummary, routeSegment } from "./logic";

describe("HIYAS route planner", () => {
  it("contains fourteen eight-thousand metre peaks with exact elevations", () => {
    expect(PEAKS).toHaveLength(14);
    expect(PEAKS.find((peak) => peak.id === "everest")?.elevation).toBe(8849);
    expect(PEAKS.find((peak) => peak.id === "shishapangma")?.elevation).toBe(8027);
  });

  it("clamps planning days to a safe input range", () => {
    expect(clampPlannerDays(2)).toBe(14);
    expect(clampPlannerDays(21)).toBe(21);
    expect(clampPlannerDays(88)).toBe(70);
  });

  it("maps route progress to named expedition segments", () => {
    expect(routeSegment(0.1)).toBe("approach");
    expect(routeSegment(0.35)).toBe("acclimatize");
    expect(routeSegment(0.76)).toBe("summit");
    expect(routeSegment(0.95)).toBe("return");
  });

  it("keeps the altitude profile monotonic and capped at the peak", () => {
    const values = [0, 0.25, 0.5, 0.75, 1].map((progress) => altitudeAt(progress, 8849));
    expect(values[0]).toBeGreaterThan(0);
    expect(values[4]).toBe(8849);
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });

  it("returns stable camp markers for a selected planning band", () => {
    const stops = campStops(8849, 21, "guided");
    expect(stops.map((stop) => stop.label)).toEqual(["Base camp", "Camp 1", "Camp 2", "Summit"]);
    expect(stops.at(-1)?.altitude).toBe(8849);
    expect(stops.every((stop) => stop.progress >= 0 && stop.progress <= 1)).toBe(true);
  });

  it("reduces planner actions to one predictable state", () => {
    const selected = plannerReducer(INITIAL_PLANNER_STATE, { type: "selectPeak", peakId: "k2" });
    const days = plannerReducer(selected, { type: "setDays", days: 34 });
    const support = plannerReducer(days, { type: "setSupport", support: "private" });
    const locked = plannerReducer(support, { type: "lockPlan" });
    expect(locked).toMatchObject({ peakId: "k2", days: 34, support: "private", locked: true });
    expect(plannerSummary(locked)).toMatchObject({ peakId: "k2", days: 34, support: "private" });
  });
});

