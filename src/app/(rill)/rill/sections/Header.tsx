"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { useWatershed } from "../watershed/provider";

const links = [
  ["land", "Read the land"],
  ["budget", "Water budget"],
  ["systems", "Field systems"],
  ["field-walk", "Field walk"],
] as const;

export function Header() {
  const { rain } = useWatershed();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState<"top" | "compact" | "hidden">("top");
  const previousScroll = useRef(0);

  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;
      const delta = scroll - previousScroll.current;
      setHeaderState(scroll < 72 ? "top" : delta > 5 ? "hidden" : "compact");
      previousScroll.current = scroll;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--rl-progress", String(Math.min(1, Math.max(0, scroll / max))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="rl-header" data-state={headerState}>
      <div className="rl-container rl-header__inner">
        <a className="rl-header__brand" href="#top" aria-label="RILL home">
          <Logo variant="mark" />
          <span className="rl-header__wordmark">RILL</span>
        </a>
        <nav className="rl-header__nav" aria-label="Primary">
          {links.map(([id, label]) => <a key={id} className="rl-header__link" href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="rl-header__rain" aria-label="Current rainfall">
          <span className="rl-header__rain-label">Storm route</span>
          <span className="rl-header__rain-value" aria-live="polite">{rain} mm</span>
        </div>
        <button className="rl-header__menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} data-open={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /></button>
      </div>
      <div className="rl-header__progress" aria-hidden="true"><span /></div>
      {menuOpen ? (
        <div className="rl-header__mobile-panel">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="rl-button rl-button--primary" href="#field-walk" onClick={() => setMenuOpen(false)}><span>Book a field walk</span><span className="rl-button__arrow">↗</span></a>
        </div>
      ) : null}
    </header>
  );
}

