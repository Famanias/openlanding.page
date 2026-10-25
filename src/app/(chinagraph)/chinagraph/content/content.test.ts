import { describe, expect, it } from "vitest";
import { CLOTH } from "./cloth";
import { LOOKS } from "./looks";
import { IMAGE_KEYS } from "./media";
import { PRODUCTS } from "./products";
import { FRAMES, SELECTS } from "../sheet/roll";

describe("CHINAGRAPH content", () => {
  it("has one look per select, in roll order", () => {
    expect(LOOKS.map((look) => look.frame)).toEqual(SELECTS);
    for (const look of LOOKS) expect(look.image).toBe(`roll-${String(look.frame).padStart(2, "0")}`);
  });

  it("sells every look as a product with at least one size in stock", () => {
    expect(PRODUCTS.map((product) => product.look)).toEqual(LOOKS.map((look) => look.n));
    for (const product of PRODUCTS) {
      expect(product.sizes.some((size) => !size.soldOut), product.sku).toBe(true);
      expect(product.price).toBeGreaterThan(0);
    }
  });

  it("counts the deadstock saved from the cloth list", () => {
    expect(CLOTH).toHaveLength(4);
    expect(CLOTH.reduce((sum, cloth) => sum + cloth.metres, 0)).toBe(1140);
  });

  it("lists every image the page asks for exactly once (28 stills)", () => {
    const used = new Set([
      ...FRAMES.map((frame) => frame.image),
      ...LOOKS.map((look) => look.detail),
      ...CLOTH.map((cloth) => cloth.image),
      ...PRODUCTS.map((product) => product.flat),
    ]);
    expect(IMAGE_KEYS).toHaveLength(28);
    expect(new Set(IMAGE_KEYS).size).toBe(28);
    expect([...used].sort()).toEqual([...IMAGE_KEYS].sort());
  });
});
