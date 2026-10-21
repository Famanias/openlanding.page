/** This week's lots. Typed data that drives the Lots chapter. */

export interface Lot {
  code: string;
  name: string;
  country: string;
  region: string;
  process: string;
  altitude: string;
  notes: string[];
  cuppingScore: number;
  priceUsd: number;
  bagG: number;
  roastLevel: string;
  story: string;
}

export const LOTS: readonly Lot[] = [
  {
    code: "LOT 041",
    name: "Kayon Mountain",
    country: "Ethiopia",
    region: "Guji, Shakiso",
    process: "Washed",
    altitude: "1,950 m",
    notes: ["Bergamot", "White peach", "Black tea"],
    cuppingScore: 87.5,
    priceUsd: 22,
    bagG: 340,
    roastLevel: "Light — dropped at 24% development",
    story:
      "Our brightest cup. Roasted Monday 06:12, first crack at 8:42 — the curve on the bag is this batch's actual log.",
  },
  {
    code: "LOT 038",
    name: "Finca La Esperanza",
    country: "Colombia",
    region: "Huila, Pitalito",
    process: "Honey",
    altitude: "1,750 m",
    notes: ["Red apple", "Caramel", "Cocoa"],
    cuppingScore: 86.5,
    priceUsd: 20,
    bagG: 340,
    roastLevel: "Medium — dropped at 26% development",
    story:
      "The everyday bag. Honey-processed, forgiving in any brewer, the one we hand to first-time Sundial customers.",
  },
  {
    code: "LOT 034",
    name: "Sítio Bela Vista",
    country: "Brazil",
    region: "Minas Gerais, Carmo de Minas",
    process: "Natural",
    altitude: "1,200 m",
    notes: ["Dark chocolate", "Hazelnut", "Brown sugar"],
    cuppingScore: 85.0,
    priceUsd: 18,
    bagG: 340,
    roastLevel: "Medium-dark — dropped at 28% development",
    story:
      "Built for milk and espresso. A darker drop that keeps its sweetness under pressure — literally 9 bars of it.",
  },
  {
    code: "LOT 042",
    name: "Gichathaini AA",
    country: "Kenya",
    region: "Nyeri, Karatina",
    process: "Washed",
    altitude: "1,850 m",
    notes: ["Blackcurrant", "Tomato leaf", "Grapefruit"],
    cuppingScore: 88.0,
    priceUsd: 24,
    bagG: 340,
    roastLevel: "Light — dropped at 23% development",
    story:
      "The loudest coffee on the counter. Sold in lots of 60 bags; when it's gone, it's next year's harvest.",
  },
];

export function lotByCode(code: string): Lot | undefined {
  return LOTS.find((lot) => lot.code === code);
}
