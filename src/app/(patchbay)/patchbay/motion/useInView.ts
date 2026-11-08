"use client";

import { useEffect, useRef, useState } from "react";

type Listener = (entry: IntersectionObserverEntry) => void;

const listeners = new Map<Element, Listener>();
let observer: IntersectionObserver | null = null;

/** One observer for the whole template; each element registers a listener. */
function getObserver(rootMargin: string): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) listeners.get(entry.target)?.(entry);
      },
      { rootMargin },
    );
  }
  return observer;
}

type Options = { once?: boolean; rootMargin?: string };

export function useInView<T extends Element>({ once = true, rootMargin = "0px 0px -12% 0px" }: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = getObserver(rootMargin);
    listeners.set(node, (entry) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && once) {
        io.unobserve(node);
        listeners.delete(node);
      }
    });
    io.observe(node);
    return () => {
      io.unobserve(node);
      listeners.delete(node);
    };
  }, [once, rootMargin]);

  return { ref, inView };
}
