import { QUESTIONS } from "../content/data";
import { Reveal } from "../motion/Reveal";
export function Questions() {
  return <section className="pel-questions pel-section" id="questions"><div className="pel-container"><Reveal><div className="pel-faq-heading"><p className="pel-eyebrow">THE LITTLE THINGS YOU’RE WONDERING</p><h2>A clear answer<br/>goes a long way.</h2></div></Reveal><div className="pel-faq-list">{QUESTIONS.map((item,i)=><Reveal index={i} key={item.question}><details name="pello-questions"><summary><span>{item.question}</span><span className="pel-plus" aria-hidden="true"/></summary><div className="pel-faq-answer"><p>{item.answer}</p></div></details></Reveal>)}</div></div></section>;
}
