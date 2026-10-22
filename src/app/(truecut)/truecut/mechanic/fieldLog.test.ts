import { describe, expect, it } from "vitest";
import { chapterFromProgress, fieldProgress } from "./fieldLog";

const sections = [
  { id: "site", top: 0, height: 800 },
  { id: "proof", top: 800, height: 1000 },
  { id: "handoff", top: 1800, height: 700 },
];

describe("field log progress", () => {
  it("moves through measured sections and clamps at the ends", () => {
    expect(fieldProgress(-50, sections, 0)).toBe(0);
    expect(fieldProgress(400, sections, 0)).toBeCloseTo(0.25);
    expect(fieldProgress(1300, sections, 0)).toBeCloseTo(0.75);
    expect(fieldProgress(2600, sections, 0)).toBe(1);
    expect(fieldProgress(5000, sections, 0)).toBe(1);
  });

  it("returns the chapter id for the current progress", () => {
    expect(chapterFromProgress(0, sections)).toBe("site");
    expect(chapterFromProgress(0.5, sections)).toBe("proof");
    expect(chapterFromProgress(0.99, sections)).toBe("handoff");
  });
});
