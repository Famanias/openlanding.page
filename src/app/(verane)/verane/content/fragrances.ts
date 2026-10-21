import type { Note } from "../drydown/evaporation";

export interface Fragrance {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  emphasis: "Top-led" | "Heart-led" | "Base-led" | "Atmospheric";
  leadSummary: string;
  description: string;
  assetKey: string;
  editionStamp: string;
  macerationMonths: number;
  notes: Note[];
}

export const FRAGRANCES: Fragrance[] = [
  {
    slug: "premiere-heure",
    number: "Nº 1",
    title: "Première Heure",
    subtitle: "bergamot, petitgrain, cold tea",
    emphasis: "Top-led",
    leadSummary: "Bright citrus and bitter tea leaves for the opening forty minutes, softening into linen musk.",
    description:
      "Formulated to celebrate the morning opening of the salon. Cold-pressed green citrus cuts through mountain air before yielding to translucent white woods.",
    assetKey: "flacon-01",
    editionStamp: "Édition 07 · 400 flacons",
    macerationMonths: 18,
    notes: [
      {
        name: "Calabrian Bergamot",
        tier: "top",
        onset: 0,
        fade: 0.45,
        gone: 0.9,
        description: "Cold-pressed peel with a sharp, mineral facet",
      },
      {
        name: "Bitter Petitgrain",
        tier: "top",
        onset: 0,
        fade: 0.6,
        gone: 1.2,
        description: "Twigs and leaves of the bitter orange tree",
      },
      {
        name: "Cold Mountain Tea",
        tier: "heart",
        onset: 0.35,
        fade: 2.8,
        gone: 4.5,
        description: "Dry green tannins steeped in cool spring water",
      },
      {
        name: "Neroli Distillate",
        tier: "heart",
        onset: 0.4,
        fade: 3.2,
        gone: 5.0,
        description: "Steam-distilled orange blossoms from Vallauris",
      },
      {
        name: "Atlas Cedarwood",
        tier: "base",
        onset: 1.0,
        fade: 7.5,
        gone: 13.0,
        description: "Dry, pencil-shaving cedar shavings",
      },
      {
        name: "Clean Skin Musk",
        tier: "base",
        onset: 1.5,
        fade: 9.0,
        gone: 14.5,
        description: "Close, quiet warmth that clings to cotton and skin",
      },
    ],
  },
  {
    slug: "iris-calcaire",
    number: "Nº 2",
    title: "Iris Calcaire",
    subtitle: "orris butter, chalk, suede",
    emphasis: "Heart-led",
    leadSummary: "Powdered limestone and cured Florentine rhizome. The iris blossoms at hour two and holds through twilight.",
    description:
      "The house signature. Three-year-aged orris root macerated with chalk dust and pale suede leather. It does not shout; it lingers like an echo in a stone cloister.",
    assetKey: "flacon-02",
    editionStamp: "Édition 07 · 400 flacons",
    macerationMonths: 18,
    notes: [
      {
        name: "Ambrette Seed",
        tier: "top",
        onset: 0,
        fade: 0.5,
        gone: 1.0,
        description: "Botanical musk with a pear-skin nuance",
      },
      {
        name: "Chalk Accord",
        tier: "top",
        onset: 0,
        fade: 0.8,
        gone: 1.5,
        description: "Dry, cool limestone dust after rain",
      },
      {
        name: "Pallida Orris Butter 18%",
        tier: "heart",
        onset: 0.3,
        fade: 5.5,
        gone: 8.5,
        description: "Noble rhizomes aged for 36 months, slow-distilled into butter",
      },
      {
        name: "Violet Leaf Absolute",
        tier: "heart",
        onset: 0.4,
        fade: 4.5,
        gone: 7.0,
        description: "Metallic, aqueous crushed green leaves",
      },
      {
        name: "Pale Suede",
        tier: "base",
        onset: 1.0,
        fade: 8.5,
        gone: 14.0,
        description: "Brushed sheepskin lining worn soft by hand",
      },
      {
        name: "Cistus Labdanum",
        tier: "base",
        onset: 1.5,
        fade: 9.5,
        gone: 16.0,
        description: "Golden rockrose resin harvested in the Esterel hills",
      },
    ],
  },
  {
    slug: "fumee-lente",
    number: "Nº 3",
    title: "Fumée Lente",
    subtitle: "birch tar, labdanum, aged oud",
    emphasis: "Base-led",
    leadSummary: "Muffled opening of dried hay and bitter resin. The birch smoke peaks at hour six and lasts into the next dawn.",
    description:
      "A slow, smoldering study in patient woods. Heavy resinous tears melted over glowing coals, filtered through sweet clover and toasted tonka bean.",
    assetKey: "flacon-03",
    editionStamp: "Édition 07 · 400 flacons",
    macerationMonths: 18,
    notes: [
      {
        name: "Sun-Dried Hay",
        tier: "top",
        onset: 0,
        fade: 0.4,
        gone: 0.85,
        description: "Sweet coumarin warmth from mown Alpine grasses",
      },
      {
        name: "Bitter Almond Extract",
        tier: "top",
        onset: 0,
        fade: 0.5,
        gone: 1.1,
        description: "Dry marzipan edge that rapidly evaporates",
      },
      {
        name: "Frankincense Tears",
        tier: "heart",
        onset: 0.5,
        fade: 4.0,
        gone: 6.5,
        description: "Green, peppery gum resin from Boswellia sacra",
      },
      {
        name: "Toasted Tonka Bean",
        tier: "heart",
        onset: 0.6,
        fade: 5.0,
        gone: 8.0,
        description: "Caramelized dark bean with faint tobacco sweetness",
      },
      {
        name: "Rectified Birch Tar",
        tier: "base",
        onset: 1.0,
        fade: 9.0,
        gone: 15.0,
        description: "Dark, phenolic smoke of Russian leather curriers",
      },
      {
        name: "Wild Aquilaria Oud",
        tier: "base",
        onset: 1.5,
        fade: 10.5,
        gone: 18.0,
        description: "Damp, balsamic aged resin from fallen heartwood",
      },
    ],
  },
  {
    slug: "nuit-doratoire",
    number: "Nº 4",
    title: "Nuit d'Oratoire",
    subtitle: "cypress, myrrh, benzoin",
    emphasis: "Atmospheric",
    leadSummary: "Nocturnal silence in the Grasse chapel courtyard. Cold night cypress giving way to balsamic incense.",
    description:
      "Named for the 17th-century Oratoire chapel on our street. The stillness of stone corridors in winter, illuminated by beeswax tapers and ancient resins.",
    assetKey: "flacon-04",
    editionStamp: "Édition 07 · 400 flacons",
    macerationMonths: 18,
    notes: [
      {
        name: "Provence Cypress Needle",
        tier: "top",
        onset: 0,
        fade: 0.5,
        gone: 1.0,
        description: "Astringent, resinous green needle snap in cold air",
      },
      {
        name: "Lavender Concrete",
        tier: "top",
        onset: 0,
        fade: 0.7,
        gone: 1.3,
        description: "Herbal, honeyed wax from high-altitude lavender",
      },
      {
        name: "Somali Myrrh",
        tier: "heart",
        onset: 0.4,
        fade: 4.8,
        gone: 7.5,
        description: "Medicinal, bitter-sweet resinous tears",
      },
      {
        name: "Beeswax Absolute",
        tier: "heart",
        onset: 0.5,
        fade: 5.0,
        gone: 8.0,
        description: "Warm, pollen-laden honeyed taper smoke",
      },
      {
        name: "Siam Benzoin",
        tier: "base",
        onset: 1.0,
        fade: 8.5,
        gone: 14.5,
        description: "Sweet, balsamic vanilla-tinged storax gum",
      },
      {
        name: "Dark Aged Patchouli",
        tier: "base",
        onset: 1.2,
        fade: 9.5,
        gone: 16.0,
        description: "Earthy, velvety cellar-cured leaves",
      },
    ],
  },
];

export function getFragranceBySlug(slug: string): Fragrance {
  return FRAGRANCES.find((f) => f.slug === slug) ?? FRAGRANCES[1]; // default to Iris Calcaire
}
