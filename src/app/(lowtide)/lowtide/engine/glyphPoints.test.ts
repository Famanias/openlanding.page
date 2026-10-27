import { describe, expect, it } from "vitest";
import { sampleGlyphPoints, type GlyphCanvas } from "./glyphPoints";

/** A stand-in 2D context: "draws" a filled rectangle in the middle of a 100×50 canvas whatever the text. */
function fakeCanvas(w = 100, h = 50): GlyphCanvas {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 15; y < 35; y++) for (let x = 20; x < 80; x++) data[(y * w + x) * 4 + 3] = 255;
  return {
    width: w,
    height: h,
    clear() {},
    drawText() {},
    alpha: () => data,
  };
}

describe("sampleGlyphPoints", () => {
  it("returns count xy pairs", () => {
    expect(sampleGlyphPoints("7h", 500, fakeCanvas(), 1)).toHaveLength(1000);
  });

  it("keeps points inside the unit box, centred", () => {
    const pts = sampleGlyphPoints("7h", 500, fakeCanvas(), 1);
    for (const v of pts) {
      expect(v).toBeGreaterThanOrEqual(-0.5);
      expect(v).toBeLessThanOrEqual(0.5);
    }
  });

  it("only lands on filled pixels", () => {
    const pts = sampleGlyphPoints("7h", 300, fakeCanvas(), 1);
    for (let i = 0; i < pts.length; i += 2) {
      // filled x 20..80 of 100 → −0.3..0.3 in a width-normalised box
      expect(pts[i]).toBeGreaterThanOrEqual(-0.31);
      expect(pts[i]).toBeLessThanOrEqual(0.31);
    }
  });

  it("is deterministic for a seed", () => {
    expect(sampleGlyphPoints("95%", 200, fakeCanvas(), 4)).toEqual(sampleGlyphPoints("95%", 200, fakeCanvas(), 4));
  });

  it("returns zeros when nothing is drawn", () => {
    const empty: GlyphCanvas = { ...fakeCanvas(), alpha: () => new Uint8ClampedArray(100 * 50 * 4) };
    expect(Array.from(sampleGlyphPoints("x", 10, empty, 1)).every((v) => v === 0)).toBe(true);
  });
});
