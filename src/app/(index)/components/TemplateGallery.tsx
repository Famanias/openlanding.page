"use client";

import React, { useDeferredValue, useMemo } from "react";
import { LayoutGroup } from "motion/react";
import {
  CATEGORIES,
  TEMPLATES,
  type CategoryId,
  type TemplateCategory,
  getTemplateCategories,
} from "../data/templates";
import { filterTemplates, sortTemplates, type GalleryFilters } from "../data/filters";
import { FilterBar } from "./FilterBar";
import { TemplateCard } from "./TemplateCard";
import { updateGalleryFilters } from "./useGalleryFilters";
import { useGalleryVotes } from "./useGalleryVotes";

export interface TemplateGalleryProps {
  filters: GalleryFilters;
  keyboardInput: boolean;
}

export function TemplateGallery({ filters, keyboardInput }: TemplateGalleryProps) {
  const votes = useGalleryVotes();
  const query = useDeferredValue(filters.query);
  const activeCategory = filters.category;

  const categoryCounts = useMemo(() => {
    const matching = filterTemplates(TEMPLATES, {
      category: "all",
      model: filters.model,
      query,
    });
    return Object.fromEntries(
      CATEGORIES.map((cat) => [
        cat.id,
        cat.id === "all"
          ? matching.length
          : matching.filter((template) =>
              getTemplateCategories(template).includes(cat.id as TemplateCategory),
            ).length,
      ]),
    );
  }, [filters.model, query]);

  const filteredTemplates = sortTemplates(
    filterTemplates(TEMPLATES, { ...filters, query }),
    filters.sort,
    filters.dir,
    votes.counts,
  );

  const handleSelectCategory = (category: CategoryId) => updateGalleryFilters({ category });
  const handleReset = () =>
    updateGalleryFilters({ category: "all", model: "all", query: "" });

  return (
    <div
      id="gallery-panel-templates"
      role="tabpanel"
      aria-labelledby="gallery-tab-templates"
    >
      <LayoutGroup id="template-gallery">
        <FilterBar
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          totalCount={TEMPLATES.length}
          filteredCount={filteredTemplates.length}
          onReset={handleReset}
          categoryCounts={categoryCounts}
          activeModel={filters.model}
          onSelectModel={(model) => updateGalleryFilters({ model })}
          hasQuery={Boolean(filters.query)}
          sort={filters.sort}
          dir={filters.dir}
          onSortChange={(sort, dir) => updateGalleryFilters({ sort, dir })}
          instantMotion={keyboardInput}
        />
        {votes.unavailable && (
          <p className="votes-status" role="status">
            Voting is temporarily unavailable.{" "}
            <button type="button" onClick={votes.retry}>
              Try again
            </button>
          </p>
        )}
        {filteredTemplates.length === 0 ? (
          <div className="gallery-empty" role="status">
            <h3>No templates found.</h3>
            <p>Try another search, model, or category.</p>
            <button type="button" onClick={handleReset} className="primary-action">
              Reset filters
            </button>
          </div>
        ) : (
          <div
            className="template-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
            aria-busy={query !== filters.query}
          >
            {filteredTemplates.map((template, index) => (
              <TemplateCard
                key={template.slug}
                template={template}
                isEager={index === 0}
                counts={votes.counts?.[template.slug]}
                myVote={votes.mine[template.slug]}
                votesReady={votes.ready}
                votePending={Boolean(votes.pending)}
                voteError={votes.errors[template.slug]}
                onVote={(dir) => votes.vote(template.slug, dir)}
                instantMotion={keyboardInput || Boolean(filters.query)}
              />
            ))}
          </div>
        )}
      </LayoutGroup>
    </div>
  );
}
