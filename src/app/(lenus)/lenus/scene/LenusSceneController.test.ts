import { describe, expect, it, vi } from "vitest";
import { fitHeroFrustumHalfHeight, getPartTelemetry, LenusSceneController, normalizePointer } from "./LenusSceneController";

describe("LenusSceneController", () => {
  it("faces the selected housing quadrant instead of leaving far panels behind the stack",()=>{
    const c=new LenusSceneController();
    for(let i=0;i<4;i++){c.inspectPart(`housing-panel-${i}`);const view=c.getInspectionSnapshot().camera;
      expect(Math.sign(view.yaw)).toBe(i===0||i===3?1:-1);
      expect(Math.sign(Math.PI/2-view.polar)).toBe(i<2?1:-1);
    }c.dispose();
  });
  it("allows keyboard orbit past the rear inspection preset",()=>{
    const c=new LenusSceneController();c.inspectPart("rear-lens");c.rotateView(.12,0);
    expect(Math.abs(c.getInspectionSnapshot().camera.yaw-Math.PI)).toBeGreaterThan(.01);c.dispose();
  });
  it("restores an in-flight control pose without snapping to its target",()=>{
    const original=new LenusSceneController({initialAnimationTime:9});const saved=original.getInspectionSnapshot();
    saved.controls={explode:1,focus:.9,currentExplode:.6,currentFocus:.4};
    const c=new LenusSceneController({initialAnimationTime:9,initialInspectionState:saved});
    expect(c.getInspectionSnapshot().controls.currentFocus).toBeCloseTo(.4);
    expect(c.getInspectionSnapshot().controls.currentExplode).toBeCloseTo(.6);original.dispose();c.dispose();
  });
  it("preserves the hero clock and view across inspection and reconstruction",()=>{
    const c=new LenusSceneController({initialAnimationTime:8});
    expect(typeof c.setInspectionMode).toBe("function");
    const before=c.getInspectionSnapshot();c.setInspectionMode("cutaway");
    const saved=c.getInspectionSnapshot();
    expect(saved.mode).toBe("cutaway");expect(saved.hero?.elapsed).toBe(8);
    const restored=new LenusSceneController({initialAnimationTime:8,initialInspectionState:saved});
    restored.setInspectionMode("hero");expect(restored.getAnimationTime()).toBe(8);
    expect(restored.getInspectionSnapshot().camera.yaw).toBeCloseTo(before.camera.yaw,10);
    restored.resetView();expect(restored.getAnimationTime()).toBe(0);
    expect(restored.getInspectionSnapshot().mode).toBe("hero");c.dispose();restored.dispose();
  });
  it("routes manual separation and rear-part inspection into a stable interior view",()=>{
    const c=new LenusSceneController({initialAnimationTime:18});expect(typeof c.inspectPart).toBe("function");
    c.setExplodeTarget(.7);expect(c.getInspectionSnapshot().mode).toBe("cutaway");expect(c.getAnimationTime()).toBe(18);
    c.inspectPart("rear-lens");expect(c.getInspectionSnapshot().camera.yaw).toBeCloseTo(Math.PI,10);
    c.setInspectionMode("hero");expect(c.getAnimationTime()).toBe(18);c.dispose();
  });
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
    expect(fitHeroFrustumHalfHeight(1200,800)).toBeGreaterThanOrEqual(3.6);
    expect(fitHeroFrustumHalfHeight(360,640) * 360 / 640).toBeGreaterThanOrEqual(3.6);
    expect(Number.isFinite(fitHeroFrustumHalfHeight(0,0))).toBe(true);
  });
  it("maps picked model IDs to optical telemetry", () => {
    expect(getPartTelemetry("front-lens")).toEqual({ id:"front-lens",label:"EMERALD OBJECTIVE CORE",material:"DOPED FLUORITE / N=1.52",role:"Primary chromatic-dispersion singlet with internal 520nm fluorescence" });
    expect(getPartTelemetry(null).id).toBe("assembly");
    expect(getPartTelemetry("rear-fins").label).toContain("FINS");
  });
});
