"use client";
import { useEffect, useRef } from "react";
import { progress, round } from "./math";

/**
 * The leash: a hairline across the top with a paw at its end. One passive listener schedules one rAF that
 * writes transforms straight onto the line and the paw (a custom property on the root would restyle the
 * whole document every frame).
 */
export function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const pawRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const line = lineRef.current;
    const paw = pawRef.current;
    if (!line || !paw) return;
    let frame = 0;
    const write = () => {
      frame = 0;
      const p = round(progress(window.scrollY, 0, root.scrollHeight - window.innerHeight));
      line.style.transform = `scaleX(${p})`;
      paw.style.transform = `translateX(${round(p * (window.innerWidth - 4), 1)}px) rotate(90deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };
    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="sn-leash" aria-hidden="true">
      <div className="sn-leash-line" ref={lineRef} />
      <svg className="sn-leash-paw" viewBox="0 0 40 40" ref={pawRef}>
        <ellipse cx="20" cy="26" rx="9" ry="8" />
        <circle cx="9" cy="16" r="4" />
        <circle cx="16" cy="10" r="4" />
        <circle cx="24" cy="10" r="4" />
        <circle cx="31" cy="16" r="4" />
      </svg>
    </div>
  );
}
