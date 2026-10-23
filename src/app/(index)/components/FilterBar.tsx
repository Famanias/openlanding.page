"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CATEGORIES, type CategoryId } from "../data/templates";
import { MODEL_FILTERS, type ModelFilter } from "../data/filters";

export interface FilterBarProps {
  activeCategory: CategoryId | string;
  onSelectCategory: (categoryId: CategoryId) => void;
  totalCount: number;
  filteredCount: number;
  onReset: () => void;
  categoryCounts?: Partial<Record<CategoryId, number>> | Record<string, number>;
  className?: string;
  activeModel?: ModelFilter;
  onSelectModel?: (model: ModelFilter) => void;
  hasQuery?: boolean;
  instantMotion?: boolean;
}

export function FilterBar({ activeCategory, onSelectCategory, totalCount, filteredCount, onReset,
  categoryCounts, className = "", activeModel = "all", onSelectModel, hasQuery = false, instantMotion = false }: FilterBarProps) {
  const reducedMotion = useReducedMotion();
  const instant = reducedMotion || instantMotion;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const buttons = e.currentTarget.closest<HTMLElement>('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    let targetIndex = -1;
    if (e.key === "ArrowRight") targetIndex = (index + 1) % CATEGORIES.length;
    else if (e.key === "ArrowLeft") targetIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    else if (e.key === "Home") targetIndex = 0;
    else if (e.key === "End") targetIndex = CATEGORIES.length - 1;
    if (targetIndex >= 0) {
      e.preventDefault();
      onSelectCategory(CATEGORIES[targetIndex].id);
      buttons?.[targetIndex]?.focus();
      buttons?.[targetIndex]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
    }
  };

  return (
    <div className={`filter-panel ${className}`}>
      <div role="tablist" aria-label="Filter templates by category" className="category-tabs">
        {CATEGORIES.map((cat, index) => (
          <button key={cat.id} type="button" role="tab" aria-selected={activeCategory === cat.id}
            tabIndex={activeCategory === cat.id ? 0 : -1} onClick={() => onSelectCategory(cat.id)}
            onKeyDown={(e) => handleKeyDown(e, index)} className={`category-tab ${activeCategory === cat.id ? "bg-white text-black" : ""}`}>
            {activeCategory === cat.id && <motion.span className="category-marker" layoutId={instant ? undefined : "category-selection"}
              initial={false} transition={{ type: "spring", stiffness: 420, damping: 35 }} aria-hidden="true" />}
            <span>{cat.label}</span>
            {categoryCounts?.[cat.id] !== undefined && <span className="category-count">({categoryCounts[cat.id]})</span>}
          </button>
        ))}
      </div>
      <div className="filter-bottom">
        <div className="model-filters" role="group" aria-label="Filter by AI model">
          <span className="model-label">Made with</span>
          {MODEL_FILTERS.map((model) => (
            <button type="button" key={model.id} aria-pressed={activeModel === model.id}
              onClick={() => onSelectModel?.(model.id)} className="model-filter">
              <span>{model.label}</span>
              {activeModel === model.id && <motion.i className="model-marker" layoutId={instant ? undefined : "model-selection"} transition={{ type: "spring", stiffness: 420, damping: 35 }} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div className="filter-summary">
          <span aria-live="polite" aria-atomic="true" className="font-mono tabular-nums">Showing {filteredCount} of {totalCount} templates</span>
          {(activeCategory !== "all" || activeModel !== "all" || hasQuery) && (
            <button type="button" onClick={onReset} aria-label="Reset category filters" className="reset-filters">Reset filters</button>
          )}
        </div>
      </div>
    </div>
  );
}
