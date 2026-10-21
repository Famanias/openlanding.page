"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { spectralStore } from "../spectrum/spectral-store";

export function SpatialViewport({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const storeState = useSyncExternalStore(
    spectralStore.subscribe,
    spectralStore.getSnapshot,
    spectralStore.getSnapshot
  );

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
          spectralStore.setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const orbit = storeState.cameraOrbit;
  const isReduced = storeState.reducedMotion;

  // Parallax custom properties for subtle depth on decorative layers
  const parallaxStyle = isReduced
    ? ({ "--ir-orbit-pitch": "0deg", "--ir-orbit-yaw": "0deg" } as React.CSSProperties)
    : ({
        "--ir-orbit-pitch": `${orbit.pitchDeg}deg`,
        "--ir-orbit-yaw": `${orbit.yawDeg}deg`,
      } as React.CSSProperties);

  return (
    <div
      ref={containerRef}
      className="ir-spatial-viewport w-full min-h-screen relative"
      style={parallaxStyle}
    >
      <div className="ir-spatial-stage w-full">
        {children}
      </div>
    </div>
  );
}
