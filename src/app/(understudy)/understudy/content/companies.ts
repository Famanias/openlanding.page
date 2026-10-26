/** The fictional companies casting from the studio. Each wordmark is drawn from a glyph and a type treatment. */
export type Glyph = "dot" | "square" | "tri" | "wave" | "ring" | "bars" | "leaf" | "spark";
export type Treatment = "bold" | "light" | "caps" | "mono" | "serif" | "round";

export type Company = { id: string; name: string; glyph: Glyph; treatment: Treatment; sector: string };

export const COMPANIES: Company[] = [
  { id: "parcelpost", name: "Parcelpost", glyph: "square", treatment: "bold", sector: "Logistics" },
  { id: "halcyon", name: "Halcyon Bank", glyph: "ring", treatment: "serif", sector: "Fintech" },
  { id: "fernway", name: "fernway", glyph: "leaf", treatment: "round", sector: "Health" },
  { id: "lumen", name: "LUMEN GAMES", glyph: "spark", treatment: "caps", sector: "Games" },
  { id: "quillo", name: "Quillo", glyph: "dot", treatment: "light", sector: "Writing tools" },
  { id: "tidewell", name: "Tidewell", glyph: "wave", treatment: "bold", sector: "Energy" },
  { id: "arbor", name: "Arbor&Co", glyph: "tri", treatment: "serif", sector: "Retail" },
  { id: "kestrel", name: "kestrel", glyph: "bars", treatment: "mono", sector: "Analytics" },
  { id: "brightloop", name: "Brightloop", glyph: "ring", treatment: "round", sector: "Education" },
  { id: "pinecrest", name: "PINECREST", glyph: "tri", treatment: "caps", sector: "Insurance" },
  { id: "sundry", name: "sundry", glyph: "dot", treatment: "bold", sector: "Groceries" },
  { id: "ledgerly", name: "Ledgerly", glyph: "bars", treatment: "light", sector: "Accounting" },
  { id: "wavelength", name: "Wavelength", glyph: "wave", treatment: "serif", sector: "Audio" },
  { id: "otterly", name: "otterly", glyph: "leaf", treatment: "round", sector: "Pet care" },
  { id: "fieldnote", name: "Fieldnote", glyph: "square", treatment: "mono", sector: "Research" },
  { id: "copperline", name: "COPPERLINE", glyph: "spark", treatment: "caps", sector: "Telecom" },
  { id: "nimbus", name: "Nimbus Rail", glyph: "wave", treatment: "light", sector: "Transport" },
  { id: "saltbox", name: "Saltbox", glyph: "square", treatment: "bold", sector: "Hospitality" },
];

/** The ten companies that call back in the casting scene, alternating left and right of the reel. */
export const CALLBACKS = ["parcelpost", "halcyon", "lumen", "fernway", "kestrel", "tidewell", "brightloop", "ledgerly", "arbor", "wavelength"] as const;

export const companyById = (id: string): Company => {
  const company = COMPANIES.find((c) => c.id === id);
  if (!company) throw new Error(`unknown company ${id}`);
  return company;
};

/** The two drifting rows on the dark house: the list split in half, the second row reversed. */
export const HOUSE_ROWS: [Company[], Company[]] = [COMPANIES.slice(0, 9), COMPANIES.slice(9).reverse()];

/** The headline figure on the dark house. */
export const CASTING_COMPANIES = 3400;
