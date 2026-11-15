import { Mark } from "../brand/Logo";
import { Blaze, SignalBars } from "../brand/Signal";
import { Reveal } from "../motion/Reveal";
import { DISCLAIMER, NAV } from "./content";

export function Footer() {
  return (
    <footer className="ew-footer">
      <div className="ew-footer-top">
        <Reveal variant="settle" className="ew-footer-sign">
          <Mark className="ew-footer-mark" />
          <p className="ew-footer-line">The light is on.</p>
          <p className="ew-post ew-footer-meta">
            <SignalBars bars={0} /> No service · 48.6° N · elev. 612 m
          </p>
        </Reveal>

        <nav className="ew-footer-nav" aria-label="Footer">
          <p className="ew-post">
            <Blaze /> On this page
          </p>
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <a className="ew-link ew-link-light" href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a className="ew-link ew-link-light" href="#top">
                Back to the road
              </a>
            </li>
          </ul>
        </nav>

        <div className="ew-footer-notes">
          <p className="ew-post">
            <Blaze /> Before you set out
          </p>
          <ul>
            <li>Check-in from 3 pm. The trail is unlit, so leave the road by an hour before dark.</li>
            <li>Dogs are welcome and should like stairs.</li>
            <li>Water is from the spring tap. The stove is the only heat.</li>
          </ul>
        </div>
      </div>

      {/* decorative wordmark: drawn as SVG text so it scales with the page and stays out of the reading order */}
      <svg className="ew-footer-word" viewBox="0 0 1000 150" aria-hidden="true" focusable="false">
        <text x="500" y="122" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs">
          ELSEWHERE
        </text>
      </svg>

      <div className="ew-footer-base">
        <p className="ew-fineprint">{DISCLAIMER}</p>
        <p className="ew-post">© 2026 Elsewhere. A landing-page template.</p>
      </div>
    </footer>
  );
}
