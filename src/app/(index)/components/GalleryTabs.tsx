"use client";

import React from "react";
import type { GalleryView } from "../data/gallery-view";

export interface GalleryTabsProps {
  activeTab: GalleryView["tab"];
  onSelect: (tab: GalleryView["tab"]) => void;
  onOpenSubmit?: () => void;
}

const TABS: ReadonlyArray<{ id: GalleryView["tab"]; label: string; panelId: string }> = [
  { id: "templates", label: "Templates", panelId: "gallery-panel-templates" },
  { id: "community", label: "Community", panelId: "gallery-panel-community" },
];

export function GalleryTabs({
  activeTab,
  onSelect,
  onOpenSubmit,
}: GalleryTabsProps): React.ReactNode {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const buttons = event.currentTarget
      .closest<HTMLElement>('[role="tablist"]')
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    let nextIndex = -1;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % TABS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = TABS.length - 1;
    }
    if (nextIndex >= 0) {
      event.preventDefault();
      onSelect(TABS[nextIndex]!.id);
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <div className="gallery-top-bar">
      <div role="tablist" aria-label="Gallery view" className="gallery-view-tabs">
        {TABS.map((tab, index) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`gallery-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={tab.panelId}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelect(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`gallery-view-tab ${isSelected ? "is-active" : ""}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {onOpenSubmit && (
        <button
          type="button"
          onClick={onOpenSubmit}
          className="community-submit-trigger"
        >
          Add your website
        </button>
      )}
    </div>
  );
}
