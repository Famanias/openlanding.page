"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { FIRM } from "../content/firm";

const LINKS = [
  { id: "matters", label: "Matters" },
  { id: "argument", label: "The argument" },
  { id: "counsel", label: "Counsel" },
  { id: "questions", label: "Questions" },
];

/**
 * A floating pill: the logo, four links with one underline that slides between them (it follows the section in view,
 * and the pointer while hovering), the direct line and a CTA. It compresses after 80px, tucks away while reading
 * down and returns on the way up. Below 980px the links live in a full-screen panel that opens from the toggle.
 */
export function Header() {
  const [active, setActive] = useState("");
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hovering = useRef<string | null>(null);

  const place = useCallback((id: string | null) => {
    const nav = navRef.current;
    const link = id ? nav?.querySelector<HTMLElement>(`[data-nav="${id}"]`) : null;
    if (!nav) return;
    if (!link) {
      nav.style.setProperty("--ix-o", "0");
      return;
    }
    nav.style.setProperty("--ix", `${link.offsetLeft}px`);
    nav.style.setProperty("--iw", String(link.offsetWidth));
    nav.style.setProperty("--ix-o", "1");
  }, []);

  // The section in view decides the active link.
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    const hero = document.getElementById("top");
    const heroIo = hero
      ? new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(""), { rootMargin: "-45% 0px -50% 0px" })
      : null;
    if (hero) heroIo?.observe(hero);
    return () => {
      io.disconnect();
      heroIo?.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (!hovering.current) place(active || null);
  }, [active, place]);

  useEffect(() => {
    const onResize = () => place(hovering.current ?? (active || null));
    window.addEventListener("resize", onResize, { passive: true });
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, place]);

  // Compress, hide on the way down, return on the way up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      setCompact(y > 80);
      if (y > last + 6 && y > 480) setHidden(true);
      else if (y < last - 6 || y < 480) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Menu: Escape closes, Tab stays inside, the page behind does not scroll.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const focusables = () =>
      [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])].filter((el): el is HTMLElement => !!el);
    focusables()[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      } else if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const state = open ? "open" : hidden ? "hidden" : compact ? "compact" : "top";

  return (
    <>
      <div className="cr-progress" aria-hidden="true" />
      <header className="cr-header" data-state={state}>
        <div className="cr-header__bar">
          <span className="cr-header__glass" aria-hidden="true" />
          <Logo href="#top" className="cr-header__logo" />
          <nav
            ref={navRef}
            className="cr-nav"
            aria-label="Primary"
            onPointerLeave={() => {
              hovering.current = null;
              place(active || null);
            }}
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-nav={l.id}
                aria-current={active === l.id ? "location" : undefined}
                onPointerEnter={() => {
                  hovering.current = l.id;
                  place(l.id);
                }}
              >
                {l.label}
              </a>
            ))}
            <span className="cr-nav__ink" aria-hidden="true" />
          </nav>
          <div className="cr-header__end">
            <a className="cr-header__phone" href={FIRM.phoneHref}>
              {FIRM.phone}
            </a>
            <a className="cr-header__cta" href="#file">
              <span>File a matter</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="cr-toggle"
              aria-expanded={open}
              aria-controls="cr-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div ref={panelRef} id="cr-menu" className="cr-menu" data-open={open} inert={!open} role="dialog" aria-label="Menu">
        <nav aria-label="Menu">
          {LINKS.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
              <span className="cr-menu__n">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a href="#file" className="cr-menu__cta" style={{ "--i": LINKS.length } as React.CSSProperties} onClick={() => setOpen(false)}>
            File a matter
          </a>
        </nav>
        <p className="cr-menu__foot" style={{ "--i": LINKS.length + 1 } as React.CSSProperties}>
          <a href={FIRM.phoneHref}>{FIRM.phone}</a>
          <span>{FIRM.email}</span>
        </p>
      </div>
    </>
  );
}
