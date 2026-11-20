export const DAY_NIGHT_CYCLE_DURATION_SECONDS = 30;

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface DayNightPalette {
  phase: number;
  label: 'Dawn' | 'Day' | 'Dusk' | 'Night';
  // Scene lighting
  ambientColor: RgbColor;
  ambientIntensity: number;
  hemiSkyColor: RgbColor;
  hemiGroundColor: RgbColor;
  hemiIntensity: number;
  keyLightColor: RgbColor;
  keyLightIntensity: number;
  fillLightColor: RgbColor;
  fillLightIntensity: number;
  fogColor: RgbColor;
  // Sky & celestial body
  skyZenith: RgbColor;
  skyMid: RgbColor;
  skyMistBand: RgbColor;
  skyHorizon: RgbColor;
  skyWarmGlow: RgbColor;
  skyWarmStrength: number;
  celestialCore: RgbColor;
  celestialHalo: RgbColor;
  celestialY: number;
  starOpacity: number;
  // Mountains, water, mist & architectural accents
  mountainTint: RgbColor;
  mountainLightScale: number;
  waterNear: RgbColor;
  waterFar: RgbColor;
  waterReflect: RgbColor;
  mistTint: RgbColor;
  mistOpacityScale: number;
  blossomEmissive: RgbColor;
  blossomEmissiveIntensity: number;
  lanternEmissiveIntensity: number;
  lanternPointIntensity: number;
  lanternHaloOpacity: number;
}

interface CycleKeyframe {
  phase: number;
  ambientColor: string;
  ambientIntensity: number;
  hemiSkyColor: string;
  hemiGroundColor: string;
  hemiIntensity: number;
  keyLightColor: string;
  keyLightIntensity: number;
  fillLightColor: string;
  fillLightIntensity: number;
  fogColor: string;
  skyZenith: string;
  skyMid: string;
  skyMistBand: string;
  skyHorizon: string;
  skyWarmGlow: string;
  skyWarmStrength: number;
  celestialCore: string;
  celestialHalo: string;
  celestialY: number;
  starOpacity: number;
  mountainTint: string;
  mountainLightScale: number;
  waterNear: string;
  waterFar: string;
  waterReflect: string;
  mistTint: string;
  mistOpacityScale: number;
  blossomEmissive: string;
  blossomEmissiveIntensity: number;
  lanternEmissiveIntensity: number;
  lanternPointIntensity: number;
  lanternHaloOpacity: number;
}

const KEYFRAMES: CycleKeyframe[] = [
  {
    // 0.00 (0s): Dawn — Asagiri morning mist
    phase: 0.0,
    ambientColor: '#9BB0C6',
    ambientIntensity: 0.34,
    hemiSkyColor: '#9CB0C4',
    hemiGroundColor: '#233040',
    hemiIntensity: 0.92,
    keyLightColor: '#F9DAC0',
    keyLightIntensity: 1.75,
    fillLightColor: '#9BB4CE',
    fillLightIntensity: 0.48,
    fogColor: '#BFC6CE',
    skyZenith: '#1E2B3C',
    skyMid: '#3B5067',
    skyMistBand: '#8E9DAD',
    skyHorizon: '#E8DDD0',
    skyWarmGlow: '#F6D7BC',
    skyWarmStrength: 0.46,
    celestialCore: '#FFF8EA',
    celestialHalo: '#F5D6BA',
    celestialY: 4.45,
    starOpacity: 0.0,
    mountainTint: '#FFFFFF',
    mountainLightScale: 1.0,
    waterNear: '#213041',
    waterFar: '#7F8E9D',
    waterReflect: '#F5DFC6',
    mistTint: '#EFE3D7',
    mistOpacityScale: 1.0,
    blossomEmissive: '#E9C8D0',
    blossomEmissiveIntensity: 0.42,
    lanternEmissiveIntensity: 1.45,
    lanternPointIntensity: 1.25,
    lanternHaloOpacity: 0.62,
  },
  {
    // 0.25 (7.5s): Soft Midday — Clear tranquil spring light
    phase: 0.25,
    ambientColor: '#C8D9E8',
    ambientIntensity: 0.54,
    hemiSkyColor: '#C2D5E6',
    hemiGroundColor: '#3E4F61',
    hemiIntensity: 1.22,
    keyLightColor: '#FFF0DA',
    keyLightIntensity: 2.1,
    fillLightColor: '#B6CCE0',
    fillLightIntensity: 0.62,
    fogColor: '#CDD5DC',
    skyZenith: '#355473',
    skyMid: '#5E7F9E',
    skyMistBand: '#A8B8C6',
    skyHorizon: '#ECE6DC',
    skyWarmGlow: '#FFF1DC',
    skyWarmStrength: 0.38,
    celestialCore: '#FFFDF7',
    celestialHalo: '#F7E7CE',
    celestialY: 5.35,
    starOpacity: 0.0,
    mountainTint: '#F2F7FB',
    mountainLightScale: 1.12,
    waterNear: '#2C4359',
    waterFar: '#93A6B6',
    waterReflect: '#FFF2DC',
    mistTint: '#F4EFE8',
    mistOpacityScale: 0.88,
    blossomEmissive: '#F2D7DE',
    blossomEmissiveIntensity: 0.5,
    lanternEmissiveIntensity: 0.55,
    lanternPointIntensity: 0.35,
    lanternHaloOpacity: 0.2,
  },
  {
    // 0.50 (15s): Dusk — Tasogare indigo & soft persimmon twilight
    phase: 0.5,
    ambientColor: '#8B7484',
    ambientIntensity: 0.28,
    hemiSkyColor: '#82738F',
    hemiGroundColor: '#221E2C',
    hemiIntensity: 0.76,
    keyLightColor: '#F0A47F',
    keyLightIntensity: 1.38,
    fillLightColor: '#7A7999',
    fillLightIntensity: 0.38,
    fogColor: '#9E8589',
    skyZenith: '#181E34',
    skyMid: '#3C3957',
    skyMistBand: '#8F6C74',
    skyHorizon: '#DC9F82',
    skyWarmGlow: '#EC9D78',
    skyWarmStrength: 0.56,
    celestialCore: '#FFE6CE',
    celestialHalo: '#E99B79',
    celestialY: 3.7,
    starOpacity: 0.22,
    mountainTint: '#D8C2C8',
    mountainLightScale: 0.8,
    waterNear: '#1C2236',
    waterFar: '#796570',
    waterReflect: '#F0AC8B',
    mistTint: '#DFBFB3',
    mistOpacityScale: 0.94,
    blossomEmissive: '#DDAAB8',
    blossomEmissiveIntensity: 0.32,
    lanternEmissiveIntensity: 1.95,
    lanternPointIntensity: 1.85,
    lanternHaloOpacity: 0.78,
  },
  {
    // 0.75 (22.5s): Moonlit Night — Tsukiyo serene indigo & silver moonlight
    phase: 0.75,
    ambientColor: '#3E5470',
    ambientIntensity: 0.18,
    hemiSkyColor: '#4D6788',
    hemiGroundColor: '#0E1522',
    hemiIntensity: 0.44,
    keyLightColor: '#B8D0EC',
    keyLightIntensity: 0.88,
    fillLightColor: '#4F6C8F',
    fillLightIntensity: 0.26,
    fogColor: '#384C64',
    skyZenith: '#0A111F',
    skyMid: '#152236',
    skyMistBand: '#2A3E57',
    skyHorizon: '#435974',
    skyWarmGlow: '#8DA9C8',
    skyWarmStrength: 0.28,
    celestialCore: '#EFF5FC',
    celestialHalo: '#9AB6D4',
    celestialY: 4.95,
    starOpacity: 0.9,
    mountainTint: '#7C93B0',
    mountainLightScale: 0.46,
    waterNear: '#0E1725',
    waterFar: '#324760',
    waterReflect: '#C5DBF2',
    mistTint: '#8FA5BC',
    mistOpacityScale: 0.72,
    blossomEmissive: '#8E9BB4',
    blossomEmissiveIntensity: 0.22,
    lanternEmissiveIntensity: 2.55,
    lanternPointIntensity: 2.6,
    lanternHaloOpacity: 0.96,
  },
];

export function hexToRgb(hex: string): RgbColor {
  const clean = hex.replace('#', '');
  const value = parseInt(clean, 16);
  return {
    r: ((value >> 16) & 255) / 255,
    g: ((value >> 8) & 255) / 255,
    b: (value & 255) / 255,
  };
}

const PARSED_KEYFRAMES = KEYFRAMES.map((kf) => ({
  ...kf,
  ambientColorRgb: hexToRgb(kf.ambientColor),
  hemiSkyColorRgb: hexToRgb(kf.hemiSkyColor),
  hemiGroundColorRgb: hexToRgb(kf.hemiGroundColor),
  keyLightColorRgb: hexToRgb(kf.keyLightColor),
  fillLightColorRgb: hexToRgb(kf.fillLightColor),
  fogColorRgb: hexToRgb(kf.fogColor),
  skyZenithRgb: hexToRgb(kf.skyZenith),
  skyMidRgb: hexToRgb(kf.skyMid),
  skyMistBandRgb: hexToRgb(kf.skyMistBand),
  skyHorizonRgb: hexToRgb(kf.skyHorizon),
  skyWarmGlowRgb: hexToRgb(kf.skyWarmGlow),
  celestialCoreRgb: hexToRgb(kf.celestialCore),
  celestialHaloRgb: hexToRgb(kf.celestialHalo),
  mountainTintRgb: hexToRgb(kf.mountainTint),
  waterNearRgb: hexToRgb(kf.waterNear),
  waterFarRgb: hexToRgb(kf.waterFar),
  waterReflectRgb: hexToRgb(kf.waterReflect),
  mistTintRgb: hexToRgb(kf.mistTint),
  blossomEmissiveRgb: hexToRgb(kf.blossomEmissive),
}));

function lerpNumber(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRgb(a: RgbColor, b: RgbColor, t: number): RgbColor {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

/** Smooth cosine easing between consecutive 7.5-second cycle segments */
function smoothEase(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return 0.5 - 0.5 * Math.cos(clamped * Math.PI);
}

/**
 * Normalize elapsed time in seconds into a wrapping [0, 1) cycle phase
 * over the configured duration (default 30 seconds).
 */
export function computeCyclePhase(
  elapsedSeconds: number,
  durationSeconds = DAY_NIGHT_CYCLE_DURATION_SECONDS,
  initialPhase = 0
): number {
  const safeDuration = Math.max(1, durationSeconds);
  const raw = (elapsedSeconds / safeDuration + initialPhase) % 1;
  return raw < 0 ? raw + 1 : raw;
}

export function getCyclePeriodLabel(phase: number): 'Dawn' | 'Day' | 'Dusk' | 'Night' {
  const p = ((phase % 1) + 1) % 1;
  if (p < 0.14 || p >= 0.88) return 'Dawn';
  if (p < 0.39) return 'Day';
  if (p < 0.63) return 'Dusk';
  return 'Night';
}

/**
 * Evaluate the smooth day-night lighting and atmospheric palette for any
 * normalized cycle phase in [0, 1). Seamlessly wraps between 1.0 and 0.0.
 */
export function evaluateDayNightPalette(phase: number): DayNightPalette {
  const normalized = ((phase % 1) + 1) % 1;
  const segmentCount = PARSED_KEYFRAMES.length;
  const scaled = normalized * segmentCount;
  const indexA = Math.floor(scaled) % segmentCount;
  const indexB = (indexA + 1) % segmentCount;
  const localT = smoothEase(scaled - Math.floor(scaled));

  const a = PARSED_KEYFRAMES[indexA];
  const b = PARSED_KEYFRAMES[indexB];

  return {
    phase: normalized,
    label: getCyclePeriodLabel(normalized),
    ambientColor: lerpRgb(a.ambientColorRgb, b.ambientColorRgb, localT),
    ambientIntensity: lerpNumber(a.ambientIntensity, b.ambientIntensity, localT),
    hemiSkyColor: lerpRgb(a.hemiSkyColorRgb, b.hemiSkyColorRgb, localT),
    hemiGroundColor: lerpRgb(a.hemiGroundColorRgb, b.hemiGroundColorRgb, localT),
    hemiIntensity: lerpNumber(a.hemiIntensity, b.hemiIntensity, localT),
    keyLightColor: lerpRgb(a.keyLightColorRgb, b.keyLightColorRgb, localT),
    keyLightIntensity: lerpNumber(a.keyLightIntensity, b.keyLightIntensity, localT),
    fillLightColor: lerpRgb(a.fillLightColorRgb, b.fillLightColorRgb, localT),
    fillLightIntensity: lerpNumber(a.fillLightIntensity, b.fillLightIntensity, localT),
    fogColor: lerpRgb(a.fogColorRgb, b.fogColorRgb, localT),
    skyZenith: lerpRgb(a.skyZenithRgb, b.skyZenithRgb, localT),
    skyMid: lerpRgb(a.skyMidRgb, b.skyMidRgb, localT),
    skyMistBand: lerpRgb(a.skyMistBandRgb, b.skyMistBandRgb, localT),
    skyHorizon: lerpRgb(a.skyHorizonRgb, b.skyHorizonRgb, localT),
    skyWarmGlow: lerpRgb(a.skyWarmGlowRgb, b.skyWarmGlowRgb, localT),
    skyWarmStrength: lerpNumber(a.skyWarmStrength, b.skyWarmStrength, localT),
    celestialCore: lerpRgb(a.celestialCoreRgb, b.celestialCoreRgb, localT),
    celestialHalo: lerpRgb(a.celestialHaloRgb, b.celestialHaloRgb, localT),
    celestialY: lerpNumber(a.celestialY, b.celestialY, localT),
    starOpacity: lerpNumber(a.starOpacity, b.starOpacity, localT),
    mountainTint: lerpRgb(a.mountainTintRgb, b.mountainTintRgb, localT),
    mountainLightScale: lerpNumber(a.mountainLightScale, b.mountainLightScale, localT),
    waterNear: lerpRgb(a.waterNearRgb, b.waterNearRgb, localT),
    waterFar: lerpRgb(a.waterFarRgb, b.waterFarRgb, localT),
    waterReflect: lerpRgb(a.waterReflectRgb, b.waterReflectRgb, localT),
    mistTint: lerpRgb(a.mistTintRgb, b.mistTintRgb, localT),
    mistOpacityScale: lerpNumber(a.mistOpacityScale, b.mistOpacityScale, localT),
    blossomEmissive: lerpRgb(a.blossomEmissiveRgb, b.blossomEmissiveRgb, localT),
    blossomEmissiveIntensity: lerpNumber(a.blossomEmissiveIntensity, b.blossomEmissiveIntensity, localT),
    lanternEmissiveIntensity: lerpNumber(a.lanternEmissiveIntensity, b.lanternEmissiveIntensity, localT),
    lanternPointIntensity: lerpNumber(a.lanternPointIntensity, b.lanternPointIntensity, localT),
    lanternHaloOpacity: lerpNumber(a.lanternHaloOpacity, b.lanternHaloOpacity, localT),
  };
}
