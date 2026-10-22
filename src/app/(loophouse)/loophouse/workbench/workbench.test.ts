import { describe, it, expect } from "vitest";
import {
  TOOLS,
  PROJECT_KITS,
  HOST_DEPOTS,
  filterToolsByCategory,
  calculateRequisitionTotals,
} from "./workbench-data";

describe("loophouse workbench catalog and calculations", () => {
  it("contains complete tool items with all calibrated trade specs", () => {
    expect(TOOLS.length).toBeGreaterThanOrEqual(6);
    for (const tool of TOOLS) {
      expect(tool.id).toBeTruthy();
      expect(tool.name).toBeTruthy();
      expect(tool.model).toBeTruthy();
      expect(tool.serial).toMatch(/^LH-/);
      expect(tool.power).toBeTruthy();
      expect(tool.tolerance).toBeTruthy();
      expect(tool.standardDailyFee).toBeGreaterThan(0);
    }
  });

  it("filters tools correctly by trade discipline", () => {
    const all = filterToolsByCategory(TOOLS, "all");
    expect(all).toHaveLength(TOOLS.length);

    const wood = filterToolsByCategory(TOOLS, "woodworking");
    expect(wood.length).toBeGreaterThan(0);
    expect(wood.every((t) => t.category === "woodworking")).toBe(true);

    const metal = filterToolsByCategory(TOOLS, "metal");
    expect(metal.every((t) => t.category === "metal")).toBe(true);

    const cordless = filterToolsByCategory(TOOLS, "cordless");
    expect(cordless.every((t) => t.category === "cordless")).toBe(true);
  });

  it("calculates requisition fees correctly: member is always $0", () => {
    const selected = [TOOLS[0], TOOLS[1]];
    const memberTotal = calculateRequisitionTotals(selected, 5, true);

    expect(memberTotal.count).toBe(2);
    expect(memberTotal.days).toBe(5);
    expect(memberTotal.fee).toBe(0);
    expect(memberTotal.isFreeForMember).toBe(true);
  });

  it("calculates requisition fees correctly: non-member pays daily fee sum times days", () => {
    const selected = [TOOLS[0], TOOLS[1]]; // fees: 14 + 16 = 30 per day
    const nonMemberTotal = calculateRequisitionTotals(selected, 3, false);

    expect(nonMemberTotal.count).toBe(2);
    expect(nonMemberTotal.days).toBe(3);
    expect(nonMemberTotal.fee).toBe((TOOLS[0].standardDailyFee + TOOLS[1].standardDailyFee) * 3);
    expect(nonMemberTotal.isFreeForMember).toBe(false);
  });

  it("clamps loan days safely between 1 and 14 days", () => {
    const selected = [TOOLS[0]];
    const under = calculateRequisitionTotals(selected, 0, false);
    expect(under.days).toBe(1);

    const over = calculateRequisitionTotals(selected, 30, false);
    expect(over.days).toBe(14);
  });

  it("validates project kit manifests and host depot data", () => {
    expect(PROJECT_KITS).toHaveLength(4);
    for (const kit of PROJECT_KITS) {
      expect(kit.toolsIncluded.length).toBeGreaterThan(0);
      expect(kit.code).toMatch(/^KIT-/);
      expect(kit.loanDays).toBeGreaterThan(0);
    }

    expect(HOST_DEPOTS).toHaveLength(3);
    for (const depot of HOST_DEPOTS) {
      expect(depot.shelfBays).toBeGreaterThan(0);
      expect(depot.address).toBeTruthy();
    }
  });
});
