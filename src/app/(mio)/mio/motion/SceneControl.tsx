"use client";
import { useState } from "react";
export function SceneControl() {
  const [paused, setPaused] = useState(false);
  function toggle() {
    const next = !paused;
    setPaused(next);
    const root = document.querySelector<HTMLElement>(".mh-site");
    if (root) root.dataset.paused = String(next);
  }
  return <button className="mh-scene-control mh-js-only" onClick={toggle} aria-pressed={paused} aria-label={paused ? "Play scenery motion" : "Pause scenery motion"}>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{paused ? <path d="m5 3 7 5-7 5Z"/> : <path d="M5 3v10M11 3v10"/>}</svg>
    <span>{paused ? "A still moment" : "A little life"}</span>
  </button>;
}
