import { describe, expect, it } from "vitest";
import { MAX_SEATS, SEATS, selectSeat, summarizeSeats } from "./model";

describe("Grandstand seat selection", () => {
  it("offers a theatre-sized plan with uniquely identified seats", () => {
    expect(SEATS.length).toBeGreaterThanOrEqual(100);
    expect(SEATS.length).toBeLessThanOrEqual(160);
    expect(new Set(SEATS.map((seat) => seat.id)).size).toBe(SEATS.length);
    expect(SEATS.some((seat) => !seat.available)).toBe(true);
  });

  it("selects and deselects available seats while ignoring unavailable and unknown seats", () => {
    const available = SEATS.find((seat) => seat.available)!;
    const unavailable = SEATS.find((seat) => !seat.available)!;
    expect(selectSeat([], unavailable.id)).toEqual([]);
    expect(selectSeat([], "unknown")).toEqual([]);
    expect(selectSeat([], available.id)).toEqual([available.id]);
    expect(selectSeat([available.id], available.id)).toEqual([]);
  });

  it("enforces the selection limit but still permits deselection", () => {
    const available = SEATS.filter((seat) => seat.available).slice(0, MAX_SEATS + 1);
    const selected = available.slice(0, MAX_SEATS).map((seat) => seat.id);
    expect(selectSeat(selected, available[MAX_SEATS].id)).toEqual(selected);
    expect(selectSeat(selected, selected[0])).toHaveLength(MAX_SEATS - 1);
  });

  it("totals only valid unique selections using integer cents", () => {
    const seat = SEATS.find((entry) => entry.available)!;
    expect(summarizeSeats([seat.id, seat.id, "unknown"])).toEqual({ count: 1, totalCents: seat.priceCents });
    expect(summarizeSeats([])).toEqual({ count: 0, totalCents: 0 });
  });
});
