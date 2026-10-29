import { PARTS } from "../data/parts";
import { PartCallout } from "../ui/PartCallout";
import {
  INSPECTION,
  type AnatomyState,
  type AnatomyEvent,
  type PartId,
} from "./anatomy";
type Controls = {
  state: AnatomyState;
  dispatch: (event: AnatomyEvent) => void;
};
export function AnatomyControls({
  active,
  state,
  dispatch,
  onHighlight,
}: { active: boolean; onHighlight: (id?: PartId) => void } & Controls) {
  return (
    <div className="am-anatomy-ui" hidden={!active} data-inspector-overlay>
      <svg className="am-hotspot-lines" aria-hidden="true">
        {PARTS.map((part) => (
          <path key={part.id} data-marker-line={part.id} />
        ))}
      </svg>
      {PARTS.map((part, index) => (
        <button
          className="am-hotspot"
          key={part.id}
          type="button"
          data-hotspot={part.id}
          data-selected={state.part === part.id}
          aria-label={`Inspect ${part.name}`}
          aria-pressed={state.part === part.id}
          onClick={() => dispatch({ type: "select", part: part.id })}
          onMouseEnter={() => onHighlight(part.id)}
          onMouseLeave={() => onHighlight(undefined)}
          onFocus={() => onHighlight(part.id)}
          onBlur={() => onHighlight(undefined)}
        >
          <span>0{index + 1}</span>
          <b>{part.name}</b>
        </button>
      ))}
      <div className="am-inspector-navigation" data-inspector-navigation>
        <PartCallout
          selected={state.part}
          onSelect={(part) => dispatch({ type: "select", part })}
          onHighlight={onHighlight}
        />
        <div className="am-inspector-navigation__foot">
          <span>
            {state.part
              ? "Look closer. Every part has a job."
              : "Choose any part to look closer."}
          </span>
          <button
            type="button"
            onClick={() => dispatch({ type: "overview" })}
            disabled={!state.part && !state.reveal && state.open === 1}
          >
            Back to overview <span aria-hidden="true">↶</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export function AnatomyDetails({ state, dispatch }: Controls) {
  const part = PARTS.find((part) => part.id === state.part),
    info = state.part ? INSPECTION[state.part] : null;
  const play = (kind: "linkage" | "trace" | "turn") =>
    dispatch({
      type: "play",
      kind,
      reduced: matchMedia("(prefers-reduced-motion:reduce)").matches,
    });
  return (
    <div
      className="am-inspector-detail"
      id="am-inspector-detail"
      data-selected-part={state.part ?? "overview"}
    >
      <div className="am-inspector-detail__body">
        <span className="am-inspector-material">
          {info?.material ?? "Bamboo / paper / thread"}
        </span>
        <h3 aria-live="polite" aria-atomic="true">
          {part?.name ?? "A roof, in six parts."}
        </h3>
        <p>
          {part?.description ??
            "Choose a part on the umbrella or in the index. Look closer, move it, and follow how it belongs to the whole."}
        </p>
        {info && <p className="am-inspector-instruction">{info.instruction}</p>}
      </div>
      <div className="am-inspector-actions">
        {state.part === "ribs" && (
          <button
            type="button"
            aria-pressed={state.oneRib}
            onClick={() => dispatch({ type: "ribs" })}
          >
            {state.oneRib ? "Show all 40 ribs" : "Emphasise one rib"}
          </button>
        )}
        {state.part === "stretchers" && (
          <button
            type="button"
            disabled={state.action?.kind === "linkage"}
            onClick={() => play("linkage")}
          >
            {state.action?.kind === "linkage"
              ? "Following the linkage…"
              : "Move the linkage"}
          </button>
        )}
        {state.part === "thread" && (
          <button
            type="button"
            disabled={state.action?.kind === "trace"}
            aria-pressed={state.staticTie}
            onClick={() => play("trace")}
          >
            {state.action?.kind === "trace"
              ? "Tracing the tie…"
              : "Trace a tie"}
          </button>
        )}
        {state.part === "canopy" && (
          <div role="group" aria-label="Paper inspection side">
            <button
              type="button"
              aria-pressed={!state.underneath}
              onClick={() => {
                if (state.underneath) dispatch({ type: "side" });
              }}
            >
              Outside
            </button>
            <button
              type="button"
              aria-pressed={state.underneath}
              onClick={() => {
                if (!state.underneath) dispatch({ type: "side" });
              }}
            >
              Underneath
            </button>
          </div>
        )}
        {state.part === "handle" && (
          <button
            type="button"
            disabled={state.action?.kind === "turn"}
            onClick={() => play("turn")}
          >
            {state.action?.kind === "turn"
              ? "Turning the view…"
              : "Turn the view"}
          </button>
        )}
      </div>
      <label className="am-inspector-runner" htmlFor="am-runner">
        <span>
          Pull the runner{" "}
          <output data-anatomy-open htmlFor="am-runner">
            {Math.round(state.open * 100)}%
          </output>
        </span>
        <input
          id="am-runner"
          aria-label="Pull the runner"
          type="range"
          min="0"
          max="1"
          step=".01"
          value={state.open}
          onChange={(event) =>
            dispatch({ type: "open", value: Number(event.target.value) })
          }
        />
        <span className="am-inspector-range-ends">
          <i>Closed</i>
          <i>Open</i>
        </span>
      </label>
      <button
        className="am-inspector-reveal"
        type="button"
        aria-pressed={state.reveal}
        onClick={() => dispatch({ type: "reveal" })}
      >
        <span aria-hidden="true">{state.reveal ? "−" : "+"}</span>
        {state.reveal ? "Restore the paper" : "Reveal structure"}
      </button>
    </div>
  );
}
