"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CATEGORIES, TEMPLATES, type CategoryId } from "../data/templates";
import { FilterBar } from "./FilterBar";
import { TemplateCard } from "./TemplateCard";

export function GalleryShell() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  // Read URL query parameter on initial mount and respond to browser popstate
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam && CATEGORIES.some((c) => c.id === categoryParam)) {
        setActiveCategory(categoryParam as CategoryId);
      } else if (!categoryParam) {
        setActiveCategory("all");
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  // Compute category counts across the template catalog
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: TEMPLATES.length,
    };
    for (const cat of CATEGORIES) {
      if (cat.id !== "all") {
        counts[cat.id] = TEMPLATES.filter((t) => t.category === cat.id).length;
      }
    }
    return counts;
  }, []);

  // Filter templates by selected category
  const filteredTemplates = useMemo(() => {
    if (activeCategory === "all") return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  // Handle category selection with shallow URL update
  const handleSelectCategory = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (categoryId === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", categoryId);
      }
      const newPath = url.pathname + (url.search ? url.search : "") + url.hash;
      window.history.replaceState(null, "", newPath);
    }
  };

  const handleReset = () => {
    handleSelectCategory("all");
  };

  return (
    <section
      id="gallery"
      className="w-full border-t border-white/[0.08] py-12 sm:py-16 scroll-mt-16"
      aria-label="Template gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <FilterBar
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          totalCount={TEMPLATES.length}
          filteredCount={filteredTemplates.length}
          onReset={handleReset}
          categoryCounts={categoryCounts}
        />

        {filteredTemplates.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 font-sans">
            <p>No templates found in this category.</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 text-xs font-mono text-white underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded px-2 py-1"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <TemplateCard
                key={template.slug}
                template={template}
                isEager={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
