import * as THREE from "three";
import { SENSORS } from "../content/story";
import { createPoolSurface } from "./poolSurface";
import { POOLS } from "./pools";
import { sandBase } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText } from "./worldText";

/** What each sensor pool does to its water: a heartbeat, a slow warmth, a breath. */
const EFFECTS: Record<(typeof SENSORS)[number]["id"], string> = {
  // rings leave the centre once a second (60 bpm), with a double beat
  heart: /* glsl */ `
    float beat = fract(uTime);
    float ring = sin((r - beat * 1.1) * 26.0) * smoothstep(0.25, 0.0, abs(r - beat * 1.1));
    float ring2 = sin((r - (beat - 0.18) * 1.1) * 26.0) * smoothstep(0.2, 0.0, abs(r - (beat - 0.18) * 1.1)) * 0.6;
    glow = max(ring, 0.0) + max(ring2, 0.0);
    col *= 0.9 + 0.2 * (ring + ring2);`,
  // the water warms toward amber and cools back over eight seconds
  temperature: /* glsl */ `
    float warm = 0.5 + 0.5 * sin(uTime * 0.785);
    vec3 tint = mix(vec3(0.25, 0.5, 0.9), vec3(1.0, 0.62, 0.32), warm);
    col = mix(col, col * 0.5 + tint * 0.35, uAmount * (0.6 - 0.35 * r));
    glow = 0.15 * (1.0 - r);`,
  // twelve breaths a minute: the surface brightens and a soft rim swells and settles
  breathing: /* glsl */ `
    float breath = 0.5 + 0.5 * sin(uTime * 1.2566);
    float swell = smoothstep(0.55 + 0.35 * breath, 0.5 + 0.35 * breath, r) * smoothstep(0.3 * breath, 0.5 + 0.3 * breath, r);
    glow = swell * 0.9 + breath * 0.12;`,
};

/** The three sensor pools on the second low tide, each labelled where the lantern finds it. */
export function createSensorPools(ctx: WorldCtx): Part {
  const group = new THREE.Group();
  const items = SENSORS.map((s) => {
    const pool = POOLS.find((p) => p.id === s.id)!;
    const surface = createPoolSurface(ctx, pool, EFFECTS[s.id]);
    // names and lines lie on the sand in front of each pool, tilted toward the visitor
    // the name lies on the wet sand just in front of its pool (the longer line lives in the tide table)
    const nz = pool.z + pool.r + 1.4;
    const name = createWorldText(ctx, { text: s.name, font: ctx.fonts.display, fontSize: 1.8, mode: "lantern", tear: 0.8, color: 0xdff2ff, anchorY: "bottom" });
    name.mesh.position.set(pool.x, sandBase(nz) + 0.08, nz);
    name.mesh.rotation.x = -Math.PI / 2 + 0.35;
    group.add(surface.mesh, name.mesh);
    return { surface, name };
  });
  ctx.scene.add(group);

  return {
    update(_f, w) {
      const y = ctx.shared.uWaterY.value;
      for (const it of items) {
        it.surface.update(y);
        it.surface.uAmount.value = w.sensors;
        it.name.uWeight.value = w.sensors;
        it.name.mesh.visible = w.sensors > 0.001;
      }
    },
    dispose() {
      items.forEach((it) => {
        it.surface.dispose();
        it.name.dispose();
      });
    },
  };
}
