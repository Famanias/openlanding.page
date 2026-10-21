import { describe, expect, it } from "vitest";
import { entryTotal, isLateSlot, slotsFor, validateEntry, type EntryDraft } from "./visit";

// 2026-10-20 is a Tuesday; 2026-10-19 a Monday; 2026-10-23 a Friday.
const tue = "2026-10-20";
const mon = "2026-10-19";
const fri = "2026-10-23";
const today = new Date(2026, 9, 20, 9, 0);

describe("slotsFor", () => {
  it("is closed on Mondays", () => {
    expect(slotsFor(mon)).toEqual([]);
  });

  it("runs every 20 minutes from 10:00 to last entry 19:20", () => {
    const slots = slotsFor(tue);
    expect(slots[0]).toBe("10:00");
    expect(slots[1]).toBe("10:20");
    expect(slots.at(-1)).toBe("19:20");
    expect(slots).toHaveLength(29);
  });

  it("stays open late on Fridays", () => {
    const slots = slotsFor(fri);
    expect(slots.at(-1)).toBe("22:20");
    expect(isLateSlot(fri, "20:00")).toBe(true);
    expect(isLateSlot(fri, "18:40")).toBe(false);
    expect(isLateSlot(tue, "19:20")).toBe(false);
  });

  it("returns nothing for an unreadable date", () => {
    expect(slotsFor("not-a-date")).toEqual([]);
  });
});

describe("entryTotal", () => {
  it("charges €18 a guest, €22 on late Fridays", () => {
    expect(entryTotal(tue, "12:00", 2)).toBe(36);
    expect(entryTotal(fri, "21:00", 2)).toBe(44);
  });
});

describe("validateEntry", () => {
  const ok: EntryDraft = { date: tue, slot: "12:00", guests: "2", email: "ines@example.pt" };

  it("accepts a complete entry", () => {
    expect(validateEntry(ok, today)).toEqual({});
  });

  it("asks for a date that isn't in the past", () => {
    expect(validateEntry({ ...ok, date: "" }, today).date).toBe("Pick a day to visit.");
    expect(validateEntry({ ...ok, date: "2026-10-01" }, today).date).toBe("That day has already gone.");
  });

  it("refuses Mondays", () => {
    expect(validateEntry({ ...ok, date: mon }, new Date(2026, 9, 1)).date).toBe(
      "The house is closed on Mondays.",
    );
  });

  it("needs a slot that exists on that day", () => {
    expect(validateEntry({ ...ok, slot: "" }, today).slot).toBe("Choose an entry time.");
    expect(validateEntry({ ...ok, slot: "21:00" }, today).slot).toBe("Choose an entry time.");
    expect(validateEntry({ ...ok, date: fri, slot: "21:00" }, today).slot).toBeUndefined();
  });

  it("limits a booking to 1–8 guests", () => {
    expect(validateEntry({ ...ok, guests: "0" }, today).guests).toBe("Book for 1–8 guests.");
    expect(validateEntry({ ...ok, guests: "9" }, today).guests).toBe("Book for 1–8 guests.");
    expect(validateEntry({ ...ok, guests: "2.5" }, today).guests).toBe("Book for 1–8 guests.");
  });

  it("needs an email to send the ticket to", () => {
    expect(validateEntry({ ...ok, email: "ines" }, today).email).toBe("Enter an email for your tickets.");
  });
});
