import { Fragment } from "react";
import { Mark } from "../brand/Logo";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";
import { StudioStatus } from "../studio/StudioStatus";

const TICKER = ["Shell", "Fixtures", "Wiring", "Signage", "Open", "Care"];

export function Footer() {
  return (
    <footer className="fx-footer">
      <Marquee className="fx-footer__ticker">
        {TICKER.map((word, index) => (
          <Fragment key={word}>
            <span className="fx-footer__word">{word}</span>
            <span className="fx-footer__sep" aria-hidden="true">0{index + 1}</span>
          </Fragment>
        ))}
      </Marquee>
      <div className="fx-container fx-footer__grid">
        <Reveal className="fx-footer__col" kind="rise" index={0}>
          <p className="fx-mono">Studio</p>
          <p>Fixture Shopfitters B.V.<br />Rotterdam, the Netherlands<br />KvK 9042 1187</p>
        </Reveal>
        <Reveal className="fx-footer__col" kind="rise" index={1}>
          <p className="fx-mono">Hours</p>
          <p>Mon–Fri, 09:00–18:00 CET</p>
          <StudioStatus />
        </Reveal>
        <Reveal className="fx-footer__col" kind="rise" index={2}>
          <p className="fx-mono">On this page</p>
          <ul className="fx-footer__links">
            <li><a href="#fit-out">The fit-out</a></li>
            <li><a href="#prices">Price list</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#plans">Care plans</a></li>
            <li><a href="#book">Book a walk-through</a></li>
          </ul>
        </Reveal>
        <Reveal className="fx-footer__col" kind="rise" index={3}>
          <p className="fx-mono">Small print</p>
          <p>Fixture is an independent studio and is not affiliated with or endorsed by Shopify Inc. A fictional brand made for a landing-page template.</p>
        </Reveal>
      </div>
      <div className="fx-container fx-footer__base">
        <Reveal className="fx-footer__word-big" kind="mask">
          <Mark className="fx-footer__mark" tone="dark" />
          <span className="fx-split__line"><span className="fx-split__inner">FIXTURE</span></span>
        </Reveal>
        <p className="fx-mono fx-footer__legal">© 2026 Fixture · Your shop, fitted out properly.</p>
      </div>
    </footer>
  );
}
