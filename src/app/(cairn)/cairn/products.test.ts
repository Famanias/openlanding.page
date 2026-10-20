import { describe, expect, test } from "vitest";
import { PRODUCTS, productsIn } from "./products";

describe("PRODUCTS", () => {
  test("every product has at least one colourway, and every colourway has an image", () => {
    for (const p of PRODUCTS) {
      expect(p.colourways.length, p.id).toBeGreaterThan(0);
      for (const c of p.colourways) expect(p.images[c], `${p.id} ${c}`).toBeTruthy();
    }
  });

  test("colourways are only black, navy or white", () => {
    for (const p of PRODUCTS) for (const c of p.colourways) expect(["black", "navy", "white"]).toContain(c);
  });

  test("the Summit Shell 3L carries the published specs", () => {
    const shell = PRODUCTS.find((p) => p.id === "summit-shell-3l")!;
    expect(shell.colourways).toEqual(["black", "navy", "white"]);
    expect(shell.specs).toEqual(
      expect.arrayContaining([
        { label: "Weight", value: "412 g" },
        { label: "Waterproof", value: "28,000 mm" },
        { label: "Breathability", value: "25,000 g/m²" },
      ]),
    );
  });
});

describe("productsIn", () => {
  test("filters by category", () => {
    expect(productsIn("shell").map((p) => p.id)).toEqual(["summit-shell-3l"]);
    expect(productsIn("hands").length).toBe(2);
  });
});
