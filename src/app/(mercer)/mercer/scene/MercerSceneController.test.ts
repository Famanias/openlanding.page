import { describe, expect, it, vi } from "vitest";
import { fitCameraDistance, MercerSceneController, normalizePointer } from "./MercerSceneController";

describe("Mercer scene lifecycle", () => {
  it("is safe before initialization and disposal is final and idempotent", () => {
    const controller = new MercerSceneController({ onFps: vi.fn() });
    expect(controller.getRenderer()).toBeNull();
    expect(() => {
      controller.resize(800, 600);
      controller.setPointer(0.5, -0.2);
      controller.start();
      controller.stop();
      controller.dispose();
      controller.dispose();
      controller.resize(0, 0);
      controller.setPointer(NaN, Infinity);
      controller.start();
    }).not.toThrow();
    expect(controller.getRenderer()).toBeNull();
  });

  it("clamps all pointer input including invalid values", () => {
    expect(normalizePointer(4)).toBe(1);
    expect(normalizePointer(-6)).toBe(-1);
    expect(normalizePointer(0.35)).toBe(0.35);
    expect(normalizePointer(NaN)).toBe(0);
    expect(normalizePointer(Infinity)).toBe(0);
  });

  it("fits the whole envelope on portrait and landscape canvases", () => {
    const wide = fitCameraDistance(1000, 600);
    const narrow = fitCameraDistance(360, 500);
    expect(wide).toBeGreaterThan(8);
    expect(narrow).toBeGreaterThan(wide);
    expect(Number.isFinite(fitCameraDistance(0, 0))).toBe(true);
    const horizontalHalfFov = Math.atan(Math.tan(36 * Math.PI / 360) * 360 / 500);
    expect(Math.sin(horizontalHalfFov) * narrow).toBeGreaterThanOrEqual(3.6);
  });
});
