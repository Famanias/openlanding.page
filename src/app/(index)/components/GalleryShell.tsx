"use client";

import React, { useEffect, useState } from "react";
import { setGalleryView } from "../data/gallery-view";
import { CommunityGallery } from "./community/CommunityGallery";
import { SubmissionDialog } from "./community/SubmissionDialog";
import { GalleryTabs } from "./GalleryTabs";
import { TemplateGallery } from "./TemplateGallery";
import { updateGalleryFilters, useGalleryFilters, useGalleryView } from "./useGalleryFilters";

export const COMMUNITY_SUBMISSION_OPEN_EVENT = "community-submission-open";

export function requestOpenCommunitySubmission(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(COMMUNITY_SUBMISSION_OPEN_EVENT));
  }
}

export function GalleryShell() {
  const filters = useGalleryFilters();
  const view = useGalleryView();
  const [keyboardInput, setKeyboardInput] = useState(false);

  useEffect(() => {
    // Include the header search: clearing its last character is still keyboard input.
    const keyboard = () => setKeyboardInput(true);
    const pointer = () => setKeyboardInput(false);
    document.addEventListener("keydown", keyboard, true);
    document.addEventListener("pointerdown", pointer, true);
    return () => {
      document.removeEventListener("keydown", keyboard, true);
      document.removeEventListener("pointerdown", pointer, true);
    };
  }, []);

  const handleResetCommunity = () => {
    updateGalleryFilters({ query: "" });
    setGalleryView({ downloadsOnly: false });
  };

  return (
    <section
      id="gallery"
      className="gallery-section"
      aria-label="Template gallery"
      data-instant-motion={keyboardInput || Boolean(filters.query)}
    >
      <div className="page-container">
        <GalleryTabs
          activeTab={view.tab}
          onSelect={(tab) => setGalleryView({ tab })}
          onOpenSubmit={requestOpenCommunitySubmission}
        />

        {view.tab === "community" ? (
          <CommunityGallery
            query={filters.query}
            downloadsOnly={view.downloadsOnly}
            enabled={view.tab === "community"}
            onToggleDownloadsOnly={(downloadsOnly) => setGalleryView({ downloadsOnly })}
            onResetFilters={handleResetCommunity}
            onOpenSubmit={requestOpenCommunitySubmission}
          />
        ) : (
          <TemplateGallery filters={filters} keyboardInput={keyboardInput} />
        )}
      </div>
      <SubmissionDialog openEventName={COMMUNITY_SUBMISSION_OPEN_EVENT} />
    </section>
  );
}
