import { sampleProfile, type VesselParams } from "./profile";

/** Coordinates of the profile editor's SVG; kept apart from the component so the maths is plain. */
export const EDITOR = {
  width: 300,
  height: 340,
  centreX: 150,
  baseY: 312,
  radiusPx: 120,
  minHeight: 80,
  heightRange: 190,
} as const;

export function silhouettePathFor(params: VesselParams): string {
  const height = EDITOR.minHeight + params.height * EDITOR.heightRange;
  const points = sampleProfile(params, 36);
  const right = points.map((p) => `${(EDITOR.centreX + p.r * EDITOR.radiusPx).toFixed(1)} ${(EDITOR.baseY - p.y * height).toFixed(1)}`);
  const left = [...points].reverse().map((p) => `${(EDITOR.centreX - p.r * EDITOR.radiusPx).toFixed(1)} ${(EDITOR.baseY - p.y * height).toFixed(1)}`);
  return `M${right.join(" L")} L${left.join(" L")} Z`;
}
