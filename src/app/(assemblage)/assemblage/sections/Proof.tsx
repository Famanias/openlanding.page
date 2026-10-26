const proof = [
  { quote: "The study gave our launch a shared vocabulary. We stopped debating taste and started making decisions.", name: "Mara Ivers", role: "Founder, Field Notes Press", tone: "teal" },
  { quote: "We found the brave version of the idea before the production budget made everything feel permanent.", name: "Jonas Bell", role: "Creative lead, Northline Objects", tone: "ochre" },
];

export function Proof() {
  return (
    <section className="as-proof as-container" data-as-reveal="card-cascade">
      <div className="as-proof-top"><p className="as-kicker">Small teams, strong point of view</p><p className="as-proof-stat"><strong>17</strong> studies made · <strong>4.8/5</strong> clarity score</p></div>
      <div className="as-proof-grid">
        {proof.map((item) => <figure className={`as-quote as-quote--${item.tone}`} key={item.name}><div className="as-quote-mark">“</div><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption><span className="as-quote-tape" aria-hidden="true" /></figure>)}
      </div>
    </section>
  );
}
