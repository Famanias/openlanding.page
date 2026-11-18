import type { CSSProperties } from "react";
import { Boop } from "../boop/Boop";
import { ButtonLink } from "../motion/Button";
import { CountUp } from "../motion/CountUp";
import { Magnetic } from "../motion/Magnetic";

const STATS = [
  { value: 40, suffix: " min", label: "for bloods, in the building" },
  { value: 1860, suffix: "", label: "owners rate us 4.9 out of 5" },
  { value: 2, suffix: "", label: "theatres, one vet before and after" },
];

/**
 * Load choreography (CSS keyframes, so it runs before hydration): blobs settle at 0 ms, the header drops
 * at 150 ms, headline lines rise from 250 ms, then the sub-copy, CTAs and chart card, and Frank pops up
 * last with a wag. Ambient life starts at ~900 ms: the blobs breathe and the props drift.
 */
export function Hero() {
  return (
    <section id="top" className="sn-hero" aria-labelledby="sn-hero-title">
      <div className="sn-hero-inner">
        <div className="sn-hero-copy">
          <p className="sn-eyebrow sn-load" style={{ "--d": 1 } as CSSProperties}>
            <span className="sn-dot-live" aria-hidden="true" />
            Neighbourhood vet · Easton · open seven days
          </p>
          <h1 id="sn-hero-title" className="sn-h1">
            <span className="sn-line sn-load-line" style={{ "--i": 0 } as CSSProperties}>
              <span>Every check-up,</span>
            </span>{" "}
            <span className="sn-line sn-load-line" style={{ "--i": 1 } as CSSProperties}>
              <span>
                <em className="sn-squiggle">nose</em> to tail.
              </span>
            </span>
          </h1>
          <p className="sn-hero-sub sn-load" style={{ "--d": 4 } as CSSProperties}>
            Snoot is the vet your pet doesn&apos;t dread. Separate dog and cat entrances, treats before needles, and a price you see
            before we start.
          </p>
          <div className="sn-hero-ctas sn-load" style={{ "--d": 5 } as CSSProperties}>
            <Magnetic>
              <ButtonLink href="#book" variant="pink">
                Fetch an appointment
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#checkup" variant="milk" arrow={false}>
              See the check-up
            </ButtonLink>
          </div>
          <dl className="sn-hero-stats sn-load" style={{ "--d": 6 } as CSSProperties}>
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sn-sr">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} suffix={s.suffix} className="sn-stat-num" />
                  <span aria-hidden="true">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="sn-hero-art">
          <div className="sn-hero-blob sn-load-blob" aria-hidden="true" />
          <div className="sn-hero-props" aria-hidden="true">
            <svg className="sn-prop sn-prop-bone" viewBox="6 2 102 56">
              <path d="M22 8a12 12 0 0 1 18 10h40a12 12 0 1 1 18 14a12 12 0 1 1-18 14H40a12 12 0 1 1-18-14A12 12 0 0 1 22 8z" />
            </svg>
            <svg className="sn-prop sn-prop-ball" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26" />
              <path d="M8 18c14 6 14 30 0 26M52 16c-14 8-14 28 0 28" />
            </svg>
            <svg className="sn-prop sn-prop-heart" viewBox="14 20 36 30">
              <path d="M32 27c-3-8-17-7-15 4c1 7 9 11 15 15c6-4 14-8 15-15c2-11-12-12-15-4z" />
            </svg>
          </div>
          <div className="sn-hero-frank sn-load-frank">
            <Boop />
          </div>
          <aside className="sn-hero-chart sn-load" style={{ "--d": 7 } as CSSProperties} aria-label="Frank's patient chart">
            <p className="sn-chart">CHART No. 0412</p>
            <p className="sn-hero-chart-name">Frank</p>
            <p className="sn-chart">7 y · dachshund · 7.4 kg</p>
            <p className="sn-hero-chart-status">
              <span aria-hidden="true">✓</span> Very good boy
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
