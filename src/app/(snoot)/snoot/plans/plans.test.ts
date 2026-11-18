import { describe, expect, it } from "vitest";
import { MAX_PETS, PLANS, quote } from "./plans";

describe("Snoot plans", () => {
  it("offers three collar tags with rising monthly prices", () => {
    expect(PLANS.map((p) => p.id)).toEqual(["pup", "grown", "golden"]);
    for (let i = 1; i < PLANS.length; i++) expect(PLANS[i].monthly).toBeGreaterThan(PLANS[i - 1].monthly);
    for (const p of PLANS) expect(p.includes.length).toBeGreaterThanOrEqual(4);
  });

  it("quotes one pet monthly at the list price", () => {
    const q = quote("grown", 1, "monthly");
    expect(q.perMonth).toBe(PLANS[1].monthly);
    expect(q.dueNow).toBe(PLANS[1].monthly);
    expect(q.saving).toBe(0);
  });

  it("takes 15% off every pet after the first", () => {
    const base = PLANS[0].monthly;
    const q = quote("pup", 3, "monthly");
    expect(q.perMonth).toBe(Math.round(base + 2 * base * 0.85));
    expect(q.saving).toBe(Math.round(base * 3 - q.perMonth));
  });

  it("charges ten months for a year paid up front", () => {
    const monthly = quote("golden", 2, "monthly").perMonth;
    const yearly = quote("golden", 2, "yearly");
    expect(yearly.dueNow).toBe(monthly * 10);
    expect(yearly.perMonth).toBe(Math.round((monthly * 10) / 12));
    expect(yearly.saving).toBeGreaterThanOrEqual(monthly * 2);
  });

  it("keeps the household between one and four pets", () => {
    expect(MAX_PETS).toBe(4);
    expect(quote("pup", 0, "monthly").pets).toBe(1);
    expect(quote("pup", 9, "monthly").pets).toBe(4);
    expect(quote("pup", 2.6, "monthly").pets).toBe(3);
  });
});
