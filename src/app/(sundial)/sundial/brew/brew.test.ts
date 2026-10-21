import { describe, it, expect } from "vitest";
import {
  METHODS,
  getMethod,
  brewRatio,
  yieldPct,
  formatBrewTime,
  type MethodId,
} from "./brew";

describe("brew data", () => {
  it("lists exactly three methods with unique ids", () => {
    expect(METHODS).toHaveLength(3);
    const ids = METHODS.map((m) => m.id);
    expect(new Set(ids).size).toBe(3);
    expect(ids).toEqual(["v60", "aeropress", "espresso"]);
  });

  it("every method has steps and sane numbers", () => {
    for (const m of METHODS) {
      expect(m.steps.length).toBeGreaterThanOrEqual(3);
      expect(m.doseG).toBeGreaterThan(0);
      expect(m.waterG).toBeGreaterThan(0);
      expect(m.tempC).toBeGreaterThan(80);
      expect(m.timeS).toBeGreaterThan(0);
    }
  });
});

describe("getMethod", () => {
  it("finds each method by id", () => {
    for (const id of ["v60", "aeropress", "espresso"] as MethodId[]) {
      expect(getMethod(id).id).toBe(id);
    }
  });

  it("throws on an unknown id", () => {
    expect(() => getMethod("french-press" as MethodId)).toThrow();
  });
});

describe("brewRatio", () => {
  it("formats pour-over ratios to one decimal", () => {
    expect(brewRatio({ doseG: 15, waterG: 250 })).toBe("1:16.7");
    expect(brewRatio({ doseG: 16, waterG: 220 })).toBe("1:13.8");
  });

  it("handles espresso's 1:2", () => {
    expect(brewRatio({ doseG: 18, waterG: 36 })).toBe("1:2.0");
  });
});

describe("yieldPct", () => {
  it("reports the espresso yield as a percentage of the dose", () => {
    expect(yieldPct({ doseG: 18, waterG: 38 })).toBe("211%");
  });
});

describe("formatBrewTime", () => {
  it("formats seconds as m:ss", () => {
    expect(formatBrewTime(28)).toBe("0:28");
    expect(formatBrewTime(90)).toBe("1:30");
    expect(formatBrewTime(165)).toBe("2:45");
  });
});
