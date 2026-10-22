import type { Group, MeshBasicMaterial } from "three";
import { LANDMARKS, smoothstep } from "../../story";
import { createRng } from "../noise";
import { signTexture } from "../textures";
import { Batch, baseBox, placeObject, placement, type SceneryContext } from "./kit";

type WarehouseSpec = {
  width: number;
  depth: number;
  height: number;
  doors: number;
  doorSpacing: number;
  /** Index of the door that stands open and lit (or -1). */
  openDoor: number;
  sign: { title: string; subtitle: string };
};

/**
 * Warehouse in local space: facade faces +Z, width along X, base at y = 0.
 */
function buildWarehouse(ctx: SceneryContext, spec: WarehouseSpec): Group {
  const { THREE, mats } = ctx;
  const g = new THREE.Group();
  const { width: W, depth: D, height: H } = spec;

  const main = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), mats.wall);
  main.position.y = H / 2;
  main.castShadow = true;
  main.receiveShadow = true;
  const roof = new THREE.Mesh(new THREE.BoxGeometry(W + 0.8, 0.6, D + 0.8), mats.roof);
  roof.position.y = H + 0.3;
  roof.castShadow = true;
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(W + 0.2, 1.3, D + 0.2), mats.concreteDark);
  plinth.position.y = 0.65;
  const band = new THREE.Mesh(new THREE.BoxGeometry(W, 0.7, 0.12), mats.orange);
  band.position.set(0, H - 1.4, D / 2 + 0.06);
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(W - 4, 0.25, 2.4), mats.roof);
  canopy.position.set(0, 5.4, D / 2 + 1.2);
  canopy.castShadow = true;
  g.add(main, roof, plinth, band, canopy);

  // Rooftop units for silhouette.
  const rng = createRng(W | 0);
  for (let i = 0; i < 6; i++) {
    const unit = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 1.8), mats.steelGrey);
    unit.position.set((rng() - 0.5) * (W - 10), H + 1.3, (rng() - 0.5) * (D - 10));
    unit.castShadow = true;
    g.add(unit);
  }

  const doorMat = new THREE.MeshStandardMaterial({ map: ctx.textures.dockDoor, roughness: 0.6, metalness: 0.3 });
  const openMat = new THREE.MeshStandardMaterial({ color: 0x2a2018, emissive: 0xffb866, emissiveIntensity: 1.2, roughness: 0.9 });
  ctx.nightGlow(openMat, 0.9, 2.6);
  const doorGeo = new THREE.PlaneGeometry(3.3, 3.6);
  const lampGeo = new THREE.BoxGeometry(0.9, 0.18, 0.4);
  const bumperGeo = new THREE.BoxGeometry(0.35, 0.5, 0.3);
  const x0 = -((spec.doors - 1) * spec.doorSpacing) / 2;
  for (let i = 0; i < spec.doors; i++) {
    const x = x0 + i * spec.doorSpacing;
    const door = new THREE.Mesh(doorGeo, i === spec.openDoor ? openMat : doorMat);
    door.position.set(x, 1.3 + 1.8, D / 2 + 0.03);
    const lampMesh = new THREE.Mesh(lampGeo, mats.lampWarm);
    lampMesh.position.set(x, 5.15, D / 2 + 1.9);
    for (const side of [-1, 1]) {
      const bumper = new THREE.Mesh(bumperGeo, mats.rubber);
      bumper.position.set(x + side * 1.4, 1.2, D / 2 + 0.2);
      g.add(bumper);
    }
    g.add(door, lampMesh);
  }

  const signTex = signTexture(
    THREE,
    {
      width: 1024,
      height: 160,
      background: "#1B1522",
      lines: [
        { text: spec.sign.title, size: 74, color: "#ffffff", weight: 800, y: 70, tracking: 4 },
        { text: spec.sign.subtitle, size: 30, color: "#FF6B2B", weight: 700, y: 132, tracking: 6 },
      ],
    },
    ctx.anisotropy,
  );
  const signMat = new THREE.MeshStandardMaterial({ map: signTex, emissive: 0xffffff, emissiveMap: signTex, emissiveIntensity: 0.15, roughness: 0.5 });
  ctx.nightGlow(signMat, 0.06, 0.45);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(25.6, 4), signMat);
  sign.position.set(0, H - 4.2, D / 2 + 0.07);
  g.add(sign);

  return g;
}

function trailerBatches(ctx: SceneryContext) {
  const { THREE, mats } = ctx;
  return {
    body: new Batch(THREE, new THREE.BoxGeometry(2.6, 3.6, 13).translate(0, 1.2 + 1.8, 0), mats.trailer),
    under: new Batch(THREE, new THREE.BoxGeometry(2.3, 0.9, 3.2).translate(0, 0.75, 4.2), mats.rubber),
    stripe: new Batch(THREE, new THREE.BoxGeometry(2.64, 0.35, 13.02).translate(0, 1.55, 0), mats.brandBlue, { cast: false, receive: true }),
  };
}

export function buildOrigin(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;

  // Warehouse along the right side of the yard, facade toward the road.
  const warehouse = buildWarehouse(ctx, {
    width: 96,
    depth: 36,
    height: 13,
    doors: 7,
    doorSpacing: 12,
    openDoor: 3,
    sign: { title: "KINETIC", subtitle: "ORIGIN · DOCKS 1–7" },
  });
  placeObject(THREE, route, warehouse, -34, 40, { yaw: -Math.PI / 2, onRoad: true });
  root.add(warehouse);

  // Trailers backed into the docks.
  const t = trailerBatches(ctx);
  for (const doorS of [-70, -58, -46, -22, -10]) {
    const m = placement(THREE, route, doorS, 14.8, { onRoad: true, yaw: Math.PI / 2 });
    t.body.add(m);
    t.under.add(m);
    t.stripe.add(m);
  }

  // Container stacks on the left.
  const rng = createRng(21);
  const palette = [0xf26a2e, 0x2f5d7c, 0x10263d, 0x7a8c96, 0x3b7f7a, 0xb4532a, 0xd7d2c8];
  const containers = new Batch(THREE, baseBox(THREE), mats.container);
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 9; i++) {
      const s = -76 + i * 12.8 + rng() * 1.2;
      const lat = -17 - row * 3.2;
      const height = 1 + Math.floor(rng() * 3);
      for (let h = 0; h < height; h++) {
        containers.add(
          placement(THREE, route, s, lat, { onRoad: true, y: h * 2.6, yaw: (rng() - 0.5) * 0.04, scale: [2.44, 2.59, 12.1] }),
          palette[Math.floor(rng() * palette.length)],
        );
      }
    }
  }
  for (let i = 0; i < 10; i++) {
    containers.add(
      placement(THREE, route, -60 + rng() * 90, -34 - rng() * 22, { yaw: Math.PI / 2 + (rng() - 0.5) * 0.3, scale: [2.44, 2.59, 6.06] }),
      palette[Math.floor(rng() * palette.length)],
    );
  }

  // Yard lighting.
  const poles = new Batch(THREE, new THREE.CylinderGeometry(0.12, 0.18, 13, 8).translate(0, 6.5, 0), mats.pole);
  const heads = new Batch(THREE, new THREE.BoxGeometry(1.3, 0.3, 0.7).translate(0, 13, 0), mats.lampWarm, { cast: false, receive: false });
  for (const [s, lat] of [
    [-66, -11],
    [-30, -11],
    [6, -11],
    [-48, 11.5],
    [-12, 11.5],
  ] as const) {
    const m = placement(THREE, route, s, lat, { onRoad: true });
    poles.add(m);
    heads.add(m);
  }
  [t.body, t.under, t.stripe, containers, poles, heads].forEach((b) => b.build(root));

  // Gate: booth, posts and a barrier arm that lifts for the truck.
  const booth = new THREE.Group();
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.8, 3.2), mats.white);
  cabin.position.y = 1.4;
  cabin.castShadow = true;
  const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.25, 4), mats.deep);
  cabinRoof.position.y = 2.95;
  const win = new THREE.Mesh(new THREE.BoxGeometry(2.62, 0.9, 2.4), mats.windowWarm);
  win.position.y = 1.9;
  booth.add(cabin, cabinRoof, win);
  placeObject(THREE, route, booth, LANDMARKS.gate - 2, 11.4, { onRoad: true });
  root.add(booth);

  const gate = new THREE.Group();
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.3, 0.5), mats.deep);
  post.position.set(0, 0.65, 0);
  const arm = new THREE.Group();
  arm.position.set(0, 1.1, 0);
  const red = new THREE.MeshStandardMaterial({ color: 0xd83a2b, roughness: 0.5 });
  const segment = new THREE.BoxGeometry(17 / 8, 0.16, 0.16);
  for (let i = 0; i < 8; i++) {
    const piece = new THREE.Mesh(segment, i % 2 ? mats.white : red);
    piece.position.x = -(i + 0.5) * (17 / 8);
    piece.castShadow = true;
    arm.add(piece);
  }
  gate.add(post, arm);
  placeObject(THREE, route, gate, LANDMARKS.gate, 8.6, { onRoad: true });
  root.add(gate);
  ctx.animate(({ s, dt, still }) => {
    // Lifts as the truck rolls up, drops again once its tail has cleared.
    const open = smoothstep(2, 13, s) * (1 - smoothstep(35, 42, s));
    const target = -open * 1.45;
    arm.rotation.z += (target - arm.rotation.z) * (still ? 1 : 1 - Math.exp(-6 * dt));
  });
}

export function buildDestination(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const warehouse = buildWarehouse(ctx, {
    width: 110,
    depth: 40,
    height: 13,
    doors: 9,
    doorSpacing: 12,
    openDoor: 4,
    sign: { title: "KINETIC", subtitle: "DESTINATION · DOCK 2" },
  });
  placeObject(THREE, route, warehouse, LANDMARKS.dockFront + 20, 0, { onRoad: true, yaw: 0 });
  root.add(warehouse);

  const t = trailerBatches(ctx);
  for (const lat of [-36, -24, -12, 12, 24, 36]) {
    const m = placement(THREE, route, LANDMARKS.dockFront - 6.6, lat, { onRoad: true, yaw: Math.PI });
    t.body.add(m);
    t.under.add(m);
    t.stripe.add(m);
  }
  const poles = new Batch(THREE, new THREE.CylinderGeometry(0.12, 0.18, 13, 8).translate(0, 6.5, 0), mats.pole);
  const heads = new Batch(THREE, new THREE.BoxGeometry(1.3, 0.3, 0.7).translate(0, 13, 0), mats.lampWarm, { cast: false, receive: false });
  for (const [s, lat] of [
    [1214, -12],
    [1244, 12],
    [1274, -12],
    [1290, 22],
    [1290, -26],
  ] as const) {
    const m = placement(THREE, route, s, lat, { onRoad: true });
    poles.add(m);
    heads.add(m);
  }
  [t.body, t.under, t.stripe, poles, heads].forEach((b) => b.build(root));

  // Guide lights that chase toward the open dock.
  const guideCount = 26;
  const guideMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const guides = new THREE.InstancedMesh(new THREE.BoxGeometry(0.34, 0.08, 0.34), guideMat, guideCount * 2);
  const guideS: number[] = [];
  for (let i = 0; i < guideCount; i++) {
    const s = 1200 + i * 3.8;
    for (const side of [-1, 1]) {
      const idx = i * 2 + (side > 0 ? 1 : 0);
      guides.setMatrixAt(idx, placement(THREE, route, s, side * 5.2, { onRoad: true, y: 0.05 }));
      guideS[idx] = s;
    }
  }
  const guideColor = new THREE.Color();
  const accent = new THREE.Color(0xf26a2e);
  const green = new THREE.Color(0x45d483);
  for (let i = 0; i < guideCount * 2; i++) guides.setColorAt(i, accent);
  root.add(guides);

  // Arrival beacon: a steady ring around the parking spot with ripples that
  // keep flowing outward, plus a light column. Each ripple fades to nothing
  // before it wraps, and three overlap, so there is never a visible restart.
  const ringTex = ringTexture(ctx);
  const ringGeo = new THREE.PlaneGeometry(1, 1);
  const ringMaterial = (): MeshBasicMaterial =>
    new THREE.MeshBasicMaterial({
      color: 0xf26a2e,
      map: ringTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
  const ringMat = ringMaterial();
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.scale.set(15, 15, 1);
  const ripples = [0, 1, 2].map(() => {
    const mesh = new THREE.Mesh(ringGeo, ringMaterial());
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.01;
    return mesh;
  });
  const ringHolder = new THREE.Group();
  ringHolder.add(ring, ...ripples);
  placeObject(THREE, route, ringHolder, LANDMARKS.arrival, 0, { onRoad: true, y: 0.06 });
  root.add(ringHolder);

  const columnMat = new THREE.MeshBasicMaterial({
    color: 0xf26a2e,
    map: ctx.textures.beam,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const column = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.2, 16, 40, 1, true).translate(0, 8, 0), columnMat);
  // Beam texture is bright at v = 1 (top); flip so it glows from the ground up.
  column.rotation.x = Math.PI;
  column.position.y = 16;
  ringHolder.add(column);

  let clock = 0;
  let rate = 0.28;
  let glow = 0.5;
  ctx.animate(({ time, dt, still, s, arrived, night }) => {
    const near = smoothstep(1150, 1250, s);
    const k = still ? 1 : 1 - Math.exp(-3 * dt);
    // Speed and strength ease between states; the ripple clock never jumps.
    rate += ((arrived ? 0.22 : 0.34) - rate) * k;
    glow += ((arrived ? 1 : 0.62) - glow) * k;
    clock = (clock + dt * rate) % 3;
    const target = arrived ? green : accent;
    ringMat.color.lerp(target, still ? 1 : 1 - Math.exp(-4 * dt));
    columnMat.color.copy(ringMat.color);
    const light = near * glow * (0.7 + night * 0.5);
    ringMat.opacity = light * (0.62 + 0.12 * Math.sin(time * 1.6));
    ripples.forEach((ripple, i) => {
      const phase = (clock + i / 3) % 1;
      const eased = 1 - (1 - phase) * (1 - phase);
      const size = 13.5 + eased * 12;
      ripple.scale.set(size, size, 1);
      const material = ripple.material as MeshBasicMaterial;
      material.color.copy(ringMat.color);
      // sin^2 envelope: zero at both ends of each ripple's life.
      material.opacity = light * 0.55 * Math.pow(Math.sin(Math.PI * phase), 2);
    });
    columnMat.opacity = near * (0.16 + (glow - 0.62) * 0.3) * (0.6 + night * 0.6);

    // Chase: a bright band travels toward the dock; all go green on arrival.
    for (let i = 0; i < guideCount * 2; i++) {
      const phase = ((guideS[i] - time * 22) % 30 + 30) % 30;
      const k = arrived ? 0.8 : 0.25 + Math.max(0, 1 - phase / 6) * 1.6;
      guideColor.copy(arrived ? green : accent).multiplyScalar(k * (0.4 + near * 1.2));
      guides.setColorAt(i, guideColor);
    }
    if (guides.instanceColor) guides.instanceColor.needsUpdate = true;
  });
}

function ringTexture(ctx: SceneryContext) {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.72, "rgba(255,255,255,0.15)");
    grad.addColorStop(0.9, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  const t = new ctx.THREE.CanvasTexture(c);
  return t;
}
