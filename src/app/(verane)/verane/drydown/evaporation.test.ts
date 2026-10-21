import { describe, expect, test } from "vitest";
import {
  calculateNoteState,
  calculateTierLevels,
  getDominantTier,
  type Note,
} from "./evaporation";

const SAMPLE_NOTES: Note[] = [
  {
    name: "Bergamot",
    tier: "top",
    onset: 0,
    fade: 0.33, // ~20 min
    gone: 0.67, // ~40 min
    description: "Cold-pressed Calabrian citrus",
  },
  {
    name: "Orris Butter",
    tier: "heart",
    onset: 0.33,
    fade: 4.0,
    gone: 7.0,
    description: "Peeled Florentine iris rhizome",
  },
  {
    name: "Labdanum",
    tier: "base",
    onset: 1.0,
    fade: 8.0,
    gone: 14.0,
    description: "Warm amber resin",
  },
];

describe("evaporation dynamics", () => {
  describe("calculateNoteState", () => {
    const topNote = SAMPLE_NOTES[0];
    const heartNote = SAMPLE_NOTES[1];

    test("top note is fully present at hour 0, fades at 20 min, and is gone at 40 min", () => {
      const at0 = calculateNoteState(topNote, 0);
      expect(at0.intensity).toBe(1);
      expect(at0.remaining).toBe(1);
      expect(at0.state).toBe("present");

      const atMidFade = calculateNoteState(topNote, 0.5);
      expect(atMidFade.intensity).toBeCloseTo(0.5, 1);
      expect(atMidFade.remaining).toBeCloseTo(0.5, 1);
      expect(atMidFade.state).toBe("fading");

      const atGone = calculateNoteState(topNote, 1.0);
      expect(atGone.intensity).toBe(0);
      expect(atGone.remaining).toBe(0);
      expect(atGone.state).toBe("gone");
    });

    test("heart note emerges during the opening before reaching full presence", () => {
      const at0 = calculateNoteState(heartNote, 0);
      expect(at0.state).toBe("emerging");
      expect(at0.intensity).toBe(0);
      expect(at0.remaining).toBe(1);

      const atOnset = calculateNoteState(heartNote, 0.33);
      expect(atOnset.state).toBe("present");
      expect(atOnset.intensity).toBe(1);
      expect(atOnset.remaining).toBe(1);

      const at5 = calculateNoteState(heartNote, 5.5);
      expect(at5.state).toBe("fading");
      expect(at5.intensity).toBeCloseTo(0.5, 1);

      const at8 = calculateNoteState(heartNote, 8);
      expect(at8.state).toBe("gone");
      expect(at8.intensity).toBe(0);
    });
  });

  describe("calculateTierLevels", () => {
    test("tracks liquid levels for the three flacon tiers over time", () => {
      // Hour 0: all tiers still intact
      const at0 = calculateTierLevels(SAMPLE_NOTES, 0);
      expect(at0.top).toBe(1);
      expect(at0.heart).toBe(1);
      expect(at0.base).toBe(1);

      // Hour 1: top notes completely evaporated, heart & base remain
      const at1 = calculateTierLevels(SAMPLE_NOTES, 1);
      expect(at1.top).toBe(0);
      expect(at1.heart).toBe(1);
      expect(at1.base).toBe(1);

      // Hour 8: top gone, heart gone, base still holding
      const at8 = calculateTierLevels(SAMPLE_NOTES, 8);
      expect(at8.top).toBe(0);
      expect(at8.heart).toBe(0);
      expect(at8.base).toBe(1);

      // Hour 11: base is partially drained
      const at11 = calculateTierLevels(SAMPLE_NOTES, 11);
      expect(at11.top).toBe(0);
      expect(at11.heart).toBe(0);
      expect(at11.base).toBeCloseTo(0.5, 1);
    });
  });

  describe("getDominantTier", () => {
    test("reports which olfactory tier currently leads the sillage", () => {
      expect(getDominantTier(SAMPLE_NOTES, 0)).toBe("top");
      expect(getDominantTier(SAMPLE_NOTES, 2)).toBe("heart");
      expect(getDominantTier(SAMPLE_NOTES, 8)).toBe("base");
    });
  });
});
