import type { GlassParams } from "../sampler/params";

export type Material = {
  id: string;
  name: string;
  /** the catalogue code engraved on the swatch */
  code: string;
  note: string;
  use: string;
  /** which drawn swatch finish the card uses */
  finish: "clear" | "dense" | "frost" | "pale" | "hard" | "film";
  params: GlassParams;
};

/** The six cuts every Cullet seat starts with. Values are the real-world glasses they're tuned against. */
export const MATERIALS: Material[] = [
  {
    id: "crown-silica", name: "Crown silica", code: "CU-152", finish: "clear",
    note: "The everyday window glass, low dispersion and clean edges.",
    use: "Product shells, bottles, UI cards",
    params: { ior: 1.52, dispersion: 0.34, roughness: 0.05, thickness: 1.2, iridescence: 0 },
  },
  {
    id: "dense-flint", name: "Dense flint", code: "CU-172", finish: "dense",
    note: "Heavy lead-free flint. Bends hard and throws rainbows off every bevel.",
    use: "Jewellery, prisms, hero objects",
    params: { ior: 1.72, dispersion: 0.69, roughness: 0.02, thickness: 1.6, iridescence: 0 },
  },
  {
    id: "frosted-quartz", name: "Frosted quartz", code: "CU-154", finish: "frost",
    note: "Satin-etched faces under a polished clearcoat, with a pearl sheen.",
    use: "Interfaces, the Cullet hero itself",
    params: { ior: 1.54, dispersion: 0.29, roughness: 0.22, thickness: 1.4, iridescence: 0.65 },
  },
  {
    id: "borosilicate", name: "Borosilicate", code: "CU-147", finish: "pale",
    note: "Lab glass. Thin, tough, quiet. Almost no colour fringing.",
    use: "Drinkware, lab scenes, lighting",
    params: { ior: 1.47, dispersion: 0.31, roughness: 0.04, thickness: 0.8, iridescence: 0 },
  },
  {
    id: "sapphire", name: "Sapphire", code: "CU-177", finish: "hard",
    note: "Synthetic sapphire crystal. Very high index, very low dispersion.",
    use: "Watch faces, camera lenses, sensors",
    params: { ior: 1.77, dispersion: 0.28, roughness: 0.01, thickness: 1, iridescence: 0 },
  },
  {
    id: "opal-film", name: "Opal film", code: "CU-145", finish: "film",
    note: "A soft body under a 280–680 nm thin film. Shifts colour as you turn it.",
    use: "Packaging, cosmetics, motion design",
    params: { ior: 1.45, dispersion: 0.2, roughness: 0.35, thickness: 0.6, iridescence: 1 },
  },
];

export const materialById = (id: string) => MATERIALS.find((m) => m.id === id);
