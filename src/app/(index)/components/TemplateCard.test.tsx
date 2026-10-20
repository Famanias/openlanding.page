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

  it("renders template badges and stack information", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={false} />);
    expect(html).toContain("Keynote Deck");
    expect(html).toContain("Next.js 16");
  });

  it("renders external link attributes for template links", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={true} />);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
