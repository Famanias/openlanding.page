"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { REELS } from "../content/reels";
import { Scene } from "./scenes/Scene";
import { advance, assembleBend, decayFling, DRIFT, flingFrom, pushSample, type Sample } from "./momentum";
import { cardCount, cardAt, DESKTOP, layoutCards, PHONE, quadPoints, roundedQuadPath, tileLayout, type CardGeom, type Profile } from "./geometry";
import { REEL_CLIP } from "./reel-media";

const PHONE_QUERY = "(max-width: 820px)";
const NUDGE = 520;
const SYNC_EVERY_MS = 1000;

/** The first paint, before JS: desktop geometry at rest, placed in frame units through the --wu variable. */
function initialStyle(g: CardGeom): CSSProperties {
  const radius = DESKTOP.radius;
  return {
    left: `calc(50% + ${(g.left - DESKTOP.centre).toFixed(2)} * var(--wu))`,
    top: `calc(${(g.cy - Math.max(g.hl, g.hr) / 2).toFixed(2)} * var(--wu))`,
    width: `calc(${g.w.toFixed(2)} * var(--wu))`,
    height: `calc(${Math.max(g.hl, g.hr).toFixed(2)} * var(--wu))`,
    borderRadius: `calc(${radius} * var(--wu))`,
  };
}

const INITIAL = layoutCards(DESKTOP, 0, 10, 1);

/**
 * A curved video carousel. Each card is a rounded quad (clip-path: path()) whose size and lean come from its
 * x position (geometry.ts), recomputed every frame. The row drifts right → left, follows a drag 1:1, coasts
 * after release (momentum.ts) and then the drift carries on. One rAF loop writes everything; React state is
 * only the card count.
 */
export function ReelWheel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [count, setCount] = useState(10);
  const [clipOn, setClipOn] = useState(false);
  const countRef = useRef(10);
  const repaintRef = useRef<() => void>(() => {});

  useEffect(() => {
    countRef.current = count;
    repaintRef.current();
  }, [count]);

  useEffect(() => {
    const root = rootRef.current;
    const probe = probeRef.current;
    if (!root || !probe) return;

    const live = document.documentElement.dataset.saMotion === "live";
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phoneQuery = window.matchMedia(PHONE_QUERY);
    setClipOn(live && !!REEL_CLIP);

    let profile: Profile = phoneQuery.matches ? PHONE : DESKTOP;
    let unit = 1;
    let width = 0;
    let offset = 0;
    let fling = 0;
    let dragging = false;
    let samples: Sample[] = [];
    let lastPointerX = 0;
    let visible = true;
    let raf = 0;
    let last = 0;
    let started = 0;
    let lastSync = 0;
    let readied = false;

    const reduced = () => reducedQuery.matches;

    const measure = () => {
      profile = phoneQuery.matches ? PHONE : DESKTOP;
      unit = probe.offsetWidth / 1000 || 1;
      width = root.clientWidth;
      const needed = cardCount(profile, width / 2 / unit);
      if (needed !== countRef.current) {
        countRef.current = needed;
        setCount(needed);
      }
    };

    const cards = () => cardsRef.current.slice(0, countRef.current);

    const paint = (bend: number) => {
      const geoms = layoutCards(profile, offset, countRef.current, bend);
      const els = cards();
      for (let i = 0; i < geoms.length; i++) {
        const el = els[i];
        if (!el) continue;
        const g = geoms[i];
        const boxH = Math.max(g.hl, g.hr);
        const top = g.cy - boxH / 2;
        const px = (g.left - profile.centre) * unit + width / 2;
        const py = top * unit;
        const w = g.w * unit;
        const h = boxH * unit;
        const local = quadPoints(g).map((p) => ({ x: (p.x - g.left) * unit, y: (p.y - top) * unit }));
        el.style.opacity = "";
        el.style.left = "0px";
        el.style.top = "0px";
        el.style.borderRadius = "0";
        el.style.transform = `translate3d(${px.toFixed(2)}px,${py.toFixed(2)}px,0)`;
        el.style.width = `${w.toFixed(2)}px`;
        el.style.height = `${h.toFixed(2)}px`;
        el.style.clipPath = `path('${roundedQuadPath(local, profile.radius * unit)}')`;
        const play = el.querySelector<HTMLElement>(".sa-card__play");
        if (play) {
          const size = 34 * unit * (profile === PHONE ? 1.4 : 1);
          const y = (boxH / 2 + g.hl / 2) * unit - size - 14 * unit;
          play.style.left = "0px";
          play.style.top = "0px";
          play.style.bottom = "auto";
          play.style.width = `${size.toFixed(2)}px`;
          play.style.height = `${size.toFixed(2)}px`;
          play.style.transform = `translate3d(${(14 * unit).toFixed(2)}px,${y.toFixed(2)}px,0)`;
        }
        const video = el.querySelector<HTMLVideoElement>(".sa-card__video");
        if (video) {
          const t = tileLayout(i % 10, w, h);
          video.style.width = `${t.w.toFixed(2)}px`;
          video.style.height = `${t.h.toFixed(2)}px`;
          video.style.transform = `translate3d(${t.x.toFixed(2)}px,${t.y.toFixed(2)}px,0)`;
        }
      }
      if (!readied) {
        readied = true;
        root.dataset.ready = "true";
      }
    };

    const currentBend = (now: number) => (live && !reduced() ? assembleBend(now - started) : 1);

    const syncVideos = (now: number) => {
      if (now - lastSync < SYNC_EVERY_MS) return;
      lastSync = now;
      const vids = Array.from(root.querySelectorAll<HTMLVideoElement>(".sa-card__video"));
      const master = vids[0];
      if (!master) return;
      for (const v of vids.slice(1)) {
        if (Math.abs(v.currentTime - master.currentTime) > 0.15) v.currentTime = master.currentTime;
      }
    };

    const needsLoop = () => visible && (dragging || fling !== 0 || !reduced() || currentBend(performance.now()) < 1);

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!dragging) {
        const drift = reduced() ? 0 : DRIFT;
        offset = advance(offset, fling, dt, drift);
        fling = decayFling(fling, dt);
      }
      paint(currentBend(now));
      syncVideos(now);
      if (needsLoop()) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    repaintRef.current = () => {
      measure();
      paint(currentBend(performance.now()));
      if (needsLoop()) kick();
    };

    started = performance.now();
    measure();
    paint(currentBend(started));
    kick();

    // Drag: follows the pointer 1:1, then coasts.
    const down = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      if ((e.target as Element).closest("button")) return;
      dragging = true;
      fling = 0;
      lastPointerX = e.clientX;
      samples = [{ t: e.timeStamp, x: e.clientX / unit }];
      root.dataset.dragging = "true";
      root.setPointerCapture(e.pointerId);
      kick();
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      offset += (e.clientX - lastPointerX) / unit;
      lastPointerX = e.clientX;
      samples = pushSample(samples, { t: e.timeStamp, x: e.clientX / unit });
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      root.dataset.dragging = "false";
      if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId);
      fling = reduced() ? 0 : flingFrom(samples);
      kick();
    };
    const keys = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      fling += e.key === "ArrowRight" ? NUDGE : -NUDGE;
      kick();
    };

    root.addEventListener("pointerdown", down);
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    root.addEventListener("keydown", keys);

    const ro = new ResizeObserver(() => repaintRef.current());
    ro.observe(root);
    phoneQuery.addEventListener("change", repaintRef.current);
    reducedQuery.addEventListener("change", repaintRef.current);

    // Off-screen, the loop stops completely and the scenes' own loops pause.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      root.dataset.playing = visible ? "true" : "false";
      if (visible) kick();
    });
    io.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      phoneQuery.removeEventListener("change", repaintRef.current);
      reducedQuery.removeEventListener("change", repaintRef.current);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
      root.removeEventListener("keydown", keys);
      repaintRef.current = () => {};
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="sa-wheel"
      data-ready="false"
      data-dragging="false"
      data-playing="true"
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Reels from our makers. Drag, or use the arrow keys, to spin the wheel."
    >
      <span ref={probeRef} className="sa-wheel__probe" aria-hidden="true" />
      <ul className="sa-wheel__track">
        {Array.from({ length: count }, (_, i) => {
          const reel = REELS[i % REELS.length];
          const initial = INITIAL[i] ?? cardAt(DESKTOP, 0, 1, i);
          return (
            <li
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="sa-card"
              style={i < INITIAL.length ? initialStyle(initial) : { opacity: 0 }}
              aria-label={`${reel.title}, by ${reel.maker}`}
            >
              <div className="sa-card__media">
                <Scene id={reel.scene} />
                {clipOn && REEL_CLIP && <ReelVideo />}
              </div>
              <span className="sa-card__play" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M9.5 7.2v9.6l7.6-4.8z" />
                </svg>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** One <video> per card, all on the same src (downloaded once) and fading in when its first frame is ready. */
function ReelVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const clip = REEL_CLIP;
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const ready = () => (v.dataset.ready = "true");
    if (v.readyState >= 2) ready();
    v.addEventListener("loadeddata", ready);
    return () => v.removeEventListener("loadeddata", ready);
  }, []);
  if (!clip) return null;
  const phone = typeof window !== "undefined" && window.matchMedia(PHONE_QUERY).matches;
  return (
    <video
      ref={ref}
      className="sa-card__video"
      src={phone && clip.srcMobile ? clip.srcMobile : clip.src}
      poster={clip.poster}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
