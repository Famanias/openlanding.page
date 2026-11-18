import type { CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { CLINIC, NAV } from "./content";

const PAWS = Array.from({ length: 12 }, (_, i) => i);

/** Ink footer. A trail of paw prints walks across the bottom edge, one print at a time, on a loop. */
export function Footer() {
  return (
    <footer className="sn-footer">
      <div className="sn-footer-inner">
        <div className="sn-footer-brand">
          <Logo tone="paper" className="sn-footer-logo" />
          <p className="sn-footer-motto">Every check-up, nose to tail.</p>
        </div>
        <nav aria-label="Footer" className="sn-footer-col">
          <h2 className="sn-chart">On this page</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a className="sn-ulink" href={n.href}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sn-footer-col">
          <h2 className="sn-chart">Visit</h2>
          <address>
            {CLINIC.address}
            <br />
            <a className="sn-ulink" href={CLINIC.phoneHref}>
              {CLINIC.phone}
            </a>
            <br />
            <a className="sn-ulink" href={`mailto:${CLINIC.email}`}>
              {CLINIC.email}
            </a>
          </address>
        </div>
        <div className="sn-footer-col">
          <h2 className="sn-chart">Night vet</h2>
          <p>
            <a className="sn-ulink" href={CLINIC.emergencyHref}>
              {CLINIC.emergency}
            </a>
            <br />
            Every night, every pet.
          </p>
        </div>
      </div>
      <p className="sn-footer-fine sn-chart">Snoot is a fictional clinic made for a landing-page template. Names, prices and patients are invented.</p>
      <div className="sn-paws" aria-hidden="true">
        {PAWS.map((i) => (
          <svg key={i} viewBox="0 0 40 40" style={{ "--i": i } as CSSProperties}>
            <ellipse cx="20" cy="26" rx="9" ry="8" />
            <circle cx="9" cy="16" r="4" />
            <circle cx="16" cy="10" r="4" />
            <circle cx="24" cy="10" r="4" />
            <circle cx="31" cy="16" r="4" />
          </svg>
        ))}
      </div>
    </footer>
  );
}
