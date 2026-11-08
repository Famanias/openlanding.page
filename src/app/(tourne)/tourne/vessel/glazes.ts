export type Glaze = {
  id: string;
  name: string;
  firing: string;
  /** Content colours of the 3D vessel; exempt from the palette check. */
  color: string;
  roughness: number;
  sheen: number;
};

export const CLAY_COLOR = "#B8613F";
export const WHEEL_COLOR = "#2A231F";
export const WHEEL_RIM_COLOR = "#8A7A6C";

export const GLAZES: readonly Glaze[] = [
  { id: "celadon", name: "Celadon", firing: "Cone 10, reduction", color: "#9DBFAC", roughness: 0.28, sheen: 0.6 },
  { id: "ash", name: "Wood Ash", firing: "Cone 10, wood", color: "#E9E3D3", roughness: 0.4, sheen: 0.4 },
  { id: "tenmoku", name: "Tenmoku", firing: "Cone 10, reduction", color: "#3B2A22", roughness: 0.18, sheen: 0.9 },
  { id: "rust", name: "Rust Slip", firing: "Cone 6, oxidation", color: "#B24A2A", roughness: 0.5, sheen: 0.25 },
  { id: "ink", name: "Soot Ink", firing: "Cone 6, oxidation", color: "#26211E", roughness: 0.62, sheen: 0.12 },
  { id: "raw", name: "Bare Clay", firing: "Cone 04, bisque", color: CLAY_COLOR, roughness: 0.85, sheen: 0 },
];

export function glazeById(id: string): Glaze {
  return GLAZES.find((glaze) => glaze.id === id) ?? GLAZES[0];
}
