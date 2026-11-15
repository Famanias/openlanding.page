import { Blaze } from "../brand/Signal";
import { Lines } from "../motion/Lines";
import { Reveal } from "../motion/Reveal";
import { Spotlight } from "../motion/Spotlight";
import { LOGBOOK } from "./content";

/** Guest words, in the brand's terms: pages from the logbook on the windowsill. */
export function Logbook() {
  return (
    <section className="ew-logbook" aria-labelledby="ew-logbook-title">
      <div className="ew-logbook-head">
        <Reveal variant="slide" className="ew-post ew-section-post">
          <Blaze /> The logbook · windowsill
        </Reveal>
        <Reveal as="h2" variant="lines" className="ew-display ew-h2" id="ew-logbook-title">
          <Lines lines={["Write the", "weather down."]} />
        </Reveal>
        <Reveal as="p" variant="settle" className="ew-lede" delay={140}>
          There is a pencil on a string. Everyone who stays adds a line before they lock up. Three pages, copied out as written.
        </Reveal>
      </div>

      <ul className="ew-entries">
        {LOGBOOK.map((entry, index) => (
          <Reveal as="li" variant="approach" className="ew-entry-slot" key={entry.date} index={index}>
            <Spotlight as="article" className="ew-entry">
              <header className="ew-entry-head">
                <span className="ew-post">{entry.date}</span>
                <span className="ew-post">{entry.nights} nights</span>
              </header>
              <p className="ew-post ew-entry-weather">
                <Blaze /> {entry.weather}
              </p>
              <blockquote className="ew-entry-text">
                <p>{entry.text}</p>
              </blockquote>
              <footer className="ew-entry-sign">{entry.initials}</footer>
            </Spotlight>
          </Reveal>
        ))}
      </ul>
      <p className="ew-fineprint ew-logbook-note">Illustrative entries. The guests and the weather are invented.</p>
    </section>
  );
}
