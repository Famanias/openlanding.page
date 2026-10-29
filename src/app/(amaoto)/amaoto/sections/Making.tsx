import { MAKING_STEPS } from "../data/steps";
import { StageAnchor } from "../bg/StageAnchor";
export function Making() {
  return (
    <section id="making" className="am-making-sequence">
      <div className="am-section am-making am-making-frame" data-chapter-frame>
        <StageAnchor />
        <div className="am-chapter-copy">
          <span className="am-kicker">05 / craft</span>
          <h2>
            <span className="am-line">
              <span>Eighty-one</span>
            </span>
            <em className="am-line">
              <span>quiet steps.</span>
            </em>
          </h2>
          <p>
            From split bamboo to the last knot, every gesture stays visible in
            the object.
          </p>
          <ol>
            {MAKING_STEPS.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
          <div className="am-making-guide">
            <span>Scroll to follow the making</span>
            <output aria-label="Current making step" data-making-counter>
              01 / 10
            </output>
          </div>
        </div>
      </div>
    </section>
  );
}
