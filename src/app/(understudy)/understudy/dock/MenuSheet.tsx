"use client";
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

/** The menu: five scenes, a pill that slides to the scene you're in, and links that stagger in. */
export function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useSheet(open, ref, onClose);

  useEffect(() => {
    if (!open) return;
    const y = scrollY + innerHeight * 0.4;
    let index = 0;
    MENU.forEach((item, i) => { const el = document.getElementById(item.id); if (el && el.getBoundingClientRect().top + scrollY <= y) index = i; });
    setActive(index);
  }, [open]);

  return (
    <div ref={ref} id="us-menu-sheet" className="us-sheet us-sheet--menu" role="dialog" aria-modal="true" aria-label="Menu" data-open={open} inert={!open}>
      <nav aria-label="Scenes">
        <ul className="us-menu" style={{ "--active": active } as CSSProperties}>
          <i className="us-menu__pill" aria-hidden="true" />
          {MENU.map((item, i) => (
            <li key={item.id} style={{ "--i": i } as CSSProperties}>
              <a className="us-menu__link" href={`#${item.id}`} aria-current={i === active ? "location" : undefined}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                onClick={(e) => { e.preventDefault(); onClose(); goto(item.id); }}>
                <span className="us-menu__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="us-menu__foot"><span className="us-mono">Call time</span> Weekdays 09:00 · 10 hours a week</p>
    </div>
  );
}
