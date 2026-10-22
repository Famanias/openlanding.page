import type { BufferGeometry, Material, Mesh, MeshStandardMaterial } from "three";
import { LANDMARKS, ROAD_END } from "../story";
import { createFrame, type Route } from "./splineRoute";

type ThreeModule = typeof import("three");

/**
 * A strip that follows the road between two distances. `profile` lists
 * cross-section points as [lateral, height-above-road, u]; consecutive
 * points become quads. V runs along the road as s / vScale.
 */
export function buildRibbon(
  THREE: ThreeModule,
  route: Route,
  from: number,
  to: number,
  step: number,
  profile: ReadonlyArray<readonly [lat: number, up: number, u: number]>,
  vScale: number,
): BufferGeometry {
  const frame = createFrame();
  const rows = Math.max(2, Math.ceil((to - from) / step) + 1);
  const cols = profile.length;
  const pos = new Float32Array(rows * cols * 3);
  const uv = new Float32Array(rows * cols * 2);
  for (let r = 0; r < rows; r++) {
    const s = Math.min(to, from + r * step);
    route.sample(s, frame);
    for (let k = 0; k < cols; k++) {
      const [lat, up, u] = profile[k];
      const i = r * cols + k;
      pos[i * 3] = frame.x + frame.rx * lat;
      pos[i * 3 + 1] = frame.y + up;
      pos[i * 3 + 2] = frame.z + frame.rz * lat;
      uv[i * 2] = u;
      uv[i * 2 + 1] = s / vScale;
    }
  }
  const index: number[] = [];
  for (let r = 0; r < rows - 1; r++) {
    for (let k = 0; k < cols - 1; k++) {
      const a = r * cols + k;
      const b = a + 1;
      const c = a + cols;
      const d = c + 1;
      // Counter-clockwise seen from above (right x forward = up).
      index.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

export type RoadMeshes = {
  highway: Mesh;
  yardOrigin: Mesh;
  yardDestination: Mesh;
  /** Materials whose roughness/color follow the rain. */
  wettable: MeshStandardMaterial[];
};

const ROAD_PROFILE = [
  [-5.6, 0.0, 0],
  [-4.2, 0.02, 0.125],
  [4.2, 0.02, 0.875],
  [5.6, 0.0, 1],
] as const;

export function buildRoad(
  THREE: ThreeModule,
  route: Route,
  asphalt: MeshStandardMaterial["map"],
  concrete: MeshStandardMaterial["map"],
): RoadMeshes {
  const highwayMat = new THREE.MeshStandardMaterial({
    map: asphalt,
    roughness: 0.86,
    metalness: 0,
    envMapIntensity: 0.6,
  });
  const yardMat = new THREE.MeshStandardMaterial({
    map: concrete,
    roughness: 0.9,
    metalness: 0,
    envMapIntensity: 0.5,
  });

  const highway = new THREE.Mesh(
    buildRibbon(THREE, route, 36, LANDMARKS.destinationYard + 4, 2, ROAD_PROFILE, 12),
    highwayMat,
  );
  highway.receiveShadow = true;
  highway.name = "highway";

  const yardProfile = [
    [-9, 0.0, 0],
    [9, 0.0, 1],
  ] as const;
  const yardOrigin = new THREE.Mesh(
    buildRibbon(THREE, route, -120, 38, 2, yardProfile, 18),
    yardMat,
  );
  yardOrigin.position.y = 0.012;
  yardOrigin.receiveShadow = true;
  const yardDestination = new THREE.Mesh(
    buildRibbon(THREE, route, LANDMARKS.destinationYard, ROAD_END, 2, yardProfile, 18),
    yardMat,
  );
  yardDestination.position.y = 0.012;
  yardDestination.receiveShadow = true;

  return { highway, yardOrigin, yardDestination, wettable: [highwayMat, yardMat] };
}

/** Concrete jersey barriers / steel guardrails along stretches of highway. */
export function buildGuardrails(
  THREE: ThreeModule,
  route: Route,
  stretches: ReadonlyArray<readonly [from: number, to: number]>,
  material: Material,
): Mesh[] {
  const profile = (side: 1 | -1) =>
    side > 0
      ? ([
          [6.1, 0.0, 0],
          [6.15, 0.85, 0.5],
          [6.45, 0.85, 0.6],
          [6.5, 0.0, 1],
        ] as const)
      : ([
          [-6.5, 0.0, 0],
          [-6.45, 0.85, 0.4],
          [-6.15, 0.85, 0.5],
          [-6.1, 0.0, 1],
        ] as const);
  const meshes: Mesh[] = [];
  for (const [from, to] of stretches) {
    for (const side of [1, -1] as const) {
      const mesh = new THREE.Mesh(buildRibbon(THREE, route, from, to, 2, profile(side), 4), material);
      mesh.castShadow = false;
      mesh.receiveShadow = true;
      meshes.push(mesh);
    }
  }
  return meshes;
}

/** Deck slab under the road (bridge span, overpass look from the side). */
export function buildDeck(
  THREE: ThreeModule,
  route: Route,
  from: number,
  to: number,
  material: Material,
): Mesh {
  const profile = [
    [-6.6, 0.0, 0],
    [-6.6, -1.5, 0.2],
    [6.6, -1.5, 0.8],
    [6.6, 0.0, 1],
  ] as const;
  const mesh = new THREE.Mesh(buildRibbon(THREE, route, from, to, 2, profile, 8), material);
  mesh.receiveShadow = true;
  return mesh;
}
