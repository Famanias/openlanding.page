"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Copy, Code, Check } from "@phosphor-icons/react/dist/ssr";
import type { TemplateItem } from "../data/templates";

export interface TemplateCardProps { template: TemplateItem; isEager?: boolean }
const copyBundleCache = new Map<string, string>();
export function prefetchCopyBundle(slug: string): void {
  if (typeof window === "undefined" || typeof fetch === "undefined") return;
  const url = `/copy/${slug}.md`;
  if (copyBundleCache.has(url)) return;
  fetch(url).then((res) => res.ok ? res.text() : null)
    .then((text) => { if (text) copyBundleCache.set(url, text); }).catch(() => {});
}

export function TemplateCard({ template, isEager = false }: TemplateCardProps) {
  const [copiedAction, setCopiedAction] = useState<"prompt" | "website" | null>(null);
  const [copyError, setCopyError] = useState("");
  const [busy, setBusy] = useState(false);
  const [previewing, setPreviewing] = useState(false);
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
    const video = videoRef.current;
    if (!video) return;
    if (previewing && !reducedMotion) {
      let cancelled = false;
      video.play().then(() => { if (cancelled) video.pause(); }).catch(() => {});
      return () => { cancelled = true; video.pause(); };
    }
    video.pause();
  }, [previewing, reducedMotion]);

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
    if (!frameRef.current) return;
    const stop = () => { setPreviewing(false); videoRef.current?.pause(); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
    observer.observe(frameRef.current);
    const onVisibility = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  const handleMouseEnter = () => {
    prefetchCopyBundle(template.slug);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPreviewing(true);
    }
  };
  const handleMouseLeave = () => {
    setPreviewing(false);
    setPlaying(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
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
  const handleCopyWebsite = async () => {
    setCopyError("");
    setBusy(true);
    try {
      const url = `/copy/${template.slug}.md`;
      let content = copyBundleCache.get(url);
      if (!content) {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Bundle unavailable");
        content = await response.text();
        copyBundleCache.set(url, content);
      }
      await copyText(content);
      setCopiedAction("website");
    } catch { setCopyError("Couldn't copy. Please try again."); }
    finally { setBusy(false); }
  };

  return (
    <motion.article layout={reducedMotion ? false : "position"} initial={false}
      transition={{ type: "spring", stiffness: 350, damping: 32 }} className="template-card"
      data-previewing={previewing && !reducedMotion} data-playing={playing && previewing && !reducedMotion}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleFocus} onBlur={handleBlur}>
      <div ref={frameRef} className="template-preview aspect-[16/10]" data-kind="product">
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
            {copiedAction === "prompt" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          </button>
          <button type="button" onClick={handleCopyWebsite} aria-live="polite" aria-label={copiedAction === "website" ? "Copied website" : "Copy website"}
            title="Copy website" disabled={busy} aria-busy={busy} data-copied={copiedAction === "website"} className="card-action-btn">
            {copiedAction === "website" ? <Check size={16} aria-hidden="true" /> : <Code size={16} aria-hidden="true" />}
          </button>
        </div>
        {copyError && <p className="copy-error" role="alert">{copyError}</p>}
      </div>
    </motion.article>
  );
}
