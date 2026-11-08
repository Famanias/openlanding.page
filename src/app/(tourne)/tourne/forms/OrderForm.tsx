"use client";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useVessel } from "../vessel/VesselProvider";
import { formById } from "../vessel/forms";
import { glazeById } from "../vessel/glazes";
import { specOf } from "../vessel/profile";
import { VesselSvg } from "../vessel/VesselSvg";
import { orderReference, quoteOrder, validateOrder, type OrderErrors, type OrderFields } from "./order";

type Status = "idle" | "loading" | "success";

const EMPTY: OrderFields = { name: "", email: "", postcode: "", note: "" };
const FIELD_ORDER: (keyof OrderFields)[] = ["name", "email", "postcode", "note"];
const FAKE_LATENCY_MS = 900;
const CUSTOM_PRICE_USD = 240;

const LABELS: Record<keyof OrderFields, string> = {
  name: "Your name",
  email: "Email",
  postcode: "Postcode",
  note: "A note for the potters (optional)",
};

/** Validates on the client and shows success without a network request: this is a template. */
export function OrderForm() {
  const { state } = useVessel();
  const formId = useId();
  const [fields, setFields] = useState<OrderFields>(EMPTY);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (attempt === 0) return;
    const firstInvalid = FIELD_ORDER.find((key) => errors[key]);
    if (firstInvalid) document.getElementById(`${formId}-${firstInvalid}`)?.focus();
    // Focus only when a new submit attempt fails, not on every keystroke that edits `errors`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  const form = state.formId ? formById(state.formId) : undefined;
  const spec = specOf(state.params);
  const glaze = glazeById(state.glazeId);
  const price = form?.priceUsd ?? CUSTOM_PRICE_USD;
  const quote = quoteOrder(price, spec.heightCm, spec.volumeMl);
  const reference = orderReference([form?.id ?? "custom", spec.heightCm, spec.widthCm, glaze.id]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (status !== "idle") return;
    const found = validateOrder(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setAttempt((n) => n + 1);
      return;
    }
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("success"), FAKE_LATENCY_MS);
  };

  const restart = () => {
    setFields(EMPTY);
    setErrors({});
    setStatus("idle");
  };

  return (
    <div className="tn-order-grid">
      <aside className="tn-order-summary" aria-label="Your vessel">
        <div className="tn-order-art">
          <VesselSvg params={state.params} glazeId={state.glazeId} label={`Your ${glaze.name} vessel`} />
        </div>
        <dl className="tn-order-lines">
          <div>
            <dt>Form</dt>
            <dd>{form?.name ?? "Your own form"}</dd>
          </div>
          <div>
            <dt>Glaze</dt>
            <dd>
              {glaze.name} <span className="tn-mono">{glaze.firing}</span>
            </dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd>
              {spec.heightCm} × {spec.widthCm} cm, holds {spec.volumeMl.toLocaleString("en-US")} ml
            </dd>
          </div>
          <div>
            <dt>Vessel</dt>
            <dd>${price}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>${quote.shippingUsd}</dd>
          </div>
          <div className="tn-order-total">
            <dt>Total</dt>
            <dd className="tn-display">${quote.totalUsd}</dd>
          </div>
        </dl>
        <p className="tn-mono tn-order-weeks">Ready in {quote.weeks} weeks</p>
      </aside>

      <div className="tn-order-form" data-state={status}>
        <form onSubmit={onSubmit} noValidate aria-hidden={status === "success"} inert={status === "success"}>
          <h3 className="tn-display tn-h3">Reserve a slot on the wheel</h3>
          {FIELD_ORDER.map((key) => {
            const id = `${formId}-${key}`;
            const error = errors[key];
            const Control = key === "note" ? "textarea" : "input";
            return (
              <div key={`${key}-${attempt}`} className="tn-field" data-invalid={Boolean(error)}>
                <Control
                  id={id}
                  name={key}
                  value={fields[key]}
                  placeholder=" "
                  rows={key === "note" ? 3 : undefined}
                  type={key === "email" ? "email" : key === "note" ? undefined : "text"}
                  autoComplete={key === "name" ? "name" : key === "email" ? "email" : key === "postcode" ? "postal-code" : "off"}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : undefined}
                  disabled={status === "loading"}
                  onChange={(event) => setFields((current) => ({ ...current, [key]: event.target.value }))}
                />
                <label htmlFor={id}>{LABELS[key]}</label>
                <div className="tn-field-error" data-open={Boolean(error)}>
                  <p id={`${id}-error`} role={error ? "alert" : undefined}>
                    {error}
                  </p>
                </div>
              </div>
            );
          })}
          <button type="submit" className="tn-btn tn-btn-clay tn-submit" disabled={status === "loading"} data-loading={status === "loading"}>
            <span className="tn-btn-label" data-label="Reserve this vessel">
              {status === "loading" ? "Holding your slot" : "Reserve this vessel"}
            </span>
            <span className="tn-spinner" aria-hidden="true" />
          </button>
          <p className="tn-fineprint">No payment is taken. This is a template: nothing is sent anywhere.</p>
        </form>

        <div className="tn-success" role="status" aria-hidden={status !== "success"} inert={status !== "success"}>
          <svg className="tn-stamp" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="tn-stamp-ring" cx="60" cy="60" r="52" pathLength="1" />
            <path className="tn-stamp-check" d="M36 62l16 16 32-36" pathLength="1" />
          </svg>
          {status === "success" ? (
            <>
              <h3 className="tn-display tn-h3">Your slot is held, {fields.name.split(" ")[0]}.</h3>
              <p>
                Reference <span className="tn-mono tn-ref">{reference}</span>. Hana or Teo will email {fields.email} to confirm the profile before throwing. Ready in {quote.weeks} weeks.
              </p>
              <button type="button" className="tn-btn tn-btn-ghost tn-btn-small" onClick={restart}>
                <span className="tn-btn-label" data-label="Reserve another">
                  Reserve another
                </span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
