import * as THREE from "three";
import { WORLD_ANCHORS } from "../../logic/chapters";
import type { WorldTextures } from "../textures";
import { worldBase, addMotes, contactShadow, type BuiltWorld } from "./shared";
export function createGenkan(t: WorldTextures, software: boolean): BuiltWorld {
  const b = worldBase("genkan", WORLD_ANCHORS[5]),
    wood = b.standard("#B8923A", {
      map: t.maps.woodFloorColor,
      bumpMap: t.maps.woodBump,
      bumpScale: 0.015,
    }),
    ink = b.standard("#1A1613"),
    paper = b.standard("#F4ECDD", {
      map: t.maps.washiColor,
      emissive: "#B8923A",
      emissiveIntensity: 0.25,
    });
  b.box(
    [26, 0.15, 24],
    [0, -2.5, 0],
    b.standard("#2B3A55", {
      map: t.maps.cobbleColor,
      bumpMap: t.maps.cobbleBump,
      bumpScale: 0.025,
      roughness: 0.36,
    }),
  );
  contactShadow(b);
  b.box([14, 0.4, 9], [0, -2.25, -6], wood);
  b.box(
    [13.7, 0.08, 8.7],
    [0, -2.01, -6],
    b.standard("#F4ECDD", {
      map: t.maps.tatamiColor,
      bumpMap: t.maps.tatamiBump,
      bumpScale: 0.008,
    }),
  );
  b.box([11, 6.5, 0.25], [0, 1, -7], ink);
  for (let panel = 0; panel < 3; panel++) {
    const x = (panel - 1) * 3.2;
    b.box([3.1, 5.7, 0.07], [x, 0.8, -6.8], paper);
    for (let i = 0; i < 4; i++)
      b.box([0.045, 5.8, 0.12], [x - 1.56 + i * 1.04, 0.8, -6.7], wood);
    for (let i = 0; i < 6; i++)
      b.box([3.15, 0.045, 0.12], [x, -2 + i * 1.1, -6.7], wood);
  }
  for (const x of [-5, 5]) b.box([0.25, 7, 0.35], [x, 1, -6.5], wood);
  b.box([10, 0.3, 0.35], [0, 4.3, -6.5], wood);
  b.mesh(
    new THREE.CylinderGeometry(0.44, 0.34, 0.65, 20, 1, true),
    b.standard("#B8923A", {
      map: t.maps.bambooColor,
      side: THREE.DoubleSide,
      roughness: 0.35,
    }),
    [-0.65, -2.1, 0],
  );
  const rim = b.mesh(
    new THREE.TorusGeometry(0.44, 0.025, 6, 24),
    wood,
    [-0.65, -1.775, 0],
  );
  rim.rotation.x = Math.PI / 2;
  const bottom = b.mesh(
    new THREE.CircleGeometry(0.34, 20),
    ink,
    [-0.65, -2.405, 0],
  );
  bottom.rotation.x = -Math.PI / 2;
  const glow = b.shader(
    "uniform float uGlow;",
    "",
    `float ribs=.8+.2*pow(abs(sin(vUv.x*3.14159*22.)),10.);color=vec3(.90,.72,.38)*uGlow*ribs;alpha=1.;`,
    { uGlow: { value: 1 } },
    false,
  );
  b.mesh(
    new THREE.SphereGeometry(0.38, 16, 10),
    glow,
    [-2.2, 2.2, -2.6],
    [1, 1.35, 1],
  );
  b.mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 2.1, 5),
    ink,
    [-2.2, 3.7, -2.6],
  );
  const halo = b.glow("#B8923A");
  halo.blending = THREE.AdditiveBlending;
  b.mesh(new THREE.PlaneGeometry(1.8, 1.8), halo, [-2.2, 2.2, -2.7]);
  addMotes(b, software ? 20 : 150, 68);
  b.counts.lanterns = 1;
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      glow.uniforms.uGlow.value = f.day.lanternIntensityMultiplier * 2.3;
      paper.emissiveIntensity = 0.12 + f.day.value * 0.2;
      halo.uniforms.uColor.value
        .set("#B8923A")
        .multiplyScalar(f.day.lanternIntensityMultiplier);
    },
  };
}
