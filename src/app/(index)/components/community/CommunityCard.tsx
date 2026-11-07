"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import type { CommunityItem } from "../../../../lib/community/contracts";

export interface CommunityCardProps {
  item: CommunityItem;
  isEager?: boolean;
}

function getHostnamePlaceholder(websiteUrl: string): string {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./i, "");
  } catch {
    return websiteUrl;
  }
}

export function CommunityCard({ item, isEager = false }: CommunityCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hostname = useMemo(() => getHostnamePlaceholder(item.websiteUrl), [item.websiteUrl]);
  const showScreenshot = Boolean(item.imageUrl) && !imageFailed;

  return (
    <article className="template-card community-card">
      <div className="template-preview aspect-video" data-kind="community">
        <a
          href={item.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${item.title} live website in new tab`}
        >
          {showScreenshot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl!}
              alt={`${item.title} preview`}
              loading={isEager ? "eager" : "lazy"}
              onError={() => setImageFailed(true)}
              className="template-image"
            />
          ) : (
            <div className="community-preview-placeholder" aria-hidden="true">
              <span className="community-preview-domain">{hostname}</span>
              <span className="community-preview-badge">Live website</span>
            </div>
          )}
        </a>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3>
            <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </h3>

          <a
            href={item.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${item.title}`}
            title="Visit live website"
            className="card-action-btn"
          >
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>

          {item.downloadUrl && (
            <a
              href={item.downloadUrl}
              aria-label="Download HTML"
              title="Download HTML (MIT License)"
              className="card-action-btn"
            >
              <DownloadSimple size={16} aria-hidden="true" />
            </a>
          )}
        </div>

        {item.description && (
          <p className="community-card-description">{item.description}</p>
        )}

        <div className="community-card-meta">
          <span>By </span>
          <a
            href={item.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="community-credit-link"
          >
            {item.creatorName}
          </a>
        </div>
      </div>
    </article>
  );
}
