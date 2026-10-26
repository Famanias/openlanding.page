import { describe, expect, it } from "vitest";
import { MATERIALS } from "../content/materials";
import { abbe, estimateMs, formatParam, GLTF_KEY, PARAMS, rayFan, sameParams, setParam, snap, toGltf } from "./params";

const crown = MATERIALS[0].params;

describe("glass dials", () => {
  it("clamps and snaps to each dial's step", () => {
    expect(snap("ior", 3)).toBe(2.4);
    expect(snap("ior", 0.2)).toBe(1);
    expect(snap("ior", 1.5234)).toBe(1.52);
    expect(snap("thickness", 1.26)).toBe(1.3);
    expect(snap("dispersion", Number.NaN)).toBe(0);
  });

  it("sets one dial without touching the others", () => {
    const next = setParam(crown, "roughness", 0.5);
    expect(next.roughness).toBe(0.5);
    expect(next.ior).toBe(crown.ior);
    expect(crown.roughness).not.toBe(0.5);
  });

  it("formats with the dial's precision and unit", () => {
    expect(formatParam("ior", 1.5)).toBe("1.50");
    expect(formatParam("thickness", 1.2)).toBe("1.2 cm");
  });

  it("converts dispersion to an Abbe number", () => {
    expect(abbe(0.34)).toBe(59);
    expect(abbe(0)).toBe(Infinity);
  });

  it("compares parameter sets", () => {
    expect(sameParams(crown, { ...crown })).toBe(true);
    expect(sameParams(crown, setParam(crown, "ior", 1.6))).toBe(false);
  });

  it("exports a glTF material with the KHR extensions", () => {
    const gltf = toGltf(crown, "crown-silica");
    expect(gltf.pbrMetallicRoughness.roughnessFactor).toBe(crown.roughness);
    expect(gltf.extensions.KHR_materials_ior.ior).toBe(crown.ior);
    expect(gltf.extensions.KHR_materials_dispersion.dispersion).toBe(crown.dispersion);
    expect(gltf.extensions.KHR_materials_volume.thicknessFactor).toBe(crown.thickness);
    expect("KHR_materials_iridescence" in gltf.extensions).toBe(crown.iridescence > 0);
    expect(toGltf({ ...crown, iridescence: 0.5 }, "x").extensions.KHR_materials_iridescence.iridescenceFactor).toBe(0.5);
  });

  it("bends further with IOR and fans wider with dispersion", () => {
    const base = rayFan(crown);
    expect(rayFan({ ...crown, ior: 2 }).bend).toBeGreaterThan(base.bend);
    expect(rayFan({ ...crown, dispersion: 1 }).spread).toBeGreaterThan(base.spread);
    expect(rayFan({ ...crown, dispersion: 0 }).spread).toBe(0);
    expect(rayFan({ ...crown, ior: 1 }).bend).toBe(0);
  });

  it("ships presets that sit inside every dial", () => {
    for (const m of MATERIALS) {
      for (const p of PARAMS) {
        expect(m.params[p.key]).toBe(snap(p.key, m.params[p.key]));
      }
    }
  });

  it("costs more with dispersion and film, in tenths of a millisecond", () => {
    const base = estimateMs(crown);
    expect(estimateMs({ ...crown, dispersion: 1, iridescence: 1 })).toBeGreaterThan(base);
    expect(Math.round(base * 10) / 10).toBe(base);
  });

  it("names a JSON key for every dial that the export actually writes", () => {
    const json = JSON.stringify(toGltf({ ...crown, iridescence: 0.4 }, "x"));
    for (const p of PARAMS) expect(json).toContain(GLTF_KEY[p.key]);
  });
});
