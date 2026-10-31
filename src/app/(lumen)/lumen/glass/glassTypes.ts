export type GlassPresetId =
  | 'opal-ribbon'
  | 'frosted-fold'
  | 'liquid-lens'
  | 'glass-strata'
  | 'refractive-halo'
  | 'caustic-window';

export type GlassTreatment = 'clear' | 'frosted' | 'opal';

export type GlassQuality = 'auto' | 'high' | 'medium' | 'low';

export type ExportAspectRatio = '16:9' | '21:9' | '4:5' | '1:1' | '9:16';

export interface ExportResolution {
  id: string;
  label: string;
  baseWidth: number;
  baseHeight: number;
}

export interface GlassMaterialParams {
  glassType: GlassTreatment;
  ior: number; // 1.1 to 2.4
  thickness: number; // 0.1 to 3.0
  roughness: number; // 0.0 to 1.0
  transmission: number; // 0.2 to 1.0
  refractionStrength: number; // 0.0 to 1.5
  fresnelIntensity: number; // 0.1 to 2.0
  edgeHighlight: number; // 0.0 to 2.0
  dispersion: number; // 0.0 to 1.0
  iridescence: number; // 0.0 to 1.0
  frosting: number; // 0.0 to 1.0
  normalDistortion: number; // 0.0 to 1.0
  microtexture: number; // 0.0 to 1.0
  causticIntensity: number; // 0.0 to 1.5
  reflectionStrength: number; // 0.1 to 2.0
}

export interface GlassSceneParams {
  lightingIntensity: number; // 0.4 to 2.0
  motionSpeed: number; // 0.0 to 2.5
  distortionStrength: number; // 0.0 to 1.5
  shapeDensity: number; // 1 to 6
  scale: number; // 0.5 to 1.8
  positionX: number; // -1.5 to 1.5
  positionY: number; // -1.0 to 1.0
  seed: number; // integer seed
  loopDurationSec: number; // 8 to 16
}

export interface GlassPresetConfig {
  id: GlassPresetId;
  name: string;
  subtitle: string;
  description: string;
  recommendedSection: string;
  material: GlassMaterialParams;
  scene: GlassSceneParams;
}

export interface GlassBackgroundProps {
  preset?: GlassPresetId;
  configOverrides?: Partial<{
    material: Partial<GlassMaterialParams>;
    scene: Partial<GlassSceneParams>;
  }>;
  speed?: number;
  intensity?: number;
  seed?: number;
  interactive?: boolean;
  quality?: GlassQuality;
  renderMode?: 'live' | 'static';
  transparentExport?: boolean;
  className?: string;
}

export const EXPORT_ASPECT_RATIOS: {
  id: ExportAspectRatio;
  label: string;
  ratio: number;
}[] = [
  { id: '16:9', label: '16:9 Wide', ratio: 16 / 9 },
  { id: '21:9', label: '21:9 Ultrawide', ratio: 21 / 9 },
  { id: '4:5', label: '4:5 Editorial', ratio: 4 / 5 },
  { id: '1:1', label: '1:1 Square', ratio: 1 },
  { id: '9:16', label: '9:16 Portrait', ratio: 9 / 16 },
];

export const EXPORT_RESOLUTIONS: ExportResolution[] = [
  { id: '1080p', label: '1920 × 1080 (FHD)', baseWidth: 1920, baseHeight: 1080 },
  { id: '1440p', label: '2560 × 1440 (QHD)', baseWidth: 2560, baseHeight: 1440 },
  { id: '2160p', label: '3840 × 2160 (4K UHD)', baseWidth: 3840, baseHeight: 2160 },
];

/**
 * Deterministic seeded PRNG (Mulberry32)
 */
export function createSeededRandom(seed: number): () => number {
  let state = (seed >>> 0) || 1;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Default treatments for Clear, Frosted, and Opal glass
 */
export const GLASS_TREATMENT_DEFAULTS: Record<GlassTreatment, Partial<GlassMaterialParams>> = {
  clear: {
    glassType: 'clear',
    ior: 1.52,
    roughness: 0.06,
    transmission: 0.94,
    frosting: 0.04,
    refractionStrength: 0.85,
    fresnelIntensity: 1.25,
    edgeHighlight: 1.35,
    iridescence: 0.22,
    dispersion: 0.28,
  },
  frosted: {
    glassType: 'frosted',
    ior: 1.46,
    roughness: 0.42,
    transmission: 0.82,
    frosting: 0.68,
    refractionStrength: 0.55,
    fresnelIntensity: 0.95,
    edgeHighlight: 1.05,
    iridescence: 0.15,
    dispersion: 0.14,
  },
  opal: {
    glassType: 'opal',
    ior: 1.56,
    roughness: 0.18,
    transmission: 0.88,
    frosting: 0.28,
    refractionStrength: 0.78,
    fresnelIntensity: 1.35,
    edgeHighlight: 1.25,
    iridescence: 0.58,
    dispersion: 0.36,
  },
};

export const GLASS_PRESETS: Record<GlassPresetId, GlassPresetConfig> = {
  'opal-ribbon': {
    id: 'opal-ribbon',
    name: 'Preset 01 — Opal Ribbon',
    subtitle: 'Primary Hero Sculpture',
    description:
      'A sweeping translucent glass ribbon with beveled edges, pearlescent lavender-blue curvature highlights, and calm left-side negative space for hero typography.',
    recommendedSection: 'Hero Section',
    material: {
      glassType: 'opal',
      ior: 1.54,
      thickness: 1.45,
      roughness: 0.14,
      transmission: 0.9,
      refractionStrength: 0.82,
      fresnelIntensity: 1.32,
      edgeHighlight: 1.35,
      dispersion: 0.34,
      iridescence: 0.52,
      frosting: 0.22,
      normalDistortion: 0.32,
      microtexture: 0.12,
      causticIntensity: 0.48,
      reflectionStrength: 1.18,
    },
    scene: {
      lightingIntensity: 1.15,
      motionSpeed: 0.65,
      distortionStrength: 0.45,
      shapeDensity: 3,
      scale: 1.05,
      positionX: 0.38,
      positionY: 0.04,
      seed: 1042,
      loopDurationSec: 12,
    },
  },
  'frosted-fold': {
    id: 'frosted-fold',
    name: 'Preset 02 — Frosted Fold',
    subtitle: 'Architectural Glazing Sheets',
    description:
      'Large folded sheets of frosted architectural glass with diffused transmission, subtle micro-roughness, and silver-blue edge illumination.',
    recommendedSection: 'The Problem Section',
    material: {
      glassType: 'frosted',
      ior: 1.47,
      thickness: 1.15,
      roughness: 0.44,
      transmission: 0.83,
      refractionStrength: 0.52,
      fresnelIntensity: 1.05,
      edgeHighlight: 1.12,
      dispersion: 0.16,
      iridescence: 0.18,
      frosting: 0.65,
      normalDistortion: 0.24,
      microtexture: 0.35,
      causticIntensity: 0.28,
      reflectionStrength: 0.92,
    },
    scene: {
      lightingIntensity: 1.08,
      motionSpeed: 0.5,
      distortionStrength: 0.35,
      shapeDensity: 3,
      scale: 1.12,
      positionX: 0.12,
      positionY: 0.0,
      seed: 2084,
      loopDurationSec: 14,
    },
  },
  'liquid-lens': {
    id: 'liquid-lens',
    name: 'Preset 03 — Liquid Lens',
    subtitle: 'Optical Lens Field',
    description:
      'Three sculpted biconvex optical lenses that bend the underlying studio grid and light bands with crisp bevels and subtle chromatic dispersion.',
    recommendedSection: 'Practical Credibility Section',
    material: {
      glassType: 'clear',
      ior: 1.62,
      thickness: 1.85,
      roughness: 0.06,
      transmission: 0.95,
      refractionStrength: 1.05,
      fresnelIntensity: 1.4,
      edgeHighlight: 1.48,
      dispersion: 0.42,
      iridescence: 0.28,
      frosting: 0.06,
      normalDistortion: 0.38,
      microtexture: 0.08,
      causticIntensity: 0.68,
      reflectionStrength: 1.32,
    },
    scene: {
      lightingIntensity: 1.18,
      motionSpeed: 0.58,
      distortionStrength: 0.48,
      shapeDensity: 3,
      scale: 1.0,
      positionX: 0.2,
      positionY: -0.02,
      seed: 3190,
      loopDurationSec: 10,
    },
  },
  'glass-strata': {
    id: 'glass-strata',
    name: 'Preset 04 — Glass Strata',
    subtitle: 'Layered Glass Architecture',
    description:
      'Terraced translucent glass panes suspended at staggered depths with beveled edges, contact-shadow grounding, and multi-layer parallax.',
    recommendedSection: 'Playbook Preview Section',
    material: {
      glassType: 'opal',
      ior: 1.51,
      thickness: 1.3,
      roughness: 0.22,
      transmission: 0.87,
      refractionStrength: 0.72,
      fresnelIntensity: 1.2,
      edgeHighlight: 1.3,
      dispersion: 0.26,
      iridescence: 0.42,
      frosting: 0.32,
      normalDistortion: 0.2,
      microtexture: 0.18,
      causticIntensity: 0.38,
      reflectionStrength: 1.1,
    },
    scene: {
      lightingIntensity: 1.1,
      motionSpeed: 0.52,
      distortionStrength: 0.3,
      shapeDensity: 4,
      scale: 1.04,
      positionX: -0.08,
      positionY: 0.02,
      seed: 4412,
      loopDurationSec: 12,
    },
  },
  'refractive-halo': {
    id: 'refractive-halo',
    name: 'Preset 05 — Refractive Halo',
    subtitle: 'Sculptural Optical Ring',
    description:
      'A thick, polished elliptical optical ring suspended in studio light, producing traveling edge highlights and warm champagne-lavender refraction.',
    recommendedSection: 'Final Download CTA Section',
    material: {
      glassType: 'clear',
      ior: 1.58,
      thickness: 1.65,
      roughness: 0.1,
      transmission: 0.92,
      refractionStrength: 0.94,
      fresnelIntensity: 1.45,
      edgeHighlight: 1.55,
      dispersion: 0.38,
      iridescence: 0.46,
      frosting: 0.12,
      normalDistortion: 0.28,
      microtexture: 0.1,
      causticIntensity: 0.72,
      reflectionStrength: 1.28,
    },
    scene: {
      lightingIntensity: 1.2,
      motionSpeed: 0.6,
      distortionStrength: 0.36,
      shapeDensity: 2,
      scale: 1.08,
      positionX: 0.24,
      positionY: 0.0,
      seed: 5580,
      loopDurationSec: 14,
    },
  },
  'caustic-window': {
    id: 'caustic-window',
    name: 'Preset 06 — Caustic Window',
    subtitle: 'Refracted Studio Sunlight',
    description:
      'Minimalist curved optical louvers casting concentrated caustic light bands and gentle refracted daylight across a quiet architectural studio wall.',
    recommendedSection: 'Benefits & How It Works Sections',
    material: {
      glassType: 'clear',
      ior: 1.49,
      thickness: 1.05,
      roughness: 0.12,
      transmission: 0.93,
      refractionStrength: 0.68,
      fresnelIntensity: 1.1,
      edgeHighlight: 1.15,
      dispersion: 0.22,
      iridescence: 0.24,
      frosting: 0.18,
      normalDistortion: 0.22,
      microtexture: 0.14,
      causticIntensity: 1.15,
      reflectionStrength: 1.0,
    },
    scene: {
      lightingIntensity: 1.22,
      motionSpeed: 0.45,
      distortionStrength: 0.28,
      shapeDensity: 3,
      scale: 1.1,
      positionX: 0.05,
      positionY: 0.08,
      seed: 6720,
      loopDurationSec: 16,
    },
  },
};

export const GLASS_PRESET_LIST: GlassPresetConfig[] = Object.values(GLASS_PRESETS);

export function computeExportDimensions(
  resolution: ExportResolution,
  aspectRatio: ExportAspectRatio
): { width: number; height: number } {
  const ratioObj =
    EXPORT_ASPECT_RATIOS.find((r) => r.id === aspectRatio) || EXPORT_ASPECT_RATIOS[0];
  const targetRatio = ratioObj.ratio;

  if (targetRatio >= 1) {
    const width = resolution.baseWidth;
    const height = Math.round(width / targetRatio / 2) * 2;
    return { width, height };
  } else {
    const height = resolution.baseWidth;
    const width = Math.round(height * targetRatio / 2) * 2;
    return { width, height };
  }
}

export function computeResponsiveFraming(
  viewportWidth: number,
  viewportHeight: number,
  basePositionX: number,
  basePositionY: number,
  baseScale: number
): { offsetX: number; offsetY: number; effectiveScale: number; cameraZ: number } {
  const aspect = viewportWidth / Math.max(1, viewportHeight);

  if (viewportWidth < 640 || aspect < 0.85) {
    // Portrait mobile: keep glass sculpture lower/centered and slightly compact so hero copy & form stay clear
    return {
      offsetX: basePositionX * 0.35,
      offsetY: basePositionY - 0.18,
      effectiveScale: baseScale * 0.82,
      cameraZ: 6.4,
    };
  }

  if (viewportWidth < 1024) {
    // Tablet
    return {
      offsetX: basePositionX * 0.65,
      offsetY: basePositionY - 0.06,
      effectiveScale: baseScale * 0.92,
      cameraZ: 5.8,
    };
  }

  // Desktop & Ultrawide
  return {
    offsetX: basePositionX,
    offsetY: basePositionY,
    effectiveScale: baseScale,
    cameraZ: 5.2,
  };
}

export function serializePresetConfig(config: GlassPresetConfig): string {
  return JSON.stringify(config, null, 2);
}

export function generateReactComponentSnippet(config: GlassPresetConfig): string {
  return `<GlassBackground
  preset="${config.id}"
  seed={${config.scene.seed}}
  speed={${config.scene.motionSpeed}}
  intensity={${config.scene.lightingIntensity}}
  quality="auto"
  interactive
/>`;
}
