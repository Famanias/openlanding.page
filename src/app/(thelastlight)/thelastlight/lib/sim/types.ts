export type WeatherId = 'CLEAR' | 'CLOUDY' | 'RAIN' | 'THUNDERSTORM';

export type CameraMode =
  | 'cinematic'
  | 'orbit'
  | 'ground'
  | 'ocean'
  | 'beacon'
  | 'front'
  | 'side'
  | 'elevated'
  | 'topdown';

export type QualityPreset = 'low' | 'medium' | 'high';

export interface Vec2 {
  x: number;
  z: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface WeatherTargets {
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
  oceanRoughness: number;
  foamIntensity: number;
  windStrength: number;
  fogDensity: number;
  rainIntensity: number;
  cloudCoverage: number;
  stormIntensity: number;
  atmosphericHaze: number;
  lightningActivity: number;
  rockWetness: number;
  sprayIntensity: number;
  ambientDimming: number;
}

export interface SimControls {
  // Weather & Atmosphere
  weather: WeatherId;
  timeOfDay: number; // 0..24 hours
  windStrength: number; // 0.1..2.0
  fogDensity: number; // 0..1
  rainIntensity: number; // 0..1

  // Sky
  cloudDensity: number; // 0..1
  cloudSpeed: number; // 0.2..2.5
  stormIntensity: number; // 0..1
  atmosphericHaze: number; // 0..1

  // Ocean
  waveAmplitude: number; // 0.2..2.2
  waveFrequency: number; // 0.5..1.8
  waveSpeed: number; // 0.3..2.0
  oceanRoughness: number; // 0.05..0.9
  foamIntensity: number; // 0..2
  sprayIntensity: number; // 0..1.5

  // Lighthouse
  beaconEnabled: boolean;
  beaconSpeed: number; // rad/s (0.05..2.0)
  beamIntensity: number; // 0.2..2.5
  beamSoftness: number; // 0.1..1.0
  beamRange: number; // 45..135 meters
  interiorLights: boolean;
  doorOpen: boolean;
  cutaway: boolean;

  // Boat
  buoyancyEnabled: boolean;
  showBoatSamplePoints: boolean;
  showWaterNormal: boolean;
  repositionBoatMode: boolean;

  // Architecture Diagnostics
  showBuildingBounds: boolean;
  showFoundations: boolean;
  showWalkwayGuides: boolean;

  // Camera
  cameraMode: CameraMode;
  autoCinematic: boolean;

  // Simulation & Storm Sequence
  stormPlaying: boolean;
  stormTime: number; // 0..30s
  stormSpeed: number; // 0.25..2.0
  stormLoop: boolean;
  stormActive: boolean; // whether timeline overrides environment
  quality: QualityPreset;

  // Performance & Debugging
  wireframe: boolean;
  showCollisions: boolean;
  showParticles: boolean;
  expensiveEffects: boolean;
}

export interface EffectiveEnvState {
  timeOfDay: number;
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
  oceanRoughness: number;
  foamIntensity: number;
  windStrength: number;
  windDirX: number;
  windDirZ: number;
  gustFactor: number;
  fogDensity: number;
  rainIntensity: number;
  cloudCoverage: number;
  cloudSpeed: number;
  stormIntensity: number;
  atmosphericHaze: number;
  lightningActivity: number;
  lightningFlash: number; // 0..1 instantaneous bolt flash
  rockWetness: number;
  sprayIntensity: number;
  ambientDimming: number;
  beaconActive: boolean;
  beaconIntensity: number;
  beamSoftness: number;
  beamRange: number;
  interiorLightsActive: boolean;
}

export interface BoatWaveSamplePoint {
  name: 'bow' | 'stern' | 'port' | 'starboard' | 'center';
  x: number;
  y: number;
  z: number;
}

export interface BoatState {
  x: number;
  y: number;
  z: number;
  vx: number;
  vz: number;
  anchorX: number;
  anchorZ: number;
  buoyX: number;
  buoyY: number;
  buoyZ: number;
  yaw: number;
  pitch: number;
  roll: number;
  pitchVel: number;
  rollVel: number;
  verticalVel: number;
  heaveOffset: number;
  waterNormalX: number;
  waterNormalY: number;
  waterNormalZ: number;
  samplePoints: BoatWaveSamplePoint[];
}

export interface TelemetryStats {
  fps: number;
  drawCalls: number;
  triangles: number;
  geometries: number;
  isSoftwareGl: boolean;
  boatX: number;
  boatZ: number;
  boatWaveHeight: number;
  windSpeedKts: number;
}

export const STORM_DURATION = 30;

export const HERO_CAMERA_CONFIG = {
  pos: { x: -17.5, y: 8.8, z: 39.5 },
  look: { x: 1.6, y: 9.2, z: -1.5 },
  fov: 48,
} as const;

export const DEFAULT_CONTROLS: SimControls = {
  weather: 'THUNDERSTORM',
  timeOfDay: 18.65,
  windStrength: 1.12,
  fogDensity: 0.34,
  rainIntensity: 0.62,

  cloudDensity: 0.84,
  cloudSpeed: 1.0,
  stormIntensity: 0.78,
  atmosphericHaze: 0.42,

  waveAmplitude: 1.15,
  waveFrequency: 1.0,
  waveSpeed: 1.0,
  oceanRoughness: 0.36,
  foamIntensity: 1.15,
  sprayIntensity: 0.88,

  beaconEnabled: true,
  beaconSpeed: 0.38,
  beamIntensity: 1.35,
  beamSoftness: 0.68,
  beamRange: 96,
  interiorLights: true,
  doorOpen: false,
  cutaway: false,

  buoyancyEnabled: true,
  showBoatSamplePoints: false,
  showWaterNormal: false,
  repositionBoatMode: false,

  showBuildingBounds: false,
  showFoundations: false,
  showWalkwayGuides: false,

  cameraMode: 'cinematic',
  autoCinematic: true,

  stormPlaying: false,
  stormTime: 0,
  stormSpeed: 1.0,
  stormLoop: true,
  stormActive: false,
  quality: 'high',

  wireframe: false,
  showCollisions: false,
  showParticles: true,
  expensiveEffects: true,
};
