import { describe, expect, it } from "vitest";
import { blackbodyRgb, buildBlackbodyLut } from "./blackbody";

describe("blackbody lookup", () => {
  it("moves from warm red toward blue white", () => {
    const low = blackbodyRgb(1800); const high = blackbodyRgb(25_000);
    expect(low[0]).toBeGreaterThan(low[2]);
    expect(high[2]).toBeGreaterThan(high[0] - .1);
  });
  it("contains finite RGB bytes", () => expect(Array.from(buildBlackbodyLut(32)).every(Number.isFinite)).toBe(true));
});
