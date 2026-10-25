import { describe, expect, it } from "vitest";
import { buildTrialPass, validateCounterForm } from "./validate";

describe("tally counter onboarding form validation", () => {
  it("flags missing shop name, invalid email, and short service note", () => {
    const result = validateCounterForm({
      shopName: "   ",
      email: "not-an-email",
      archetype: "tailor",
      plan: "workshop",
      depositPct: 50,
      serviceNote: "short",
    });

    expect(result.valid).toBe(false);
    expect(result.errors.shopName).toBe("Enter your Shopify store or workshop name.");
    expect(result.errors.email).toBe("Enter a valid merchant email address.");
    expect(result.errors.serviceNote).toBe("Describe your primary service (at least 10 characters).");
  });

  it("rejects unknown archetype or plan selections", () => {
    const result = validateCounterForm({
      shopName: "Loom & Needle",
      email: "claire@loomneedle.shop",
      archetype: "unknown" as never,
      plan: "invalid" as never,
      depositPct: 50,
      serviceNote: "Custom denim chain-stitch hemming and darning.",
    });

    expect(result.valid).toBe(false);
    expect(result.errors.archetype).toBe("Choose a service counter archetype.");
    expect(result.errors.plan).toBe("Select a merchant ledger tier.");
  });

  it("accepts valid merchant input and builds a deterministic trial pass", () => {
    const input = {
      shopName: "  Hem & Haw Atelier  ",
      email: "  marta@hemandhaw.co ",
      archetype: "tailor" as const,
      plan: "workshop" as const,
      depositPct: 50,
      serviceNote: "Selvedge chain-stitch hemming, waist tapering, and vintage jacket repairs.",
    };

    const result = validateCounterForm(input);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});

    const pass = buildTrialPass(input);
    expect(pass.passCode).toMatch(/^TLY-26-\d{4}$/);
    expect(pass.shopName).toBe("Hem & Haw Atelier");
    expect(pass.email).toBe("marta@hemandhaw.co");
    expect(pass.summaryText).toContain("Hem & Haw Atelier");
    expect(pass.summaryText).toContain("50% Deposit");
  });
});
