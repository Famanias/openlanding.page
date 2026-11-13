import { describe, expect, it } from "vitest";
import {
  activePassForProgress,
  computeExplosionOffsets,
  computePassBudget,
  RENDER_PASSES,
} from "./passes";
import { ALL_PASS_IDS, INITIAL_PIPELINE_STATE, pipelineReducer } from "./state";

describe("datum pipeline math and state", () => {
  it("computes compressed stack offsets at rest and separated offsets at full scroll", () => {
    const rest = computeExplosionOffsets(0, 0);
    expect(rest).toHaveLength(5);
    expect(rest[0].zOffset).toBeCloseTo(-0.16, 4);
    expect(rest[2].zOffset).toBe(0);
    expect(rest[4].zOffset).toBeCloseTo(0.16, 4);

    const exploded = computeExplosionOffsets(1, 2);
    expect(exploded[0].zOffset).toBeCloseTo(-2.1, 3);
    expect(exploded[2].zOffset).toBe(0);
    expect(exploded[2].liftY).toBeCloseTo(0.24, 3);
    expect(exploded[2].opacity).toBe(1);
    expect(exploded[0].opacity).toBeCloseTo(0.72, 2);
    expect(exploded[4].zOffset).toBeCloseTo(2.1, 3);
  });

  it("maps scroll progress cleanly into the 5 active render passes", () => {
    expect(activePassForProgress(0)).toBe(0);
    expect(activePassForProgress(0.25)).toBe(1);
    expect(activePassForProgress(0.5)).toBe(2);
    expect(activePassForProgress(0.75)).toBe(3);
    expect(activePassForProgress(1)).toBe(4);
  });

  it("calculates frame budget, bottleneck, and over-budget thresholds", () => {
    const baseline = computePassBudget(ALL_PASS_IDS, 1.0, 60);
    expect(baseline.totalMs).toBeCloseTo(11.1, 1);
    expect(baseline.overBudget).toBe(false);
    expect(baseline.bottleneckId).toBe("shadows");
    expect(baseline.totalDrawCalls).toBe(444);
    expect(baseline.totalVramMb).toBe(256);

    const highRes = computePassBudget(ALL_PASS_IDS, 1.75, 60);
    expect(highRes.totalMs).toBeGreaterThan(16.6);
    expect(highRes.overBudget).toBe(true);

    const target120 = computePassBudget(ALL_PASS_IDS, 1.0, 120);
    expect(target120.targetMs).toBe(8.3);
    expect(target120.overBudget).toBe(true);

    const trimmed = computePassBudget(["geometry", "composite"], 1.0, 120);
    expect(trimmed.overBudget).toBe(false);
    expect(trimmed.totalMs).toBeCloseTo(3.3, 1);
  });

  it("handles pipelineReducer updates, clamping, stepping, and reset", () => {
    let state = INITIAL_PIPELINE_STATE;
    expect(RENDER_PASSES).toHaveLength(5);

    state = pipelineReducer(state, { type: "stepPass", delta: -1 });
    expect(state.activePassId).toBe("composite");

    state = pipelineReducer(state, { type: "stepPass", delta: 1 });
    expect(state.activePassId).toBe("geometry");

    state = pipelineReducer(state, { type: "setResolutionScale", scale: 9.9 });
    expect(state.resolutionScale).toBe(2.0);

    state = pipelineReducer(state, { type: "togglePassEnabled", passId: "shadows" });
    expect(state.enabledPassIds).not.toContain("shadows");

    state = pipelineReducer(state, { type: "toggleExploded" });
    expect(state.exploded).toBe(true);

    const reset = pipelineReducer(state, { type: "reset" });
    expect(reset.exploded).toBe(false);
    expect(reset.resolutionScale).toBe(1.0);
    expect(reset.enabledPassIds).toEqual(ALL_PASS_IDS);
    expect(reset.resetTick).toBe(1);
  });
});
