"use client";
import { useEffect, useRef, useState } from "react";
import { Mark } from "../brand/Logo";
import { orbitAngle } from "./orbit";

const companies = [
  { name: "Nuvoro", mark: "✳", style: "north" },
  { name: "mavori", mark: "◒", style: "morrow" },
  { name: "Veyla", mark: "◇", style: "vela" },
  { name: "otherloom", mark: "◌", style: "otherday" },
  { name: "KIVORA", mark: "✦", style: "kinfield" },
  { name: "lumariq", mark: "◍", style: "luma" },
];

export function CompanyOrbit() {
  const shell = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = shell.current;
    if (!node) return;
    let intersecting = false;
    const sync = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return <div className="asc-orbit-shell" ref={shell} data-paused={paused} data-visible={visible}>
    <div className="asc-orbit-ring asc-orbit-ring-outer"/><div className="asc-orbit-ring asc-orbit-ring-inner"/>
    <div className="asc-orbit-center"><Mark/><span>GOOD COMPANY.<br/>GOOD MOMENTUM.</span></div>
    <div className="asc-orbit-track" aria-hidden="true">{companies.map((company, index) => <div className="asc-orbit-position" key={company.name} style={{ "--angle": `${orbitAngle(index, companies.length)}deg` } as React.CSSProperties}><div className="asc-orbit-upright"><div className={`asc-orbit-brand asc-orbit-brand-${company.style}`}><span>{company.mark}</span>{company.name}</div></div></div>)}</div>
    <p className="asc-sr-only">Fictional company examples: {companies.map((company) => company.name).join(", ")}.</p>
    <button className="asc-orbit-control" type="button" onClick={() => setPaused((value) => !value)}>{paused ? "Resume rotation" : "Pause rotation"} <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
  </div>;
}
