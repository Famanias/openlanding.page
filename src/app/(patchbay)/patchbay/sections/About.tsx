import { PROFILE } from "../content/profile";
import { Reveal } from "../motion/Reveal";

export function About() {
  return (
    <section id="about" className="pby-section pby-shell" aria-labelledby="pby-about-title">
      <div className="pby-about">
        <Reveal as="header" className="pby-section-head">
          <p className="pby-eyebrow pby-mono">05 / About</p>
          <h2 id="pby-about-title" className="pby-h2">
            The person behind the patch cables.
          </h2>
        </Reveal>
        <div className="pby-about-copy">
          {PROFILE.about.map((paragraph, index) => (
            <Reveal as="p" key={paragraph} index={index} className="pby-lede">
              {paragraph}
            </Reveal>
          ))}
        </div>
        <ol className="pby-timeline" aria-label="Career timeline">
          {PROFILE.timeline.map((entry, index) => (
            <Reveal as="li" key={entry.year} variant="slide-right" index={index} className="pby-timeline-row">
              <span className="pby-mono pby-timeline-year">{entry.year}</span>
              <span>{entry.what}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
