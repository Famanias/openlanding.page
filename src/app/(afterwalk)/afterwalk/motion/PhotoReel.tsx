"use client";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Picture } from "../assets";
import { nextStaticReelOffset, rescaleReelPhase, wrapReelOffset } from "./reelMath";
import { useMotionAllowed } from "./useMotionAllowed";

const PHOTOS = [
  { key: "walk-river", label: "A little water", number: "01" },
  { key: "walk-park", label: "Something sweet", number: "02" },
  { key: "hero", label: "The scenic route", number: "03" },
  { key: "walk-sunset", label: "The long way home", number: "04" },
  { key: "together", label: "Better together", number: "05" },
];

/** A continuous, flat filmstrip. Native horizontal scrolling is the complete fallback. */
export function PhotoReel() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const controls = useRef<{ stop: () => void } | null>(null);
  const lastPeriod = useRef(0);
  const wasLive = useRef(false);
  const x = useMotionValue(0);
  const periodValue = useMotionValue(0);
  const wrappedX = useTransform(() => wrapReelOffset(x.get(), periodValue.get()));
  const inView = useInView(viewport, { amount: 0.1 });
  const allowed = useMotionAllowed();
  const [live, setLive] = useState(false);
  const [period, setPeriod] = useState(0);
  const [copies, setCopies] = useState(3);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (allowed) {
      if (viewport.current) {
        x.set(-viewport.current.scrollLeft);
        viewport.current.scrollLeft = 0;
      }
      wasLive.current = true;
      setLive(true);
    } else if (wasLive.current) {
      const position = lastPeriod.current ? -wrapReelOffset(x.get(), lastPeriod.current) - lastPeriod.current : 0;
      controls.current?.stop();
      x.stop();
      setInteracting(false);
      wasLive.current = false;
      setLive(false);
      const frame = requestAnimationFrame(() => {
        if (viewport.current) viewport.current.scrollLeft = Math.min(position, Math.max(0, viewport.current.scrollWidth - viewport.current.clientWidth));
        x.set(0);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [allowed, x]);

  useEffect(() => () => controls.current?.stop(), []);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      const card = track.current.querySelector<HTMLElement>(".aw-reel-card");
      if (!card) return;
      const gap = Number.parseFloat(getComputedStyle(track.current).columnGap) || 0;
      const next = (card.getBoundingClientRect().width + gap) * PHOTOS.length;
      if (!Number.isFinite(next) || next <= 0) return;
      if (Math.abs(next - lastPeriod.current) > 0.01) {
        controls.current?.stop();
        x.stop();
        setInteracting(false);
        if (lastPeriod.current > 0) x.set(rescaleReelPhase(x.get(), lastPeriod.current, next));
        lastPeriod.current = next;
        periodValue.set(next);
        setPeriod(next);
      }
      setCopies(Math.max(3, Math.ceil(viewport.current.clientWidth / next) + 2));
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    if (viewport.current) observer?.observe(viewport.current);
    if (track.current) observer?.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { observer?.disconnect(); window.removeEventListener("resize", measure); };
  }, [x, periodValue]);

  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!live || !inView || !visible || paused || interacting || ((hovered || focused) && !playRequested) || period <= 0) return;
    const animation = animate(x, x.get() - period, { duration: period / 24, ease: "linear", repeat: Infinity, repeatType: "loop" });
    controls.current = animation;
    return () => { animation.stop(); if (controls.current === animation) controls.current = null; };
  }, [live, inView, visible, paused, interacting, hovered, focused, playRequested, period, x]);

  function step(direction: 1 | -1) {
    controls.current?.stop();
    setPlayRequested(false);
    const first = track.current?.querySelector<HTMLElement>(".aw-reel-card");
    const gap = track.current ? Number.parseFloat(getComputedStyle(track.current).columnGap) || 0 : 16;
    const distance = (first?.getBoundingClientRect().width ?? 280) + gap;
    if (!live) {
      const element = viewport.current;
      if (element) element.scrollTo({ left: nextStaticReelOffset(element.scrollLeft, distance, element.scrollWidth - element.clientWidth, direction), behavior: "instant" });
      return;
    }
    setInteracting(true);
    controls.current = animate(x, x.get() - distance * direction, { type: "spring", stiffness: 230, damping: 32, onComplete: () => setInteracting(false) });
  }

  return <section className="aw-reel-section" aria-labelledby="aw-reel-title" onMouseEnter={() => { setHovered(true); setPlayRequested(false); }} onMouseLeave={() => { setHovered(false); setPlayRequested(false); }} onFocusCapture={(event) => setFocused(event.target.matches(":focus-visible"))} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) { setFocused(false); setPlayRequested(false); } }}>
    <div className="aw-container aw-reel-heading"><div><span className="aw-kicker">A LITTLE LIFE, OUTSIDE</span><h2 id="aw-reel-title">The long way <em>looks good on you.</em></h2></div><p>Little moments from the walks we love.<br /><span>Scroll or drag to wander through →</span></p></div>
    <div className="aw-reel-viewport" ref={viewport} role="region" data-live={live ? "true" : "false"} data-period={period} tabIndex={live ? -1 : 0} aria-label="Walking photographs">
      <motion.div ref={track} className="aw-reel-track" style={{ x: live ? wrappedX : 0 }}
        onPanStart={live ? () => { controls.current?.stop(); x.stop(); setInteracting(true); setPlayRequested(false); } : undefined}
        onPan={live ? (_event, info) => x.set(x.get() + info.delta.x) : undefined}
        onPanEnd={live ? (event, info) => {
          const coast = Math.max(-150, Math.min(150, info.velocity.x * 0.12));
          if (event.type !== "pointercancel" && Math.abs(coast) > 2) controls.current = animate(x, x.get() + coast, { type: "spring", stiffness: 180, damping: 30, onComplete: () => setInteracting(false) });
          else setInteracting(false);
        } : undefined}>
        {Array.from({ length: live ? copies : 1 }, (_, copy) => PHOTOS.map((photo) => <figure className="aw-reel-card" key={`${copy}-${photo.key}`} data-original={copy === (live ? 1 : 0) ? "true" : undefined} aria-hidden={copy !== (live ? 1 : 0) ? true : undefined} inert={copy !== (live ? 1 : 0) ? true : undefined}>
          <div className="aw-reel-picture"><Picture assetKey={photo.key} alt="" sizes="(max-width: 760px) 75vw, 340px" /><span className="aw-reel-number">{photo.number} / 05</span></div>
          <figcaption><span>{photo.label}</span><span aria-hidden="true">↗</span></figcaption>
        </figure>))}
      </motion.div>
    </div>
    <div className="aw-container aw-reel-footer"><span>SMALL MOMENTS. GOOD COMPANY.</span><div className="aw-reel-actions aw-js-only">{live && period > 0 && <button className="aw-reel-pause" type="button" onClick={() => { if (!paused) { controls.current?.stop(); x.stop(); setInteracting(false); } setPlayRequested(paused); setPaused(!paused); }}>{paused ? "Play gallery" : "Pause gallery"}</button>}<button className="aw-reel-arrow" type="button" aria-label="Previous photo" onClick={() => step(-1)}>←</button><button className="aw-reel-arrow" type="button" aria-label="Next photo" onClick={() => step(1)}>→</button></div></div>
  </section>;
}
