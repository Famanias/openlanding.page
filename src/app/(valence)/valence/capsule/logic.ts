import type { BuyerRoleId, CaptureTierId, CompanySizeBand } from "../content/funnelData";
import { clamp, lerp, progress } from "../motion/math";

export interface UnlockedTiersState {
  splash: boolean;
  squeeze: boolean;
  "lead-gen": boolean;
}

export interface CapsuleTransformPose {
  outerLift: number;
  middleLift: number;
  coreScale: number;
  ringRotationRad: number;
  unsealFraction: number;
}

export interface TailoredBenchmarkResult {
  companySize: CompanySizeBand;
  role: BuyerRoleId;
  splashPassThrough: number;
  squeezeCvr: number;
  leadGenCvr: number;
  pipelineLift: number;
  recommendedArchitecture: string;
}

export function stageProgressFromScroll(
  scrollY: number,
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number,
): number {
  const runnable = Math.max(sectionHeight - viewportHeight, 1);
  return progress(scrollY, sectionTop, sectionTop + runnable);
}

export function tierFromProgress(p: number): CaptureTierId {
  const clamped = clamp(p, 0, 1);
  if (clamped < 0.34) return "splash";
  if (clamped < 0.67) return "squeeze";
  return "lead-gen";
}

export function computeUnlockedDepthPercent(unlocked: UnlockedTiersState): number {
  if (unlocked["lead-gen"]) return 100;
  if (unlocked.squeeze) return 70;
  if (unlocked.splash) return 40;
  return 15;
}

export function isChapterUnlocked(
  requiredTier: CaptureTierId,
  unlocked: UnlockedTiersState,
): boolean {
  if (requiredTier === "splash") return true;
  if (requiredTier === "squeeze") return unlocked.squeeze || unlocked["lead-gen"];
  return unlocked["lead-gen"];
}

export function computeCapsuleTransforms(
  activeTier: CaptureTierId,
  unlocked: UnlockedTiersState,
  scrollProgress = 0,
): CapsuleTransformPose {
  const tierFactor = activeTier === "splash" ? 0.15 : activeTier === "squeeze" ? 0.55 : 1;
  const unlockBonus =
    (unlocked.splash ? 0.15 : 0) +
    (unlocked.squeeze ? 0.25 : 0) +
    (unlocked["lead-gen"] ? 0.45 : 0);
  const blended = clamp(Math.max(tierFactor, unlockBonus, scrollProgress * 0.85), 0, 1);

  return {
    outerLift: Number(lerp(0.12, 1.15, blended).toFixed(3)),
    middleLift: Number(lerp(0.06, 0.72, blended).toFixed(3)),
    coreScale: Number(lerp(0.84, 1.18, blended).toFixed(3)),
    ringRotationRad: Number((blended * Math.PI * 1.25).toFixed(3)),
    unsealFraction: Number(blended.toFixed(3)),
  };
}

const SIZE_MODIFIERS: Record<
  CompanySizeBand,
  { splash: number; squeeze: number; lead: number; lift: number; label: string }
> = {
  "1-25": {
    splash: 79.4,
    squeeze: 44.2,
    lead: 26.8,
    lift: 2.9,
    label: "1-Field Squeeze Fast-Lane + Instant Self-Serve Benchmark",
  },
  "26-200": {
    splash: 76.1,
    squeeze: 39.8,
    lead: 23.4,
    lift: 3.3,
    label: "Cohort Splash Gate → 1-Field Squeeze → 4-Field Growth Audit",
  },
  "201-1000": {
    splash: 73.2,
    squeeze: 36.5,
    lead: 21.2,
    lift: 3.6,
    label: "Interactive Chapter Preview + 4-Field Mid-Funnel Dossier",
  },
  "1000+": {
    splash: 70.8,
    squeeze: 33.1,
    lead: 19.4,
    lift: 4.1,
    label: "Regional Compliance Splash + Multi-Stakeholder Executive Dossier",
  },
};

const ROLE_DELTAS: Record<BuyerRoleId, { squeezeDelta: number; leadDelta: number; liftDelta: number }> = {
  "vp-growth": { squeezeDelta: 1.4, leadDelta: 2.1, liftDelta: 0.3 },
  "demand-gen": { squeezeDelta: 2.2, leadDelta: 1.5, liftDelta: 0.2 },
  "product-growth": { squeezeDelta: 3.1, leadDelta: 0.8, liftDelta: 0.1 },
  founder: { squeezeDelta: 1.8, leadDelta: 2.6, liftDelta: 0.4 },
};

export function computeTailoredBenchmark(
  companySize: CompanySizeBand,
  role: BuyerRoleId,
): TailoredBenchmarkResult {
  const base = SIZE_MODIFIERS[companySize];
  const delta = ROLE_DELTAS[role];
  return {
    companySize,
    role,
    splashPassThrough: Number(base.splash.toFixed(1)),
    squeezeCvr: Number((base.squeeze + delta.squeezeDelta).toFixed(1)),
    leadGenCvr: Number((base.lead + delta.leadDelta).toFixed(1)),
    pipelineLift: Number((base.lift + delta.liftDelta).toFixed(1)),
    recommendedArchitecture: base.label,
  };
}
