"use client";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionAllowed } from "./useMotionAllowed";
import { heroProgress } from "./scrollMath";

/** A native sticky handoff: the next sheet covers the hero while it settles back. */
export function HeroStage({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const [largeScreen, setLargeScreen] = useState(false);
  const [fitsViewport, setFitsViewport] = useState(false);
  const allowed = useMotionAllowed();
  const { scrollY } = useScroll();
  const start = useMotionValue(0);
  const distance = useMotionValue(1);
  const progress = useTransform(() => heroProgress(scrollY.get(), start.get(), distance.get()));
  const scale = useTransform(progress, [0, 1], [1, 0.955]);
  const opacity = useTransform(progress, [0, 1], [1, 0.7]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px) and (min-height: 700px)");
    const sync = () => setLargeScreen(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!marker.current || !stage.current) return;
      start.set(marker.current.getBoundingClientRect().top + window.scrollY);
      distance.set(Math.max(1, stage.current.offsetHeight * 0.9));
      setFitsViewport(stage.current.offsetHeight <= window.innerHeight);
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    if (stage.current) observer?.observe(stage.current);
    window.addEventListener("resize", measure);
    return () => { observer?.disconnect(); window.removeEventListener("resize", measure); };
  }, [start, distance]);

  const live = largeScreen && fitsViewport && allowed;
  return <><span ref={marker} className="aw-hero-marker" aria-hidden="true" /><div ref={stage} className="aw-hero-stage" data-pinned={live ? "true" : "false"}>
    <motion.div className="aw-hero-frame" style={{ scale: live ? scale : 1, opacity: live ? opacity : 1 }}>{children}</motion.div>
  </div></>;
}
