import type { CSSProperties } from "react";
import { Picture } from "../assets";
import type { Look as LookData } from "../content/looks";
import { formatGBP } from "../shop/bag";
import { FRAMES } from "../sheet/roll";

const pad = (n: number) => String(n).padStart(2, "0");

/** One select, full bleed: the frame, a rail showing where it sits on the roll, the garment, and a close crop. */
export function Look({ look, index }: { look: LookData; index: number }) {
  const frame = FRAMES[look.frame - 1];
  return (
    <article id={`look-${pad(look.n)}`} className="cg-look" data-look={index} aria-labelledby={`cg-look-${look.n}`} style={{ "--i": index } as CSSProperties}>
      <div className="cg-look__media">
        <Picture assetKey={look.image} alt={frame.alt} sizes="100vw" />
      </div>
      <span className="cg-look__shade" aria-hidden="true" />
      <span className="cg-strobe cg-strobe--look" aria-hidden="true" />

      <ol className="cg-look__rail" aria-label={`Frame ${look.frame} of 12 on the roll`}>
        {FRAMES.map((f) => (
          <li key={f.n} data-here={f.n === look.frame ? "true" : undefined} data-select={f.select ? "true" : undefined}>
            <span className="cg-sr">{f.n === look.frame ? `Frame ${f.n}, this look` : `Frame ${f.n}`}</span>
          </li>
        ))}
      </ol>

      <div className="cg-container cg-look__info">
        <p className="cg-mono cg-look__meta">Look {pad(look.n)} · Frame {pad(look.frame)} / 12</p>
        <h2 id={`cg-look-${look.n}`} className="cg-look__name">{look.name}</h2>
        <dl className="cg-look__spec">
          <div><dt className="cg-mono">Cloth</dt><dd>{look.cloth}</dd></div>
          <div><dt className="cg-mono">From</dt><dd>{look.origin}</dd></div>
          <div><dt className="cg-mono">Price</dt><dd>{formatGBP(look.price)}</dd></div>
        </dl>
        <p className="cg-look__note">{look.note}</p>
        <a className="cg-button cg-button--solid cg-look__cta" href={`#product-cg-${pad(look.n)}`}>
          <span className="cg-button__fill" aria-hidden="true" />
          <span className="cg-button__roll"><span>Shop the {look.name}</span><span aria-hidden="true">Shop the {look.name}</span></span>
        </a>
      </div>

      <figure className="cg-look__detail">
        <span className="cg-look__detail-img">
          <Picture assetKey={look.detail} alt={look.detailAlt} sizes="(min-width: 900px) 18vw, 40vw" />
        </span>
        <figcaption className="cg-mono">Detail · {look.cloth}</figcaption>
      </figure>
    </article>
  );
}
