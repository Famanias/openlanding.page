"use client";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { usePageProgress } from "../motion/usePageProgress";
import { usePlanner } from "../planner/PlannerProvider";

const links = [["planner", "Plan"], ["peaks", "The fourteen"], ["support", "Support"], ["inquiry", "Inquiry"]] as const;
export function Header() {
  usePageProgress();
  const { summary } = usePlanner();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"top" | "compact" | "hidden">("top");
  const previous = useRef(0);
  useEffect(() => { const update = () => { const y = window.scrollY; const delta = y - previous.current; setState(y < 60 ? "top" : delta > 4 ? "hidden" : "compact"); previous.current = y; }; update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className="hy-header" data-state={state}><div className="hy-container hy-header__inner"><a className="hy-brand" href="#top" aria-label="HIYAS home"><Logo variant="mark"/><span>HIYAS</span></a><nav className="hy-nav" aria-label="Main navigation">{links.map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><span className="hy-header__plan hy-mono">{summary.peakName} / {summary.days} days</span><a className="hy-button hy-button--primary hy-header__action" href="#inquiry"><span>Plan an expedition</span><span className="hy-button__arrow">↗</span></a><button className="hy-menu" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} data-open={open} onClick={() => setOpen((value) => !value)}><span/></button></div><div className="hy-progress" aria-hidden="true"><span/></div>{open && <div className="hy-mobile-panel">{links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a className="hy-button hy-button--primary" href="#inquiry" onClick={() => setOpen(false)}><span>Plan an expedition</span><span>↗</span></a></div>}</header>;
}

