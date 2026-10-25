const cards = [
  { index: "01", title: "Conversion", copy: "Sharper paths from product detail to paid order.", tone: "peach" },
  { index: "02", title: "Merchandising", copy: "Collections that make the right things easier to find.", tone: "lilac" },
  { index: "03", title: "Speed", copy: "A faster shop that still feels like your shop.", tone: "sky" },
  { index: "04", title: "Retention", copy: "Small post-purchase moments that earn a return.", tone: "butter" },
];

export function CareTracks() {
  return (
    <section id="care" className="ac-section" aria-labelledby="care-title">
      <div className="ac-container">
        <div className="ac-section-head" data-ac-reveal="rise">
          <p className="ac-section-note">What we keep an eye on</p>
          <div><h2 id="care-title">Care that keeps the shelf moving.</h2><p>One steady partner for the details that drift after launch: the things customers feel, even when they never name them.</p></div>
        </div>
        <div className="ac-care-grid">
          {cards.map((card, index) => (
            <article className={`ac-care-card ac-care-card--${card.tone}`} key={card.index} data-ac-reveal="scale" style={{ "--ac-index": index } as React.CSSProperties}>
              <div className="ac-care-card-top"><span>{card.index}</span><span>Care track</span></div>
              <div><h3>{card.title}</h3><p>{card.copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
