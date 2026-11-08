"use client";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Logo } from "../brand/Logo";
import { Magnetic } from "../motion/Magnetic";
import { NAV } from "./nav";

/** Reactive header: compresses after 80px, hides on scroll down (ScrollEngine writes data-*), sliding active pill. */
export function Header() {
  const [active, setActive] = useState<string>(NAV[0].id);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const listRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = NAV.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return;
    setPill({ x: link.offsetLeft, w: link.offsetWidth });
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open]);

  const onPanelKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []), toggleRef.current].filter((node): node is HTMLElement => node !== null);
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
    <header id="tn-header" className="tn-header" data-compact="false" data-hidden="false" data-open={open}>
      <div className="tn-header-bar">
        <a href="#top" className="tn-header-logo" aria-label="Tourne, back to top">
          <Logo />
        </a>
        <nav className="tn-nav" aria-label="Primary">
          <ul ref={listRef} className="tn-nav-list">
            <li className="tn-nav-pill" aria-hidden="true" style={{ "--pill-x": `${pill.x}px`, "--pill-w": `${pill.w}px` } as CSSProperties} />
            {NAV.map((item, i) => (
              <li key={item.id} style={{ "--i": i } as CSSProperties}>
                <a href={`#${item.id}`} data-id={item.id} aria-current={active === item.id ? "true" : undefined} className="tn-nav-link">
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Magnetic className="tn-header-cta">
          <a href="#order" className="tn-btn tn-btn-clay tn-btn-small">
            <span className="tn-btn-label" data-label="Reserve a slot">
              Reserve a slot
            </span>
          </a>
        </Magnetic>
        <button
          ref={toggleRef}
          type="button"
          className="tn-menu-toggle"
          aria-expanded={open}
          aria-controls="tn-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="tn-menu-bars" aria-hidden="true" />
        </button>
      </div>
      <div id="tn-menu" ref={panelRef} className="tn-menu" data-open={open} onKeyDown={onPanelKey} inert={!open}>
        <ul>
          {NAV.map((item, i) => (
            <li key={item.id} style={{ "--i": i } as CSSProperties}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="tn-menu-foot">Studio open Thursday to Sunday, 10 to 5. Tacoma, Washington.</p>
      </div>
    </header>
  );
}
