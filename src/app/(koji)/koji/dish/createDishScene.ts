import * as THREE from "three/webgpu";
import { buildNigiri } from "./nigiri";

const AUTO_SPIN = 0.15; // rad/s
const DAMPING = 0.92; // per frame, for drag inertia
const MAX_TILT = 0.28;

export type DishScene = { dispose(): void };

/**
 * Real-time miso-glazed nigiri. WebGPU when available, WebGL2 otherwise (`forceWebGL`).
 * Turns slowly, can be dragged with inertia, pauses off-screen, and calls `onLost` if the GPU device is lost.
 */
export async function createDishScene(
  canvas: HTMLCanvasElement,
  opts: { forceWebGL: boolean; onReady(): void; onLost(): void },
): Promise<DishScene> {
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true, forceWebGL: opts.forceWebGL });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  await renderer.init();
  renderer.onDeviceLost = () => opts.onLost();

  // No environment map: PMREM generation is the single most expensive start-up step. A soft fill light
  // above and the clearcoat's direct highlights carry the glaze instead.
  const scene = new THREE.Scene();

  // Low raking key light from the left, like late sun across the counter.
  const key = new THREE.DirectionalLight(0xffe2c0, 4.2);
  key.position.set(-3.6, 3.2, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(768, 768);
  key.shadow.camera.left = -3;
  key.shadow.camera.right = 3;
  key.shadow.camera.top = 3;
  key.shadow.camera.bottom = -3;
  key.shadow.radius = 6;
  key.shadow.bias = -0.0005;
  scene.add(key);
  // Cool rim from behind to lift the silhouette off the dark page.
  const rim = new THREE.DirectionalLight(0xc9d4ff, 1.6);
  rim.position.set(2.5, 2.5, -4);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xfff1e0, 0x1a1918, 0.6));
  const fill = new THREE.DirectionalLight(0xfff4e6, 0.9); // soft top fill for the glaze highlight
  fill.position.set(0.5, 5, 3);
  scene.add(fill);

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 2.25, 5.6);
  camera.lookAt(0, 0.05, 0);

  const dish = buildNigiri();
  scene.add(dish);

  // Size to the canvas box.
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

  // Drag to rotate, with inertia.
  let velocity = 0;
  let tilt = 0;
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
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    velocity = dx * 0.0065;
    dish.rotation.y += velocity;
    tilt = THREE.MathUtils.clamp(tilt + dy * 0.004, -MAX_TILT, MAX_TILT);
  };
  const onUp = () => {
    dragging = false;
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  // Only render while visible.
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(canvas);

  const clock = new THREE.Clock();
  let readySent = false;
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!visible || document.hidden) return;
    if (!dragging) {
      velocity *= DAMPING;
      dish.rotation.y += velocity + AUTO_SPIN * dt;
      tilt *= 0.96;
    }
    dish.rotation.x = tilt;
    renderer.render(scene, camera);
    if (!readySent) {
      readySent = true;
      opts.onReady();
    }
  });

  return {
    dispose() {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      dish.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      renderer.dispose();
    },
  };
}
