const benefits = [
  { icon: "✳", number: "01", title: "Think clearly", text: "Find the thread in a tangle of notes, ideas, and questions." },
  { icon: "✎", number: "02", title: "Make freely", text: "Move from a blank page to something you’re excited to share." },
  { icon: "◉", number: "03", title: "Go deeper", text: "Explore a question from more than one thoughtful angle." },
  { icon: "↗", number: "04", title: "Move forward", text: "Turn the next big thing into a collection of smaller steps." },
];
export function Intro() {
  return <section className="avl-intro avl-wrap"><div className="avl-intro-copy" data-reveal="rise"><div className="avl-stars" aria-hidden="true">✳ &nbsp; ✳ &nbsp; ✳</div><p>Good work doesn’t happen in a straight line.<br/><strong>Avel makes a little more room for the thinking in between.</strong></p></div><div className="avl-benefits">{benefits.map((item, index) => <article className="avl-benefit" key={item.number} data-reveal="card" style={{ "--i": index } as React.CSSProperties}><div><span className="avl-benefit-icon">{item.icon}</span><span className="avl-benefit-number">{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>;
}
