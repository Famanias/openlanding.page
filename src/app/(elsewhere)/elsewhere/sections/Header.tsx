"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { SignalBars } from "../brand/Signal";
import { TRAIL_LENGTH, readoutLabel } from "../walk/trail";
import { NAV } from "./content";

/**
 * The header is a routed sign nailed above the trail. Its readout (signal bars and metres to the door) is
 * written by the scroll engine through the `data-ew-*` hooks, never through React state.
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
    root.classList.add("ew-locked");
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
      if (window.matchMedia("(min-width: 960px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(focusTimer);
      root.classList.remove("ew-locked");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="ew-header" data-ew-header data-state="top" data-menu={open}>
      <div className="ew-plank">
        <a className="ew-logo-link" href="#top" aria-label="Elsewhere, back to the top">
          <Logo />
        </a>

        <nav className="ew-nav" aria-label="Primary" data-ew-navbar data-active="none">
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <a className="ew-nav-link" href={`#${item.id}`} data-ew-nav={item.id}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="ew-nav-blaze" aria-hidden="true" />
        </nav>

        <p className="ew-readout" data-ew-meter data-bars="4">
          <span className="ew-sr">Signal and the distance left to the cabin door. Both change as you scroll down the trail.</span>
          <SignalBars />
          <span className="ew-readout-text ew-post" aria-hidden="true" data-ew-readout>
            {readoutLabel(TRAIL_LENGTH)}
          </span>
        </p>

        <a className="ew-btn ew-btn-small ew-header-cta" href="#stay">
          <span className="ew-btn-label">
            Hold the cabin
          </span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="ew-menu-toggle"
          aria-expanded={open}
          aria-controls="ew-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="ew-menu-icon" aria-hidden="true">
            <i />
            <i />
          </span>
          <span className="ew-sr">{open ? "Close menu" : "Open menu"}</span>
        </button>

        <span className="ew-progress" aria-hidden="true" />
      </div>

      <div id="ew-menu" ref={menuRef} className="ew-menu" data-open={open} inert={!open}>
        <ul className="ew-menu-list">
          {NAV.map((item, index) => (
            <li key={item.id} style={{ "--i": index } as CSSProperties}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                <span className="ew-post">0{index + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ew-menu-foot" style={{ "--i": NAV.length } as CSSProperties}>
          <a className="ew-btn ew-btn-glow" href="#stay" onClick={() => setOpen(false)}>
            <span className="ew-btn-label">
              Hold the cabin
            </span>
          </a>
          <p className="ew-post">48.6° N · elev. 612 m · no service</p>
        </div>
      </div>
    </header>
  );
}
