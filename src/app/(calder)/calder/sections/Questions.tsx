import { Accordion } from "./Accordion";
import { Eyebrow, Lines } from "./parts";

export function Questions() {
  return (
    <section id="questions" className="cr-slab cr-slab--paper cr-questions" aria-labelledby="cr-q-h">
      <div className="cr-wrap cr-questions__grid">
        <header className="cr-head cr-questions__head">
          <Eyebrow n="§ V">Questions</Eyebrow>
          <Lines as="h2" id="cr-q-h" className="cr-h2" lines={["Before we", <em key="e">speak.</em>]} />
          <p className="cr-lede" data-reveal="rise">
            The things most people ask first. If yours is not here, the form below is the quickest way to reach a partner.
          </p>
        </header>
        <Accordion />
      </div>
    </section>
  );
}
