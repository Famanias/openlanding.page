const steps = [
  { number: "01", title: "Bring your idea", text: "Start with a question, a messy thought, or the thing you’ve been meaning to get to." },
  { number: "02", title: "Find your model", text: "Choose the kind of help you need: everyday clarity, deeper reasoning, or a creative spark." },
  { number: "03", title: "Make it yours", text: "Think things through together, refine the details, and take your next step with confidence." },
];
export function How() {
  return <section className="avl-how" id="how"><div className="avl-wrap"><div className="avl-how-header" data-reveal="rise"><span className="avl-kicker"><span>✳</span> A SIMPLER WAY &nbsp; / &nbsp; 02</span><h2>Good thinking<br/><em>starts here.</em></h2><p>No complicated setup. Just you, your ideas, and a little help along the way.</p></div><div className="avl-steps">{steps.map((step, index) => <article key={step.number} data-reveal="card" style={{ "--i": index } as React.CSSProperties}><div className="avl-step-top"><span>{step.number}</span><span>✳</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><a className="avl-text-link" href="#get-started">Find your starting point <span>↗</span></a></div></section>;
}
