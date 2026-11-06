import { describe, expect, it } from "vitest";
import {
  calculatePlanPrice,
  formatOdometerDigits,
} from "./pricingMath";

describe("pricingMath logic", () => {
  it("calculates starter plan as permanently $0", () => {
    expect(calculatePlanPrice("starter", "monthly")).toEqual({
      amount: 0,
      formatted: "$0",
      cadenceText: "/ permanent free",
    });
    expect(calculatePlanPrice("starter", "annual")).toEqual({
      amount: 0,
      formatted: "$0",
      cadenceText: "/ permanent free",
    });
  });

  it("calculates professional plan price flip with 20% annual discount", () => {
    expect(calculatePlanPrice("pro", "monthly")).toEqual({
      amount: 28,
      formatted: "$28",
      cadenceText: "/ a month",
    });
    expect(calculatePlanPrice("pro", "annual")).toEqual({
      amount: 22,
      formatted: "$22",
      cadenceText: "/ a month billed annually",
    });
  });

  it("calculates studio plan price flip with annual discount", () => {
    expect(calculatePlanPrice("studio", "monthly")).toEqual({
      amount: 58,
      formatted: "$58",
      cadenceText: "/ a month",
    });
    expect(calculatePlanPrice("studio", "annual")).toEqual({
      amount: 48,
      formatted: "$48",
      cadenceText: "/ a month billed annually",
    });
  });

  it("formats digits for vertical odometer column display", () => {
    const digits = formatOdometerDigits(28);
    expect(digits).toEqual(["2", "8"]);
    const zeroDigits = formatOdometerDigits(0);
    expect(zeroDigits).toEqual(["0"]);
  });
});
