import type { CSSProperties } from "react";
import { STAGES } from "./scene";

/** The fit-out sheet: one row per stage. In the live scene the active row expands and finished rows lock with a check. */
export function FitSheet() {
  return (
    <div className="fx-sheet">
      <div className="fx-sheet__head">
        <span className="fx-mono">Fit-out sheet</span>
        <span className="fx-mono fx-sheet__job">Job FX-0412 · Fennel &amp; Clay</span>
      </div>
      <ol className="fx-sheet__rows">
        {STAGES.map((stage, index) => (
          <li key={stage.id} id={`stage-${stage.id}`} className="fx-sheet__row" data-row={index + 1} style={{ "--i": index } as CSSProperties}>
            <a className="fx-sheet__link" href={`#stage-${stage.id}`} data-goto={index + 1}>
              <span className="fx-sheet__n">{stage.n}</span>
              <span className="fx-sheet__name">{stage.name}</span>
              <span className="fx-sheet__service">{stage.service}</span>
              <span className="fx-sheet__week">{stage.week}</span>
              <svg className="fx-sheet__check" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M3 8.5 6.5 12 13 4.5" pathLength={1} />
              </svg>
            </a>
            <div className="fx-sheet__detail">
              <div className="fx-sheet__detail-inner">
                <p>{stage.line}</p>
                <ul className="fx-sheet__checks">
                  {stage.checks.map((check) => <li key={check}>{check}</li>)}
                </ul>
              </div>
            </div>
            <span className="fx-sheet__bar" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </div>
  );
}
