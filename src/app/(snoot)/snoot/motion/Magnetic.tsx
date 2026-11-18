"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { damp } from "./math";
import { useReducedMotion } from "./useReducedMotion";

const PULL = 10; // px at most
const REACH = 90; // px beyond the element's edge

/** Pulls its child toward a nearby fine pointer and eases back when it leaves. Off on touch and reduced motion. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let last = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      x = damp(x, tx, 12, dt);
      y = damp(y, ty, 12, dt);
      if (Math.abs(tx - x) < 0.05 && Math.abs(ty - y) < 0.05) {
        // snap in the same tick the loop stops, so a resting button never sits a sub-pixel off
        x = tx;
        y = ty;
        frame = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
      node.style.transform = x === 0 && y === 0 ? "" : `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };
    const wake = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const inside = Math.abs(dx) < rect.width / 2 + REACH && Math.abs(dy) < rect.height / 2 + REACH;
      tx = inside ? (dx / (rect.width / 2 + REACH)) * PULL : 0;
      ty = inside ? (dy / (rect.height / 2 + REACH)) * PULL : 0;
      wake();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      wake();
    };

    const zone = node.parentElement ?? node;
    zone.addEventListener("pointermove", onMove, { passive: true });
    zone.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      node.style.transform = "";
    };
  }, [reduced]);

  return (
    <span ref={ref} className={`sn-magnetic ${className ?? ""}`}>
      {children}
    </span>
  );
}
