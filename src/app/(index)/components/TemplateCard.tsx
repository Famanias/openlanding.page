"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Copy, DownloadSimple, Check, ThumbsUp, ThumbsDown } from "@phosphor-icons/react/dist/ssr";
import type { TemplateItem } from "../data/templates";
import { downloadStandalone } from "../lib/download";
import { templatePath } from "../../../lib/template-routing";
import { templateDetailPath } from "../../../lib/catalog-routes";
import { fetchOrBuildWebflowPrompt } from "./detail/CopyWebflowPromptButton";
import { McpSetupDialog } from "./McpSetupDialog";

import type { VoteCounts, VoteDirection } from "../../../lib/votes/types";

export interface TemplateCardProps {
  template: TemplateItem; isEager?: boolean; instantMotion?: boolean;
  counts?: VoteCounts; myVote?: VoteDirection; votesReady?: boolean; votePending?: boolean;
  voteError?: string; onVote?: (dir: VoteDirection) => void;
}
export function TemplateCard({ template, isEager = false, instantMotion = false,
  counts = { up: 0, down: 0 }, myVote, votesReady = false, votePending = false, voteError, onVote }: TemplateCardProps) {
  const [copiedAction, setCopiedAction] = useState<"prompt" | "webflow" | "template" | null>(null);
  const [copyError, setCopyError] = useState("");
  const [busy, setBusy] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mcpDialogOpen, setMcpDialogOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuWrapRef = useRef<HTMLDivElement | null>(null);
  const attachPreviewImage = useCallback((img: HTMLImageElement | null) => {
    // A missing capture can fail before hydration attaches onError.
    if (img?.complete && img.naturalWidth === 0) setImageFailed(true);
  }, []);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!copiedAction) return;
    timerRef.current = setTimeout(() => setCopiedAction(null), 2000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [copiedAction]);

  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (menuWrapRef.current && !menuWrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const copyText = async (text: string) => {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(text);
  };
  const handleCopyPrompt = async () => {
    setCopyError("");
    setMenuOpen(false);
    try { await copyText(template.promptMarkdown); setCopiedAction("prompt"); }
    catch { setCopyError("Couldn't copy. Please try again."); }
  };
  const handleCopyWebflowPrompt = async () => {
    setCopyError("");
    setMenuOpen(false);
    try {
      const webflowPrompt = await fetchOrBuildWebflowPrompt(template);
      await copyText(webflowPrompt);
      setCopiedAction("webflow");
    } catch {
      setCopyError("Couldn't copy Webflow prompt. Please try again.");
    }
  };
  const handleDownloadTemplate = async () => {
    setCopyError("");
    setCopiedAction(null);
    setBusy(true);
    try {
      await downloadStandalone(template.slug);
      setCopiedAction("template");
    } catch { setCopyError("Couldn't download. Please try again."); }
    finally { setBusy(false); }
  };

  const isPromptCopied = copiedAction === "prompt" || copiedAction === "webflow";
  const copyButtonLabel =
    copiedAction === "prompt"
      ? "Copied prompt"
      : copiedAction === "webflow"
        ? "Copied Webflow prompt"
        : "Copy prompt";

  return (
    <motion.article layout={reducedMotion || instantMotion ? false : "position"} initial={false}
      transition={{ type: "spring", stiffness: 350, damping: 32 }} className="template-card">
      <div className="template-preview aspect-video" data-kind="product">
        <a href={templatePath(template.slug)} target="_blank" rel="noopener noreferrer" tabIndex={0}
          aria-label={`Open live ${template.title} template in new tab`}>
          {/* Gallery captures show the top of each template. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={attachPreviewImage} src={imageFailed ? template.previewImage : `/gallery/${template.slug}.webp`}
            onError={() => setImageFailed(true)} alt={`${template.title} preview`} loading={isEager ? "eager" : "lazy"}
            className="template-image" />

        </a>
        {template.model && <div className="model-tag"><span data-testid="model-tag">{template.model}</span></div>}
      </div>
      <div className="card-body">
        <div className="card-title-row">
          <h3><a href={templatePath(template.slug)} target="_blank" rel="noopener noreferrer">{template.title}</a></h3>
          <a href={templateDetailPath(template.slug)} className="card-details-link" aria-label={`Details: ${template.title} landing page template`}>Details</a>
          <div className="card-copy-menu-wrap" ref={menuWrapRef}>
            <button type="button" onClick={() => setMenuOpen((prev) => !prev)} aria-live="polite"
              aria-label={copyButtonLabel} aria-haspopup="menu" aria-expanded={menuOpen}
              title="Copy prompt" data-copied={isPromptCopied} className="card-action-btn">
              <span className="copy-icon-stack" aria-hidden="true">
                <Copy className="copy-icon-default" size={16} />
                <Check className="copy-icon-success" size={16} />
              </span>
            </button>
            {menuOpen && (
              <div className="card-copy-popover" role="menu" aria-label={`Copy prompt options for ${template.title}`}>
                <button type="button" role="menuitem" className="card-copy-item" onClick={handleCopyPrompt}>
                  <span>Copy code prompt</span>
                  <small>Next.js</small>
                </button>
                <button type="button" role="menuitem" className="card-copy-item" onClick={handleCopyWebflowPrompt}>
                  <span>Copy Webflow prompt</span>
                  <small>Webflow MCP</small>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="card-copy-item card-copy-item-mcp"
                  onClick={() => {
                    setMenuOpen(false);
                    setMcpDialogOpen(true);
                  }}
                >
                  <span>Setup openlanding MCP</span>
                  <small>JSON</small>
                </button>
              </div>
            )}
          </div>
          <button type="button" onClick={handleDownloadTemplate} aria-live="polite" aria-label={copiedAction === "template" ? "Downloaded HTML" : "Download HTML"}
            aria-description={template.hasDownload ? undefined : "The standalone HTML export is coming soon."}
            title={!template.hasDownload ? "HTML coming soon" : copiedAction === "template" ? "Downloaded HTML" : "Download HTML"}
            disabled={busy || !template.hasDownload} aria-busy={busy} data-copied={copiedAction === "template"} className="card-action-btn">
            <span className="copy-icon-stack" aria-hidden="true">
              <DownloadSimple className="copy-icon-default" size={16} />
              <Check className="copy-icon-success" size={16} />
              <span className="copy-spinner" />
            </span>
          </button>
        </div>
        <div className="card-votes" role="group" aria-label={`Rate ${template.title}`} aria-busy={votePending}>
          {(["up", "down"] as const).map((dir) => {
            const selected = myVote === dir;
            const Icon = dir === "up" ? ThumbsUp : ThumbsDown;
            const action = dir === "up" ? "Like" : "Dislike";
            const disabled = Boolean(myVote && !selected) || votePending || !votesReady;
            return <button key={dir} type="button" className="card-vote-btn"
              disabled={disabled} aria-disabled={disabled}
              aria-pressed={selected} onClick={() => onVote?.(dir)}
              aria-label={selected ? `Remove your ${dir === "up" ? "like" : "dislike"} for ${template.title} (${counts[dir]})` : `${action} ${template.title} (${counts[dir]})`}
              title={selected ? `Remove your ${dir === "up" ? "like" : "dislike"}` : myVote ? "Remove your current vote to choose again" : `${action} this template`}>
              <Icon size={16} weight={selected ? "fill" : "regular"} aria-hidden="true" />
              <span aria-live="polite" aria-atomic="true">{counts[dir]}</span>
            </button>;
          })}
          {myVote && <span className="vote-final">Click again to remove</span>}
        </div>
        {voteError && <p className="copy-error" role="alert">{voteError}</p>}
        {copyError && <p className="copy-error" role="alert">{copyError}</p>}
      </div>
      <McpSetupDialog open={mcpDialogOpen} onClose={() => setMcpDialogOpen(false)} />
    </motion.article>
  );
}
