import { describe, expect, it } from "vitest";
import {
  mintDossierKey,
  mintSqueezePassCode,
  validateLeadCaptureForm,
  validateSqueezeEmail,
} from "./validation";

describe("valence form validation and key minting", () => {
  it("validates minimalist squeeze email addresses", () => {
    expect(validateSqueezeEmail("")).toBe("Enter your work email to unlock the 14-page digest.");
    expect(validateSqueezeEmail("invalid-email")).toBe("Enter a valid email address (e.g. alex@company.com).");
    expect(validateSqueezeEmail("alex@valence.io")).toBeNull();
  });

  it("mints a deterministic squeeze pass code from email and cohort", () => {
    const a = mintSqueezePassCode("alex@valence.io", "na-enterprise");
    const b = mintSqueezePassCode("ALEX@valence.io ", "na-enterprise");
    expect(a).toBe(b);
    expect(a).toMatch(/^SQ-26-[0-9]{4}$/);
  });

  it("validates multi-field B2B lead capture inputs", () => {
    const emptyErrors = validateLeadCaptureForm({
      fullName: " ",
      workEmail: "bad",
      companyName: "",
      companySize: "201-1000",
      role: "vp-growth",
    });
    expect(emptyErrors.fullName).toBe("Add your full name.");
    expect(emptyErrors.workEmail).toBe("Enter a valid work email address.");
    expect(emptyErrors.companyName).toBe("Add your company or team name.");

    const validErrors = validateLeadCaptureForm({
      fullName: "Elena Vance",
      workEmail: "elena@acmecloud.io",
      companyName: "Acme Cloud",
      companySize: "201-1000",
      role: "vp-growth",
    });
    expect(Object.keys(validErrors)).toHaveLength(0);
  });

  it("mints a deterministic B2B dossier access key", () => {
    const key1 = mintDossierKey({
      fullName: "Elena Vance",
      workEmail: "elena@acmecloud.io",
      companyName: "Acme Cloud",
      companySize: "201-1000",
      role: "vp-growth",
    });
    const key2 = mintDossierKey({
      fullName: "Elena Vance",
      workEmail: "ELENA@acmecloud.io",
      companyName: "Acme Cloud",
      companySize: "201-1000",
      role: "vp-growth",
    });
    expect(key1).toBe(key2);
    expect(key1).toMatch(/^VL-2026-[0-9]{4}$/);
  });
});
