import { describe, expect, test } from "vitest";
import { RELEASES, formatCatNo, releasesOnSide } from "./catalogue";

describe("formatCatNo", () => {
  test("zero-pads to three digits behind the label prefix", () => {
    expect(formatCatNo(7)).toBe("WF-007");
    expect(formatCatNo(12)).toBe("WF-012");
  });
});

describe("RELEASES", () => {
  test("catalogue numbers run 1..n with no gaps or repeats", () => {
    expect(RELEASES.map((r) => r.no)).toEqual(RELEASES.map((_, i) => i + 1));
  });

  test("Issue 07 is the latest pressed record and WF-008 is still being pressed", () => {
    expect(RELEASES.find((r) => r.no === 7)?.title).toBe("Low Ceilings");
    expect(RELEASES.find((r) => r.no === 8)?.status).toBe("pressing");
  });

  test("every release has an artist, a title and an edition size", () => {
    for (const r of RELEASES) {
      expect(r.artist).toBeTruthy();
      expect(r.title).toBeTruthy();
      expect(r.edition).toBeGreaterThan(0);
    }
  });

  test("years never go backwards as numbers rise", () => {
    for (let i = 1; i < RELEASES.length; i++) expect(RELEASES[i].year).toBeGreaterThanOrEqual(RELEASES[i - 1].year);
  });
});

describe("releasesOnSide", () => {
  test("Side A holds the first four records and Side B the rest", () => {
    expect(releasesOnSide("a").map((r) => r.no)).toEqual([1, 2, 3, 4]);
    expect(releasesOnSide("b").map((r) => r.no)).toEqual([5, 6, 7, 8]);
  });
});
