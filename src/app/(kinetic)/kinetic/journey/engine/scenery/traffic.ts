import type { BufferGeometry } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { LANDMARKS, LANE_OFFSET } from "../../story";
import { createRng } from "../noise";
import { placement, type SceneryContext } from "./kit";

const CAR_COLORS = [0xe8e9ea, 0x1d2328, 0x9aa3ab, 0x7b1f24, 0x2a4f7a, 0xcfc6b4, 0x3d4a3f];
/** Oncoming speed (m/s) and the highway stretch cars may use. */
const SPEED = 24;
const MIN_S = 70;
const MAX_S = LANDMARKS.destinationYard - 10;

/** A handful of oncoming cars recycled around the truck. */
export function buildTraffic(ctx: SceneryContext, count: number): void {
  const { THREE, route, root, mats } = ctx;
  const nonIndexed = (g: BufferGeometry) => (g.index ? g.toNonIndexed() : g);
  // Car in local space: forward -Z, 4.6 m long.
  const body = mergeGeometries(
    [
      new THREE.BoxGeometry(1.86, 0.62, 4.6).translate(0, 0.62, 0),
      new THREE.BoxGeometry(1.64, 0.5, 2.3).translate(0, 1.17, 0.25),
    ].map(nonIndexed),
    false,
  ) as BufferGeometry;
  const trimParts: BufferGeometry[] = [new THREE.BoxGeometry(1.66, 0.46, 2.1).translate(0, 1.17, 0.25)];
  for (const [x, z] of [
    [0.84, -1.45],
    [-0.84, -1.45],
    [0.84, 1.45],
    [-0.84, 1.45],
  ]) {
    trimParts.push(new THREE.CylinderGeometry(0.34, 0.34, 0.24, 14).rotateZ(Math.PI / 2).translate(x, 0.34, z));
  }
  const trim = mergeGeometries(trimParts.map(nonIndexed), false) as BufferGeometry;
  const headGeo = mergeGeometries(
    [new THREE.BoxGeometry(0.4, 0.14, 0.05).translate(0.6, 0.72, -2.31), new THREE.BoxGeometry(0.4, 0.14, 0.05).translate(-0.6, 0.72, -2.31)].map(nonIndexed),
    false,
  ) as BufferGeometry;
  const tailGeo = mergeGeometries(
    [new THREE.BoxGeometry(0.42, 0.12, 0.05).translate(0.62, 0.76, 2.31), new THREE.BoxGeometry(0.42, 0.12, 0.05).translate(-0.62, 0.76, 2.31)].map(nonIndexed),
    false,
  ) as BufferGeometry;

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.6 });
  const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const tailMat = new THREE.MeshBasicMaterial({ color: 0xff2020, toneMapped: false });
  const bodies = new THREE.InstancedMesh(body, bodyMat, count);
  const trims = new THREE.InstancedMesh(trim, mats.rubber, count);
  const heads = new THREE.InstancedMesh(headGeo, headMat, count);
  const tails = new THREE.InstancedMesh(tailGeo, tailMat, count);
  bodies.castShadow = true;
  const rng = createRng(77);
  for (let i = 0; i < count; i++) bodies.setColorAt(i, new THREE.Color(CAR_COLORS[Math.floor(rng() * CAR_COLORS.length)]));
  for (const m of [bodies, trims, heads, tails]) {
    m.frustumCulled = false;
    root.add(m);
  }

  const cars = Array.from({ length: count }, (_, i) => ({ s: MIN_S + 120 + i * 140, active: false }));
  const hidden = new THREE.Matrix4().makeScale(0, 0, 0);
  const m = new THREE.Matrix4();
  const head = new THREE.Color();
  ctx.animate(({ dt, s, night, rain }) => {
    for (let i = 0; i < count; i++) {
      const car = cars[i];
      car.s -= SPEED * dt;
      if (car.s < s - 90 || car.s > s + 720 || !car.active) {
        const next = s + 240 + rng() * 320 + i * 40;
        car.active = next > MIN_S && next < MAX_S;
        car.s = next;
      }
      if (!car.active || car.s < MIN_S || car.s > MAX_S) {
        car.active = false;
        for (const mesh of [bodies, trims, heads, tails]) mesh.setMatrixAt(i, hidden);
        continue;
      }
      placement(THREE, route, car.s, -LANE_OFFSET, { onRoad: true, y: 0.02, yaw: Math.PI }, m);
      for (const mesh of [bodies, trims, heads, tails]) mesh.setMatrixAt(i, m);
    }
    for (const mesh of [bodies, trims, heads, tails]) mesh.instanceMatrix.needsUpdate = true;
    const lamps = 0.35 + Math.min(1, night + rain * 0.6) * 3.2;
    headMat.color.copy(head.setRGB(1, 0.95, 0.85)).multiplyScalar(lamps);
    tailMat.color.setRGB(1, 0.08, 0.06).multiplyScalar(0.5 + night * 2.2);
  });
}
