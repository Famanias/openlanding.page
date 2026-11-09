"use client";
import { Picture } from "../assets";
import { useProduction } from "./ProductionContext";

const productions = [
  { id: "01", title: "THE LAST\nLIGHT", label: "A NEW PLAY", dates: "OCT 08 — NOV 02", author: "A story about the things we leave on for each other.", asset: "03-poster-a", detail: "A tender, electric new play" },
  { id: "02", title: "A ROOM\nOF ECHOES", label: "A REIMAGINING", dates: "NOV 19 — DEC 14", author: "A familiar room. A very different point of view.", asset: "04-poster-b", detail: "A bold reimagining" },
  { id: "03", title: "AFTER\nTHE RAIN", label: "AN ENSEMBLE PIECE", dates: "JAN 15 — FEB 08", author: "An ensemble piece about what comes next.", asset: "05-poster-c", detail: "An ensemble story" },
];
export function Season() {
  const { active, setActive } = useProduction();
  const selected = productions[active];
  return <section id="season" className="gs-season gs-section"><div className="gs-section-top" data-reveal><p className="gs-kicker">02 / THE SEASON</p><p>THREE STORIES.<br/>A THOUSAND WAYS IN.</p></div><div className="gs-season-heading" data-reveal><h2>GOOD STORIES<br/><em>NEED COMPANY.</em></h2><p>Big questions, close quarters, and the kind of nights that stay with you. Here’s what’s coming to our stage.</p></div><div className="gs-production-layout"><div className="gs-production-list" aria-label="Choose a production">{productions.map((show, i) => <button key={show.id} className={`gs-production-row ${active === i ? "is-active" : ""}`} onClick={() => setActive(i)} aria-pressed={active === i}><span>{show.id} / {show.label}</span><strong>{show.title.replace("\n", " ")}</strong><span>{show.dates} <b>↗</b></span></button>)}<noscript><ul className="gs-static-season">{productions.map((show) => <li key={show.id}><strong>{show.title.replace("\n", " ")}</strong><span>{show.dates}</span></li>)}</ul></noscript></div><div className="gs-poster-stage" key={selected.id}><Picture assetKey={selected.asset} alt={`Abstract artwork for ${selected.title.replace("\n", " ")}`} sizes="(min-width: 900px) 36vw, 80vw"/><div className="gs-poster-overlay"><span>GRANDSTAND PRESENTS / {selected.id}</span><strong>{selected.title.split("\n").map((line) => <span key={line}>{line}</span>)}</strong><small>{selected.dates}<br/>{selected.detail}</small></div><span className="gs-poster-stamp">THE<br/>SEASON<br/>26 / 27</span></div></div><div className="gs-season-note"><p><span>NOW SHOWING / {selected.id}</span><br/>{selected.author}</p><a href="#seats" className="gs-text-link">Find your place <span>↗</span></a></div><p className="gs-disclaimer">Productions and dates are fictional and shown for demonstration.</p></section>;
}
