import type { WorldTextures } from "../textures";
import { worldBase, addMotes, contactShadow, type BuiltWorld } from "./shared";
export function createThreshold(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("threshold", [0, 0, 0]),
    frame = b.standard("#B8923A", { map: t.maps.bambooColor, roughness: 0.6 }),
    paper = b.standard("#F4ECDD", {
      map: t.maps.washiColor,
      bumpMap: t.maps.washiBump,
      bumpScale: 0.008,
      emissive: "#F4ECDD",
      emissiveIntensity: 0.45,
    });
  b.box(
    [32, 0.15, 30],
    [0, -2.5, 0],
    b.standard("#F4ECDD", {
      map: t.maps.washiColor,
      bumpMap: t.maps.washiBump,
      bumpScale: 0.006,
      roughness: 0.5,
    }),
  );
  contactShadow(b);
  for (let panel = 0; panel < 5; panel++) {
    const x = (panel - 2) * 4.5,
      z = -5.5 - Math.abs(panel - 2) * 0.25;
    b.box([4.35, 7, 0.06], [x, 1, z], paper);
    for (let i = 0; i < 5; i++)
      b.box([0.045, 7.1, 0.09], [x - 2.2 + i * 1.1, 1, z + 0.05], frame);
    for (let i = 0; i < 7; i++)
      b.box([4.4, 0.045, 0.09], [x, -2.5 + i * 1.16, z + 0.05], frame);
  }
  const side = b.box([0.12, 7, 14], [-10, 1, -1], paper);
  side.castShadow = false;
  const side2 = b.box([0.12, 7, 14], [10, 1, -1], paper);
  side2.castShadow = false;
  addMotes(b, software ? 36 : 180, 80);
  b.counts.shojiPanels = 5;
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      paper.emissiveIntensity = 0.25 + f.day.value * 0.4;
    },
  };
}
