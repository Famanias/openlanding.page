import { describe, expect, it } from "vitest";
import { sectionProgress, stageAt } from "./math";

describe("campus and project scroll progression", () => {
  it("starts at the section top, progresses over the actual travel, and stops at completion", () => {
    expect(sectionProgress(100, 200, 1000, 400)).toBe(0);
    expect(sectionProgress(500, 200, 1000, 400)).toBe(0.5);
    expect(sectionProgress(1000, 200, 1000, 400)).toBe(1);
    expect(sectionProgress(200, 200, 300, 400)).toBe(0);
  });
  it("keeps stage selection in bounds including exactly completed journeys", () => {
    expect(stageAt(-1, 3)).toBe(0);
    expect(stageAt(0.5, 3)).toBe(1);
    expect(stageAt(1, 3)).toBe(2);
  });
});
