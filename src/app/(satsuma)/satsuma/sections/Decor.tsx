import { Mark } from "../brand/Logo";

/**
 * The marks around the hero, placed in the 1440×1080 frame's own units. They come from the brand's fruit,
 * not from handwriting: a seal that turns slowly, a leaf sprig that grows out of a wedge, and a plain
 * trust line under the button. All of it is decorative except the trust line.
 */

const delay = (ms: number) => ({ "--ld": `${ms}ms` }) as React.CSSProperties;

/** A round "handpicked" seal: text on a circle turning around a satsuma. */
export function Seal() {
  return (
    <div className="sa-seal sa-load" style={delay(1500)} aria-hidden="true">
      <svg viewBox="0 0 160 160" focusable="false">
        <circle cx="80" cy="80" r="78" className="sa-seal__disc" />
        <g className="sa-seal__ring">
          <path id="sa-seal-path" d="M80 80m-57 0a57 57 0 1 1 114 0a57 57 0 1 1-114 0" fill="none" />
          <text className="sa-seal__text">
            <textPath href="#sa-seal-path" textLength="355" lengthAdjust="spacing">
              HANDPICKED MAKERS · PEELED BY HAND ·
            </textPath>
          </text>
        </g>
      </svg>
      <Mark className="sa-seal__mark" />
    </div>
  );
}

/** A sprig that grows out of a satsuma wedge: the stem draws, then the leaves unfurl. */
export function Sprig() {
  return (
    <svg className="sa-sprig sa-load" style={delay(1400)} viewBox="0 0 120 130" aria-hidden="true" focusable="false">
      <path pathLength={1} className="sa-draw sa-sprig__stem" d="M44 108C48 82 58 52 76 14" />
      <path className="sa-sprig__leaf" style={{ "--n": 0 } as React.CSSProperties} d="M47 92C24 90 12 70 14 56 36 56 50 70 47 92Z" />
      <path className="sa-sprig__leaf" style={{ "--n": 1 } as React.CSSProperties} d="M58 66C80 68 98 52 102 36 78 32 58 46 58 66Z" />
      <path className="sa-sprig__leaf" style={{ "--n": 2 } as React.CSSProperties} d="M76 14C66 28 70 42 84 48 92 32 88 18 76 14Z" />
      <path d="M8 112a36 36 0 0 1 72 0z" className="sa-sprig__wedge" />
      <path d="M44 112V90M44 112l-15-17M44 112l15-17" className="sa-sprig__veins" />
    </svg>
  );
}

/** One quiet line under the button, replacing a hand-written note. */
export function TrustLine() {
  return (
    <p className="sa-trust sa-load" style={delay(1600)}>
      <span className="sa-trust__dot" aria-hidden="true" />
      Free to brief · a maker replies within 24 h
    </p>
  );
}
