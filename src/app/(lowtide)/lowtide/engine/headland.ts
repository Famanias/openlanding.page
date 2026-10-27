import * as THREE from "three";
import { NOISE } from "./glsl";
import { SHORE_LENGTH } from "./shore";
import type { Part, WorldCtx } from "./types";

const LAYERS = [
  { z: -1100, height: 150, seed: 3.1, freq: 0.0024, base: 0.18, haze: 0.85 },
  { z: -760, height: 110, seed: 8.7, freq: 0.0036, base: 0.12, haze: 0.62 },
  { z: -480, height: 70, seed: 1.9, freq: 0.0055, base: 0.05, haze: 0.4 },
];

/** Three procedural ridgelines on the far side of the bay; nearer ones slide faster as the camera walks the shore. */
export function createHeadland(ctx: WorldCtx): Part {
  const group = new THREE.Group();
  const mats: THREE.ShaderMaterial[] = [];
  for (const L of LAYERS) {
    const width = 3600;
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      fog: false,
      uniforms: {
        uHorizon: ctx.shared.uHorizon,
        uZenith: ctx.shared.uZenith,
        uMoonColor: ctx.shared.uMoonColor,
        uDawn: ctx.shared.uDawn,
        uSeed: { value: L.seed },
        uFreq: { value: L.freq },
        uBase: { value: L.base },
        uHaze: { value: L.haze },
        uHeight: { value: L.height },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv; varying vec3 vWorld;
        void main() {
          vUv = uv;
          vec4 w = modelMatrix * vec4(position, 1.0);
          vWorld = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uHorizon; uniform vec3 uZenith; uniform vec3 uMoonColor; uniform float uDawn;
        uniform float uSeed; uniform float uFreq; uniform float uBase; uniform float uHaze; uniform float uHeight;
        varying vec2 vUv; varying vec3 vWorld;
        ${NOISE}
        void main() {
          float x = vWorld.x * uFreq + uSeed * 10.0;
          float ridge = uBase + 0.55 * lt_fbm(vec2(x, uSeed)) + 0.25 * pow(lt_noise(vec2(x * 0.35, uSeed * 2.0)), 2.0);
          float y = vUv.y;
          float edge = smoothstep(ridge, ridge - 0.004, y);
          if (edge <= 0.001) discard;
          vec3 land = mix(vec3(0.006, 0.008, 0.014), uZenith * 0.6, 0.3);
          vec3 col = mix(land, uHorizon, uHaze);
          // a thin moonlit rim along the ridge
          col += uMoonColor * smoothstep(ridge - 0.02, ridge, y) * 0.05 * (1.0 - uHaze);
          col = mix(col, uHorizon * 1.05, uDawn * uHaze * 0.5);
          gl_FragColor = vec4(col, edge);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    mats.push(mat);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, L.height), mat);
    mesh.position.set(SHORE_LENGTH / 2, L.height / 2 - 6, L.z);
    mesh.renderOrder = -5;
    group.add(mesh);
  }
  ctx.scene.add(group);
  return {
    update() {},
    dispose() {
      group.children.forEach((m) => (m as THREE.Mesh).geometry.dispose());
      mats.forEach((m) => m.dispose());
    },
  };
}
