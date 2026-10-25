export type CalibrationMode = "screen" | "street" | "night";

export type FocusState = {
  mode: CalibrationMode;
  aperture: number;
  transmission: number;
  rotation: number;
  tint: "lilac" | "peach" | "mint";
};

const MODE_ORDER: CalibrationMode[] = ["screen", "street", "night"];

const MODE_VALUES: Record<CalibrationMode, Omit<FocusState, "mode" | "rotation">> = {
  screen: { aperture: 0.58, transmission: 0.78, tint: "lilac" },
  street: { aperture: 0.72, transmission: 0.92, tint: "peach" },
  night: { aperture: 0.34, transmission: 0.64, tint: "mint" },
};

export function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

export function modeAt(angle: number): CalibrationMode {
  const normalized = normalizeAngle(angle);
  return MODE_ORDER[Math.floor(normalized / 120)] ?? "screen";
}

export function snapAngle(angle: number): number {
  const normalized = normalizeAngle(angle);
  const snap = Math.round(normalized / 120) * 120;
  return snap === 360 ? 0 : snap;
}

export function focusState(mode: CalibrationMode, angle: number): FocusState {
  return { mode, rotation: normalizeAngle(angle), ...MODE_VALUES[mode] };
}

export function modeIndex(mode: CalibrationMode): number {
  return MODE_ORDER.indexOf(mode);
}

export const CALIBRATION_MODES = MODE_ORDER.map((mode) => ({
  id: mode,
  label: mode === "screen" ? "Screen" : mode === "street" ? "Street" : "Night",
  note: mode === "screen" ? "low glare" : mode === "street" ? "true colour" : "edge lift",
  marker: modeIndex(mode) * 120,
})) as ReadonlyArray<{ id: CalibrationMode; label: string; note: string; marker: number }>;
