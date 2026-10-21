export interface LedgerEntry {
  edition: string;
  vintage: string;
  caskId: string;
  source: string;
  bottledDate: string;
  flacons: number;
  status: "Resting in oak" | "Cellar reserve" | "Released";
}

export interface AtelierMetric {
  number: string;
  label: string;
  detail: string;
}

export const ATELIER_METRICS: AtelierMetric[] = [
  {
    number: "312",
    label: "Raw Materials",
    detail: "Single-origin botanical extractions and rare resins cataloged in the laboratory ledger.",
  },
  {
    number: "18 mo.",
    label: "Oak Maceration",
    detail: "Every batch rests in small 50-litre Limousin oak casks to soften alcohol astringency.",
  },
  {
    number: "400",
    label: "Flacons Per Edition",
    detail: "Individually filled by gravity, sealed with natural baudruche, and inscribed by hand.",
  },
  {
    number: "4",
    label: "Editions Annually",
    detail: "Four distinct compositions released with each turning of the agricultural seasons in Grasse.",
  },
];

export const MACERATION_LEDGER: LedgerEntry[] = [
  {
    edition: "Édition 05",
    vintage: "Automne 2024",
    caskId: "FÛT-042",
    source: "Tuscan Orris / Calabria Bergamot",
    bottledDate: "Mars 2026",
    flacons: 400,
    status: "Cellar reserve",
  },
  {
    edition: "Édition 06",
    vintage: "Hiver 2024",
    caskId: "FÛT-051",
    source: "Atlas Cedar / Somali Myrrh",
    bottledDate: "Juin 2026",
    flacons: 400,
    status: "Cellar reserve",
  },
  {
    edition: "Édition 07",
    vintage: "Printemps 2025",
    caskId: "FÛT-059",
    source: "Grasse Iris Pallida / Cistus Esterel",
    bottledDate: "Septembre 2026",
    flacons: 400,
    status: "Released",
  },
  {
    edition: "Édition 08",
    vintage: "Été 2025",
    caskId: "FÛT-068",
    source: "Vallauris Orange Blossom / Wild Oud",
    bottledDate: "Février 2027",
    flacons: 400,
    status: "Resting in oak",
  },
];
