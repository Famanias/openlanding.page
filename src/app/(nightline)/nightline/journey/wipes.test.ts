import { describe, expect, it } from "vitest";
import { MAX_WIPES, createWipes, pushWipe } from "./wipes";

describe("nightline wipe buffer", () => {
  it("starts empty so no glass is cleared before the pointer moves", () => {
    const wipes = createWipes();
    expect(wipes.starts).toHaveLength(MAX_WIPES * 4);
    expect(wipes.ends).toHaveLength(MAX_WIPES * 2);
    expect(Array.from(wipes.starts).every((value) => value === 0)).toBe(true);
  });

  it("records a segment with its start time and full strength", () => {
    const wipes = createWipes();
    pushWipe(wipes, { x: 0.2, y: 0.3 }, { x: 0.4, y: 0.5 }, 12);
    expect(Array.from(wipes.starts.slice(0, 4))).toEqual([expect.closeTo(0.2), expect.closeTo(0.3), 12, 1]);
    expect(Array.from(wipes.ends.slice(0, 2))).toEqual([expect.closeTo(0.4), expect.closeTo(0.5)]);
  });

  it("wraps around so only the most recent segments survive", () => {
    const wipes = createWipes();
    for (let i = 0; i < MAX_WIPES + 3; i++) pushWipe(wipes, { x: 0, y: 0 }, { x: 1, y: 1 }, i);
    expect(wipes.starts[2]).toBe(MAX_WIPES);
    expect(wipes.starts[6]).toBe(MAX_WIPES + 1);
    expect(wipes.starts[(MAX_WIPES - 1) * 4 + 2]).toBe(MAX_WIPES - 1);
  });

  it("ignores segments too short to be a deliberate stroke", () => {
    const wipes = createWipes();
    expect(pushWipe(wipes, { x: 0.5, y: 0.5 }, { x: 0.5001, y: 0.5 }, 1)).toBe(false);
    expect(wipes.starts[3]).toBe(0);
  });
});
