import { clamp } from "../motion/math";

/** The five dials of a Cullet glass. Units follow the glTF extensions they export to. */
export type GlassParams = {
  ior: number;
  dispersion: number;
  roughness: number;
  thickness: number;
  iridescence: number;
};

export type ParamKey = keyof GlassParams;

export type ParamSpec = { key: ParamKey; label: string; short: string; min: number; max: number; step: number; unit: string };

export const PARAMS: ParamSpec[] = [
  { key: "ior", label: "Index of refraction", short: "IOR", min: 1, max: 2.4, step: 0.01, unit: "" },
  { key: "dispersion", label: "Dispersion", short: "Disp", min: 0, max: 1, step: 0.01, unit: "" },
  { key: "roughness", label: "Roughness", short: "Rough", min: 0, max: 1, step: 0.01, unit: "" },
  { key: "thickness", label: "Thickness", short: "Thick", min: 0.1, max: 4, step: 0.1, unit: "cm" },
  { key: "iridescence", label: "Iridescence", short: "Film", min: 0, max: 1, step: 0.01, unit: "" },
];

const SPEC = Object.fromEntries(PARAMS.map((p) => [p.key, p])) as Record<ParamKey, ParamSpec>;

const decimals = (step: number) => (String(step).split(".")[1] ?? "").length;

/** Clamps a value into its dial and snaps it to the dial's step. Non-numbers fall back to the minimum. */
export function snap(key: ParamKey, value: number): number {
  const { min, max, step } = SPEC[key];
  if (!Number.isFinite(value)) return min;
  const v = clamp(value, min, max);
  return Number((Math.round((v - min) / step) * step + min).toFixed(decimals(step)));
}

export function setParam(params: GlassParams, key: ParamKey, value: number): GlassParams {
  return { ...params, [key]: snap(key, value) };
}

export function formatParam(key: ParamKey, value: number): string {
  const { step, unit } = SPEC[key];
  return `${value.toFixed(decimals(step))}${unit ? ` ${unit}` : ""}`;
}

/** The Abbe number a dispersion value stands for (KHR_materials_dispersion: dispersion = 20 / V). */
export function abbe(dispersion: number): number {
  return dispersion <= 0 ? Infinity : Math.round(20 / dispersion);
}

export function sameParams(a: GlassParams, b: GlassParams): boolean {
  return PARAMS.every(({ key }) => Math.abs(a[key] - b[key]) < 1e-6);
}

/** The material as a glTF 2.0 material object, the way Cullet exports it. */
export function toGltf(params: GlassParams, name: string) {
  const ext: Record<string, Record<string, number>> = {
    KHR_materials_transmission: { transmissionFactor: 1 },
    KHR_materials_volume: { thicknessFactor: params.thickness },
    KHR_materials_ior: { ior: params.ior },
    KHR_materials_dispersion: { dispersion: params.dispersion },
  };
  if (params.iridescence > 0) {
    ext.KHR_materials_iridescence = {
      iridescenceFactor: params.iridescence,
      iridescenceIor: 1.35,
      iridescenceThicknessMinimum: 280,
      iridescenceThicknessMaximum: 680,
    };
  }
  return {
    name,
    pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: params.roughness },
    extensions: ext,
  };
}

/** How a ray bends and fans through the sampler's prism, in degrees, for the drawn poster. */
export function rayFan(params: GlassParams) {
  const bend = clamp((params.ior - 1) * 34, 0, 48);
  const spread = clamp(params.dispersion * (params.ior - 1) * 46, 0, 30);
  const blur = clamp(params.roughness * 6, 0, 6);
  return { bend, spread, blur };
}

/** A rough cost for the poster's frame readout before the live renderer measures the real one. */
export function estimateMs(params: GlassParams): number {
  const ms = 1.05 + params.dispersion * 0.55 + params.iridescence * 0.22 + params.roughness * 0.12 + params.thickness * 0.04;
  return Math.round(ms * 10) / 10;
}

/** Which line of the exported JSON a dial writes, so the readout can flash it. */
export const GLTF_KEY: Record<ParamKey, string> = {
  ior: '"ior"',
  dispersion: '"dispersion"',
  roughness: '"roughnessFactor"',
  thickness: '"thicknessFactor"',
  iridescence: '"iridescenceFactor"',
};
