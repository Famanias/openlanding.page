import type { MeshBasicMaterial, MeshStandardMaterial, Texture } from "three";
import { LANDMARKS, smoothstep } from "../../story";
import { createRng } from "../noise";
import { buildGuardrails } from "../road";
import { createFrame } from "../splineRoute";
import { signTexture } from "../textures";
import { Batch, baseBox, placeObject, placement, type SceneryContext } from "./kit";

const L = LANDMARKS;

/**
 * Building material with procedural windows: a grid derived from each
 * instance's own size, randomly lit, glowing at night. No textures, so
 * any building size gets correctly proportioned windows.
 */
function buildingMaterial(ctx: SceneryContext): MeshStandardMaterial {
  const { THREE } = ctx;
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.25 });
  const uniforms = {
    windowGlow: { value: 0 },
    windowColor: { value: new THREE.Color(0xffc987) },
  };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.windowGlow = uniforms.windowGlow;
    shader.uniforms.windowColor = uniforms.windowColor;
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vLocal;\nvarying vec3 vLocalNormal;\nvarying float vSeed;",
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
#ifdef USE_INSTANCING
  vec3 instScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
  vSeed = float(gl_InstanceID) * 7.31;
#else
  vec3 instScale = vec3(1.0);
  vSeed = 0.0;
#endif
  vLocal = position * instScale;
  vLocalNormal = normal;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform float windowGlow;
uniform vec3 windowColor;
varying vec3 vLocal;
varying vec3 vLocalNormal;
varying float vSeed;
float winHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
{
  vec3 an = abs(vLocalNormal);
  float wall = step(an.y, 0.5);
  vec2 face = an.x > 0.5 ? vec2(vLocal.z, vLocal.y) : vec2(vLocal.x, vLocal.y);
  vec2 cell = vec2(face.x / 3.1, face.y / 3.5);
  vec2 f = fract(cell);
  // Fade the grid out where a window is smaller than a couple of pixels
  // (distance, grazing angles) instead of letting it alias into noise.
  float aa = 1.0 - smoothstep(0.25, 0.6, max(fwidth(cell.x), fwidth(cell.y)));
  vec2 id = floor(cell) + vec2(vSeed, vSeed * 1.7) + (an.x > 0.5 ? 50.0 : 0.0);
  float win = step(0.16, f.x) * step(f.x, 0.84) * step(0.22, f.y) * step(f.y, 0.82) * wall * step(2.5, vLocal.y);
  win *= aa;
  float lit = step(0.58, winHash(id));
  float warm = winHash(id + 3.3);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.38 + vec3(0.05, 0.08, 0.12), win * 0.85);
  totalEmissiveRadiance += mix(windowColor, vec3(0.75, 0.85, 1.0), step(0.7, warm)) * win * lit * windowGlow * (0.6 + warm * 0.8);
  // Distant facades keep an even glow where the grid has faded out.
  totalEmissiveRadiance += windowColor * windowGlow * 0.18 * wall * (1.0 - aa);
}`,
      );
  };
  ctx.animate(({ night }) => {
    uniforms.windowGlow.value = 0.05 + night * 2.4;
  });
  return material;
}

export function buildCity(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const rng = createRng(41);
  const buildings = new Batch(THREE, baseBox(THREE), buildingMaterial(ctx));
  const rooftops = new Batch(THREE, baseBox(THREE), mats.roof);
  const beacons = new Batch(THREE, new THREE.BoxGeometry(0.6, 0.6, 0.6), mats.lampRed, { cast: false, receive: false });
  const palette = [0xc8ccd0, 0x8e9aa6, 0x5b6874, 0xd6cbb6, 0x9fb4c3, 0x6e7a73, 0xb9b1a4];
  const count = Math.round(50 * Math.max(0.55, ctx.density));
  let placed = 0;
  let guard = 0;
  while (placed < count && guard++ < count * 8) {
    const s = L.cityFrom + rng() * (L.cityTo - L.cityFrom);
    const side = rng() < 0.5 ? -1 : 1;
    const lat = side * (34 + Math.pow(rng(), 1.3) * 210);
    // Keep the overpass and checkpoint approaches open.
    if (Math.abs(s - L.overpass) < 16 && Math.abs(lat) < 60) continue;
    if (Math.abs(s - L.checkpoint) < 34 && Math.abs(lat) < 64) continue;
    const downtown = smoothstep(560, 660, s) * (1 - smoothstep(760, 850, s));
    const w = 14 + rng() * 18;
    const d = 14 + rng() * 18;
    const h = (12 + rng() * 26) * (1 + downtown * 2.6 * (1 - Math.abs(lat) / 320) * (0.4 + rng() * 0.9));
    const m = placement(THREE, route, s, lat, { y: -0.6, yaw: (rng() - 0.5) * 0.12, scale: [w, h, d] });
    buildings.add(m, palette[Math.floor(rng() * palette.length)]);
    rooftops.add(m.clone().multiply(new THREE.Matrix4().compose(new THREE.Vector3(0, 1, 0), new THREE.Quaternion(), new THREE.Vector3(0.6, 2.6 / h, 0.5))));
    if (h > 60) {
      beacons.add(placement(THREE, route, s, lat, { y: h + 2.4 }));
    }
    placed++;
  }
  buildings.build(root);
  rooftops.build(root);
  beacons.build(root);
  // Rooftop aircraft-warning beacons blink, brighter at night.
  const lampRed = mats.lampRed;
  ctx.animate(({ time, night }) => {
    lampRed.emissiveIntensity = (Math.sin(time * 3.1) > 0.55 ? 3 : 0.15) * (0.25 + night);
  });

  for (const mesh of buildGuardrails(THREE, route, [[560, 700], [724, 760]], mats.rail)) root.add(mesh);
  buildOverpass(ctx);
  buildBillboard(ctx);
  buildCheckpoint(ctx);
}

function buildOverpass(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const g = new THREE.Group();
  const deck = new THREE.Mesh(new THREE.BoxGeometry(96, 1.6, 12), mats.concrete);
  deck.position.y = 7.6;
  deck.castShadow = true;
  deck.receiveShadow = true;
  g.add(deck);
  for (const z of [-5.8, 5.8]) {
    const barrier = new THREE.Mesh(new THREE.BoxGeometry(96, 1.1, 0.4), mats.concrete);
    barrier.position.set(0, 8.95, z);
    barrier.castShadow = true;
    g.add(barrier);
  }
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(96, 0.35, 0.05), mats.orange);
  stripe.position.set(0, 7.1, 6.03);
  g.add(stripe);
  for (const x of [-10.5, 10.5, -30, 30]) {
    for (const z of [-3.6, 3.6]) {
      const pier = new THREE.Mesh(new THREE.BoxGeometry(1.3, 7, 1.3), mats.concrete);
      pier.position.set(x, 3.5, z);
      pier.castShadow = true;
      g.add(pier);
    }
  }
  // Ramps down to grade.
  for (const side of [-1, 1]) {
    const ramp = new THREE.Mesh(new THREE.BoxGeometry(60, 1.6, 12), mats.concrete);
    ramp.position.set(side * 76, 3.6, 0);
    ramp.rotation.z = side * -0.135;
    ramp.castShadow = true;
    g.add(ramp);
  }
  placeObject(THREE, route, g, L.overpass, 0, { onRoad: true });
  root.add(g);
}

function buildBillboard(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const tex = signTexture(
    THREE,
    {
      width: 1024,
      height: 420,
      background: "#1B1522",
      lines: [
        { text: "KINETIC", size: 150, color: "#ffffff", weight: 800, y: 170 },
        { text: "EVERY LOAD. ONE CLEAR CONSOLE.", size: 46, color: "#FF6B2B", weight: 700, y: 300, tracking: 6 },
      ],
    },
    ctx.anisotropy,
  );
  const mat = new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.1, roughness: 0.6 });
  ctx.nightGlow(mat, 0.08, 1.1);
  const g = new THREE.Group();
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(14, 5.74), mat);
  panel.position.y = 11;
  const back = new THREE.Mesh(new THREE.BoxGeometry(14.4, 6.1, 0.4), mats.deep);
  back.position.set(0, 11, -0.25);
  back.castShadow = true;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 8.4, 10), mats.pole);
  pole.position.set(0, 4.2, -0.5);
  pole.castShadow = true;
  g.add(panel, back, pole);
  placeObject(THREE, route, g, 578, -17, { yaw: 0.35 });
  root.add(g);
}

function buildCheckpoint(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const g = new THREE.Group();
  for (const x of [-7.8, 7.8]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 8.6, 0.8), mats.deep);
    pillar.position.set(x, 4.3, 0);
    pillar.castShadow = true;
    g.add(pillar);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(17.2, 1.3, 1.2), mats.deep);
  beam.position.y = 8.2;
  beam.castShadow = true;
  g.add(beam);

  const board = (title: string, sub: string, color: string): Texture =>
    signTexture(
      THREE,
      {
        width: 1024,
        height: 160,
        background: "#0c1a28",
        lines: [
          { text: title, size: 62, color: "#ffffff", weight: 800, y: 64, tracking: 5 },
          { text: sub, size: 34, color, weight: 700, y: 124, tracking: 6 },
        ],
      },
      ctx.anisotropy,
    );
  const pendingTex = board("WEIGH STATION", "OPEN · ALL TRUCKS", "#F26A2E");
  const verifiedTex = board("WEIGH STATION", "✓ CLEARED · PROCEED", "#45d483");
  const signMat = new THREE.MeshStandardMaterial({ map: pendingTex, emissive: 0xffffff, emissiveMap: pendingTex, emissiveIntensity: 0.6, roughness: 0.5 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(13, 2.03), signMat);
  sign.position.set(0, 10.1, 0.62);
  const signBack = new THREE.Mesh(new THREE.BoxGeometry(13.3, 2.3, 0.3), mats.deep);
  signBack.position.set(0, 10.1, 0.4);
  g.add(sign, signBack);

  const ledMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xf26a2e, toneMapped: false });
  const led = new THREE.Mesh(new THREE.BoxGeometry(15, 0.16, 0.3), ledMat);
  led.position.set(0, 7.48, 0.4);
  g.add(led);

  const curtainMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xf26a2e,
    map: ctx.textures.scanner,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const curtain = new THREE.Mesh(new THREE.PlaneGeometry(14.6, 7.3), curtainMat);
  curtain.position.y = 3.72;
  curtain.renderOrder = 6;
  const sweepMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xffb27a, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
  const sweep = new THREE.Mesh(new THREE.PlaneGeometry(14.6, 0.12), sweepMat);
  sweep.renderOrder = 7;
  g.add(curtain, sweep);

  // Booth and cones.
  const booth = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3, 4.2), mats.white);
  booth.position.set(11.6, 1.5, -2);
  booth.castShadow = true;
  const boothWin = new THREE.Mesh(new THREE.BoxGeometry(3.22, 1, 3.4), mats.windowWarm);
  boothWin.position.set(11.6, 2, -2);
  const boothRoof = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.3, 5.2), mats.orange);
  boothRoof.position.set(11.6, 3.15, -2);
  g.add(booth, boothWin, boothRoof);
  placeObject(THREE, route, g, L.checkpoint, 0, { onRoad: true });
  root.add(g);

  const cones = new Batch(THREE, new THREE.ConeGeometry(0.22, 0.75, 10).translate(0, 0.375, 0), mats.orange, { cast: false, receive: true });
  for (let s = L.checkpoint - 46; s < L.checkpoint - 2; s += 3.2) {
    cones.add(placement(THREE, route, s, 4.75, { onRoad: true }));
    cones.add(placement(THREE, route, s, -4.75, { onRoad: true }));
  }
  cones.build(root);

  const orange = new THREE.Color(0xf26a2e);
  const green = new THREE.Color(0x45d483);
  const target = new THREE.Color();
  let showingVerified = false;
  ctx.animate(({ time, dt, still, s, verified }) => {
    const near = 1 - smoothstep(120, 260, Math.abs(s - L.checkpoint));
    if (near <= 0) return;
    target.copy(verified ? green : orange);
    const k = still ? 1 : 1 - Math.exp(-5 * dt);
    curtainMat.color.lerp(target, k);
    ledMat.color.copy(curtainMat.color).multiplyScalar(2.2);
    sweepMat.color.copy(curtainMat.color).multiplyScalar(1.6);
    ctx.textures.scanner.offset.x = (time * 0.35) % 1;
    const phase = (time * (verified ? 0.35 : 0.9)) % 1;
    sweep.position.y = 0.3 + (verified ? 6.8 : Math.abs(phase * 2 - 1) * 6.8);
    curtainMat.opacity = verified ? 0.1 : 0.2 + Math.sin(time * 9) * 0.04;
    if (verified !== showingVerified) {
      showingVerified = verified;
      const map = verified ? verifiedTex : pendingTex;
      signMat.map = map;
      signMat.emissiveMap = map;
      signMat.needsUpdate = true;
    }
  });
}

/**
 * Sodium streetlights from the city to the destination, with light pools
 * on the asphalt that stretch into reflections when the road is wet.
 * Returns lamp head positions for the engine's moving point lights.
 */
export function buildStreetlights(
  ctx: SceneryContext,
  from: number,
  to: number,
  skip: (s: number) => boolean,
): Array<{ s: number; x: number; y: number; z: number }> {
  const { THREE, route, root, mats } = ctx;
  const poles = new Batch(THREE, new THREE.CylinderGeometry(0.1, 0.16, 9.2, 8).translate(0, 4.6, 0), mats.pole);
  const arms = new Batch(THREE, new THREE.BoxGeometry(2.6, 0.12, 0.12).translate(-1.3, 9.1, 0), mats.pole);
  const heads = new Batch(THREE, new THREE.BoxGeometry(1.0, 0.18, 0.42).translate(-2.4, 9.0, 0), mats.lampWarm, { cast: false, receive: false });
  const poolGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  const poolMat = new THREE.MeshBasicMaterial({
    color: 0xffb566,
    map: ctx.textures.glow,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    toneMapped: false,
  });
  const lamps: Array<{ s: number; x: number; y: number; z: number }> = [];
  const poolS: number[] = [];
  const poolLat: number[] = [];
  const frame = createFrame();
  let side = 1;
  for (let s = from; s <= to; s += 34) {
    if (skip(s)) continue;
    const lat = side * 6.9;
    // Arms point toward the road: yaw 0 = arm toward -X (left); flip on the left side.
    poles.add(placement(THREE, route, s, lat, { onRoad: true, yaw: side > 0 ? 0 : Math.PI }));
    arms.add(placement(THREE, route, s, lat, { onRoad: true, yaw: side > 0 ? 0 : Math.PI }));
    heads.add(placement(THREE, route, s, lat, { onRoad: true, yaw: side > 0 ? 0 : Math.PI }));
    route.sample(s, frame);
    const headLat = lat - side * 2.4;
    lamps.push({ s, x: frame.x + frame.rx * headLat, y: frame.y + 8.9, z: frame.z + frame.rz * headLat });
    poolS.push(s);
    poolLat.push(headLat);
    side = -side;
  }
  poles.build(root);
  arms.build(root);
  heads.build(root);

  const pools = new THREE.InstancedMesh(poolGeo, poolMat, Math.max(1, poolS.length));
  pools.count = poolS.length;
  pools.renderOrder = 2;
  const writePools = (wet: number) => {
    for (let i = 0; i < poolS.length; i++) {
      pools.setMatrixAt(
        i,
        placement(THREE, route, poolS[i], poolLat[i] * 0.55, { onRoad: true, y: 0.05, scale: [7.5 + wet, 1, 7.5 + wet * 7] }),
      );
    }
    pools.instanceMatrix.needsUpdate = true;
    pools.computeBoundingSphere();
  };
  writePools(0);
  root.add(pools);
  let lastWet = 0;
  ctx.animate(({ night, rain }) => {
    poolMat.opacity = night * (0.32 + rain * 0.18);
    const wet = Math.round(rain * 10) / 10;
    if (wet !== lastWet) {
      lastWet = wet;
      writePools(wet);
    }
  });
  return lamps;
}
