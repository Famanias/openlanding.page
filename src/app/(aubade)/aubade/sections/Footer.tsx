import { Logo } from "../brand/Logo";
import { STATIONS } from "../content/line";
import { Marquee } from "../motion/Marquee";

const LINKS = [
  { href: "#line", label: "The Line" },
  { href: "#berths", label: "Berths" },
  { href: "#dining", label: "Dining car" },
  { href: "#night", label: "The Night" },
  { href: "#departures", label: "Departures" },
  { href: "#reserve", label: "Reserve" },
];

export function Footer() {
  return (
    <footer className="au-footer">
      <Marquee className="au-footer__marquee" items={STATIONS.map((s) => s.short)} label="Stations on the line, Paris to Venezia" />

      <div className="au-wrap">
        <p className="au-footer__slogan" data-reveal="mask">
          <span className="au-mask">
            <span>Leave at dusk.</span>
          </span>
          <span className="au-mask">
            <span>Wake somewhere else.</span>
          </span>
        </p>

        <div className="au-footer__grid">
          <div className="au-footer__brand">
            <Logo strap />
            <p>
              Bureau des voyageurs, Hall 1
              <br />
              Paris-Gare de Lyon, 75012 Paris
              <br />
              Open daily 10:00–19:00
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="au-footer__links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a className="au-link" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="au-footer__notes">
            <p>† All times are scheduled. We arrive late rather than wake you early.</p>
            <p>‡ Fares are per cabin, per night, dinner and breakfast included.</p>
          </div>
        </div>

        <p className="au-footer__legal">
          AUBADE is a fictional rail company. A template from openlandingpage. © 2026.
        </p>
      </div>
    </footer>
  );
}
