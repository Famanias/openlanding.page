import { describe, expect, it } from "vitest";
import { soundParams } from "./mapping";

const base = { tide: 0, roughness: 0, calm: 0, p: 0 };

describe("soundParams", () => {
  it("opens the surf filter with the tide", () => {
    expect(soundParams(base).surfCutoffHz).toBe(300);
    expect(soundParams({ ...base, tide: 1 }).surfCutoffHz).toBe(1800);
  });

  it("adds brightness and grit when the sea is rough", () => {
    expect(soundParams({ ...base, roughness: 1 }).surfCutoffHz).toBe(300 + 2500);
    expect(soundParams({ ...base, roughness: 1 }).grit).toBe(1);
    expect(soundParams(base).grit).toBe(0);
  });

  it("slows the pad through the night", () => {
    expect(soundParams(base).padTempoBpm).toBe(52);
    expect(soundParams({ ...base, p: 1 }).padTempoBpm).toBe(36);
  });

  it("quietens the surf by 6 dB when the visitor is still", () => {
    expect(soundParams(base).surfGainDb - soundParams({ ...base, calm: 1 }).surfGainDb).toBeCloseTo(6, 10);
  });

  it("clamps out-of-range inputs", () => {
    expect(soundParams({ tide: 2, roughness: -1, calm: 3, p: 5 })).toEqual(soundParams({ tide: 1, roughness: 0, calm: 1, p: 1 }));
  });
});
