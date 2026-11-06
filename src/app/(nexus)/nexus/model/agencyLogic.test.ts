import { describe, it, expect } from "vitest";
import {
  filterWorkProjects,
  nextTestimonialIndex,
  computeProcessMilestoneState,
  validateBriefInput,
  buildMailtoHref,
  type WorkProject,
} from "./agencyLogic";

const sampleProjects: WorkProject[] = [
  {
    id: "solstice",
    title: "Field Notes for Slow Mornings",
    client: "Solstice Apothecary",
    category: "brand",
    categoryLabel: "Brand World",
    year: "2026",
    metric: "+164% Direct Repeat Orders in 5 Months",
    summary: "Tactile packaging and botanical almanac.",
    challenge: "Stand out in a clinical skincare category.",
    outcome: "Built a warm analog brand world.",
    deliverables: ["Brand Strategy", "Packaging"],
  },
  {
    id: "loom",
    title: "The Living Thread Almanac",
    client: "Loom & Meadow",
    category: "campaigns",
    categoryLabel: "Campaigns",
    year: "2025",
    metric: "+210% Organic Story Shares Across 8 Weeks",
    summary: "Seasonal print-and-film campaign.",
    challenge: "Explain regenerative wool sourcing without jargon.",
    outcome: "Turned supply chain notes into illustrated stories.",
    deliverables: ["Campaign Creative", "Short Film"],
  },
  {
    id: "kith",
    title: "Table for Everyone",
    client: "Kith & Kin Roasters",
    category: "experiences",
    categoryLabel: "Experiences",
    year: "2026",
    metric: "+138% Subscription Retention Over 6 Months",
    summary: "Interactive tasting journal and web store.",
    challenge: "Make digital coffee subscriptions feel like a neighborhood cafe.",
    outcome: "Designed a tactile tasting wheel and letterpress mailers.",
    deliverables: ["Web Experience", "Editorial Content"],
  },
];

describe("agencyLogic", () => {
  it("filterWorkProjects returns all projects when category is all", () => {
    const res = filterWorkProjects(sampleProjects, "all");
    expect(res).toHaveLength(3);
  });

  it("filterWorkProjects filters by specific category accurately", () => {
    const brandOnly = filterWorkProjects(sampleProjects, "brand");
    expect(brandOnly).toHaveLength(1);
    expect(brandOnly[0].id).toBe("solstice");

    const expOnly = filterWorkProjects(sampleProjects, "experiences");
    expect(expOnly).toHaveLength(1);
    expect(expOnly[0].id).toBe("kith");
  });

  it("nextTestimonialIndex wraps around cleanly in both directions", () => {
    expect(nextTestimonialIndex(0, "prev", 3)).toBe(2);
    expect(nextTestimonialIndex(2, "next", 3)).toBe(0);
    expect(nextTestimonialIndex(1, "next", 3)).toBe(2);
    expect(nextTestimonialIndex(0, "next", 0)).toBe(0);
  });

  it("computeProcessMilestoneState tracks vine progress and active chapter", () => {
    const start = computeProcessMilestoneState(0.0, 4);
    expect(start.activeChapterIndex).toBe(0);
    expect(start.reachedChapters).toEqual([false, false, false, false]);

    const mid = computeProcessMilestoneState(0.5, 4);
    expect(mid.activeChapterIndex).toBe(1);
    expect(mid.reachedChapters).toEqual([true, true, false, false]);

    const full = computeProcessMilestoneState(0.95, 4);
    expect(full.activeChapterIndex).toBe(3);
    expect(full.reachedChapters).toEqual([true, true, true, true]);
  });

  it("validateBriefInput catches empty and malformed fields and passes valid input", () => {
    const invalid = validateBriefInput({
      name: "A",
      email: "not-an-email",
      company: "",
      scopes: [],
      message: "Too short",
    });
    expect(invalid.valid).toBe(false);
    expect(invalid.errors.name).toBeTruthy();
    expect(invalid.errors.email).toBeTruthy();
    expect(invalid.errors.message).toBeTruthy();

    const valid = validateBriefInput({
      name: "Clara Vance",
      email: "clara@example.com",
      company: "Solstice",
      scopes: ["Brand Strategy"],
      message: "We want to build a warm tactile brand.",
    });
    expect(valid.valid).toBe(true);
    expect(Object.keys(valid.errors)).toHaveLength(0);
  });

  it("buildMailtoHref constructs clean mailto url", () => {
    const href = buildMailtoHref({
      name: "Clara Vance",
      email: "clara@example.com",
      company: "Solstice",
      scopes: ["Brand Strategy", "Packaging"],
      message: "Looking forward to partnering.",
    });
    expect(href).toContain("mailto:hello@nexus-studio.example");
    expect(href).toContain("Project%20Seed%20from%20Clara%20Vance");
  });
});
