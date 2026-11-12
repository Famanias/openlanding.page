import * as THREE from 'three';

export type EffectId =
  | 'chroma-fluid'
  | 'fluted-light'
  | 'silk-atmosphere'
  | 'glass-lens'
  | 'aurora-field'
  | 'chromatic-ribbons'
  | 'bokeh-reactor'
  | 'refraction-field';

export type QualityPreset = 'auto' | 'high' | 'balanced' | 'low';

export interface Palette {
  id: string;
  name: string;
  swatches: [string, string, string, string];
  colors: [THREE.Color, THREE.Color, THREE.Color, THREE.Color];
  bgHex: string;
}

export interface EffectControls {
  interaction: number; // 0..100 (default 70)
  speed: number; // 0..100 (default 45)
  paletteIndex: number;
  quality: QualityPreset;
  paused: boolean;
  reducedMotion: boolean;
  introProgress: number; // 0..1 during initial ignition
}

export interface SplatImpulse {
  x: number; // 0..1 UV
  y: number; // 0..1 UV (0 bottom, 1 top)
  vx: number; // normalized velocity X
  vy: number; // normalized velocity Y
  strength: number; // 0..1 decays over time
  radius: number;
  colorIndex: number;
  isClick: boolean;
}

export interface InputState {
  x: number; // 0..1 normalized UV X
  y: number; // 0..1 normalized UV Y (bottom = 0, top = 1)
  rawX: number; // CSS px
  rawY: number; // CSS px
  vx: number; // instantaneous clamped UV velocity X
  vy: number; // instantaneous clamped UV velocity Y
  smoothVx: number; // damped UV velocity X
  smoothVy: number; // damped UV velocity Y
  speed: number; // magnitude of smooth velocity
  isPointerInside: boolean;
  isDown: boolean;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  dragOffsetX: number; // spring-damped drag displacement X (-1..1)
  dragOffsetY: number; // spring-damped drag displacement Y (-1..1)
  clickPulse: number; // 0..1 impulse triggered on click/tap, decays smoothly
  clickX: number;
  clickY: number;
  clickCount: number; // increments on every click/tap (e.g. for focal toggle)
  wheelDelta: number; // damped vertical wheel/touch offset
  splats: SplatImpulse[];
  hasInteracted: boolean;
}

export interface EffectContext {
  renderer: THREE.WebGLRenderer;
  width: number;
  height: number;
  pixelRatio: number;
  isSoftwareGl: boolean;
}

export interface BackgroundEffect {
  readonly id: EffectId;
  readonly indexNumber: string;
  readonly label: string;
  readonly headlineAccent: string;
  readonly shortDescription: string;
  readonly helpText: string;
  readonly category: 'fluid' | 'glass' | 'fabric' | 'lens' | 'field' | 'ribbon' | 'bokeh' | 'facet';
  readonly palettes: Palette[];
  init(context: EffectContext): void;
  resize(width: number, height: number, pixelRatio: number): void;
  update(dt: number, elapsed: number, input: InputState, controls: EffectControls): void;
  render(renderer: THREE.WebGLRenderer, output?: THREE.WebGLRenderTarget | null): void;
  reset(): void;
  dispose(): void;
}

export interface TelemetryStats {
  fps: number;
  frameTimeMs: number;
  activeEffectId: EffectId;
  activeEffectLabel: string;
  inTransition: boolean;
  transitionFamily: string;
  width: number;
  height: number;
  dpr: number;
  qualityTier: QualityPreset;
  effectiveQuality: 'high' | 'balanced' | 'low';
  isSoftwareGl: boolean;
  drawCalls: number;
  triangles: number;
  textures: number;
  geometries: number;
  pointerUv: [number, number];
  pointerSpeed: number;
}
