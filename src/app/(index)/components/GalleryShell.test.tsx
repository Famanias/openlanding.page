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
    expect(html).toContain("Editorial Magazine");
    expect(html).toContain("Showing 14 of 14 templates");
  });

  it("renders all 14 initial template cards", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    expect(html).toContain('href="/orrery"');
    expect(html).toContain('href="/keytu"');
    expect(html).toContain('href="/koji"');
    expect(html).toContain('href="/trace"');
    expect(html).toContain('href="/calder"');
    expect(html).toContain('href="/vector"');
    expect(html).toContain('href="/morrow"');
    expect(html).toContain('href="/loophouse"');
    expect(html).toContain('href="/wowflutter"');
    expect(html).toContain('href="/verane"');
    expect(html).toContain('href="/sundial"');
    expect(html).toContain('href="/noctiluca"');
    expect(html).toContain('href="/iridia"');
    expect(html).toContain('href="/aubade"');
    expect(html).toContain("Orrery");
    expect(html).toContain("KEYTU");
    expect(html).toContain("KŌJI");
    expect(html).toContain("TRACE");
    expect(html).toContain("CALDER &amp; ROWE");
    expect(html).toContain("VECTOR/90");
    expect(html).toContain("MORROW");
    expect(html).toContain("LOOPHOUSE");
    expect(html).toContain("WOWFLUTTER");
    expect(html).toContain("Maison Vérane");
    expect(html).toContain("SUNDIAL Coffee Roasters");
    expect(html).toContain("IRIDIA");
  });

  it("renders the first template card eagerly and others lazily", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    const eagerCount = (html.match(/loading="eager"/g) || []).length;
    const lazyCount = (html.match(/loading="lazy"/g) || []).length;
    expect(eagerCount).toBe(1);
    expect(lazyCount).toBe(13);
  });

  it("renders responsive grid container with 5 columns on desktop", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    expect(html).toContain("grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5");
  });
});
