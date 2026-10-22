import { formatUsd, PACKS, perReel } from "../content/packs";
import { Magnetic } from "../motion/Magnetic";
import { Eyebrow } from "./Eyebrow";
import { SegmentRing } from "./SegmentRing";

export function Packs() {
  return (
    <section id="packs" className="sa-packs" aria-labelledby="sa-packs-h">
      <div className="sa-wrap">
        <Eyebrow n="03">Packs</Eyebrow>
        <h2 id="sa-packs-h" className="sa-h2" data-reveal="mask">
          <span className="sa-mask">
            <span>Buy reels by the</span>
          </span>
          <span className="sa-mask">
            <span>
              <em>segment.</em>
            </span>
          </span>
        </h2>
        <p className="sa-lede" data-reveal="rise">
          One wedge, one finished reel. The bigger the fruit, the cheaper each wedge. No subscription, no seat fees, nothing to cancel.
        </p>

        <ul className="sa-packs__grid" data-reveal="cascade">
          {PACKS.map((p, i) => (
            <li key={p.id} style={{ "--i": i } as React.CSSProperties}>
              <article className="sa-pack" data-popular={p.popular ? "true" : undefined}>
                {p.popular && <span className="sa-pack__flag">Most picked</span>}
                <SegmentRing count={p.segments} className="sa-pack__ring" label={`${p.segments} segments, one per reel`} />
                <h3 className="sa-pack__name">
                  {p.name}
                  <span className="sa-pack__count">{p.segments} reels</span>
                </h3>
                <p className="sa-pack__price">
                  <span className="sa-pack__amount">{formatUsd(p.price)}</span>
                  <span className="sa-pack__per">
                    {formatUsd(perReel(p))} a reel · first reels in {p.turnaround}
                  </span>
                </p>
                <ul className="sa-pack__perks">
                  {p.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <Magnetic className="sa-pack__magnet">
                  <a className={`sa-btn ${p.popular ? "sa-btn--sat" : "sa-btn--aub"}`} href="#brief" data-pack={p.id}>
                    <span className="sa-btn__roll">
                      <span>Choose {p.name}</span>
                      <span aria-hidden="true">Choose {p.name}</span>
                    </span>
                  </a>
                </Magnetic>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
