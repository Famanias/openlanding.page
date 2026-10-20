import { describe, expect, test } from "vitest";
import { FLIGHT, flightHeightVh, seamOffsetsVh, toEngineConfig } from "./flight.config";

describe("FLIGHT", () => {
  test("five course groups carry all eleven courses", () => {
    expect(FLIGHT.sections.map((s) => s.id)).toEqual(["sakizuke", "mukozuke", "yakimono", "nimono", "shokuji"]);
    expect(FLIGHT.sections.flatMap((s) => s.courses).length).toBe(11);
  });

  test("there is one seam between each pair of scenes", () => {
    expect(FLIGHT.seams).toHaveLength(4);
  });
});

describe("toEngineConfig", () => {
  const withWipe = { ...FLIGHT, seams: ["clip", "slabWipe", "clip", "clip"] as const };

  test("a slab-wipe seam becomes a null connector (a direct cut)", () => {
    const cfg = toEngineConfig({ ...withWipe, seams: [...withWipe.seams] }, "/templates/koji/clips");
    expect(cfg.connectors).toHaveLength(4);
    expect(cfg.connectors[1]).toBeNull();
    expect(cfg.connectors[0]).toBe("/templates/koji/clips/conn-1-2.mp4");
  });

  test("dives point at dive-<i>.mp4 and carry the course copy", () => {
    const cfg = toEngineConfig(FLIGHT, "/templates/koji/clips");
    expect(cfg.sections[2].clip).toBe("/templates/koji/clips/dive-3.mp4");
    expect(cfg.sections[0].eyebrow).toContain("先付");
    expect(cfg.sections[3].title).toBe("Nimono · Agemono · Sunomono");
  });
});

describe("scroll geometry", () => {
  test("total height = dives + clip connectors + one viewport", () => {
    // 5 dives × 1.3 + 4 connectors × 0.9 + 1
    expect(flightHeightVh(FLIGHT)).toBeCloseTo(5 * 1.3 + 4 * 0.9 + 1);
    const cut = { ...FLIGHT, seams: ["clip", "slabWipe", "clip", "clip"] as ("clip" | "slabWipe")[] };
    expect(flightHeightVh(cut)).toBeCloseTo(5 * 1.3 + 3 * 0.9 + 1);
  });

  test("slab-wipe seams sit exactly at the end of the dive before them", () => {
    const cut = { ...FLIGHT, seams: ["clip", "slabWipe", "clip", "clip"] as ("clip" | "slabWipe")[] };
    // dive1 1.3 + conn 0.9 + dive2 1.3 = 3.5 viewports in
    expect(seamOffsetsVh(cut)).toEqual([3.5]);
  });
});
