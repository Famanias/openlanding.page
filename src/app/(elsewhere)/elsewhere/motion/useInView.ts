"use client";
import { useEffect, useRef, useState } from "react";

type Callback = (entry: IntersectionObserverEntry) => void;

// One observer per rootMargin for the whole template, instead of one per element.
const observers = new Map<string, { observer: IntersectionObserver; callbacks: Map<Element, Callback> }>();

function observe(element: Element, rootMargin: string, callback: Callback): () => void {
  let shared = observers.get(rootMargin);
  if (!shared) {
    const callbacks = new Map<Element, Callback>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) callbacks.get(entry.target)?.(entry);
      },
      { rootMargin, threshold: 0.01 },
    );
    shared = { observer, callbacks };
    observers.set(rootMargin, shared);
  }
  shared.callbacks.set(element, callback);
  shared.observer.observe(element);
  return () => {
    shared.callbacks.delete(element);
    shared.observer.unobserve(element);
    if (shared.callbacks.size === 0) {
      shared.observer.disconnect();
      observers.delete(rootMargin);
    }
  };
}

type Options = { once?: boolean; rootMargin?: string };

export function useInView<T extends Element>({ once = true, rootMargin = "0px 0px -12% 0px" }: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }
    let stop: (() => void) | undefined = observe(element, rootMargin, (entry) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) {
          stop?.();
          stop = undefined;
        }
      } else if (!once) {
        setInView(false);
      }
    });
    return () => stop?.();
  }, [once, rootMargin]);

  return { ref, inView };
}
