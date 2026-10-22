/**
 * Pure interaction state for ISOBAR's transects and weather-map instrument.
 *
 * The page renders these values from React/Three.js, but the rules live here so
 * scroll and slider behaviour stays deterministic and can be unit tested.
 */

export type ChamberId = "surface" | "shear" | "cross-section" | "calm";

export type Chamber = {
  id: ChamberId;
  label: string;
  note: string;
  number: string;
  /** Inclusive start of this chamber in the 0–1 transect. */
  start: number;
  /** Exclusive end, except for the final chamber which includes 1. */
  end: number;
};

/** The four readings of the same continuous field. */
export const CHAMBERS: readonly Chamber[] = [
  { id: "surface", label: "Surface", note: "soft pressure", number: "01 / 04", start: 0, end: 0.25 },
  { id: "shear", label: "Shear", note: "moving edges", number: "02 / 04", start: 0.25, end: 0.5 },
  { id: "cross-section", label: "Cross-section", note: "deep signal", number: "03 / 04", start: 0.5, end: 0.75 },
  { id: "calm", label: "Calm", note: "held light", number: "04 / 04", start: 0.75, end: 1 },
];

export type ChamberSelection = Chamber & {
  /** Zero-based chamber index. */
  index: number;
  /** Clamped absolute transect progress. */
  progress: number;
  /** Progress inside the selected chamber, also clamped to 0–1. */
  localProgress: number;
};

/** Clamp a transect value to the inclusive 0–1 range. */
function clampUnit(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * Selects the chamber represented by a page/field progress value.
 *
 * Boundaries belong to the next chamber (`0.25` is the start of Shear), while
 * progress at the very end remains in Calm with a local progress of `1`.
 */
export function chamberForProgress(value: number, chambers: readonly Chamber[] = CHAMBERS): ChamberSelection {
  if (chambers.length === 0) throw new Error("chamberForProgress requires at least one chamber");

  const progress = clampUnit(value);
  let index = chambers.length - 1;
  for (let i = 0; i < chambers.length - 1; i += 1) {
    if (progress < chambers[i].end) {
      index = i;
      break;
    }
  }

  const chamber = chambers[index];
  const span = chamber.end - chamber.start;
  const localProgress = index === chambers.length - 1 && progress >= chamber.end
    ? 1
    : span > 0
      ? Math.min(1, Math.max(0, (progress - chamber.start) / span))
      : 0;

  return { ...chamber, index, progress, localProgress };
}

/** Alias for call sites that read as a sampler in an animation loop. */
export const sampleChamber = chamberForProgress;

export type WeatherMapState = {
  density: number;
  drift: number;
  contour: number;
};

export const DEFAULT_WEATHER_MAP: Readonly<WeatherMapState> = {
  density: 62,
  drift: 38,
  contour: 74,
};

/** Clamp one 0–100 weather-map slider. NaN is treated as the safe minimum. */
export function clampSlider(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

/** Apply one slider update without mutating the current state. */
export function updateWeatherMap(
  state: WeatherMapState,
  key: keyof WeatherMapState,
  value: number,
): WeatherMapState {
  return {
    density: clampSlider(key === "density" ? value : state.density),
    drift: clampSlider(key === "drift" ? value : state.drift),
    contour: clampSlider(key === "contour" ? value : state.contour),
  };
}

export type FieldTuning = WeatherMapState & {
  /** Membrane spatial frequency multiplier used by the renderer. */
  frequency: number;
  /** Membrane motion speed in renderer time units. */
  speed: number;
  /** Camera/volume depth multiplier. */
  depth: number;
  /** Displacement amplitude multiplier. */
  amplitude: number;
};

/**
 * Convert UI percentages into renderer-friendly tuning values.
 *
 * The original percentage values are retained for direct shader uniforms,
 * while the derived values give the volumetric renderer continuous ranges that
 * are easier to reason about than magic percentages in a component.
 */
export function mapSliderStateToFieldTuning(input: WeatherMapState): FieldTuning {
  const state = updateWeatherMap(input, "density", input.density);
  const density = state.density / 100;
  const drift = state.drift / 100;
  const contour = state.contour / 100;

  return {
    ...state,
    frequency: 0.8 + density * 1.4,
    speed: 0.08 + drift * 0.56,
    depth: 0.5 + contour * 1.5,
    amplitude: 0.1 + density * 0.16 + contour * 0.54,
  };
}

/** Readable aliases for existing renderer call sites. */
export const fieldTuningFromSliders = mapSliderStateToFieldTuning;
export const mapSlidersToFieldTuning = mapSliderStateToFieldTuning;

export type VolumeGestureTuning = {
  /** Vertical position maps directly to the continuous field transect. */
  progress: number;
  /** Horizontal pressure maps to density / fold frequency. */
  density: number;
  /** Vertical position inversely maps to drift / movement speed. */
  drift: number;
  /** Vertical depth maps to contour prominence. */
  contour: number;
  /** Always-positive reseed amount for the field's identity. */
  seedDelta: number;
};

/** Convert a normalized direct-manipulation point on the volume into field controls. */
export function volumeGestureToFieldTuning(x: number, y: number): VolumeGestureTuning {
  const nx = clampSlider(Number.isNaN(x) ? 0 : x * 100) / 100;
  const ny = clampSlider(Number.isNaN(y) ? 0 : y * 100) / 100;
  return {
    progress: ny,
    density: Math.round(35 + nx * 65),
    drift: Math.round(100 - ny * 80),
    contour: Math.round(25 + ny * 75),
    seedDelta: 1 + Math.round(nx * 9 + (1 - ny) * 5),
  };
}
