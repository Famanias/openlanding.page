import { describe, expect, it } from "vitest";
import { TRAIL_LENGTH, WALK_MINUTES } from "../walk/trail";
import { BAND, DISCLAIMER, HERO_FACTS, INVENTORY, LOGBOOK, NAV, NOT_HERE, ROOM_FACTS } from "./content";

describe("elsewhere content", () => {
  it("links the header to four sections with unique ids", () => {
    expect(NAV.map((item) => item.id)).toEqual(["walk", "room", "seasons", "stay"]);
    for (const item of NAV) expect(item.label.length).toBeGreaterThan(2);
  });

  it("quotes the same trail figures the mechanic uses", () => {
    expect(HERO_FACTS[0].value).toBe(TRAIL_LENGTH);
    expect(HERO_FACTS[1].value).toBe(WALK_MINUTES);
    expect(HERO_FACTS[2].value).toBe(0);
  });

  it("lists a real inventory with no filler copy", () => {
    expect(INVENTORY.length).toBeGreaterThanOrEqual(6);
    expect(new Set(INVENTORY.map((item) => item.name)).size).toBe(INVENTORY.length);
    for (const item of INVENTORY) {
      expect(item.note.length).toBeGreaterThan(20);
      expect(item.note.toLowerCase()).not.toContain("lorem");
    }
    expect(NOT_HERE).toContain("A router");
    expect(ROOM_FACTS).toHaveLength(4);
  });

  it("keeps logbook entries short, dated and signed", () => {
    expect(LOGBOOK).toHaveLength(3);
    for (const entry of LOGBOOK) {
      expect(entry.date).toMatch(/^\d{1,2} [A-Z][a-z]+$/);
      expect(entry.nights).toBeGreaterThanOrEqual(2);
      expect(entry.text.length).toBeLessThan(220);
      expect(entry.initials.length).toBeGreaterThan(1);
    }
  });

  it("has a band of short phrases and says plainly that the brand is fictional", () => {
    expect(BAND.length).toBeGreaterThanOrEqual(5);
    for (const phrase of BAND) expect(phrase.split(" ").length).toBeLessThanOrEqual(3);
    expect(DISCLAIMER).toContain("fictional");
    expect(DISCLAIMER).toContain("illustrative");
  });
});
