"use client";

import type { CSSProperties } from "react";
import { PatchBay } from "../bay/PatchBay";
import { useRole } from "../bay/RoleProvider";
import { PROFILE } from "../content/profile";
import { CountUp } from "../motion/CountUp";
import { Magnetic } from "../motion/Magnetic";
import { Marquee } from "../motion/Marquee";

const TICKER = ["Open to work", PROFILE.availability, PROFILE.location, "Replies within 24 h", "Remote or hybrid"];

export function Hero() {
  const { role, data } = useRole();
  const load = (delay: number) => ({ "--d": `${delay}ms` }) as CSSProperties;

  return (
    <section id="top" className="pby-hero" aria-labelledby="pby-h1">
      <div className="pby-grid-bg" aria-hidden="true" />
      <div className="pby-hero-inner pby-shell">
        <p className="pby-eyebrow pby-mono pby-load" style={load(300)}>
          <span className="pby-eyebrow-dot" aria-hidden="true" />
          {PROFILE.name} Â· <span key={role} className="pby-swap">{data.eyebrow}</span>
        </p>
        <h1 id="pby-h1" className="pby-h1" key={role}>
          {data.headline.map((line, index) => (
            <span key={line} className="pby-line">
              <span className="pby-line-inner" style={{ "--i": index } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p key={`sub-${role}`} className="pby-sub pby-load pby-swap" style={load(650)}>
          {data.sub}
        </p>
        <div className="pby-cta-row pby-load" style={load(760)}>
          <Magnetic>
            <a href="#work" className="pby-btn pby-btn-primary">
              <span className="pby-btn-label">
                {data.cta}
              </span>
              <span className="pby-btn-arrow" aria-hidden="true">â†’</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="pby-btn pby-btn-ghost">
              <span className="pby-btn-label">
                Start a brief
              </span>
            </a>
          </Magnetic>
        </div>
        <div className="pby-load" style={load(860)}>
          <PatchBay />
        </div>
        <dl key={`metrics-${role}`} className="pby-metrics pby-load" style={load(980)}>
          {data.metrics.map((metric) => (
            <div key={metric.label} className="pby-metric">
              <dt className="pby-mono">{metric.label}</dt>
              <dd>
                <CountUp value={metric.value} suffix={metric.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="pby-hero-ticker pby-load" style={load(1100)}>
        <Marquee label="Availability">
          {TICKER.map((item) => (
            <span key={item} className="pby-tick pby-mono">
              {item}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
