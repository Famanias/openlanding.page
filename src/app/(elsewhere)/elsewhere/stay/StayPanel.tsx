"use client";
import { Blaze } from "../brand/Signal";
import { MONTHS } from "../seasons/seasons";
import { MAX_NIGHTS, MIN_NIGHTS, formatMoney, quote } from "./quote";
import { useStay } from "./StayProvider";

/** The stay, as a routed sign: month, nights and guests on the left of the form, with a live illustrative quote. */
export function StayPanel() {
  const { state, dispatch } = useStay();
  const q = quote(state);

  return (
    <div className="ew-stay-panel" data-season={q.season.id}>
      <p className="ew-post ew-stay-panel-title">
        <Blaze /> Your stay
      </p>

      <div className="ew-field-row">
        <label className="ew-post" htmlFor="ew-stay-month">
          Month
        </label>
        <div className="ew-select">
          <select id="ew-stay-month" value={state.month} onChange={(event) => dispatch({ type: "month", month: Number(event.target.value) })}>
            {MONTHS.map((name, index) => (
              <option key={name} value={index + 1}>
                {name}
              </option>
            ))}
          </select>
          <span className="ew-post ew-select-season">{q.season.name} season</span>
        </div>
      </div>

      <div className="ew-field-row">
        <span className="ew-post" id="ew-nights-label">
          Nights
        </span>
        <div className="ew-stepper" role="group" aria-labelledby="ew-nights-label">
          <button type="button" className="ew-step" onClick={() => dispatch({ type: "step-nights", delta: -1 })} disabled={state.nights <= MIN_NIGHTS}>
            <span aria-hidden="true">−</span>
            <span className="ew-sr">One night fewer</span>
          </button>
          <output className="ew-stepper-value" aria-live="polite">
            <span key={state.nights}>{state.nights}</span>
            <span className="ew-sr"> nights</span>
          </output>
          <button type="button" className="ew-step" onClick={() => dispatch({ type: "step-nights", delta: 1 })} disabled={state.nights >= MAX_NIGHTS}>
            <span aria-hidden="true">+</span>
            <span className="ew-sr">One night more</span>
          </button>
        </div>
      </div>

      <fieldset className="ew-field-row ew-guests">
        <legend className="ew-post">Guests</legend>
        <div className="ew-segment">
          {[1, 2].map((count) => (
            <label key={count} className="ew-segment-option">
              <input type="radio" name="ew-guests" value={count} checked={state.guests === count} onChange={() => dispatch({ type: "guests", guests: count })} />
              <span>{count === 1 ? "One" : "Two"}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <dl className="ew-quote">
        {q.lines.map((line) => (
          <div key={line.label} className="ew-quote-line">
            <dt>{line.label}</dt>
            <dd>{formatMoney(line.amount)}</dd>
          </div>
        ))}
        <div className="ew-quote-line ew-quote-total">
          <dt>Total</dt>
          <dd aria-live="polite">
            <span key={q.total} className="ew-quote-total-value">
              {formatMoney(q.total)}
            </span>
          </dd>
        </div>
      </dl>
      <p className="ew-fineprint">Illustrative rates in US dollars. Two-night minimum. Nothing is charged.</p>
    </div>
  );
}
