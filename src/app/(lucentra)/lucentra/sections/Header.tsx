"use client";

import { useEffect, useState } from "react";
import { Logo } from "../brand/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 36); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const links = [["Bench", "#bench"], ["Materials", "#materials"], ["Notes", "#notes"], ["Access", "#access"]];
  return <header className="lc-header" data-menu={open ? "open" : "closed"} data-scrolled={scrolled}>
    <a href="#top" aria-label="Lucentra home"><Logo /></a>
    <nav className="lc-nav" aria-label="Primary">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <button className="lc-menu" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><span className="lc-mono">{open ? "Close" : "Menu"}</span></button>
  </header>;
}
