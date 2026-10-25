import type { CSSProperties } from "react";
import { ROLES, type SheetRequest } from "./validation";

/** Success: a print slip for the posted contact sheet, with KEEP looped in grease pencil. */
export function KeepSlip({ request, number, onEdit }: { request: SheetRequest; number: string; onEdit: () => void }) {
  const rows = [
    { k: "Run number", v: `No. ${number}` },
    { k: "Posted to", v: `${request.name.trim()}, ${request.city.trim()}` },
    { k: "Country", v: request.country },
    { k: "For", v: ROLES.find((role) => role.id === request.role)?.label ?? "" },
    { k: "Format", v: "A2 sheet, fibre paper, folded twice" },
  ];
  return (
    <div className="cg-slip" tabIndex={-1} data-slip>
      <p className="cg-mono cg-slip__head"><span>Print slip</span><span>Roll 07</span></p>
      <h3 className="cg-slip__title">It&apos;s on the drying line.</h3>
      <p className="cg-slip__lead">Your sheet goes out with the next post. We&apos;ll email {request.email.trim()} when it ships.</p>
      <dl className="cg-slip__rows">
        {rows.map((row, i) => (
          <div key={row.k} style={{ "--i": i } as CSSProperties}>
            <dt className="cg-mono">{row.k}</dt>
            <dd>{row.v}</dd>
          </div>
        ))}
      </dl>
      <span className="cg-slip__keep" aria-hidden="true">
        Keep
        <svg viewBox="0 0 120 60" focusable="false"><path d="M62 6C92 4 115 15 114 31c-1 15-25 25-55 24C30 54 6 45 6 30 6 16 30 6 70 8" pathLength={1} /></svg>
      </span>
      <button type="button" className="cg-link" onClick={onEdit}>Change the address</button>
    </div>
  );
}
