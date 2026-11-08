"use client";
import { GLAZES } from "./glazes";
import { useVessel } from "./VesselProvider";

export function GlazePicker() {
  const { state, dispatch } = useVessel();
  return (
    <div className="tn-glazes" role="radiogroup" aria-label="Glaze">
      {GLAZES.map((glaze) => {
        const selected = glaze.id === state.glazeId;
        return (
          <button
            key={glaze.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className="tn-glaze"
            data-selected={selected}
            style={{ "--glaze": glaze.color } as React.CSSProperties}
            onClick={() => dispatch({ type: "glaze", id: glaze.id })}
          >
            <span className="tn-glaze-chip" aria-hidden="true" />
            <span className="tn-glaze-name">{glaze.name}</span>
            <span className="tn-glaze-firing">{glaze.firing}</span>
          </button>
        );
      })}
    </div>
  );
}
