import { describe, expect, it } from "vitest";
import {
  DEFAULT_SCORE,
  dominantWavelength,
  oklchToSrgb,
  scorePalette,
  scoreReadout,
  scoreUniforms,
  srgbToCss,
} from "./score";

describe("oklchToSrgb", () => {
  it("maps black and white", () => {
    expect(oklchToSrgb(0, 0, 0)).toEqual([0, 0, 0]);
    const white = oklchToSrgb(1, 0, 0);
    for (const c of white) expect(c).toBeCloseTo(1, 3);
  });

  it("keeps every channel in gamut", () => {
    for (let h = 0; h < 360; h += 15) {
      for (const c of oklchToSrgb(0.7, 0.3, h)) {
        expect(c).toBeGreaterThanOrEqual(0);
        expect(c).toBeLessThanOrEqual(1);
      }
    }
  });

  it("turns hue 145 green and hue 265 blue", () => {
    const [r, g, b] = oklchToSrgb(0.7, 0.15, 145);
    expect(g).toBeGreaterThan(r);
    expect(g).toBeGreaterThan(b);
    const [r2, g2, b2] = oklchToSrgb(0.55, 0.18, 265);
    expect(b2).toBeGreaterThan(r2);
    expect(b2).toBeGreaterThan(g2);
  });
});

describe("scorePalette", () => {
  it("returns four stops rising in lightness", () => {
    const stops = scorePalette(DEFAULT_SCORE.hue);
    expect(stops).toHaveLength(4);
    const lum = stops.map(([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b);
    for (let i = 1; i < 4; i++) expect(lum[i]).toBeGreaterThan(lum[i - 1]);
  });

  it("wraps hue", () => {
    expect(scorePalette(370)).toEqual(scorePalette(10));
  });
});

describe("dominantWavelength", () => {
  it("names spectral hues in nanometres", () => {
    expect(dominantWavelength(30)).toBe(620);
    expect(dominantWavelength(145)).toBe(530);
    expect(dominantWavelength(265)).toBe(465);
  });

  it("interpolates between anchors", () => {
    const nm = dominantWavelength(120)!;
    expect(nm).toBeLessThan(575);
    expect(nm).toBeGreaterThan(530);
  });

  it("has no wavelength on the purple line", () => {
    expect(dominantWavelength(330)).toBeNull();
    expect(dominantWavelength(0)).toBeNull();
  });
});

describe("score readout and uniforms", () => {
  it("reads like a wall label", () => {
    expect(scoreReadout({ hue: 145, drift: 40, bloom: 60 })).toBe("530 nm · drift 0.40 · bloom 60%");
    expect(scoreReadout({ hue: 330, drift: 0, bloom: 0 })).toBe("purple line · drift 0.00 · bloom 0%");
  });

  it("maps slider values to shader speed and scale", () => {
    const u = scoreUniforms({ hue: 200, drift: 0, bloom: 0 });
    expect(u.speed).toBeCloseTo(0.04);
    expect(u.scale).toBeCloseTo(0.6);
    const fast = scoreUniforms({ hue: 200, drift: 100, bloom: 100 });
    expect(fast.speed).toBeGreaterThan(u.speed);
    expect(fast.scale).toBeGreaterThan(u.scale);
  });

  it("formats stops for CSS", () => {
    expect(srgbToCss([1, 0.5, 0])).toBe("rgb(255 128 0)");
  });
});
