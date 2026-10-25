import { describe, expect, it } from "vitest";
import {
  CAPTURE_FORMATS,
  COHORT_EDITIONS,
  REPORT_CHAPTERS,
  SOCIAL_PROOF_LOGOS,
  VALENCE_FAQS,
} from "./funnelData";

describe("valence funnel content integrity", () => {
  it("defines all three capture formats in funnel order: splash, squeeze, lead-gen", () => {
    expect(CAPTURE_FORMATS.map((f) => f.id)).toEqual(["splash", "squeeze", "lead-gen"]);
    for (const format of CAPTURE_FORMATS) {
      expect(format.title.length).toBeGreaterThan(4);
      expect(format.funnelStage.length).toBeGreaterThan(3);
      expect(format.medianCvr).toBeGreaterThan(0);
      expect(format.payoffSummary.length).toBeGreaterThan(10);
      expect(format.idealUseCases.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("provides three regional and industry cohorts for the splash gate", () => {
    expect(COHORT_EDITIONS).toHaveLength(3);
    for (const cohort of COHORT_EDITIONS) {
      expect(cohort.id).toBeTruthy();
      expect(cohort.sampleSize).toBeGreaterThan(50);
    }
  });

  it("maps each report chapter to a capture unlock tier", () => {
    expect(REPORT_CHAPTERS.length).toBeGreaterThanOrEqual(4);
    const tiers = new Set(REPORT_CHAPTERS.map((c) => c.requiredTier));
    expect(tiers.has("splash")).toBe(true);
    expect(tiers.has("squeeze")).toBe(true);
    expect(tiers.has("lead-gen")).toBe(true);
  });

  it("includes B2B social proof and governance FAQs", () => {
    expect(SOCIAL_PROOF_LOGOS.length).toBeGreaterThanOrEqual(4);
    expect(VALENCE_FAQS.length).toBeGreaterThanOrEqual(5);
  });
});
