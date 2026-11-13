"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMotionAllowed } from "./useMotionAllowed";

export function ParallaxPhoto({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return <div className="aw-parallax-frame" ref={frame}><motion.div className="aw-parallax-photo" style={{ y: allowed ? y : 0, scale: allowed ? 1.1 : 1 }}>{children}</motion.div></div>;
}
