export type PresetId = "quartz" | "milk" | "blue-hour" | "edge";

export type BenchStop = {
  progress: number;
  label: "clear" | "tuned" | "spectral" | "ready";
  title: string;
  description: string;
  ior: number;
  roughness: number;
  dispersion: number;
  transmission: number;
};

export const BENCH_STOPS: BenchStop[] = [
  { progress: 0, label: "clear", title: "Start with the sample", description: "A clean slab with no assumptions baked in.", ior: 1.33, roughness: 0.42, dispersion: 0.08, transmission: 0.62 },
  { progress: 0.33, label: "tuned", title: "Tune the edge", description: "Hold the highlight long enough to read the silhouette.", ior: 1.46, roughness: 0.24, dispersion: 0.19, transmission: 0.74 },
  { progress: 0.66, label: "spectral", title: "Split the light", description: "A measured band appears at the cut, then settles.", ior: 1.52, roughness: 0.18, dispersion: 0.42, transmission: 0.81 },
  { progress: 1, label: "ready", title: "Leave a clear brief", description: "The material can travel from the bench to the build.", ior: 1.52, roughness: 0.18, dispersion: 0.42, transmission: 0.81 },
];

export const PRESETS: Record<PresetId, { name: string; note: string; bias: number }> = {
  quartz: { name: "Quartz 01", note: "neutral edge and measured dispersion", bias: 0 },
  milk: { name: "Studio Milk", note: "soft transmission for panels", bias: -0.06 },
  "blue-hour": { name: "Blue Hour", note: "cool tint with a longer highlight", bias: 0.08 },
  edge: { name: "Edge Study", note: "tight roughness, crisp silhouette", bias: 0.14 },
};

export type BenchState = { progress: number; preset: PresetId; active: number };
export type BenchAction = { type: "progress"; value: number } | { type: "preset"; id: string };

export function clamp01(value: number): number { return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0)); }

export function sampleAt(progress: number): BenchStop {
  const p = clamp01(progress);
  if (p <= BENCH_STOPS[0].progress) return { ...BENCH_STOPS[0], progress: p };
  for (let i = 1; i < BENCH_STOPS.length; i += 1) {
    const next = BENCH_STOPS[i];
    const previous = BENCH_STOPS[i - 1];
    if (p <= next.progress) {
      const t = (p - previous.progress) / (next.progress - previous.progress);
      const mix = (a: number, b: number) => a + (b - a) * t;
      return { ...next, progress: p, ior: mix(previous.ior, next.ior), roughness: mix(previous.roughness, next.roughness), dispersion: mix(previous.dispersion, next.dispersion), transmission: mix(previous.transmission, next.transmission) };
    }
  }
  return { ...BENCH_STOPS[BENCH_STOPS.length - 1] };
}

export function benchSnapshot(progress: number, preset: PresetId): BenchStop {
  const base = sampleAt(progress);
  const bias = PRESETS[preset]?.bias ?? 0;
  return { ...base, ior: Number((base.ior + bias * 0.08).toFixed(2)), roughness: Number(clamp01(base.roughness - bias * 0.3).toFixed(2)), dispersion: Number(clamp01(base.dispersion + bias * 0.35).toFixed(2)) };
}

export function benchReducer(state: BenchState, action: BenchAction): BenchState {
  if (action.type === "progress") {
    const progress = clamp01(action.value);
    return { ...state, progress, active: Math.min(BENCH_STOPS.length - 1, Math.round(progress * (BENCH_STOPS.length - 1))) };
  }
  if (!(action.id in PRESETS)) return state;
  return { ...state, preset: action.id as PresetId };
}
