"use client";
import { useRef } from "react";
import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Arrow";
export function Header() {
  const nav = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const indicate = (target: HTMLElement) => {
    if (!nav.current) return;
    nav.current.style.setProperty("--nav-x", `${target.offsetLeft}px`);
    nav.current.style.setProperty("--nav-width", `${target.offsetWidth}px`);
  };
  return (
    <>
      <a href="#main" className="fd-skip">
        Skip to content
      </a>
      <header className="fd-header">
        <a href="#top" aria-label="Firstday home">
          <Logo />
        </a>
        <nav ref={nav} aria-label="Main navigation" className="fd-nav">
          <span className="fd-nav-indicator" aria-hidden="true" />
          {[
            ["The experience", "#experience"],
            ["Find your path", "#paths"],
            ["Good company", "#stories"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onMouseEnter={(e) => indicate(e.currentTarget)}
              onFocus={(e) => indicate(e.currentTarget)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="fd-button fd-header-cta" href="#begin">
          Start something <Arrow diagonal />
        </a>
        <details
          className="fd-mobile-menu"
          ref={menu}
          onKeyDown={(e) => {
            if (e.key === "Escape" && menu.current) {
              menu.current.open = false;
              menu.current.querySelector("summary")?.focus();
            }
          }}
        >
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {[
              ["The experience", "#experience"],
              ["Find your path", "#paths"],
              ["Good company", "#stories"],
              ["Start something", "#begin"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => {
                  if (menu.current) menu.current.open = false;
                }}
              >
                {label}
                <Arrow diagonal />
              </a>
            ))}
          </nav>
        </details>
      </header>
      <div className="fd-page-progress" aria-hidden="true" />
    </>
  );
}
