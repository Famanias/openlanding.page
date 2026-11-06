"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let active = false;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        cursorX = targetX;
        cursorY = targetY;
        active = true;
        if (cursorRef.current) cursorRef.current.classList.add("is-active");
      }
    };

    const handlePointerLeave = () => {
      active = false;
      if (cursorRef.current) cursorRef.current.classList.remove("is-active");
    };

    const loop = () => {
      if (active && cursorRef.current) {
        cursorX += (targetX - cursorX) * 0.22;
        cursorY += (targetY - cursorY) * 0.22;
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" id="custom-cursor" aria-hidden="true" />;
}
