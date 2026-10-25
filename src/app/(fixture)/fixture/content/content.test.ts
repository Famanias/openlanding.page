import { describe, expect, it } from "vitest";
import { CARE_PLANS, formatEuro, planPrice } from "./plans";
import { SERVICES } from "./services";
import { CASES } from "./work";
import { FAQ } from "./faq";
import { STAGES } from "../fitout/scene";

describe("FIXTURE content", () => {
  it("prices care plans monthly and annually (two months free)", () => {
    const shopfloor = CARE_PLANS.find((plan) => plan.id === "shopfloor");
    expect(shopfloor).toBeDefined();
    expect(planPrice(shopfloor!, "monthly")).toBe(420);
    expect(planPrice(shopfloor!, "annual")).toBe(350);
    for (const plan of CARE_PLANS) expect(planPrice(plan, "annual")).toBeLessThan(plan.monthly);
  });

  it("formats euro amounts with grouping", () => {
    expect(formatEuro(1800)).toBe("€1,800");
    expect(formatEuro(350)).toBe("€350");
  });

  it("has exactly one featured care plan", () => {
    expect(CARE_PLANS.filter((plan) => plan.featured)).toHaveLength(1);
  });

  it("ties every fit-out stage to a priced service", () => {
    for (const stage of STAGES) {
      expect(SERVICES.some((service) => service.stage === stage.id), stage.id).toBe(true);
    }
    expect(new Set(SERVICES.map((service) => service.sku)).size).toBe(SERVICES.length);
  });

  it("gives every case a before and after for the same metrics", () => {
    expect(CASES).toHaveLength(3);
    for (const item of CASES) {
      expect(item.metrics.length).toBeGreaterThanOrEqual(3);
      for (const metric of item.metrics) {
        expect(metric.before).not.toBe(metric.after);
        expect(Number.isFinite(metric.before) && Number.isFinite(metric.after)).toBe(true);
      }
    }
  });

  it("has unique FAQ questions", () => {
    expect(new Set(FAQ.map((item) => item.q)).size).toBe(FAQ.length);
  });
});
