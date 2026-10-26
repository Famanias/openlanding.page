"use client";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "../brand/Logo";
import { COLOURWAYS } from "../data/colourways";
import { Canopy } from "../sections/Canopy";
import { Commission } from "../sections/Commission";
import { Hero } from "../sections/Hero";
import { Light } from "../sections/Light";
import { Making } from "../sections/Making";
import { Structure } from "../sections/Structure";
import { ThreadLine } from "../ui/ThreadLine";
import { WagasaCanvas } from "./WagasaCanvas";

export function AmaotoShell() {
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<string>();
  const [angle, setAngle] = useState(18);
  const [rain, setRain] = useState(false);
  const [colourway, setColourway] = useState("cream");
  const colour = useMemo(() => COLOURWAYS.find((x) => x.id === colourway) ?? COLOURWAYS[0], [colourway]);
  useEffect(() => { let frame = 0; const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? window.scrollY / max : 0); frame = requestAnimationFrame(update); }; frame = requestAnimationFrame(update); return () => cancelAnimationFrame(frame); }, []);
  const open = progress < 0.18 ? progress / 0.18 : progress < 0.72 ? 1 : Math.max(0.78, 1 - (progress - 0.72) / 0.28);
  const explode = progress > 0.2 && progress < 0.4 ? (progress - 0.2) / 0.2 : progress >= 0.4 && progress < 0.52 ? 1 - (progress - 0.4) / 0.12 : 0;
  return <main className="am-page" style={{ "--scroll-progress": progress } as React.CSSProperties}>
    <header className="am-header"><Logo /><nav><a href="#structure">Structure</a><a href="#light">Light</a><a href="#making">Making</a><a href="#commission">Commission</a></nav><span className="am-header__counter">{String(Math.round(open * 40)).padStart(2, "0")} / 40 ribs open</span></header>
    <div className="am-stage"><WagasaCanvas onPart={setSelected} open={open} explode={explode} colour={colour.color} motif={colour.motif} /><div className="am-stage__wash" data-rain={rain} /></div>
    <ThreadLine progress={progress} />
    <Hero />
    <Structure selected={selected} onSelect={setSelected} />
    <Light angle={angle} onAngle={setAngle} rain={rain} onRain={setRain} />
    <Canopy value={colourway} onChange={setColourway} />
    <Making />
    <Commission canopy={colour.label} />
    <footer className="am-footer"><Logo /><span>AMAOTO / Kurokawa, Nagano / 2026</span><a href="#top">Back to top ↑</a></footer>
    <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style></noscript>
  </main>;
}
