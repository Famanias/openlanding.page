"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { goto } from "./goto";
import { useSheet } from "./useSheet";

export const MENU = [
  { id: "top", label: "The studio" },
  { id: "parts", label: "Parts" },
  { id: "rehearsal", label: "Rehearsal" },
  { id: "casting", label: "Casting" },
  { id: "pricing", label: "Pricing" },
] as const;

const PAGES = [
  { href: "/templates/understudy", label: "Overview" },
  { href: "/templates/understudy/parts", label: "All Parts" },
  { href: "/templates/understudy/method", label: "Four-Act Method" },
  { href: "/templates/understudy/casting", label: "Partner Studios" },
  { href: "/templates/understudy/tuition", label: "Tuition Terms" },
] as const;

/** The menu: five scenes on home, a pill that slides to the scene you're in, and dedicated studio pages. */
export function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useSheet(open, ref, onClose);

  useEffect(() => {
    if (!open) return;
    const y = scrollY + innerHeight * 0.4;
    let index = 0;
    MENU.forEach((item, i) => {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top + scrollY <= y) index = i;
    });
    setActive(index);
  }, [open]);

  return (
    <div ref={ref} id="us-menu-sheet" className="us-sheet us-sheet--menu" role="dialog" aria-modal="true" aria-label="Menu" data-open={open} inert={!open}>
      <nav aria-label="Scenes">
        <ul className="us-menu" style={{ "--active": active } as CSSProperties}>
          <i className="us-menu__pill" aria-hidden="true" />
          {MENU.map((item, i) => (
            <li key={item.id} style={{ "--i": i } as CSSProperties}>
              <a
                className="us-menu__link"
                href={`/templates/understudy#${item.id}`}
                aria-current={i === active ? "location" : undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={(e) => {
                  const target = document.getElementById(item.id);
                  if (target) {
                    e.preventDefault();
                    onClose();
                    goto(item.id);
                  } else {
                    onClose();
                  }
                }}
              >
                <span className="us-menu__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="us-menu__pages" aria-label="Studio pages">
        {PAGES.map((p) => (
          <Link key={p.href} className="us-menu__pagelink" href={p.href} onClick={onClose}>
            {p.label}
          </Link>
        ))}
      </nav>
      <p className="us-menu__foot"><span className="us-mono">Call time</span> Weekdays 09:00 · 10 hours a week</p>
    </div>
  );
}
