"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { Magnetic } from "../motion/Magnetic";
import { StudioStatus } from "../studio/StudioStatus";

const LINKS = [
  { id: "fit-out", label: "Fit-out" },
  { id: "prices", label: "Price list" },
  { id: "work", label: "Work" },
  { id: "plans", label: "Care plans" },
  { id: "faq", label: "FAQ" },
] as const;

type HeaderState = "top" | "compact" | "hidden";

export function Header() {
  const [state, setState] = useState<HeaderState>("top");
  const [active, setActive] = useState<string>("fit-out");
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Reactive chrome: one passive listener, rAF-throttled. Page progress goes to a CSS variable.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      setState((current) => (y < 24 ? "top" : delta > 6 && y > 320 ? "hidden" : delta < -6 ? "compact" : current === "top" ? "compact" : current));
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--fx-progress", Math.min(1, y / max).toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  // Which section is under the header.
  useEffect(() => {
    const nodes = LINKS.map((link) => document.getElementById(link.id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => {
      const hit = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit?.target.id) setActive(hit.target.id);
    }, { rootMargin: "-35% 0px -60% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // One indicator that slides between links (transform only); measurements cached until resize.
  const place = useCallback((id: string | null) => {
    const nav = navRef.current;
    const link = id ? nav?.querySelector<HTMLElement>(`[data-link="${id}"]`) : null;
    setIndicator(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
  }, []);

  useEffect(() => {
    place(hovered ?? active);
    const onResize = () => place(hovered ?? active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, hovered, place]);

  // Mobile menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); return; }
      if (event.key !== "Tab" || !panel) return;
      const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next = event.shiftKey ? (index <= 0 ? items.length - 1 : index - 1) : (index + 1) % items.length;
      event.preventDefault();
      items[next]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <header className="fx-header" data-state={menuOpen ? "compact" : state} data-menu={menuOpen ? "open" : "closed"}>
      <div className="fx-container fx-header__inner">
        <a className="fx-header__brand" href="#top" aria-label="FIXTURE, back to top">
          <Logo />
        </a>
        <nav ref={navRef} className="fx-header__nav" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
          {LINKS.map((link, index) => (
            <a key={link.id} data-link={link.id} className="fx-header__link" href={`#${link.id}`} aria-current={active === link.id ? "true" : undefined} onPointerEnter={() => setHovered(link.id)} onFocus={() => setHovered(link.id)} onBlur={() => setHovered(null)} style={{ "--i": index } as CSSProperties}>
              {link.label}
            </a>
          ))}
          <span className="fx-header__indicator" aria-hidden="true" data-visible={indicator ? "true" : "false"} style={indicator ? ({ "--x": `${indicator.x}px`, "--w": indicator.w } as CSSProperties) : undefined} />
        </nav>
        <StudioStatus className="fx-header__status" />
        <Magnetic>
          <a className="fx-button fx-button--primary fx-header__cta" href="#book">
            <span className="fx-button__fill" aria-hidden="true" />
            <span className="fx-button__roll"><span>Book a walk-through</span><span aria-hidden="true">Book a walk-through</span></span>
          </a>
        </Magnetic>
        <button ref={toggleRef} type="button" className="fx-header__toggle" aria-expanded={menuOpen} aria-controls="fx-menu" onClick={() => setMenuOpen((open) => !open)}>
          <span className="fx-sr">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="fx-header__toggle-bars" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <span className="fx-header__progress" aria-hidden="true" />
      <div ref={panelRef} id="fx-menu" className="fx-menu" data-open={menuOpen ? "true" : "false"} hidden={!menuOpen}>
        <nav aria-label="Menu">
          {LINKS.map((link, index) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)} style={{ "--i": index } as CSSProperties}>
              <span className="fx-mono">0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <a className="fx-button fx-button--primary fx-menu__cta" href="#book" onClick={() => setMenuOpen(false)} style={{ "--i": LINKS.length } as CSSProperties}>
            <span className="fx-button__fill" aria-hidden="true" />
            <span className="fx-button__roll"><span>Book a walk-through</span><span aria-hidden="true">Book a walk-through</span></span>
          </a>
        </nav>
        <StudioStatus />
      </div>
    </header>
  );
}
