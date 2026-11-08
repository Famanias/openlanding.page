import { describe, it, expect } from "vitest";
import { allocate, readPlan, signupHref } from "./model";

describe("Pello balance plans", () => {
  it("gives a balanced plan a place for every cent", () => {
    expect(allocate("balanced", 48000)).toEqual({ everyday: 120000, rainy: 72000, weekend: 48000 });
  });
  it("puts a larger cushion aside for the rainy day plan", () => {
    expect(allocate("steady", 24000)).toEqual({ everyday: 108000, rainy: 108000, weekend: 24000 });
  });
  it("bounds contributions and never invents or loses money", () => {
    expect(allocate("balanced", -500).weekend).toBe(0);
    expect(allocate("adventure", 999999)).toEqual({ everyday: 72000, rainy: 48000, weekend: 120000 });
    expect(allocate("balanced", NaN).weekend).toBe(48000);
    expect(allocate("unknown", 48000).rainy).toBe(72000);
    const odd = allocate("balanced", 12345.8);
    expect(odd.weekend).toBe(12346);
    expect(odd.everyday + odd.rainy + odd.weekend).toBe(240000);
  });
  it("allowlists shared plans and restores safe defaults", () => {
    expect(readPlan(new URLSearchParams("plan=adventure&goal=840"))).toEqual({ plan: "adventure", goal: 84000 });
    expect(readPlan(new URLSearchParams("plan=bad&goal=oops"))).toEqual({ plan: "balanced", goal: 48000 });
    expect(signupHref("steady", 24000)).toBe("/templates/pello?plan=steady&goal=240#begin");
  });
});
