"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { scrollForStep } from "../motion/progress";
import { goto } from "../motion/SmoothScroll";

/**
 * The chapter rail beside the held terms: one button per term and a glass pill that slides to the
 * current one. Listens for the director's `fc:term` event; clicking travels to the middle of that step.
 */
export function TermRail({ names }: { names: string[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<number>).detail);
    window.addEventListener("fc:term", on);
    return () => window.removeEventListener("fc:term", on);
  }, []);

  const jump = (i: number) => {
    const section = ref.current?.closest<HTMLElement>(".fc-terms");
    if (!section) return;
    const top = section.getBoundingClientRect().top + scrollY;
    goto(scrollForStep(i, names.length, top, section.offsetHeight, innerHeight));
  };

  return (
    <ol ref={ref} className="fc-rail" style={{ "--at": active } as CSSProperties} aria-label="The five terms">
      <span className="fc-rail__pill" aria-hidden="true" />
      {names.map((name, i) => (
        <li key={name}>
          <button type="button" className="fc-rail__item" aria-current={i === active ? "step" : undefined} onClick={() => jump(i)}>
            <span className="fc-rail__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="fc-rail__name">{name}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
