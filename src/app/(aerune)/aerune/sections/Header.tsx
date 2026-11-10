"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";

const links = [
  { href: "#air-demo", label: "The live demo" },
  { href: "#platform", label: "Platform" },
  { href: "#approach", label: "How it works" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const targets = () => Array.from(menu.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    targets()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key !== "Tab") return;
      const elements = targets();
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", keydown); };
  }, [open]);

  return <header className="ar-header" data-compact="false">
    <a className="ar-header__brand" href="#top" aria-label="AERUNE, back to top"><Logo /></a>
    <nav className="ar-desktop-nav" aria-label="Main navigation">
      {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
    </nav>
    <a className="ar-header__cta" href="#request">Request a demo <span aria-hidden="true">↗</span></a>
    <button ref={toggle} type="button" className="ar-mobile-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="ar-mobile-nav" onClick={() => setOpen(true)}><span /><span /></button>
    {open && <nav ref={menu} id="ar-mobile-nav" className="ar-mobile-nav" aria-label="Mobile navigation">
      <div className="ar-mobile-nav__top"><Logo /><button type="button" className="ar-mobile-close" aria-label="Close menu" onClick={() => { setOpen(false); toggle.current?.focus(); }}>×</button></div>
      <div className="ar-mobile-nav__links">{links.map((link, i) => <a style={{ "--i": i } as React.CSSProperties} key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></a>)}</div>
      <a className="ar-mobile-nav__request" href="#request" onClick={() => setOpen(false)}>Request a demo ↗</a>
      <p>MORE ROOM TO BREATHE / AERUNE</p>
    </nav>}
  </header>;
}
