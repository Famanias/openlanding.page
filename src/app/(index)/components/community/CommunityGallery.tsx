"use client";

import React from "react";
import { CommunityCard } from "./CommunityCard";
import { useCommunity } from "./useCommunity";

export interface CommunityGalleryProps {
  query: string;
  downloadsOnly: boolean;
  enabled: boolean;
  onToggleDownloadsOnly: (downloadsOnly: boolean) => void;
  onResetFilters: () => void;
  onOpenSubmit: () => void;
}

export function CommunityGallery({
  query,
  downloadsOnly,
  enabled,
  onToggleDownloadsOnly,
  onResetFilters,
  onOpenSubmit,
}: CommunityGalleryProps) {
  const { items, loading, error, errorCode, nextCursor, loadMore, retry } = useCommunity({
    query,
    downloadsOnly,
    enabled,
  });

  const hasFilters = Boolean(query.trim()) || downloadsOnly;

  return (
    <div
      id="gallery-panel-community"
      role="tabpanel"
      aria-labelledby="gallery-tab-community"
      className="community-gallery-panel"
    >
      <div className="filter-panel community-filter-panel">
        <div className="filter-bottom community-filter-bar">
          <div className="community-filter-controls">
            <label className="community-downloads-toggle">
              <input
                type="checkbox"
                checked={downloadsOnly}
                onChange={(event) => onToggleDownloadsOnly(event.target.checked)}
              />
              <span>HTML downloads only</span>
            </label>
            <span className="community-scope-note">
              Reviewed community websites with creator attribution. Optional HTML downloads are MIT-licensed.
            </span>
          </div>

          <div className="filter-summary">
            <span aria-live="polite" aria-atomic="true" className="font-mono tabular-nums">
              {loading && items.length === 0
                ? "Loading community websites…"
                : `${items.length} community ${items.length === 1 ? "website" : "websites"}`}
            </span>
            {hasFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="reset-filters"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="gallery-empty community-error-state" role="status">
          <h3>
            {errorCode === "missing_config" || errorCode === "invalid_config"
              ? "Community gallery is not configured."
              : "Couldn't load community websites."}
          </h3>
          <p>{error}</p>
          {errorCode !== "missing_config" && errorCode !== "invalid_config" && (
            <button type="button" onClick={retry} className="primary-action">
              Try again
            </button>
          )}
        </div>
      )}

      {!error && !loading && items.length === 0 && (
        <div className="gallery-empty" role="status">
          <h3>No community websites found.</h3>
          <p>
            {hasFilters
              ? "Try another search query or turn off the HTML download filter."
              : "Be the first to share a live landing page with the community."}
          </p>
          <div className="community-empty-actions">
            {hasFilters ? (
              <button type="button" onClick={onResetFilters} className="primary-action">
                Reset filters
              </button>
            ) : (
              <button type="button" onClick={onOpenSubmit} className="primary-action">
                Add your website
              </button>
            )}
          </div>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div
            className="template-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
            aria-busy={loading}
          >
            {items.map((item, index) => (
              <CommunityCard key={item.id} item={item} isEager={index === 0} />
            ))}
          </div>

          {nextCursor && (
            <div className="community-pagination">
              <button
                type="button"
                onClick={loadMore}
                disabled={loading}
                className="primary-action"
              >
                {loading ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
