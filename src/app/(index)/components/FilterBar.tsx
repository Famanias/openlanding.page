"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CATEGORIES, type CategoryId } from "../data/templates";
import { MODEL_FILTERS, type ModelFilter, type SortKey, type SortDirection } from "../data/filters";

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
  sort?: SortKey;
  dir?: SortDirection;
  onSortChange?: (sort: SortKey, dir: SortDirection) => void;
}

function revealSelectedCategory(tabs: HTMLDivElement | null) {
  const selected = tabs?.querySelector<HTMLElement>('[aria-selected="true"]');
  if (!tabs || !selected) return;
  const bounds = tabs.getBoundingClientRect();
  const chip = selected.getBoundingClientRect();
  // Reveal the selected chip without moving the page vertically.
  if (chip.left < bounds.left + 44) tabs.scrollBy({ left: chip.left - bounds.left - 44, behavior: "instant" });
  else if (chip.right > bounds.right - 44) tabs.scrollBy({ left: chip.right - bounds.right + 44, behavior: "instant" });
}

export function FilterBar({ activeCategory, onSelectCategory, totalCount, filteredCount, onReset,
  categoryCounts, className = "", activeModel = "all", onSelectModel, hasQuery = false, instantMotion = false,
  sort = "date", dir = "desc", onSortChange }: FilterBarProps) {
  const reducedMotion = useReducedMotion();
  const instant = reducedMotion || instantMotion;
  const tabsId = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    const measure = () => setEdges({ left: tabs.scrollLeft > 1, right: tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 1 });
    const observer = new ResizeObserver(() => { revealSelectedCategory(tabs); measure(); });
    observer.observe(tabs);
    for (const child of tabs.children) observer.observe(child);
    tabs.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => { observer.disconnect(); tabs.removeEventListener("scroll", measure); };
  }, []);
  useEffect(() => {
    revealSelectedCategory(tabsRef.current);
  }, [activeCategory]);
  const scrollCategories = (direction: number) => {
    const tabs = tabsRef.current;
    if (tabs) tabs.scrollBy({ left: direction * tabs.clientWidth * 0.7, behavior: instant ? "instant" : "smooth" });
  };
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
      buttons?.[targetIndex]?.focus({ preventScroll: true });
    }
  };

  return (
    <div className={`filter-panel ${className}`}>
      <div className="category-rail">
        <button type="button" className="category-arrow category-arrow-left" aria-label="Scroll categories left"
          aria-controls={tabsId} hidden={!edges.left} onClick={() => scrollCategories(-1)}><ChevronLeft size={16} aria-hidden="true" /></button>
      <div ref={tabsRef} id={tabsId} role="tablist" aria-label="Filter templates by category" className="category-tabs">
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
        <button type="button" className="category-arrow category-arrow-right" aria-label="Scroll categories right"
          aria-controls={tabsId} hidden={!edges.right} onClick={() => scrollCategories(1)}><ChevronRight size={16} aria-hidden="true" /></button>
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
          <label className="gallery-sort">Sort by
            <select value={`${sort}-${dir}`} onChange={(event) => {
              const [key, direction] = event.target.value.split("-");
              onSortChange?.(key as SortKey, direction as SortDirection);
            }}>
              <option value="date-desc">Latest added</option>
              <option value="date-asc">Oldest</option>
              <option value="likes-desc">Most liked</option>
              <option value="likes-asc">Least liked</option>
            </select>
          </label>
          <span aria-live="polite" aria-atomic="true" className="font-mono tabular-nums">Showing {filteredCount} of {totalCount} templates</span>
          {(activeCategory !== "all" || activeModel !== "all" || hasQuery) && (
            <button type="button" onClick={onReset} aria-label="Reset category filters" className="reset-filters">Reset filters</button>
          )}
        </div>
      </div>
    </div>
  );
}
