import { describe, expect, it } from "vitest";
import { CUTS, NAV, NOTES, priceFor, STATS, STEPS, TERMS } from "./copy";
import { materialById, MATERIALS } from "./materials";

describe("content", () => {
  it("has five terms with unique ids and a diagram each", () => {
    expect(TERMS).toHaveLength(5);
    expect(new Set(TERMS.map((t) => t.id)).size).toBe(5);
    expect(new Set(TERMS.map((t) => t.diagram)).size).toBe(5);
  });

  it("has six materials with unique ids and codes", () => {
    expect(MATERIALS).toHaveLength(6);
    expect(new Set(MATERIALS.map((m) => m.id)).size).toBe(6);
    expect(new Set(MATERIALS.map((m) => m.code)).size).toBe(6);
    expect(materialById("sapphire")?.name).toBe("Sapphire");
    expect(materialById("nope")).toBeUndefined();
  });

  it("keeps the frosted quartz preset equal to the hero glass", () => {
    const q = materialById("frosted-quartz")!.params;
    expect(q.roughness).toBe(0.22);
    expect(q.iridescence).toBe(0.65);
  });

  it("prices the cuts, with annual at 20% off and custom left open", () => {
    const [sketch, studio, foundry] = CUTS;
    expect(priceFor(sketch, "annual")).toBe(0);
    expect(priceFor(studio, "monthly")).toBe(24);
    expect(priceFor(studio, "annual")).toBe(19);
    expect(priceFor(foundry, "monthly")).toBeNull();
    expect(CUTS.filter((c) => c.featured)).toHaveLength(1);
  });

  it("fills every list the page renders", () => {
    expect(NAV.length).toBeGreaterThanOrEqual(4);
    expect(STEPS).toHaveLength(3);
    expect(STATS).toHaveLength(4);
    expect(NOTES).toHaveLength(3);
  });
});
