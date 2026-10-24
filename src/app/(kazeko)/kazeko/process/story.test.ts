import { describe, expect, it } from "vitest";
import { phaseForProgress, PHASES } from "./story";

describe("pencil-to-picture storyboard", () => {
  it("keeps pencil, colour and life in a readable order at the thresholds", () => {
    expect(phaseForProgress(0).name).toBe("Pencil");
    expect(phaseForProgress(.34).name).toBe("Colour");
    expect(phaseForProgress(.75).name).toBe("Life");
    expect(phaseForProgress(1).name).toBe("Life");
    expect(PHASES.map((p) => p.progress)).toEqual([0, .55, 1]);
  });
});
