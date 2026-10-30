import { describe, it, expect } from "vitest";
import {
  CHAPTERS,
  computeGeodesicTrajectory,
  computeGravitationalRedshift,
  computeInspectParametersFromDrag,
  computeTimeDilation,
  interpolateTimelineState,
  projectWorldToScreen,
  screenDragToLaunchRay,
} from "./geodesicMath";

describe("geodesicMath", () => {
  it("interpolateTimelineState starts at r = 38.0 Rs in Chapter 1 and reaches Chapter 6 at progress 1.0", () => {
    const ch1 = interpolateTimelineState(0.0);
    expect(ch1.chapterIndex).toBe(0);
    expect(Math.abs(ch1.r - 38.0)).toBeLessThan(1e-4);
    expect(Math.abs(ch1.roll - -0.15)).toBeLessThan(1e-4);
    expect(ch1.jetIntensity).toBe(0.0);

    const ch3 = interpolateTimelineState(0.4);
    expect(ch3.chapterIndex).toBe(2);
    expect(Math.abs(ch3.roll - -0.32)).toBeLessThan(1e-4);
    expect(Math.abs(ch3.dopplerBoost - 1.15)).toBeLessThan(1e-4);

    const ch4 = interpolateTimelineState(0.6);
    expect(ch4.chapterIndex).toBe(3);
    expect(Math.abs(ch4.r - 1.65)).toBeLessThan(1e-4);

    const ch5 = interpolateTimelineState(0.8);
    expect(ch5.chapterIndex).toBe(4);
    expect(Math.abs(ch5.r - 1.18)).toBeLessThan(1e-4);

    const ch6 = interpolateTimelineState(1.0);
    expect(ch6.chapterIndex).toBe(5);
    expect(Math.abs(ch6.r - 18.0)).toBeLessThan(1e-4);
    expect(Math.abs(ch6.pitch - 1.42)).toBeLessThan(1e-4);
    expect(Math.abs(ch6.jetIntensity - 1.0)).toBeLessThan(1e-4);
  });

  it("computeGravitationalRedshift and computeTimeDilation increase monotonically as r approaches 1.0 Rs", () => {
    const zFar = computeGravitationalRedshift(38.0);
    const zMid = computeGravitationalRedshift(4.8);
    const zNear = computeGravitationalRedshift(1.18);

    expect(zFar).toBeGreaterThan(0.01);
    expect(zFar).toBeLessThan(0.02);
    expect(zMid).toBeGreaterThan(zFar);
    expect(zNear).toBeGreaterThan(zMid);
    expect(zNear).toBeGreaterThan(1.5);

    const gammaNear = computeTimeDilation(1.18);
    expect(gammaNear).toBeGreaterThan(2.5);
  });

  it("computeGeodesicTrajectory classifies CAPTURED, SLINGSHOT, and DEFLECTED photon paths accurately", () => {
    const startPos = { x: 0, y: 0, z: 8.0 };

    // Aimed straight into the singularity (impact parameter b = 0) -> CAPTURED
    const captured = computeGeodesicTrajectory(startPos, { x: 0, y: 0, z: -1 });
    expect(captured.outcome).toBe("CAPTURED");
    expect(captured.minRadius).toBeLessThanOrEqual(1.02);

    // Critical impact parameter grazes outside the photon sphere (b ~ 2.75 Rs) -> SLINGSHOT
    const slingshot = computeGeodesicTrajectory(startPos, { x: 0.365, y: 0, z: -1 });
    expect(slingshot.outcome).toBe("SLINGSHOT");
    expect(slingshot.minRadius).toBeGreaterThan(1.02);
    expect(slingshot.minRadius).toBeLessThan(2.95);

    // Wide angle (b ~ 4.8 Rs) -> DEFLECTED
    const deflected = computeGeodesicTrajectory(startPos, { x: 0.75, y: 0, z: -1 });
    expect(deflected.outcome).toBe("DEFLECTED");
    expect(deflected.minRadius).toBeGreaterThanOrEqual(2.95);
  });

  it("projectWorldToScreen projects the singularity (0,0,0) dead-center (0.5, 0.5) across all 6 chapters", () => {
    for (const progress of [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]) {
      const rig = interpolateTimelineState(progress);
      expect(rig.screenOffset).toEqual([0, 0]);
      expect(rig.camTarget).toEqual({ x: 0, y: 0, z: 0 });
      const proj = projectWorldToScreen({ x: 0, y: 0, z: 0 }, rig, 16 / 9);
      expect(proj.visible).toBe(true);
      expect(Math.abs(proj.x - 0.5)).toBeLessThan(1e-5);
      expect(Math.abs(proj.y - 0.5)).toBeLessThan(1e-5);
    }
  });

  it("computeInspectParametersFromDrag scrubs lensingMass [0.3..2.8] and diskOpacity [0.15..1.0]", () => {
    const center = computeInspectParametersFromDrag(0, 0, 0.1);
    expect(Math.abs(center.lensingMass - 1.5)).toBeLessThan(1e-5);
    expect(Math.abs(center.diskOpacity - 1.0)).toBeLessThan(1e-5);

    const extremeRightUp = computeInspectParametersFromDrag(1.0, 1.0, 0.1);
    expect(extremeRightUp.lensingMass).toBe(2.8);
    expect(Math.abs(extremeRightUp.diskOpacity - 0.15)).toBeLessThan(1e-5);
    expect(extremeRightUp.targetPitch).toBe(0.8);

    const extremeLeft = computeInspectParametersFromDrag(-1.0, 0, 0.1);
    expect(extremeLeft.lensingMass).toBe(0.3);
  });

  it("screenDragToLaunchRay computes positive impact parameter b", () => {
    const rig = interpolateTimelineState(0.6);
    const res = screenDragToLaunchRay(0.65, 0.45, -0.1, 0.05, rig, 16 / 9);
    expect(res.impactParameterB).toBeGreaterThan(0);
    const len = Math.hypot(res.launchDir.x, res.launchDir.y, res.launchDir.z);
    expect(Math.abs(len - 1.0)).toBeLessThan(1e-5);
    expect(CHAPTERS).toHaveLength(6);
  });
});
