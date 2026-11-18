"use client";
import { useRef, useState } from "react";
import { Frank } from "../checkup/Frank";
import { boop, initialBoop, type BoopState } from "./boopState";

/**
 * Frank's head in the hero. The nose is a real button: each press squishes it, counts the boop and pops a
 * speech bubble; every fifth press he sneezes. Replays restart by flipping `data-beat` between "a" and "b",
 * which swaps between two identical keyframe sets, so no timers are needed for the squish itself.
 */
export function Boop() {
  const [state, setState] = useState<BoopState>(initialBoop);
  const sneezeTimer = useRef<number | undefined>(undefined);
  const [sneezing, setSneezing] = useState(false);

  const onBoop = () => {
    const next = boop(state);
    setState(next);
    if (next.sneeze) {
      window.clearTimeout(sneezeTimer.current);
      setSneezing(true);
      sneezeTimer.current = window.setTimeout(() => setSneezing(false), 900);
    }
  };

  return (
    <div className="sn-boop" data-beat={state.mine === 0 ? "rest" : state.mine % 2 ? "a" : "b"} data-sneeze={sneezing}>
      <div className="sn-boop-head">
        <Frank crop="head" />
        <button type="button" className="sn-boop-nose" onClick={onBoop} aria-label="Boop me: Frank's nose">
          <span className="sn-boop-hint" aria-hidden="true">
            boop me
          </span>
        </button>
        <span className="sn-boop-bubble" aria-hidden="true" key={state.mine}>
          {state.reaction}
        </span>
        <span className="sn-boop-sparks" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <p className="sn-boop-count sn-chart">
        <span className="sn-boop-num" key={state.count}>
          {state.count.toLocaleString("en-GB")}
        </span>{" "}
        boops today{state.mine > 0 ? ` · ${state.mine} from you` : ""}
      </p>
      <p className="sn-sr" aria-live="polite">
        {state.mine > 0 ? `${state.reaction} ${state.count.toLocaleString("en-GB")} boops today.` : ""}
      </p>
    </div>
  );
}
