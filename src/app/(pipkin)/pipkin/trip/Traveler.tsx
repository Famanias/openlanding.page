import { JarArt } from "../brand/Jar";

const SPARKLE = "M20 3 C22 14 26 18 37 20 C26 22 22 26 20 37 C18 26 14 22 3 20 C14 18 18 14 20 3 Z";

/**
 * The order's jar and shipping box, drawn on a 1200x700 layer that lines up with the scene art
 * (same viewBox, same crop). Which pieces show is decided in pipkin.css from `data-stop`, so every
 * change between stops is a plain CSS transition that can reverse mid-flight.
 */
export function Traveler({ stop, className = "" }: { stop: number; className?: string }) {
  return (
    <svg className={`pk-tv-layer ${className}`} data-stop={stop} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g transform="translate(600 548)">
        <ellipse className="pk-tv-shadow" cx="0" cy="8" rx="128" ry="15" fill="var(--color-plum)" />
        <g className="pk-tv-lift">
          <g className="pk-tv-squash">
            <g className="pk-tv-bob">
              <g className="pk-tv-ghost" transform="translate(-72 -172) scale(1.2)">
                <JarArt tone="bubblegum" ghost />
              </g>
              <g className="pk-tv-jar">
                <g className="pk-tv-jarlift">
                  <g transform="translate(-72 -172) scale(1.2)">
                    <JarArt tone="bubblegum" label="No. 01" />
                  </g>
                </g>
              </g>
              <g className="pk-tv-box">
                <rect x="-125" y="-124" width="250" height="124" rx="36" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="4.4" />
                <rect x="-70" y="-100" width="140" height="56" rx="28" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
                <text x="0" y="-65" textAnchor="middle" className="pk-svg-text pk-svg-strong pk-svg-big">PIPKIN</text>
                <g className="pk-tv-lid">
                  <rect x="-140" y="-158" width="280" height="50" rx="25" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="4.4" />
                  <rect x="-24" y="-158" width="48" height="50" rx="14" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3.4" />
                </g>
              </g>
              <g className="pk-tv-pop">
                <g transform="translate(-190 -250) scale(1.4)"><path className="pk-twinkle" d={SPARKLE} fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" /></g>
                <g transform="translate(150 -290) scale(1.1)"><path className="pk-twinkle" style={{ animationDelay: "0.5s" }} d={SPARKLE} fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" /></g>
                <g transform="translate(170 -190) scale(.8)"><path className="pk-twinkle" style={{ animationDelay: "1s" }} d={SPARKLE} fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" /></g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
