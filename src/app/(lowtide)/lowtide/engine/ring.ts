import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { PRODUCT } from "../content/story";
import { lerp, smoothstep } from "../motion/math";
import { CHAPTER_POINTS } from "../night/clock";
import { createPoolSurface } from "./poolSurface";
import { POOLS } from "./pools";
import { sandBase } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText } from "./worldText";

/** The moon's reflection in the reveal pool: it ripples, bends into a ring outline, then fades as the ring rises. */
const REFLECTION = /* glsl */ `
  vec2 q = uv + 0.035 * sin(vec2(uv.y, uv.x) * 16.0 + uTime * 2.2) * (1.0 - 0.6 * uAmount);
  float rr = length(q * vec2(1.0, 1.15));
  float disc = smoothstep(0.3, 0.2, rr);
  float ringLine = smoothstep(0.07, 0.0, abs(rr - 0.36));
  float moon = mix(disc, ringLine, smoothstep(0.15, 0.85, uAmount)) * (1.0 - uPulse);
  col += vec3(1.0, 0.93, 0.8) * moon * 1.8;`;

/** A rounded-rectangle cross-section swept round the axis: the band of the ring. */
function ringProfile(inner = 1, outer = 1.17, half = 0.4, corner = 0.08) {
  const pts: THREE.Vector2[] = [];
  const arc = (cx: number, cy: number, a0: number, a1: number) => {
    for (let i = 0; i <= 6; i++) {
      const a = a0 + ((a1 - a0) * i) / 6;
      pts.push(new THREE.Vector2(cx + Math.cos(a) * corner, cy + Math.sin(a) * corner));
    }
  };
  arc(inner + corner, -half + corner, Math.PI, Math.PI * 1.5);
  arc(outer - corner, -half + corner, Math.PI * 1.5, Math.PI * 2);
  arc(outer - corner, half - corner, 0, Math.PI * 0.5);
  arc(inner + corner, half - corner, Math.PI * 0.5, Math.PI);
  pts.push(pts[0].clone());
  return pts;
}

/** The signature moment: the LOWTIDE ring is born from the moon's reflection in the last pool. */
export function createRing(ctx: WorldCtx): Part {
  const pool = POOLS.find((p) => p.id === "reveal")!;
  const surface = createPoolSurface(ctx, pool, REFLECTION);
  ctx.scene.add(surface.mesh);

  const pmrem = new THREE.PMREMGenerator(ctx.renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const band = new THREE.MeshPhysicalMaterial({ color: 0xc9ced6, metalness: 1, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.2, envMap: env, envMapIntensity: 0.55 });
  const ring = new THREE.Mesh(new THREE.LatheGeometry(ringProfile(), 160), band);
  // the sensor window on the inside of the band
  const windowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.45, 0.8, 1).multiplyScalar(0.9) });
  const sensor = new THREE.Mesh(new THREE.TorusGeometry(1.005, 0.035, 12, 160, 0.9), windowMat);
  sensor.rotation.x = Math.PI / 2;
  ring.add(sensor);
  const holder = new THREE.Group();
  holder.add(ring);
  holder.position.set(pool.x, surface.rim, pool.z);
  ctx.scene.add(holder);

  const moonLight = new THREE.DirectionalLight(0xfff1d6, 1.4);
  const fill = new THREE.PointLight(0x8fd3ff, 3, 14, 2);
  fill.position.set(pool.x, surface.rim + 0.4, pool.z + 1.5);
  ctx.scene.add(moonLight, moonLight.target, fill);

  // specs etched in the wet sand in front of the pool
  const specLine = `${PRODUCT.material}  ·  ${PRODUCT.batteryDays} days a charge  ·  sizes ${PRODUCT.sizes[0]}–${PRODUCT.sizes[PRODUCT.sizes.length - 1]}`;
  const sz = pool.z + pool.r + 1.1;
  const specs = createWorldText(ctx, { text: specLine, font: ctx.fonts.mono, fontSize: 0.62, mode: "always", color: 0xebd9a6, anchorY: "bottom", tear: 0.5 });
  specs.mesh.position.set(pool.x, sandBase(sz) + 0.06, sz);
  specs.mesh.rotation.x = -Math.PI / 2 + 0.4;
  const pz = sz + 6;
  const price = createWorldText(ctx, { text: `$${PRODUCT.price}  ·  no subscription`, font: ctx.fonts.display, fontSize: 1.5, mode: "always", color: 0xecefF0, anchorY: "bottom", tear: 0.5 });
  price.mesh.position.set(pool.x, sandBase(pz) + 0.06, pz);
  price.mesh.rotation.x = -Math.PI / 2 + 0.45;
  ctx.scene.add(specs.mesh, price.mesh);

  return {
    update(f) {
      // arrival 0 → 1 over the approach to the fifth low tide; it stays risen afterwards
      const t = smoothstep(CHAPTER_POINTS.reveal - 0.06, CHAPTER_POINTS.reveal, f.p);
      const bend = smoothstep(0.1, 0.55, t);
      const lift = smoothstep(0.45, 1, t);
      surface.update(ctx.shared.uWaterY.value);
      surface.uAmount.value = bend;
      surface.uPulse.value = lift;

      holder.visible = lift > 0.001;
      const hover = Math.sin(f.time * 0.8) * 0.08 * lift;
      holder.position.y = lerp(surface.rim - 0.5, surface.rim + 3.1, lift) + hover;
      // rises from lying in the water to a three-quarter view, so the band's thickness and inside show
      holder.rotation.x = lerp(0, 1.05, lift);
      holder.rotation.z = lerp(0, -0.22, lift);
      ring.rotation.y = f.time * 0.22;
      holder.scale.setScalar(lerp(0.9, 1.5, lift));
      moonLight.position.copy(ctx.shared.uMoonDir.value).multiplyScalar(50).add(holder.position);
      moonLight.target.position.copy(holder.position);
      fill.intensity = 3 * lift;

      const show = smoothstep(0.7, 1, t) * (1 - smoothstep(CHAPTER_POINTS.reveal + 0.012, CHAPTER_POINTS.dawn, f.p));
      specs.uWeight.value = show;
      price.uWeight.value = show;
      specs.mesh.visible = price.mesh.visible = show > 0.001;
    },
    dispose() {
      surface.dispose();
      ring.geometry.dispose();
      sensor.geometry.dispose();
      band.dispose();
      windowMat.dispose();
      env.dispose();
      pmrem.dispose();
      specs.dispose();
      price.dispose();
    },
  };
}
