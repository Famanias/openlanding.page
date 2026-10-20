"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Code, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { TemplateItem } from "../data/templates";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export interface TemplateCardProps {
  template: TemplateItem;
  isEager?: boolean;
}

// Module-level in-memory cache to avoid duplicate fetches and Safari gesture timeout
const copyBundleCache = new Map<string, string>();

export function prefetchCopyBundle(slug: string): void {
  if (typeof window === "undefined" || typeof fetch === "undefined") return;
  const url = `/copy/${slug}.md`;
  if (copyBundleCache.has(url)) return;
  fetch(url)
    .then((res) => {
      if (res.ok) return res.text();
      return null;
    })
    .then((text) => {
      if (text) copyBundleCache.set(url, text);
    })
    .catch(() => {
      // Prefetch failures are non-blocking; click handler will retry
    });
}

export function TemplateCard({ template, isEager = false }: TemplateCardProps) {
  const [copiedAction, setCopiedAction] = useState<"prompt" | "website" | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Clear clipboard feedback timeout on unmount or on new action
  useEffect(() => {
    if (!copiedAction) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCopiedAction(null);
    }, 2000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [copiedAction]);

  const handleMouseEnter = () => {
    prefetchCopyBundle(template.slug);
    if (videoRef.current && typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (!prefersReducedMotion) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleFocus = () => {
    prefetchCopyBundle(template.slug);
    if (videoRef.current && typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (!prefersReducedMotion) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      handleMouseLeave();
    }
  };

  const copyText = async (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await copyText(template.promptMarkdown);
      setCopiedAction("prompt");
    } catch (err) {
      console.error(`Failed to copy prompt for ${template.slug}:`, err);
    }
  };

  const handleCopyWebsite = async () => {
    try {
      const url = `/copy/${template.slug}.md`;
      let content = copyBundleCache.get(url);
      if (!content && typeof fetch !== "undefined") {
        const res = await fetch(url);
        if (res.ok) {
          content = await res.text();
          copyBundleCache.set(url, content);
        }
      }
      if (content) {
        await copyText(content);
        setCopiedAction("website");
      }
    } catch (err) {
      console.error(`Failed to copy website bundle for ${template.slug}:`, err);
    }
  };

  return (
    <article
      className="group flex flex-col bg-[#141518] rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors duration-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* 16:10 preview container with 1px hairline border */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-neutral-900">
        <a
          href={`/${template.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
          tabIndex={0}
          aria-label={`Open live ${template.title} template in new tab`}
        >
          <img
            src={template.previewImage}
            alt={`${template.title} preview`}
            loading={isEager ? "eager" : "lazy"}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {template.videoClip && (
            <video
              ref={videoRef}
              src={template.videoClip}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:hidden"
            />
          )}
        </a>
      </div>

      {/* Card body & metadata */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Title and external link icon */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white tracking-tight">
            <a
              href={`/${template.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm"
            >
              {template.title}
            </a>
          </h3>
          <a
            href={`/${template.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open live ${template.title} demo in new tab`}
            className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-0.5"
          >
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
        </div>

        {/* Editorial description */}
        <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5" aria-label="Template badges">
          {template.badges.map((badge) => (
            <Badge key={badge} variant="mono">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Monospace utility footer */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="truncate">{template.stack}</span>
          </div>

          {/* Split-action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={copiedAction === "prompt" ? "outline" : "solid"}
              size="sm"
              onClick={handleCopyPrompt}
              aria-live="polite"
              className={`flex-1 font-mono text-xs ${
                copiedAction === "prompt"
                  ? "!border-emerald-500/40 !bg-emerald-500/10 !text-[#10B981]"
                  : ""
              }`}
            >
              {copiedAction === "prompt" ? (
                <span className="flex items-center justify-center gap-1 text-[#10B981] font-semibold">
                  ✓ Copied
                </span>
              ) : (
                <>
                  <Copy className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>Copy prompt</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyWebsite}
              aria-live="polite"
              className={`flex-1 font-mono text-xs ${
                copiedAction === "website"
                  ? "!border-emerald-500/40 !bg-emerald-500/10 !text-[#10B981]"
                  : ""
              }`}
            >
              {copiedAction === "website" ? (
                <span className="flex items-center justify-center gap-1 text-[#10B981] font-semibold">
                  ✓ Copied
                </span>
              ) : (
                <>
                  <Code className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>Copy website</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
