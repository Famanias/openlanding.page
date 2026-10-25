import { clamp, progress as calcProgress } from "../motion/math";

export type ArchetypeId = "tailor" | "cycle" | "kiln" | "watch";
export type PlanId = "counter" | "workshop" | "guild";

export const STUB_DETACH_THRESHOLD = 0.78;

const ARCHETYPE_DIGITS: Record<ArchetypeId, number> = {
  tailor: 1,
  cycle: 2,
  kiln: 3,
  watch: 4,
};

export function runwayProgress(scrollY: number, top: number, height: number, vh: number): number {
  const span = Math.max(height - vh, 1);
  return calcProgress(scrollY, top, top + span);
}

export function activeStopIndex(progress: number, stopCount = 4): number {
  const safeCount = Math.max(1, stopCount);
  const p = clamp(progress, 0, 1);
  return clamp(Math.floor(p * safeCount), 0, safeCount - 1);
}

export function stopLocalProgress(progress: number, index: number, stopCount = 4): number {
  const safeCount = Math.max(1, stopCount);
  const start = index / safeCount;
  const end = (index + 1) / safeCount;
  return calcProgress(clamp(progress, 0, 1), start, end);
}

export function isStubDetached(progress: number, manualDetached = false): boolean {
  return Boolean(manualDetached) || clamp(progress, 0, 1) >= STUB_DETACH_THRESHOLD;
}

export type TicketBreakdown = {
  total: number;
  depositDueNow: number;
  balanceAtPickup: number;
  noShowProtection: string;
};

export function calculateTicketBreakdown(
  basePrice: number,
  depositPct: number,
  addOnTotal = 0
): TicketBreakdown {
  const safeBase = Math.max(0, basePrice);
  const safeAddOn = Math.max(0, addOnTotal);
  const safePct = clamp(depositPct, 0, 100);
  const total = Math.round(safeBase + safeAddOn);
  const depositDueNow = Math.round((total * safePct) / 100);
  const balanceAtPickup = Math.max(0, total - depositDueNow);
  const showRate = safePct >= 100 ? 98 : safePct >= 50 ? 94 : safePct >= 25 ? 89 : 76;

  return {
    total,
    depositDueNow,
    balanceAtPickup,
    noShowProtection: `${showRate}% show rate`,
  };
}

export function formatTicketSerial(
  archetypeCode: ArchetypeId,
  slotIndex: number,
  depositPct: number
): string {
  const prefixDigit = ARCHETYPE_DIGITS[archetypeCode] ?? 1;
  const slotDigit = clamp(Math.round(slotIndex), 0, 9);
  const pctDigits = String(clamp(Math.round(depositPct), 0, 99)).padStart(2, "0");
  return `TLY-26-${prefixDigit}${slotDigit}${pctDigits}`;
}

export type LedgerRecovery = {
  monthlyBookings: number;
  monthlyVolume: number;
  depositFloatCollected: number;
  recoveredMonthlyRevenue: number;
  recommendedPlan: PlanId;
};

export function calculateLedgerRecovery(
  weeklyBookings: number,
  avgTicketPrice: number,
  depositPct: number
): LedgerRecovery {
  const safeWeekly = clamp(Math.round(weeklyBookings), 1, 500);
  const safePrice = clamp(Math.round(avgTicketPrice), 10, 2000);
  const safeDeposit = clamp(Math.round(depositPct), 0, 100);

  const monthlyBookings = safeWeekly * 4;
  const monthlyVolume = monthlyBookings * safePrice;
  const depositFloatCollected = Math.round((monthlyVolume * safeDeposit) / 100);

  // Typical un-deposited service no-show loss is ~14%; deposits recover 65%–88% of that loss.
  const baselineLoss = monthlyVolume * 0.14;
  const recoveryFactor = safeDeposit >= 50 ? 0.82 : safeDeposit >= 25 ? 0.68 : 0.35;
  const recoveredMonthlyRevenue = Math.round(baselineLoss * recoveryFactor);

  const recommendedPlan: PlanId =
    safeWeekly <= 20 ? "counter" : safeWeekly <= 60 ? "workshop" : "guild";

  return {
    monthlyBookings,
    monthlyVolume,
    depositFloatCollected,
    recoveredMonthlyRevenue,
    recommendedPlan,
  };
}
