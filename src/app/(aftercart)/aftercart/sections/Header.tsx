"use client";

import { useState } from "react";
import { Logo } from "../brand/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="ac-header">
      <div className="ac-container ac-header-inner">
        <a className="ac-header-logo" href="#top" aria-label="AFTERCART home" onClick={close}>
          <Logo />
        </a>
        <nav className={`ac-header-nav${open ? " ac-header-nav--open" : ""}`} aria-label="Primary navigation">
          <a href="#health" onClick={close}>Store health</a>
          <a href="#care" onClick={close}>Care tracks</a>
          <a href="#rhythm" onClick={close}>How it works</a>
        </nav>
        <span className="ac-header-note">After launch / ongoing care</span>
        <a className="ac-button ac-header-cta" href="#call">Book a care call</a>
        <button className="ac-mobile-menu" type="button" aria-expanded={open} aria-controls="aftercart-nav" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div id="aftercart-nav" className={`ac-mobile-panel${open ? " ac-mobile-panel--open" : ""}`}>
        <div className="ac-container">
          <a href="#health" onClick={close}>Store health</a>
          <a href="#care" onClick={close}>Care tracks</a>
          <a href="#rhythm" onClick={close}>How it works</a>
          <a href="#call" onClick={close}>Book a care call</a>
        </div>
      </div>
    </header>
  );
}
