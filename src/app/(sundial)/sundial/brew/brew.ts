/** Brew recipes for the bench: pure functions over the recipe data. */

export type MethodId = "v60" | "aeropress" | "espresso";

export interface BrewMethod {
  id: MethodId;
  label: string;
  blurb: string;
  /** Ground coffee, grams. */
  doseG: number;
  /** Water (or espresso yield) in grams. */
  waterG: number;
  /** Slurry temperature at the pour, °C. */
  tempC: number;
  /** Total brew time, seconds. */
  timeS: number;
  grind: string;
  steps: string[];
}

export const METHODS: readonly BrewMethod[] = [
  {
    id: "v60",
    label: "V60",
    blurb: "Our house pour-over. The curve's brightness survives best here.",
    doseG: 15,
    waterG: 250,
    tempC: 94,
    timeS: 165,
    grind: "Medium-fine, table salt",
    steps: [
      "Rinse the filter, add 15 g, level the bed.",
      "Bloom with 45 g of water, swirl once, wait 40 s.",
      "Pour to 150 g in slow circles, then to 250 g by 1:50.",
      "Finish by 2:45. Swirl the brewer, serve.",
    ],
  },
  {
    id: "aeropress",
    label: "Aeropress",
    blurb: "Forgiving, syrupy, travel-ready. Our most-brewed recipe at the counter.",
    doseG: 16,
    waterG: 220,
    tempC: 85,
    timeS: 90,
    grind: "Medium, like coarse sand",
    steps: [
      "Inverted chamber, 16 g of coffee.",
      "Pour to 220 g at 85 °C, stir three times.",
      "Steep 60 s, cap with a rinsed filter.",
      "Flip onto the cup, press slowly for 30 s.",
    ],
  },
  {
    id: "espresso",
    label: "Espresso",
    blurb: "A 1:2 shot at 24 s. Dial in by time before you touch the grind.",
    doseG: 18,
    waterG: 38,
    tempC: 93,
    timeS: 28,
    grind: "Fine, slightly gritty",
    steps: [
      "Dose 18 g, distribute, tamp level.",
      "Pull to 38 g of liquid.",
      "Target 25–30 s from first drip.",
      "Taste: sour → grind finer; bitter → coarser.",
    ],
  },
];

export function getMethod(id: MethodId): BrewMethod {
  const method = METHODS.find((m) => m.id === id);
  if (!method) throw new Error(`Unknown brew method: ${id}`);
  return method;
}

/** Brew ratio as "1:16.7". */
export function brewRatio(method: Pick<BrewMethod, "doseG" | "waterG">): string {
  const ratio = method.waterG / method.doseG;
  return `1:${ratio.toFixed(1)}`;
}

/** Share of the espresso dose that ends up in the cup, as "21%". */
export function yieldPct(method: Pick<BrewMethod, "doseG" | "waterG">): string {
  return `${Math.round((method.waterG / method.doseG) * 100)}%`;
}

/** Elapsed seconds → "m:ss" (brew edition). */
export function formatBrewTime(timeS: number): string {
  const m = Math.floor(timeS / 60);
  const s = timeS % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
