"use client";
import { useEffect, useRef, useState } from "react";

type Options = { once?: boolean; rootMargin?: string; threshold?: number };
type Entry = { callback: (inView: boolean) => void; once: boolean };

const observers = new Map<string, { observer: IntersectionObserver; entries: Map<Element, Entry> }>();

function shared(rootMargin: string, threshold: number) {
  const key = `${rootMargin}|${threshold}`;
  let record = observers.get(key);
  if (!record) {
    const entries = new Map<Element, Entry>();
    const observer = new IntersectionObserver(
      (batch) => {
        for (const item of batch) {
          const entry = entries.get(item.target);
          if (!entry) continue;
          entry.callback(item.isIntersecting);
          if (item.isIntersecting && entry.once) {
            entries.delete(item.target);
            observer.unobserve(item.target);
          }
        }
      },
      { rootMargin, threshold },
    );
    record = { observer, entries };
    observers.set(key, record);
  }
  return record;
}

/** One shared IntersectionObserver per (margin, threshold) pair. */
export function useInView<T extends Element>({ once = true, rootMargin = "0px 0px -12% 0px", threshold = 0 }: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const { observer, entries } = shared(rootMargin, threshold);
    entries.set(node, { callback: setInView, once });
    observer.observe(node);
    return () => {
      entries.delete(node);
      observer.unobserve(node);
    };
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
