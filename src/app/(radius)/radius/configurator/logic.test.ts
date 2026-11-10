import { describe, expect, it } from "vitest";
import { INITIAL_BUILD, buildReducer, buildSummary } from "./logic";

describe("RADIUS build selections", () => {
  it("starts with the graphite city build and no accessories", () => {
    expect(INITIAL_BUILD).toEqual({
      finish: "graphite",
      tire: "city",
      accessories: { rack: false, basket: false, lights: false },
    });
    expect(buildSummary(INITIAL_BUILD)).toBe("Graphite finish, city tires. No accessories selected.");
  });

  it("changes finish without losing the tire or accessory choices", () => {
    const original = {
      finish: "graphite" as const,
      tire: "gravel" as const,
      accessories: { rack: true, basket: false, lights: true },
    };
    const selected = buildReducer(original, { type: "finish", finish: "cream" });
    expect(selected).toEqual({ ...original, finish: "cream" });
    expect(original.finish).toBe("graphite");
  });

  it("changes tire selection without changing the other selections", () => {
    const selected = buildReducer(INITIAL_BUILD, { type: "tire", tire: "gravel" });
    expect(selected).toEqual({ ...INITIAL_BUILD, tire: "gravel" });
  });

  it("sets each accessory independently and reports the selected items", () => {
    const rack = buildReducer(INITIAL_BUILD, { type: "accessory", accessory: "rack", checked: true });
    const basket = buildReducer(rack, { type: "accessory", accessory: "basket", checked: true });
    const lights = buildReducer(basket, { type: "accessory", accessory: "lights", checked: true });
    const withoutBasket = buildReducer(lights, { type: "accessory", accessory: "basket", checked: false });
    expect(withoutBasket.accessories).toEqual({ rack: true, basket: false, lights: true });
    expect(buildSummary(withoutBasket)).toBe("Graphite finish, city tires. Accessories: rack, lights.");
  });

  it("resets every selection to the original build", () => {
    const changed = {
      finish: "tangerine" as const,
      tire: "gravel" as const,
      accessories: { rack: true, basket: true, lights: true },
    };
    expect(buildSummary(changed)).toBe("Tangerine finish, gravel tires. Accessories: rack, basket, lights.");
    expect(buildReducer(changed, { type: "reset" })).toEqual(INITIAL_BUILD);
  });
});
