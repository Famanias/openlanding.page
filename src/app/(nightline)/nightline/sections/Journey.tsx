"use client";
import { useEffect, useState } from "react";
import { Picture } from "../assets";
import { STATION_CONTENT } from "../content/stations";
import { stationAt } from "../journey/journey";
import { Reveal } from "../motion/Reveal";
import { useScrollProgress } from "../motion/useScrollProgress";

export function Journey() {
  const progress = useScrollProgress();
  const [active, setActive] = useState(0);
  const current = stationAt(progress);
  useEffect(() => setActive(current.index), [current.index]);

  return (
    <section id="line" className="nli-section nli-line">
      <div className="nli-line__rail" aria-label="Journey stations">
        {STATION_CONTENT.map((station, index) => (
          <a key={station.name} href={`#station-${index}`} className={index === active ? "is-active" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {station.name}
          </a>
        ))}
      </div>
      <div className="nli-line__intro">
        <Reveal type="label">
          <p className="nli-eyebrow">02 / THE LINE</p>
        </Reveal>
        <Reveal type="mask">
          <h2>
            One window.<br />
            <em>Four kinds of dark.</em>
          </h2>
        </Reveal>
        <Reveal type="rise">
          <p>Scroll through the hours as the world outside changes speed. Each station is a small permission to stay awake.</p>
        </Reveal>
        <Reveal type="rise" index={1}>
          <div className="nli-line__media">
            <Picture
              assetKey="station-lights"
              alt="Station lights streaking past the carriage window at night"
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
      <div className="nli-station-list">
        {STATION_CONTENT.map((station, index) => (
          <article id={`station-${index}`} key={station.name} className={`nli-station ${index === active ? "is-current" : ""}`}>
            <div className="nli-station__number">0{index + 1}</div>
            <div>
              <p className="nli-mono">
                {station.time} · {station.place}
              </p>
              <h3>{station.name}</h3>
              <p>{station.body}</p>
            </div>
            <span className="nli-station__arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
