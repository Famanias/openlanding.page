import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TemplateCard } from "./TemplateCard";
import { TEMPLATES } from "../data/templates";

describe("TemplateCard", () => {
  it("renders 16:10 preview frame with correct live template link", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={true} />);
    expect(html).toContain('href="/orrery"');
    expect(html).toContain("aspect-[16/10]");
    expect(html).toContain("Orrery");
  });

  it("renders persistent copy actions for prompt and website", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={false} />);
    expect(html).toContain("Copy prompt");
    expect(html).toContain("Copy website");
  });

  it("renders video tag for KŌJI with muted and loop attributes", () => {
    const koji = TEMPLATES.find(t => t.slug === "koji")!;
    const html = renderToStaticMarkup(<TemplateCard template={koji} isEager={false} />);
    expect(html).toContain("<video");
    expect(html).toContain("dive-2-m.mp4");
    expect(html).toContain("muted");
  });

  it("does not render video tag for templates without video clip", () => {
    const orrery = TEMPLATES.find(t => t.slug === "orrery")!;
    const html = renderToStaticMarkup(<TemplateCard template={orrery} isEager={false} />);
    expect(html).not.toContain("<video");
  });

  it("sets preview image loading to eager when isEager is true and lazy when false", () => {
    const eagerHtml = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={true} />);
    expect(eagerHtml).toContain('loading="eager"');

    const lazyHtml = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={false} />);
    expect(lazyHtml).toContain('loading="lazy"');
  });

  it("does not render template badges or stack information, leaving only title, subtitle, and buttons", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={false} />);
    expect(html).not.toContain("Keynote Deck");
    expect(html).not.toContain("Next.js 16");
    expect(html).toContain("Orrery");
    expect(html).toContain(TEMPLATES[0].description);
    expect(html).toContain("Copy prompt");
    expect(html).toContain("Copy website");
  });

  it("renders external link attributes for template links", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={true} />);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders model tag overlay in top-left of preview frame with correct AI model and without indicator dot", () => {
    const orreryHtml = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={true} />);
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
  });
});
