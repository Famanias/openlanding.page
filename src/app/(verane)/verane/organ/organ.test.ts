import { describe, expect, test } from "vitest";
import {
  ORGAN_SHELVES,
  deriveBespokeBlend,
  getOrganVial,
} from "./organ";

describe("The Organ composer logic", () => {
  test("organ shelves contain exactly three tiers with five vials each", () => {
    expect(ORGAN_SHELVES.top).toHaveLength(5);
    expect(ORGAN_SHELVES.heart).toHaveLength(5);
    expect(ORGAN_SHELVES.base).toHaveLength(5);
  });

  test("getOrganVial retrieves vial by id or returns fallback", () => {
    const vial = getOrganVial("top", "t1");
    expect(vial.name).toContain("Néroli");

    const fallback = getOrganVial("heart", "invalid_id");
    expect(fallback.id).toBe("h1");
  });

  test("deriveBespokeBlend creates a unified composition with title, batch, and notes", () => {
    const blend = deriveBespokeBlend("t1", "h1", "b1");
    expect(blend.title).toBe("Néroli · Iris · Labdanum");
    expect(blend.batchCode).toBe("B-0111");
    expect(blend.notes).toHaveLength(3);
    expect(blend.notes[0].tier).toBe("top");
    expect(blend.notes[1].tier).toBe("heart");
    expect(blend.notes[2].tier).toBe("base");
    expect(blend.longevity).toMatch(/Lasts past \d+ h/);
  });

  test("different selections generate different batch codes and notes", () => {
    const blendA = deriveBespokeBlend("t2", "h3", "b5");
    const blendB = deriveBespokeBlend("t5", "h4", "b2");

    expect(blendA.batchCode).not.toBe(blendB.batchCode);
    expect(blendA.title).not.toBe(blendB.title);
  });
});
