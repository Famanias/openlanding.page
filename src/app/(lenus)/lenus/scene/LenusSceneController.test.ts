import { describe, expect, it, vi } from "vitest";
import { fitHeroFrustumHalfHeight, getPartTelemetry, LenusSceneController, normalizePointer } from "./LenusSceneController";

describe("LenusSceneController", () => {
  it("guards calls before initialization and after repeated disposal", () => {
    const c = new LenusSceneController({ onFps: vi.fn() });
    expect(c.getRenderer()).toBeNull();
    expect(() => {
      c.resize(1200, 800); c.setPointer(.4, -.3); c.setExplodeTarget(.8);
      c.setFocusTarget(1.2); c.rotateView(1, -1); c.resetView(); c.start(); c.stop();
      c.dispose(); c.dispose(); c.setPointer(NaN, Infinity); c.setExplodeTarget(NaN);
    }).not.toThrow();
    expect(c.getRenderer()).toBeNull();
  });
  it("bounds pointer input and fits the full ring in landscape and portrait stages", () => {
    expect(normalizePointer(3.5)).toBe(1);
    expect(normalizePointer(-2)).toBe(-1);
    expect(normalizePointer(NaN)).toBe(0);
    expect(fitHeroFrustumHalfHeight(1200,800)).toBeCloseTo(2.75,2);
    expect(fitHeroFrustumHalfHeight(360,640) * 360 / 640).toBeGreaterThanOrEqual(2.75);
    expect(Number.isFinite(fitHeroFrustumHalfHeight(0,0))).toBe(true);
  });
  it("maps picked model IDs to optical telemetry", () => {
    expect(getPartTelemetry("front-lens")).toEqual({ id:"front-lens",label:"EMERALD OBJECTIVE CORE",material:"DOPED FLUORITE / N=1.52",role:"Primary chromatic-dispersion singlet with internal 520nm fluorescence" });
    expect(getPartTelemetry(null).id).toBe("assembly");
    expect(getPartTelemetry("rear-fins").label).toContain("FINS");
  });
});
