import { describe, expect, it } from "vitest";
import {
  DEFAULT_MONTH,
  MONTHS,
  SEASONS,
  clampMonth,
  daylightHours,
  formatDaylight,
  formatTemperature,
  midMonth,
  seasonById,
  seasonForMonth,
  seasonIndex,
} from "./seasons";

describe("elsewhere seasons", () => {
  it("assigns every month to exactly one of three seasons", () => {
    expect(SEASONS).toHaveLength(3);
    const all = SEASONS.flatMap((season) => season.months).sort((a, b) => a - b);
    expect(all).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(MONTHS).toHaveLength(12);
  });

  it("maps months to the season whose plate is shown", () => {
    expect(seasonForMonth(5).id).toBe("green");
    expect(seasonForMonth(8).id).toBe("green");
    expect(seasonForMonth(9).id).toBe("amber");
    expect(seasonForMonth(11).id).toBe("amber");
    expect(seasonForMonth(12).id).toBe("white");
    expect(seasonForMonth(1).id).toBe("white");
    expect(seasonForMonth(3).id).toBe("white");
    expect(seasonForMonth(4).id).toBe("green");
  });

  it("clamps and repairs out-of-range months", () => {
    expect(clampMonth(0)).toBe(1);
    expect(clampMonth(14)).toBe(12);
    expect(clampMonth(6.4)).toBe(6);
    expect(clampMonth(Number.NaN)).toBe(DEFAULT_MONTH);
    expect(seasonForMonth(99).id).toBe("white");
  });

  it("jumps a season button to the middle of its season", () => {
    expect(midMonth("green")).toBe(6);
    expect(midMonth("amber")).toBe(10);
    expect(midMonth("white")).toBe(1);
    for (const season of SEASONS) expect(seasonForMonth(midMonth(season.id)).id).toBe(season.id);
  });

  it("orders the seasons for directional wipes", () => {
    expect(seasonIndex("green")).toBe(0);
    expect(seasonIndex("amber")).toBe(1);
    expect(seasonIndex("white")).toBe(2);
    expect(seasonById("amber").name).toBe("Amber");
  });

  it("gets colder, slower and dearer toward winter", () => {
    const [green, amber, white] = SEASONS;
    expect(green.high).toBeGreaterThan(amber.high);
    expect(amber.high).toBeGreaterThan(white.high);
    expect(white.trailMinutes).toBeGreaterThan(amber.trailMinutes);
    expect(white.stoveLoads).toBeGreaterThan(green.stoveLoads);
    expect(white.rate).toBeGreaterThan(green.rate);
    for (const season of SEASONS) {
      expect(season.low).toBeLessThan(season.high);
      expect(season.alt.length).toBeGreaterThan(40);
    }
  });
});

describe("elsewhere daylight", () => {
  it("is longest in June and shortest in December at the cabin's latitude", () => {
    const hours = MONTHS.map((_, i) => daylightHours(i + 1));
    expect(Math.max(...hours)).toBe(hours[5]);
    expect(Math.min(...hours)).toBe(hours[11]);
    expect(hours[5]).toBeGreaterThan(15.5);
    expect(hours[5]).toBeLessThan(16.5);
    expect(hours[11]).toBeGreaterThan(7.8);
    expect(hours[11]).toBeLessThan(8.8);
  });

  it("is close to twelve hours near the equinoxes and at the equator", () => {
    expect(daylightHours(3)).toBeGreaterThan(11.3);
    expect(daylightHours(3)).toBeLessThan(12.3);
    expect(daylightHours(9)).toBeGreaterThan(11.8);
    expect(daylightHours(9)).toBeLessThan(12.9);
    expect(daylightHours(6, 0)).toBeCloseTo(12, 5);
  });

  it("does not fail inside the polar circle", () => {
    expect(daylightHours(6, 80)).toBe(24);
    expect(daylightHours(12, 80)).toBe(0);
  });

  it("formats hours and minutes", () => {
    expect(formatDaylight(8.25)).toBe("8 h 15 min");
    expect(formatDaylight(16)).toBe("16 h");
    expect(formatDaylight(12.1)).toBe("12 h 06 min");
  });

  it("formats temperatures with a true minus sign", () => {
    expect(formatTemperature(-6)).toBe("−6°");
    expect(formatTemperature(19)).toBe("19°");
    expect(formatTemperature(0)).toBe("0°");
  });
});
