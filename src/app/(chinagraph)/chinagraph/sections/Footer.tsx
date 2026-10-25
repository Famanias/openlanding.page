import { Fragment } from "react";
import { Mark } from "../brand/Logo";
import { STOCKISTS } from "../content/cloth";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";

const EDGE = ["Chinagraph 120", "Roll 07", "Concrete Flash", "AW26", "Safety film", "12 exp", "Pushed +1"];

export function Footer() {
  return (
    <footer className="cg-footer">
      <Marquee className="cg-footer__edge">
        {EDGE.map((word, index) => (
          <Fragment key={word}>
            <span>{word}</span>
            <span className="cg-footer__tick" aria-hidden="true">▸ {index * 2 + 1}A</span>
          </Fragment>
        ))}
      </Marquee>
      <div className="cg-container cg-footer__grid">
        <Reveal className="cg-footer__col" kind="rise" index={0}>
          <p className="cg-mono">Stockists</p>
          <ul>
            {STOCKISTS.map((stockist) => (
              <li key={stockist.city}><strong>{stockist.city}</strong> — {stockist.shop}<span className="cg-footer__note"> · {stockist.note}</span></li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="cg-footer__col" kind="rise" index={1}>
          <p className="cg-mono">This page</p>
          <ul className="cg-footer__links">
            <li><a href="#sheet">The contact sheet</a></li>
            <li><a href="#looks">Six looks</a></li>
            <li><a href="#cloth">Cloth</a></li>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#request">Request the sheet</a></li>
          </ul>
        </Reveal>
        <Reveal className="cg-footer__col" kind="rise" index={2}>
          <p className="cg-mono">Small print</p>
          <p>Chinagraph is a fictional label made for a landing-page template. Photographs are AI-generated; no real people or brands are shown.</p>
        </Reveal>
      </div>
      <div className="cg-container cg-footer__base">
        <Reveal className="cg-footer__word" kind="mask">
          <Mark className="cg-footer__mark" />
          <span className="cg-split__line"><span className="cg-split__inner">Chinagraph</span></span>
        </Reveal>
        <p className="cg-mono cg-footer__legal">© 2026 Chinagraph, London · Marked for keeps.</p>
      </div>
    </footer>
  );
}
