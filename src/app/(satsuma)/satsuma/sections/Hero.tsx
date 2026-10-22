import { Magnetic } from "../motion/Magnetic";
import { ReelWheel } from "../wheel/ReelWheel";
import { Seal, Sprig, TrustLine } from "./Decor";

const delay = (ms: number) => ({ "--ld": `${ms}ms` }) as React.CSSProperties;

/**
 * The 1440×1080 frame. Everything is placed in frame units (--u = min(100vw/1440, 100svh/1080)) so the
 * composition scales as one picture; on phones it restacks. The wheel is the star; the copy sits above it.
 */
export function Hero() {
  return (
    <section id="top" className="sa-hero" aria-labelledby="sa-h1" data-ambient="hero">
      <div className="sa-hero__frame">
        <h1 id="sa-h1" className="sa-h1">
          <span className="sa-h1__line">
            <span className="sa-h1__text sa-load" style={delay(380)}>
              Reels that land,
            </span>
          </span>
          <span className="sa-h1__line sa-h1__line--2">
            <span className="sa-h1__text sa-load" style={delay(520)}>
              made by hand.
            </span>
          </span>
        </h1>

        <p className="sa-sub sa-load" style={delay(760)}>
          <span>Brief a handpicked maker and get scroll-stopping product clips</span>{" "}
          <span>back in days. Every reel is shot, cut and captioned by one</span>{" "}
          <span>person, so nothing ever looks like a template.</span>
        </p>

        <Sprig />
        <Seal />

        <ReelWheel />

        <div className="sa-cta sa-load" style={delay(1150)}>
          <span className="sa-cta__plate" aria-hidden="true" />
          <Magnetic className="sa-cta__magnet">
            <a className="sa-btn sa-btn--aub sa-btn--hero" href="#brief">
              <span className="sa-btn__roll">
                <span>Make a Reel</span>
                <span aria-hidden="true">Make a Reel</span>
              </span>
            </a>
          </Magnetic>
        </div>
        <TrustLine />
      </div>
    </section>
  );
}
