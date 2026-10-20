import * as THREE from "three/webgpu";
import {
  color,
  float,
  mix,
  mx_fractal_noise_float,
  mx_noise_float,
  positionLocal,
  positionWorld,
  smoothstep,
  vec3,
} from "three/tsl";

/*
 * Procedural materials for the miso-glazed nigiri. Food colours are content, not brand UI, so this folder
 * is exempt from KŌJI's five-colour palette (see scripts/templates.config.ts).
 */

/** Hand-pressed rice grains: warm off-white, matte, each grain slightly different. */
export function riceMaterial(): THREE.MeshStandardNodeMaterial {
  const m = new THREE.MeshStandardNodeMaterial();
  const variation = mx_noise_float(positionWorld.mul(9.0)).mul(0.5).add(0.5);
  m.colorNode = mix(color("#e6d9be"), color("#f4ecdc"), variation);
  m.roughnessNode = float(0.5);
  m.metalnessNode = float(0.0);
  return m;
}

/** The rice bed under the grains: same colour family, rougher, lightly lumpy. */
export function riceBedMaterial(): THREE.MeshStandardNodeMaterial {
  const m = new THREE.MeshStandardNodeMaterial();
  const lumps = mx_fractal_noise_float(positionLocal.mul(6.0), 3, 2.0, 0.5);
  m.colorNode = mix(color("#e6dcc6"), color("#f5eedf"), lumps.mul(0.5).add(0.5));
  m.positionNode = positionLocal.add(positionLocal.normalize().mul(lumps.mul(0.025)));
  m.roughnessNode = float(0.8);
  return m;
}

/**
 * Fatty fish under a miso glaze: rose flesh with diagonal white fat marbling, an amber lacquer that
 * deepens toward the torched edges, and a glossy clearcoat that catches the raking light.
 */
export function fishMaterial(): THREE.MeshPhysicalNodeMaterial {
  const m = new THREE.MeshPhysicalNodeMaterial();
  const p = positionLocal;

  // Marbling: wavy diagonal bands, broken up with noise so they read as fat, not stripes.
  const wobble = mx_noise_float(p.mul(vec3(2.0, 4.0, 3.0))).mul(0.9);
  const bands = p.x.mul(7.5).add(p.z.mul(5.0)).add(wobble).sin().mul(0.5).add(0.5);
  const fat = smoothstep(0.8, 0.95, bands);

  const flesh = mix(color("#8a2a1c"), color("#b44a2e"), mx_noise_float(p.mul(5.0)).mul(0.5).add(0.5));
  const marbled = mix(flesh, color("#e9b896"), fat.mul(0.75));

  // Glaze: amber lacquer over the top surface, caramelised toward the torched ends.
  const topness = smoothstep(0.0, 0.1, p.y);
  const edge = smoothstep(0.55, 1.0, p.x.abs());
  const char = smoothstep(0.55, 0.95, mx_fractal_noise_float(p.mul(6.0), 3, 2.0, 0.5).mul(0.6).add(edge.mul(0.9)));
  const glazed = mix(marbled, color("#8f4513"), topness.mul(0.45));
  m.colorNode = mix(glazed, color("#3e1d0e"), char.mul(topness).mul(0.6));

  m.roughnessNode = mix(float(0.42), float(0.24), topness);
  m.clearcoatNode = topness;
  m.clearcoatRoughnessNode = float(0.08);
  return m;
}

/** Dark speckled stoneware: near-black ash glaze with pale iron speckles, very matte. */
export function stonewareMaterial(): THREE.MeshStandardNodeMaterial {
  const m = new THREE.MeshStandardNodeMaterial();
  const p = positionLocal.mul(14.0);
  const speckle = smoothstep(0.82, 0.9, mx_noise_float(p).mul(0.5).add(0.5));
  const glaze = mix(color("#1d1b19"), color("#2c2824"), mx_fractal_noise_float(positionLocal.mul(2.5), 3, 2.0, 0.5).mul(0.5).add(0.5));
  m.colorNode = mix(glaze, color("#8f877a"), speckle.mul(0.6));
  m.roughnessNode = float(0.86);
  return m;
}
