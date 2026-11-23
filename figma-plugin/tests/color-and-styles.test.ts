import { describe, it, expect } from "vitest";
import { parseCssColor } from "../src/ui/color";
import {
  parseCssGradient,
  parseCssBackgroundLayers,
  parseCssBoxShadows,
  parseCornerRadii,
} from "../src/ui/styles";

describe("parseCssColor", () => {
  it("parses hex, rgb/rgba, hsl/hsla, color(srgb ...), and transparent", () => {
    expect(parseCssColor("#ff8800")).toEqual({ r: 1, g: 136 / 255, b: 0, a: 1 });
    expect(parseCssColor("#0f88")).toEqual({ r: 0, g: 1, b: 136 / 255, a: 136 / 255 });
    expect(parseCssColor("rgb(255 0 128 / 50%)")?.a).toBeCloseTo(0.5, 3);
    expect(parseCssColor("hsl(120, 100%, 50%)")?.g).toBeCloseTo(1, 3);
    expect(parseCssColor("color(srgb 0.0627 0.102 0.1137 / 0.9)")).toEqual({
      r: 0.0627,
      g: 0.102,
      b: 0.1137,
      a: 0.9,
    });
    expect(parseCssColor("color(srgb 0.25 0.5 0.75)")).toEqual({ r: 0.25, g: 0.5, b: 0.75, a: 1 });
    expect(parseCssColor("transparent")).toEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(parseCssColor("rebeccapurple", () => ({ r: 0.4, g: 0.2, b: 0.6, a: 1 }))).toEqual({
      r: 0.4,
      g: 0.2,
      b: 0.6,
      a: 1,
    });
  });

  it("converts oklch and display-p3 colors into clamped sRGB", () => {
    const white = parseCssColor("oklch(1 0 0)");
    expect(white?.r).toBeCloseTo(1, 2);
    expect(white?.g).toBeCloseTo(1, 2);
    expect(white?.b).toBeCloseTo(1, 2);

    const p3 = parseCssColor("color(display-p3 1 0.5 0 / 0.8)");
    expect(p3?.a).toBeCloseTo(0.8, 3);
    expect(p3?.r).toBeGreaterThan(0.9);
  });
});

describe("parseCssGradient, parseCssBackgroundLayers, and parseCssBoxShadows", () => {
  it("parses multi-stop linear-gradient angles and layered gradient + url backgrounds", () => {
    const grad = parseCssGradient("linear-gradient(90deg, #ff0000 0%, #0000ff 100%)");
    expect(grad?.type).toBe("GRADIENT_LINEAR");
    expect(grad?.stops).toHaveLength(2);
    expect(grad?.stops[0].position).toBe(0);
    expect(grad?.stops[1].position).toBe(1);

    const layers = parseCssBackgroundLayers(
      'linear-gradient(color(srgb 0.06 0.1 0.11 / 0.68), color(srgb 0.06 0.1 0.11 / 0.76)), url("data:image/webp;base64,UklGRg==")'
    );
    expect(layers).toHaveLength(2);
    expect(layers[0].kind).toBe("gradient");
    expect(layers[1]).toEqual({ kind: "url", url: "data:image/webp;base64,UklGRg==" });

    const radial = parseCssGradient("radial-gradient(circle at center, #ffffff, #888888, #000000)");
    expect(radial?.type).toBe("GRADIENT_RADIAL");
    expect(radial?.stops.map((s) => s.position)).toEqual([0, 0.5, 1]);
    expect(parseCssBackgroundLayers("none")).toEqual([]);
  });

  it("parses multiple drop and inset box-shadows", () => {
    const effects = parseCssBoxShadows(
      "0px 4px 12px 0px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.1)"
    );
    expect(effects).toHaveLength(2);
    expect(effects[0]).toMatchObject({ type: "DROP_SHADOW", offsetX: 0, offsetY: 4, radius: 12, spread: 0 });
    expect(effects[1]).toMatchObject({ type: "INNER_SHADOW", offsetY: 1, radius: 0 });
    expect(parseCssBoxShadows("none")).toEqual([]);
  });

  it("parses percentage and pixel border-radii clamped to half box dimensions", () => {
    expect(
      parseCornerRadii(
        {
          borderTopLeftRadius: "50%",
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
          borderBottomLeftRadius: "50%",
        },
        100,
        80
      )
    ).toEqual([40, 12, 12, 40]);
  });
});
