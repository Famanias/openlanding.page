import { PLANS } from "../content/plans";
import { PRICES } from "../bouquet/model";
import { Flower } from "../brand/Flower";
import { Reveal } from "../motion/Reveal";
export function Plans() {
  return <section className="fl-plans fl-scallop" id="plans" aria-labelledby="fl-plans-title"><div className="fl-section">
    <Reveal variant="mask" className="fl-centered"><p className="fl-eyebrow">A little joy, on repeat</p><h2 id="fl-plans-title">Make room for <em>lovely.</em></h2><p className="fl-lead">One bunch, every fortnight. Your favourite corner, made happier.</p></Reveal>
    <div className="fl-plan-grid">{PLANS.map((plan, i) => <Reveal key={plan.id} variant="scale" index={i}><article className="fl-plan" data-favourite={i === 1}>
      <span className="fl-plan-note fl-script">{plan.note}</span><div className="fl-plan-flowers" aria-hidden="true">{Array.from({ length: i + 1 }, (_, j) => <Flower key={j} />)}</div>
      <h3>{plan.name}</h3><p>{plan.description}</p><div className="fl-plan-price">£{PRICES[plan.id]}<span> / delivery</span></div><span className="fl-stems">{plan.stems} · seasonal by nature</span><a className={`fl-button ${i === 1 ? "" : "fl-button--outline"}`} href={`?size=${plan.id}&feeling=daydream#join`}>Pick this bunch <span aria-hidden="true">↗</span></a>
    </article></Reveal>)}</div><Reveal><p className="fl-plan-foot">Delivery included <Flower /> Pause or skip any time <Flower /> No long goodbyes</p></Reveal>
  </div></section>;
}
