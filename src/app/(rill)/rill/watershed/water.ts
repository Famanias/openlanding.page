import { clamp01 } from "../motion/math";

export type WatershedPhase = "ridge" | "swale" | "storage" | "root-zone";
export type WaterStatus = "dry" | "holding" | "ready";

export type WaterBudget = {
  runoff: number;
  storage: number;
  rootZone: number;
  status: WaterStatus;
};

function roundOne(value: number): number {
  return Math.round(value * 10) / 10;
}

export function rainfallAt(progress: number): number {
  return Math.round(clamp01(progress) * 80);
}

export function progressAtRainfall(millimeters: number): number {
  if (!Number.isFinite(millimeters)) return 0;
  return clamp01(millimeters / 80);
}

export function waterBudget(millimeters: number): WaterBudget {
  const mm = Math.min(80, Math.max(0, Number.isFinite(millimeters) ? millimeters : 0));
  const runoff = roundOne(Math.min(100, Math.max(0, (mm - 26) * 1.2)));
  const storage = roundOne(Math.min(100, Math.max(0, mm * 0.92 - runoff * 0.24)));
  const rootZone = roundOne(Math.min(100, Math.max(0, storage * 0.74)));
  const status: WaterStatus = mm < 18 ? "dry" : mm < 42 ? "holding" : "ready";
  return { runoff, storage, rootZone, status };
}

export function watershedPhase(progress: number): WatershedPhase {
  const p = clamp01(progress);
  if (p < 0.2) return "ridge";
  if (p < 0.5) return "swale";
  if (p < 0.78) return "storage";
  return "root-zone";
}

export function contourPoint(progress: number): { x: number; y: number } {
  const t = clamp01(progress);
  const x = 8 + 84 * t;
  const y = 18 + 64 * t + 8 * Math.sin(Math.PI * t);
  return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
}

