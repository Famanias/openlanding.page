import * as THREE from "three";
import { LANTERN, NOISE } from "./glsl";
import type { Pool } from "./pools";
import { SLOPE } from "./shore";
import type { WorldCtx } from "./types";

/**
 * A still pool surface laid in a rock pool's basin. `effect` is GLSL that may change `col` (vec3) and `glow` (float)
 * using `r` (0 centre → 1 rim), `uv` (−1…1), `uTime`, `uPulse` and `uAmount`.
 */
export function createPoolSurface(ctx: WorldCtx, pool: Pool, effect: string) {
  const { shared } = ctx;
  const rim = SLOPE * pool.z - 0.06;
  const uAmount = { value: 0 };
  const uPulse = { value: 0 };
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uAmount, uPulse,
      uTime: shared.uTime, uZenith: shared.uZenith, uHorizon: shared.uHorizon, uMoonDir: shared.uMoonDir, uMoonColor: shared.uMoonColor,
      uCam: shared.uCameraPos, uLantern: shared.uLantern, uResolution: shared.uResolution, uCalm: shared.uCalm, uRoughness: shared.uRoughness,
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv; varying vec3 vWorld;
      void main() {
        vUv = uv * 2.0 - 1.0;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uAmount; uniform float uPulse; uniform float uTime; uniform float uCalm; uniform float uRoughness;
      uniform vec3 uZenith; uniform vec3 uHorizon; uniform vec3 uMoonDir; uniform vec3 uMoonColor; uniform vec3 uCam;
      varying vec2 vUv; varying vec3 vWorld;
      ${NOISE}
      ${LANTERN}
      void main() {
        vec2 uv = vUv;
        float r = length(uv);
        if (r > 1.0) discard;
        vec3 V = normalize(uCam - vWorld);
        vec3 R = reflect(-V, vec3(0.0, 1.0, 0.0));
        vec3 col = mix(uHorizon, uZenith, smoothstep(0.0, 0.5, R.y)) * 1.2;
        col += uMoonColor * pow(max(dot(R, normalize(uMoonDir)), 0.0), 500.0) * 0.8;
        float glow = 0.0;
        ${effect}
        float lt = lt_lantern();
        col += vec3(1.0, 0.84, 0.6) * lt * 0.12;
        float edge = smoothstep(1.0, 0.82, r);
        gl_FragColor = vec4(col + vec3(0.45, 0.8, 1.0) * glow * uAmount, edge * 0.94);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(pool.r * 0.66, 64), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(pool.x, rim, pool.z);
  mesh.renderOrder = 3;
  return {
    mesh,
    rim,
    uAmount,
    uPulse,
    /** Visible only once the sea has dropped below the rim. */
    update(waterY: number) {
      mesh.visible = waterY < rim - 0.02;
    },
    dispose() {
      mesh.geometry.dispose();
      mat.dispose();
    },
  };
}
