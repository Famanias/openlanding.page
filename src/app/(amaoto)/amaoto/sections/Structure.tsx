import { StageAnchor } from "../bg/StageAnchor";
import { PARTS } from "../data/parts";
import { AnatomyDetails } from "../scene/AnatomyControls";
import type { AnatomyState, AnatomyEvent } from "../scene/anatomy";
export function Structure({
  state,
  dispatch,
  enhanced = false,
}: {
  state: AnatomyState;
  dispatch: (event: AnatomyEvent) => void;
  enhanced?: boolean;
}) {
  return (
    <section
      id="structure"
      className="am-section am-structure"
      data-inspecting={Boolean(state.part)}
    >
      <StageAnchor />
      <div className="am-chapter-copy">
        <span className="am-kicker">02 / structure</span>
        <h2>
          <span className="am-line">
            <span>Forty ribs,</span>
          </span>
          <em className="am-line">
            <span>one breath.</span>
          </em>
        </h2>
        {!enhanced && <AnatomyDetails state={state} dispatch={dispatch} />}
        <div className="am-inspector-spec">
          <span>40 ribs / one circumference</span>
          <span>81 quiet making steps</span>
        </div>
        {!enhanced && (
          <div>
            <dl className="am-anatomy-fallback">
              {PARTS.map((part) => (
                <div key={part.id}>
                  <dt>{part.name}</dt>
                  <dd>{part.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
