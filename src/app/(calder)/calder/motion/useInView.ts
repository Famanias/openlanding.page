"use client";

import { useEffect, useRef, useState } from "react";

type Options = { once?: boolean; rootMargin?: string; threshold?: number };

/** Tracks whether an element is on screen. With `once`, it latches true after the first sighting. */
export function useInView<T extends Element>({ once = false, rootMargin = "0px", threshold = 0 }: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
