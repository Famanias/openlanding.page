import { describe, expect, it } from "vitest";
import { FORMS } from "./forms";
import { GLAZES } from "./glazes";
import { LUMP, PARAM_LIMITS, clampParam, sampleProfile, specOf, throwParams, volumeMl, type ParamKey } from "./profile";
import { INITIAL_STATE, vesselReducer } from "./state";

describe("profile sampling", () => {
  it("returns the requested sample count with strictly increasing height", () => {
    const profile = sampleProfile(FORMS[0].params, 40);
    expect(profile).toHaveLength(40);
    expect(profile[0].y).toBe(0);
    expect(profile[39].y).toBe(1);
    for (let i = 1; i < profile.length; i++) expect(profile[i].y).toBeGreaterThan(profile[i - 1].y);
  });

  it("hits the control radii at the control heights' ends", () => {
    const params = FORMS[1].params;
    const profile = sampleProfile(params, 41);
    expect(profile[0].r).toBeCloseTo(params.foot, 5);
    expect(profile[40].r).toBeCloseTo(params.lip, 5);
  });

  it("keeps every radius positive for every form", () => {
    for (const form of FORMS) for (const point of sampleProfile(form.params, 60)) expect(point.r).toBeGreaterThan(0);
  });

  it("rejects fewer than two samples", () => {
    expect(() => sampleProfile(FORMS[0].params, 1)).toThrow(RangeError);
  });
});

describe("vessel spec", () => {
  it("grows in volume with height", () => {
    const short = volumeMl({ ...FORMS[0].params, height: 0.2 });
    const tall = volumeMl({ ...FORMS[0].params, height: 0.9 });
    expect(tall).toBeGreaterThan(short);
  });

  it("reports sane dimensions", () => {
    const spec = specOf(FORMS[0].params);
    expect(spec.heightCm).toBeGreaterThanOrEqual(12);
    expect(spec.heightCm).toBeLessThanOrEqual(38);
    expect(spec.widthCm).toBeGreaterThan(0);
    expect(spec.volumeMl).toBeGreaterThan(0);
  });
});

describe("throw blend", () => {
  it("starts at the lump, ends at the target and clamps", () => {
    const target = FORMS[1].params;
    expect(throwParams(target, 0)).toEqual(LUMP);
    expect(throwParams(target, 1)).toEqual(target);
    expect(throwParams(target, 5)).toEqual(target);
    expect(throwParams(target, -5)).toEqual(LUMP);
  });
});

describe("vessel reducer", () => {
  it("clamps parameters and detaches from the preset form", () => {
    const next = vesselReducer(INITIAL_STATE, { type: "set", key: "belly", value: 9 });
    expect(next.params.belly).toBe(PARAM_LIMITS.belly.max);
    expect(next.formId).toBeNull();
  });

  it("ignores non-finite values and unknown ids", () => {
    expect(vesselReducer(INITIAL_STATE, { type: "set", key: "neck", value: Number.NaN })).toBe(INITIAL_STATE);
    expect(vesselReducer(INITIAL_STATE, { type: "form", id: "nope" })).toBe(INITIAL_STATE);
    expect(vesselReducer(INITIAL_STATE, { type: "glaze", id: "nope" })).toBe(INITIAL_STATE);
  });

  it("loads a form with its default glaze, and resets", () => {
    const loaded = vesselReducer(INITIAL_STATE, { type: "form", id: "tea-bowl" });
    expect(loaded.params).toEqual(FORMS[2].params);
    expect(loaded.glazeId).toBe("tenmoku");
    expect(vesselReducer(loaded, { type: "reset" })).toEqual(INITIAL_STATE);
  });

  it("only accepts known glazes", () => {
    for (const glaze of GLAZES) expect(vesselReducer(INITIAL_STATE, { type: "glaze", id: glaze.id }).glazeId).toBe(glaze.id);
  });

  it("every form respects the parameter limits", () => {
    for (const form of FORMS) {
      for (const key of Object.keys(form.params) as ParamKey[]) expect(clampParam(key, form.params[key])).toBe(form.params[key]);
    }
  });
});
