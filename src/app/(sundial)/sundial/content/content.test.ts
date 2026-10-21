import { describe, it, expect } from "vitest";
import { LOTS, lotByCode } from "./lots";
import { PLANS, pricePerBagUsd } from "./plans";

describe("lots", () => {
  it("lists four lots with unique codes", () => {
    expect(LOTS).toHaveLength(4);
    const codes = LOTS.map((l) => l.code);
    expect(new Set(codes).size).toBe(4);
  });

  it("has valid cupping scores and prices", () => {
    for (const lot of LOTS) {
      expect(lot.cuppingScore).toBeGreaterThanOrEqual(80);
      expect(lot.cuppingScore).toBeLessThanOrEqual(95);
      expect(lot.priceUsd).toBeGreaterThan(0);
      expect(lot.notes.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("finds a lot by code", () => {
    expect(lotByCode("LOT 041")?.name).toBe("Kayon Mountain");
    expect(lotByCode("LOT 999")).toBeUndefined();
  });
});

describe("plans", () => {
  it("lists three plans with increasing bags per delivery and exactly one featured", () => {
    expect(PLANS).toHaveLength(3);
    expect(PLANS.filter((p) => p.featured)).toHaveLength(1);
    for (let i = 1; i < PLANS.length; i++) {
      expect(PLANS[i].bagsPerDelivery).toBeGreaterThan(PLANS[i - 1].bagsPerDelivery);
    }
  });

  it("prices per delivery on a real cadence, never per month", () => {
    for (const plan of PLANS) {
      expect(plan.priceUsd).toBeGreaterThan(0);
      expect(plan.daysBetween).toBeGreaterThan(0);
      expect(plan.daysBetween % 7).toBe(0); // cadence is weekly-shaped, not a billing month
      expect(plan.cadence).toMatch(/^Every \d+ weeks$/);
      expect(plan.bagG).toBe(340);
    }
  });

  it("rewards bigger deliveries with a lower price per bag", () => {
    const perBag = PLANS.map((plan) => pricePerBagUsd(plan));
    for (let i = 1; i < perBag.length; i++) {
      expect(perBag[i]).toBeLessThan(perBag[i - 1]);
    }
    // A subscriber bag must beat the cheapest bag on the counter.
    const cheapestCounterBag = Math.min(...LOTS.map((lot) => lot.priceUsd));
    for (const per of perBag) {
      expect(per).toBeLessThan(cheapestCounterBag);
    }
  });
});
