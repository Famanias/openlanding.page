"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Arrow";
const links = [{ id: "films", label: "Our films" }, { id: "process", label: "Our craft" }, { id: "studio", label: "The studio" }];
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(links.findIndex((link) => link.id === entry.target.id)); }), { rootMargin: "-10% 0px -55% 0px" });
    links.forEach((link) => { const node = document.getElementById(link.id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [open]);
  const close = () => { dialog.current?.close(); setOpen(false); };
  return <header className="kz-header" data-scrolled="false"><a className="kz-skip" href="#main">Skip to content</a><Logo />
    <nav className="kz-nav" aria-label="Main navigation" style={{ "--nav-index": active } as CSSProperties} data-selected={active >= 0}>
      <span className="kz-nav-indicator" aria-hidden="true" />{links.map((link, index) => <a key={link.id} href={`#${link.id}`} aria-current={active === index ? "location" : undefined}>{link.label}</a>)}
    </nav>
    <a href="#contact" className="kz-header-cta">Let’s make something <Arrow diagonal /></a>
    <button className="kz-menu-toggle kz-js-only" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={open} type="button" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><span /><span /></button>
    <dialog ref={dialog} className="kz-menu" aria-label="Navigation" onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <button className="kz-close" aria-label="Close navigation" type="button" onClick={close}>×</button><span className="kz-mono">A SMALL STUDIO. AN OPEN WORLD.</span>
      <nav aria-label="Mobile navigation">{links.map((link, i) => <a href={`#${link.id}`} key={link.id} onClick={close}><span className="kz-mono">0{i + 1}</span>{link.label}<Arrow diagonal /></a>)}<a href="#contact" onClick={close}>Start a story <Arrow diagonal /></a></nav>
    </dialog>
  </header>;
}
