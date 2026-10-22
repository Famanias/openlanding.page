import { LANDMARKS } from "../../story";
import { buildGuardrails } from "../road";
import { Batch, placeObject, placement, type SceneryContext } from "./kit";

const L = LANDMARKS;

export function buildStormZone(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  for (const mesh of buildGuardrails(THREE, route, [[850, 980], [1080, 1170]], mats.rail)) root.add(mesh);

  // Tunnel: a hill block with an arched bore, a concrete shell inside and
  // strip lights that streak past the camera.
  const length = L.tunnelTo - L.tunnelFrom;
  const mid = (L.tunnelFrom + L.tunnelTo) / 2;
  const R = 8.2;

  const hill = new THREE.Shape();
  hill.moveTo(-30, 0);
  hill.lineTo(-11, 21);
  hill.lineTo(11, 21);
  hill.lineTo(30, 0);
  hill.lineTo(R + 0.4, 0);
  hill.absarc(0, 0, R + 0.4, 0, Math.PI, false);
  hill.lineTo(-30, 0);
  const hillGeo = new THREE.ExtrudeGeometry(hill, { depth: length, bevelEnabled: false, curveSegments: 20 });
  hillGeo.translate(0, 0, -length / 2);
  const portalMat = new THREE.MeshStandardMaterial({ color: 0x8f8b84, roughness: 0.9 });
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x3f5a39, roughness: 1, flatShading: true });
  const hillMesh = new THREE.Mesh(hillGeo, [portalMat, hillMat]);
  hillMesh.receiveShadow = true;

  const shellGeo = new THREE.CylinderGeometry(R, R, length, 28, 1, true, Math.PI / 2, Math.PI);
  shellGeo.rotateX(Math.PI / 2);
  const shellMat = new THREE.MeshStandardMaterial({ color: 0x6e6c68, roughness: 0.75, side: THREE.DoubleSide });
  const shell = new THREE.Mesh(shellGeo, shellMat);

  // Portal frames.
  const frameGeo = new THREE.TorusGeometry(R + 0.5, 0.55, 8, 28, Math.PI);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xb4ada2, roughness: 0.8 });
  const tunnel = new THREE.Group();
  tunnel.add(hillMesh, shell);
  for (const z of [length / 2, -length / 2]) {
    const f = new THREE.Mesh(frameGeo, frameMat);
    f.position.z = z;
    tunnel.add(f);
  }
  placeObject(THREE, route, tunnel, mid, 0, { onRoad: true });
  root.add(tunnel);

  // Interior strip lights along both upper walls.
  const strips = new Batch(THREE, new THREE.BoxGeometry(0.22, 0.14, 2.6), mats.lampCool, { cast: false, receive: false });
  const angle = 0.95;
  for (let s = L.tunnelFrom + 3; s < L.tunnelTo - 2; s += 5.5) {
    for (const side of [-1, 1]) {
      strips.add(
        placement(THREE, route, s, side * Math.sin(angle) * (R - 0.25), {
          onRoad: true,
          y: Math.cos(angle) * (R - 0.25),
        }),
      );
    }
  }
  strips.build(root);
  // Tunnel lamps burn day and night.
  ctx.animate(({ s }) => {
    const inside = s > L.tunnelFrom - 80 && s < L.tunnelTo + 40;
    mats.lampCool.emissiveIntensity = inside ? 3.2 : 1.2;
  });
}

export function isInTunnel(s: number): number {
  const a = Math.min(1, Math.max(0, (s - (L.tunnelFrom + 2)) / 6));
  const b = Math.min(1, Math.max(0, (L.tunnelTo - 2 - s) / 6));
  return Math.min(a, b);
}
