import { ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onProjects?: () => void;
  onAbout?: () => void;
}

export default function MercerHeader({ onProjects, onAbout }: HeaderProps) {
  const links = <>
    <a href="#index" aria-current="page">index</a><span aria-hidden="true">\</span>
    <button type="button" onClick={onProjects}>projects</button><span aria-hidden="true">\</span>
    <a href="#experiment">playground</a><span aria-hidden="true">\</span>
    <button type="button" onClick={onAbout}>about</button>
  </>;
  return (
    <header className="jm-header">
      <a className="jm-brand" href="#index" aria-label="Jules Mercer, home">
        <span className="jm-brand-mark">JM.</span>
        <span className="jm-brand-name jm-mono">JULES MERCER <span>{"// CREATIVE DEVELOPER"}</span></span>
      </a>
      <nav className="jm-desktop-nav jm-mono" aria-label="Main navigation">{links}</nav>
      <span className="jm-availability jm-mono"><i aria-hidden="true" />AVAILABLE FOR SELECT PROJECTS</span>
      <a className="jm-contact jm-mono" href="mailto:hello@julesmercer.studio">LET’S TALK <ArrowUpRight size={16} aria-hidden="true" /></a>
      <details className="jm-mobile-menu">
        <summary className="jm-mono" aria-label="Toggle navigation"><span /> <span /></summary>
        <nav className="jm-mono" aria-label="Mobile navigation" onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a,button")) event.currentTarget.closest("details")?.removeAttribute("open");
        }}>{links}</nav>
      </details>
    </header>
  );
}
