import type { BufferGeometry, Mesh } from "three";
import { LANDMARKS, ROAD_END, elevationAt, smoothstep } from "../story";
import { fbm, hash2, valueNoise } from "./noise";
import { createFrame, type Route } from "./splineRoute";

type ThreeModule = typeof import("three");

/** Height of the flat ground plane beyond the terrain strip. */
export const FAR_GROUND_Y = -3;

const L = LANDMARKS;

function band(s: number, from: number, to: number, soft: number): number {
  return smoothstep(from - soft, from + soft, s) - smoothstep(to - soft, to + soft, s);
}

/** Hill amplitude by zone: yards and city are flat, countryside and forest roll. */
function hillAmplitude(s: number): number {
  const yards = Math.max(1 - smoothstep(30, 90, s), smoothstep(1150, 1200, s));
  const city = band(s, L.cityFrom + 30, L.cityTo - 40, 40);
  const forest = band(s, L.forestFrom, 1160, 40);
  const base = 16 + forest * 10;
  return base * (1 - yards) * (1 - city * 0.85);
}

function riverDip(s: number): number {
  return -13.5 * (1 - smoothstep(12, 44, Math.abs(s - L.river)));
}

/** Terrain height at road distance s and lateral offset lat (meters). */
export function terrainHeight(s: number, lat: number): number {
  const road = elevationAt(s);
  const a = Math.abs(lat);
  const dip = riverDip(s);

  // Road bed + shallow ditches.
  let h = road - 0.28 - 0.9 * (smoothstep(6.4, 8.2, a) - smoothstep(9.5, 13, a));
  // Hills rise away from the road.
  const far = smoothstep(12, 70, a);
  const n = fbm(s * 0.0085 + 11.3, lat * 0.0105 + (lat < 0 ? 40 : 0), 4);
  h += (n - 0.32) * hillAmplitude(s) * far;
  // Ridge line that frames the horizon on both sides.
  h += smoothstep(120, 230, a) * 18 * valueNoise(s * 0.004, lat < 0 ? 3 : 9) * (1 - smoothstep(1150, 1200, s));
  // River valley cuts under the bridge.
  h += dip * (a < 9 ? 1 : 1 - smoothstep(40, 150, a) * 0.6);
  // Tunnel hill.
  const tunnel = band(s, L.tunnelFrom + 6, L.tunnelTo - 6, 14);
  h += tunnel * 23 * smoothstep(8.5, 20, a) * (1 - smoothstep(60, 160, a) * 0.5);
  // Fade into the far ground plane.
  const edge = smoothstep(210, 300, a);
  return h * (1 - edge) + FAR_GROUND_Y * edge;
}

type RGB = [number, number, number];
const hex = (c: number): RGB => [((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255];

const GRASS = hex(0x7fa257);
const GRASS_LIGHT = hex(0x9fba68);
const WHEAT = hex(0xd2b872);
const SOIL = hex(0x8e6e4e);
const MEADOW = hex(0x6f9650);
const FOREST = hex(0x3f5c38);
const CONCRETE = hex(0xb7b0a3);
const GRAVEL = hex(0x958f84);
const SAND = hex(0xc4ae84);
const CITY = hex(0x8c9186);
const RIDGE = hex(0x6d8a5a);

const FIELDS = [GRASS, GRASS_LIGHT, WHEAT, SOIL, MEADOW, GRASS, WHEAT];

function mix(a: RGB, b: RGB, t: number, out: RGB): RGB {
  out[0] = a[0] + (b[0] - a[0]) * t;
  out[1] = a[1] + (b[1] - a[1]) * t;
  out[2] = a[2] + (b[2] - a[2]) * t;
  return out;
}

const tmpA: RGB = [0, 0, 0];

function terrainColor(s: number, lat: number, h: number, out: RGB): RGB {
  const a = Math.abs(lat);
  // Field patchwork.
  const field = FIELDS[Math.floor(hash2(Math.floor(s / 58), Math.floor((lat + 1000) / 46)) * FIELDS.length)];
  mix(field, RIDGE, smoothstep(90, 200, a), tmpA);
  // Forest zone darkens toward the storm.
  mix(tmpA, FOREST, band(s, L.forestFrom, 1170, 50), tmpA);
  // City ground.
  mix(tmpA, CITY, band(s, L.cityFrom + 20, L.cityTo - 30, 30) * 0.85, tmpA);
  // Yards.
  const yard = Math.max(1 - smoothstep(40, 75, s), smoothstep(1170, 1200, s)) * (1 - smoothstep(66, 84, a));
  mix(tmpA, CONCRETE, yard, tmpA);
  // River banks.
  const bank = smoothstep(-4, -9, h - elevationAt(s)) * (1 - smoothstep(30, 60, Math.abs(s - L.river)));
  mix(tmpA, SAND, bank, tmpA);
  // Gravel shoulder next to the pavement (and the tunnel floor).
  const tunnelFloor = band(s, L.tunnelFrom - 2, L.tunnelTo + 2, 2) * (1 - smoothstep(9, 10, a));
  mix(tmpA, GRAVEL, Math.max(1 - smoothstep(6.2, 8, a), tunnelFloor), tmpA);
  // Subtle mottling so large faces are not flat color.
  const m = 0.9 + valueNoise(s * 0.05, lat * 0.05) * 0.2;
  out[0] = tmpA[0] * m;
  out[1] = tmpA[1] * m;
  out[2] = tmpA[2] * m;
  return out;
}

const LATERALS = [0, 5.9, 7, 8.4, 10.2, 12.6, 15.5, 19, 23.5, 29, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 282, 330];

/** Terrain strip that follows the road, flat-shaded low-poly with vertex colors. */
export function buildTerrain(THREE: ThreeModule, route: Route, rowStep: number): Mesh {
  const lats: number[] = [];
  for (let i = LATERALS.length - 1; i > 0; i--) lats.push(-LATERALS[i]);
  for (const l of LATERALS) lats.push(l);
  const cols = lats.length;
  const sFrom = route.start;
  const sTo = ROAD_END + 240;
  const rows = Math.floor((sTo - sFrom) / rowStep) + 1;

  const positions = new Float32Array(rows * cols * 3);
  const colors = new Float32Array(rows * cols * 3);
  const frame = createFrame();
  const c: RGB = [0, 0, 0];
  for (let r = 0; r < rows; r++) {
    const s = sFrom + r * rowStep;
    route.sample(s, frame);
    for (let k = 0; k < cols; k++) {
      // Jitter far vertices a little so the low-poly facets don't look gridded.
      const lat = lats[k] + (Math.abs(lats[k]) > 20 ? (hash2(r, k) - 0.5) * 6 : 0);
      const h = terrainHeight(s, lat);
      const i = (r * cols + k) * 3;
      positions[i] = frame.x + frame.rx * lat;
      positions[i + 1] = h;
      positions[i + 2] = frame.z + frame.rz * lat;
      terrainColor(s, lat, h, c);
      colors[i] = c[0];
      colors[i + 1] = c[1];
      colors[i + 2] = c[2];
    }
  }

  const index: number[] = [];
  for (let r = 0; r < rows - 1; r++) {
    for (let k = 0; k < cols - 1; k++) {
      const a = r * cols + k;
      const b = a + 1;
      const d = a + cols;
      const e = d + 1;
      // Alternate the diagonal for a less regular facet pattern.
      // Counter-clockwise seen from above.
      if ((r + k) % 2 === 0) index.push(a, b, d, b, e, d);
      else index.push(a, e, d, a, b, e);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(index);
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.96,
    metalness: 0,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  mesh.name = "terrain";
  return mesh;
}

/** Huge flat ground under everything that fades into the fog at the horizon. */
export function buildFarGround(THREE: ThreeModule, route: Route): Mesh {
  const frame = createFrame();
  route.sample(600, frame);
  const geometry: BufferGeometry = new THREE.CircleGeometry(4200, 48);
  geometry.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: 0x6f8a58, roughness: 1, metalness: 0 }),
  );
  mesh.position.set(frame.x, FAR_GROUND_Y - 0.4, frame.z);
  mesh.receiveShadow = false;
  mesh.name = "far-ground";
  return mesh;
}

/** River surface crossing under the bridge. */
export function buildRiver(THREE: ThreeModule, route: Route): Mesh {
  const frame = createFrame();
  route.sample(L.river, frame);
  const geometry = new THREE.PlaneGeometry(56, 900, 1, 1);
  geometry.rotateX(-Math.PI / 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3f7394,
    roughness: 0.12,
    metalness: 0.2,
    envMapIntensity: 1.4,
  });
  const mesh = new THREE.Mesh(geometry, material);
  // The plane's long axis runs across the road (along the right vector).
  mesh.rotation.y = -frame.heading + Math.PI / 2;
  mesh.position.set(frame.x, elevationAt(L.river) - 9.2, frame.z);
  mesh.receiveShadow = true;
  mesh.name = "river";
  return mesh;
}
