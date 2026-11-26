"use client";

import React from "react";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import type { TemplateSlug } from "../../data/templates";
import { trackDownload } from "../../lib/download";

/** Small client island so the static CDN link stays server-rendered and crawlable while counting clicks. */
export function DownloadHtmlLink({ slug, href, className = "" }: { slug: TemplateSlug; href: string; className?: string }) {
  return (
    <a href={href} download={`${slug}.html`} onClick={() => trackDownload(slug)} className={className}>
      <DownloadSimple size={18} aria-hidden="true" />
      <span>Download HTML</span>
    </a>
  );
}
