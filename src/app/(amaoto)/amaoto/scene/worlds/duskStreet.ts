import * as THREE from "three";
import { WORLD_ANCHORS } from "../../logic/chapters";
import type { WorldTextures } from "../textures";
import { createRain } from "../rain";
import {
  worldBase,
  randomInstances,
  addMotes,
  contactShadow,
  type BuiltWorld,
} from "./shared";
export function createDuskStreet(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("street", WORLD_ANCHORS[3]),
    ink = b.standard("#2B3A55", { roughness: 0.9 }),
    wood = b.standard("#1A1613", { map: t.maps.woodFloorColor });
  t.maps.cobbleColor.repeat.set(4, 4);
  t.maps.cobbleBump.repeat.set(4, 4);
  contactShadow(b);
  b.box(
    [28, 0.14, 32],
    [0, -2.5, -2],
    b.standard("#F4ECDD", {
      map: t.maps.cobbleColor,
      bumpMap: t.maps.cobbleBump,
      bumpScale: 0.06,
      roughnessMap: t.maps.lacquerRoughness,
      roughness: 0.19,
      metalness: 0.18,
    }),
  );
  for (const side of [-1, 1])
    for (let i = 0; i < 7; i++) {
      b.box(
        [4, 5 + (i % 3), 3],
        [side * 10, 0.2 + (i % 3) * 0.4, 2 - i * 4],
        ink,
      );
      const eave = b.box(
        [5, 0.22, 4],
        [side * 10, 3 + (i % 3) * 0.4, 2 - i * 4],
        wood,
      );
      eave.rotation.z = side * 0.06;
    }
  const posts = randomInstances(
    b,
    new THREE.CylinderGeometry(0.065, 0.1, 4.4, 7),
    wood,
    12,
    7,
    (d, _, i) => {
      d.position.set(i % 2 ? 3.8 : -3.8, -0.25, 3 - Math.floor(i / 2) * 3.2);
    },
  );
  posts.castShadow = true;
  const lanternGeo = new THREE.SphereGeometry(0.38, 16, 12),
    phases = new Float32Array(12);
  for (let i = 0; i < 12; i++) phases[i] = i * 0.63;
  lanternGeo.setAttribute(
    "aPhase",
    new THREE.InstancedBufferAttribute(phases, 1),
  );
  const uniforms = {
    uGlow: { value: 1 },
    uTint: { value: new THREE.Color("#B8923A") },
    uGustAge: { value: 100 },
    uGustOrigin: { value: new THREE.Vector3() },
    uPointerWorld: { value: new THREE.Vector3(1000, 0, 1000) },
  };
  const lantern = b.shader(
    "attribute float aPhase;uniform float uGlow,uGustAge;uniform vec3 uTint,uGustOrigin,uPointerWorld;",
    `float distanceToGust=length(transformed.xz-uGustOrigin.xz);float gust=sin(clamp(uGustAge/3.6,0.,1.)*3.14159)*(1.-step(3.6,uGustAge))*exp(-pow((distanceToGust-uGustAge*6.5)/2.,2.));transformed.x+=sin(uTime*.6+aPhase)*.035+sin(uTime*4.+aPhase)*gust*.18;`,
    `float ribs=.82+.18*pow(abs(sin(vUv.x*3.14159*24.)),10.);float shade=.45+.55*sin(vUv.y*3.14159);float nearPointer=exp(-length(vWorld.xz-uPointerWorld.xz)*.5);color=mix(vec3(.95,.87,.67),uTint,.35)*uGlow*ribs*shade*(1.+nearPointer*.3);alpha=1.;`,
    uniforms,
    false,
  );
  randomInstances(b, lanternGeo, lantern, 12, 8, (d, _, i) => {
    d.position.set(i % 2 ? 3.8 : -3.8, 1.5, 3 - Math.floor(i / 2) * 3.2);
    d.scale.set(1, 1.35, 1);
  });
  randomInstances(
    b,
    new THREE.TorusGeometry(0.25, 0.035, 5, 16),
    wood,
    24,
    9,
    (d, _, i) => {
      d.position.set(
        Math.floor(i / 2) % 2 ? 3.8 : -3.8,
        i % 2 ? 1.96 : 1.04,
        3 - Math.floor(i / 4) * 3.2,
      );
      d.rotation.x = Math.PI / 2;
    },
  );
  const glow = b.glow("#B8923A");
  glow.blending = THREE.AdditiveBlending;
  for (let i = 0; i < 12; i++) {
    const x = i % 2 ? 3.8 : -3.8,
      z = 3 - Math.floor(i / 2) * 3.2;
    const reflection = b.mesh(new THREE.PlaneGeometry(0.9, 2.8), glow, [
      x,
      -2.405,
      z + 0.8,
    ]);
    reflection.rotation.x = -Math.PI / 2;
    b.mesh(new THREE.PlaneGeometry(0.9, 0.9), glow, [x, 1.5, z], [1.4, 1.4, 1]);
  }
  for (let i = 0; i < 8; i++)
    b.mesh(new THREE.PlaneGeometry(0.3, 0.3), glow, [
      i % 2 ? 3.5 : -3.5,
      1.6,
      -18 - i * 2,
    ]);
  const rain = createRain(b, software);
  addMotes(b, software ? 24 : 120, 150);
  b.counts.lanterns = 12;
  return {
    ...b,
    setTips: rain.setTips,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      rain.update(f);
      uniforms.uGlow.value =
        f.day.lanternIntensityMultiplier *
        (2.8 + 0.1 * Math.sin(f.elapsedSec * 0.8));
      uniforms.uTint.value.set("#B8923A").lerp(f.colour, 0.12);
      uniforms.uGustAge.value = f.gustAge;
      uniforms.uGustOrigin.value.copy(f.gustOrigin).sub(b.group.position);
      uniforms.uPointerWorld.value.copy(f.pointer);
      glow.uniforms.uColor.value
        .copy(uniforms.uTint.value)
        .multiplyScalar(f.day.lanternIntensityMultiplier);
    },
  };
}
