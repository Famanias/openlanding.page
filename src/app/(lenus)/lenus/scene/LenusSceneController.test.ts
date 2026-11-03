import { describe, expect, it, vi } from "vitest";
import { fitHeroFrustumHalfHeight, getPartTelemetry, LenusSceneController, normalizePointer } from "./LenusSceneController";

describe("LenusSceneController", () => {
  it("retains a supplied animation clock across renderer reconstruction",()=>{
    const c=new LenusSceneController({initialAnimationTime:7.5});
    expect(c.getAnimationTime()).toBe(7.5);
    c.dispose();
    const restored=new LenusSceneController({initialAnimationTime:c.getAnimationTime()});
    expect(restored.getAnimationTime()).toBe(7.5);
    restored.dispose();
  });
  it("retains adaptive resolution within its 75–100 percent bounds",()=>{
    const saved=new LenusSceneController({initialResolutionScale:.85});
    expect(saved.getResolutionScale()).toBe(.85);saved.dispose();
    const bounded=new LenusSceneController({initialResolutionScale:.2});
    expect(bounded.getResolutionScale()).toBe(.75);bounded.dispose();
  });
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
