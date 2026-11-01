const steps = [
  ["01", "Send the scraps", "A short call and a shared folder are enough. We start with what already has a pulse."],
  ["02", "Assemble the system", "We test the materials together: image against type, texture against tempo, quiet against signal."],
  ["03", "Leave with direction", "You get a practical study, a working session and the rules to keep making from it."],
];

export function Process() {
  return (
    <section className="as-process as-container" id="process">
      <div className="as-section-intro" data-as-reveal="paper-rise"><p className="as-kicker">The method</p><h2>From instinct to something the room can hold.</h2></div>
      <div className="as-process-story">
        <div className="as-process-visual">
          <div className="as-process-visual-inner" aria-hidden="true">
            <span className="as-method-label as-mono">A direction taking shape</span>
            <div className="as-method-piece as-method-piece--paper" data-as-method-piece="0"><span>Room<br />for the<br />unexpected.</span></div>
            <div className="as-method-piece as-method-piece--image" data-as-method-piece="1" />
            <div className="as-method-piece as-method-piece--ink" data-as-method-piece="2">Make it<br />mean<br />something.</div>
            <div className="as-method-progress"><span /></div>
          </div>
          <nav className="as-method-stages as-mono" aria-label="Study stages"><a href="#as-step-01">01 Collect</a><a href="#as-step-02">02 Assemble</a><a href="#as-step-03">03 Resolve</a></nav>
        </div>
        <div className="as-step-grid">
          {steps.map(([number, title, copy], index) => <article className="as-step" id={`as-step-${number}`} key={number} data-as-reveal="paper-rise" data-as-order={index}><span className="as-step-number">{number}</span><h3>{title}</h3><p>{copy}</p><span className="as-step-arrow" aria-hidden="true">↘</span></article>)}
        </div>
      </div>
    </section>
  );
}
