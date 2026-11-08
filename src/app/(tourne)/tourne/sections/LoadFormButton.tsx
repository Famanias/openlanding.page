"use client";
import { useVessel } from "../vessel/VesselProvider";

/** Loads a collection form onto the wheel, then returns the visitor to the shape step. */
export function LoadFormButton({ formId, name }: { formId: string; name: string }) {
  const { state, dispatch } = useVessel();
  const loaded = state.formId === formId;
  return (
    <button
      type="button"
      className="tn-btn tn-btn-ghost tn-btn-small"
      aria-pressed={loaded}
      onClick={() => {
        dispatch({ type: "form", id: formId });
        document.getElementById("tn-shape")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      }}
    >
      <span className="tn-btn-label" data-label={loaded ? "On the wheel" : "Put it on the wheel"}>
        {loaded ? "On the wheel" : "Put it on the wheel"}
        <span className="tn-sr"> ({name})</span>
      </span>
    </button>
  );
}
