import { Picture } from "../assets";
import { Ticket } from "../brand/Marks";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { Spotlight } from "../motion/Spotlight";
import { COMPANY, STATS } from "./content";

export function About() {
  return (
    <section className="tv-section tv-about" id="about" aria-labelledby="tv-about-title">
      <div className="tv-wrap tv-about-grid">
        <Reveal as="figure" variant="push" className="tv-about-photo">
          <Picture assetKey="about-blade" alt="Close on the front of a track loader pushing a pile of dark clods" sizes="(min-width: 1000px) 44vw, 100vw" />
          <figcaption className="tv-gauge">The view from the seat</figcaption>
        </Reveal>

        <div className="tv-about-copy">
          <Reveal as="p" variant="slide" className="tv-eyebrow tv-gauge">
            About · est. {COMPANY.founded}
          </Reveal>
          <Reveal as="h2" variant="lines" className="tv-title" id="tv-about-title">
            <span className="tv-line">
              <span>Excavating</span>
            </span>{" "}
            <span className="tv-line">
              <span>Since 2002</span>
            </span>
          </Reveal>
          <Reveal as="p" className="tv-lede" delay={100}>
            Dale started Tolvar Earthworks in {COMPANY.founded} with one used excavator and a borrowed trailer. It is
            still a family business: his name is on the door, and he is usually the one in the seat.
          </Reveal>
          <Reveal as="p" className="tv-about-text" delay={160}>
            The idea has not changed. Show up when we said we would, dig what we quoted, leave the site better than a
            dirt crew is expected to. Most of our work comes from people we have already worked for, and we would like
            to keep it that way.
          </Reveal>
          <Reveal as="ul" variant="drop" className="tv-about-tickets" delay={220}>
            <li>
              <Ticket check>Free estimates</Ticket>
            </li>
            <li>
              <Ticket check>Licensed &amp; insured</Ticket>
            </li>
            <li>
              <Ticket check>Family-owned</Ticket>
            </li>
          </Reveal>
        </div>
      </div>

      <div className="tv-wrap">
        <ul className="tv-stats">
          {STATS.map((stat, index) => (
            <Reveal as="li" variant="drop" index={index} key={stat.label}>
              <Spotlight className="tv-stat">
                <CountUp value={stat.value} suffix={stat.suffix} className="tv-stat-value" />
                <span className="tv-stat-label">{stat.label}</span>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
