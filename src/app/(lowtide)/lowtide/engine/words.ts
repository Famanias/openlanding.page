import * as THREE from "three";
import { CHAPTERS } from "../content/story";
import { damp, lerp } from "../motion/math";
import type { ChapterId } from "../night/clock";
import { chapterX, CONTENT_Z, sandBase } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText, type WorldText } from "./worldText";

type Placement = { x: number; y: number; z: number; size: number; width: number };

/** Where each chapter's headline stands. The hook floats over high water; the rest stand on the uncovered sand. */
function placement(id: ChapterId): Placement {
  const x = chapterX(id);
  if (id === "hook") return { x, y: 4.4, z: -46, size: 5.6, width: 64 };
  if (id === "dawn") return { x, y: 29, z: -60, size: 5, width: 60 };
  const z = CONTENT_Z - 4;
  return { x, y: sandBase(z) + 2.6, z, size: 4.3, width: 76 };
}

type ChapterWords = { id: ChapterId; headline: WorldText; quiet: WorldText; quietBaseY: number; rise: number };

/** Each chapter's headline (lantern-revealed) and quiet line (rises from under the surface when the visitor is still). */
export function createWords(ctx: WorldCtx): Part {
  const group = new THREE.Group();
  const words: ChapterWords[] = CHAPTERS.map((c) => {
    const at = placement(c.id);
    const headline = createWorldText(ctx, { text: c.headline, font: ctx.fonts.display, fontSize: at.size, maxWidth: at.width, mode: "lantern", tear: 1 });
    headline.mesh.position.set(at.x, at.y, at.z);
    const quiet = createWorldText(ctx, {
      text: c.quietLine, font: ctx.fonts.monoItalic, fontSize: 1.3, maxWidth: 36, mode: "calm", tear: 0.6,
      color: 0xdfe8f2, anchorY: "bottom", lineHeight: 1.35,
    });
    const qz = at.z + 8;
    const quietBaseY = c.id === "hook" ? 1.4 : c.id === "dawn" ? 26.2 : sandBase(qz) + 0.55;
    quiet.mesh.position.set(at.x, quietBaseY - 1.6, qz);
    group.add(headline.mesh, quiet.mesh);
    return { id: c.id, headline, quiet, quietBaseY, rise: 0 };
  });
  ctx.scene.add(group);

  return {
    update(f, w) {
      for (const cw of words) {
        const weight = w[cw.id];
        cw.headline.uWeight.value = weight;
        cw.quiet.uWeight.value = weight;
        // the quiet line surfaces as calm grows and sinks again with movement
        cw.rise = damp(cw.rise, f.calm * weight, 3, f.dt);
        cw.quiet.mesh.position.y = lerp(cw.quietBaseY - 1.6, cw.quietBaseY, cw.rise);
        cw.headline.mesh.visible = weight > 0.001;
        // at the reveal the specs are etched in the sand instead, and the risen ring needs the space
        cw.quiet.mesh.visible = weight > 0.001 && cw.id !== "reveal";
      }
    },
    dispose() {
      for (const cw of words) {
        cw.headline.dispose();
        cw.quiet.dispose();
      }
    },
  };
}
