import { describe, expect, it } from "vitest";
import { clamp01, lerp, progressFromOffsets } from "./math";
describe("HIYAS motion maths", () => {
  it("clamps and interpolates", () => { expect(clamp01(-1)).toBe(0); expect(clamp01(1.4)).toBe(1); expect(lerp(0, 100, .25)).toBe(25); });
  it("maps a sticky section to bounded progress", () => { expect(progressFromOffsets(0, 3600, 1000)).toBe(0); expect(progressFromOffsets(-1300, 3600, 1000)).toBe(.5); expect(progressFromOffsets(-9999, 3600, 1000)).toBe(1); });
});

