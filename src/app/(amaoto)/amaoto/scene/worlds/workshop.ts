import * as THREE from "three";
import { WORLD_ANCHORS } from "../../logic/chapters";
import { turnedGeometry } from "../../model/lathe";
import type { WorldTextures } from "../textures";
import {
  worldBase,
  floor,
  randomInstances,
  addMotes,
  type BuiltWorld,
} from "./shared";
export function createWorkshop(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("workshop", WORLD_ANCHORS[1]),
    wood = b.standard("#B8923A", {
      map: t.maps.woodFloorColor,
      bumpMap: t.maps.woodBump,
      bumpScale: 0.025,
    }),
    dark = b.standard("#1A1613");
  floor(b, t);
  b.box([20, 9, 0.2], [0, 1, -7], dark);
  const bamboo = b.standard("#B8923A", {
    map: t.maps.bambooColor,
    bumpMap: t.maps.bambooBump,
    bumpScale: 0.018,
  });
  randomInstances(
    b,
    new THREE.CylinderGeometry(0.05, 0.085, 5.5, 7),
    bamboo,
    software ? 16 : 64,
    91,
    (d, r) => {
      d.position.set(-7 + r() * 5, 0.3, -4 - r() * 2);
      d.rotation.set((r() - 0.5) * 0.18, 0, (r() - 0.5) * 0.28);
      d.scale.setScalar(0.75 + r() * 0.5);
    },
  );
  b.counts.bamboo = software ? 16 : 64;
  b.box([6, 0.22, 2.2], [-3, -0.9, -3], wood);
  for (const x of [-5.5, -0.5])
    for (const z of [-3.8, -2.2]) b.box([0.16, 1.5, 0.16], [x, -1.7, z], wood);
  b.box([0.35, 0.5, 0.4], [-4, -0.45, -2.6], dark);
  b.box([2.5, 0.15, 0.35], [-2.4, -0.45, -2.6], dark);
  const lathe = b.mesh(
    turnedGeometry("handle"),
    wood,
    [-2.5, -0.12, -2.6],
    [1.5, 2.5, 1.5],
  );
  lathe.rotation.z = Math.PI / 2;
  for (let i = 0; i < 8; i++) {
    b.box([0.06, 0.7 + (i % 3) * 0.12, 0.04], [1 + i * 0.45, 1.4, -6.6], dark);
    b.box([0.16, 0.24, 0.08], [1 + i * 0.45, 1, -6.6], wood);
  }
  const windowPaper = b.standard("#F4ECDD", {
    map: t.maps.washiColor,
    emissive: "#F4ECDD",
    emissiveIntensity: 0.45,
    roughness: 1,
  });
  b.box([4.5, 4, 0.08], [3, 2, -6.7], windowPaper);
  for (let i = 0; i < 5; i++)
    b.box([0.06, 4.1, 0.15], [0.8 + i * 1.1, 2, -6.5], wood);
  for (let i = 0; i < 4; i++)
    b.box([4.6, 0.06, 0.15], [3, 0.1 + i * 1.25, -6.5], wood);
  const shafts = b.shader(
    "uniform float uSun;",
    "",
    `float edge=pow(max(0.,1.-abs(vUv.x-.5)*2.),2.);float noise=.75+.25*sin(vWorld.x*5.+vWorld.y*3.+uTime*.3);alpha=edge*(1.-vUv.y)*.13*uSun*noise;color=vec3(.9,.69,.32)*1.7;`,
    { uSun: { value: 1 } },
  );
  shafts.blending = THREE.AdditiveBlending;
  for (let i = 0; i < 4; i++) {
    const shaft = b.mesh(new THREE.PlaneGeometry(1.5, 8), shafts, [
      2 + i * 0.8,
      0.2,
      -3.5 + i * 0.45,
    ]);
    shaft.rotation.z = -0.45;
  }
  b.counts.shafts = 4;
  addMotes(b, software ? 64 : 320, 33, true);
  addMotes(b, software ? 36 : 180, 98);
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      shafts.uniforms.uSun.value = f.day.sunIntensityMultiplier;
      windowPaper.emissiveIntensity = 0.25 + f.day.value * 0.6;
    },
  };
}
