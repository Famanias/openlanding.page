/** The ten tiles of the shared 5×2 clip sheet, row-major. Each card plays one; each also has a drawn scene. */
export const SCENE_IDS = [
  "sneaker",
  "skincare",
  "latte-pour",
  "headphones",
  "plant-shop",
  "bouquet",
  "pottery",
  "serum",
  "latte-top",
  "headphone-stand",
] as const;

export type SceneId = (typeof SCENE_IDS)[number];

export type Reel = { scene: SceneId; title: string; maker: string };

export const REELS: readonly Reel[] = [
  { scene: "sneaker", title: "Sneaker drop, heel to toe", maker: "Imani Okafor" },
  { scene: "skincare", title: "Skincare splash", maker: "Tove Lindqvist" },
  { scene: "latte-pour", title: "Latte pour", maker: "Mateo Ruiz" },
  { scene: "headphones", title: "Headphones, pulse test", maker: "Jonas Weber" },
  { scene: "plant-shop", title: "Plant shop morning", maker: "Priya Nair" },
  { scene: "bouquet", title: "Florist bouquet wrap", maker: "Priya Nair" },
  { scene: "pottery", title: "Pottery wheel", maker: "Hana Sato" },
  { scene: "serum", title: "Serum drop", maker: "Tove Lindqvist" },
  { scene: "latte-top", title: "Latte, top-down", maker: "Mateo Ruiz" },
  { scene: "headphone-stand", title: "Headphones on a stand", maker: "Jonas Weber" },
];
