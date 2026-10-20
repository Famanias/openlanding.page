import { describe, expect, test } from "vitest";
import { findPaletteViolations } from "../check-palette";

describe("findPaletteViolations", () => {
  test("flags hexes outside the palette, case-insensitively", () => {
    expect(
      findPaletteViolations("keytu", [{ path: "a.css", source: "color:#E8542B;background:#0f1e33" }]),
    ).toEqual([{ path: "a.css", hex: "#E8542B" }]);
  });

  test("expands 3-digit hex before comparing", () => {
    expect(findPaletteViolations("keytu", [{ path: "a.css", source: "color:#fff" }])).toEqual([
      { path: "a.css", hex: "#fff" },
    ]);
  });

  test("ignores files under a template's exempt paths", () => {
    expect(
      findPaletteViolations("koji", [
        { path: "src/app/(koji)/koji/dish/materials.ts", source: "rice = '#F7F1E3'" },
      ]),
    ).toEqual([]);
  });

  test("does not treat HTML entities or ids as colours", () => {
    expect(
      findPaletteViolations("orrery", [{ path: "a.tsx", source: `<a href="#security">&#8594;</a>` }]),
    ).toEqual([]);
  });
});
