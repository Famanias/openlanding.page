import * as THREE from "three";
import { chapterWeights } from "../night/beats";
import type { NightPlan } from "../night/your-night";
import { createCameraRig } from "./camera";
import { createFinaleStrip } from "./finaleStrip";
import { createFootprints, TRAILS } from "./footprints";
import { createPost } from "./post";
import { createRing } from "./ring";
import { createHeadland } from "./headland";
import { createWaterNormalMap } from "./normalMap";
import { createPlankton } from "./plankton";
import { createSand } from "./sand";
import { createSensorPools } from "./sensorPools";
import { waterLevel } from "./shore";
import { createSky } from "./sky";
import type { FontUrls, FrameInput, Part, SharedUniforms, World, WorldCtx } from "./types";
import { createWater } from "./water";
import { createWords } from "./words";

const NIGHT = new THREE.Color(0x0a0d16);

export async function createWorld(canvas: HTMLCanvasElement, opts: { fonts: FontUrls; moonUrl: string }): Promise<World> {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: false });
  renderer.setClearColor(NIGHT, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;
  const scene = new THREE.Scene();
  scene.background = NIGHT.clone();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 4000);
  camera.position.set(0, 6, 40);

  const shared: SharedUniforms = {
    uTime: { value: 0 },
    uTide: { value: 1 },
    uRoughness: { value: 0 },
    uCalm: { value: 0 },
    uProgress: { value: 0 },
    uLantern: { value: new THREE.Vector4(0, 0, 0.6, 0) },
    uResolution: { value: new THREE.Vector2(width, height) },
    uDawn: { value: 0 },
    uMoonDir: { value: new THREE.Vector3(0.2, 0.3, -1).normalize() },
    uMoonColor: { value: new THREE.Color(1, 0.93, 0.78) },
    uZenith: { value: new THREE.Color() },
    uHorizon: { value: new THREE.Color() },
    uWaterY: { value: waterLevel(1) },
    uWetLine: { value: waterLevel(1) },
    uCameraPos: { value: camera.position.clone() },
  };

  const moon = await new THREE.TextureLoader().loadAsync(opts.moonUrl);
  const ctx: WorldCtx = {
    renderer,
    scene,
    camera,
    textures: { waterNormal: createWaterNormalMap(), moon },
    fonts: opts.fonts,
    shared,
    size: { width, height },
  };

  const trails = { value: TRAILS.map((t) => new THREE.Vector4(t.x, t.z, t.angle, 0)) };
  // Order matters: the camera moves first, the sky sets the shared colours, the water sets the waterline.
  const parts: Part[] = [
    createCameraRig(ctx),
    createSky(ctx),
    createHeadland(ctx),
    createWater(ctx),
    createSand(ctx, trails),
    createWords(ctx),
    createPlankton(ctx),
    createSensorPools(ctx),
    createFootprints(ctx, trails),
    createRing(ctx),
  ];
  const finale = createFinaleStrip(ctx);
  parts.push(finale.part);
  const post = createPost(ctx);
  let lostCb: (() => void) | null = null;
  const onLost = (e: Event) => {
    e.preventDefault();
    lostCb?.();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  const world: World = {
    setFrame(f: FrameInput) {
      shared.uTime.value = f.time;
      shared.uTide.value = f.tide;
      shared.uRoughness.value = f.roughness;
      shared.uCalm.value = f.calm;
      shared.uProgress.value = f.p;
      shared.uLantern.value.set(f.lantern.x, f.lantern.y, f.lantern.radius, f.lantern.active ? 1 : 0);
      const w = chapterWeights(f.p);
      for (const part of parts) part.update(f, w);
      post.update(f.time, w);
      post.render();
    },
    setFinale(plan: NightPlan | null) {
      finale.setPlan(plan);
    },
    panFinale(dx: number) {
      finale.pan(dx);
    },
    snapshotFinale() {
      // render and capture in the same task, so the drawing buffer still holds the frame
      post.render();
      return new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("snapshot failed"))), "image/png"));
    },
    resize(w: number, h: number, dpr: number) {
      renderer.setPixelRatio(Math.min(dpr, 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      ctx.size.width = w;
      ctx.size.height = h;
      const pr = renderer.getPixelRatio();
      shared.uResolution.value.set(w * pr, h * pr);
      for (const part of parts) part.resize?.(w, h);
      post.resize(w, h, pr);
    },
    onContextLost(cb) {
      lostCb = cb;
    },
    dispose() {
      canvas.removeEventListener("webglcontextlost", onLost);
      for (const part of parts) part.dispose();
      post.dispose();
      renderer.dispose();
    },
  };

  world.resize(width, height, window.devicePixelRatio || 1);
  return world;
}
