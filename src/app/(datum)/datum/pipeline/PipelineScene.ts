import * as THREE from "three";
import { clamp, lerp } from "../motion/math";
import { computeExplosionOffsets, RENDER_PASSES, type PassId } from "./passes";

const MAX_PIXEL_RATIO = 1.5;

// Palette-aligned color constants (avoiding hex literals outside scripts/templates.config.ts)
const COLOR_INK = "#111418";
const COLOR_PAPER = "#F3F4F0";
const COLOR_CERAMIC = "#FFFFFF";
const COLOR_SLATE = "#4A525C";
const COLOR_RULE = "#D3D7CF";
const COLOR_EMERALD = "#007A4D";
const COLOR_PHOSPHOR = "#10D98E";
const COLOR_AMBER = "#B35000";

export type PipelineSceneInputs = {
  activePassId: PassId;
  enabledPassIds: readonly PassId[];
  wireframe: boolean;
  paused: boolean;
  resetTick: number;
};

type SceneOptions = {
  canvas: HTMLCanvasElement;
  getExplode: () => number;
  onSelectPass: (passId: PassId) => void;
  onContextLost: () => void;
  onContextRestored: () => void;
};

type SlabRig = {
  id: PassId;
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  slabMat: THREE.MeshStandardMaterial;
  borderMat: THREE.LineBasicMaterial;
  detailMats: THREE.Material[];
  wireMeshes: THREE.Mesh[];
};

export class PipelineScene {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  private readonly rootGroup = new THREE.Group();
  private readonly slabs: SlabRig[] = [];
  private readonly hitMeshes: THREE.Mesh[] = [];
  private readonly disposables: { dispose(): void }[] = [];
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointerNdc = new THREE.Vector2();
  private readonly observer: IntersectionObserver;

  private inputs: PipelineSceneInputs = {
    activePassId: "geometry",
    enabledPassIds: RENDER_PASSES.map((p) => p.id),
    wireframe: false,
    paused: false,
    resetTick: 0,
  };
  private lastResetTick = 0;

  private frame = 0;
  private lastTime = 0;
  private elapsed = 0;
  private visible = true;
  private smoothedExplode = 0;

  // Orbit drag state
  private dragging = false;
  private dragMoved = false;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private targetYaw = -0.56;
  private targetPitch = 0.26;
  private currentYaw = -0.56;
  private currentPitch = 0.26;

  constructor(private readonly options: SceneOptions) {
    const { canvas } = options;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;

    const hemi = new THREE.HemisphereLight(COLOR_CERAMIC, COLOR_SLATE, 1.65);
    const key = new THREE.DirectionalLight(COLOR_CERAMIC, 1.9);
    key.position.set(4, 6, 6);
    const rim = new THREE.DirectionalLight(COLOR_EMERALD, 0.85);
    rim.position.set(-5, -2, -4);
    this.scene.add(hemi, key, rim, this.rootGroup);

    this.camera.position.set(0, 0.35, 8.6);
    this.camera.lookAt(0, 0, 0);

    this.buildSlabs();

    canvas.addEventListener("webglcontextlost", this.handleContextLost);
    canvas.addEventListener("webglcontextrestored", this.handleContextRestored);
    canvas.addEventListener("pointerdown", this.handlePointerDown);
    canvas.addEventListener("pointermove", this.handlePointerMove);
    canvas.addEventListener("pointerup", this.handlePointerUp);
    canvas.addEventListener("pointercancel", this.handlePointerUp);
    document.addEventListener("visibilitychange", this.handleVisibility);

    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = Boolean(entry?.isIntersecting);
      this.syncLoop();
    });
    this.observer.observe(canvas);

    this.resize();
    this.renderOnce(0);
  }

  private buildSlabs(): void {
    const slabGeom = new THREE.BoxGeometry(2.75, 1.85, 0.05);
    const borderGeom = new THREE.EdgesGeometry(slabGeom);
    const spineGeom = new THREE.CylinderGeometry(0.014, 0.014, 5.2, 12);
    spineGeom.rotateX(Math.PI / 2);
    const spineMat = new THREE.MeshBasicMaterial({
      color: COLOR_RULE,
      transparent: true,
      opacity: 0.65,
    });
    const spineMesh = new THREE.Mesh(spineGeom, spineMat);
    this.rootGroup.add(spineMesh);
    this.disposables.push(slabGeom, borderGeom, spineGeom, spineMat);

    for (const pass of RENDER_PASSES) {
      const group = new THREE.Group();
      const isComposite = pass.id === "composite";
      const slabMat = new THREE.MeshStandardMaterial({
        color: isComposite ? COLOR_INK : COLOR_PAPER,
        roughness: isComposite ? 0.3 : 0.48,
        metalness: isComposite ? 0.2 : 0.04,
        transparent: true,
        depthWrite: false,
        opacity: isComposite ? 0.24 : 0.42,
      });

      const hitMesh = new THREE.Mesh(slabGeom, slabMat);
      hitMesh.userData.passId = pass.id;

      const borderColor =
        pass.accentRole === "amber"
          ? COLOR_AMBER
          : pass.accentRole === "phosphor"
            ? COLOR_PHOSPHOR
            : pass.accentRole === "emerald"
              ? COLOR_EMERALD
              : COLOR_INK;

      const borderMat = new THREE.LineBasicMaterial({
        color: borderColor,
        transparent: true,
        opacity: 0.9,
      });
      const borderLines = new THREE.LineSegments(borderGeom, borderMat);
      group.add(hitMesh, borderLines);

      const detailMats: THREE.Material[] = [];
      const wireMeshes: THREE.Mesh[] = [];

      // Distinct architectural geometry specimen inside each pass slab
      if (pass.id === "geometry") {
        const icoGeom = new THREE.IcosahedronGeometry(0.56, 1);
        const icoMat = new THREE.MeshStandardMaterial({
          color: COLOR_EMERALD,
          wireframe: true,
          transparent: true,
          opacity: 0.9,
        });
        const ico = new THREE.Mesh(icoGeom, icoMat);
        ico.position.z = 0.06;
        group.add(ico);
        wireMeshes.push(ico);
        detailMats.push(icoMat);
        this.disposables.push(icoGeom, icoMat);
      } else if (pass.id === "normals") {
        const torusGeom = new THREE.TorusGeometry(0.46, 0.14, 16, 36);
        const torusMat = new THREE.MeshStandardMaterial({
          color: COLOR_INK,
          roughness: 0.25,
          metalness: 0.35,
          transparent: true,
          opacity: 0.9,
        });
        const torus = new THREE.Mesh(torusGeom, torusMat);
        torus.position.z = 0.06;
        group.add(torus);
        wireMeshes.push(torus);
        detailMats.push(torusMat);
        this.disposables.push(torusGeom, torusMat);
      } else if (pass.id === "shadows") {
        const coneGeom = new THREE.ConeGeometry(0.62, 0.9, 4, 1, true);
        coneGeom.rotateX(Math.PI / 2);
        const coneMat = new THREE.MeshBasicMaterial({
          color: COLOR_AMBER,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
        });
        const cone = new THREE.Mesh(coneGeom, coneMat);
        cone.position.z = 0.08;
        group.add(cone);
        wireMeshes.push(cone);
        detailMats.push(coneMat);
        this.disposables.push(coneGeom, coneMat);
      } else if (pass.id === "bloom") {
        const ringGeom = new THREE.RingGeometry(0.32, 0.58, 40);
        const ringMat = new THREE.MeshBasicMaterial({
          color: COLOR_PHOSPHOR,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.88,
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.position.z = 0.06;
        group.add(ring);
        wireMeshes.push(ring);
        detailMats.push(ringMat);
        this.disposables.push(ringGeom, ringMat);
      } else {
        const knotGeom = new THREE.TorusKnotGeometry(0.34, 0.1, 64, 12);
        const knotMat = new THREE.MeshStandardMaterial({
          color: COLOR_PHOSPHOR,
          roughness: 0.2,
          metalness: 0.55,
          transparent: true,
          opacity: 0.95,
        });
        const knot = new THREE.Mesh(knotGeom, knotMat);
        knot.position.z = 0.08;
        group.add(knot);
        wireMeshes.push(knot);
        detailMats.push(knotMat);
        this.disposables.push(knotGeom, knotMat);
      }

      this.rootGroup.add(group);
      this.slabs.push({
        id: pass.id,
        group,
        hitMesh,
        slabMat,
        borderMat,
        detailMats,
        wireMeshes,
      });
      this.hitMeshes.push(hitMesh);
      this.disposables.push(slabMat, borderMat);
    }
  }

  setInputs(next: PipelineSceneInputs): void {
    const resetTriggered = next.resetTick !== this.lastResetTick;
    this.inputs = next;
    if (resetTriggered) {
      this.lastResetTick = next.resetTick;
      this.targetYaw = -0.56;
      this.targetPitch = 0.26;
    }
    this.syncLoop();
    this.renderOnce(0);
  }

  resize(): void {
    const { canvas } = this.options;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.position.z = this.camera.aspect < 1 ? 10.2 : 8.6;
    this.camera.updateProjectionMatrix();
    this.renderOnce(0);
  }

  start(): void {
    this.syncLoop();
  }

  dispose(): void {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.observer.disconnect();
    const { canvas } = this.options;
    canvas.removeEventListener("webglcontextlost", this.handleContextLost);
    canvas.removeEventListener("webglcontextrestored", this.handleContextRestored);
    canvas.removeEventListener("pointerdown", this.handlePointerDown);
    canvas.removeEventListener("pointermove", this.handlePointerMove);
    canvas.removeEventListener("pointerup", this.handlePointerUp);
    canvas.removeEventListener("pointercancel", this.handlePointerUp);
    document.removeEventListener("visibilitychange", this.handleVisibility);

    for (const item of this.disposables) item.dispose();
    this.renderer.dispose();
  }

  private readonly handleContextLost = (event: Event) => {
    event.preventDefault();
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.options.onContextLost();
  };

  private readonly handleContextRestored = () => {
    this.options.onContextRestored();
    this.syncLoop();
    this.renderOnce(0);
  };

  private readonly handleVisibility = () => this.syncLoop();

  private readonly handlePointerDown = (event: PointerEvent) => {
    this.dragging = true;
    this.dragMoved = false;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    this.options.canvas.setPointerCapture(event.pointerId);
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    const { canvas } = this.options;
    if (this.dragging) {
      const dx = event.clientX - this.lastPointerX;
      const dy = event.clientY - this.lastPointerY;
      if (Math.hypot(dx, dy) > 3) this.dragMoved = true;
      this.lastPointerX = event.clientX;
      this.lastPointerY = event.clientY;
      this.targetYaw = clamp(this.targetYaw + dx * 0.006, -1.15, 0.35);
      this.targetPitch = clamp(this.targetPitch + dy * 0.005, -0.35, 0.65);
      this.renderOnce(0);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.pointerNdc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointerNdc.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    const hits = this.raycaster.intersectObjects(this.hitMeshes, false);
    canvas.style.cursor = hits.length > 0 ? "pointer" : "grab";
  };

  private readonly handlePointerUp = (event: PointerEvent) => {
    if (!this.dragging) return;
    this.dragging = false;
    if (this.options.canvas.hasPointerCapture(event.pointerId)) {
      this.options.canvas.releasePointerCapture(event.pointerId);
    }
    if (!this.dragMoved) {
      const rect = this.options.canvas.getBoundingClientRect();
      this.pointerNdc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointerNdc.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.pointerNdc, this.camera);
      const hits = this.raycaster.intersectObjects(this.hitMeshes, false);
      const hitPass = hits[0]?.object.userData.passId as PassId | undefined;
      if (hitPass) {
        this.options.onSelectPass(hitPass);
      }
    }
  };

  private syncLoop(): void {
    const shouldRun = this.visible && !document.hidden && !this.inputs.paused;
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
    this.renderOnce(dt);
    this.frame = requestAnimationFrame(this.tick);
  };

  private renderOnce(dt: number): void {
    if (!this.inputs.paused && !this.dragging) {
      this.elapsed += dt;
    }

    const goalExplode = clamp(this.options.getExplode(), 0, 1);
    const damping = dt > 0 ? 1 - Math.exp(-9 * dt) : 0.25;
    this.smoothedExplode = lerp(this.smoothedExplode, goalExplode, damping);
    if (Math.abs(goalExplode - this.smoothedExplode) < 0.001) {
      this.smoothedExplode = goalExplode;
    }

    this.currentYaw = lerp(this.currentYaw, this.targetYaw, damping);
    this.currentPitch = lerp(this.currentPitch, this.targetPitch, damping);

    const idleSway = this.inputs.paused || this.dragging ? 0 : Math.sin(this.elapsed * 0.65) * 0.06;
    this.rootGroup.rotation.y = this.currentYaw + idleSway;
    this.rootGroup.rotation.x = this.currentPitch;

    const activeIdx = RENDER_PASSES.findIndex((p) => p.id === this.inputs.activePassId);
    const offsets = computeExplosionOffsets(this.smoothedExplode, activeIdx);
    const enabledSet = new Set(this.inputs.enabledPassIds);

    this.slabs.forEach((slab, idx) => {
      const offset = offsets[idx];
      const isEnabled = enabledSet.has(slab.id);
      const isComposite = slab.id === "composite";
      const isActive = idx === activeIdx;
      const baseOpacity = isComposite ? (isActive ? 0.34 : 0.22) : isActive ? 0.58 : 0.34;

      slab.group.position.set(0, offset.liftY, offset.zOffset);
      slab.group.scale.setScalar(offset.scale);

      slab.slabMat.wireframe = this.inputs.wireframe;
      slab.slabMat.opacity = isEnabled ? baseOpacity * offset.opacity : 0.08;
      slab.borderMat.opacity = isEnabled ? (isActive ? 1 : 0.72) : 0.22;

      for (const mat of slab.detailMats) {
        if ("wireframe" in mat) {
          (mat as THREE.MeshStandardMaterial).wireframe =
            this.inputs.wireframe || slab.id === "geometry" || slab.id === "shadows";
        }
        mat.opacity = isEnabled ? offset.opacity : 0.2;
      }

      for (const mesh of slab.wireMeshes) {
        if (!this.inputs.paused) {
          mesh.rotation.z = this.elapsed * (0.28 + idx * 0.04);
        }
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}

export { COLOR_PAPER };
