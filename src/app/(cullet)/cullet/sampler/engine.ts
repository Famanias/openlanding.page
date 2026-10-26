import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { clamp, smoothing } from "../motion/math";
import type { GlassParams } from "./params";

/**
 * The live sample: one cut gem of transmissive glass in front of a striped studio card, so that
 * refraction, dispersion and roughness are all visible at once. Drag turns it; left alone it turns
 * slowly. Renders only while on screen, and reports how long each frame takes to submit.
 */
function backdropTexture() {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 640;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "rgb(244,245,248)";
  ctx.fillRect(0, 0, c.width, c.height);
  // ink bars of varied width, a cobalt band and a hairline grid: edges for the glass to bend
  const bars = [[96, 14], [168, 6], [214, 30], [318, 4], [356, 10], [602, 22], [676, 4], [720, 12], [842, 8], [900, 26]];
  ctx.fillStyle = "rgb(15,17,23)";
  for (const [x, w] of bars) ctx.fillRect(x, 0, w, c.height);
  ctx.fillStyle = "rgb(37,99,235)";
  ctx.fillRect(452, 0, 64, c.height);
  ctx.strokeStyle = "rgba(15,17,23,0.12)";
  ctx.lineWidth = 2;
  for (let y = 40; y < c.height; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(c.width, y); ctx.stroke(); }
  ctx.fillStyle = "rgba(15,17,23,0.75)";
  ctx.font = "600 34px ui-monospace, monospace";
  ctx.fillText("CULLET STUDIO CARD 07", 40, 600);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "rgba(15,17,23,0.28)");
  g.addColorStop(1, "rgba(15,17,23,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/** A round brilliant, reduced: table, crown, girdle and pavilion on ten cut faces, flat-shaded. */
function gemGeometry() {
  const profile = [
    new THREE.Vector2(0.001, -1.05),
    new THREE.Vector2(1.0, 0.0),
    new THREE.Vector2(1.0, 0.1),
    new THREE.Vector2(0.62, 0.52),
    new THREE.Vector2(0.001, 0.52),
  ];
  const geo = new THREE.LatheGeometry(profile, 10).toNonIndexed();
  geo.computeVertexNormals();
  return geo;
}

export function createSamplerEngine(canvas: HTMLCanvasElement, stage: HTMLElement, initial: GlassParams, onFrame: (ms: number) => void) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f5f8);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(30, 4 / 3, 0.1, 50);
  camera.position.set(0, 0.35, 7.2);
  camera.lookAt(0, 0, 0);

  const backTex = backdropTexture();
  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 6), new THREE.MeshBasicMaterial({ map: backTex }));
  backdrop.position.z = -2.4;
  scene.add(backdrop);

  const shadowTex = shadowTexture();
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.45;
  scene.add(shadow);

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, transmission: 1, specularIntensity: 1,
    iridescenceIOR: 1.35, iridescenceThicknessRange: [280, 680], envMapIntensity: 1.1, side: THREE.DoubleSide,
  });
  const gem = new THREE.Mesh(gemGeometry(), material);
  gem.position.y = -0.1;
  gem.scale.setScalar(1.25);
  scene.add(gem);

  const apply = (p: GlassParams) => {
    material.ior = p.ior;
    material.dispersion = p.dispersion; // the same number GLTFLoader reads from KHR_materials_dispersion
    material.roughness = p.roughness;
    material.thickness = p.thickness;
    material.iridescence = p.iridescence;
  };
  apply(initial);

  // drag to turn; inertia; a slow turn when left alone
  const turn = { yaw: 0.4, pitch: 0.22, vy: 0, dragging: false, lastX: 0, lastY: 0, lastInput: 0 };
  const down = (e: PointerEvent) => {
    turn.dragging = true; turn.lastX = e.clientX; turn.lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    wake();
  };
  const move = (e: PointerEvent) => {
    if (!turn.dragging) return;
    const dx = e.clientX - turn.lastX, dy = e.clientY - turn.lastY;
    turn.lastX = e.clientX; turn.lastY = e.clientY;
    turn.yaw += dx * 0.01;
    turn.pitch = clamp(turn.pitch + dy * 0.006, -0.6, 0.8);
    turn.vy = dx * 0.01;
    turn.lastInput = performance.now();
    wake();
  };
  const up = () => { turn.dragging = false; };
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);

  const resize = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1 ? 40 : 30;
    camera.updateProjectionMatrix();
    wake();
  };

  let frame = 0, last = performance.now(), visible = false, running = true, acc = 0, n = 0, lastReport = 0;
  const tick = (now: number) => {
    frame = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!turn.dragging) {
      turn.vy *= 1 - smoothing(dt, 0.35);
      const idle = now - turn.lastInput > 1600 ? 0.18 : 0;
      turn.yaw += (turn.vy + idle * dt);
    }
    gem.rotation.set(turn.pitch, turn.yaw, 0);
    const t0 = performance.now();
    renderer.render(scene, camera);
    acc += performance.now() - t0; n++;
    if (now - lastReport > 700 && n) { onFrame(acc / n); acc = 0; n = 0; lastReport = now; }
    if (running && visible && !document.hidden) frame = requestAnimationFrame(tick);
  };
  function wake() {
    if (running && !frame && visible && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(tick); }
  }

  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); });
  io.observe(stage);
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  document.addEventListener("visibilitychange", wake);
  resize();

  return {
    set(p: GlassParams) { apply(p); wake(); },
    destroy() {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", wake);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      gem.geometry.dispose(); material.dispose(); backTex.dispose(); shadowTex.dispose(); env.dispose(); pmrem.dispose();
      renderer.dispose();
    },
  };
}

export type SamplerEngine = ReturnType<typeof createSamplerEngine>;
