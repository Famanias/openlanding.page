const QUESTIONS = [
  ["Do I need to be a serious walker?", "Not at all. Afterwalk is about the pleasure of getting outside, not speed or step counts."],
  ["What should I bring?", "Comfortable shoes, a little water, and whatever helps you enjoy the weather."],
  ["Can I come on my own?", "Absolutely. Showing up solo is a lovely way to meet someone along the way."],
  ["Are these real scheduled walks?", "No. Afterwalk is a fictional club and the routes on this page are examples."],
  ["Does making a walk card reserve a place?", "No. The card is created locally in your browser. Nothing is booked or sent."],
];

export function FAQ() {
  return <section className="aw-faq aw-section" id="questions"><div className="aw-container aw-faq-grid"><div data-reveal="rise"><span className="aw-kicker">THE LITTLE DETAILS</span><h2>Before you<br /><em>head out.</em></h2><p>A few things you might be wondering.</p></div><div className="aw-faq-list" data-reveal="rise">{QUESTIONS.map(([question, answer], index) => <details key={question}><summary><span className="aw-faq-number">0{index + 1}</span><span>{question}</span><span className="aw-faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>;
}
