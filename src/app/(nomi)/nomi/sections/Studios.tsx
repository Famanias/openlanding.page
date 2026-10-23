import type { CSSProperties } from "react";
import { SceneIcon } from "../brand/Icons";
import type { SceneId } from "../launch/scenes";
import { Words } from "../motion/Words";

type Row = { title: string; copy: string; scene: "schedule" | "progress" | "payments" };

const ROWS: Row[] = [
  { title: "Know what is next.", copy: "Every lesson, reminder and open thread stays in one soft-focus view.", scene: "schedule" },
  { title: "Show the progress.", copy: "Give families a clear, generous window into the work happening between sessions.", scene: "progress" },
  { title: "Close the loop.", copy: "Invoices and follow-ups move with the lesson instead of waiting behind it.", scene: "payments" },
];

const NAMES: Record<SceneId, string> = { inbox: "Inbox", schedule: "Schedule", progress: "Progress", payments: "Payments" };

/** A small built sample of the moment each row is about, so the row shows its promise. */
function Panel({ scene }: { scene: Row["scene"] }) {
  return (
    <div className="nm-panel" aria-hidden="true">
      <span className="nm-panel-head">
        <SceneIcon id={scene} />
        {NAMES[scene]}
      </span>
      {scene === "schedule" && (
        <span className="nm-panel-line">
          <span className="nm-mono">Thu 5:30 PM</span>
          <em>Open</em>
        </span>
      )}
      {scene === "progress" && (
        <span className="nm-panel-line">
          <span>Fractions</span>
          <i className="nm-bar" style={{ "--v": 0.9 } as CSSProperties} />
          <span className="nm-mono">90%</span>
        </span>
      )}
      {scene === "payments" && (
        <span className="nm-panel-line">
          <span>Invoice 103</span>
          <em>Paid</em>
        </span>
      )}
    </div>
  );
}

export function Studios() {
  return (
    <section className="nm-studios" id="studios">
      <div className="container">
        <h2 data-nm-reveal="mask"><Words text="Quiet tools for busy humans." /></h2>
        <ul className="nm-rows" data-nm-reveal="stagger">
          {ROWS.map((row, i) => (
            <li key={row.title} className="nm-row" data-scene={row.scene} style={{ "--i": i } as CSSProperties}>
              <h3>{row.title}</h3>
              <p>{row.copy}</p>
              <Panel scene={row.scene} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
