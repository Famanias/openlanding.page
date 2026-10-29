import { createWorkshop } from "./workshop";
import { createDuskStreet } from "./duskStreet";
import { createPaperDive } from "./paperDive";
import { createWorkbench } from "./workbench";
import { createThreshold } from "./threshold";
import { createGenkan } from "./genkan";
import type { WorldTextures } from "../textures";
export const createWorlds = (t: WorldTextures, software: boolean) => [
  createWorkshop(t, software),
  createDuskStreet(t, software),
  createPaperDive(t, software),
  createWorkbench(t, software),
  createThreshold(t, software),
  createGenkan(t, software),
];
