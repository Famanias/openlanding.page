import { Reveal } from "../motion/Reveal";
import { COMPANY, CREW_TERMS } from "./content";
import { Positions } from "./Positions";

export function Crew() {
  return (
    <section className="tv-section tv-crew tv-dark tv-diesel" id="crew" aria-labelledby="tv-crew-title">
      <div className="tv-wrap tv-crew-grid">
        <div className="tv-crew-copy">
          <Reveal as="p" variant="slide" className="tv-eyebrow tv-gauge">
            <i className="tv-live" aria-hidden="true" />
            Crew · hiring now
          </Reveal>
          <Reveal as="h2" variant="lines" className="tv-title" id="tv-crew-title">
            <span className="tv-line">
              <span>We&apos;re Hiring!</span>
            </span>
          </Reveal>
          <Reveal as="p" className="tv-lede" delay={100}>
            We are a growing utility and dirt-work outfit and we need people who finish what they start. Pass a drug
            screen, hold a clean license, and be the kind of person who picks up the shovel without being asked.
          </Reveal>
          <Reveal as="ul" variant="rise" className="tv-terms" delay={160}>
            {CREW_TERMS.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </Reveal>
          <Reveal variant="drop" delay={220}>
            <a className="tv-btn" href={COMPANY.jobs.href}>
              <span className="tv-btn-label">Email an application</span>
            </a>
            <p className="tv-crew-mail tv-gauge">{COMPANY.jobs.label}</p>
          </Reveal>
        </div>
        <Reveal variant="rise" delay={120} className="tv-crew-list">
          <Positions />
        </Reveal>
      </div>
    </section>
  );
}
