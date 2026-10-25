"use client";

import React, { useEffect, useRef, useState } from "react";
import { isMotionLive } from "./mode";
import { magneticOffset } from "./math";

export type RevealVariant = "rise" | "mask" | "wipe" | "cascade" | "draw" | "stamp";

type ObserverCallback = () => void;
const callbacks = new WeakMap<Element, ObserverCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              cb();
              sharedObserver?.unobserve(entry.target);
              callbacks.delete(entry.target);
            }
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
  }
  return sharedObserver;
}

type RevealProps = {
  as?: "div" | "section" | "article" | "header" | "p" | "span" | "li" | "h2" | "h3";
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  className?: string;
  children: React.ReactNode;
};

export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  index = 0,
  className = "",
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!isMotionLive()) {
      setInView(true);
      setDone(true);
      return;
    }

    const observer = getSharedObserver();
    if (!observer) {
      setInView(true);
      setDone(true);
      return;
    }

    let timerId: number | undefined;
    callbacks.set(el, () => {
      setInView(true);
      timerId = window.setTimeout(() => setDone(true), 1200);
    });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      data-reveal={variant}
      data-in={inView ? "true" : "false"}
      data-done={done ? "true" : undefined}
      style={
        {
          "--delay": `${delay}ms`,
          "--i": index,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

export function CountUp({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMotionLive()) {
      setDisplay(value);
      return;
    }

    let rafId = 0;
    const observer = getSharedObserver();
    if (!observer) {
      setDisplay(value);
      return;
    }

    callbacks.set(el, () => {
      const duration = 900;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(value * eased));
        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };
      rafId = requestAnimationFrame(tick);
    });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value]);

  return (
    <span ref={ref} className={`tl-countup ${className}`}>
      <span className="tl-sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}

export function Magnetic({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    let rafId = 0;
    const onMove = (e: PointerEvent) => {
      if (!isMotionLive()) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = magneticOffset(e.clientX - cx, 9, rect.width);
        const dy = magneticOffset(e.clientY - cy, 7, rect.height);
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = "translate3d(0px, 0px, 0)";
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className={`tl-magnetic ${className}`}>
      {children}
    </div>
  );
}
