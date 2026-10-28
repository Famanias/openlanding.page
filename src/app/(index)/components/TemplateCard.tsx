"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Copy, DownloadSimple, Check, ThumbsUp, ThumbsDown } from "@phosphor-icons/react/dist/ssr";
import type { TemplateItem } from "../data/templates";

import type { VoteCounts, VoteDirection } from "../../../lib/votes/types";

export interface TemplateCardProps {
  template: TemplateItem; isEager?: boolean; instantMotion?: boolean;
  counts?: VoteCounts; myVote?: VoteDirection; votesReady?: boolean; votePending?: boolean;
  voteError?: string; onVote?: (dir: VoteDirection) => void;
}
export function TemplateCard({ template, isEager = false, instantMotion = false,
  counts = { up: 0, down: 0 }, myVote, votesReady = false, votePending = false, voteError, onVote }: TemplateCardProps) {
  const [copiedAction, setCopiedAction] = useState<"prompt" | "template" | null>(null);
  const [copyError, setCopyError] = useState("");
  const [busy, setBusy] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const attachPreviewImage = useCallback((img: HTMLImageElement | null) => {
    imageRef.current = img;
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
    const frame = frameRef.current;
    const img = imageRef.current;
    if (!frame || !img) return;
    const measure = () => frame.style.setProperty("--preview-travel", `${Math.min(0, frame.clientHeight - img.clientHeight)}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const video = videoRef.current;
    const keepMuted = () => {
      if (!video) return;
      if (!video.defaultMuted) video.defaultMuted = true;
      if (!video.muted) video.muted = true;
      if (video.volume !== 0) video.volume = 0;
    };
    keepMuted();
    video?.addEventListener("volumechange", keepMuted);
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const shouldPlay = () => visible && !document.hidden && !motionPreference.matches;
    const syncPlayback = () => {
      const active = shouldPlay();
      setVideoActive(Boolean(video) && active);
      if (!active) {
        setPreviewing(false);
        video?.pause();
        return;
      }
      // Start only visible clips; keep the image if the browser blocks playback.
      keepMuted();
      video?.play().then(() => { if (!shouldPlay()) video.pause(); }).catch(() => {});
    };
    const handleEnded = () => {
      if (!video) return;
      video.currentTime = 0;
      if (shouldPlay()) {
        video.play().catch(() => {});
      }
    };
    video?.addEventListener("ended", handleEnded);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      syncPlayback();
    }, { threshold: [0, 0.1] });
    observer.observe(frame);
    document.addEventListener("visibilitychange", syncPlayback);
    motionPreference.addEventListener("change", syncPlayback);
    return () => {
      visible = false;
      video?.pause();
      video?.removeEventListener("volumechange", keepMuted);
      video?.removeEventListener("ended", handleEnded);
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motionPreference.removeEventListener("change", syncPlayback);
    };
  }, [template.videoClip]);

  const handleMouseEnter = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPreviewing(true);
    }
  };
  const handleMouseLeave = () => {
    setPreviewing(false);
  };
  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) handleMouseLeave();
  };
  const copyText = async (text: string) => {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(text);
  };
  const handleCopyPrompt = async () => {
    setCopyError("");
    try { await copyText(template.promptMarkdown); setCopiedAction("prompt"); }
    catch { setCopyError("Couldn't copy. Please try again."); }
  };
  const handleDownloadTemplate = async () => {
    setCopyError("");
    setCopiedAction(null);
    setBusy(true);
    try {
      const response = await fetch(`/downloads/${template.slug}.html`);
      if (!response.ok) throw new Error("HTML unavailable");
      const content = await response.text();
      const blob = new Blob([content], { type: "text/html;charset=utf-8" });
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `${template.slug}.html`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      setCopiedAction("template");
    } catch { setCopyError("Couldn't download. Please try again."); }
    finally { setBusy(false); }
  };

  return (
    <motion.article layout={reducedMotion || instantMotion ? false : "position"} initial={false}
      transition={{ type: "spring", stiffness: 350, damping: 32 }} className="template-card"
      data-previewing={previewing && !reducedMotion} data-playing={playing && videoActive && !reducedMotion}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onBlur={handleBlur}>
      <div ref={frameRef} className="template-preview aspect-video" data-kind="product">
        <a href={`/${template.slug}`} target="_blank" rel="noopener noreferrer" tabIndex={0}
          aria-label={`Open live ${template.title} template in new tab`}>
          {/* Gallery captures are local, naturally sized images; the viewport clips their scroll preview. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={attachPreviewImage} src={imageFailed ? template.previewImage : `/gallery/${template.slug}.webp`}
            onError={() => setImageFailed(true)} alt={`${template.title} preview`} loading={isEager ? "eager" : "lazy"}
            className="template-image" />
          {template.videoClip && <video ref={videoRef} src={template.videoClip} muted loop playsInline
            poster={template.previewImage} preload="none" aria-hidden="true" className="template-video motion-reduce:hidden"
            onPlaying={() => setPlaying(true)} onError={() => setPlaying(false)} />}
        </a>
        {template.model && <div className="model-tag"><span data-testid="model-tag">{template.model}</span></div>}
      </div>
      <div className="card-body">
        <div className="card-title-row">
          <h3><a href={`/${template.slug}`} target="_blank" rel="noopener noreferrer">{template.title}</a></h3>
          <button type="button" onClick={handleCopyPrompt} aria-live="polite" aria-label={copiedAction === "prompt" ? "Copied prompt" : "Copy prompt"}
            title="Copy prompt" data-copied={copiedAction === "prompt"} className="card-action-btn">
            <span className="copy-icon-stack" aria-hidden="true">
              <Copy className="copy-icon-default" size={16} />
              <Check className="copy-icon-success" size={16} />
            </span>
          </button>
          {template.hasDownload && <button type="button" onClick={handleDownloadTemplate} aria-live="polite" aria-label={copiedAction === "template" ? "Downloaded HTML" : "Download HTML"}
            title={copiedAction === "template" ? "Downloaded HTML" : "Download HTML"} disabled={busy} aria-busy={busy} data-copied={copiedAction === "template"} className="card-action-btn">
            <span className="copy-icon-stack" aria-hidden="true">
              <DownloadSimple className="copy-icon-default" size={16} />
              <Check className="copy-icon-success" size={16} />
              <span className="copy-spinner" />
            </span>
          </button>}
        </div>
        <div className="card-votes" role="group" aria-label={`Rate ${template.title}`} aria-busy={votePending}>
          {(["up", "down"] as const).map((dir) => {
            const selected = myVote === dir;
            const Icon = dir === "up" ? ThumbsUp : ThumbsDown;
            const action = dir === "up" ? "Like" : "Dislike";
            return <button key={dir} type="button" className="card-vote-btn"
              disabled={Boolean(myVote) || votePending || !votesReady} aria-disabled={Boolean(myVote) || votePending || !votesReady}
              aria-pressed={selected} onClick={() => onVote?.(dir)}
              aria-label={selected ? `You ${dir === "up" ? "liked" : "disliked"} ${template.title} (${counts[dir]})` : `${action} ${template.title} (${counts[dir]})`}
              title={myVote ? "Your vote is final" : `${action} this template. Votes are final.`}>
              <Icon size={16} weight={selected ? "fill" : "regular"} aria-hidden="true" />
              <span aria-live="polite" aria-atomic="true">{counts[dir]}</span>
            </button>;
          })}
          {myVote && <span className="vote-final">Vote recorded</span>}
        </div>
        {voteError && <p className="copy-error" role="alert">{voteError}</p>}
        {copyError && <p className="copy-error" role="alert">{copyError}</p>}
      </div>
    </motion.article>
  );
}
