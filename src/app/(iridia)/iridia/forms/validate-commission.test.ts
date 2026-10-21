import { describe, it, expect } from "vitest";
import { validateCommissionForm, type CommissionFormData } from "./validate-commission";

describe("Commission Form Validation", () => {
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const getPastDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 5);
    return d.toISOString().split("T")[0];
  };

  it("validates valid commission request successfully", () => {
    const data: CommissionFormData = {
      fullName: "Elena Rostova",
      email: "elena@arch-zurich.ch",
      installationScale: "pavilion",
      wavelengthBand: "solar",
      targetDate: getTomorrowDate(),
      notes: "12m glass prism installation for autumn biennale.",
    };

    const res = validateCommissionForm(data);
    expect(res.isValid).toBe(true);
    expect(Object.keys(res.errors)).toHaveLength(0);
  });

  it("flags missing or short name", () => {
    const data: CommissionFormData = {
      fullName: " ",
      email: "elena@arch.ch",
      installationScale: "gallery",
      wavelengthBand: "laser",
      targetDate: getTomorrowDate(),
    };
    const res = validateCommissionForm(data);
    expect(res.isValid).toBe(false);
    expect(res.errors.fullName).toBeDefined();
  });

  it("flags invalid email format", () => {
    const data: CommissionFormData = {
      fullName: "Marcus Vance",
      email: "not-an-email",
      installationScale: "monumental",
      wavelengthBand: "broadband",
      targetDate: getTomorrowDate(),
    };
    const res = validateCommissionForm(data);
    expect(res.isValid).toBe(false);
    expect(res.errors.email).toBeDefined();
  });

  it("flags missing scale or wavelength selections", () => {
    const data: CommissionFormData = {
      fullName: "Marcus Vance",
      email: "marcus@vance.com",
      installationScale: "",
      wavelengthBand: "",
      targetDate: getTomorrowDate(),
    };
    const res = validateCommissionForm(data);
    expect(res.isValid).toBe(false);
    expect(res.errors.installationScale).toBeDefined();
    expect(res.errors.wavelengthBand).toBeDefined();
  });

  it("flags past dates", () => {
    const data: CommissionFormData = {
      fullName: "Marcus Vance",
      email: "marcus@vance.com",
      installationScale: "digital",
      wavelengthBand: "auroral",
      targetDate: getPastDate(),
    };
    const res = validateCommissionForm(data);
    expect(res.isValid).toBe(false);
    expect(res.errors.targetDate).toBeDefined();
  });
});
