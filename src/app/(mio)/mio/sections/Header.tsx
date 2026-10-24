"use client";
import { useRef } from "react";
import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Icons";
const links = [{ href: "#work", label: "Selected work" }, { href: "#about", label: "A little about me" }, { href: "#commissions", label: "Commissions" }];
export function Header() {
  const menu = useRef<HTMLDetailsElement>(null);
  return <header className="mh-header" data-scrolled="false">
    <a className="mh-home" href="#home" aria-label="Mio Hazuki, back to the harbor"><Logo/></a>
    <nav className="mh-desktop-nav" aria-label="Main navigation">{links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
    <a href="#inquiry" className="mh-header-cta">Let&apos;s make something <Arrow/></a>
    <details className="mh-mobile-menu" ref={menu} onKeyDown={event => { if (event.key === "Escape" && menu.current) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); } }}>
      <summary aria-label="Open navigation"><span/><span/></summary>
      <nav aria-label="Mobile navigation">{links.map(link => <a href={link.href} key={link.href} onClick={() => { if (menu.current) menu.current.open = false; }}>{link.label}<Arrow/></a>)}<a href="#inquiry" onClick={() => { if (menu.current) menu.current.open = false; }}>Let&apos;s make something<Arrow/></a></nav>
    </details>
  </header>;
}
