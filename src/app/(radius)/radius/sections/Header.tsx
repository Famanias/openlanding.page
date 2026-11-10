"use client";

import { useRef } from "react";
import { Logo } from "../brand/Logo";

export function Header() {
  const menu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (menu.current) menu.current.open = false; };

  return (
    <header className="rd-header">
      <a className="rd-home" href="#top" aria-label="RADIUS home"><Logo /></a>
      <nav className="rd-desktop-nav" aria-label="Primary navigation">
        <a href="#bike">The bike</a><a href="#build">Build</a><a href="#ride">The ride</a><a href="#fit">Fit &amp; service</a>
      </nav>
      <a className="rd-header-cta" href="#build">Build your ride <span aria-hidden="true">↗</span></a>
      <details className="rd-mobile-menu" ref={menu} onKeyDown={event => {
        if (event.key === "Escape" && menu.current?.open) {
          closeMenu();
          menu.current.querySelector("summary")?.focus();
        }
      }}>
        <summary aria-label="Menu"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation">
          <a onClick={closeMenu} href="#bike">The bike <span>01</span></a>
          <a onClick={closeMenu} href="#build">Build your ride <span>02</span></a>
          <a onClick={closeMenu} href="#ride">The ride <span>03</span></a>
          <a onClick={closeMenu} href="#fit">Fit &amp; service <span>04</span></a>
        </nav>
      </details>
      <div className="rd-progress" aria-hidden="true"><span /></div>
    </header>
  );
}
