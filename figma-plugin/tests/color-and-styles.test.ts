import { describe, it, expect } from "vitest";
import { parseCssColor } from "../src/ui/color";
import {
  parseCssGradient,
  parseCssBackgroundLayers,
  parseCssBoxShadows,
  parseCornerRadii,
  resolveBackgroundLayerBox,
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
    expect(grad?.gradientTransform).toEqual([
      [1, 0, 0],
      [0, 1, 0],
    ]);
    expect(grad?.stops).toHaveLength(2);
    expect(grad?.stops[0].position).toBe(0);
    expect(grad?.stops[1].position).toBe(1);

    const verticalGrad = parseCssGradient("linear-gradient(180deg, #ff0000 10% 50%, #00ff00 24px, #0000ff 100%)");
    expect(verticalGrad?.gradientTransform).toEqual([
      [0, 1, 0],
      [-1, 0, 1],
    ]);
    expect(verticalGrad?.stops.map((s) => s.position)).toEqual([0.1, 0.5, 0.75, 1]);

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

  it("parses multiple drop and inset box-shadows and drops zero-alpha/zero-metric Tailwind v4 shadows", () => {
    const effects = parseCssBoxShadows(
      "0px 4px 12px 0px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.1)"
    );
    expect(effects).toHaveLength(2);
    expect(effects[0]).toMatchObject({ type: "DROP_SHADOW", offsetX: 0, offsetY: 4, radius: 12, spread: 0 });
    expect(effects[1]).toMatchObject({ type: "INNER_SHADOW", offsetY: 1, radius: 0 });
    expect(parseCssBoxShadows("none")).toEqual([]);

    const filtered = parseCssBoxShadows(
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, 0 4px 12px rgba(0, 0, 0, 0.2)"
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0]).toMatchObject({ type: "DROP_SHADOW", offsetX: 0, offsetY: 4, radius: 12 });
    expect(parseCssBoxShadows("0px 0px 0px 0px rgba(0, 0, 0, 0.5)")).toEqual([]);
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

  it("resolves sized/positioned background boxes and pixel radial stops accurately", () => {
    expect(resolveBackgroundLayerBox("0px 1px", "0px 100%", 140, 24)).toMatchObject({
      isZero: true,
      isFullBox: false,
    });
    expect(resolveBackgroundLayerBox("100% 2px", "0px 100%", 140, 24)).toEqual({
      x: 0,
      y: 22,
      width: 140,
      height: 2,
      isZero: false,
      isFullBox: false,
    });
    expect(resolveBackgroundLayerBox("5px 5px", "calc(100% - 15px) 55%", 120, 40)).toMatchObject({
      x: 100,
      width: 5,
      height: 5,
      isZero: false,
      isFullBox: false,
    });
    expect(resolveBackgroundLayerBox("auto", "0% 0%", 200, 100)).toMatchObject({
      isZero: false,
      isFullBox: true,
    });

    const dot = parseCssGradient(
      "radial-gradient(circle at 9px 50%, rgba(25, 27, 24, 0.55) 0px 2px, rgba(0, 0, 0, 0) 2.6px)",
      undefined,
      { width: 1000, height: 60 }
    );
    expect(dot?.type).toBe("GRADIENT_RADIAL");
    expect(dot?.stops[0].position).toBe(0);
    expect(dot?.stops[1].position).toBeCloseTo(2 / 2.6, 3);
    expect(dot?.stops[2].position).toBe(1);
    const [[sx, , tx], [, sy, ty]] = dot!.gradientTransform;
    expect(sx * (9 / 1000) + tx).toBeCloseTo(0.5, 4);
    expect(sy * 0.5 + ty).toBeCloseTo(0.5, 4);
  });
});
