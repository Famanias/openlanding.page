"use client";

import { useEffect, useRef } from "react";
import type { JourneyEngine } from "./engine";
import styles from "./journeyStyles";
import { shouldStartJourney } from "./runtime";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function supportsWebGL2(): boolean {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

/**
 * Feature root for the scroll-driven delivery journey: a fixed, full-bleed
 * WebGL world behind the landing content. The page only marks its sections
 * with `data-journey-stop`; everything else (Three.js, the scene, the
 * render loop) is lazy-loaded here after hydration.
 *
 * Without WebGL (or before it starts) a painted sky stands in, so the page
 * never shows an empty backdrop. Reduced motion renders still frames that
 * cut between stops instead of animating.
 */
export function JourneyExperience() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<JourneyEngine | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const reducedRef = useRef(reducedMotion);

  useEffect(() => {
    reducedRef.current = reducedMotion;
    engineRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.closest<HTMLElement>("[data-journey]");
    let cancelled = false;
    let started = false;

    const start = () => {
      if (
        started ||
        cancelled ||
        !shouldStartJourney({
          reducedMotion: reducedRef.current,
          visibilityState: document.visibilityState,
          webgl2: supportsWebGL2(),
          search: window.location.search,
        })
      ) {
        return;
      }
      started = true;

      import("./engine")
        .then(({ createJourneyEngine }) => {
          if (cancelled || !host.isConnected) return;
          try {
            engineRef.current = createJourneyEngine({
              host,
              canvasClassName: styles.canvas,
              reducedMotion: reducedRef.current,
              onReady: () => root?.setAttribute("data-journey", "live"),
            });
          } catch {
            // WebGL context creation failed: the painted fallback stays.
          }
        })
        .catch(() => {});
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") start();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      engineRef.current?.dispose();
      engineRef.current = null;
      root?.setAttribute("data-journey", "static");
    };
  }, []);

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.fallback} />
      <div ref={hostRef} className={styles.canvasHost} />
    </div>
  );
}
