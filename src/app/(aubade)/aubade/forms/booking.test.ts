import { describe, expect, it } from "vitest";
import { cabinFor, fareFor, isValid, ticketNumber, validateBooking, type BookingInput } from "./booking";

const open = new Set(["2026-11-05", "2026-11-08"]);

const good: BookingInput = {
  departure: "2026-11-05",
  berth: "grand-lit",
  guests: "2",
  name: "Inès Marchetti",
  email: "ines@example.com",
  notes: "",
};

describe("validateBooking", () => {
  it("accepts a complete booking", () => {
    const errors = validateBooking(good, open);
    expect(errors).toEqual({});
    expect(isValid(errors)).toBe(true);
  });

  it("requires a departure that is still on sale", () => {
    expect(validateBooking({ ...good, departure: "" }, open).departure).toMatch(/Choose a departure/);
    expect(validateBooking({ ...good, departure: "2026-12-31" }, open).departure).toMatch(/full/);
  });

  it("requires a known berth", () => {
    expect(validateBooking({ ...good, berth: "" }, open).berth).toBeDefined();
    expect(validateBooking({ ...good, berth: "roof" }, open).berth).toBeDefined();
  });

  it("limits guests to what the berth sleeps", () => {
    expect(validateBooking({ ...good, berth: "couchette", guests: "2" }, open).guests).toMatch(/sleeps one/);
    expect(validateBooking({ ...good, berth: "couchette", guests: "1" }, open).guests).toBeUndefined();
    expect(validateBooking({ ...good, guests: "3" }, open).guests).toBeDefined();
    expect(validateBooking({ ...good, guests: "0" }, open).guests).toBeDefined();
  });

  it("checks the name and email", () => {
    expect(validateBooking({ ...good, name: " I " }, open).name).toBeDefined();
    expect(validateBooking({ ...good, email: "ines@" }, open).email).toMatch(/email/);
    expect(validateBooking({ ...good, email: "  ines@example.com " }, open).email).toBeUndefined();
  });

  it("caps notes at 280 characters", () => {
    expect(validateBooking({ ...good, notes: "x".repeat(281) }, open).notes).toMatch(/280/);
    expect(validateBooking({ ...good, notes: "x".repeat(280) }, open).notes).toBeUndefined();
  });
});

describe("fareFor", () => {
  it("prices per cabin, so a second guest costs nothing extra", () => {
    expect(fareFor("grand-lit")).toBe(1180);
    expect(fareFor("cabine")).toBe(640);
    expect(fareFor("couchette")).toBe(390);
  });

  it("is zero for an unknown berth", () => {
    expect(fareFor("roof")).toBe(0);
  });
});

describe("ticket details", () => {
  it("assigns a cabin inside the berth's voiture, deterministically", () => {
    const a = cabinFor("grand-lit", "2026-11-05", "ines@example.com");
    expect(a).toEqual(cabinFor("grand-lit", "2026-11-05", "ines@example.com"));
    expect(a.voiture).toBe(7);
    expect(a.cabine).toBeGreaterThanOrEqual(1);
    expect(a.cabine).toBeLessThanOrEqual(10);
  });

  it("makes a ticket number from the date and the guest", () => {
    expect(ticketNumber("2026-11-05", "ines@example.com")).toMatch(/^AU-1105-[0-9A-Z]{4}$/);
  });
});
