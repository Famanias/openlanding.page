"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { COMPANY, NAV } from "./content";

/**
 * The header bar. Its scroll state, the sliding nav marker and the spirit-level bubble are written by
 * ScrollChrome through `data-tv-*` hooks and CSS custom properties; only the phone menu uses React state.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const root = document.documentElement;
    root.classList.add("tv-locked");
    const first = menu?.querySelector<HTMLElement>("a, button");
    const focusTimer = window.setTimeout(() => first?.focus(), 60);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (event.key !== "Tab" || !menu || !toggle) return;
      // the trap is the toggle plus everything in the panel
      const stops = [toggle, ...menu.querySelectorAll<HTMLElement>("a, button")];
      const index = stops.indexOf(document.activeElement as HTMLElement);
      const next = event.shiftKey ? index - 1 : index + 1;
      if (index === -1 || next < 0 || next >= stops.length) {
        event.preventDefault();
        stops[next < 0 ? stops.length - 1 : 0].focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1000px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(focusTimer);
      root.classList.remove("tv-locked");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="tv-header" data-tv-header data-state="top" data-menu={open}>
      <div className="tv-bar">
        <a className="tv-logo-link" href="#top" aria-label="Tolvar Earthworks, back to the top">
          <Logo />
        </a>

        <nav className="tv-nav" aria-label="Primary" data-tv-nav data-active="false">
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <a className="tv-nav-link tv-gauge" href={`#${item.id}`} data-tv-link={item.id}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="tv-nav-marker" aria-hidden="true" />
        </nav>

        <a className="tv-phone tv-gauge" href={COMPANY.cell.href}>
          <span className="tv-sr">Call Dale on </span>
          {COMPANY.cell.label}
        </a>

        <a className="tv-btn tv-btn-small tv-header-cta" href="#estimate">
          <span className="tv-btn-label">Free estimate</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="tv-menu-toggle"
          aria-expanded={open}
          aria-controls="tv-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="tv-menu-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="tv-sr">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* a spirit level: the bubble rides across as you scroll the page */}
      <div className="tv-level" aria-hidden="true">
        <i className="tv-level-bubble" />
      </div>

      <div id="tv-menu" ref={menuRef} className="tv-menu" data-open={open} inert={!open}>
        <ul className="tv-menu-list">
          {NAV.map((item, index) => (
            <li key={item.id} style={{ "--i": index } as CSSProperties}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                <span className="tv-gauge">0{index + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="tv-menu-foot" style={{ "--i": NAV.length } as CSSProperties}>
          <a className="tv-btn" href="#estimate" onClick={() => setOpen(false)}>
            <span className="tv-btn-label">Get a free estimate</span>
          </a>
          <a className="tv-menu-phone tv-gauge" href={COMPANY.cell.href} onClick={() => setOpen(false)}>
            {COMPANY.cell.label}
          </a>
        </div>
      </div>
    </header>
  );
}
