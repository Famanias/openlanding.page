"use client";
import { useState } from "react";
import { Logo } from "../brand/Logo";
export function Footer() {
  const [paused, setPaused] = useState(false);
  const toggle = () => { const next = !paused; setPaused(next); document.documentElement.dataset.flPaused = String(next); };
  return <footer className="fl-footer"><div className="fl-footer-top"><a href="#top" aria-label="Flori home"><Logo /></a><p>Good flowers. No grand occasion required.</p><a className="fl-text-link" href="mailto:hello@flori.example">Say a little hello <span aria-hidden="true">↗</span></a></div><div className="fl-footer-word" aria-hidden="true">a little lovely.</div><div className="fl-footer-bottom"><span>© 2026 Flori. A fictional flower club.</span><span>Original botanical artwork, made with care.</span><button type="button" className="fl-motion-toggle fl-enhanced" aria-pressed={paused} onClick={toggle}>{paused ? "Play" : "Pause"} little movements <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button></div></footer>;
}
