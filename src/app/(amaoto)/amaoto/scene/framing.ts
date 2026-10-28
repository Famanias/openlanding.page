import * as THREE from "three";
import { HUB_Y, paperPoint } from "../model/rig";

// Full-rig envelopes keep framing steady through opening and separation.
// Sample actual paper geometry and include turned cap/grip and lashing clearance.
function makeEnvelope(explode: number) {
  const points: THREE.Vector3[] = [];
  for (const open of [0, 0.25, 0.6, 1])
    for (let rib = 0; rib < 40; rib++)
      for (const t of [0.45, 0.72, 1])
        points.push(
          new THREE.Vector3().copy(paperPoint(open, rib, t, 0, explode)),
        );
  for (const y of [
    -2.3 - explode * 0.32,
    -1.4 - explode * 0.32,
    HUB_Y - 0.03,
    HUB_Y + 0.34,
  ])
    for (const x of [-0.14, 0.14])
      for (const z of [-0.14, 0.14]) points.push(new THREE.Vector3(x, y, z));
  return points;
}
const envelope = makeEnvelope(0);
const separatedEnvelope = [...envelope, ...makeEnvelope(1)];
const back = new THREE.Vector3(),
  right = new THREE.Vector3(),
  up = new THREE.Vector3(),
  point = new THREE.Vector3();
const worldUp = new THREE.Vector3(0, 1, 0);
/** Every chapter keeps the whole umbrella in its canvas; only a selected anatomy part may crop in close. */
export function fitsWholeUmbrella(chapter: number, inspectedPart: string | null) {
  return !(chapter === 1 && inspectedPart);
}
/** Fit the complete umbrella to the canvas frustum while preserving the authored camera bearing. */
export function fitUmbrellaCamera(
  position: THREE.Vector3,
  target: THREE.Vector3,
  aspect: number,
  modelMatrix: THREE.Matrix4,
  fov = 34,
  includeExplodedPose = false,
) {
  back.copy(position).sub(target);
  let distance = back.length();
  if (distance < 0.001) {
    back.set(0, 0, 1);
    distance = 0.001;
  } else back.divideScalar(distance);
  right.crossVectors(worldUp, back).normalize();
  up.crossVectors(back, right).normalize();
  const originalDistance = distance;
  const vertical = Math.tan((fov * Math.PI) / 360) * 0.92,
    horizontal = vertical * Math.max(0.05, aspect);
  for (const local of includeExplodedPose ? separatedEnvelope : envelope) {
    point.copy(local).applyMatrix4(modelMatrix).sub(target);
    const depth = point.dot(back);
    distance = Math.max(
      distance,
      depth + (Math.abs(point.dot(right)) + 0.045) / horizontal,
      depth + (Math.abs(point.dot(up)) + 0.045) / vertical,
    );
  }
  if (distance === originalDistance) return position;
  return position.copy(target).addScaledVector(back, distance);
}
