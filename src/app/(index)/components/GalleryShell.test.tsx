import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GalleryShell } from "./GalleryShell";
import { TEMPLATES } from "../data/templates";

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
    expect(html).toContain("Showcase");
    expect(html).toContain("3D");
    expect(html).toContain("Editorial");
    expect(html).toContain("Commerce");
    expect(html).toContain("Deck");
    expect(html).toContain(`Showing ${TEMPLATES.length} of ${TEMPLATES.length} templates`);
  });

  it("renders active template cards and excludes archived templates", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    expect(html).toContain('href="/templates/ctrlroom"');
    expect(html).toContain('href="/templates/noiseclub"');
    expect(html).toContain('href="/templates/warpwander"');
    expect(html).toContain('href="/templates/parallel"');
    expect(html).toContain('href="/templates/synapxe"');
    expect(html).toContain('href="/templates/perigee"');
    expect(html).toContain('href="/templates/xibalba"');
    expect(html).toContain('href="/templates/loam"');
    expect(html).toContain('href="/templates/orrery"');
    expect(html).toContain('href="/templates/keytu"');
    expect(html).toContain('href="/templates/koji"');
    expect(html).toContain('href="/templates/trace"');
    expect(html).toContain('href="/templates/calder"');
    expect(html).toContain('href="/templates/vector"');
    expect(html).toContain('href="/templates/loophouse"');
    expect(html).toContain('href="/templates/wowflutter"');
    expect(html).toContain('href="/templates/verane"');
    expect(html).toContain('href="/templates/noctiluca"');
    expect(html).toContain('href="/templates/iridia"');
    expect(html).toContain('href="/templates/bathys"');
    expect(html).toContain('href="/templates/aubade"');
    expect(html).toContain('href="/templates/satsuma"');
    expect(html).toContain('href="/templates/kinetic"');
    expect(html).toContain('href="/templates/volume-zero"');
    expect(html).toContain('href="/templates/openhouse"');
    expect(html).toContain('href="/templates/kazeko"');
    expect(html).toContain('href="/templates/alpine-reel"');
    expect(html).toContain('href="/templates/rill"');
    expect(html).toContain('href="/templates/hiyas"');
    expect(html).toContain('href="/templates/satoyama"');
    expect(html).toContain('href="/templates/mio"');
expect(html).toContain('href="/templates/tally"');
    expect(html).toContain('href="/templates/aftercart"');
    expect(html).toContain('href="/templates/fixture"');
    expect(html).toContain('href="/templates/chinagraph"');
    expect(html).toContain('href="/templates/valence"');
    expect(html).toContain('href="/templates/pipkin"');
    expect(html).toContain('href="/templates/serein"');
    expect(html).toContain('href="/templates/nulo"');
    expect(html).toContain('href="/templates/flori"');
    expect(html).toContain('href="/templates/amaoto"');
    expect(html).toContain('href="/templates/assemblage"');
    expect(html).toContain('href="/templates/nightline"');
    expect(html).toContain('href="/templates/cullet"');
    expect(html).toContain('href="/templates/firstday"');
    expect(html).toContain("Orrery");
    expect(html).toContain("KEYTU");
    expect(html).toContain("KŌJI");
    expect(html).toContain("TRACE");
    expect(html).toContain("CALDER &amp; ROWE");
    expect(html).toContain("VECTOR/90");
    expect(html).toContain("LOOPHOUSE");
    expect(html).toContain("WOWFLUTTER");
    expect(html).toContain("Maison Vérane");
    expect(html).toContain("IRIDIA");
    expect(html).toContain("BATHYS");
    expect(html).toContain("KINETIC");
    expect(html).toContain("VOLUME ZERO");
    expect(html).toContain("OPENHOUSE");
    expect(html).toContain("Studio Kazeko");
    expect(html).toContain("ALPINE REEL");
    expect(html).toContain("RILL");
    expect(html).toContain("HIYAS");
    expect(html).toContain("Mio Hazuki");
    expect(html).toContain("Satoyama");
    expect(html).toContain("TALLY");
    expect(html).toContain("AFTERCART");
    expect(html).toContain("FIXTURE");
    expect(html).toContain("CHINAGRAPH");
    expect(html).toContain("VALENCE");
    expect(html).toContain("Pipkin");
    expect(html).toContain("SEREIN Bureau");
    expect(html).toContain("NULO");
    expect(html).toContain("ASSEMBLAGE");
    expect(html).toContain("FIRSTDAY");
    expect(html).toContain("NIGHTLINE");
    expect(html).toContain("Cullet");
    expect(html).toContain("LOAM");

    // Excluded / non-existent templates are not rendered in the gallery
    expect(html).not.toContain('href="/templates/morrow"');
    expect(html).not.toContain('href="/templates/sundial"');
    expect(html).not.toContain('href="/templates/lucentra"');
    expect(html).not.toContain('href="/templates/spaceedu"');
    expect(html).not.toContain('href="/templates/starlight"');
  });

  it("renders the first template card eagerly and others lazily", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    const eagerCount = (html.match(/loading="eager"/g) || []).length;
    const lazyCount = (html.match(/loading="lazy"/g) || []).length;
    expect(eagerCount).toBe(1);
    expect(lazyCount).toBe(TEMPLATES.length - 1);
  });

  it("renders responsive grid container with 5 columns on desktop", () => {
    const html = renderToStaticMarkup(<GalleryShell />);
    expect(html).toContain("grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5");
  });
});
