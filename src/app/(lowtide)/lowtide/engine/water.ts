import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { damp, lerp } from "../motion/math";
import { NOISE, LANTERN } from "./glsl";
import { SHORE_LENGTH, SLOPE, waterLevel } from "./shore";
import type { Part, WorldCtx } from "./types";

/**
 * The sea: three.js's open-source Water (planar mirror + scrolling normals), extended with the tide line,
 * shoreline foam, the lantern, and roughness/calm driving distortion. Its mirror assumes a flat plane, so
 * roughness reads through distortion, normal scale and foam rather than displaced vertices.
 */
export function createWater(ctx: WorldCtx): Part {
  const { shared } = ctx;
  const water = new Water(new THREE.PlaneGeometry(6000, 3300), {
    textureWidth: 1024,
    textureHeight: 1024,
    waterNormals: ctx.textures.waterNormal,
    sunDirection: shared.uMoonDir.value,
    sunColor: shared.uMoonColor.value,
    waterColor: 0x02060c,
    distortionScale: 2.4,
    fog: false,
    alpha: 1,
  });
  water.rotation.x = -Math.PI / 2;
  water.position.set(SHORE_LENGTH / 2, 0, -1600);
  water.renderOrder = 1;

  const mat = water.material as THREE.ShaderMaterial;
  Object.assign(mat.uniforms, {
    uLantern: shared.uLantern,
    uResolution: shared.uResolution,
    uRoughness: shared.uRoughness,
    uCalm: shared.uCalm,
    uHorizon: shared.uHorizon,
    uDawn: shared.uDawn,
    uTimeLT: shared.uTime,
    uShoreZ: { value: 0 },
  });
  mat.fragmentShader = mat.fragmentShader
    .replace(
      "uniform vec3 waterColor;",
      /* glsl */ `uniform vec3 waterColor;
      uniform float uRoughness; uniform float uCalm; uniform vec3 uHorizon; uniform float uDawn; uniform float uTimeLT; uniform float uShoreZ;
      ${LANTERN}
      ${NOISE}`,
    )
    .replace(
      "gl_FragColor = vec4( outgoingLight, alpha );",
      /* glsl */ `
      // horizon haze and dawn colour on the open water
      float far = smoothstep(200.0, 1600.0, distance);
      outgoingLight = mix(outgoingLight, uHorizon * 0.9, far * 0.85);
      // foam at the tide line: a broken band that thickens when the sea is rough
      float toShore = uShoreZ - worldPosition.z;
      float n = lt_fbm(worldPosition.xz * vec2(0.08, 0.25) + vec2(uTimeLT * 0.15, 0.0));
      float band = smoothstep(4.0 + 6.0 * uRoughness, 0.0, toShore) * smoothstep(-0.6, 0.4, toShore);
      float foam = band * smoothstep(0.45 - 0.2 * uRoughness, 0.8, n + 0.25 * sin(worldPosition.x * 0.3 + uTimeLT * 1.3));
      outgoingLight += vec3(0.55, 0.62, 0.68) * foam * (0.25 + 0.6 * uRoughness) * (1.0 - far);
      // the lantern warms the water near the pointer
      float lt = lt_lantern();
      outgoingLight += LT_LANTERN_COLOR * lt * (0.05 + 0.25 * reflectance) * (1.0 - far);
      gl_FragColor = vec4( outgoingLight, alpha );`,
    );
  mat.needsUpdate = true;
  ctx.scene.add(water);

  let swell = 0;
  let waveTime = 0;
  return {
    update(f) {
      const y = waterLevel(f.tide);
      swell = damp(swell, Math.sin(f.time * 0.7) * 0.04 * (1 + f.roughness * 5), 4, f.dt);
      water.position.y = y + swell;
      shared.uWaterY.value = y;
      mat.uniforms.uShoreZ.value = y / SLOPE;
      // integrate so a speed change never jumps the wave phase
      waveTime += f.dt * lerp(0.35, 2.2, f.roughness);
      mat.uniforms.time.value = waveTime;
      mat.uniforms.distortionScale.value = lerp(1.6, 9, f.roughness) * (1 - f.calm * 0.75);
      mat.uniforms.size.value = lerp(0.9, 2.4, f.roughness);
    },
    dispose() {
      water.geometry.dispose();
      mat.dispose();
    },
  };
}
