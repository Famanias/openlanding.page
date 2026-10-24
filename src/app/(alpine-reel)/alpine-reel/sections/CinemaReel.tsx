"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ASSETS } from "../assets.generated";
import { PEAKS, type Award, type Peak } from "../slides/data";
import {
  AUTO_START_INDEX,
  DRAG_THRESHOLD,
  LOOP_COPIES,
  PITCH_VW,
  SLIDE_WIDTH_VW,
  contentProgress,
  indexForDrag,
  parallaxOffset,
  springStep,
  targetX,
  wrapIndex,
} from "../mechanic/deck";
import { clamp } from "../motion/math";
import { useReducedMotion } from "../motion/useReducedMotion";

const IMAGE_DIR = "/templates/alpine-reel";
const COPY_OFFSET = PEAKS.length * 2;
const INITIAL_SLOT = COPY_OFFSET + AUTO_START_INDEX;
const SWEEP_END_SLOT = COPY_OFFSET + PEAKS.length;
// Slides this close to the middle copy are rendered in full too, so a step past either end of it shows a real
// frame; the slot then snaps back to the identical frame in the middle copy.
const EDGE_SLIDES = 3;

function renderedInFull(copy: number, index: number): boolean {
  if (copy === 2) return true;
  if (copy === 1) return index >= PEAKS.length - EDGE_SLIDES;
  return copy === 3 && index < EDGE_SLIDES;
}

function imageUrl(id: string): string {
  return `${IMAGE_DIR}/${id}-1600.webp`;
}

// The processed 1600 variant is capped at the source width, so advertise its real width.
function slideImage(id: string): { src: string; srcSet: string; width: number; height: number } {
  const { w, h } = ASSETS[id] ?? { w: 1600, h: 900 };
  return {
    src: imageUrl(id),
    srcSet: `${IMAGE_DIR}/${id}-800.webp 800w, ${imageUrl(id)} ${Math.min(w, 1600)}w`,
    width: w,
    height: h,
  };
}

function splitEyebrow(text: string): [string, string] {
  const parts = text.split(" / ");
  if (parts.length > 1) return [parts[0], parts.slice(1).join(" / ")];
  const pivot = Math.ceil(text.length / 2);
  return [text.slice(0, pivot), text.slice(pivot)];
}

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <svg className={compact ? "arl-mark arl-mark--compact" : "arl-mark"} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="28" fill="none" />
      <path d="M12 51 28 31 40 44 53 24 68 51" fill="none" />
      <path d="M26 62h28" />
      <circle cx="61" cy="20" r="4" />
    </svg>
  );
}

function Logo() {
  return (
    <span className="arl-logo" aria-label="Alpine Reel">
      <Mark compact />
      <span className="arl-logo__text"><span>Alpine</span> Reel</span>
    </span>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="arl-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true" data-filled={index < count ? "true" : "false"}>✦</span>
      ))}
    </span>
  );
}

function AwardRow({ item }: { item: Award }) {
  return (
    <div className="arl-award">
      <Stars count={item.stars} />
      <span className="arl-award__label">{item.label}</span>
      <span className="arl-award__quote">“{item.quote}”</span>
    </div>
  );
}

function PeakContent({ peak, onExplore }: { peak: Peak; onExplore: () => void }) {
  const [eyebrowA, eyebrowB] = splitEyebrow(peak.eyebrow);
  return (
    <div className="arl-slide__content">
      <div className="arl-slide__topline">
        <div className="arl-year">{peak.year}</div>
        <div className="arl-eyebrow"><span>{eyebrowA}</span><span>{eyebrowB}</span></div>
        <div className="arl-badge"><span>8,000</span><small>metres</small></div>
      </div>

      <div className="arl-slide__title-block">
        <p className="arl-range">{peak.range} · {peak.rank}</p>
        <h2>
          <span>{peak.titleLines[0]}</span>
          <span>{peak.titleLines[1]}</span>
        </h2>
        <div className="arl-ascent-row">
          <span><b>First ascent</b>{peak.firstAscent}</span>
          <span><b>Elevation</b>{peak.stats.elevation}</span>
        </div>
      </div>

      <div className="arl-slide__awards" aria-label={`${peak.name} accolades`}>
        {peak.awards.map((item) => <AwardRow key={item.label} item={item} />)}
      </div>

      <button type="button" className="arl-explore" onClick={onExplore}>
        <span>Explore</span><span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}

function SlideFrame({
  peak,
  copy,
  index,
  activeIndex,
  opened,
  onExplore,
}: {
  peak: Peak;
  copy: number;
  index: number;
  activeIndex: number;
  opened: boolean;
  onExplore: (peak: Peak) => void;
}) {
  const active = index === activeIndex;
  const full = renderedInFull(copy, index);
  // K2 is on screen at first paint; Everest is next. The rest of the sweep path is warmed up after the page loads.
  const imagePriority = copy === 2 && index <= 1 ? (index === 1 ? "high" : "auto") : "low";
  return (
    <article
      className="arl-slide"
      data-index={index}
      data-copy={copy}
      data-active={active ? "true" : "false"}
      data-open={opened ? "true" : "false"}
      aria-hidden={copy !== 2 ? "true" : undefined}
      inert={copy !== 2}
      aria-label={`${peak.name}, ${peak.stats.elevation}`}
    >
      <div className="arl-slide__inner">
        <div className="arl-slide__image" aria-hidden="true">
          {full && <img
              {...slideImage(peak.id)}
              sizes="(max-width: 800px) 90vw, 80vw"
              alt=""
              draggable={false}
              loading={copy === 2 && index <= 1 ? "eager" : "lazy"}
              fetchPriority={imagePriority}
            />}
          <div className="arl-slide__tint" />
          <div className="arl-slide__vignette" />
        </div>
        {full && <PeakContent peak={peak} onExplore={() => onExplore(peak)} />}
      </div>
    </article>
  );
}

function Indicator({ activeIndex, onSelect, hidden }: { activeIndex: number; onSelect: (index: number) => void; hidden: boolean }) {
  return (
    <div className="arl-indicator" data-hidden={hidden ? "true" : "false"} aria-hidden={hidden}>
      <span>{String(activeIndex + 1).padStart(2, "0")}</span>
      <div className="arl-indicator__pips">
        {PEAKS.map((peak, index) => (
          <button key={peak.id} type="button" aria-label={`Go to ${peak.name}`} aria-pressed={index === activeIndex} onClick={() => onSelect(index)}>
            <i data-active={index === activeIndex ? "true" : "false"} />
          </button>
        ))}
      </div>
      <span>{String(PEAKS.length).padStart(2, "0")}</span>
    </div>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string | number; suffix?: string }) {
  return (
    <div className="arl-stat">
      <span>{label}</span>
      <strong>{value}{suffix}</strong>
    </div>
  );
}

function DetailsPanel({ peak, open, onClose }: { peak: Peak | null; open: boolean; onClose: () => void }) {
  return (
    <>
      <button className="arl-backdrop" data-open={open ? "true" : "false"} style={{ cursor: "pointer" }} type="button" aria-label="Close peak details" onClick={onClose} />
      <aside className="arl-details" data-open={open ? "true" : "false"} style={{ cursor: "default" }} aria-hidden={!open} aria-label={peak ? `${peak.name} details` : "Peak details"}>
        {peak && (
          <div className="arl-details__scroll" tabIndex={0} style={{ cursor: "default" }}>
            <div className="arl-details__image">
              <img src={imageUrl(peak.id)} alt="" />
              <div />
            </div>
            <div className="arl-details__body" style={{ cursor: "default" }}>
              <p className="arl-details__eyebrow">{peak.eyebrow}</p>
              <h2><span>{peak.titleLines[0]}</span><span>{peak.titleLines[1]}</span></h2>
              <p className="arl-details__meta">{peak.firstAscent} · {peak.year} · {peak.range}</p>
              <hr />
              <p className="arl-details__description">{peak.description}</p>
              <hr />
              <div className="arl-stats-grid">
                <Stat label="Success" value={peak.stats.success} suffix="%" />
                <Stat label="Survival" value={peak.stats.survival} suffix="%" />
                <Stat label="Elevation" value={peak.stats.elevation} />
                <Stat label="Prominence" value={peak.stats.prominence} />
                <Stat label="Coordinates" value={peak.stats.coordinates} />
                <Stat label="Season" value={peak.stats.season} />
              </div>
              <div className="arl-stat arl-stat--country"><span>Country</span><strong>{peak.stats.country}</strong></div>
              <hr />
              <div className="arl-awards-list">
                {peak.awards.map((item) => <AwardRow item={item} key={item.label} />)}
              </div>
            </div>
          </div>
        )}
        <button type="button" className="arl-details__close" style={{ cursor: "pointer" }} onClick={onClose} aria-label="Close peak details"><span /><span /></button>
      </aside>
    </>
  );
}

export default function CinemaReel() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const introRef = useRef<number | null>(null);
  const normalizeTimerRef = useRef<number | null>(null);
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const slotRef = useRef(INITIAL_SLOT);
  const draggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const dragOriginRef = useRef(0);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const hoverZoneRef = useRef<"left" | "right" | "center">("center");
  const activeIndexRef = useRef(AUTO_START_INDEX);
  const introStateRef = useRef(true);
  const lastFrameRef = useRef({ x: Number.NaN, index: -1, intro: true });
  const tickRef = useRef<() => void>(() => undefined);
  const [activeIndex, setActiveIndex] = useState(AUTO_START_INDEX);
  const [intro, setIntro] = useState(true);
  const [openPeak, setOpenPeak] = useState<Peak | null>(null);
  const openPeakRef = useRef<Peak | null>(null);
  openPeakRef.current = openPeak;
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false, pressed: false, zone: "center" as "left" | "right" | "center" });
  const slides = useMemo(() => Array.from({ length: LOOP_COPIES }, (_, copy) => PEAKS.map((peak, index) => ({ peak, index, copy }))).flat(), []);

  const measure = useCallback(() => {
    const width = window.innerWidth;
    const mobile = width <= 800;
    const leftPad = width * (mobile ? 0.07 : 0.1);
    const pitch = width * ((mobile ? 90 : PITCH_VW) / 100);
    return { leftPad, pitch };
  }, []);

  const syncTarget = useCallback(() => {
    const { leftPad, pitch } = measure();
    targetXRef.current = targetX(leftPad, pitch, slotRef.current);
  }, [measure]);

  const writeTrack = useCallback((value: number) => {
    currentXRef.current = value;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${value}px, 0, 0)`;
  }, []);

  const updateContent = useCallback(() => {
    const { pitch } = measure();
    const slideWidth = window.innerWidth * (SLIDE_WIDTH_VW / 100);
    const activeSlot = slotRef.current;
    const currentX = currentXRef.current;
    const { leftPad } = measure();
    const activeDelta = currentX - targetX(leftPad, pitch, activeSlot);
    const progress = contentProgress(activeDelta, slideWidth);
    const activeNodes = trackRef.current?.querySelectorAll<HTMLElement>(`[data-index="${activeIndexRef.current}"]`);
    activeNodes?.forEach((node) => {
      const content = node.querySelector<HTMLElement>(".arl-slide__content");
      const image = node.querySelector<HTMLElement>(".arl-slide__image");
      if (content) {
        content.style.setProperty("--arl-content-opacity", String(introStateRef.current ? 0 : progress));
        content.style.setProperty("--arl-content-x", `${(1 - progress) * 56}px`);
        content.style.setProperty("--arl-content-blur", `${(1 - progress) * 12}px`);
      }
      if (image) image.style.setProperty("--arl-parallax", `${parallaxOffset(activeDelta)}px`);
    });
  }, [measure]);

  const tick = useCallback(() => {
    const delta = targetXRef.current - currentXRef.current;
    if (!introStateRef.current && !draggingRef.current && Math.abs(delta) > 0.1) writeTrack(springStep(currentXRef.current, targetXRef.current));
    const last = lastFrameRef.current;
    if (last.x !== currentXRef.current || last.index !== activeIndexRef.current || last.intro !== introStateRef.current) {
      last.x = currentXRef.current;
      last.index = activeIndexRef.current;
      last.intro = introStateRef.current;
      updateContent();
    }
    rafRef.current = window.requestAnimationFrame(() => tickRef.current());
  }, [updateContent, writeTrack]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const normalizeSlot = useCallback(() => {
    if (slotRef.current >= COPY_OFFSET + PEAKS.length) slotRef.current -= PEAKS.length;
    if (slotRef.current < COPY_OFFSET) slotRef.current += PEAKS.length;
    syncTarget();
    writeTrack(targetXRef.current);
  }, [syncTarget, writeTrack]);

  const selectIndex = useCallback((index: number) => {
    const next = wrapIndex(index, PEAKS.length);
    slotRef.current = COPY_OFFSET + next;
    activeIndexRef.current = next;
    setActiveIndex(next);
    introStateRef.current = false;
    setIntro(false);
    syncTarget();
    if (Math.abs(targetXRef.current - currentXRef.current) > window.innerWidth * 1.4) writeTrack(targetXRef.current);
  }, [syncTarget, writeTrack]);

  const navigate = useCallback((direction: 1 | -1) => {
    // A long run of steps (a trackpad swipe) must not walk off the slides rendered in full: wrap the whole track a loop early.
    const wanted = slotRef.current + direction;
    const wrapBy = wanted < COPY_OFFSET - EDGE_SLIDES ? PEAKS.length : wanted >= COPY_OFFSET + PEAKS.length + EDGE_SLIDES ? -PEAKS.length : 0;
    if (wrapBy) {
      writeTrack(currentXRef.current - wrapBy * measure().pitch);
      slotRef.current += wrapBy;
    }
    const nextSlot = slotRef.current + direction;
    const nextIndex = wrapIndex(nextSlot, PEAKS.length);
    setIntro(false);
    introStateRef.current = false;
    slotRef.current = nextSlot;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    syncTarget();
    // One timer, restarted on every step, so a quick run of presses snaps back once, after the last one settles.
    if (normalizeTimerRef.current) window.clearTimeout(normalizeTimerRef.current);
    normalizeTimerRef.current = window.setTimeout(normalizeSlot, 760);
  }, [measure, normalizeSlot, syncTarget, writeTrack]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    root.dataset.enhanced = "true";
    root.dataset.js = "true";
    const { leftPad, pitch } = measure();
    const startX = targetX(leftPad, pitch, INITIAL_SLOT);
    const sweepEndX = targetX(leftPad, pitch, SWEEP_END_SLOT);
    writeTrack(reducedMotion ? targetX(leftPad, pitch, COPY_OFFSET) : startX);
    slotRef.current = reducedMotion ? COPY_OFFSET : INITIAL_SLOT;
    syncTarget();
    if (reducedMotion) {
      introStateRef.current = false;
      setIntro(false);
      activeIndexRef.current = 0;
      setActiveIndex(0);
    } else {
      // Strict Mode re-runs this effect after cleanup cancelled the first intro, so start from a clean intro state.
      introStateRef.current = true;
      activeIndexRef.current = AUTO_START_INDEX;
      const scanlines = root.querySelector<HTMLElement>(".arl-scanlines");
      const blur = root.querySelector<SVGFEGaussianBlurElement>("#arl-motion-blur feGaussianBlur");
      const startedAt = performance.now();
      const introTick = (now: number) => {
        const t = clamp((now - startedAt) / 3000, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        // Velocity of the power3.out sweep, normalised to its peak: drives the streak and the horizontal blur.
        const speed = Math.pow(1 - t, 2);
        writeTrack(startX + (sweepEndX - startX) * eased);
        blur?.setAttribute("stdDeviation", `${(speed * 18).toFixed(2)} 0`);
        scanlines?.style.setProperty("--arl-scan-opacity", speed.toFixed(3));
        if (t < 1) introRef.current = window.requestAnimationFrame(introTick);
        else {
          // The sweep ends on the middle copy's Everest twin one loop on; fold back to the identical frame at the middle copy.
          slotRef.current = COPY_OFFSET;
          activeIndexRef.current = 0;
          setActiveIndex(0);
          introStateRef.current = false;
          setIntro(false);
          blur?.setAttribute("stdDeviation", "0 0");
          scanlines?.style.setProperty("--arl-scan-opacity", "0");
          syncTarget();
          writeTrack(targetXRef.current);
        }
      };
      introRef.current = window.requestAnimationFrame(introTick);
    }
    rafRef.current = window.requestAnimationFrame(tick);
    const onResize = () => {
      syncTarget();
      if (!draggingRef.current) writeTrack(targetXRef.current);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPeak(null);
        return;
      }
      if (openPeakRef.current) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); navigate(1); }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); navigate(-1); }
    };
    const onWheel = (event: WheelEvent) => {
      if ((event.target as HTMLElement | null)?.closest?.(".arl-details")) return;
      if (openPeakRef.current) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      if (Math.abs(event.deltaX) < 1 && Math.abs(event.deltaY) < 1) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      navigate(delta > 0 ? 1 : -1);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (openPeakRef.current || (event.target as HTMLElement | null)?.closest?.(".arl-details")) return;
      if ((event.target as HTMLElement).closest("button")) return;
      draggingRef.current = true;
      dragStartRef.current = event.clientX;
      dragOriginRef.current = currentXRef.current;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      root.setPointerCapture?.(event.pointerId);
      setCursor((value) => ({ ...value, pressed: true }));
    };
    const onPointerMove = (event: PointerEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      const isInsideDetails = Boolean((event.target as HTMLElement | null)?.closest?.(".arl-details"));
      const zone = (openPeakRef.current || isInsideDetails)
        ? "center"
        : (event.clientX < window.innerWidth * 0.1 ? "left" : event.clientX > window.innerWidth * 0.9 ? "right" : "center");
      hoverZoneRef.current = zone;
      setCursor((value) => ({ ...value, x: event.clientX, y: event.clientY, visible: true, zone }));
      if (draggingRef.current) writeTrack(dragOriginRef.current + (event.clientX - dragStartRef.current));
    };
    const onPointerUp = (event: PointerEvent) => {
      if (openPeakRef.current || (event.target as HTMLElement | null)?.closest?.(".arl-details")) {
        draggingRef.current = false;
        try { root.releasePointerCapture?.(event.pointerId); } catch {}
        setCursor((value) => ({ ...value, pressed: false }));
        return;
      }
      if (!draggingRef.current) {
        if (hoverZoneRef.current === "left") navigate(-1);
        if (hoverZoneRef.current === "right") navigate(1);
        setCursor((value) => ({ ...value, pressed: false }));
        return;
      }
      draggingRef.current = false;
      root.releasePointerCapture?.(event.pointerId);
      const delta = event.clientX - dragStartRef.current;
      const next = indexForDrag(delta, window.innerWidth, activeIndexRef.current, PEAKS.length, DRAG_THRESHOLD);
      // A drag moves one slide in the direction dragged, so it wraps through the loop copies like the arrow keys do.
      if (next !== activeIndexRef.current) navigate(delta < 0 ? 1 : -1);
      else { syncTarget(); }
      setCursor((value) => ({ ...value, pressed: false }));
    };
    const onPointerEnter = (event: PointerEvent) => setCursor((value) => ({ ...value, x: event.clientX, y: event.clientY, visible: true }));
    const onPointerLeave = () => setCursor((value) => ({ ...value, visible: false, pressed: false }));
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);
    // Only K2 and Everest compete for the first paint; the rest of the sweep path is fetched once the page has loaded.
    const warmSweepPath = () => root.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => { img.loading = "eager"; });
    if (document.readyState === "complete") warmSweepPath();
    else window.addEventListener("load", warmSweepPath, { once: true });
    return () => {
      window.removeEventListener("load", warmSweepPath);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (introRef.current) window.cancelAnimationFrame(introRef.current);
      if (normalizeTimerRef.current) window.clearTimeout(normalizeTimerRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [measure, navigate, reducedMotion, selectIndex, syncTarget, tick, writeTrack]);

  useEffect(() => {
    if (openPeak) document.body.dataset.arlModal = "open";
    else delete document.body.dataset.arlModal;
    return () => { delete document.body.dataset.arlModal; };
  }, [openPeak]);

  return (
    <main
      ref={rootRef}
      className="arl-reel"
      aria-label="Alpine Reel: the fourteen eight-thousanders"
      data-intro={intro ? "true" : "false"}
      data-reduced={reducedMotion ? "true" : "false"}
      style={openPeak ? { cursor: "default" } : undefined}
    >
      <h1 className="arl-visually-hidden">Alpine Reel: the fourteen eight-thousanders</h1>
      <svg className="arl-defs" aria-hidden="true" width="0" height="0">
        <defs><filter id="arl-motion-blur" x="-25%" y="-5%" width="150%" height="110%"><feGaussianBlur stdDeviation="0 0" /></filter></defs>
      </svg>
      <div className="arl-scanlines" aria-hidden="true" />
      <header className="arl-header">
        <Logo />
        <div className="arl-header__right"><span>14 peaks / 8,000m+</span><span className="arl-header__hint">Drag or scroll to move</span></div>
      </header>
      <div className="arl-stage">
        <div className="arl-track" ref={trackRef}>
          {slides.map(({ peak, copy, index }) => (
            <SlideFrame key={`${copy}-${peak.id}`} peak={peak} copy={copy} index={index} activeIndex={activeIndex} opened={copy === 2 && openPeak?.id === peak.id} onExplore={setOpenPeak} />
          ))}
        </div>
      </div>
      <div className="arl-mask arl-mask--left" aria-hidden="true" />
      <div className="arl-mask arl-mask--right" aria-hidden="true" />
      <div
        className="arl-cursor"
        data-visible={cursor.visible ? "true" : "false"}
        data-pressed={cursor.pressed ? "true" : "false"}
        data-zone={cursor.zone}
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
          ...(openPeak ? { display: "none", opacity: 0, pointerEvents: "none" } : {}),
        }}
        aria-hidden="true"
      >
        <span className="arl-cursor__label">{cursor.zone === "center" ? "Scroll" : ""}</span>
        <span className="arl-cursor__chevron arl-cursor__chevron--left">‹</span><span className="arl-cursor__chevron arl-cursor__chevron--right">›</span>
      </div>
      <Indicator activeIndex={activeIndex} onSelect={selectIndex} hidden={Boolean(openPeak)} />
      <div className="arl-readout" aria-live="polite"><span>{String(activeIndex + 1).padStart(2, "0")}</span><b>{PEAKS[activeIndex]?.name}</b><small>{PEAKS[activeIndex]?.stats.elevation}</small></div>
      <DetailsPanel peak={openPeak} open={Boolean(openPeak)} onClose={() => setOpenPeak(null)} />
      <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}"}</style></noscript>
    </main>
  );
}
