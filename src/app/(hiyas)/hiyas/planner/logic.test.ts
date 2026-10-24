import { describe, expect, it } from "vitest";
import { PEAKS, INITIAL_PLANNER_STATE, altitudeAt, campStops, plannerReducer, plannerSummary, routeSegment } from "./logic";
import { EXPEDITION_TIMINGS, expeditionTiming } from "./expedition-timings";
import { MOUNTAIN_PROFILES } from "./mountain-profiles";

describe("HIYAS route planner", () => {
  it("contains fourteen eight-thousand metre peaks with exact elevations", () => {
    expect(PEAKS).toHaveLength(14);
    expect(PEAKS.find((peak) => peak.id === "everest")?.elevation).toBe(8849);
    expect(PEAKS.find((peak) => peak.id === "shishapangma")?.elevation).toBe(8027);
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

  it("returns fixed, ordered camp markers for every mountain profile", () => {
    for (const peak of PEAKS) {
      const stops = campStops(MOUNTAIN_PROFILES[peak.id]);
      expect(stops.map((stop) => stop.label)).toEqual(["Base camp", "Camp 1", "Camp 2", "Summit"]);
      expect(stops.at(-1)?.altitude).toBe(peak.elevation);
      expect(stops.every((stop) => stop.progress >= 0 && stop.progress <= 1)).toBe(true);
      const progress = stops.map((stop) => stop.progress);
      expect(progress).toEqual([...progress].sort((a, b) => a - b));
    }
  });

  it("reduces planner actions to one predictable state", () => {
    const selected = plannerReducer(INITIAL_PLANNER_STATE, { type: "selectPeak", peakId: "k2" });
    const support = plannerReducer(selected, { type: "setSupport", support: "private" });
    const locked = plannerReducer(support, { type: "lockPlan" });
    expect(locked).toMatchObject({ peakId: "k2", support: "private", locked: true });
    expect(plannerSummary(locked)).toMatchObject({ peakId: "k2", days: 50, expeditionDuration: "45–55 days", support: "private" });
  });

  it("browses all mountains without changing a locked expedition", () => {
    const locked = { ...INITIAL_PLANNER_STATE, peakId: "k2", support: "private" as const, locked: true };
    const overview = plannerReducer(locked, { type: "setOverview", overview: true });
    expect(overview.overview).toBe(true);
    expect(plannerSummary(overview)).toEqual(plannerSummary(locked));
    expect(plannerReducer(overview, { type: "setOverview", overview: false })).toEqual(locked);
  });

  it("returns to the route when any peak selector chooses a mountain", () => {
    const overview = plannerReducer(INITIAL_PLANNER_STATE, { type: "setOverview", overview: true });
    expect(plannerReducer(overview, { type: "selectPeak", peakId: "manaslu" })).toMatchObject({
      peakId: "manaslu", overview: false, locked: false,
    });
    expect(plannerReducer(overview, { type: "selectPeak", peakId: "unknown" })).toEqual(overview);
  });

  it("provides complete expedition estimates with the summit rotation inside the total", () => {
    expect(Object.keys(EXPEDITION_TIMINGS).sort()).toEqual(PEAKS.map((peak) => peak.id).sort());
    for (const peak of PEAKS) {
      const timing = expeditionTiming(peak.id);
      expect(timing.expedition[0]).toBeLessThanOrEqual(timing.expedition[1]);
      expect(timing.summitPush[0]).toBeGreaterThan(0);
      expect(timing.summitPush[0]).toBeLessThanOrEqual(timing.summitPush[1]);
      expect(timing.summitPush[1]).toBeLessThan(timing.expedition[0]);
    }
    expect(expeditionTiming("constructor")).toBe(EXPEDITION_TIMINGS.everest);
  });

  it("derives fixed estimates from the mountain independently of support and lock state", () => {
    expect(plannerSummary(INITIAL_PLANNER_STATE)).toMatchObject({
      days: 55, expeditionDuration: "50–60 days", summitPushDuration: "4–6 days",
    });
    const manaslu = plannerReducer(INITIAL_PLANNER_STATE, { type: "selectPeak", peakId: "manaslu" });
    const privatePlan = plannerReducer(manaslu, { type: "setSupport", support: "private" });
    const locked = plannerReducer(privatePlan, { type: "lockPlan" });
    expect(plannerSummary(locked)).toMatchObject({
      days: 40, expeditionDuration: "35–45 days", summitPushDuration: "4–6 days",
    });
  });
});

