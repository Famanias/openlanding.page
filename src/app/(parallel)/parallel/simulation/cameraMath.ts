export type HeroMode =
  | 'explore'
  | 'systems'
  | 'disrupt'
  | 'simulate'
  | 'explain'
  | 'outcome';

export type CameraRigMode =
  | 'cinematic_hero'
  | 'macro_low_angle'
  | 'cinematic_overview'
  | 'axonometric_layers'
  | 'symmetrical_dual_split'
  | 'simulation_lab_split'
  | 'causal_isolation'
  | 'district_inspection'
  | 'realigned_studio';

export interface Vec3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface CameraPose {
  position: Vec3Tuple;
  target: Vec3Tuple;
  fov: number;
}

export const CAMERA_PRESETS: Record<CameraRigMode, CameraPose> = {
  cinematic_hero: {
    position: { x: -18, y: 12.5, z: 29 },
    target: { x: 0, y: 2.2, z: -1 },
    fov: 36,
  },
  macro_low_angle: {
    position: { x: -24, y: 22, z: 36 },
    target: { x: 0, y: 1.2, z: 0 },
    fov: 38,
  },
  cinematic_overview: {
    position: { x: -20, y: 24, z: 38 },
    target: { x: 0, y: 1.4, z: 0 },
    fov: 40,
  },
  axonometric_layers: {
    position: { x: -22, y: 28, z: 34 },
    target: { x: 0, y: 2.4, z: 0 },
    fov: 38,
  },
  symmetrical_dual_split: {
    position: { x: 0, y: 54, z: 58 },
    target: { x: 0, y: -1.0, z: 1.0 },
    fov: 48,
  },
  simulation_lab_split: {
    position: { x: 0, y: 52, z: 56 },
    target: { x: 0, y: -1.8, z: 1.5 },
    fov: 48,
  },
  causal_isolation: {
    position: { x: 10, y: 18, z: 24 },
    target: { x: 0, y: 1.2, z: 0 },
    fov: 36,
  },
  district_inspection: {
    position: { x: -10, y: 14, z: 18 },
    target: { x: -4, y: 1.5, z: -6 },
    fov: 35,
  },
  realigned_studio: {
    position: { x: 0, y: 23, z: 38 },
    target: { x: 0, y: 1.4, z: 0 },
    fov: 38,
  },
};

export interface ChoreographyState {
  mode: CameraRigMode;
  pose: CameraPose;
  splitFactor: number; // 0 = single world, 1 = separated Future A & Future B
  realignGhostAlpha: number; // > 0 in Outcome mode when unselected future is shown as subtle reference
  studioLightReveal: number; // 0.65 to 1.0
}

/**
 * State-driven camera and world choreography for the cinematic hero and 6 interactive hero modes.
 * Reversible across any mode switch (e.g. Explore -> Simulate -> Systems -> Explain -> Explore).
 */
export function computeModeChoreography(
  heroMode: HeroMode,
  options?: {
    heroState?: 'cinematic' | 'interactive';
    inspectionTarget?: Vec3Tuple | null;
    causalTarget?: Vec3Tuple | null;
    comparisonBias?: number; // -1 (Future A) to +1 (Future B)
    isMobile?: boolean;
    aspectRatio?: number;
  }
): ChoreographyState {
  if (options?.heroState === 'cinematic' && !options?.inspectionTarget) {
    const basePose: CameraPose = {
      position: { ...CAMERA_PRESETS.cinematic_hero.position },
      target: { ...CAMERA_PRESETS.cinematic_hero.target },
      fov: CAMERA_PRESETS.cinematic_hero.fov,
    };
    if (options.aspectRatio && options.aspectRatio < 0.85) {
      basePose.position.y *= 1.15;
      basePose.position.z *= 1.22;
    }
    return {
      mode: 'cinematic_hero',
      pose: basePose,
      splitFactor: 0,
      realignGhostAlpha: 0,
      studioLightReveal: 0.88,
    };
  }

  let mode: CameraRigMode = 'macro_low_angle';
  let basePose: CameraPose = {
    position: { ...CAMERA_PRESETS.macro_low_angle.position },
    target: { ...CAMERA_PRESETS.macro_low_angle.target },
    fov: CAMERA_PRESETS.macro_low_angle.fov,
  };
  let splitFactor = 0;
  let realignGhostAlpha = 0;
  let studioLightReveal = 0.85;

  switch (heroMode) {
    case 'explore':
      mode = 'macro_low_angle';
      basePose = {
        position: { ...CAMERA_PRESETS.macro_low_angle.position },
        target: { ...CAMERA_PRESETS.macro_low_angle.target },
        fov: CAMERA_PRESETS.macro_low_angle.fov,
      };
      splitFactor = 0;
      studioLightReveal = 0.85;
      break;

    case 'systems':
      mode = 'axonometric_layers';
      basePose = {
        position: { ...CAMERA_PRESETS.axonometric_layers.position },
        target: { ...CAMERA_PRESETS.axonometric_layers.target },
        fov: CAMERA_PRESETS.axonometric_layers.fov,
      };
      splitFactor = 0;
      studioLightReveal = 0.92;
      break;

    case 'disrupt':
      mode = 'symmetrical_dual_split';
      basePose = {
        position: { ...CAMERA_PRESETS.symmetrical_dual_split.position },
        target: { ...CAMERA_PRESETS.symmetrical_dual_split.target },
        fov: CAMERA_PRESETS.symmetrical_dual_split.fov,
      };
      splitFactor = 1;
      studioLightReveal = 1.0;
      break;

    case 'simulate':
      mode = 'simulation_lab_split';
      basePose = {
        position: { ...CAMERA_PRESETS.simulation_lab_split.position },
        target: { ...CAMERA_PRESETS.simulation_lab_split.target },
        fov: CAMERA_PRESETS.simulation_lab_split.fov,
      };
      splitFactor = 1;
      studioLightReveal = 1.0;
      break;

    case 'explain':
      mode = 'causal_isolation';
      basePose = {
        position: { ...CAMERA_PRESETS.causal_isolation.position },
        target: { ...CAMERA_PRESETS.causal_isolation.target },
        fov: CAMERA_PRESETS.causal_isolation.fov,
      };
      splitFactor = 0;
      studioLightReveal = 0.95;
      break;

    case 'outcome':
      mode = 'realigned_studio';
      basePose = {
        position: { ...CAMERA_PRESETS.realigned_studio.position },
        target: { ...CAMERA_PRESETS.realigned_studio.target },
        fov: CAMERA_PRESETS.realigned_studio.fov,
      };
      splitFactor = 0;
      realignGhostAlpha = 0.22;
      studioLightReveal = 1.0;
      break;
  }

  // Apply spatial comparison bias in dual-city modes (Disrupt & Simulate)
  if (splitFactor > 0.2 && options?.comparisonBias) {
    const shiftX = options.comparisonBias * 20 * splitFactor;
    basePose = {
      ...basePose,
      position: {
        x: basePose.position.x + shiftX,
        y: basePose.position.y - Math.abs(options.comparisonBias) * 10,
        z: basePose.position.z - Math.abs(options.comparisonBias) * 8,
      },
      target: {
        x: basePose.target.x + shiftX,
        y: basePose.target.y,
        z: basePose.target.z,
      },
    };
  }

  // Apply causal node focus target override in Explain mode
  if (heroMode === 'explain' && options?.causalTarget) {
    basePose = {
      position: {
        x: options.causalTarget.x + 9,
        y: 14,
        z: options.causalTarget.z + 16,
      },
      target: { ...options.causalTarget },
      fov: 34,
    };
  }

  // Apply direct district/object inspection override if active
  if (options?.inspectionTarget) {
    mode = 'district_inspection';
    basePose = {
      position: {
        x: options.inspectionTarget.x - 8,
        y: 12,
        z: options.inspectionTarget.z + 14,
      },
      target: { ...options.inspectionTarget },
      fov: 34,
    };
  }

  // Pull camera slightly back on narrow mobile portrait viewports so dual cities and districts never clip
  if (options?.aspectRatio && options.aspectRatio < 0.85) {
    const scale = splitFactor > 0.2 ? 1.28 : 1.18;
    basePose = {
      ...basePose,
      position: {
        x: basePose.position.x,
        y: basePose.position.y * scale,
        z: basePose.position.z * scale,
      },
    };
  }

  return {
    mode,
    pose: basePose,
    splitFactor: Number(splitFactor.toFixed(4)),
    realignGhostAlpha: Number(realignGhostAlpha.toFixed(3)),
    studioLightReveal: Number(studioLightReveal.toFixed(3)),
  };
}

/**
 * Legacy compatibility wrapper mapping normalized 0..1 progress to the 6 hero modes.
 */
export function computeSceneChoreography(
  scrollProgress: number,
  options?: {
    inspectionTarget?: Vec3Tuple | null;
    causalTarget?: Vec3Tuple | null;
    comparisonBias?: number;
    activeChapter?: number;
  }
): ChoreographyState {
  const p = Math.max(0, Math.min(1, scrollProgress));
  let heroMode: HeroMode = 'explore';
  if (p < 0.16) heroMode = 'explore';
  else if (p < 0.34) heroMode = 'systems';
  else if (p < 0.54) heroMode = 'disrupt';
  else if (p < 0.74) heroMode = 'simulate';
  else if (p < 0.88) heroMode = 'explain';
  else heroMode = 'outcome';

  return computeModeChoreography(heroMode, options);
}

/**
 * Frame-rate independent exponential damping for smooth camera transitions without snaps.
 */
export function dampValue(
  current: number,
  target: number,
  lambda: number,
  dt: number
): number {
  return current + (target - current) * (1 - Math.exp(-lambda * Math.max(0, dt)));
}
