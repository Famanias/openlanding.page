"use client";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";

const links = [{ href: "#flowers", label: "The flowers" }, { href: "#club", label: "Our little club" }, { href: "#plans", label: "The details" }];
export function Header() {
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const menu = dialog.current;
    if (!menu) return;
    if (open && !menu.open) menu.showModal();
    if (!open && menu.open) menu.close();
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);
  const close = () => { setOpen(false); toggle.current?.focus(); };
  const keepFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  };
  return <header className="fl-header fl-load">
    <div className="fl-nav-wrap">
      <a className="fl-home" href="#top" aria-label="Flori home"><Logo /></a>
      <nav className="fl-desktop-nav" aria-label="Main navigation" onMouseLeave={() => setIndicator(0)}>
        <span className="fl-nav-indicator" style={{ transform: `translateX(${indicator * 132}px)` }} aria-hidden="true" />
        {links.map((link, index) => <a key={link.href} href={link.href} onMouseEnter={() => setIndicator(index)} onFocus={() => setIndicator(index)}>{link.label}</a>)}
      </nav>
      <a className="fl-button fl-button--small" href="#compose">Find your flowers <span aria-hidden="true">↗</span></a>
      <button className="fl-menu-toggle fl-enhanced" ref={toggle} type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-controls="fl-menu" aria-expanded={open} onClick={() => setOpen(true)}><span /><span /></button>
    </div>
    <div className="fl-progress" aria-hidden="true" />
    <dialog id="fl-menu" ref={dialog} className="fl-mobile-menu" onCancel={close} onClose={close} onKeyDown={keepFocus} aria-label="Navigation">
      <div className="fl-menu-top"><Logo /><button type="button" className="fl-close" onClick={close} aria-label="Close navigation">×</button></div>
      <nav aria-label="Mobile navigation">{links.map((link, i) => <a key={link.href} href={link.href} style={{ "--i": i } as React.CSSProperties} onClick={close}>{link.label}<span>↗</span></a>)}<a href="#compose" onClick={close}>Find your flowers <span>↗</span></a></nav>
      <p className="fl-script">A little something to look forward to.</p>
    </dialog>
  </header>;
}
