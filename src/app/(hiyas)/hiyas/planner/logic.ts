export type SupportLevel = "route" | "guided" | "private";

export type Peak = {
  id: string;
  name: string;
  elevation: number;
  region: string;
  character: string;
};

export const PEAKS: Peak[] = [
  { id: "everest", name: "Everest", elevation: 8849, region: "Nepal / Tibet", character: "The high line: long approach, deliberate rhythm, clear summit window." },
  { id: "k2", name: "K2", elevation: 8611, region: "Pakistan / China", character: "Steep, exposed, and uncompromising above the shoulder." },
  { id: "kangchenjunga", name: "Kangchenjunga", elevation: 8586, region: "Nepal / India", character: "A remote traverse shaped by weather and distance." },
  { id: "lhotse", name: "Lhotse", elevation: 8516, region: "Nepal / Tibet", character: "A compressed line above the shared Khumbu approach." },
  { id: "makalu", name: "Makalu", elevation: 8485, region: "Nepal / Tibet", character: "A clean pyramid where the route stays technical." },
  { id: "cho-oyu", name: "Cho Oyu", elevation: 8188, region: "Nepal / Tibet", character: "A broad north-facing line built around patient acclimatization." },
  { id: "dhaulagiri", name: "Dhaulagiri", elevation: 8167, region: "Nepal", character: "A long valley approach beneath a changing west face." },
  { id: "manaslu", name: "Manaslu", elevation: 8163, region: "Nepal", character: "A measured route with a strong camp-to-camp cadence." },
  { id: "nanga-parbat", name: "Nanga Parbat", elevation: 8126, region: "Pakistan", character: "A vast wall where return planning matters as much as height." },
  { id: "annapurna", name: "Annapurna I", elevation: 8091, region: "Nepal", character: "A complex weather line with no room for a rushed plan." },
  { id: "gasherbrum-i", name: "Gasherbrum I", elevation: 8080, region: "Pakistan / China", character: "A quiet high camp and a sharp summit push." },
  { id: "broad-peak", name: "Broad Peak", elevation: 8051, region: "Pakistan / China", character: "A long summit ridge where the clock stays visible." },
  { id: "gasherbrum-ii", name: "Gasherbrum II", elevation: 8035, region: "Pakistan / China", character: "A clear expedition structure with a high, open finish." },
  { id: "shishapangma", name: "Shishapangma", elevation: 8027, region: "Tibet", character: "A remote north-face plan with a narrow weather window." },
];

export type PlannerState = { peakId: string; days: number; support: SupportLevel; locked: boolean };
export const INITIAL_PLANNER_STATE: PlannerState = { peakId: "everest", days: 21, support: "guided", locked: false };
export type PlannerAction =
  | { type: "selectPeak"; peakId: string }
  | { type: "setDays"; days: number }
  | { type: "setSupport"; support: SupportLevel }
  | { type: "lockPlan" };

export const SUPPORT_LABELS: Record<SupportLevel, string> = { route: "Route only", guided: "Sherpa guided", private: "Private expedition" };

export function clampPlannerDays(days: number, min = 14, max = 70): number {
  return Math.round(Math.min(max, Math.max(min, Number.isFinite(days) ? days : min)));
}

export function routeSegment(progress: number): "approach" | "acclimatize" | "summit" | "return" {
  const p = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));
  if (p < 0.22) return "approach";
  if (p < 0.68) return "acclimatize";
  if (p < 0.88) return "summit";
  return "return";
}

export function altitudeAt(progress: number, peakElevation: number): number {
  const p = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));
  const knots = [[0, 0.12], [0.22, 0.28], [0.48, 0.56], [0.72, 0.78], [1, 1]] as const;
  for (let index = 1; index < knots.length; index += 1) {
    const [endProgress, endAltitude] = knots[index];
    const [startProgress, startAltitude] = knots[index - 1];
    if (p <= endProgress) {
      const t = (p - startProgress) / (endProgress - startProgress);
      return Math.round((startAltitude + (endAltitude - startAltitude) * t) * peakElevation);
    }
  }
  return peakElevation;
}

export type CampStop = { label: string; progress: number; altitude: number };

export function campStops(peakElevation: number, days: number, support: SupportLevel): CampStop[] {
  const normalizedDays = clampPlannerDays(days);
  const supportOffset = support === "private" ? -0.02 : support === "route" ? 0.02 : 0;
  const secondCamp = Math.min(0.7, Math.max(0.42, 0.55 + (normalizedDays - 21) * 0.002 + supportOffset));
  const stops = [
    { label: "Base camp", progress: 0 },
    { label: "Camp 1", progress: 0.28 },
    { label: "Camp 2", progress: secondCamp },
    { label: "Summit", progress: 1 },
  ];
  return stops.map((stop) => ({ ...stop, altitude: stop.progress === 1 ? peakElevation : altitudeAt(stop.progress, peakElevation) }));
}

export function plannerReducer(state: PlannerState, action: PlannerAction): PlannerState {
  if (action.type === "selectPeak") return PEAKS.some((peak) => peak.id === action.peakId) ? { ...state, peakId: action.peakId, locked: false } : state;
  if (action.type === "setDays") return { ...state, days: clampPlannerDays(action.days), locked: false };
  if (action.type === "setSupport") return { ...state, support: action.support, locked: false };
  return { ...state, locked: true };
}

export function plannerSummary(state: PlannerState) {
  const peak = PEAKS.find((item) => item.id === state.peakId) ?? PEAKS[0];
  return { peakId: peak.id, peakName: peak.name, elevation: peak.elevation, days: clampPlannerDays(state.days), support: state.support, supportLabel: SUPPORT_LABELS[state.support], locked: state.locked };
}

