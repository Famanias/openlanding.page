"use client";
import { motion, useScroll } from "motion/react";
import { useMotionAllowed } from "./useMotionAllowed";

export function ScrollProgress() {
  const allowed = useMotionAllowed();
  const { scrollYProgress } = useScroll();
  if (!allowed) return null;
  return <motion.div className="aw-scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
