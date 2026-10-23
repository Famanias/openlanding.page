"use client";

import React, { useDeferredValue, useMemo } from "react";
import { LayoutGroup } from "motion/react";
import { CATEGORIES, TEMPLATES, type CategoryId } from "../data/templates";
import { filterTemplates } from "../data/filters";
import { FilterBar } from "./FilterBar";
import { TemplateCard } from "./TemplateCard";
import { updateGalleryFilters, useGalleryFilters } from "./useGalleryFilters";

export function GalleryShell() {
  const filters = useGalleryFilters();
  const query = useDeferredValue(filters.query);
  const activeCategory = filters.category;
  const categoryCounts = useMemo(() => {
    const matching = filterTemplates(TEMPLATES, { category: "all", model: filters.model, query });
    return Object.fromEntries(CATEGORIES.map((cat) => [cat.id,
      cat.id === "all" ? matching.length : matching.filter((template) => template.category === cat.id).length]));
  }, [filters.model, query]);
  const filteredTemplates = filterTemplates(TEMPLATES, { ...filters, query });
  const handleSelectCategory = (category: CategoryId) => updateGalleryFilters({ category });
  const handleReset = () => updateGalleryFilters({ category: "all", model: "all", query: "" });

  return (
    <section id="gallery" className="gallery-section" aria-label="Template gallery">
      <div className="page-container">
        <div className="gallery-heading"><h2>Find your starting point.</h2><p>Pick a page. Take it somewhere new.</p></div>
        <FilterBar activeCategory={activeCategory} onSelectCategory={handleSelectCategory}
          totalCount={TEMPLATES.length} filteredCount={filteredTemplates.length} onReset={handleReset}
          categoryCounts={categoryCounts} activeModel={filters.model}
          onSelectModel={(model) => updateGalleryFilters({ model })} hasQuery={Boolean(filters.query)} />
        <LayoutGroup id="template-gallery">
          {filteredTemplates.length === 0 ? (
            <div className="gallery-empty" role="status">
              <h3>No templates found.</h3>
              <p>Try another search, model, or category.</p>
              <button type="button" onClick={handleReset} className="primary-action">Reset filters</button>
            </div>
          ) : (
            <div className="template-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5" aria-busy={query !== filters.query}>
              {filteredTemplates.map((template, index) => <TemplateCard key={template.slug} template={template} isEager={index === 0} />)}
            </div>
          )}
        </LayoutGroup>
      </div>
    </section>
  );
}
