const benefits = [
  ["A clear creative brief", "Turn a handful of references into a direction everyone can point at."],
  ["A feeling you can test", "See how type, image, colour and material behave before the first production file."],
  ["Fewer expensive revisions", "Make the big decisions while the work is still light enough to move."],
  ["A kit your team can carry", "Leave with rules, examples and a language your partners can use tomorrow."],
];

export function Benefits() {
  return (
    <section className="as-benefits as-container" id="benefits" data-as-reveal="paper-rise">
      <div className="as-section-intro"><p className="as-kicker">Why a material study</p><h2>Put shape around the instinct.</h2></div>
      <div className="as-benefit-grid">
        {benefits.map(([title, copy], index) => <article className="as-benefit" key={title}><span className="as-index">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>
  );
}
