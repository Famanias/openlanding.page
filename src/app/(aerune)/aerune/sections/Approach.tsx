const steps = [
  { number: "01", title: "Gather the signals", text: "Bring together the conditions and patterns across your spaces.", mark: "⌁" },
  { number: "02", title: "See what matters", text: "Read the day in context, from quiet mornings to busy rooms.", mark: "◉" },
  { number: "03", title: "Make a good move", text: "Give your team a clear next step for the spaces they look after.", mark: "↗" },
];

export function Approach() {
  return <section className="ar-section ar-approach" id="approach">
    <div className="ar-approach__header" data-reveal="rise"><div><p className="ar-eyebrow">THE WAY IT WORKS</p><h2>From a little signal<br /><span>to a clearer decision.</span></h2></div><p>Thoughtful buildings don&apos;t need more noise. They need the right information at the right moment.</p></div>
    <div className="ar-approach__steps">{steps.map((step, i) => <article className="ar-step" data-reveal="rise" style={{ "--i": i } as React.CSSProperties} key={step.number}><div className="ar-step__top"><span className="ar-step__mark" aria-hidden="true">{step.mark}</span><span>{step.number} / 03</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    <div className="ar-approach__bottom"><span>BETTER INPUTS. BETTER SPACES.</span><span>AERUNE / 03 STEPS</span></div>
  </section>;
}
