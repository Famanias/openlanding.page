"use client";
import { useEffect, useRef } from "react";

/**
 * Marks its parent with data-off="true" while the parent is out of view, so CSS can pause
 * ambient loops (see `.pk-hero[data-off="true"] *`). Renders nothing visible.
 */
export function PauseOffscreen() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const io = new IntersectionObserver(([e]) => { parent.dataset.off = e.isIntersecting ? "false" : "true"; }, { threshold: 0 });
    io.observe(parent);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} hidden />;
}
