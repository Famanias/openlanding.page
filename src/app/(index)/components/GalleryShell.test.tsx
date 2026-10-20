import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GalleryShell } from "./GalleryShell";

describe("GalleryShell", () => {
  it("renders gallery section with id='gallery' and accessibility label", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    expect(html).toContain('id="gallery"');
    expect(html).toContain('aria-label="Template gallery"');
  });

  it("renders FilterBar with category tabs and initial counts", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    expect(html).toContain('role="tablist"');
    expect(html).toContain("All");
    expect(html).toContain("Keynote &amp; Deck");
    expect(html).toContain("Scroll Showcase");
    expect(html).toContain("3D &amp; WebGPU");
    expect(html).toContain("Showing 3 of 3 templates");
  });

  it("renders all 3 initial template cards", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    expect(html).toContain('href="/orrery"');
    expect(html).toContain('href="/cairn"');
    expect(html).toContain('href="/koji"');
    expect(html).toContain("Orrery");
    expect(html).toContain("Cairn");
    expect(html).toContain("KŌJI");
  });

  it("renders the first template card eagerly and others lazily", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    const eagerCount = (html.match(/loading="eager"/g) || []).length;
    const lazyCount = (html.match(/loading="lazy"/g) || []).length;
    expect(eagerCount).toBe(1);
    expect(lazyCount).toBe(2);
  });

  it("renders responsive grid container with 3 columns on large screens", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    expect(html).toContain("grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6");
  });
});
