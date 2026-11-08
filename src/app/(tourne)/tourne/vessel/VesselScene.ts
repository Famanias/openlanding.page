import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { easeOutQuint, progress } from "../motion/math";
import { CLAY_COLOR, WHEEL_COLOR, WHEEL_RIM_COLOR, type Glaze } from "./glazes";
import { MAX_RADIUS_CM, WALL_CM, heightCm, sampleProfile, throwParams, type VesselParams } from "./profile";

const CM_TO_UNIT = 0.1;
const RADIAL_SEGMENTS = 96;
const PROFILE_SAMPLES = 44;
const BASE_SPIN_RAD_PER_S = 0.9;
const MAX_PIXEL_RATIO = 1.5;
/** Rebuild the lathe only when the effective shape moved by more than this. */
const REBUILD_EPSILON = 0.002;

export type SceneInputs = {
  /** Finished vessel the throw blends toward. */
  target: VesselParams;
  glaze: Glaze;
};

type SceneOptions = {
  canvas: HTMLCanvasElement;
  getThrow: () => number;
  getSpinBoost: () => number;
  onContextLost: () => void;
};

function paramsKey(params: VesselParams, hollow: number): number[] {
  return [params.height, params.foot, params.belly, params.neck, params.lip, hollow];
}

function movedEnough(a: number[] | null, b: number[]): boolean {
  return !a || b.some((value, i) => Math.abs(value - a[i]) > REBUILD_EPSILON);
}

function stripeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    for (let y = 0; y < canvas.height; y++) {
      const v = 128 + Math.sin(y * 0.9) * 40 + Math.sin(y * 0.23) * 30;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(0, y, 4, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Outer wall up to the lip, then the inner wall down to a floor that deepens as the clay opens. */
function lathePoints(params: VesselParams, hollow: number): THREE.Vector2[] {
  const heightUnits = heightCm(params) * CM_TO_UNIT;
  const radiusUnits = MAX_RADIUS_CM * CM_TO_UNIT;
  const wall = WALL_CM * CM_TO_UNIT;
  const outer = sampleProfile(params, PROFILE_SAMPLES).map((p) => new THREE.Vector2(p.r * radiusUnits, p.y * heightUnits));
  const topY = heightUnits;
  const floorY = topY * (1 - hollow) * 0.98 + 0.12 * hollow;
  const inner = [...outer]
    .reverse()
    .filter((p) => p.y > floorY)
    .map((p) => new THREE.Vector2(Math.max(0.01, p.x - wall), p.y));
  return [new THREE.Vector2(0, 0), ...outer, ...inner, new THREE.Vector2(0, floorY)];
}

export class VesselScene {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  private readonly turntable = new THREE.Group();
  private readonly material: THREE.MeshStandardMaterial;
  private readonly bump: THREE.CanvasTexture;
  private readonly envTarget: THREE.WebGLRenderTarget;
  private readonly disposables: { dispose(): void }[] = [];
  private mesh: THREE.Mesh | null = null;
  private lastKey: number[] | null = null;
  private inputs: SceneInputs | null = null;
  private smoothed = 0;
  private frame = 0;
  private lastTime = 0;
  private visible = true;
  private readonly clayColor = new THREE.Color(CLAY_COLOR);
  private readonly glazeColor = new THREE.Color();
  private readonly observer: IntersectionObserver;

  constructor(private readonly options: SceneOptions) {
    const { canvas } = options;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.envTarget = pmrem.fromScene(room, 0.04);
    this.scene.environment = this.envTarget.texture;
    this.scene.environmentIntensity = 0.55;
    room.dispose();
    pmrem.dispose();

    const key = new THREE.DirectionalLight(0xfff1de, 2.4);
    key.position.set(3, 5, 4);
    this.scene.add(key, new THREE.HemisphereLight(0xfff4e6, 0x3a2a20, 0.7));

    const wheelMaterial = new THREE.MeshStandardMaterial({ color: WHEEL_COLOR, roughness: 0.7, metalness: 0.15 });
    const wheelGeometry = new THREE.CylinderGeometry(1.7, 1.78, 0.14, 72);
    const rimMaterial = new THREE.MeshStandardMaterial({ color: WHEEL_RIM_COLOR, roughness: 0.4, metalness: 0.6 });
    const rimGeometry = new THREE.TorusGeometry(1.7, 0.035, 12, 96);
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.07;
    wheel.position.y = -0.07;
    this.turntable.add(wheel, rim);
    this.scene.add(this.turntable);
    this.disposables.push(wheelMaterial, wheelGeometry, rimMaterial, rimGeometry);

    this.bump = stripeTexture();
    this.bump.repeat.set(1, 2.4);
    this.material = new THREE.MeshStandardMaterial({
      color: CLAY_COLOR,
      roughness: 0.8,
      metalness: 0,
      side: THREE.DoubleSide,
      bumpMap: this.bump,
      bumpScale: 0.6,
    });

    this.camera.position.set(0, 2.5, 8.2);
    this.camera.lookAt(0, 1.25, 0);

    canvas.addEventListener("webglcontextlost", this.handleContextLost);
    document.addEventListener("visibilitychange", this.handleVisibility);
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.syncLoop();
    });
    this.observer.observe(canvas);
    this.resize();
  }

  setInputs(inputs: SceneInputs): void {
    this.inputs = inputs;
    this.glazeColor.set(inputs.glaze.color);
    this.material.roughness = inputs.glaze.roughness;
    this.lastKey = null;
    this.renderOnce();
  }

  resize(): void {
    const { canvas } = this.options;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.position.z = width / height < 0.8 ? 10.4 : 8.2;
    this.camera.updateProjectionMatrix();
    this.renderOnce();
  }

  start(): void {
    this.syncLoop();
  }

  dispose(): void {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.observer.disconnect();
    this.options.canvas.removeEventListener("webglcontextlost", this.handleContextLost);
    document.removeEventListener("visibilitychange", this.handleVisibility);
    this.mesh?.geometry.dispose();
    this.material.dispose();
    this.bump.dispose();
    this.envTarget.dispose();
    for (const item of this.disposables) item.dispose();
    this.renderer.dispose();
  }

  private readonly handleContextLost = (event: Event) => {
    event.preventDefault();
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.options.onContextLost();
  };

  private readonly handleVisibility = () => this.syncLoop();

  private syncLoop(): void {
    const shouldRun = this.visible && !document.hidden;
    if (shouldRun && !this.frame) {
      this.lastTime = performance.now();
      this.frame = requestAnimationFrame(this.tick);
    } else if (!shouldRun && this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
  }

  private readonly tick = (now: number) => {
    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;
    this.turntable.rotation.y += dt * (BASE_SPIN_RAD_PER_S + this.options.getSpinBoost() * 6);
    this.renderOnce();
    this.frame = requestAnimationFrame(this.tick);
  };

  private renderOnce(): void {
    if (!this.inputs) return;
    const goal = easeOutQuint(this.options.getThrow());
    this.smoothed += (goal - this.smoothed) * 0.14;
    if (Math.abs(goal - this.smoothed) < 0.001) this.smoothed = goal;

    const effective = throwParams(this.inputs.target, this.smoothed);
    const hollow = progress(this.smoothed, 0.12, 0.7);
    const key = paramsKey(effective, hollow);
    if (movedEnough(this.lastKey, key)) {
      this.lastKey = key;
      this.mesh?.geometry.dispose();
      const geometry = new THREE.LatheGeometry(lathePoints(effective, hollow), RADIAL_SEGMENTS);
      if (!this.mesh) {
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.turntable.add(this.mesh);
      } else {
        this.mesh.geometry = geometry;
      }
    }
    this.material.color.copy(this.clayColor).lerp(this.glazeColor, progress(this.smoothed, 0.85, 1));
    this.renderer.render(this.scene, this.camera);
  }
}
