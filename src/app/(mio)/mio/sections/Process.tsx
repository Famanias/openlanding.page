import { PROCESS } from "../data";
import { Reveal } from "../motion/Reveal";
export function Process() {
  return <section className="mh-process mh-section" id="process" aria-labelledby="mh-process-title">
    <Reveal variant="mask"><h2 id="mh-process-title">From a small idea<br/>to something you can keep.</h2></Reveal>
    <ol className="mh-process-list">{PROCESS.map((step, index) => <li key={step.title}><Reveal variant="draw"><div className="mh-process-line"><span>{String(index + 1).padStart(2, "0")}</span><svg viewBox="0 0 200 24" fill="none" aria-hidden="true"><path d="M2 12q48-11 95 0t100 0m-8-5 9 5-9 5" stroke="currentColor" strokeWidth="1"/></svg></div></Reveal><Reveal index={index}><h3>{step.title}</h3><p>{step.text}</p></Reveal></li>)}</ol>
  </section>;
}
