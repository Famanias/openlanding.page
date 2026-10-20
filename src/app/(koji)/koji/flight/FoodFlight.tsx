"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Picture } from "../assets";
import { CLIPS } from "./clips.generated";
import { FLIGHT, flightHeightVh, seamOffsetsVh, toEngineConfig, type Flight } from "./flight.config";
import { SlabWipe } from "./SlabWipe";

const CLIP_BASE = "/templates/koji/clips";

/** Seams whose connector clip is missing fall back to a slab wipe automatically. */
function effectiveFlight(): Flight {
  return { ...FLIGHT, seams: FLIGHT.seams.map((s, i) => (s === "clip" && CLIPS.connectors[i] ? "clip" : "slabWipe")) };
}

const ALL_DIVES = CLIPS.dives.every(Boolean);

/** The five scenes as a still sequence: used before clips exist and under reduced motion. */
function StaticFlight() {
  return (
    <ol className="kj-flight-static" data-flight="static">
      {FLIGHT.sections.map((s, i) => (
        <li key={s.id} className="kj-flight-static__scene">
          <Picture
            assetKey={`flight-${s.id}`}
            alt={`${s.label}: ${s.courses.map((c) => c.detail).join(", ")}`}
            className="kj-photo kj-flight-static__still"
            sizes="(min-width: 900px) 60vw, 100vw"
          />
          <div className="kj-flight-static__copy">
            <p className="kj-mono">
              {String(i + 1).padStart(2, "0")} / 05 · {s.jp}
            </p>
            <h3 className="kj-h3">{s.label}</h3>
            <p>{s.courses.map((c) => c.detail).join(" / ")}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * The scroll-scrubbed food flight (scroll-world engine). Its fixed layers are pinned to a sticky,
 * transformed box, and it measures scroll from the flight's own top.
 */
function ScrubFlight() {
  const outerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const flight = useMemo(effectiveFlight, []);
  const wipes = useMemo(() => seamOffsetsVh(flight), [flight]);
  const [wipeKey, setWipeKey] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const mount = mountRef.current;
    if (!outer || !mount || mount.dataset.mounted) return;
    mount.dataset.mounted = "true";

    const topbar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar")) || 72;
    const originY = () => outer.getBoundingClientRect().top + window.scrollY - topbar;
    const scrollY = () => window.scrollY - originY();

    // The engine fetches every clip on mount, so it waits until the flight is a viewport away;
    // the hero then paints without competing for bandwidth.
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        near.disconnect();
        import("./scrub-engine.js").then(({ mountScrollWorld }) => {
          mountScrollWorld(mount, { ...toEngineConfig(flight, CLIP_BASE), scrollY, originY });
        });
      },
      { rootMargin: "100% 0px" },
    );
    near.observe(outer);

    // Slab wipes: replay whenever the scroll position crosses a cut, in either direction.
    let last = scrollY() / window.innerHeight;
    const onScroll = () => {
      const now = scrollY() / window.innerHeight;
      if (wipes.some((w) => (last < w && now >= w) || (last >= w && now < w))) setWipeKey((k) => k + 1);
      last = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      near.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [flight, wipes]);

  return (
    <div
      ref={outerRef}
      className="kj-flight"
      data-flight="scrub"
      style={{ "--flight-height": flightHeightVh(flight) } as React.CSSProperties}
    >
      <div className="kj-flight__sticky">
        <div ref={mountRef} className="kj-flight__engine" />
        <SlabWipe playKey={wipeKey} />
      </div>
    </div>
  );
}

/**
 * Scrubbed video when all five dives exist and motion is allowed; otherwise the still sequence.
 * The still sequence renders until reduced motion is known, so the engine never mounts for visitors who
 * asked for less motion.
 */
export function FoodFlight() {
  const [scrub, setScrub] = useState(false);
  useEffect(() => {
    setScrub(ALL_DIVES && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return scrub ? <ScrubFlight /> : <StaticFlight />;
}
