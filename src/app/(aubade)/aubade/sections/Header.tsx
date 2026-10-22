"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { progress } from "../motion/math";

const LINKS = [
  { id: "line", label: "The Line" },
  { id: "berths", label: "Berths" },
  { id: "dining", label: "Dining car" },
  { id: "night", label: "The Night" },
  { id: "departures", label: "Departures" },
];

type LenisControl = { stop?: () => void; start?: () => void };

/**
 * Fixed chrome: compacts after 80px, hides on scroll-down and returns on scroll-up, fills a hairline rail
 * with page progress, and glides one indicator between nav links. Scroll values go to data-state and a CSS
 * custom property from one rAF; React state is only the menu and the active section.
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const openRef = useRef(false);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Scroll: state + progress rail.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let raf = 0;
    let lastY = window.scrollY;
    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.style.setProperty("--au-page", progress(y, 0, max).toFixed(4));
      let state = y > 80 ? "compact" : "top";
      if (y > 480 && y > lastY + 4 && !openRef.current) state = "hidden";
      else if (header.dataset.state === "hidden" && y >= lastY - 4 && y > 480) state = "hidden";
      header.dataset.state = state;
      lastY = y;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Active section.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const top = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "0px 0px -60% 0px" });
    const hero = document.getElementById("top");
    if (hero) top.observe(hero);
    return () => {
      io.disconnect();
      top.disconnect();
    };
  }, []);

  const moveIndicator = useCallback((id: string | null) => {
    const ind = indicatorRef.current;
    const nav = navRef.current;
    if (!ind || !nav) return;
    const link = id ? nav.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`) : null;
    if (!link) {
      ind.dataset.on = "false";
      return;
    }
    ind.dataset.on = "true";
    ind.style.setProperty("--x", `${link.offsetLeft}px`);
    ind.style.setProperty("--w", `${link.offsetWidth / 100}`);
  }, []);

  useEffect(() => {
    moveIndicator(active);
    const onResize = () => moveIndicator(active);
    window.addEventListener("resize", onResize, { passive: true });
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, moveIndicator]);

  // Menu: scroll lock, focus trap, Escape.
  useEffect(() => {
    const lenis = (window as unknown as { __auLenis?: LenisControl }).__auLenis;
    const root = document.documentElement;
    if (!open) return;
    root.classList.add("au-locked");
    lenis?.stop?.();
    const menu = menuRef.current;
    const focusables = () => Array.from(menu?.querySelectorAll<HTMLElement>("a, button") ?? []);
    const t = window.setTimeout(() => focusables()[0]?.focus(), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const list = [toggleRef.current!, ...focusables()];
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? list.length - 1 : i - 1) : i === list.length - 1 ? 0 : i + 1;
      e.preventDefault();
      list[next]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      root.classList.remove("au-locked");
      lenis?.start?.();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="au-header" data-state="top" data-menu={open ? "open" : "closed"}>
        <div className="au-header__bar">
          <a className="au-header__logo" href="#top" aria-label="AUBADE, back to the top">
            <Logo />
          </a>
          <nav className="au-nav" aria-label="Primary">
            <ul ref={navRef} onPointerLeave={() => moveIndicator(active)}>
              {LINKS.map((l, i) => (
                <li key={l.id} style={{ "--i": i } as React.CSSProperties}>
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? "location" : undefined}
                    onPointerEnter={() => moveIndicator(l.id)}
                    onFocus={() => moveIndicator(l.id)}
                    onBlur={() => moveIndicator(active)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <span ref={indicatorRef} className="au-nav__indicator" data-on="false" aria-hidden="true" />
          </nav>
          <a className="au-btn au-btn--claret au-btn--sm au-header__cta" href="#reserve">
            <span className="au-btn__roll">
              <span>Reserve a berth</span>
              <span aria-hidden="true">Reserve a berth</span>
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="au-menu-toggle"
            aria-expanded={open}
            aria-controls="au-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="au-header__rail" aria-hidden="true">
          <span className="au-header__rail-fill" />
          <span className="au-header__train">
            <span />
          </span>
        </div>
      </header>

      <div id="au-menu" ref={menuRef} className="au-menu" data-open={open} inert={!open} aria-label="Menu">
        <nav aria-label="Menu">
          <ol>
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ "--i": i } as React.CSSProperties}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                  <span className="au-menu__num">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
          <a className="au-btn au-btn--claret au-menu__cta" href="#reserve" onClick={() => setOpen(false)}>
            Reserve a berth
          </a>
          <p className="au-menu__meta">Paris-Gare de Lyon 19:12 → Venezia 09:48 · Thursdays &amp; Sundays</p>
        </nav>
      </div>
    </>
  );
}
