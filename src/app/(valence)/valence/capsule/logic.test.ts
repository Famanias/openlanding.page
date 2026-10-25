import { describe, expect, it } from "vitest";
import {
  computeCapsuleTransforms,
  computeTailoredBenchmark,
   computeUnlockedDepthPercent,
  isChapterUnlocked,
  stageProgressFromScroll,
  tierFromProgress,
} from "./logic";

describe("valence 3D capsule and benchmark logic", () => {
  it("computes clamped scroll progress across a sticky stage runway", () => {
    expect(stageProgressFromScroll(100, 200, 1200, 800)).toBe(0);
    expect(stageProgressFromScroll(400, 200, 1200, 800)).toBe(0.5);
    expect(stageProgressFromScroll(900, 200, 1200, 800)).toBe(1);
  });

  it("maps normalized progress to the three capture tiers", () => {
    expect(tierFromProgress(0)).toBe("splash");
    expect(tierFromProgress(0.25)).toBe("splash");
    expect(tierFromProgress(0.45)).toBe("squeeze");
    expect(tierFromProgress(0.85)).toBe("lead-gen");
  });

  it("calculates unlocked depth percentage monotonically from unlocked tiers", () => {
    expect(computeUnlockedDepthPercent({ splash: false, squeeze: false, "lead-gen": false })).toBe(15);
    expect(computeUnlockedDepthPercent({ splash: true, squeeze: false, "lead-gen": false })).toBe(40);
    expect(computeUnlockedDepthPercent({ splash: true, squeeze: true, "lead-gen": false })).toBe(70);
    expect(computeUnlockedDepthPercent({ splash: true, squeeze: true, "lead-gen": true })).toBe(100);
  });

  it("increases 3D ring separation as tiers progress from splash to lead-gen", () => {
    const splashPose = computeCapsuleTransforms("splash", { splash: false, squeeze: false, "lead-gen": false }, 0);
    const squeezePose = computeCapsuleTransforms("squeeze", { splash: true, squeeze: true, "lead-gen": false }, 0.5);
    const leadPose = computeCapsuleTransforms("lead-gen", { splash: true, squeeze: true, "lead-gen": true }, 1);

    expect(squeezePose.outerLift).toBeGreaterThan(splashPose.outerLift);
    expect(leadPose.middleLift).toBeGreaterThan(squeezePose.middleLift);
    expect(leadPose.coreScale).toBeGreaterThan(splashPose.coreScale);
    expect(leadPose.unsealFraction).toBe(1);
  });

  it("determines whether a gated chapter is unlocked based on visitor progress", () => {
    const baseState = { splash: true, squeeze: false, "lead-gen": false };
    expect(isChapterUnlocked("splash", baseState)).toBe(true);
    expect(isChapterUnlocked("squeeze", baseState)).toBe(false);
    expect(isChapterUnlocked("lead-gen", baseState)).toBe(false);

    const fullState = { splash: true, squeeze: false, "lead-gen": true };
    expect(isChapterUnlocked("squeeze", fullState)).toBe(true);
    expect(isChapterUnlocked("lead-gen", fullState)).toBe(true);
  });

  it("returns tailored conversion benchmarks by company size and role", () => {
    const smb = computeTailoredBenchmark("1-25", "founder");
    const enterprise = computeTailoredBenchmark("1000+", "vp-growth");
    expect(smb.squeezeCvr).not.toBe(enterprise.squeezeCvr);
    expect(enterprise.pipelineLift).toBeGreaterThan(2);
    expect(smb.recommendedArchitecture.length).toBeGreaterThan(10);
  });
});
