import type { Note, OlfactoryTier } from "../drydown/evaporation";

export interface OrganVial {
  id: string;
  name: string;
  shortName: string;
  origin: string;
  tier: OlfactoryTier;
  note: Note;
}

export interface BespokeBlend {
  title: string;
  batchCode: string;
  notes: Note[];
  longevity: string;
  formula: string;
}

export const ORGAN_SHELVES: Record<OlfactoryTier, OrganVial[]> = {
  top: [
    {
      id: "t1",
      name: "Néroli de Vallauris",
      shortName: "Néroli",
      origin: "Vallauris, France",
      tier: "top",
      note: {
        name: "Néroli de Vallauris",
        tier: "top",
        onset: 0,
        fade: 0.5,
        gone: 1.0,
        description: "Steam-distilled bitter orange flower with green honeysuckle nuance",
      },
    },
    {
      id: "t2",
      name: "Bergamote Verte",
      shortName: "Bergamote",
      origin: "Reggio Calabria, Italy",
      tier: "top",
      note: {
        name: "Bergamote Verte",
        tier: "top",
        onset: 0,
        fade: 0.4,
        gone: 0.8,
        description: "Sparkling green citrus with an astringent Earl Grey finish",
      },
    },
    {
      id: "t3",
      name: "Baie Rose Givrée",
      shortName: "Baie Rose",
      origin: "Madagascar",
      tier: "top",
      note: {
        name: "Baie Rose Givrée",
        tier: "top",
        onset: 0,
        fade: 0.6,
        gone: 1.1,
        description: "Cold-extracted pink peppercorn with dry pine resin facets",
      },
    },
    {
      id: "t4",
      name: "Petitgrain Mandarine",
      shortName: "Petitgrain",
      origin: "Sicily, Italy",
      tier: "top",
      note: {
        name: "Petitgrain Mandarine",
        tier: "top",
        onset: 0,
        fade: 0.5,
        gone: 1.2,
        description: "Herbaceous leaves with a tart, sunlit citrus pulp undertone",
      },
    },
    {
      id: "t5",
      name: "Cardamome Noire",
      shortName: "Cardamome",
      origin: "Kerala, India",
      tier: "top",
      note: {
        name: "Cardamome Noire",
        tier: "top",
        onset: 0,
        fade: 0.7,
        gone: 1.3,
        description: "Smoky, camphoraceous pods crushed by mortar",
      },
    },
  ],
  heart: [
    {
      id: "h1",
      name: "Iris Pallida (Beurre 18%)",
      shortName: "Iris",
      origin: "Grasse, France",
      tier: "heart",
      note: {
        name: "Iris Pallida",
        tier: "heart",
        onset: 0.3,
        fade: 5.5,
        gone: 8.5,
        description: "Three-year cured rhizomes yielding buttery powdered violet stone",
      },
    },
    {
      id: "h2",
      name: "Rose Centifolia de Mai",
      shortName: "Rose de Mai",
      origin: "Grasse, France",
      tier: "heart",
      note: {
        name: "Rose de Mai",
        tier: "heart",
        onset: 0.4,
        fade: 4.8,
        gone: 7.5,
        description: "May harvest cabbage rose with honeyed peppery petals",
      },
    },
    {
      id: "h3",
      name: "Encens Oliban",
      shortName: "Encens",
      origin: "Dhofar, Oman",
      tier: "heart",
      note: {
        name: "Encens Oliban",
        tier: "heart",
        onset: 0.5,
        fade: 4.5,
        gone: 7.0,
        description: "Sacred frankincense gum tears crying cool chapel stone",
      },
    },
    {
      id: "h4",
      name: "Thé Noir Fumé",
      shortName: "Thé Fumé",
      origin: "Wuyi Mountains, China",
      tier: "heart",
      note: {
        name: "Thé Noir Fumé",
        tier: "heart",
        onset: 0.4,
        fade: 4.2,
        gone: 6.8,
        description: "Smoked pine-needle black tea with roasted tannin grip",
      },
    },
    {
      id: "h5",
      name: "Jasmin Grandiflorum",
      shortName: "Jasmin",
      origin: "Grasse, France",
      tier: "heart",
      note: {
        name: "Jasmin",
        tier: "heart",
        onset: 0.5,
        fade: 5.0,
        gone: 8.0,
        description: "Night-picked star blossoms with indol warmth and tea-like tea facets",
      },
    },
  ],
  base: [
    {
      id: "b1",
      name: "Labdanum de l'Estérel",
      shortName: "Labdanum",
      origin: "Var, France",
      tier: "base",
      note: {
        name: "Labdanum",
        tier: "base",
        onset: 1.0,
        fade: 9.0,
        gone: 16.0,
        description: "Amber rockrose resin smelling of dry scrub hills and caramel leather",
      },
    },
    {
      id: "b2",
      name: "Goudron de Bouleau",
      shortName: "Bouleau",
      origin: "Finland",
      tier: "base",
      note: {
        name: "Goudron de Bouleau",
        tier: "base",
        onset: 1.2,
        fade: 9.5,
        gone: 15.0,
        description: "Charred birch bark distillate evoking saddlery leather and embers",
      },
    },
    {
      id: "b3",
      name: "Oud Sauvage",
      shortName: "Oud",
      origin: "Assam, India",
      tier: "base",
      note: {
        name: "Oud Sauvage",
        tier: "base",
        onset: 1.5,
        fade: 10.0,
        gone: 18.0,
        description: "Wild-harvested aquilaria tree resin aged in terracotta",
      },
    },
    {
      id: "b4",
      name: "Vétiver de Bourbon",
      shortName: "Vétiver",
      origin: "Réunion Island",
      tier: "base",
      note: {
        name: "Vétiver",
        tier: "base",
        onset: 1.0,
        fade: 8.5,
        gone: 14.0,
        description: "Nutty, smoky subterranean grass roots washed in volcanic soil",
      },
    },
    {
      id: "b5",
      name: "Benjoin de Siam",
      shortName: "Benjoin",
      origin: "Laos",
      tier: "base",
      note: {
        name: "Benjoin",
        tier: "base",
        onset: 1.2,
        fade: 9.0,
        gone: 15.5,
        description: "Almond-scented crystalline balsam tears with warm vanilla glaze",
      },
    },
  ],
};

export function getOrganVial(tier: OlfactoryTier, id: string): OrganVial {
  const shelf = ORGAN_SHELVES[tier];
  return shelf.find((v) => v.id === id) ?? shelf[0];
}

/** Compute derived blend composition based on the 3 chosen vials. */
export function deriveBespokeBlend(
  topId: string,
  heartId: string,
  baseId: string,
): BespokeBlend {
  const topVial = getOrganVial("top", topId);
  const heartVial = getOrganVial("heart", heartId);
  const baseVial = getOrganVial("base", baseId);

  const topIdx = ORGAN_SHELVES.top.findIndex((v) => v.id === topVial.id) + 1;
  const heartIdx = ORGAN_SHELVES.heart.findIndex((v) => v.id === heartVial.id) + 1;
  const baseIdx = ORGAN_SHELVES.base.findIndex((v) => v.id === baseVial.id) + 1;

  const batchCode = `B-${topIdx.toString().padStart(2, "0")}${heartIdx}${baseIdx}`;
  const title = `${topVial.shortName} · ${heartVial.shortName} · ${baseVial.shortName}`;

  // Longevity estimation
  const maxGone = Math.max(topVial.note.gone, heartVial.note.gone, baseVial.note.gone);
  const longevity = `Lasts past ${Math.floor(maxGone)} h on skin`;
  const formula = `${topVial.origin} + ${heartVial.origin} + ${baseVial.origin}`;

  return {
    title,
    batchCode,
    notes: [topVial.note, heartVial.note, baseVial.note],
    longevity,
    formula,
  };
}
