"use client";
import { useEffect, useState } from "react";
import { Logo } from "../brand/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add("aw-enhanced");
    return () => document.documentElement.classList.remove("aw-enhanced");
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <header className="aw-header">
    <div className="aw-header-inner aw-container">
      <Logo />
      <nav className={`aw-nav${open ? " is-open" : ""}`} id="aw-nav" aria-label="Main navigation">
        <a href="#about" onClick={() => setOpen(false)}>The idea</a>
        <a href="#walks" onClick={() => setOpen(false)}>The walks</a>
        <a href="#together" onClick={() => setOpen(false)}>The company</a>
        <a className="aw-nav-mobile-cta" href="#walks" onClick={() => setOpen(false)}>Find a walk <span aria-hidden="true">↗</span></a>
      </nav>
      <a className="aw-header-cta aw-button aw-button-outline" href="#walks">Find a walk <span aria-hidden="true">↗</span></a>
      <button className="aw-menu aw-js-only" type="button" aria-expanded={open} aria-controls="aw-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
  </header>;
}
