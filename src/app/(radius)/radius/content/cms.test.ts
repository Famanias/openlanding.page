import { describe, expect, it } from "vitest";
import { ASSETS } from "../assets.generated";
import {
  FIELD_NOTES,
  FINISH_PROFILES,
  KIT_PRESETS,
  PRE_RIDE_CHECKS,
  filterFieldNotes,
  getAdjacentNotes,
  getFieldNote,
} from "./cms";

describe("radius multi-page CMS helpers", () => {
  it("filters field notes by category and search query", () => {
    expect(filterFieldNotes("all", "")).toHaveLength(FIELD_NOTES.length);
    expect(filterFieldNotes("routes", "").every((n) => n.category === "routes")).toBe(true);
    expect(filterFieldNotes("all", "grommet").some((n) => n.slug === "inside-the-frame-junctions")).toBe(true);
    expect(filterFieldNotes("care", "nonexistent-xyz")).toEqual([]);
  });

  it("looks up every note slug and resolves wrap-around adjacent navigation", () => {
    for (const note of FIELD_NOTES) {
      expect(getFieldNote(note.slug)?.title).toBe(note.title);
      expect(note.assetKey in ASSETS).toBe(true);
    }
    expect(getFieldNote("missing")).toBeNull();
    const adj = getAdjacentNotes(FIELD_NOTES[0].slug);
    expect(adj?.prev.slug).toBe(FIELD_NOTES[FIELD_NOTES.length - 1].slug);
    expect(adj?.next.slug).toBe(FIELD_NOTES[1].slug);
  });

  it("registers only valid generated assets across finish profiles and kit presets", () => {
    for (const profile of Object.values(FINISH_PROFILES)) {
      expect(profile.assetKey in ASSETS).toBe(true);
    }
    for (const preset of KIT_PRESETS) {
      expect(preset.assetKey in ASSETS).toBe(true);
    }
    expect(PRE_RIDE_CHECKS.length).toBeGreaterThanOrEqual(5);
  });
});
