import { describe, expect, it } from "vitest";
import { clamp, easeOutCubic, isSettled, lerp, progress, springStep, staggerDelay } from "./math";

describe("motion math", () => {
  it("clamps and lerps", () => {
    expect(clamp(5, 0, 1)).toBe(1);
    expect(clamp(-5, 0, 1)).toBe(0);
    expect(lerp(10, 20, 0.5)).toBe(15);
  });

  it("computes progress and tolerates a zero-width range", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(200, 0, 100)).toBe(1);
    expect(progress(5, 10, 10)).toBe(0);
  });

  it("caps stagger delay", () => {
    expect(staggerDelay(2, 70)).toBe(140);
    expect(staggerDelay(50, 70)).toBe(600);
    expect(staggerDelay(-3, 70)).toBe(0);
  });

  it("eases out from 0 to 1", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });

  it("springs to the target and settles", () => {
    let state = { value: 0, velocity: 0 };
    for (let i = 0; i < 240; i += 1) state = springStep(state, 100, 1 / 60);
    expect(isSettled(state, 100)).toBe(true);
  });

  it("overshoots slightly (an underdamped plug seating)", () => {
    let state = { value: 0, velocity: 0 };
    let peak = 0;
    for (let i = 0; i < 120; i += 1) {
      state = springStep(state, 100, 1 / 60);
      peak = Math.max(peak, state.value);
    }
    expect(peak).toBeGreaterThan(100);
  });

  it("stays finite after a long throttled frame", () => {
    const state = springStep({ value: 0, velocity: 0 }, 100, 5);
    expect(Number.isFinite(state.value)).toBe(true);
  });
});
