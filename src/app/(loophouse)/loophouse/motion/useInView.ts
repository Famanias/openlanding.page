"use client";

import { useEffect, useRef, useState } from "react";

type InViewOptions = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
};

export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.1,
}: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
