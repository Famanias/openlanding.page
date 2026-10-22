import { describe, expect, it } from "vitest";
import { BERTHS } from "./berths";
import { MENU } from "./dining";
import { RITUALS } from "./night";
import { ROUTE } from "./line";
import { DEPARTURE_MONTHS, departuresIn, statusFor } from "./departures";

describe("berths", () => {
  it("add up to the train's 38 cabins", () => {
    expect(BERTHS.reduce((n, b) => n + b.cabins, 0)).toBe(ROUTE.cabins);
  });

  it("are listed cheapest first, with unique ids and asset keys", () => {
    const prices = BERTHS.map((b) => b.price);
    expect([...prices].sort((a, b) => a - b)).toEqual(prices);
    expect(new Set(BERTHS.map((b) => b.id)).size).toBe(BERTHS.length);
    expect(new Set(BERTHS.map((b) => b.assetKey)).size).toBe(BERTHS.length);
  });
});

describe("dining car", () => {
  it("serves in order through the night (times after midnight count as morning)", () => {
    const minutes = MENU.map(({ time }) => {
      const [h, m] = time.split(":").map(Number);
      const raw = h * 60 + m;
      return raw < 12 * 60 ? raw + 1440 : raw;
    });
    expect([...minutes].sort((a, b) => a - b)).toEqual(minutes);
  });
});

describe("the night", () => {
  it("has three rituals, each on its own colour field", () => {
    expect(RITUALS).toHaveLength(3);
    expect(new Set(RITUALS.map((r) => r.field)).size).toBe(3);
  });
});

describe("departures", () => {
  it("runs on Thursdays and Sundays only", () => {
    const nov = departuresIn(2026, 10);
    expect(nov.map((d) => d.day)).toEqual(["01", "05", "08", "12", "15", "19", "22", "26", "29"]);
    for (const d of nov) expect(["Thu", "Sun"]).toContain(d.weekday);
  });

  it("is deterministic and never offers more berths than the train has", () => {
    expect(departuresIn(2026, 11)).toEqual(departuresIn(2026, 11));
    for (const m of DEPARTURE_MONTHS) {
      for (const d of departuresIn(m.year, m.month)) {
        expect(d.berthsLeft).toBeGreaterThanOrEqual(0);
        expect(d.berthsLeft).toBeLessThanOrEqual(ROUTE.cabins);
      }
    }
  });

  it("includes at least one sold-out night across the three months", () => {
    const all = DEPARTURE_MONTHS.flatMap((m) => departuresIn(m.year, m.month));
    expect(all.some((d) => d.status === "complet")).toBe(true);
    expect(all.some((d) => d.status === "open")).toBe(true);
  });

  it("maps berths left to a status", () => {
    expect(statusFor(0)).toBe("complet");
    expect(statusFor(4)).toBe("few");
    expect(statusFor(6)).toBe("few");
    expect(statusFor(7)).toBe("open");
  });

  it("marks the réveillon and new-year departures", () => {
    const dec = departuresIn(2026, 11);
    expect(dec.find((d) => d.day === "24")?.note).toMatch(/Réveillon/);
    expect(dec.find((d) => d.day === "31")?.note).toMatch(/Capodanno/);
  });
});
