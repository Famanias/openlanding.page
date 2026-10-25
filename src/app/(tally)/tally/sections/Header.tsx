"use client";

import React, { useEffect, useRef, useState } from "react";
import { TallyLogo } from "../brand/Logo";
import { MotionPauseButton } from "../motion/SmoothScroll";

const NAV_ITEMS = [
  { href: "#ledger", label: "Ticket Runway" },
  { href: "#modes", label: "Service Modes" },
  { href: "#merchants", label: "Small Shops" },
  { href: "#calculator", label: "Rate Ledger" },
  { href: "#faq", label: "Questions" },
] as const;

export function Header() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          dialog.setAttribute("open", "");
        }
      }
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) {
        try {
          dialog.close();
        } catch {
          dialog.removeAttribute("open");
        }
      }
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    window.setTimeout(() => {
      triggerRef.current?.focus();
    }, 10);
  };

  const pillIndex = hoverIndex ?? activeIndex;

  return (
    <>
      <a href="#main-content" className="tl-skip-link">
        Skip to counter ledger
      </a>

      <div className="tl-progress-bar" aria-hidden="true">
        <div className="tl-progress-fill" data-tl-progress />
      </div>

      <header className="tl-header" data-tl-header data-scrolled="false">
        <div className="tl-container tl-header-inner">
          <a href="#top" className="tl-brand-link" aria-label="Tally home">
            <TallyLogo />
          </a>

          <nav className="tl-desktop-nav" aria-label="Primary navigation">
            <div
              className="tl-nav-pill-track"
              style={
                {
                  "--pill-index": pillIndex,
                } as React.CSSProperties
              }
            >
              <span className="tl-nav-sliding-pill" aria-hidden="true" />
              {NAV_ITEMS.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="tl-nav-link"
                  data-active={activeIndex === idx ? "true" : "false"}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onFocus={() => setHoverIndex(idx)}
                  onBlur={() => setHoverIndex(null)}
                  onClick={() => setActiveIndex(idx)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="tl-header-actions">
            <span className="tl-mono tl-queue-pill" aria-label="4 live bench tickets">
              <span className="tl-live-dot" aria-hidden="true" />
              04 ON BENCH
            </span>

            <MotionPauseButton className="tl-header-pause" />

            <a href="#open-counter" className="tl-btn tl-btn-primary tl-header-cta">
              <span>Issue a Ticket</span>
              <span aria-hidden="true">→</span>
            </a>

            <button
              ref={triggerRef}
              type="button"
              className="tl-menu-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="tl-menu-bars" data-open={menuOpen ? "true" : "false"} />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        className="tl-mobile-dialog"
        aria-label="Mobile navigation"
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
      >
        <div className="tl-mobile-drawer">
          <div className="tl-mobile-top">
            <TallyLogo />
            <button
              type="button"
              className="tl-mobile-close"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              ✕
            </button>
          </div>

          <nav className="tl-mobile-nav-list" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="tl-mobile-nav-link"
                onClick={() => {
                  setActiveIndex(idx);
                  setMenuOpen(false);
                }}
              >
                <span className="tl-mono">0{idx + 1}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="tl-mobile-footer">
            <MotionPauseButton />
            <a
              href="#open-counter"
              className="tl-btn tl-btn-primary"
              onClick={() => setMenuOpen(false)}
            >
              <span>Issue a Ticket</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
