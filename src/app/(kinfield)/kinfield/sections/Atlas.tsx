'use client';

import { useState } from "react";
import { assets, responsivePhoto } from "../assets";
import { levels, moveLevel, routines, zones, type Level, type Zone } from "../study/model";
import { SectionIntro } from "../motion/SectionIntro";

const figureImages: Record<Zone, string> = { shoulders: assets.poseA, hips: assets.poseC, spine: assets.poseB };
const positions: Record<Zone, number> = { shoulders: 30, hips: 52, spine: 42 };

export function Atlas() {
  const [zone, setZone] = useState<Zone>("shoulders");
  const [level, setLevel] = useState<Level>("new");
  const routine = routines[zone][level];
  return (
    <section className="kf-section kf-atlas-section" id="atlas" tabIndex={-1}>
      <div className="kf-section-heading"><span>02 / MOVEMENT ATLAS</span><span>A LITTLE STUDY OF YOU</span></div>
      <div className="kf-atlas-header"><SectionIntro title={<>Get to know<br /><em>your movement.</em></>} description="There is a whole world of movement in the details. Choose an area, find your level and begin gently." /></div>
      <div className="kf-atlas">
        <div className="kf-figure-panel">
          <div className="kf-atlas-topline"><span>FIG. 01 / HUMAN FORM</span><span>SELECT A POINT ↓</span></div>
          <div className="kf-figure-wrap" data-zone={zone}>
            <svg viewBox="0 0 340 580" role="img" aria-label="Illustrative standing figure">
              <g className="kf-figure-lines" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M170 25c-28 0-35 19-34 40 1 18 9 29 17 35l-3 14c-22 8-45 11-56 32l-27 102c-4 14 0 22 8 24 9 2 14-6 18-18l26-70-5 69c0 23 9 40 16 55l-3 97-13 115c-1 12 6 20 15 20s14-6 16-18l18-108 7-75 7 75 18 108c2 12 7 18 16 18s16-8 15-20l-13-115-3-97c7-15 16-32 16-55l-5-69 26 70c4 12 9 20 18 18 8-2 12-10 8-24l-27-102c-11-21-34-24-56-32l-3-14c8-6 16-17 17-35 1-21-6-40-34-40Z" />
                <path d="M135 123c14 13 55 13 70 0M124 282c29 13 63 13 92 0M170 127v170M151 101c12 7 26 7 38 0" opacity=".45" />
              </g>
              <g className="kf-figure-guides" fill="none" stroke="currentColor"><path d="M23 187h294M23 300h294M170 8v550" strokeDasharray="3 7" /><circle cx="170" cy="290" r="138" strokeDasharray="2 8" /></g>
              <path className="kf-atlas-arc" d="M69 300A104 104 0 0 1 215 165" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle className="kf-halo" cx="170" cy={zone === "shoulders" ? 160 : zone === "hips" ? 300 : 232} r="29" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {zones.map((item) => <button key={item} className="kf-hotspot" style={{ top: positions[item] + "%" }} aria-label={"Select " + item} aria-pressed={zone === item} onClick={() => setZone(item)}><span /></button>)}
            <span className="kf-figure-note kf-note-a">A /<br />MOVEMENT<br />STUDY</span><span className="kf-figure-note kf-note-b">NOT TO<br />SCALE<br />↗</span>
          </div>
          <div className="kf-zone-buttons" aria-label="Choose a body area">{zones.map((item, index) => <button key={item} aria-pressed={zone === item} onClick={() => setZone(item)}><span>0{index + 1}</span> {item}</button>)}</div>
        </div>
        <div className="kf-atlas-detail">
          <div className="kf-atlas-detail-head"><span>YOUR MOVEMENT NOTES</span><button onClick={() => { setZone("shoulders"); setLevel("new"); }}>Reset atlas ↺</button></div>
          <div className="kf-routine-heading"><span>STUDY / 0{zones.indexOf(zone) + 1}</span><span>{routine.minutes} MIN</span></div>
          <h3>{zone}<span className="kf-flower" aria-hidden="true">✳</span></h3>
          <p className="kf-detail-desc">A small sequence to explore, at your own pace.</p>
          <div className="kf-level-title"><span>YOUR EXPERIENCE</span><div><button onClick={() => setLevel(moveLevel(level, -1))} aria-label="Previous experience level" disabled={level === "new"}>←</button><button onClick={() => setLevel(moveLevel(level, 1))} aria-label="Next experience level" disabled={level === "experienced"}>→</button></div></div>
          <div className="kf-levels" role="group" aria-label="Experience level" onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              setLevel(moveLevel(level, event.key === "ArrowRight" ? 1 : -1));
            }
          }}>{levels.map((item) => <button key={item} onClick={() => setLevel(item)} aria-pressed={level === item}>{item}</button>)}</div>
          <div className="kf-routine" aria-live="polite">
            <div className="kf-routine-label"><span>THE SEQUENCE</span><span>{routine.minutes} MIN / {level.toUpperCase()}</span></div>
            <ol key={zone + "-" + level}>{routine.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}<span aria-hidden="true">↗</span></li>)}</ol>
          </div>
          <p className="kf-atlas-disclaimer">Move within a comfortable range. This is an illustrative practice, not medical guidance.</p>
        </div>
        <div className="kf-atlas-still"><img key={zone} src={figureImages[zone]} srcSet={responsivePhoto(figureImages[zone])} sizes="30vw" alt="" width="896" height="1200" loading="lazy" /><div><span>MOVEMENT IN PRACTICE</span><span>0{zones.indexOf(zone) + 1} / 03</span></div></div>
      </div>
    </section>
  );
}
