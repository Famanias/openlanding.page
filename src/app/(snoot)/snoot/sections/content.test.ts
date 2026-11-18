import { describe, expect, it } from "vitest";
import { IMAGE_KEYS, NAV, PATIENTS, TEAM, VISIT_STEPS } from "./content";
import { SPECIES } from "../species/species";

describe("snoot page content", () => {
  it("links every nav item to a section id", () => {
    expect(NAV.map((n) => n.href)).toEqual(["#checkup", "#patients", "#plans", "#team", "#visit"]);
  });

  it("fills the waiting-room ticker with distinct patients", () => {
    expect(PATIENTS.length).toBeGreaterThanOrEqual(8);
    expect(new Set(PATIENTS.map((p) => p.name)).size).toBe(PATIENTS.length);
  });

  it("covers four species with unique ids and real numbers", () => {
    expect(SPECIES.map((s) => s.id)).toEqual(["dog", "cat", "rabbit", "small"]);
    for (const s of SPECIES) {
      expect(s.seenThisYear).toBeGreaterThan(0);
      expect(s.visits.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("introduces four vets, each with a pet of their own", () => {
    expect(TEAM).toHaveLength(4);
    for (const vet of TEAM) expect(vet.pet.length).toBeGreaterThan(0);
  });

  it("walks the visit in four steps", () => {
    expect(VISIT_STEPS).toHaveLength(4);
  });

  it("uses only documented image keys, each exactly once", () => {
    const used = [...TEAM.map((t) => t.image), ...VISIT_STEPS.map((v) => v.image), ...SPECIES.map((s) => s.image)];
    expect(new Set(used).size).toBe(used.length);
    expect([...used].sort()).toEqual([...IMAGE_KEYS].sort());
  });
});
