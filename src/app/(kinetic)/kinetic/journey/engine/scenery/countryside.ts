import { LANDMARKS } from "../../story";
import { buildDeck, buildGuardrails } from "../road";
import { createFrame } from "../splineRoute";
import { terrainHeight } from "../terrain";
import { signTexture } from "../textures";
import { Batch, beamBetween, placeObject, placement, type SceneryContext } from "./kit";

const L = LANDMARKS;

export function buildCountryside(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;

  // Farmstead: barn, silo, farmhouse.
  const farm = new THREE.Group();
  const barn = new THREE.Mesh(new THREE.BoxGeometry(12, 7, 18), mats.barnRed);
  barn.position.y = 3.5;
  const barnRoof = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 7.4, 18.6, 3, 1).rotateX(Math.PI / 2).rotateZ(Math.PI), mats.roof);
  barnRoof.scale.set(1, 0.55, 1);
  barnRoof.position.y = 7 + 1.8;
  const silo = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 16, 16), mats.steelGrey);
  silo.position.set(10, 8, -4);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(3.1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mats.steelGrey);
  dome.position.set(10, 16, -4);
  const house = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 10), mats.white);
  house.position.set(-16, 2.5, 8);
  const houseRoof = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 5.6, 10.6, 3, 1).rotateX(Math.PI / 2).rotateZ(Math.PI), mats.deep);
  houseRoof.scale.set(1, 0.5, 1);
  houseRoof.position.set(-16, 5 + 1.4, 8);
  for (const m of [barn, barnRoof, silo, dome, house, houseRoof]) {
    m.castShadow = true;
    m.receiveShadow = true;
    farm.add(m);
  }
  placeObject(THREE, route, farm, 236, -64, { yaw: 0.35 });
  root.add(farm);

  // Set well back from the road so the low roadside shots stay clear of it.
  buildPowerLine(ctx, 60, 530, -24);
  buildSigns(ctx);
  buildBridge(ctx);
}

function buildPowerLine(ctx: SceneryContext, from: number, to: number, lat: number): void {
  const { THREE, route, root, mats } = ctx;
  const poles = new Batch(THREE, new THREE.CylinderGeometry(0.14, 0.2, 11, 6).translate(0, 5.5, 0), mats.trunk);
  const bars = new Batch(THREE, new THREE.BoxGeometry(3.2, 0.18, 0.18).translate(0, 10.4, 0), mats.trunk);
  const tops: Array<Array<{ x: number; y: number; z: number }>> = [];
  const frame = createFrame();
  for (let s = from; s <= to; s += 46) {
    if (Math.abs(s - L.river) < 30) continue;
    const m = placement(THREE, route, s, lat, {});
    poles.add(m);
    bars.add(m);
    route.sample(s, frame);
    const ground = terrainHeight(s, lat);
    tops.push(
      [-1.4, 0, 1.4].map((o) => ({
        x: frame.x + frame.rx * (lat + o),
        y: ground + 10.5,
        z: frame.z + frame.rz * (lat + o),
      })),
    );
  }
  poles.build(root);
  bars.build(root);
  const verts: number[] = [];
  const SEG = 8;
  for (let i = 0; i < tops.length - 1; i++) {
    for (let w = 0; w < 3; w++) {
      const a = tops[i][w];
      const b = tops[i + 1][w];
      for (let k = 0; k < SEG; k++) {
        for (const t of [k / SEG, (k + 1) / SEG]) {
          const sag = Math.sin(t * Math.PI) * 1.4;
          verts.push(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t - sag, a.z + (b.z - a.z) * t);
        }
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  root.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x2a2e33, transparent: true, opacity: 0.7 })));
}

function roadSign(ctx: SceneryContext, s: number, lat: number, title: string, lines: string[]): void {
  const { THREE, route, root, mats } = ctx;
  const tex = signTexture(
    THREE,
    {
      width: 512,
      height: 256,
      background: "#1d6b43",
      border: "#f4f4ef",
      lines: [
        { text: title, size: 54, color: "#ffffff", weight: 800, y: 70 },
        ...lines.map((text, i) => ({ text, size: 40, color: "#ffffff", weight: 600, y: 142 + i * 56 })),
      ],
    },
    ctx.anisotropy,
  );
  const group = new THREE.Group();
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 3.6),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.05 }),
  );
  ctx.nightGlow(panel.material as never, 0.04, 0.35);
  panel.position.y = 5.6;
  const back = new THREE.Mesh(new THREE.BoxGeometry(7.3, 3.7, 0.12), mats.steelGrey);
  back.position.set(0, 5.6, -0.08);
  group.add(panel, back);
  for (const x of [-2.4, 2.4]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5.6, 0.2), mats.pole);
    post.position.set(x, 2.8, -0.2);
    post.castShadow = true;
    group.add(post);
  }
  placeObject(THREE, route, group, s, lat, { onRoad: true });
  root.add(group);
}

function buildSigns(ctx: SceneryContext): void {
  roadSign(ctx, 262, 9.8, "I-55 SOUTH", ["St. Louis  18", "Memphis  302"]);
  roadSign(ctx, 590, 9.8, "I-40 WEST", ["Little Rock  137", "Dallas  452"]);
}

function buildBridge(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const from = L.bridgeFrom;
  const to = L.bridgeTo;
  root.add(buildDeck(THREE, route, from - 4, to + 4, mats.concrete));
  for (const m of buildGuardrails(THREE, route, [[from - 6, to + 6]], mats.concrete)) root.add(m);

  // Warren truss on both sides, cross beams overhead.
  const beams = new Batch(THREE, new THREE.BoxGeometry(1, 1, 1), mats.steel);
  const frame = createFrame();
  const P = (s: number, lat: number, up: number) => {
    route.sample(s, frame);
    return { x: frame.x + frame.rx * lat, y: frame.y + up, z: frame.z + frame.rz * lat };
  };
  const panels = 8;
  const len = (to - from) / panels;
  const H = 7.6;
  for (const side of [-1, 1]) {
    const lat = side * 7.1;
    beams.add(beamBetween(THREE, P(from, lat, 0.4), P(to, lat, 0.4), 0.55));
    beams.add(beamBetween(THREE, P(from + len, lat, H), P(to - len, lat, H), 0.55));
    for (let i = 0; i <= panels; i++) {
      const s = from + i * len;
      if (i > 0 && i < panels) beams.add(beamBetween(THREE, P(s, lat, 0.4), P(s, lat, H), 0.36));
      if (i < panels) {
        const s2 = s + len;
        const up = i === 0 ? [P(s, lat, 0.4), P(s2, lat, H)] : i === panels - 1 ? [P(s, lat, H), P(s2, lat, 0.4)] : i % 2 ? [P(s, lat, H), P(s2, lat, 0.4)] : [P(s, lat, 0.4), P(s2, lat, H)];
        beams.add(beamBetween(THREE, up[0], up[1], 0.34));
      }
    }
  }
  for (let i = 1; i < panels; i++) {
    const s = from + i * len;
    beams.add(beamBetween(THREE, P(s, -7.1, H), P(s, 7.1, H), 0.4));
    if (i < panels - 1) {
      beams.add(beamBetween(THREE, P(s, -7.1, H), P(s + len, 7.1, H), 0.22));
      beams.add(beamBetween(THREE, P(s, 7.1, H), P(s + len, -7.1, H), 0.22));
    }
  }
  beams.build(root);

  const piers = new Batch(THREE, new THREE.BoxGeometry(1, 1, 1).translate(0, -0.5, 0), mats.concrete);
  for (const s of [from + 12, L.river, to - 12]) {
    piers.add(placement(THREE, route, s, 0, { onRoad: true, y: -1.4, scale: [11, 16, 2.4] }));
  }
  piers.build(root);
}
