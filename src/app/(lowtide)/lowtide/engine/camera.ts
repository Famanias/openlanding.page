import * as THREE from "three";
import { damp, lerp, smoothstep } from "../motion/math";
import { CHAPTER_POINTS } from "../night/clock";
import { SHORE_LENGTH } from "./shore";
import type { Part, WorldCtx } from "./types";

/**
 * The visitor walks the shore: progress dollies the camera along x, with a slow breathing bob that the
 * roughness exaggerates and the stillness flattens. At dawn it lifts and tilts toward the sky.
 */
export function createCameraRig(ctx: WorldCtx): Part {
  const cam = ctx.camera;
  const look = new THREE.Vector3();
  let bob = 0;
  let sway = 0;
  return {
    update(f) {
      const x = f.p * SHORE_LENGTH;
      const dawn = smoothstep(CHAPTER_POINTS.reveal + 0.01, 1, f.p);
      const amp = 0.12 * (1 + f.roughness * 4) * (1 - f.calm * 0.8);
      bob = damp(bob, Math.sin(f.time * 0.45) * amp, 3, f.dt);
      sway = damp(sway, f.lantern.active ? f.lantern.x * 1.6 : 0, 1.5, f.dt);
      cam.position.set(x + sway, lerp(5.2, 7.5, dawn) + bob, 38);
      look.set(x + sway * 0.4, lerp(0.4, 9, dawn), -42);
      cam.lookAt(look);
      ctx.shared.uCameraPos.value.copy(cam.position);
    },
    dispose() {},
  };
}
