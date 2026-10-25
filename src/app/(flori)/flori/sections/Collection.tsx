import { FLOWERS } from "../content/flowers";
import { BotanicalArt } from "../bouquet/BotanicalArt";
import { Reveal } from "../motion/Reveal";

export function Collection() {
  return <section className="fl-section fl-collection" id="flowers" tabIndex={-1} aria-labelledby="fl-flowers-title">
    <div className="fl-section-heading"><Reveal variant="mask"><p className="fl-eyebrow">The weekly gathering</p><h2 id="fl-flowers-title">What’s your<br /><em>flower feeling?</em></h2></Reveal><Reveal><p className="fl-lead">No two weeks are quite the same.<br />Just nature doing its lovely thing.</p><a className="fl-text-link" href="#compose">Let’s find your bunch <span aria-hidden="true">↗</span></a></Reveal></div>
    <div className="fl-collection-grid">{FLOWERS.map((flower, i) => <Reveal key={flower.id} variant="scale" index={i}><a className="fl-flower-card" href={`?feeling=${flower.id}#compose`}>
      <div className={`fl-flower-card-art fl-bg-${flower.background}`}><span className="fl-flower-number">{flower.number} / the gathering</span><BotanicalArt feeling={flower.id} title={`${flower.name} seasonal flowers`} /><span className="fl-script">{flower.note}</span><span className="fl-card-arrow" aria-hidden="true">↗</span></div>
      <div className="fl-card-title"><h3>{flower.name}</h3><span>from £24</span></div><p>{flower.description}</p><span className="fl-flower-spec">{flower.flowers}</span>
    </a></Reveal>)}</div>
    <p className="fl-collection-foot">A feeling, never a fixed recipe. Your stems will follow the season.</p>
  </section>;
}
