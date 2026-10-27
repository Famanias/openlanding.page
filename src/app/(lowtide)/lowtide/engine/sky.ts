import * as THREE from "three";
import { lerp, smoothstep } from "../motion/math";
import { CHAPTER_POINTS } from "../night/clock";
import { NOISE } from "./glsl";
import type { Part, WorldCtx } from "./types";

const NIGHT_ZENITH = new THREE.Color(0.006, 0.009, 0.022);
const NIGHT_HORIZON = new THREE.Color(0.035, 0.045, 0.075);
const DAWN_ZENITH = new THREE.Color(0.07, 0.1, 0.2);
const DAWN_HORIZON = new THREE.Color(0.62, 0.34, 0.24);
const MOON_LIGHT = new THREE.Color(1.0, 0.93, 0.78);
const SUN_LIGHT = new THREE.Color(1.0, 0.7, 0.5);
const MOON_DISTANCE = 1500;

/** The dome (gradient, moon glow, stars), the moon itself and the colours every other shader borrows. */
export function createSky(ctx: WorldCtx): Part {
  const { shared } = ctx;

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1800, 48, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: { uZenith: shared.uZenith, uHorizon: shared.uHorizon, uMoonDir: shared.uMoonDir, uMoonColor: shared.uMoonColor, uDawn: shared.uDawn, uTime: shared.uTime },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uZenith; uniform vec3 uHorizon; uniform vec3 uMoonDir; uniform vec3 uMoonColor; uniform float uDawn; uniform float uTime;
        varying vec3 vDir;
        ${NOISE}
        void main() {
          vec3 d = normalize(vDir);
          float e = clamp(d.y, -0.2, 1.0);
          vec3 col = mix(uHorizon, uZenith, pow(smoothstep(-0.02, 0.6, e), 0.55));
          // sunrise glow low on the horizon, toward the moon's side of the sky
          float sunSide = max(0.0, dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(-uMoonDir.x, 0.0, uMoonDir.z))));
          col += uDawn * vec3(1.0, 0.5, 0.3) * pow(1.0 - smoothstep(0.0, 0.25, e), 3.0) * (0.15 + 0.35 * sunSide);
          // moon halo
          float m = max(dot(d, uMoonDir), 0.0);
          col += uMoonColor * (pow(m, 400.0) * 0.35 + pow(m, 40.0) * 0.06 + pow(m, 5.0) * 0.012) * (1.0 - uDawn * 0.7);
          // stars: one hashed point per cell, twinkling, gone by dawn and near the horizon
          vec2 sp = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0))) * 180.0;
          vec2 cell = floor(sp);
          float h = lt_hash(cell);
          vec2 f = fract(sp) - vec2(lt_hash(cell + 3.1), lt_hash(cell + 7.7));
          float star = step(0.985, h) * smoothstep(0.08, 0.0, length(f)) * (0.55 + 0.45 * sin(uTime * (1.0 + h * 3.0) + h * 40.0));
          col += vec3(0.85, 0.9, 1.0) * star * smoothstep(0.02, 0.25, e) * (1.0 - smoothstep(0.0, 0.6, uDawn)) * 0.9;
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    }),
  );
  dome.renderOrder = -10;
  dome.frustumCulled = false;
  ctx.scene.add(dome);

  ctx.textures.moon.colorSpace = THREE.SRGBColorSpace;
  const moonMat = new THREE.MeshBasicMaterial({ map: ctx.textures.moon, color: new THREE.Color(1.15, 1.1, 0.98), fog: false, transparent: true, toneMapped: false });
  const moon = new THREE.Mesh(new THREE.SphereGeometry(38, 64, 32), moonMat);
  moon.renderOrder = -9;
  ctx.scene.add(moon);

  const target = new THREE.Vector3();
  return {
    update(f) {
      const dawn = smoothstep(CHAPTER_POINTS.reveal + 0.006, 1, f.p);
      shared.uDawn.value = dawn;
      shared.uZenith.value.copy(NIGHT_ZENITH).lerp(DAWN_ZENITH, dawn);
      shared.uHorizon.value.copy(NIGHT_HORIZON).lerp(DAWN_HORIZON, dawn * 0.85);
      shared.uMoonColor.value.copy(MOON_LIGHT).lerp(SUN_LIGHT, dawn);

      // The moon climbs through the night and sinks toward the far horizon by dawn, staying right of centre.
      // Kept low so its reflection lands on the wet sand the tide uncovers.
      const az = lerp(0.12, 0.3, f.p);
      const el = 0.1 + 0.07 * Math.sin(Math.PI * Math.min(1, f.p * 1.1)) - dawn * 0.06;
      shared.uMoonDir.value.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el)).normalize();

      dome.position.copy(ctx.camera.position);
      target.copy(shared.uMoonDir.value).multiplyScalar(MOON_DISTANCE).add(ctx.camera.position);
      moon.position.copy(target);
      moon.rotation.y = 0.6 + f.p * 0.2;
      moonMat.opacity = 1 - dawn * 0.75;
    },
    dispose() {
      dome.geometry.dispose();
      (dome.material as THREE.Material).dispose();
      moon.geometry.dispose();
      moonMat.dispose();
    },
  };
}
