"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Copy, DownloadSimple, Check } from "@phosphor-icons/react/dist/ssr";
import type { TemplateItem } from "../data/templates";

export interface TemplateCardProps { template: TemplateItem; isEager?: boolean; instantMotion?: boolean }
const copyBundleCache = new Map<string, string>();
export function prefetchCopyBundle(slug: string): void {
  if (typeof window === "undefined" || typeof fetch === "undefined") return;
  const url = `/${slug}`;
  if (copyBundleCache.has(url)) return;
  fetch(url).then((res) => res.ok ? res.text() : null)
    .then((text) => { if (text) copyBundleCache.set(url, text); }).catch(() => {});
}

export function TemplateCard({ template, isEager = false, instantMotion = false }: TemplateCardProps) {
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
    prefetchCopyBundle(template.slug);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPreviewing(true);
    }
  };
  const handleMouseLeave = () => {
    setPreviewing(false);
  };
  const handleFocus = () => { prefetchCopyBundle(template.slug); };
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
      const url = `/${template.slug}`;
      let content = copyBundleCache.get(url);
      if (!content) {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Template unavailable");
        content = await response.text();
        copyBundleCache.set(url, content);
      }
      let htmlToDownload = content;
      if (typeof window !== "undefined") {
        const origin = window.location.origin;
        if (!htmlToDownload.includes("<base ") && /<head[^>]*>/i.test(htmlToDownload)) {
          htmlToDownload = htmlToDownload.replace(/<head[^>]*>/i, (match) => `${match}\n  <base href="${origin}/" />`);
        }
      }
      if (typeof document !== "undefined") {
        const blob = new Blob([htmlToDownload], { type: "text/html;charset=utf-8" });
        const downloadUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = `${template.slug}.html`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(downloadUrl);
      }
      try {
        await copyText(htmlToDownload);
      } catch {
        // Clipboard write is optional convenience alongside file download
      }
      setCopiedAction("template");
    } catch { setCopyError("Couldn't download. Please try again."); }
    finally { setBusy(false); }
  };

  return (
    <motion.article layout={reducedMotion || instantMotion ? false : "position"} initial={false}
      transition={{ type: "spring", stiffness: 350, damping: 32 }} className="template-card"
      data-previewing={previewing && !reducedMotion} data-playing={playing && videoActive && !reducedMotion}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleFocus} onBlur={handleBlur}>
      <div ref={frameRef} className="template-preview aspect-video" data-kind="product">
        <a href={`/${template.slug}`} target="_blank" rel="noopener noreferrer" tabIndex={0}
          aria-label={`Open live ${template.title} template in new tab`}>
          {/* Gallery captures are local, naturally sized images; the viewport clips their scroll preview. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imageRef} src={imageFailed ? template.previewImage : `/gallery/${template.slug}.webp`}
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
          <button type="button" onClick={handleDownloadTemplate} aria-live="polite" aria-label={copiedAction === "template" ? "Downloaded template" : "Download template"}
            title="Download template" disabled={busy} aria-busy={busy} data-copied={copiedAction === "template"} className="card-action-btn">
            <span className="copy-icon-stack" aria-hidden="true">
              <DownloadSimple className="copy-icon-default" size={16} />
              <Check className="copy-icon-success" size={16} />
              <span className="copy-spinner" />
            </span>
          </button>
        </div>
        {copyError && <p className="copy-error" role="alert">{copyError}</p>}
      </div>
    </motion.article>
  );
}
