"use client";

import { useState } from "react";
import { useInView } from "../motion/useInView";

const WINDOWS = [
  { code: "08:10", label: "First light", title: "Cloud break", copy: "A clear window over the eastern roofs. The day starts quietly and keeps its promise.", reading: "1016 hPa", wind: "SW / 12 kt" },
  { code: "13:40", label: "High front", title: "Wind in the paper", copy: "The pressure climbs. Carry a layer and take the long way through the market.", reading: "1020 hPa", wind: "W / 16 kt" },
  { code: "19:08", label: "Last light", title: "The line opens", copy: "One last clear window before dusk. Enough time to get home by the river.", reading: "1024 hPa", wind: "NW / 08 kt" },
];

function MiniTrace({ active }: { active: number }) {
  const lines = [
    "M20 168C64 151 92 120 142 132s54-34 96-25 52 37 96 17 58-59 103-41 47-20 83-50",
    "M20 157C68 163 98 94 148 118s57-7 90 9 50-50 92-32 63 19 101-45 71-26 97-42",
    "M20 190C67 172 89 163 140 170s62-52 103-44 53 41 94 20 61-22 99-6 59-55 104-90",
  ];
  return (
    <svg className="sr-forecast-strip__trace" viewBox="0 0 620 220" role="img" aria-label={`${WINDOWS[active].label} pressure trace`}>
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".22">
        <path d="M20 32h580M20 86h580M20 140h580M20 194h580" />
        <path d="M20 20v180M165 20v180M310 20v180M455 20v180M600 20v180" />
      </g>
      <path className="sr-forecast-strip__line" d={lines[active]} fill="none" stroke="var(--sr-seafoam)" strokeWidth="5" strokeLinecap="round" />
      <circle cx={active === 0 ? 20 : active === 1 ? 390 : 545} cy={active === 0 ? 168 : active === 1 ? 69 : 76} r="7" fill="var(--sr-lavender)" />
      <text x="20" y="15" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="11">1008</text>
      <text x="555" y="15" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="11">1024</text>
    </svg>
  );
}

export function ForecastStrip() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -18% 0px");
  const window = WINDOWS[active];
  return (
    <div ref={ref} className={`sr-forecast-strip${inView ? " is-visible" : ""}`} data-active-window={active}>
      <div className="sr-forecast-strip__tabs" role="tablist" aria-label="Forecast windows">
        {WINDOWS.map((item, index) => (
          <button key={item.code} className="sr-forecast-strip__tab" type="button" role="tab" aria-selected={active === index} aria-controls={`forecast-window-${index}`} aria-label={`${item.code} ${item.label.toUpperCase()}`} onClick={() => setActive(index)}>
            <span>{item.code}</span><small>{item.label}</small>
          </button>
        ))}
      </div>
      <div key={window.code} className="sr-forecast-strip__window" id={`forecast-window-${active}`} role="tabpanel" aria-live="polite">
        <div className="sr-forecast-strip__copy">
          <span className="sr-forecast-strip__code">Observation / SR-07 / {window.code}</span>
          <h3>{window.title}</h3>
          <p>{window.copy}</p>
          <div className="sr-forecast-strip__readings"><span>{window.reading}</span><span>{window.wind}</span></div>
        </div>
        <MiniTrace key={window.code} active={active} />
      </div>
    </div>
  );
}
