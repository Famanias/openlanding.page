import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TemplateCard } from "./TemplateCard";
import { TEMPLATES } from "../data/templates";

describe("TemplateCard", () => {
  it("keeps Download HTML visible when the standalone export is not ready", () => {
    const template = TEMPLATES.find(t => t.slug === "orrery")!;
    const html = renderToStaticMarkup(<TemplateCard template={template} />);
    expect(html).toContain('aria-label="Download HTML"');
    expect(html).toContain('title="HTML coming soon"');
    expect(html).toMatch(/<button[^>]*aria-label="Download HTML"[^>]*disabled=""/);
  });
  it("keeps the selected thumb available for revocation and disables the opposite thumb", () => {
    const template = TEMPLATES.find(t => t.slug === "orrery")!;
    const html = renderToStaticMarkup(<TemplateCard template={template} counts={{ up: 12, down: 3 }} myVote="down" votesReady />);
    expect(html).toContain('aria-label="Like Orrery (12)"');
    expect(html).toContain('aria-label="Remove your dislike for Orrery (3)"');
    expect(html).toContain('aria-pressed="true"');
    expect((html.slice(html.indexOf('class="card-votes"')).match(/disabled=""/g) ?? []).length).toBe(1);
    expect(html).toContain("Click again to remove");
  });
  it("renders a video-aspect preview frame with correct live template link", () => {
    const orrery = TEMPLATES.find((t) => t.slug === "orrery")!;
    const html = renderToStaticMarkup(<TemplateCard template={orrery} isEager={true} />);
    expect(html).toContain('href="/orrery"');
    expect(html).toContain("aspect-video");
    expect(html).toContain("Orrery");
  });

  it("renders persistent actions for prompt and template download", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES.find(t => t.slug === "alpine-reel")!} isEager={false} />);
    expect(html).toContain("Copy prompt");
    expect(html).toContain("Download HTML");
    expect(html).not.toMatch(/<button[^>]*aria-label="Download HTML"[^>]*disabled=""/);
  });

  it("renders video tag for KŌJI with muted and loop attributes", () => {
    const koji = TEMPLATES.find(t => t.slug === "koji")!;
    const html = renderToStaticMarkup(<TemplateCard template={koji} isEager={false} />);
    expect(html).toContain("<video");
    expect(html).toContain("dive-2-m.mp4");
    expect(html).toContain("muted");
  });

  it("does not render video tag for templates without video clip", () => {
    const templateWithoutClip = { ...TEMPLATES[0], videoClip: undefined };
    const html = renderToStaticMarkup(<TemplateCard template={templateWithoutClip} isEager={false} />);
    expect(html).not.toContain("<video");
  });

  it("sets preview image loading to eager when isEager is true and lazy when false", () => {
    const eagerHtml = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={true} />);
    expect(eagerHtml).toContain('loading="eager"');

    const lazyHtml = renderToStaticMarkup(<TemplateCard template={TEMPLATES.find(t => t.slug === "alpine-reel")!} isEager={false} />);
    expect(lazyHtml).toContain('loading="lazy"');
  });

  it("does not render template badges, stack information, or description, leaving only title and action buttons", () => {
    const orrery = TEMPLATES.find((t) => t.slug === "orrery")!;
    const html = renderToStaticMarkup(<TemplateCard template={orrery} isEager={false} />);
    expect(html).not.toContain("Keynote Deck");
    expect(html).not.toContain("Next.js 16");
    expect(html).toContain("Orrery");
    expect(html).not.toContain(orrery.description);
    expect(html).toContain("Copy prompt");
    expect(html).toContain("Download HTML");
  });

  it("renders external link attributes for template links", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={true} />);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders model tag overlay in top-left of preview frame with correct AI model and without indicator dot", () => {
    const orrery = TEMPLATES.find((t) => t.slug === "orrery")!;
    const orreryHtml = renderToStaticMarkup(<TemplateCard template={orrery} isEager={true} />);
    expect(orreryHtml).toContain("Claude Opus 5.5 High");
    expect(orreryHtml).toContain('data-testid="model-tag"');
    expect(orreryHtml).not.toContain("animate-pulse");
    expect(orreryHtml).not.toContain("bg-emerald-400");

    const trace = TEMPLATES.find((t) => t.slug === "trace")!;
    const traceHtml = renderToStaticMarkup(<TemplateCard template={trace} isEager={false} />);
    expect(traceHtml).toContain("GPT-6 Astra Max");
    expect(traceHtml).toContain('data-testid="model-tag"');

    const nomi = TEMPLATES.find((t) => t.slug === "nomi")!;
    const nomiHtml = renderToStaticMarkup(<TemplateCard template={nomi} isEager={false} />);
    expect(nomiHtml).toContain("Claude Sonnet 5.5 High");
    expect(nomiHtml).toContain('data-testid="model-tag"');

    const satoyama = TEMPLATES.find((t) => t.slug === "satoyama")!;
    const satoyamaHtml = renderToStaticMarkup(<TemplateCard template={satoyama} isEager={false} />);
    expect(satoyamaHtml).toContain("GPT-6.1 Sol High");
    expect(satoyamaHtml).toContain('data-testid="model-tag"');
  });
});
