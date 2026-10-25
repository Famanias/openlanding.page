import type { CSSProperties } from "react";
import { SERVICES } from "../content/services";
import { BUDGETS, NEEDS, normaliseStore, type Brief } from "./validation";

function priceLabel(price: string, unit: string) {
  if (unit === "flat") return price;
  if (unit === "from") return `from ${price}`;
  return `${price} ${unit}`;
}

type FitSlipProps ={ brief: Brief; reference: string; onEdit: () => void };

/** The success state: the fit-out sheet again, printed line by line for this store, then stamped. */
export function FitSlip({ brief, reference, onEdit }: FitSlipProps) {
  const lines = NEEDS.filter((need) => brief.needs.includes(need.id)).map((need) => {
    const service = SERVICES.find((item) => item.stage === need.id);
    return { id: need.id, label: need.label, price: service ? priceLabel(service.price, service.unit) : "" };
  });
  const budget = BUDGETS.find((item) => item.id === brief.budget)?.label ?? "";
  const rows = [
    { k: "Reference", v: reference },
    { k: "Store", v: normaliseStore(brief.store) ?? brief.store },
    { k: "Ask for", v: brief.name.trim() },
    ...lines.map((line) => ({ k: line.label, v: line.price })),
    { k: "Budget", v: budget },
    { k: "Walk-through", v: "30 min · video · free" },
  ];

  return (
    <div className="fx-slip" tabIndex={-1} data-slip>
      <div className="fx-slip__head">
        <span className="fx-mono">Fit-out slip</span>
        <span className="fx-mono">{reference}</span>
      </div>
      <h3 className="fx-slip__title">You&apos;re on the schedule.</h3>
      <p className="fx-slip__lead">We&apos;ll email {brief.email.trim()} within one working day with two walk-through times.</p>
      <dl className="fx-slip__rows">
        {rows.map((row, index) => (
          <div key={`${row.k}-${index}`} className="fx-slip__row" style={{ "--i": index } as CSSProperties}>
            <dt>{row.k}</dt>
            <dd>{row.v}</dd>
          </div>
        ))}
      </dl>
      <span className="fx-slip__stamp" aria-hidden="true">Booked</span>
      <button type="button" className="fx-link-button" onClick={onEdit}>Edit the brief</button>
    </div>
  );
}
