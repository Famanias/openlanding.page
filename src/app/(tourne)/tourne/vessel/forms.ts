import type { VesselParams } from "./profile";

export type Form = {
  id: string;
  name: string;
  use: string;
  note: string;
  priceUsd: number;
  params: VesselParams;
  defaultGlaze: string;
};

/** The five signature forms; each one loads onto the wheel. */
export const FORMS: readonly Form[] = [
  {
    id: "moon-jar",
    name: "Moon Jar",
    use: "Flowers, or nothing at all",
    note: "A belly so full it needs two throws, joined at the waist and scraped smooth.",
    priceUsd: 340,
    params: { height: 0.72, foot: 0.3, belly: 0.98, neck: 0.5, lip: 0.52 },
    defaultGlaze: "ash",
  },
  {
    id: "tall-ewer",
    name: "Tall Ewer",
    use: "Water, wine, ikebana branches",
    note: "A narrow foot and a drawn neck. Pulled in six lifts, each one slower than the last.",
    priceUsd: 280,
    params: { height: 0.92, foot: 0.26, belly: 0.62, neck: 0.22, lip: 0.42 },
    defaultGlaze: "celadon",
  },
  {
    id: "tea-bowl",
    name: "Tea Bowl",
    use: "Matcha, hot and bitter",
    note: "Thrown wide and low so the whole palm can hold the heat.",
    priceUsd: 96,
    params: { height: 0.06, foot: 0.36, belly: 0.78, neck: 0.8, lip: 0.92 },
    defaultGlaze: "tenmoku",
  },
  {
    id: "bud-vase",
    name: "Bud Vase",
    use: "One stem, one window",
    note: "A bottle the size of a fist with a throat you can feel with one finger.",
    priceUsd: 74,
    params: { height: 0.24, foot: 0.3, belly: 0.64, neck: 0.18, lip: 0.3 },
    defaultGlaze: "rust",
  },
  {
    id: "storage-crock",
    name: "Storage Crock",
    use: "Flour, ferments, wooden spoons",
    note: "Straight sides, a wide mouth and a rim thick enough to take a lid.",
    priceUsd: 190,
    params: { height: 0.5, foot: 0.54, belly: 0.74, neck: 0.7, lip: 0.72 },
    defaultGlaze: "ink",
  },
];

export function formById(id: string): Form | undefined {
  return FORMS.find((form) => form.id === id);
}
