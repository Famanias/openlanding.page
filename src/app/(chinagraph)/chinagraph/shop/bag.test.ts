import { describe, expect, it } from "vitest";
import { EMPTY_BAG, bagCount, bagReducer, bagSubtotal, formatGBP } from "./bag";

const prices = { "CG-01": 640, "CG-03": 290 };

describe("CHINAGRAPH bag", () => {
  it("adds lines and merges the same piece in the same size", () => {
    let bag = bagReducer(EMPTY_BAG, { type: "add", sku: "CG-01", size: "48" });
    bag = bagReducer(bag, { type: "add", sku: "CG-01", size: "48" });
    bag = bagReducer(bag, { type: "add", sku: "CG-01", size: "50" });
    expect(bag.lines).toEqual([
      { sku: "CG-01", size: "48", qty: 2 },
      { sku: "CG-01", size: "50", qty: 1 },
    ]);
    expect(bagCount(bag)).toBe(3);
  });

  it("removes one at a time and drops empty lines", () => {
    let bag = bagReducer(EMPTY_BAG, { type: "add", sku: "CG-03", size: "M" });
    bag = bagReducer(bag, { type: "remove", sku: "CG-03", size: "M" });
    expect(bag.lines).toEqual([]);
    expect(bagReducer(bag, { type: "remove", sku: "CG-03", size: "M" })).toBe(bag);
  });

  it("totals in pounds", () => {
    let bag = bagReducer(EMPTY_BAG, { type: "add", sku: "CG-01", size: "48" });
    bag = bagReducer(bag, { type: "add", sku: "CG-03", size: "M" });
    expect(bagSubtotal(bag, prices)).toBe(930);
    expect(formatGBP(930)).toBe("£930");
    expect(formatGBP(1120)).toBe("£1,120");
  });
});
