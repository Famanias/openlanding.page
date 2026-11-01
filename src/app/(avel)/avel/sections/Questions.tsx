const questions = [
  ["What is Avel?", "Avel is a fictional family of AI models imagined to help with everyday questions, deeper thinking, and creative work."],
  ["Which model should I choose?", "Start with Core for everyday tasks, Reason when a question needs more depth, and Spark when you want a fresh idea."],
  ["Do I need to know how to code?", "Not at all. Avel is designed around a simple conversation. Bring a question and start there."],
  ["Is this a real product?", "Avel is a landing page template. Its models, company names, and testimonials are illustrative examples."],
];
export function Questions() {
  return <section className="avl-faq avl-wrap" id="questions"><div data-reveal="rise"><span className="avl-kicker"><span>✳</span> THE LITTLE DETAILS &nbsp; / &nbsp; 04</span><h2>A few good<br/><em>questions.</em></h2><p>Everything else can begin with a conversation.</p></div><div className="avl-faq-list" data-reveal="rise">{questions.map(([q,a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>;
}
