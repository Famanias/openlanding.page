"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { ButtonLink } from "../motion/Button";
import { CLINIC, NAV } from "./content";

type HeaderState = "top" | "scrolled" | "hidden";

/**
 * A floating pill. It compresses after 80 px, hides on scroll down and returns on scroll up. The active
 * section's link gets one sliding pill (a single element moved with transform). On phones a full-screen
 * menu opens with a clip-path circle from the toggle, locks the page and traps focus.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // reactive chrome
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const next: HeaderState = y < 80 ? "top" : y > lastY + 4 && y > 400 ? "hidden" : y < lastY - 4 ? "scrolled" : (header.dataset.state as HeaderState);
      if (next && header.dataset.state !== next) header.dataset.state = next === "hidden" && header.contains(document.activeElement) ? "scrolled" : next;
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // active-section pill
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !("IntersectionObserver" in window)) return;
    const links = [...nav.querySelectorAll<HTMLAnchorElement>("a[data-nav]")];
    const sections = links.map((a) => document.querySelector<HTMLElement>(a.hash)).filter((s): s is HTMLElement => Boolean(s));
    const place = (link: HTMLAnchorElement | undefined) => {
      if (!link) {
        nav.dataset.active = "none";
        return;
      }
      nav.dataset.active = link.hash.slice(1);
      nav.style.setProperty("--pill-x", `${link.offsetLeft}px`);
      nav.style.setProperty("--pill-w", `${link.offsetWidth}px`);
      links.forEach((a) => (a === link ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current")));
    };
    const visible = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
        let best: Element | undefined;
        let ratio = 0;
        for (const [el, r] of visible) if (r > ratio) [best, ratio] = [el, r];
        place(best ? links.find((a) => a.hash === `#${best!.id}`) : undefined);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // menu: lock, trap, escape
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    document.documentElement.dataset.snLock = "true";
    const focusables = () => [toggle, ...(menu ? [...menu.querySelectorAll<HTMLElement>("a, button")] : [])].filter(Boolean) as HTMLElement[];
    const first = menu?.querySelector<HTMLElement>("a");
    first?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle?.focus();
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const index = items.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        items[items.length - 1]?.focus();
      } else if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault();
        items[0]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      delete document.documentElement.dataset.snLock;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sn-header" data-state="top" data-sn-header>
      <div className="sn-header-bar">
        <a href="#top" className="sn-header-logo" aria-label="Snoot, back to top">
          <Logo />
        </a>
        <nav ref={navRef} aria-label="Main" className="sn-nav" data-active="none">
          <span className="sn-nav-pill" aria-hidden="true" />
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} data-nav>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="sn-header-phone sn-chart" href={CLINIC.phoneHref}>
          {CLINIC.phone}
        </a>
        <ButtonLink href="#book" variant="pink" arrow={false} className="sn-header-cta">
          Book
        </ButtonLink>
        <button
          ref={toggleRef}
          type="button"
          className="sn-menu-toggle"
          aria-expanded={open}
          aria-controls="sn-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="sn-menu" ref={menuRef} className="sn-menu" data-open={open} inert={!open}>
        <ul>
          {NAV.map((item, i) => (
            <li key={item.href} style={{ "--i": i } as CSSProperties}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li style={{ "--i": NAV.length } as CSSProperties}>
            <a href="#book" onClick={() => setOpen(false)} className="sn-menu-book">
              Fetch an appointment
            </a>
          </li>
        </ul>
        <p className="sn-chart sn-menu-foot">
          <a href={CLINIC.phoneHref}>{CLINIC.phone}</a> · night vet <a href={CLINIC.emergencyHref}>{CLINIC.emergency}</a>
        </p>
      </div>
    </header>
  );
}
