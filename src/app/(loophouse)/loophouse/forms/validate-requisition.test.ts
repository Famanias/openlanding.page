import { describe, it, expect } from "vitest";
import { validateRequisition, type RequisitionFormData } from "./validate-requisition";

describe("validateRequisition", () => {
  const validData: RequisitionFormData = {
    memberName: "Alex Mercer (LH-482)",
    memberEmail: "alex.mercer@craftguild.org",
    tradeDiscipline: "woodworking",
    loanDuration: 4,
    workshopInductionCertified: true,
    notes: "Building birch plywood cabinetry carcasses.",
  };

  it("passes with complete valid data", () => {
    const result = validateRequisition(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("requires valid member name of at least 2 characters", () => {
    const result = validateRequisition({ ...validData, memberName: " " });
    expect(result.isValid).toBe(false);
    expect(result.errors.memberName).toBeDefined();
  });

  it("requires a properly formatted email", () => {
    const result = validateRequisition({ ...validData, memberEmail: "not-an-email" });
    expect(result.isValid).toBe(false);
    expect(result.errors.memberEmail).toBeDefined();
  });

  it("requires a trade discipline selection", () => {
    const result = validateRequisition({ ...validData, tradeDiscipline: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.tradeDiscipline).toBeDefined();
  });

  it("enforces loan duration between 1 and 14 days", () => {
    const tooShort = validateRequisition({ ...validData, loanDuration: 0 });
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errors.loanDuration).toBeDefined();

    const tooLong = validateRequisition({ ...validData, loanDuration: 15 });
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errors.loanDuration).toBeDefined();
  });

  it("requires workshop induction safety certification", () => {
    const result = validateRequisition({ ...validData, workshopInductionCertified: false });
    expect(result.isValid).toBe(false);
    expect(result.errors.workshopInductionCertified).toBeDefined();
  });

  it("caps project notes at 400 characters", () => {
    const longNotes = "x".repeat(405);
    const result = validateRequisition({ ...validData, notes: longNotes });
    expect(result.isValid).toBe(false);
    expect(result.errors.notes).toBeDefined();
  });
});
