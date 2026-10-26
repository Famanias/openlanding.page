import { clamp } from "../motion/math";
export const STATIONS = ["Departure", "Midnight", "Border crossing", "Dawn"] as const;
export function clamp01(value: number) { return clamp(value); }
export function stationAt(progress: number) { const p = clamp01(progress); const scaled = p * STATIONS.length; const index = Math.min(STATIONS.length - 1, Math.floor(scaled)); return { index, local: index === STATIONS.length - 1 ? 1 : scaled - index }; }
export function windowOffset(progress: number, depth: number) { const phase = (progress - 0.5) * depth; const x = Math.round(-phase * 16); return { x: Object.is(x, -0) ? 0 : x, y: Math.round(phase * 5.3333333333) }; }
