import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TemplateCard } from "./TemplateCard";
import { McpSetupDialog, OPENLANDING_MCP_CONFIG_JSON } from "./McpSetupDialog";
import { TEMPLATES } from "../data/templates";

describe("TemplateCard", () => {
  it("links both live actions directly to the public namespace for every template", () => {
    for (const template of TEMPLATES) {
      const html = renderToStaticMarkup(<TemplateCard template={template} />);
      expect(html.split(`href="/templates/${template.slug}"`)).toHaveLength(3);
      expect(html).not.toContain(`href="/${template.slug}"`);
      expect(html).toContain(`/gallery/${template.slug}.webp`);
    }
  });
  it("links each card to its crawlable detail page in the same tab", () => {
    for (const template of TEMPLATES) {
      const html = renderToStaticMarkup(<TemplateCard template={template} />);
      expect(html).toContain(`<a href="/landing-page-templates/${template.slug}" class="card-details-link"`);
    }
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES.find(t => t.slug === "orrery")!} />);
    expect(html).toMatch(/<a href="\/landing-page-templates\/orrery" class="card-details-link" aria-label="Details: Orrery landing page template" title="Details"><svg[^>]*aria-hidden="true"[^>]*>.*<\/svg><\/a>/);
  });
  it("keeps Download HTML visible when the standalone export is not ready", () => {
    const template = TEMPLATES.find(t => t.slug === "orrery")!;
    const html = renderToStaticMarkup(<TemplateCard template={{...template,hasDownload:false}} />);
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
    expect(html).toContain('href="/templates/orrery"');
    expect(html).toContain("aspect-video");
    expect(html).toContain("Orrery");
  });

  it("renders persistent actions for prompt and template download", () => {
    for (const slug of ["alpine-reel", "khora", "pitchlane", "strata"] as const) {
      const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES.find(t => t.slug === slug)!} isEager={false} />);
      expect(html).toContain("Copy prompt");
      expect(html).toContain("Download HTML");
      expect(html).not.toMatch(/<button[^>]*aria-label="Download HTML"[^>]*disabled=""/);
    }
  });

  it("renders a still hero preview", () => {
    const template = TEMPLATES.find(t => t.slug === "koji")!;
    const html = renderToStaticMarkup(<TemplateCard template={template} />);
    expect(html).toContain('/gallery/koji.webp');
    expect(html).not.toContain('<video');
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

  it("exposes a dialog trigger on the Copy prompt button and renders the centered prompt & MCP modal when open", () => {
    const snoot = TEMPLATES.find((t) => t.slug === "snoot")!;
    const cardHtml = renderToStaticMarkup(<TemplateCard template={snoot} />);
    expect(cardHtml).toContain('aria-haspopup="dialog"');
    expect(cardHtml).toContain('aria-expanded="false"');

    const closedDialogHtml = renderToStaticMarkup(<McpSetupDialog open={false} onClose={() => {}} template={snoot} />);
    expect(closedDialogHtml).toBe("");

    const openDialogHtml = renderToStaticMarkup(<McpSetupDialog open={true} onClose={() => {}} template={snoot} />);
    expect(openDialogHtml).toContain('role="dialog"');
    expect(openDialogHtml).toContain("Copy Snoot prompt");
    expect(openDialogHtml).toContain("Copy code prompt");
    expect(openDialogHtml).toContain("Copy Webflow prompt");
    expect(openDialogHtml).toContain("https://www.openlanding.page/api/mcp");
    expect(openDialogHtml).toContain("https://mcp.webflow.com/mcp");
    expect(openDialogHtml).toContain("Copy MCP config");
    expect(JSON.parse(OPENLANDING_MCP_CONFIG_JSON).mcpServers.openlanding.url).toBe(
      "https://www.openlanding.page/api/mcp"
    );
  });
});
