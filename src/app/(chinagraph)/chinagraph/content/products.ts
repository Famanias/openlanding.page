export type Size = { label: string; soldOut?: boolean };

export type Product = { sku: string; look: number; name: string; price: number; flat: string; flatAlt: string; sizes: Size[]; left: number };

const TAILORED: Size[] = [{ label: "44" }, { label: "46" }, { label: "48" }, { label: "50" }, { label: "52" }];
const LETTERED: Size[] = [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }];

/** Every look, sold. `flat` is a flat-lay still; the card swaps to the look's roll frame on hover. */
export const PRODUCTS: Product[] = [
  { sku: "CG-01", look: 1, name: "Box Coat, navy melton", price: 640, flat: "flat-01", flatAlt: "Navy melton box coat laid flat on bare concrete", sizes: TAILORED.map((s) => (s.label === "44" ? { ...s, soldOut: true } : s)), left: 23 },
  { sku: "CG-02", look: 2, name: "Work Jacket, black wax", price: 420, flat: "flat-02", flatAlt: "Black waxed-cotton work jacket laid flat on concrete", sizes: LETTERED, left: 31 },
  { sku: "CG-03", look: 3, name: "Pleat Trouser, charcoal", price: 290, flat: "flat-03", flatAlt: "Charcoal flannel pleated trousers folded on concrete", sizes: [{ label: "28" }, { label: "30" }, { label: "32", soldOut: true }, { label: "34" }, { label: "36" }], left: 18 },
  { sku: "CG-04", look: 4, name: "Rollneck, bone", price: 260, flat: "flat-04", flatAlt: "Bone boiled-wool rollneck folded on concrete", sizes: LETTERED.map((s) => (s.label === "M" ? { ...s, soldOut: true } : s)), left: 12 },
  { sku: "CG-05", look: 5, name: "DB Suit, rain grey", price: 980, flat: "flat-05", flatAlt: "Rain-grey gabardine double-breasted suit laid flat on concrete", sizes: TAILORED, left: 9 },
  { sku: "CG-06", look: 6, name: "Car Coat, oxblood", price: 1120, flat: "flat-06", flatAlt: "Oxblood pieced-leather car coat laid flat on concrete", sizes: [{ label: "46" }, { label: "48", soldOut: true }, { label: "50" }], left: 4 },
];

export const PRICES: Record<string, number> = Object.fromEntries(PRODUCTS.map((p) => [p.sku, p.price]));
