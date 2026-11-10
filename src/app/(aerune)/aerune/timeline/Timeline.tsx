"use client";

import { useState } from "react";
import { Airflow } from "./Airflow";
import { AIR_MOMENTS, getMoment, nextMomentIndex } from "./model";

export function Timeline() {
  const [index, setIndex] = useState(0);
  const moment = getMoment(index);
  return <div className="ar-timeline">
    <div className="ar-timeline__story" data-reveal="rise">
      <span className="ar-eyebrow">A DAY IN THE LIFE / 01—03</span>
      <h3>Every room has<br />its own rhythm.</h3>
      <p>From first arrivals to the last meeting, the air changes with the people inside. Choose a moment to see the story unfold.</p>
      <div className="ar-time-buttons" role="group" aria-label="Choose a moment">
        {AIR_MOMENTS.map((item, i) => <button key={item.label} type="button" aria-pressed={i === index} onClick={() => setIndex(i)}><span>0{i + 1}</span><strong>{item.label}</strong><small>{item.time}</small></button>)}
      </div>
      <label className="ar-range-label" htmlFor="ar-day-range"><span>EXPLORE THE BUILDING DAY</span><span>{moment.time}</span></label>
      <input id="ar-day-range" type="range" min="0" max="2" step="1" value={index} onChange={(event) => setIndex(nextMomentIndex(Number(event.target.value), 0))} aria-label="Explore the building day" aria-valuetext={`${moment.label}, ${moment.time}`} />
      <p className="ar-timeline__note">A SIMULATED DAY AT THE NORTH BUILDING</p>
    </div>
    <div className="ar-timeline__sticky" data-reveal="wipe">
      <div className="ar-instrument" data-air-scene={index}>
        <div className="ar-instrument__top"><span><span className="ar-status-dot" /> NORTH BUILDING</span><span>EXAMPLE / {moment.time}</span></div>
        <div className="ar-instrument__scene"><div className="ar-instrument__scene-label"><span>BUILDING AIRFLOW</span><span>FLOOR 02 / 04</span></div><Airflow moment={index} /><div className="ar-instrument__scene-bottom"><span>INLET</span><span>MEETING ROOMS</span><span>OUTLET</span></div></div>
        <div className="ar-instrument__metrics" aria-live="polite" aria-atomic="true">
          <div><span>Indoor CO₂</span><strong><span data-reading="co2">{moment.co2}</span><small> ppm</small></strong><em>Example reading</em></div>
          <div><span>Occupancy</span><strong>{moment.people}<small> people</small></strong><em>In the building</em></div>
          <div><span>Airflow</span><strong>{moment.airflow}<small>%</small></strong><em>Of capacity</em></div>
        </div>
        <div className="ar-instrument__insight"><span>↗</span><div><small>SUGGESTED RESPONSE</small><strong>{moment.action}</strong></div></div>
      </div>
      <p className="ar-demo-caption"><span>FIG. 01 / A BUILDING IN MOTION</span><span>{moment.label.toUpperCase()} — {moment.time}</span></p>
    </div>
  </div>;
}
