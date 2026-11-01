"use client";
import { useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "../brand/Logo";
const links = [{ href: "#balance", label: "Find your balance" }, { href: "#living", label: "Money for living" }, { href: "#pocket", label: "Meet the app" }];
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => { dialog.current?.close(); setOpen(false); };
  return <><a href="#main" className="pel-skip">Skip to content</a><header className="pel-header"><div className="pel-header-inner"><a className="pel-home" href="/pello" aria-label="Pello home"><Logo/></a><nav className="pel-nav" aria-label="Main navigation"><span className="pel-nav-cursor" aria-hidden="true"/>{links.map(link => <a key={link.href} href={link.href} data-target={link.href.slice(1)}>{link.label}</a>)}</nav><a className="pel-header-cta" href="#begin">A fresh start <ArrowUpRight size={16} aria-hidden="true"/></a><button className="pel-menu-button pel-js-only" type="button" aria-label="Open navigation" aria-expanded={open} aria-controls="pel-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><span/><span/></button></div><div className="pel-page-progress" aria-hidden="true"><span/></div></header><dialog ref={dialog} id="pel-menu" className="pel-menu" onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}><div className="pel-menu-head"><Logo/><button type="button" onClick={close} aria-label="Close navigation">Close <span aria-hidden="true">×</span></button></div><nav aria-label="Mobile navigation">{links.map((link, i) => <a key={link.href} href={link.href} onClick={close}><small>0{i + 1}</small>{link.label}<ArrowUpRight aria-hidden="true"/></a>)}<a href="#begin" onClick={close}>A fresh start<ArrowUpRight aria-hidden="true"/></a></nav><p>A little clearer.<br/>A little closer.</p></dialog></>;
}
