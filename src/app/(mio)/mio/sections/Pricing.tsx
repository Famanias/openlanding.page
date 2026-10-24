import { PACKAGES } from "../data";
import { Arrow, Star } from "../brand/Icons";
import { Reveal } from "../motion/Reveal";
export function Pricing() {
  return <section className="mh-pricing mh-section" id="commissions" aria-labelledby="mh-pricing-title">
    <div className="mh-section-heading"><Reveal variant="mask"><h2 id="mh-pricing-title">What shall we<br/>dream up together?</h2></Reveal><Reveal><p>A gift for someone you love. A character you&apos;ve imagined.<br/>A place that only exists in your head. Let&apos;s make it real.</p><span className="mh-availability"><span/> A small number of spots each month</span></Reveal></div>
    <div className="mh-package-grid">{PACKAGES.map((item, i) => <Reveal key={item.id} variant="scale" index={i}><article className={`mh-package ${i === 1 ? "mh-package-featured" : ""}`}>
      <div className="mh-package-top"><span className="mh-package-kind">{item.kind}</span>{i === 1 && <Star/>}</div><h3>{item.name}</h3><p>{item.description}</p><div className="mh-price"><span>from</span><strong>${item.price}</strong><span>USD</span></div><ul>{item.includes.map(text => <li key={text}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="m3 8 3 3 7-7"/></svg>{text}</li>)}</ul><div className="mh-package-time">Usually {item.time}</div><a href={`?commission=${item.id}#inquiry`} className={`mh-button ${i === 1 ? "" : "mh-button-outline"}`} data-mh-package={item.id}>Let&apos;s make this <Arrow/></a>
    </article></Reveal>)}</div>
    <div className="mh-pricing-note"><p>Every piece is made just for you. Personal use included.<br/>For commercial work or something a little different, tell me your idea.</p><p>Sample prices · Final quote agreed before we begin<br/>50% to reserve your spot · 50% on completion</p></div>
  </section>;
}
