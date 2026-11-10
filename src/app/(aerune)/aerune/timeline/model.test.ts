import { describe, expect, it } from "vitest";
import { AIR_MOMENTS, getMoment, nextMomentIndex } from "./model";

describe("building day timeline", () => {
  it("uses distinct, labeled example readings for each moment", () => {
    expect(AIR_MOMENTS.map(({ label, co2, people, airflow }) => [label, co2, people, airflow])).toEqual([
      ["Arrival", 620, 38, 61],
      ["Meeting peak", 980, 86, 89],
      ["Evening", 530, 12, 34],
    ]);
  });

  it("rounds and clamps arbitrary timeline input to an existing moment", () => {
    expect(getMoment(-20).label).toBe("Arrival");
    expect(getMoment(1.2).label).toBe("Meeting peak");
    expect(getMoment(99).label).toBe("Evening");
    expect(getMoment(Number.NaN).label).toBe("Arrival");
  });

  it("moves between stops without wrapping past the ends", () => {
    expect(nextMomentIndex(0, -1)).toBe(0);
    expect(nextMomentIndex(0, 1)).toBe(1);
    expect(nextMomentIndex(2, 1)).toBe(2);
  });
});
