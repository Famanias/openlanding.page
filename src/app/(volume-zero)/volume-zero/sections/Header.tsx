"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { ScrollProgress } from "../motion/ScrollProgress";

export function Header() {
  const [state, setState] = useState<"top" | "compact" | "hidden">("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const direction = y > lastY.current ? "down" : "up";
        setState(y < 72 ? "top" : direction === "down" && y > 180 ? "hidden" : "compact");
        lastY.current = y;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <ScrollProgress />
      <header className="vz-header" data-state={state} data-menu={menuOpen ? "open" : "closed"}>
        <div className="vz-wrap vz-header__inner">
          <a href="#top" aria-label="VOLUME ZERO home"><Logo /></a>
          <nav className="vz-header__nav" aria-label="Primary navigation">
            <a href="#chamber" onClick={() => setMenuOpen(false)}>Chamber</a>
            <a href="#surfaces" onClick={() => setMenuOpen(false)}>Surfaces</a>
            <a href="#rooms" onClick={() => setMenuOpen(false)}>Rooms</a>
            <a href="#commission" onClick={() => setMenuOpen(false)}>Commission</a>
          </nav>
          <div className="vz-header__readout" aria-label="Live page readout"><span>FIELD</span><strong>ACTIVE</strong></div>
          <button className="vz-header__menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
    </>
  );
}
