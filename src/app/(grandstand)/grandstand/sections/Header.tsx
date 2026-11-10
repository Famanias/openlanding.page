"use client";
import { useRef } from "react";
import { Logo } from "../brand/Logo";

const links = [{ href: "#season", label: "The season" }, { href: "#seats", label: "Choose a seat" }, { href: "#company", label: "Our company" }, { href: "#visit", label: "Your visit" }];
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  return <header className="gs-header" id="top">
    <div className="gs-masthead"><a href="#top" aria-label="Grandstand, back to top"><Logo /></a><span className="gs-masthead-note">AN INDEPENDENT REPERTORY THEATRE<br/>MADE FOR THE MOMENT.</span><a className="gs-header-cta" href="#seats">CHOOSE YOUR SEAT <span>↗</span></a><button className="gs-menu-button" onClick={() => dialog.current?.showModal()} aria-label="Open menu">MENU <span>☰</span></button></div>
    <nav className="gs-schedule" aria-label="Main navigation"><span className="gs-schedule-label">THE SEASON <b> / 26—27</b></span>{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}<span className="gs-schedule-end">THE HOUSE IS OPEN <i>✳</i></span></nav>
    <div className="gs-progress" aria-hidden="true" />
    <dialog className="gs-drawer" ref={dialog} aria-label="Navigation"><div className="gs-drawer-top"><Logo/><button onClick={() => dialog.current?.close()} aria-label="Close menu">CLOSE ×</button></div><nav aria-label="Mobile navigation">{links.map((link, i) => <a key={link.href} href={link.href} onClick={() => dialog.current?.close()}><small>0{i + 1}</small>{link.label}<span>↗</span></a>)}</nav><p>TONIGHT BEGINS HERE.<br/>A FICTIONAL THEATRE EXPERIENCE.</p></dialog>
  </header>;
}
