import { describe, expect, it } from "vitest";
import { TEMPLATES, type TemplateItem } from "../../data/templates";
import {
  buildHowToSteps, buildTemplateFaq, DETAIL_DESCRIPTION_MAX, DETAIL_TITLE_MAX, detailDescription, detailHeading, detailSummary,
  detailTitle, findTemplate, formatCreatedDate, formatStack, relatedTemplates, templatePlatform,
} from "./detail-content";

const calder = TEMPLATES.find(t => t.slug === "calder")!;
const sample = (patch: Partial<TemplateItem>): TemplateItem => ({ ...calder, ...patch });

describe("detailTitle", () => {
  it("keeps the stack and license note when it fits", () => {
    expect(detailTitle(sample({ title: "Mio", industry: "Art" }))).toBe("Mio: free Art landing page template (Next.js, MIT)");
  });

  it("drops the stack note and brand before the keyword when the title is long", () => {
    expect(detailTitle(calder)).toBe("CALDER & ROWE: free Law & Advisory landing page template");
  });

  it("names HTML for static-HTML templates", () => {
    expect(detailTitle(sample({ title: "Nema", industry: "Art", stack: "HTML · CSS · JavaScript" }))).toContain("(HTML, MIT)");
  });

  it("falls back to the primary category when the industry is too long", () => {
    const t = sample({ title: "VALENCE", industry: "B2B Lead Generation & Funnel Intelligence and More", category: "saas" });
    expect(detailTitle(t)).toBe("VALENCE: free SaaS landing page template (Next.js, MIT)");
  });

  it("is unique, keyword-bearing and within the limit for nearly every public template", () => {
    const titles = TEMPLATES.map(detailTitle);
    expect(new Set(titles).size).toBe(titles.length);
    for (const title of titles) expect(title).toContain("landing page template");
    const over = titles.filter(title => title.length > DETAIL_TITLE_MAX);
    expect(over.length).toBeLessThanOrEqual(2);
  });
});

describe("copy", () => {
  it("formats the stack as a readable list", () => {
    expect(formatStack("Next.js 16 · Tailwind v4 · React 19 · SVG · Lenis")).toBe("Next.js 16, Tailwind v4, React 19, SVG and Lenis");
    expect(formatStack("HTML")).toBe("HTML");
    expect(templatePlatform({ stack: "HTML · CSS · JavaScript" })).toBe("HTML");
  });

  it("opens with an answer-first summary and heading", () => {
    expect(detailHeading(calder)).toBe("CALDER & ROWE landing page template");
    expect(detailSummary(calder)).toBe("CALDER & ROWE is a free, MIT-licensed Law & Advisory landing page template built with Next.js 16, Tailwind v4, React 19, SVG and Lenis.");
  });

  it("builds meta descriptions that start with the summary and fit 160 characters", () => {
    for (const t of TEMPLATES) {
      const description = detailDescription(t);
      expect(description.length, t.slug).toBeLessThanOrEqual(DETAIL_DESCRIPTION_MAX);
      expect(description.startsWith(`${t.title} is a free, MIT-licensed`) || description.endsWith("…"), t.slug).toBe(true);
    }
    expect(detailDescription(sample({ title: "Mio", industry: "Art", stack: "Next.js", description: "Tiny worlds. More text." })))
      .toBe("Mio is a free, MIT-licensed Art landing page template built with Next.js. Tiny worlds. Live demo, AI rebuild prompt and HTML download.");
  });

  it("finds public templates only", () => {
    expect(findTemplate(TEMPLATES, "calder")?.title).toBe("CALDER & ROWE");
    expect(findTemplate(TEMPLATES, "category")).toBeUndefined();
  });

  it("formats the created date independent of timezone", () => {
    expect(formatCreatedDate("2026-10-21")).toBe("October 21, 2026");
  });
});

describe("how-to and FAQ", () => {
  it("lists four numbered steps that name the agents and stack", () => {
    const steps = buildHowToSteps(calder);
    expect(steps.map(s => s.name)).toEqual(["Copy the rebuild prompt", "Paste it into your AI coding agent", "Adapt the brand and copy", "Deploy"]);
    expect(steps[0].text).toContain("/copy/calder-prompt.md");
    expect(steps[1].text).toContain("Claude Code, Cursor, Codex or Antigravity");
    expect(steps[1].text).toContain("Next.js 16, Tailwind v4");
    expect(buildHowToSteps(sample({ stack: "HTML · CSS", hasDownload: false }))[3].text).toContain("No build step");
  });

  it("answers four template-specific questions", () => {
    const faq = buildTemplateFaq(calder);
    expect(faq.map(q => q.question)).toEqual([
      "Is CALDER & ROWE free?",
      "What is CALDER & ROWE built with?",
      "Can I use CALDER & ROWE commercially?",
      "How do I customise CALDER & ROWE with AI?",
    ]);
    expect(faq[0].answer.startsWith("Yes.")).toBe(true);
    expect(faq[1].answer).toContain(calder.model);
    expect(buildTemplateFaq(sample({ hasDownload: false }))[0].answer).not.toContain("download");
  });
});

describe("relatedTemplates", () => {
  it("returns 4 to 6 other templates sharing categories, deterministically", () => {
    for (const t of TEMPLATES) {
      const related = relatedTemplates(t, TEMPLATES);
      expect(related.length, t.slug).toBeGreaterThanOrEqual(4);
      expect(related.length, t.slug).toBeLessThanOrEqual(6);
      expect(related.some(r => r.slug === t.slug)).toBe(false);
      expect(new Set(related.map(r => r.slug)).size).toBe(related.length);
    }
    expect(relatedTemplates(calder, TEMPLATES).map(r => r.slug)).toEqual(relatedTemplates(calder, [...TEMPLATES]).map(r => r.slug));
  });

  it("ranks by shared categories, then registry order, and tops up when too few share", () => {
    const base = { ...calder, industry: "X" };
    const a = { ...base, slug: "a", categories: ["3d", "ai"] } as unknown as TemplateItem;
    const b = { ...base, slug: "b", categories: ["3d"] } as unknown as TemplateItem;
    const c = { ...base, slug: "c", categories: ["3d", "ai"] } as unknown as TemplateItem;
    const d = { ...base, slug: "d", categories: ["food"] } as unknown as TemplateItem;
    const e = { ...base, slug: "e", categories: ["deck"] } as unknown as TemplateItem;
    const self = { ...base, slug: "self", categories: ["3d", "ai"] } as unknown as TemplateItem;
    expect(relatedTemplates(self, [d, b, a, self, c, e]).map(r => r.slug)).toEqual(["a", "c", "b", "d"]);
  });
});
