export type Colourway = "black" | "navy" | "white";
export type Category = "base" | "mid" | "shell" | "down" | "hands";

export type Product = {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  colourways: Colourway[];
  specs: { label: string; value: string }[];
  /** Asset key per colourway (only the colourways listed above). */
  images: Partial<Record<Colourway, string>>;
};

export const PRODUCTS: Product[] = [
  {
    id: "merino-base-zip",
    name: "Merino 200 Half-Zip",
    category: "base",
    tagline: "Next-to-skin warmth that still breathes at the end of a fixed line.",
    colourways: ["navy"],
    specs: [
      { label: "Weight", value: "210 g" },
      { label: "Fabric", value: "200 g/m² merino" },
      { label: "Fit", value: "Next to skin" },
      { label: "Odour control", value: "Natural, untreated" },
    ],
    images: { navy: "product-base" },
  },
  {
    id: "grid-fleece-hoody",
    name: "Grid Fleece Hoody",
    category: "mid",
    tagline: "Active insulation that dumps heat on the climb and holds it on the belay.",
    colourways: ["white"],
    specs: [
      { label: "Weight", value: "340 g" },
      { label: "Fabric", value: "Grid fleece, 150 g/m²" },
      { label: "Warmth", value: "Active insulation" },
      { label: "Hood", value: "Fits under a helmet" },
    ],
    images: { white: "product-mid" },
  },
  {
    id: "summit-shell-3l",
    name: "Summit Shell 3L",
    category: "shell",
    tagline: "The outer wall. Three layers, taped seams, and a hood built around a helmet.",
    colourways: ["black", "navy", "white"],
    specs: [
      { label: "Weight", value: "412 g" },
      { label: "Waterproof", value: "28,000 mm" },
      { label: "Breathability", value: "25,000 g/m²" },
      { label: "Fabric", value: "3-layer, 40D face" },
    ],
    images: { black: "product-shell-black", navy: "product-shell-navy", white: "product-shell-white" },
  },
  {
    id: "8000-down-suit",
    name: "8000 Down Suit",
    category: "down",
    tagline: "One piece, box-wall baffles, built for the nights above Camp 4.",
    colourways: ["black"],
    specs: [
      { label: "Weight", value: "1,980 g" },
      { label: "Fill power", value: "850 FP goose down" },
      { label: "Comfort rating", value: "−40 °C" },
      { label: "Baffles", value: "Box-wall construction" },
    ],
    images: { black: "product-down" },
  },
  {
    id: "summit-mitt",
    name: "Summit Mitt",
    category: "hands",
    tagline: "Down-filled, waterproof, and dextrous enough for an ascender.",
    colourways: ["black"],
    specs: [
      { label: "Weight", value: "360 g / pair" },
      { label: "Insulation", value: "800 FP down" },
      { label: "Shell", value: "Waterproof, taped" },
      { label: "Leash", value: "Removable wrist leash" },
    ],
    images: { black: "product-hands" },
  },
  {
    id: "alpine-gaiter",
    name: "Alpine Gaiter",
    category: "hands",
    tagline: "Keeps spindrift out of the boot through the Bottleneck.",
    colourways: ["black"],
    specs: [
      { label: "Weight", value: "290 g / pair" },
      { label: "Height", value: "42 cm" },
      { label: "Closure", value: "Front zip and strap" },
      { label: "Fabric", value: "Abrasion-reinforced" },
    ],
    images: { black: "product-hands" },
  },
];

export function productsIn(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export const CATEGORY_LABEL: Record<Category, string> = {
  base: "Base layer",
  mid: "Mid layer",
  shell: "Shell",
  down: "Down",
  hands: "Hands & feet",
};
