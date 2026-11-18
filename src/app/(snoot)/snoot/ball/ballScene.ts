import * as THREE from "three/webgpu";
import { abs, color, float, length, mix, normalize, positionLocal, smoothstep, uniform, uv } from "three/tsl";
import { FETCH_DURATION, idleBob, throwArc } from "./fetch";

// Palette values (yolk felt, milk seam, ink shadow) as numbers for three.js.
const YOLK = 0xffc23d;
const MILK = 0xfffcf6;
const INK = 0x1f1b3a;

export type BallScene = { throwBall(): void; dispose(): void };

/**
 * A felt ball in real time: WebGPU when available, WebGL2 otherwise. The seam is procedural (TSL): the
 * curve where the sphere meets the saddle z = 0.75(x² − y²), which closes into the familiar two-lobed
 * line. Sheen gives the felt its fuzz. It bobs while idle, spins on drag with inertia, and flies off
 * and bounces back when the booking form succeeds. Pauses off-screen and in hidden tabs.
 */
export async function createBallScene(canvas: HTMLCanvasElement, opts: { onReady(): void; onLost(): void }): Promise<BallScene> {
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true, forceWebGL: !("gpu" in navigator) });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  await renderer.init();
  renderer.onDeviceLost = () => opts.onLost();

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff4e4, 0x3550f0, 0.9));
  const key = new THREE.DirectionalLight(0xfff4e4, 3.2);
  key.position.set(-3, 4, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff6b8b, 1.4);
  rim.position.set(3, 1.5, -3);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
  camera.position.set(0, 1.4, 7.2);
  camera.lookAt(0, 0.9, 0);

  // the ball
  const n = normalize(positionLocal);
  const seamDistance = abs(n.z.sub(n.x.mul(n.x).sub(n.y.mul(n.y)).mul(0.75)));
  const seam = float(1).sub(smoothstep(0.045, 0.07, seamDistance));
  const felt = new THREE.MeshPhysicalNodeMaterial({ roughness: 0.9, sheen: 0.35, sheenRoughness: 0.8 });
  felt.colorNode = mix(color(YOLK), color(MILK), seam);
  felt.sheenColor = new THREE.Color(MILK);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), felt);
  ball.rotation.set(0.4, 0.6, 0.2);
  const pivot = new THREE.Group();
  pivot.add(ball);
  scene.add(pivot);

  // a soft contact shadow that fades as the ball leaves the floor
  const shadowStrength = uniform(0.32);
  const shadowMat = new THREE.MeshBasicNodeMaterial({ transparent: true, depthWrite: false });
  shadowMat.colorNode = color(INK);
  shadowMat.opacityNode = float(1).sub(smoothstep(0.12, 0.5, length(uv().sub(0.5)))).mul(shadowStrength);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.001;
  scene.add(shadow);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // drag to spin, with inertia
  let vx = 0;
  let vy = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    vy = (e.clientX - lastX) * 0.012;
    vx = (e.clientY - lastY) * 0.012;
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const onUp = () => (dragging = false);
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  let throwStart = -1;
  let visible = true;
  let last = performance.now();
  const clock = { t: 0 };

  const frame = () => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    clock.t += dt;

    let x = 0;
    let y = idleBob(clock.t);
    let z = 0;
    let spin = 0;
    if (throwStart >= 0) {
      const p = (now - throwStart) / 1000 / FETCH_DURATION;
      const pose = throwArc(p);
      ({ x, y, z, spin } = pose);
      if (p >= 1) throwStart = -1;
    }
    pivot.position.set(x, y + 1, z);
    ball.rotation.y += vy + dt * 0.35;
    ball.rotation.x += vx;
    ball.rotation.z = -spin;
    vx *= 0.92;
    vy *= 0.92;
    shadow.position.set(x, 0.001, z);
    const lift = Math.max(0, y);
    shadow.scale.setScalar(1 / (1 + lift * 0.6));
    shadowStrength.value = 0.32 / (1 + lift * 1.6);
    renderer.render(scene, camera);
  };

  const run = () => renderer.setAnimationLoop(visible && !document.hidden ? frame : null);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    last = performance.now();
    run();
  });
  io.observe(canvas);
  document.addEventListener("visibilitychange", run);
  run();
  opts.onReady();

  return {
    throwBall() {
      throwStart = performance.now();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", run);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      ball.geometry.dispose();
      felt.dispose();
      shadow.geometry.dispose();
      shadowMat.dispose();
      renderer.dispose();
    },
  };
}
