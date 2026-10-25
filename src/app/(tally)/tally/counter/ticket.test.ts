import { describe, expect, it } from "vitest";
import {
  activeStopIndex,
  calculateLedgerRecovery,
  calculateTicketBreakdown,
  formatTicketSerial,
  isStubDetached,
  runwayProgress,
  stopLocalProgress,
} from "./ticket";

describe("tally service ticket & counter ledger logic", () => {
  it("computes runway progress across a pinned section", () => {
    expect(runwayProgress(200, 500, 2500, 900)).toBe(0);
    expect(runwayProgress(1300, 500, 2500, 900)).toBe(0.5);
    expect(runwayProgress(2500, 500, 2500, 900)).toBe(1);
  });

  it("maps overall progress to active stop index (0..3) and stop local progress", () => {
    expect(activeStopIndex(0, 4)).toBe(0);
    expect(activeStopIndex(0.24, 4)).toBe(0);
    expect(activeStopIndex(0.26, 4)).toBe(1);
    expect(activeStopIndex(0.52, 4)).toBe(2);
    expect(activeStopIndex(0.85, 4)).toBe(3);
    expect(activeStopIndex(1, 4)).toBe(3);

    expect(stopLocalProgress(0.125, 0, 4)).toBeCloseTo(0.5, 3);
    expect(stopLocalProgress(0.625, 2, 4)).toBeCloseTo(0.5, 3);
    expect(stopLocalProgress(0.1, 2, 4)).toBe(0);
  });

  it("detaches the customer claim stub at the 0.78 threshold or when manually detached", () => {
    expect(isStubDetached(0.4, false)).toBe(false);
    expect(isStubDetached(0.77, false)).toBe(false);
    expect(isStubDetached(0.78, false)).toBe(true);
    expect(isStubDetached(0.2, true)).toBe(true);
  });

  it("calculates deposit due now and pickup balance accurately", () => {
    const breakdown = calculateTicketBreakdown(80, 50, 20);
    expect(breakdown.total).toBe(100);
    expect(breakdown.depositDueNow).toBe(50);
    expect(breakdown.balanceAtPickup).toBe(50);
    expect(breakdown.noShowProtection).toBe("94% show rate");
  });

  it("formats deterministic ticket serial numbers", () => {
    expect(formatTicketSerial("tailor", 0, 50)).toBe("TLY-26-1050");
    expect(formatTicketSerial("watch", 2, 25)).toBe("TLY-26-4225");
  });

  it("calculates monthly revenue recovery and recommends the matching merchant tier", () => {
    const small = calculateLedgerRecovery(12, 65, 50);
    expect(small.monthlyBookings).toBe(48);
    expect(small.monthlyVolume).toBe(3120);
    expect(small.depositFloatCollected).toBe(1560);
    expect(small.recoveredMonthlyRevenue).toBeGreaterThan(200);
    expect(small.recommendedPlan).toBe("counter");

    const medium = calculateLedgerRecovery(35, 90, 50);
    expect(medium.recommendedPlan).toBe("workshop");

    const large = calculateLedgerRecovery(85, 120, 50);
    expect(large.recommendedPlan).toBe("guild");
  });
});
