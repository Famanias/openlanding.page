import * as THREE from "three/webgpu";
import { fishMaterial, riceBedMaterial, riceMaterial, stonewareMaterial } from "./materials";

const GRAINS = 680;

/** Deterministic pseudo-random numbers, so the dish looks the same on every load. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** The rice: an oblong pressed mound plus instanced grains scattered over its upper surface. */
function rice(): THREE.Group {
  const group = new THREE.Group();
  const rx = 1.05;
  const ry = 0.42;
  const rz = 0.52;

  const bed = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), riceBedMaterial());
  bed.scale.set(rx * 0.97, ry * 0.97, rz * 0.97);
  bed.castShadow = true;
  bed.receiveShadow = true;
  group.add(bed);

  const grainGeo = new THREE.CapsuleGeometry(0.04, 0.055, 3, 8);
  const grains = new THREE.InstancedMesh(grainGeo, riceMaterial(), GRAINS);
  grains.castShadow = true;
  const random = rng(19721972);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const n = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  for (let i = 0; i < GRAINS; i++) {
    // Sample the ellipsoid surface, biased to the visible upper and side areas.
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(1 - random() * 1.35); // 0 (top) … ~110° (just past the equator)
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    const pos = new THREE.Vector3(x * rx, y * ry, z * rz);
    n.set(x / rx, y / ry, z / rz).normalize();
    // Lay each grain flat on the surface, pointing in a random tangent direction.
    tangent.set(random() - 0.5, 0, random() - 0.5).normalize().projectOnPlane(n).normalize();
    q.setFromUnitVectors(up, tangent);
    const s = 0.8 + random() * 0.3;
    m.compose(pos.addScaledVector(n, 0.012), q, new THREE.Vector3(s, s, s));
    grains.setMatrixAt(i, m);
  }
  group.add(grains);
  return group;
}

/** The fish: a thick slab draped over the rice, ends drooping, edges softly rounded. */
function fish(): THREE.Mesh {
  const halfX = 1.18;
  const geo = new THREE.BoxGeometry(halfX * 2, 0.13, 1.12, 64, 3, 28);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const u = x / halfX; // -1 … 1 along the length
    const w = z / 0.56; // -1 … 1 across
    // Drape: highest over the middle of the rice, drooping at both ends.
    const drape = 0.34 - 0.4 * u * u * u * u - 0.1 * u * u;
    // Narrow the ends a little and round the long edges down.
    const taper = 1 - 0.18 * u * u;
    const sag = -0.05 * w * w;
    pos.setXYZ(i, x, y + drape + sag, z * taper);
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, fishMaterial());
  mesh.position.y = 0.16;
  mesh.rotation.y = 0.04;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** The plate: a heavy rectangular stoneware board with a slightly raised rim. */
function plate(): THREE.Mesh {
  const shape = new THREE.Shape();
  const w = 1.9;
  const d = 1.15;
  const r = 0.22;
  shape.moveTo(-w + r, -d);
  shape.lineTo(w - r, -d);
  shape.quadraticCurveTo(w, -d, w, -d + r);
  shape.lineTo(w, d - r);
  shape.quadraticCurveTo(w, d, w - r, d);
  shape.lineTo(-w + r, d);
  shape.quadraticCurveTo(-w, d, -w, d - r);
  shape.lineTo(-w, -d + r);
  shape.quadraticCurveTo(-w, -d, -w + r, -d);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 4,
    curveSegments: 16,
  });
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, stonewareMaterial());
  mesh.position.y = -0.62;
  mesh.receiveShadow = true;
  return mesh;
}

/** One piece of miso-glazed nigiri on its plate, centred at the origin. */
export function buildNigiri(): THREE.Group {
  const dish = new THREE.Group();
  const piece = new THREE.Group();
  const r = rice();
  r.position.y = 0.0; // rests on the plate top at y = -0.41
  piece.add(r, fish());
  dish.add(plate(), piece);
  return dish;
}
