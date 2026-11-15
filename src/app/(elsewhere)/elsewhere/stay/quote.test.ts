import { describe, expect, it } from "vitest";
import {
  INITIAL_STAY,
  MAX_NIGHTS,
  MIN_NIGHTS,
  WOOD_AND_LINEN,
  clampGuests,
  clampNights,
  formatMoney,
  quote,
  stayReducer,
  staySummary,
} from "./quote";

describe("elsewhere stay reducer", () => {
  it("starts on three nights for two in the green season", () => {
    expect(INITIAL_STAY).toEqual({ month: 5, nights: 3, guests: 2 });
    expect(quote(INITIAL_STAY).season.id).toBe("green");
  });

  it("sets and clamps the month", () => {
    expect(stayReducer(INITIAL_STAY, { type: "month", month: 10 }).month).toBe(10);
    expect(stayReducer(INITIAL_STAY, { type: "month", month: 40 }).month).toBe(12);
    expect(stayReducer(INITIAL_STAY, { type: "month", month: -3 }).month).toBe(1);
  });

  it("jumps to the middle of another season but leaves the month alone inside the same one", () => {
    expect(stayReducer(INITIAL_STAY, { type: "season", season: "amber" }).month).toBe(10);
    expect(stayReducer(INITIAL_STAY, { type: "season", season: "white" }).month).toBe(1);
    const august = { ...INITIAL_STAY, month: 8 };
    expect(stayReducer(august, { type: "season", season: "green" })).toBe(august);
  });

  it("keeps nights between the two-night minimum and a week", () => {
    expect(clampNights(1)).toBe(MIN_NIGHTS);
    expect(clampNights(30)).toBe(MAX_NIGHTS);
    expect(clampNights(Number.NaN)).toBe(MIN_NIGHTS);
    let state = INITIAL_STAY;
    for (let i = 0; i < 10; i++) state = stayReducer(state, { type: "step-nights", delta: 1 });
    expect(state.nights).toBe(MAX_NIGHTS);
    for (let i = 0; i < 10; i++) state = stayReducer(state, { type: "step-nights", delta: -1 });
    expect(state.nights).toBe(MIN_NIGHTS);
    expect(stayReducer(state, { type: "nights", nights: 5 }).nights).toBe(5);
  });

  it("sleeps one or two", () => {
    expect(clampGuests(0)).toBe(1);
    expect(clampGuests(6)).toBe(2);
    expect(stayReducer(INITIAL_STAY, { type: "guests", guests: 1 }).guests).toBe(1);
  });

  it("returns new objects and never mutates", () => {
    const frozen = Object.freeze({ ...INITIAL_STAY });
    expect(() => stayReducer(frozen, { type: "step-nights", delta: 1 })).not.toThrow();
    expect(frozen.nights).toBe(3);
  });
});

describe("elsewhere quote", () => {
  it("prices nights at the season's rate plus one flat wood-and-linen charge", () => {
    const green = quote({ month: 5, nights: 3, guests: 2 });
    expect(green.nightly).toBe(240);
    expect(green.lodging).toBe(720);
    expect(green.total).toBe(720 + WOOD_AND_LINEN);
    expect(green.lines).toEqual([
      { label: "3 nights at $240", amount: 720 },
      { label: "Wood and linen", amount: 45 },
    ]);
  });

  it("follows the season of the chosen month", () => {
    expect(quote({ month: 10, nights: 2, guests: 2 }).total).toBe(265 * 2 + 45);
    expect(quote({ month: 1, nights: 7, guests: 1 }).total).toBe(285 * 7 + 45);
    expect(quote({ month: 10, nights: 2, guests: 2 }).monthName).toBe("October");
  });

  it("does not charge per guest", () => {
    expect(quote({ month: 5, nights: 3, guests: 1 }).total).toBe(quote({ month: 5, nights: 3, guests: 2 }).total);
  });

  it("repairs invalid input rather than quoting nonsense", () => {
    const q = quote({ month: 0, nights: 0, guests: 9 });
    expect(q.nights).toBe(MIN_NIGHTS);
    expect(q.guests).toBe(2);
    expect(q.monthName).toBe("January");
    expect(q.total).toBeGreaterThan(0);
  });

  it("the lines always add up to the total", () => {
    for (let month = 1; month <= 12; month++) {
      for (let nights = MIN_NIGHTS; nights <= MAX_NIGHTS; nights++) {
        const q = quote({ month, nights, guests: 2 });
        expect(q.lines.reduce((sum, line) => sum + line.amount, 0)).toBe(q.total);
      }
    }
  });

  it("formats money and the one-line summary", () => {
    expect(formatMoney(765)).toBe("$765");
    expect(formatMoney(2040)).toBe("$2,040");
    expect(staySummary({ month: 5, nights: 3, guests: 2 })).toBe("3 nights in May, for two");
    expect(staySummary({ month: 12, nights: 2, guests: 1 })).toBe("2 nights in December, for one");
  });
});
