"use client";

import React from "react";
import { CATEGORIES, type CategoryId } from "../data/templates";

export interface FilterBarProps {
  activeCategory: CategoryId | string;
  onSelectCategory: (categoryId: CategoryId) => void;
  totalCount: number;
  filteredCount: number;
  onReset: () => void;
  categoryCounts?: Partial<Record<CategoryId, number>> | Record<string, number>;
  className?: string;
}

export function FilterBar({
  activeCategory,
  onSelectCategory,
  totalCount,
  filteredCount,
  onReset,
  categoryCounts,
  className = "",
}: FilterBarProps) {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const tablist = e.currentTarget.closest<HTMLElement>('[role="tablist"]');
    const buttons = tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]');

    let targetIndex = -1;
    if (e.key === "ArrowRight") {
      targetIndex = (index + 1) % CATEGORIES.length;
    } else if (e.key === "ArrowLeft") {
      targetIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = CATEGORIES.length - 1;
    }

    if (targetIndex >= 0) {
      e.preventDefault();
      onSelectCategory(CATEGORIES[targetIndex].id);
      buttons?.[targetIndex]?.focus();
    }
  };

  return (
    <div
      className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 ${className}`}
    >
      {/* Category Chips - horizontally scrollable on mobile without scrollbar */}
      <div
        role="tablist"
        aria-label="Filter templates by category"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {CATEGORIES.map((cat, index) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts?.[cat.id];

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelectCategory(cat.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 select-none whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D0E] ${
                isActive
                  ? "bg-white text-black border border-white font-semibold"
                  : "bg-transparent text-neutral-400 border border-white/10 hover:text-white hover:border-white/20 active:bg-white/5"
              }`}
            >
              <span>{cat.label}</span>
              {count !== undefined && (
                <span
                  className={`ml-1.5 font-mono text-xs tabular-nums ${
                    isActive ? "text-neutral-700" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Result Counter & Reset Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
        <span
          aria-live="polite"
          className="font-mono text-xs sm:text-sm text-neutral-400 tabular-nums"
        >
          Showing {filteredCount} of {totalCount} templates
        </span>
        {activeCategory !== "all" && (
          <button
            type="button"
            onClick={onReset}
            aria-label="Reset category filters"
            className="text-xs font-mono text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded px-1.5 py-0.5"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}
