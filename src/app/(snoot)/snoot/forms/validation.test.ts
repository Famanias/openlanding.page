import { describe, expect, it } from "vitest";
import { REASONS, SPECIES_OPTIONS, bookingSummary, emptyBooking, nextDays, validateBooking, type Booking } from "./validation";

const good: Booking = {
  petName: "Biscuit",
  species: "dog",
  reason: "checkup",
  day: "2026-11-19",
  owner: "Mara Ilunga",
  contact: "mara@example.com",
};

describe("booking validation", () => {
  it("accepts a complete booking", () => {
    expect(validateBooking(good)).toEqual({});
  });

  it("asks for every required field on an empty form", () => {
    const errors = validateBooking(emptyBooking());
    expect(Object.keys(errors).sort()).toEqual(["contact", "day", "owner", "petName", "reason", "species"]);
    expect(errors.petName).toBe("Who's coming in? Add your pet's name.");
  });

  it("trims names and caps them at 30 characters", () => {
    expect(validateBooking({ ...good, petName: "   " }).petName).toBeDefined();
    expect(validateBooking({ ...good, petName: "x".repeat(31) }).petName).toBe("Keep it under 30 letters.");
  });

  it("accepts an email or a phone number as the contact", () => {
    expect(validateBooking({ ...good, contact: "+44 20 7946 0123" })).toEqual({});
    expect(validateBooking({ ...good, contact: "0207 946 0123" })).toEqual({});
    expect(validateBooking({ ...good, contact: "mara@" }).contact).toBe("An email or phone number we can reach.");
    expect(validateBooking({ ...good, contact: "12" }).contact).toBeDefined();
  });

  it("only accepts known species and reasons", () => {
    expect(SPECIES_OPTIONS.map((s) => s.id)).toEqual(["dog", "cat", "rabbit", "small"]);
    expect(REASONS.map((r) => r.id)).toContain("checkup");
    expect(validateBooking({ ...good, species: "dragon" }).species).toBeDefined();
    expect(validateBooking({ ...good, reason: "taxes" }).reason).toBeDefined();
  });
});

describe("booking days and summary", () => {
  it("offers the next five open days and skips Sundays", () => {
    const days = nextDays(new Date(2026, 10, 19, 12), 5); // Thursday
    expect(days).toHaveLength(5);
    expect(days.map((d) => d.id)).toEqual(["2026-11-20", "2026-11-21", "2026-11-23", "2026-11-24", "2026-11-25"]);
    expect(days[0].label).toBe("Fri");
    expect(days[0].date).toBe("20");
  });

  it("summarises the booking on the dog tag", () => {
    expect(bookingSummary(good)).toBe("Biscuit · Check-up · Thu 19 Nov");
  });
});
