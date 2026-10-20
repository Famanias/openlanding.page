import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FilterBar } from "./FilterBar";
import { CATEGORIES } from "../data/templates";

describe("FilterBar", () => {
  it("renders horizontal category chips with counts", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="all"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={3}
        onReset={() => {}}
      />
    );
    expect(html).toContain("All");
    expect(html).toContain("Showing 3 of 3 templates");
  });

  it("displays reset button when non-all category is active", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="3d-webgpu"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={1}
        onReset={() => {}}
      />
    );
    expect(html).toContain("Reset filters");
    expect(html).toContain("Showing 1 of 3 templates");
  });

  it("does not display reset button when 'all' category is active", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="all"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={3}
        onReset={() => {}}
      />
    );
    expect(html).not.toContain("Reset filters");
  });

  it("renders all categories from CATEGORIES with accessible tablist semantics", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="all"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={3}
        onReset={() => {}}
      />
    );
    expect(html).toContain('role="tablist"');
    for (const cat of CATEGORIES) {
      // renderToStaticMarkup escapes & as &amp;
      const expectedLabel = cat.label.replace(/&/g, "&amp;");
      expect(html).toContain(expectedLabel);
    }
  });

  it("applies high-contrast monochrome inversion to the active chip", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="keynote-deck"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={1}
        onReset={() => {}}
      />
    );
    expect(html).toContain("bg-white");
    expect(html).toContain("text-black");
  });

  it("renders live tabular counter in monospace font", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="all"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={2}
        onReset={() => {}}
      />
    );
    expect(html).toContain("font-mono");
    expect(html).toContain("tabular-nums");
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("Showing 2 of 3 templates");
  });

  it("renders category count badges when categoryCounts is provided", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="all"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={3}
        onReset={() => {}}
        categoryCounts={{
          all: 3,
          "keynote-deck": 1,
          "scroll-showcase": 1,
          "3d-webgpu": 1,
        }}
      />
    );
    expect(html).toContain("(3)");
    expect(html).toContain("(1)");
  });
});
