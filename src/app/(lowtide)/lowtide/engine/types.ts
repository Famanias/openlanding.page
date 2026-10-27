import type * as THREE from "three";
import type { ChapterId } from "../night/clock";
import type { NightPlan } from "../night/your-night";

/** Everything the world needs for one frame. Pure inputs; the world holds no scroll or pointer state. */
export type FrameInput = {
  /** Night progress 0 (23:04) → 1 (07:00). */
  p: number;
  /** Water level 0 (low) → 1 (high), from tideLevel(p). */
  tide: number;
  /** 0 glassy → 1 whipped up by fast scrolling. */
  roughness: number;
  /** 0 → 1 after the visitor holds still. */
  calm: number;
  /** The lantern in normalised device coordinates (−1…1), radius in the same units. */
  lantern: { x: number; y: number; radius: number; active: boolean };
  /** Seconds since the world started. */
  time: number;
  /** Seconds since the previous frame. */
  dt: number;
};

export type Weights = Record<ChapterId, number>;

export interface World {
  setFrame(f: FrameInput): void;
  setFinale(plan: NightPlan | null): void;
  panFinale(dx: number): void;
  snapshotFinale(): Promise<Blob>;
  resize(w: number, h: number, dpr: number): void;
  onContextLost(cb: () => void): void;
  dispose(): void;
}

export type FontUrls = { display: string; mono: string; monoItalic: string };

export type WorldCtx = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  textures: { waterNormal: THREE.Texture; moon: THREE.Texture };
  fonts: FontUrls;
  /** Shared uniforms every shader reads (lantern, roughness, calm, tide, time). */
  shared: SharedUniforms;
  size: { width: number; height: number };
};

export type SharedUniforms = {
  uTime: { value: number };
  uTide: { value: number };
  uRoughness: { value: number };
  uCalm: { value: number };
  uProgress: { value: number };
  /** xy = lantern in NDC, z = radius, w = 1 when a pointer drives it. */
  uLantern: { value: THREE.Vector4 };
  /** Drawing-buffer size in device pixels (matches gl_FragCoord). */
  uResolution: { value: THREE.Vector2 };
  /** 0 night → 1 sunrise. */
  uDawn: { value: number };
  /** Unit vector toward the moon (the "sun" for every shader). */
  uMoonDir: { value: THREE.Vector3 };
  uMoonColor: { value: THREE.Color };
  uZenith: { value: THREE.Color };
  uHorizon: { value: THREE.Color };
  /** Water surface height and the highest recent water (sand below it is still wet). */
  uWaterY: { value: number };
  uWetLine: { value: number };
  uCameraPos: { value: THREE.Vector3 };
};

/** A piece of the world: owns its objects, updates from the frame and the chapter weights. */
export interface Part {
  update(f: FrameInput, w: Weights): void;
  resize?(width: number, height: number): void;
  dispose(): void;
}
