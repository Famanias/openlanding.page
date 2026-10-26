const steps = [
  ["01", "Send the scraps", "A short call and a shared folder are enough. We start with what already has a pulse."],
  ["02", "Assemble the system", "We test the materials together: image against type, texture against tempo, quiet against signal."],
  ["03", "Leave with direction", "You get a practical study, a working session and the rules to keep making from it."],
];

export function Process() {
  return (
    <section className="as-process as-container" id="process" data-as-reveal="line-draw">
      <div className="as-section-intro"><p className="as-kicker">The method</p><h2>From instinct to something the room can hold.</h2></div>
      <div className="as-step-grid">
        {steps.map(([number, title, copy]) => <article className="as-step" key={number}><span className="as-step-number">{number}</span><h3>{title}</h3><p>{copy}</p><span className="as-step-arrow" aria-hidden="true">↘</span></article>)}
      </div>
    </section>
  );
}
