const steps = [
  { n: "01", title: "Find the idea.", text: "Start with what makes your project itself. The audience, the offer, and the one thing worth remembering." },
  { n: "02", title: "Give it a world.", text: "Build a visual language around that idea, from the type and color to the moments between sections." },
  { n: "03", title: "Make it real.", text: "Turn the direction into a responsive page, then refine its details, interactions, and handoff." },
];
export function Process() {
  return <section className="lx-process" id="process"><div className="lx-shell"><div className="lx-section-label lx-mono" data-reveal="rise"><span>FROM BRIEF TO BUILD &nbsp; / &nbsp; 03</span><span>THE PROCESS IN THREE MOVES</span></div><div className="lx-process-heading" data-reveal="rise"><h2>Good ideas<br/><em>go further.</em></h2><p>A little structure leaves more room for the interesting parts.</p></div><div className="lx-steps">{steps.map((step, index) => <article key={step.n} data-reveal="card" style={{ "--i": index } as React.CSSProperties}><div className="lx-step-top lx-mono"><span>{step.n} / 03</span><span>✳</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>;
}
