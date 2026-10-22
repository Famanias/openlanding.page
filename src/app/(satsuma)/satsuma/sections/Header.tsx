"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { progress } from "../motion/math";

const LINKS = [
  { id: "makers", label: "Makers" },
  { id: "how", label: "How it works" },
  { id: "packs", label: "Packs" },
  { id: "brief", label: "Brief" },
  { id: "contact", label: "Contact" },
];

type LenisControl = { stop?: () => void; start?: () => void };

/**
 * Fixed chrome. In the hero it sits in the 1440 frame's own coordinates (logo, nav at x 505, two pills at the
 * right); after 80px it gains a paper strip, hides on scroll-down and returns on scroll-up. A hairline rail fills
 * with page progress and one indicator glides between nav links. Scroll values go to data-state and a CSS
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

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let raf = 0;
    let lastY = window.scrollY;
    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.style.setProperty("--sa-page", progress(y, 0, max).toFixed(4));
      let state = y > 80 ? "compact" : "top";
      if (y > 520 && y > lastY + 4 && !openRef.current) state = "hidden";
      else if (header.dataset.state === "hidden" && y >= lastY - 4 && y > 520) state = "hidden";
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
    const lenis = (window as unknown as { __saLenis?: LenisControl }).__saLenis;
    const root = document.documentElement;
    if (!open) return;
    root.classList.add("sa-locked");
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
      root.classList.remove("sa-locked");
      lenis?.start?.();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="sa-header" data-state="top" data-menu={open ? "open" : "closed"}>
        <div className="sa-header__bar">
          <a className="sa-header__logo" href="#top" aria-label="Satsuma, back to the top">
            <Logo />
          </a>
          <nav className="sa-nav" aria-label="Primary">
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
            <span ref={indicatorRef} className="sa-nav__indicator" data-on="false" aria-hidden="true" />
          </nav>
          <a className="sa-btn sa-btn--paper sa-header__login" href="#brief">
            <span className="sa-btn__label">Log in</span>
          </a>
          <a className="sa-btn sa-btn--aub sa-header__signup" href="#brief">
            <span className="sa-btn__roll">
              <span>Sign up</span>
              <span aria-hidden="true">Sign up</span>
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="sa-menu-toggle"
            aria-expanded={open}
            aria-controls="sa-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="sa-header__rail" aria-hidden="true">
          <span className="sa-header__rail-fill" />
        </div>
      </header>

      <div id="sa-menu" ref={menuRef} className="sa-menu" data-open={open} inert={!open} aria-label="Menu">
        <nav aria-label="Menu">
          <ol>
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ "--i": i } as React.CSSProperties}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                  <span className="sa-menu__num">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
          <a className="sa-btn sa-btn--aub sa-menu__cta" href="#brief" onClick={() => setOpen(false)}>
            Make a Reel
          </a>
        </nav>
      </div>
    </>
  );
}
