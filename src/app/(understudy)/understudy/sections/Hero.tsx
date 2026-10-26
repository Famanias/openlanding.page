import type { CSSProperties } from "react";
import { Mark } from "../brand/Logo";
import { CueDot } from "../brand/Props";
import { StageFloor } from "../brand/StageFloor";
import { CompanyMark } from "../brand/CompanyMark";
import { CASTING_COMPANIES, HOUSE_ROWS } from "../content/companies";

const FIGURE = CASTING_COMPANIES.toLocaleString("en-US") + "+";

/**
 * One held stage. At rest: the line, and under it the mark, a small proscenium with its
 * curtain breathing. Scrolling pushes in: the line lifts away, the arch opens to the whole
 * screen, the curtains part, and in the dark house the figure rises digit by digit over two
 * drifting rows of companies bent as if through a wide lens. Then the stage lets go.
 */
export function Hero() {
  return (
    <section className="us-hero" id="top" data-scene="hero" data-tone="light" data-dark-from="0.42" aria-labelledby="us-hero-t">
      <div className="us-hero__stage">
        <div className="us-hero__floor" aria-hidden="true">
          <StageFloor variant="pale" />
          <i className="us-hero__mist" />
        </div>

        <div className="us-hero__copy">
          <p className="us-eyebrow us-hero__eyebrow"><span>The rehearsal studio for first jobs</span></p>
          <h1 className="us-hero__t" id="us-hero-t">
            <span className="us-hero__l"><span>Your first job,</span></span>
            <span className="us-hero__l"><span>rehearsed.<CueDot className="us-hero__cue" /></span></span>
          </h1>
        </div>

        {/* where the arch rests; with motion off it shows the mark itself */}
        <span className="us-hero__slot" aria-hidden="true">
          <Mark className="us-hero__mark" />
          <span className="us-hero__rings" data-ambient><i /><i /><i /></span>
        </span>

        <div className="us-house" id="house">
          <div className="us-curtains" aria-hidden="true">
            <i className="us-curtain us-curtain--l" />
            <i className="us-curtain us-curtain--r" />
            <i className="us-curtains__slit" />
          </div>
          <div className="us-house__in">
            <h2 className="us-house__h">
              <span className="us-house__n" aria-hidden="true">
                {[...FIGURE].map((ch, i) => (
                  <span key={i} className="us-digit" style={{ "--i": i } as CSSProperties}><span>{ch}</span></span>
                ))}
              </span>
              <span className="us-sr">{FIGURE} </span>
              <span className="us-house__say">
                {["companies casting", "from our studio."].map((line, i) => (
                  <span key={line} className="us-house__l" style={{ "--i": i } as CSSProperties}><span>{line}</span></span>
                ))}
              </span>
            </h2>
            <div className="us-house__rows" role="group" aria-label="Companies casting from the studio">
              {HOUSE_ROWS.map((row, r) => (
                <ul key={r} className="us-house__row" data-dir={r === 0 ? "1" : "-1"}>
                  {[...row, ...row].map((company, i) => (
                    <li key={`${company.id}-${i}`} className="us-house__item" aria-hidden={i >= row.length ? true : undefined} data-copy={i >= row.length ? "" : undefined}>
                      <CompanyMark company={company} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <p className="us-nudge" aria-hidden="true">
          {/* HTML, not SVG: an animated SVG child can't be composited and would force a layout every frame */}
          <span className="us-nudge__mouse"><i className="us-nudge__wheel" /></span>
          <span>Scroll to enter</span>
        </p>
      </div>
    </section>
  );
}
