import {
  AdditiveBlending, BufferGeometry, Float32BufferAttribute, Group, Line, LineBasicMaterial,
  Material, Mesh, PerspectiveCamera, Points, Scene, ShaderMaterial, SRGBColorSpace, Vector3, WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { buildGeodesicRibbonGeometry } from "../model/torusKnotMath";
import { createLatticeGeometry, createParticleShellGeometry, createParticleShellMaterial, createTranslucentMembraneMaterial, createWireframeLatticeMaterial } from "./materials";

export function normalizePointer(value: number): number {
  return Number.isFinite(value) ? Math.max(-1, Math.min(1, value)) : 0;
}

/** Fit a bounding sphere against the limiting field of view, with room for the shell. */
export function fitCameraDistance(width: number, height: number): number {
  const aspect = Math.max(1, Number.isFinite(width) ? width : 1) / Math.max(1, Number.isFinite(height) ? height : 1);
  const halfFov = 36 * Math.PI / 360;
  return 3.6 / Math.sin(Math.min(halfFov, Math.atan(Math.tan(halfFov) * aspect)));
}

interface SceneOptions {
  onFps?: (fps: number) => void;
  onContextChange?: (state: "lost" | "restored") => void;
  onInteractionChange?: (dragging: boolean) => void;
}

export class MercerSceneController {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(36, 1, 0.1, 80);
  private readonly knot = new Group();
  private readonly geometries = new Set<BufferGeometry>();
  private readonly materials = new Set<Material>();
  private renderer: WebGLRenderer | null = null;
  private controls: OrbitControls | null = null;
  private disposed = false;
  private running = false;
  private contextLost = false;
  private pointer = { x: 0, y: 0 };
  private orbit = { x: 0, y: 0 };
  private interacting = false;
  private spin = 0;
  private readonly hoverRight = new Vector3();
  private readonly hoverUp = new Vector3();
  private lastTime: number | null = null;
  private elapsed = 0;
  private fpsTime = 0;
  private frames = 0;
  private resolutionScale = 1;
  private slowSamples = 0;
  private viewport = { width: 1, height: 1 };

  constructor(private readonly options: SceneOptions = {}) {}

  init(container: HTMLElement): void {
    if (this.disposed || this.renderer) return;
    try {
      this.renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      this.renderer.setClearColor(0x0a0d10, 0);
      this.renderer.outputColorSpace = SRGBColorSpace;
      const canvas = this.renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      canvas.dataset.mercerRenderer = "true";
      canvas.addEventListener("webglcontextlost", this.handleContextLost);
      canvas.addEventListener("webglcontextrestored", this.handleContextRestored);
      container.appendChild(canvas);
      this.assemble();
      this.scene.add(this.knot);
      const bounds = container.getBoundingClientRect();
      this.resize(bounds.width, bounds.height);
      this.createControls();
    } catch (error) {
      this.dispose();
      throw error;
    }
  }

  private createControls(): void {
    if (!this.renderer) return;
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls = controls;
    controls.enableDamping = this.running;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.8;
    controls.panSpeed = 0.6;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxPolarAngle = Math.PI * 0.8;
    controls.maxTargetRadius = 0.45;
    controls.cursorStyle = "grab";
    // Horizontal touch gestures turn the object; vertical gestures retain native page scrolling.
    this.renderer.domElement.style.touchAction = "pan-y pinch-zoom";
    controls.addEventListener("start", this.handleInteractionStart);
    controls.addEventListener("end", this.handleInteractionEnd);
    controls.addEventListener("change", this.handleViewChange);
    controls.update();
    controls.saveState();
  }

  private geometry<T extends BufferGeometry>(geometry: T): T {
    this.geometries.add(geometry);
    return geometry;
  }

  private material<T extends Material>(material: T): T {
    this.materials.add(material);
    return material;
  }

  private assemble(): void {
    const membrane = this.geometry(buildGeodesicRibbonGeometry(200, 24, 0.48, 0.15));
    this.knot.add(new Mesh(membrane, this.material(createTranslucentMembraneMaterial())));

    const source = buildGeodesicRibbonGeometry(84, 8, 0.485, 0.155);
    const lattice = this.geometry(createLatticeGeometry(source));
    source.dispose();
    const glow = this.material(createWireframeLatticeMaterial({ wireframeLineWidth: 3.6 }));
    glow.uniforms.uOpacity.value = 0.09;
    this.knot.add(new Mesh(lattice, glow));
    this.knot.add(new Mesh(lattice, this.material(createWireframeLatticeMaterial())));

    // Longitudinal filaments pick out the continuous ribbon silhouette.
    const positions = membrane.getAttribute("position");
    const colors = membrane.getAttribute("color");
    const railMaterial = this.material(new LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.8, blending: AdditiveBlending, depthWrite: false, toneMapped: false,
    }));
    for (const column of [0, 6, 12, 18]) {
      const railPositions: number[] = [];
      const railColors: number[] = [];
      for (let ring = 0; ring <= 200; ring++) {
        const vertex = ring * 25 + column;
        railPositions.push(positions.getX(vertex), positions.getY(vertex), positions.getZ(vertex));
        railColors.push(colors.getX(vertex), colors.getY(vertex), colors.getZ(vertex));
      }
      const rail = this.geometry(new BufferGeometry());
      rail.setAttribute("position", new Float32BufferAttribute(railPositions, 3));
      rail.setAttribute("color", new Float32BufferAttribute(railColors, 3));
      this.knot.add(new Line(rail, railMaterial));
    }

    const shellMaterial = this.material(createParticleShellMaterial());
    shellMaterial.uniforms.uOpacity.value = 0.75;
    this.knot.add(new Points(this.geometry(createParticleShellGeometry(1080)), shellMaterial));

    // Reserve 120 of the 1,200 total points for luminous junctions on the ribbon.
    const junctions = this.geometry(new BufferGeometry());
    const junctionPositions: number[] = [];
    const junctionColors: number[] = [];
    const junctionPhases: number[] = [];
    const junctionSizes: number[] = [];
    for (let index = 0; index < 120; index++) {
      const vertex = Math.floor(index / 120 * 200) * 25 + (index * 7 % 24);
      junctionPositions.push(positions.getX(vertex), positions.getY(vertex), positions.getZ(vertex));
      junctionColors.push(colors.getX(vertex), colors.getY(vertex), colors.getZ(vertex));
      junctionPhases.push(index * 2.399963);
      junctionSizes.push(2.4 + index % 3 * 0.35);
    }
    junctions.setAttribute("position", new Float32BufferAttribute(junctionPositions, 3));
    junctions.setAttribute("color", new Float32BufferAttribute(junctionColors, 3));
    junctions.setAttribute("aPhase", new Float32BufferAttribute(junctionPhases, 1));
    junctions.setAttribute("aSize", new Float32BufferAttribute(junctionSizes, 1));
    const junctionMaterial = this.material(createParticleShellMaterial());
    junctionMaterial.uniforms.uOpacity.value = 1;
    this.knot.add(new Points(junctions, junctionMaterial));

    const orbitMaterial = this.material(new LineBasicMaterial({ color: "#00E5FF", transparent: true, opacity: 0.14, blending: AdditiveBlending, depthWrite: false }));
    for (let orbit = 0; orbit < 2; orbit++) {
      const vertices: number[] = [];
      for (let index = 0; index <= 160; index++) {
        const t = index / 160 * Math.PI * 2;
        vertices.push(3.3 * Math.cos(t), 1.15 * Math.sin(t) + Math.cos(t) * 0.75, Math.sin(t) * (0.8 + orbit * 0.35));
      }
      const geometry = this.geometry(new BufferGeometry());
      geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      const line = new Line(geometry, orbitMaterial);
      line.rotation.z = orbit * 0.24;
      this.knot.add(line);
    }
  }

  resize(width: number, height: number): void {
    if (!this.renderer || this.disposed || !Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return;
    this.viewport = { width, height };
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5) * this.resolutionScale;
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    // Preserve the chosen view and pan target when the viewport or render resolution changes.
    if (this.controls) this.camera.position.sub(this.controls.target);
    const distance = fitCameraDistance(width, height);
    if (this.camera.position.lengthSq() === 0) this.camera.position.set(0, 0, distance);
    else this.camera.position.setLength(distance);
    if (this.controls) this.camera.position.add(this.controls.target);
    this.camera.updateProjectionMatrix();
    for (const material of this.materials) {
      if (material instanceof ShaderMaterial && material.uniforms.uPixelRatio) material.uniforms.uPixelRatio.value = ratio;
    }
    this.controls?.update();
    this.render();
  }

  setPointer(normX: number, normY: number): void {
    if (this.disposed || this.interacting) return;
    this.pointer.x = normalizePointer(normX);
    this.pointer.y = normalizePointer(normY);
  }

  rotateView(horizontal: number, vertical: number): void {
    if (this.disposed || this.contextLost || !this.controls) return;
    const x = normalizePointer(horizontal);
    const y = normalizePointer(vertical);
    if (x) this.controls.rotateLeft(x * 0.16);
    if (y) this.controls.rotateUp(y * 0.16);
  }

  panView(horizontal: number, vertical: number): void {
    if (this.disposed || this.contextLost || !this.controls) return;
    this.controls.pan(normalizePointer(horizontal) * 20, normalizePointer(vertical) * 20);
  }

  resetView(): void {
    if (this.disposed || this.contextLost || !this.controls) return;
    this.pointer = { x: 0, y: 0 };
    this.orbit = { x: 0, y: 0 };
    this.spin = 0;
    this.handleInteractionEnd();
    // Drain any remaining inertia before restoring the canonical, size-correct front view.
    this.controls.enableDamping = false;
    this.controls.update();
    this.controls.reset();
    this.controls.target.set(0, 0, 0);
    this.camera.position.set(0, 0, fitCameraDistance(this.viewport.width, this.viewport.height));
    this.controls.update();
    this.controls.saveState();
    this.controls.enableDamping = this.running;
    this.render();
  }

  start(): void {
    if (this.disposed || !this.renderer || this.running) return;
    this.running = true;
    if (this.controls) this.controls.enableDamping = true;
    this.lastTime = null;
    this.fpsTime = 0;
    this.frames = 0;
    this.slowSamples = 0;
    if (!this.contextLost) this.renderer.setAnimationLoop(this.tick);
  }

  stop(): void {
    this.running = false;
    this.lastTime = null;
    this.renderer?.setAnimationLoop(null);
    if (this.controls && !this.contextLost) {
      this.controls.enableDamping = false;
      this.controls.update();
    }
  }

  private tick = (time: number): void => {
    if (!this.running || this.disposed || this.contextLost) return;
    const delta = this.lastTime === null ? 0 : Math.min((time - this.lastTime) / 1000, 0.05);
    const rawDelta = this.lastTime === null ? 0 : (time - this.lastTime) / 1000;
    this.lastTime = time;
    this.elapsed += delta;
    if (!this.interacting) this.spin += delta * 0.025;
    const damping = 1 - Math.exp(-4 * delta);
    this.orbit.x += (this.pointer.x - this.orbit.x) * damping;
    this.orbit.y += (this.pointer.y - this.orbit.y) * damping;
    this.controls?.update(delta);
    for (const material of this.materials) {
      if (material instanceof ShaderMaterial && material.uniforms.uTime) material.uniforms.uTime.value = this.elapsed;
    }
    this.render();
    this.fpsTime += rawDelta;
    this.frames++;
    if (this.fpsTime >= 1) {
      const fps = Math.round((this.frames - 1) / this.fpsTime);
      this.options.onFps?.(fps);
      // Sustained GPU pressure lowers only raster resolution, preserving topology and camera fit.
      // Two slow seconds prevent a shader compilation or a single long task from triggering it.
      this.slowSamples = fps < 55 ? this.slowSamples + 1 : 0;
      if (this.slowSamples >= 2 && this.resolutionScale > 0.75) {
        this.resolutionScale = Math.max(0.75, this.resolutionScale * 0.85);
        this.slowSamples = 0;
        this.resize(this.viewport.width, this.viewport.height);
      }
      this.fpsTime = 0;
      this.frames = 1;
    }
  };

  private render(): void {
    if (!this.renderer || this.disposed || this.contextLost) return;
    this.knot.rotation.set(0.12 + this.orbit.y * 0.14, -0.18 + this.orbit.x * 0.2, -0.2 + this.spin);
    this.hoverRight.set(1, 0, 0).applyQuaternion(this.camera.quaternion);
    this.hoverUp.set(0, 1, 0).applyQuaternion(this.camera.quaternion);
    this.knot.position.copy(this.hoverRight).multiplyScalar(this.orbit.x * 0.12).addScaledVector(this.hoverUp, -this.orbit.y * 0.09);
    this.renderer.render(this.scene, this.camera);
  }

  private handleInteractionStart = (): void => {
    this.interacting = true;
    this.pointer = { x: 0, y: 0 };
    this.options.onInteractionChange?.(true);
  };

  private handleInteractionEnd = (): void => {
    if (!this.interacting) return;
    this.interacting = false;
    this.options.onInteractionChange?.(false);
  };

  private handleViewChange = (): void => {
    // Pausing the animation still allows deliberate dragging, keyboard input and reset.
    if (!this.running) this.render();
  };

  private handleContextLost = (event: Event): void => {
    event.preventDefault();
    this.contextLost = true;
    this.handleInteractionEnd();
    if (this.controls) this.controls.enabled = false;
    this.renderer?.setAnimationLoop(null);
    this.options.onContextChange?.("lost");
  };

  private handleContextRestored = (): void => {
    if (this.disposed) return;
    this.contextLost = false;
    if (this.controls) this.controls.enabled = true;
    this.lastTime = null;
    this.render();
    if (this.running) this.renderer?.setAnimationLoop(this.tick);
    this.options.onContextChange?.("restored");
  };

  getRenderer(): WebGLRenderer | null {
    return this.renderer;
  }

  dispose(): void {
    if (this.disposed) return;
    this.stop();
    this.disposed = true;
    this.handleInteractionEnd();
    if (this.controls) {
      this.controls.removeEventListener("start", this.handleInteractionStart);
      this.controls.removeEventListener("end", this.handleInteractionEnd);
      this.controls.removeEventListener("change", this.handleViewChange);
      this.controls.dispose();
      this.controls = null;
    }
    const renderer = this.renderer;
    this.renderer = null;
    if (renderer) {
      renderer.domElement.removeEventListener("webglcontextlost", this.handleContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", this.handleContextRestored);
    }
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
    this.geometries.clear();
    this.materials.clear();
    this.knot.clear();
    this.scene.clear();
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    }
  }
}
