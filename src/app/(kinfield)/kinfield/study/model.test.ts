import { describe, expect, it } from "vitest";
import { levels, routines, validatePreview, moveLevel } from "./model";

describe("movement study", () => {
  it("offers distinct, timed three-step practices for every zone and level", () => {
    for (const zone of ["shoulders", "hips", "spine"] as const) {
      expect(new Set(levels.map((level) => routines[zone][level].steps.join("|"))).size).toBe(3);
      expect(levels.map((level) => routines[zone][level].minutes)).toEqual([6, 9, 12]);
      for (const level of levels) expect(routines[zone][level].steps).toHaveLength(3);
    }
  });

  it("bounds keyboard level changes", () => {
    expect(moveLevel("new", -1)).toBe("new");
    expect(moveLevel("new", 1)).toBe("familiar");
    expect(moveLevel("experienced", 1)).toBe("experienced");
  });

  it("rejects missing, invalid, and past dates while accepting a selected demo", () => {
    expect(validatePreview("", "groundwork", "2026-11-09")).toBeTruthy();
    expect(validatePreview("2026-02-30", "groundwork", "2026-11-09")).toBeTruthy();
    expect(validatePreview("2026-11-08", "groundwork", "2026-11-09")).toBeTruthy();
    expect(validatePreview("2026-11-10", "", "2026-11-09")).toBeTruthy();
    expect(validatePreview("2026-11-10", "groundwork", "2026-11-09")).toBe("");
  });
});
