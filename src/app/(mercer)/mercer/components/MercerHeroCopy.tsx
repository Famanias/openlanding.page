import { ArrowUpRight } from "lucide-react";

export default function MercerHeroCopy({ onExplore, onAbout }: { onExplore?: () => void; onAbout?: () => void }) {
  return (
    <div className="jm-hero-copy">
      <p className="jm-eyebrow jm-mono">INDEPENDENT CREATIVE DEVELOPER <span>/ PORTFOLIO 2026</span></p>
      <h1 className="jm-headline">
        <span className="jm-headline-line"><span>I BUILD</span></span>
        <span className="jm-headline-line"><span>WHAT YOU</span></span>
        <span className="jm-headline-line"><span className="jm-headline-accent">IMAGINE.</span></span>
      </h1>
      <p className="jm-intro">Design-minded developer crafting interactive experiences where code becomes creativity.</p>
      <div className="jm-hero-actions">
        <button className="jm-button jm-button-primary" type="button" onClick={onExplore}>EXPLORE PROJECTS <ArrowUpRight size={20} aria-hidden="true" /></button>
        <button className="jm-button jm-button-secondary" type="button" onClick={onAbout}>ABOUT ME</button>
      </div>
    </div>
  );
}
