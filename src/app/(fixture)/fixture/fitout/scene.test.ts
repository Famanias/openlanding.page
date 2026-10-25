import { describe, expect, it } from "vitest";
import { INTRO, STAGES, STAGE_SPAN, readoutAt, scrollTargetFor, stageIndexAt, stageLocal, stageStart } from "./scene";

describe("FIXTURE fit-out scene", () => {
  it("has five stages that fill the scene after the intro", () => {
    expect(STAGES.map((stage) => stage.id)).toEqual(["shell", "fixtures", "wiring", "signage", "open"]);
    expect(INTRO + STAGES.length * STAGE_SPAN).toBeLessThanOrEqual(1);
    expect(stageStart(1)).toBe(INTRO);
  });

  it("starts on the empty plot and ends open", () => {
    expect(stageIndexAt(0)).toBe(0);
    expect(stageIndexAt(INTRO - 0.001)).toBe(0);
    expect(stageIndexAt(INTRO)).toBe(1);
    expect(stageIndexAt(stageStart(3) + 0.01)).toBe(3);
    expect(stageIndexAt(0.999)).toBe(5);
    expect(stageIndexAt(1)).toBe(5);
    expect(stageIndexAt(-1)).toBe(0);
  });

  it("reports progress inside one stage", () => {
    expect(stageLocal(stageStart(2), 2)).toBe(0);
    expect(stageLocal(stageStart(2) + STAGE_SPAN / 2, 2)).toBeCloseTo(0.5);
    expect(stageLocal(1, 2)).toBe(1);
    expect(stageLocal(0, 2)).toBe(0);
    expect(stageLocal(0.5, 0)).toBe(1);
  });

  it("drives the store readout from the scene", () => {
    const start = readoutAt(0);
    expect(start).toEqual({ loadSeconds: 4.1, conversion: 0.9, orders: 0, checks: 0 });

    const mid = readoutAt(stageStart(3) + STAGE_SPAN / 2);
    expect(mid.loadSeconds).toBeLessThan(4.1);
    expect(mid.loadSeconds).toBeGreaterThan(1.2);
    expect(mid.conversion).toBe(0.9);
    expect(mid.checks).toBe(2);

    const end = readoutAt(1);
    expect(end).toEqual({ loadSeconds: 1.2, conversion: 2.8, orders: 38, checks: 5 });
  });

  it("rounds readout values for display", () => {
    const value = readoutAt(stageStart(4) + 0.013);
    expect(Number.isInteger(value.loadSeconds * 10)).toBe(true);
    expect(Number.isInteger(value.conversion * 10)).toBe(true);
  });

  it("finds the scroll position that shows a stage", () => {
    // scene at document y=1000, 6000 px tall, 1000 px viewport → 5000 px of travel
    expect(scrollTargetFor(0, 1000, 6000, 1000)).toBe(1000);
    const target = scrollTargetFor(3, 1000, 6000, 1000);
    expect(stageIndexAt((target - 1000) / 5000)).toBe(3);
    const last = scrollTargetFor(5, 1000, 6000, 1000);
    expect(stageIndexAt((last - 1000) / 5000)).toBe(5);
  });
});
