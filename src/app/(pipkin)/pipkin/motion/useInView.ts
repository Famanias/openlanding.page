"use client";
import { useEffect, useRef, useState } from "react";

type Entry = { once: boolean; set: (v: boolean) => void };
const listeners = new Map<Element, Entry>();
let observer: IntersectionObserver | null = null;

function shared() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const l = listeners.get(e.target);
        if (!l) continue;
        l.set(e.isIntersecting);
        if (e.isIntersecting && l.once) {
          observer?.unobserve(e.target);
          listeners.delete(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
  );
  return observer;
}

/** One shared IntersectionObserver for the whole template. `once` reveals stay revealed; otherwise `inView` follows the element. */
export function useInView<T extends Element = HTMLElement>({ once = true }: { once?: boolean } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = shared();
    listeners.set(el, { once, set: setInView });
    io.observe(el);
    return () => {
      io.unobserve(el);
      listeners.delete(el);
    };
  }, [once]);
  return { ref, inView };
}
