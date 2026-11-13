"use client";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Logo } from "../brand/Logo";
import { Magnetic } from "../motion/Magnetic";
import { usePipeline } from "../pipeline/PipelineProvider";
import { NAV } from "./nav";

/**
 * Fixed top hairline glass bar: compresses on scroll, slides active indicator pill,
 * shows live frame-budget readout, and opens a full-screen clip-path drawer on mobile.
 */
export function Header() {
  const { budget } = usePipeline();
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const listRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ids = ["top", ...NAV.map((item) => item.id)];
    const updateActive = () => {
      const marker = window.innerHeight * 0.38;
      let matched = "";
      for (const id of ids) {
        const node = document.getElementById(id);
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) {
          matched = id === "top" ? "" : id;
          break;
        }
      }
      setActive((prev) => (prev === matched ? prev : matched));
    };

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(updateActive, { threshold: [0, 0.25, 0.5] });
    targets.forEach((target) => observer.observe(target));
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActive);
    };
  }, []);

  useEffect(() => {
    const syncPill = () => {
      if (!active) {
        setPill({ x: 0, w: 0 });
        return;
      }
      const list = listRef.current;
      const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (!list || !link) return;
      setPill({ x: link.offsetLeft, w: link.offsetWidth });
    };
    syncPill();
    window.addEventListener("resize", syncPill, { passive: true });
    return () => window.removeEventListener("resize", syncPill);
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
    const focusable = [
      ...(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
      toggleRef.current,
    ].filter((node): node is HTMLElement => node !== null);
    if (focusable.length === 0) return;
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
    <header id="dt-header" className="dt-header" data-compact="false" data-hidden="false" data-open={open}>
      <div className="dt-header-bar">
        <a href="#top" className="dt-header-logo" aria-label="DATUM, back to top">
          <Logo />
        </a>

        <nav className="dt-nav" aria-label="Primary">
          <ul ref={listRef} className="dt-nav-list">
            <li
              className="dt-nav-pill"
              data-visible={pill.w > 0}
              aria-hidden="true"
              style={{ "--pill-x": `${pill.x}px`, "--pill-w": `${pill.w}px` } as CSSProperties}
            />
            {NAV.map((item, i) => (
              <li key={item.id} style={{ "--i": i } as CSSProperties}>
                <a
                  href={`#${item.id}`}
                  data-id={item.id}
                  aria-current={active === item.id ? "true" : undefined}
                  className="dt-nav-link"
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="dt-header-right">
          <span className="dt-mono dt-header-budget" data-over={budget.overBudget}>
            {budget.totalMs.toFixed(1)} ms
          </span>
          <Magnetic className="dt-header-cta">
            <a href="#access" className="dt-btn dt-btn-primary dt-btn-small">
              <span className="dt-btn-label" data-label="SDK Access">
                SDK Access
              </span>
            </a>
          </Magnetic>
          <button
            ref={toggleRef}
            type="button"
            className="dt-menu-toggle"
            aria-expanded={open}
            aria-controls="dt-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((val) => !val)}
          >
            <span className="dt-menu-bars" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="dt-menu" ref={panelRef} className="dt-menu" data-open={open} onKeyDown={onPanelKey} inert={!open}>
        <ul>
          {NAV.map((item, i) => (
            <li key={item.id} style={{ "--i": i } as CSSProperties}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="dt-mono dt-menu-foot">
          DATUM // Spatial Scene-Graph & GPU Frame Studio · {budget.totalMs.toFixed(1)} ms active budget
        </p>
      </div>
    </header>
  );
}
