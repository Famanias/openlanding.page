"use client";
import { useEffect, useRef, useState } from "react";

/** "Rehearsing now": a live readout that wanders by a few people every few seconds. Still under reduced motion and in hidden tabs. */
export function LiveCount({ base = 1284 }: { base?: number }) {
  const [n, setN] = useState(base);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setN((v) => Math.max(base - 40, Math.min(base + 60, v + Math.round(rand() * 6 - 2))));
      const el = ref.current;
      if (el) { el.removeAttribute("data-tick"); void el.offsetWidth; el.setAttribute("data-tick", ""); }
    }, 2600);
    return () => window.clearInterval(id);
  }, [base]);
  return <span ref={ref} className="us-live__n">{n.toLocaleString("en-US")}</span>;
}
