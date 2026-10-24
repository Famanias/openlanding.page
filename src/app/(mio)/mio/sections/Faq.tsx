import { Reveal } from "../motion/Reveal";
const FAQ = [
  ["Can I commission something that isn't listed?", "Of course. These three options are starting points. Book covers, a special gift, a bigger cast of characters—describe your idea and I'll work out a scope and a custom quote with you."],
  ["Can I use my illustration commercially?", "The sample prices cover personal use: gifts, personal prints, profile pictures, and wallpapers. If your artwork will appear on products, packaging, books, or anything sold, mention that in your brief so commercial rights can be quoted separately."],
  ["What if my idea changes along the way?", "Sketch revisions are included so we can find the right direction together. Once you approve the sketch, larger changes may need a revised quote. We'll always agree on that before any extra work begins."],
  ["How will I receive the finished piece?", "As a high-resolution digital PNG, suitable for personal printing, plus the agreed crops. No physical item is shipped. Exact size, delivery date, and any print requirements are agreed before we start."],
];
export function Faq() {
  return <section className="mh-faq mh-section" id="faq" aria-labelledby="mh-faq-title"><Reveal variant="mask"><h2 id="mh-faq-title">A few things<br/>you might wonder.</h2></Reveal><div>{FAQ.map(([question, answer]) => <Reveal key={question} variant="rise"><details className="mh-faq-item"><summary>{question}<span aria-hidden="true"><i/><i/></span></summary><div className="mh-faq-answer"><div><p>{answer}</p></div></div></details></Reveal>)}</div></section>;
}
