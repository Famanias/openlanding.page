"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Logo } from "../brand/Logo";
import { RoleChips } from "../bay/RoleChips";
import { PROFILE } from "../content/profile";

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "process", label: "Process" },
  { id: "case", label: "Case study" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const COMPACT_AFTER_PX = 80;

export function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > COMPACT_AFTER_PX);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of NAV_LINKS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  const placeIndicator = useCallback(() => {
    const nav = navRef.current;
    const link = linkRefs.current[active];
    if (!nav) return;
    if (!link) {
      nav.style.setProperty("--ind-o", "0");
      return;
    }
    nav.style.setProperty("--ind-x", `${link.offsetLeft}px`);
    nav.style.setProperty("--ind-w", String(link.offsetWidth));
    nav.style.setProperty("--ind-o", "1");
  }, [active]);

  useEffect(() => {
    placeIndicator();
    window.addEventListener("resize", placeIndicator, { passive: true });
    return () => window.removeEventListener("resize", placeIndicator);
  }, [placeIndicator]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []), ...(toggleRef.current ? [toggleRef.current] : [])];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header className="pby-header" data-state={compact ? "compact" : "top"} data-menu={open ? "open" : "closed"} onKeyDown={open ? onMenuKeyDown : undefined}>
      <div className="pby-header-inner">
        <a href="#top" className="pby-header-logo pby-load" style={{ "--d": "150ms" } as React.CSSProperties} aria-label={`${PROFILE.name}, back to top`}>
          <Logo name={PROFILE.name} />
        </a>
        <nav ref={navRef} className="pby-nav" aria-label="Sections">
          <span className="pby-nav-indicator" aria-hidden="true" />
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.id}
              ref={(node) => {
                linkRefs.current[link.id] = node;
              }}
              href={`#${link.id}`}
              className="pby-nav-link pby-load"
              style={{ "--d": `${220 + index * 50}ms` } as React.CSSProperties}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <RoleChips className="pby-chips-header" />
        <button ref={toggleRef} type="button" className="pby-menu-toggle" aria-expanded={open} aria-controls="pby-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => (open ? close() : setOpen(true))}>
          <span className="pby-menu-bars" aria-hidden="true" />
        </button>
      </div>
      <div id="pby-menu" ref={menuRef} className="pby-menu" data-open={open} inert={!open}>
        <nav aria-label="Sections (menu)">
          {NAV_LINKS.map((link, index) => (
            <a key={link.id} href={`#${link.id}`} className="pby-menu-link" style={{ "--i": index } as React.CSSProperties} onClick={() => setOpen(false)}>
              <span className="pby-mono">{String(index + 1).padStart(2, "0")}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <RoleChips className="pby-chips-menu" />
      </div>
    </header>
  );
}
