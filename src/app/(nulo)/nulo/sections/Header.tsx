"use client";

import { useState } from "react";
import { Logo } from "../brand/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="nu-header">
      <div className="nu-header__inner">
        <a href="#top" aria-label="NULO home" onClick={close}><Logo /></a>
        <nav className="nu-header__nav" data-open={open || undefined} aria-label="Primary navigation">
          <a className="nu-header__link nu-header__link--active" href="#calibrate" onClick={close}>Calibrate</a>
          <a className="nu-header__link" href="#frames" onClick={close}>Frames</a>
          <a className="nu-header__link" href="#protocol" onClick={close}>Protocol</a>
          <a className="nu-header__link" href="#fitting" onClick={close}>Fitting</a>
        </nav>
        <a className="nu-header__cta" href="#fitting">Book a fit</a>
        <button type="button" className="nu-header__menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)} />
      </div>
      <div className="nu-header__progress" aria-hidden="true" />
    </header>
  );
}
