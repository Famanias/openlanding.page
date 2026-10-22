import { Seal } from "../brand/Seal";
import { FIRM } from "../content/firm";
import { Magnetic } from "../motion/Magnetic";
import { Button, Lines, TextLink, vars } from "./parts";

/** Fine line-art of a courthouse colonnade, drawn in gold hairlines. Decorative. */
function Colonnade() {
  const columns = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg className="cr-colonnade" viewBox="0 0 1200 520" fill="none" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g stroke="var(--color-gold)" strokeWidth="1">
        <path d="M60 120 600 24l540 96" />
        <path d="M60 120h1080M84 146h1032" />
        {columns.map((i) => {
          const x = 130 + i * 156;
          return (
            <g key={i}>
              <path d={`M${x - 22} 166h44M${x - 16} 166v320M${x + 16} 166v320M${x - 22} 486h44`} />
              <path d={`M${x - 8} 176v300M${x} 176v300M${x + 8} 176v300`} opacity="0.35" />
            </g>
          );
        })}
        <path d="M70 486h1060M50 506h1100" />
      </g>
    </svg>
  );
}

/** The opening statement: a midnight slab with the colonnade, the headline, and a memorandum that foreshadows the brief. */
export function Hero() {
  return (
    <section id="top" className="cr-hero" aria-labelledby="cr-h1">
      <div className="cr-hero__bg" aria-hidden="true">
        <div className="cr-hero__lines">
          <Colonnade />
        </div>
        <div className="cr-hero__glow" data-ambient="paused" />
        <div className="cr-grain" />
      </div>

      <div className="cr-wrap cr-hero__grid">
        <div className="cr-hero__copy">
          <p className="cr-eyebrow cr-eyebrow--slab cr-load" style={vars({ "--d": 420 })}>
            <span className="cr-eyebrow__n">New York</span>
            <span className="cr-eyebrow__rule" aria-hidden="true" />
            <span>Business law · Disputes · Estates</span>
          </p>
          <Lines as="h1" id="cr-h1" className="cr-h1" load lines={["Hard decisions,", <em key="e">argued well.</em>]} />
          <p className="cr-lead cr-load" style={vars({ "--d": 760 })}>
            Calder &amp; Rowe is a New York law firm of eleven attorneys. When the matter is consequential, you work directly with the partners who argue it.
          </p>
          <div className="cr-hero__cta cr-load" style={vars({ "--d": 900 })}>
            <Magnetic>
              <Button href="#file" tone="gold">
                File a matter
              </Button>
            </Magnetic>
            <TextLink href="#argument">Read how we argue</TextLink>
          </div>
        </div>

        <div className="cr-hero__sheets cr-load cr-load--sheet" style={vars({ "--d": 640 })} data-ambient="paused">
          <div className="cr-sheet cr-sheet--back" aria-hidden="true" />
          <figure className="cr-sheet cr-sheet--front" aria-label="A memorandum of counsel, as an example of the firm's written advice">
            <div className="cr-sheet__head">
              <span className="cr-mono">Memorandum of counsel</span>
              <span className="cr-mono">No. 87-0412</span>
            </div>
            <p className="cr-sheet__matter">
              In the matter of <em>your decision</em>
            </p>
            <span className="cr-sheet__rule" aria-hidden="true" />
            <p className="cr-sheet__clause">
              <b>§ 3.</b> The strongest position is the one you can explain in a sentence. We recommend settling before discovery, on the terms set out below.
            </p>
            <p className="cr-sheet__ghost" aria-hidden="true">
              <i />
              <i />
              <i />
            </p>
            <p className="cr-sheet__clause">
              <b>§ 4.</b> Fees are fixed at the figure agreed in writing. Nothing is billed beyond it without your say-so.
            </p>
            <p className="cr-sheet__ghost" aria-hidden="true">
              <i />
              <i />
            </p>
            <p className="cr-note cr-note--sheet">Settle before discovery.</p>
            <figcaption className="cr-sheet__sign">
              <span className="cr-sheet__sig" aria-hidden="true" />
              <span className="cr-mono">M. Calder, partner</span>
            </figcaption>
          </figure>
          <Seal id="hero" className="cr-hero__seal" />
        </div>
      </div>

      <dl className="cr-wrap cr-hero__strip cr-load" style={vars({ "--d": 1050 })}>
        <div>
          <dt>Direct line</dt>
          <dd>
            <a href={FIRM.phoneHref}>{FIRM.phone}</a>
          </dd>
        </div>
        <div>
          <dt>Offices</dt>
          <dd>{FIRM.offices}</dd>
        </div>
        <div>
          <dt>Since</dt>
          <dd>{FIRM.founded}</dd>
        </div>
        <div>
          <dt>Reply within</dt>
          <dd>One business day</dd>
        </div>
      </dl>
    </section>
  );
}
