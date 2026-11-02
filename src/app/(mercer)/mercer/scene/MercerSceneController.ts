import {
  AdditiveBlending, BufferGeometry, Float32BufferAttribute, Group, Line, LineBasicMaterial,
  Material, Mesh, PerspectiveCamera, Points, Scene, ShaderMaterial, SRGBColorSpace, WebGLRenderer,
} from "three";
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
}

export class MercerSceneController {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(36, 1, 0.1, 80);
  private readonly knot = new Group();
  private readonly geometries = new Set<BufferGeometry>();
  private readonly materials = new Set<Material>();
  private renderer: WebGLRenderer | null = null;
  private disposed = false;
  private running = false;
  private contextLost = false;
  private pointer = { x: 0, y: 0 };
  private orbit = { x: 0, y: 0 };
  private lastTime: number | null = null;
  private elapsed = 0;
  private fpsTime = 0;
  private frames = 0;

  constructor(private readonly options: SceneOptions = {}) {}

  init(container: HTMLElement): void {
    if (this.disposed || this.renderer) return;
    try {
      this.renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
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
    } catch (error) {
      this.dispose();
      throw error;
    }
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
    glow.uniforms.uOpacity.value = 0.07;
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

    this.knot.add(new Points(this.geometry(createParticleShellGeometry()), this.material(createParticleShellMaterial())));

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
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.position.z = fitCameraDistance(width, height);
    this.camera.updateProjectionMatrix();
    for (const material of this.materials) {
      if (material instanceof ShaderMaterial && material.uniforms.uPixelRatio) material.uniforms.uPixelRatio.value = ratio;
    }
    this.render();
  }

  setPointer(normX: number, normY: number): void {
    if (this.disposed) return;
    this.pointer.x = normalizePointer(normX);
    this.pointer.y = normalizePointer(normY);
  }

  start(): void {
    if (this.disposed || !this.renderer || this.running) return;
    this.running = true;
    this.lastTime = null;
    this.fpsTime = 0;
    this.frames = 0;
    if (!this.contextLost) this.renderer.setAnimationLoop(this.tick);
  }

  stop(): void {
    this.running = false;
    this.lastTime = null;
    this.renderer?.setAnimationLoop(null);
  }

  private tick = (time: number): void => {
    if (!this.running || this.disposed || this.contextLost) return;
    const delta = this.lastTime === null ? 0 : Math.min((time - this.lastTime) / 1000, 0.05);
    const rawDelta = this.lastTime === null ? 0 : (time - this.lastTime) / 1000;
    this.lastTime = time;
    this.elapsed += delta;
    const damping = 1 - Math.exp(-4 * delta);
    this.orbit.x += (this.pointer.x - this.orbit.x) * damping;
    this.orbit.y += (this.pointer.y - this.orbit.y) * damping;
    for (const material of this.materials) {
      if (material instanceof ShaderMaterial && material.uniforms.uTime) material.uniforms.uTime.value = this.elapsed;
    }
    this.render();
    this.fpsTime += rawDelta;
    this.frames++;
    if (this.fpsTime >= 1) {
      this.options.onFps?.(Math.round((this.frames - 1) / this.fpsTime));
      this.fpsTime = 0;
      this.frames = 1;
    }
  };

  private render(): void {
    if (!this.renderer || this.disposed || this.contextLost) return;
    this.knot.rotation.set(0.12 + this.orbit.y * 0.14, -0.18 + this.orbit.x * 0.2, -0.2 + this.elapsed * 0.025);
    this.renderer.render(this.scene, this.camera);
  }

  private handleContextLost = (event: Event): void => {
    event.preventDefault();
    this.contextLost = true;
    this.renderer?.setAnimationLoop(null);
    this.options.onContextChange?.("lost");
  };

  private handleContextRestored = (): void => {
    if (this.disposed) return;
    this.contextLost = false;
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
