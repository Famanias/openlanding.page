import * as THREE from "three";
import { damp } from "../motion/math";
import { FOOTPRINTS } from "./footprints";
import { FOG, LANTERN, NOISE } from "./glsl";
import { MAX_POOLS, POOLS } from "./pools";
import { SHORE_LENGTH, SLOPE } from "./shore";
import type { Part, WorldCtx } from "./types";

/** GLSL for the beach height, shared with anything that needs to sit on the sand. */
export const SAND_HEIGHT = /* glsl */ `
uniform vec4 uPools[${MAX_POOLS}];
uniform int uPoolCount;
float lt_poolMask(vec2 p, vec4 pool) {
  float d = length(p - pool.xy) / pool.z;
  return 1.0 - smoothstep(0.55, 1.0, d);
}
float lt_sandHeight(vec2 p) {
  float h = ${SLOPE.toFixed(4)} * p.y;
  // around each pool the beach is smoothed flat, so the basin and its water line up exactly
  float calmZone = 0.0;
  for (int i = 0; i < ${MAX_POOLS}; i++) {
    if (i >= uPoolCount) break;
    calmZone = max(calmZone, 1.0 - smoothstep(1.0, 1.8, length(p - uPools[i].xy) / uPools[i].z));
  }
  h += (lt_fbm(p * 0.018) - 0.5) * 0.7 * (1.0 - calmZone);
  float rip = sin(dot(p, vec2(0.35, 1.45)) + lt_fbm(p * 0.12) * 5.0);
  h += 0.035 * rip * smoothstep(-80.0, 10.0, p.y) * (1.0 - calmZone);
  for (int i = 0; i < ${MAX_POOLS}; i++) {
    if (i >= uPoolCount) break;
    h -= uPools[i].w * lt_poolMask(p, uPools[i]);
  }
  return h;
}
`;

/** Wet sand, ripple marks, rock pools and footprints along the whole night's shore. */
export function createSand(ctx: WorldCtx, trails: { value: THREE.Vector4[] }): Part {
  const { shared } = ctx;
  const geo = new THREE.PlaneGeometry(SHORE_LENGTH + 700, 220, 560, 140);
  geo.rotateX(-Math.PI / 2);
  geo.translate(SHORE_LENGTH / 2, 0, -60);

  const pools = Array.from({ length: MAX_POOLS }, (_, i) => {
    const p = POOLS[i];
    return p ? new THREE.Vector4(p.x, p.z, p.r, p.depth) : new THREE.Vector4();
  });

  const mat = new THREE.ShaderMaterial({
    fog: false,
    uniforms: {
      uPools: { value: pools },
      uPoolCount: { value: POOLS.length },
      uTrails: trails,
      uLantern: shared.uLantern,
      uResolution: shared.uResolution,
      uMoonDir: shared.uMoonDir,
      uMoonColor: shared.uMoonColor,
      uZenith: shared.uZenith,
      uHorizon: shared.uHorizon,
      uWetLine: shared.uWetLine,
      uWaterY: shared.uWaterY,
      uDawn: shared.uDawn,
      uCam: shared.uCameraPos,
      uTime: shared.uTime,
    },
    vertexShader: /* glsl */ `
      ${NOISE}
      ${SAND_HEIGHT}
      varying vec3 vWorld; varying float vH;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        w.y = lt_sandHeight(w.xz);
        vWorld = w.xyz; vH = w.y;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uMoonDir; uniform vec3 uMoonColor; uniform vec3 uZenith; uniform vec3 uHorizon;
      uniform float uWetLine; uniform float uWaterY; uniform float uDawn; uniform vec3 uCam; uniform float uTime;
      ${NOISE}
      ${SAND_HEIGHT}
      ${LANTERN}
      ${FOG}
      ${FOOTPRINTS}
      varying vec3 vWorld; varying float vH;
      // fine ripple marks and grain, too small for the mesh: shaded through a per-pixel normal
      float lt_detail(vec2 p) {
        float rip = sin(dot(p, vec2(0.5, 2.1)) + lt_fbm(p * 0.15) * 6.0);
        return 0.05 * rip * rip + 0.012 * lt_noise(p * 9.0);
      }
      void main() {
        vec3 Ng = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
        if (Ng.y < 0.0) Ng = -Ng;
        vec3 V = normalize(uCam - vWorld);
        vec2 p = vWorld.xz;
        float e = 0.08;
        float d0 = lt_detail(p);
        vec2 grad = vec2(lt_detail(p + vec2(e, 0.0)) - d0, lt_detail(p + vec2(0.0, e)) - d0) / e;
        float fade = 1.0 - smoothstep(25.0, 140.0, length(uCam - vWorld));
        vec3 N = normalize(Ng + vec3(-grad.x, 0.0, -grad.y) * fade);

        float grain = lt_noise(p * 6.0) * 0.5 + lt_noise(p * 21.0) * 0.5;
        vec3 dry = mix(vec3(0.085, 0.085, 0.09), vec3(0.13, 0.125, 0.12), grain);
        float prints = lt_prints(p);
        float wet = max(smoothstep(0.0, 0.35, uWetLine - vH), prints * 0.9);
        vec3 albedo = mix(dry, dry * 0.38 + vec3(0.0, 0.004, 0.01), wet);
        albedo *= 1.0 - prints * 0.55;

        // pools keep water below their rim after the sea has gone
        float poolWater = 0.0;
        for (int i = 0; i < ${MAX_POOLS}; i++) {
          if (i >= uPoolCount) break;
          float rim = ${SLOPE.toFixed(4)} * uPools[i].y - 0.06;
          poolWater = max(poolWater, step(vH, rim) * lt_poolMask(p, uPools[i]));
        }

        vec3 L = normalize(uMoonDir);
        float diff = max(dot(N, L), 0.0);
        vec3 ambient = mix(uZenith * 3.0, uHorizon * 0.6, 0.5) + vec3(0.015, 0.018, 0.03);
        vec3 col = albedo * (ambient + uMoonColor * diff * 0.55 + uMoonColor * uDawn * 0.9);

        // wet sand is a blurred mirror: the sky, and a glittering column under the moon
        vec3 Rv = reflect(-V, normalize(mix(N, vec3(0.0, 1.0, 0.0), 0.35)));
        vec3 skyR = mix(uHorizon, uZenith, smoothstep(0.0, 0.4, Rv.y));
        float m = max(dot(Rv, L), 0.0);
        float glitter = smoothstep(0.55, 0.95, lt_noise(p * 3.0 + uTime * 0.05));
        float streak = pow(m, 70.0) * 1.6 + pow(m, 14.0) * 0.18 * (0.5 + glitter);
        float fres = 0.25 + 0.75 * pow(1.0 - max(dot(V, vec3(0.0, 1.0, 0.0)), 0.0), 4.0);
        col = mix(col, skyR, wet * fres * 0.7);
        col += uMoonColor * streak * wet;

        // pool surfaces: still sky with a soft moon
        vec3 Rw = reflect(-V, vec3(0.0, 1.0, 0.0));
        vec3 sky = mix(uHorizon, uZenith, smoothstep(0.0, 0.5, Rw.y));
        float moonGlint = pow(max(dot(Rw, L), 0.0), 600.0) * 1.1 + pow(max(dot(Rw, L), 0.0), 40.0) * 0.08;
        col = mix(col, sky * 1.1 + uMoonColor * moonGlint, poolWater * 0.9);

        // the lantern: warm light on whatever is near the pointer
        float lt = lt_lantern();
        col += albedo * LT_LANTERN_COLOR * lt * 1.6 + LT_LANTERN_COLOR * lt * wet * 0.05;

        col = lt_fog(col, vWorld, uCam, uHorizon);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  ctx.scene.add(mesh);

  let wetLine = shared.uWaterY.value;
  return {
    update(f) {
      // sand stays wet a while after the water leaves it
      const y = shared.uWaterY.value;
      wetLine = Math.max(y, damp(wetLine, y, 0.12, f.dt));
      shared.uWetLine.value = wetLine;
    },
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}
