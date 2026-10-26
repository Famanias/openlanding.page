"use client";

import { FormEvent, useState } from "react";
import { validateBrief, type BriefInput, type BriefErrors } from "./validate";

const initial: BriefInput = { name: "", email: "", surface: "quartz" };

export function BriefForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const update = (key: keyof BriefInput, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validateBrief(values);
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("loading");
    window.setTimeout(() => setState("success"), 520);
  };

  if (state === "success") return <div className="lc-success" aria-live="polite"><span className="lc-success__stamp">BRIEF RECEIVED / 04</span><h3>Your bench is held.</h3><p className="lc-muted">We saved a local preview for {values.name}. The next step is a measured material conversation.</p><button type="button" className="lc-btn lc-btn--ghost" onClick={() => { setState("idle"); setValues(initial); }}>Start another brief</button></div>;

  return <form onSubmit={submit} noValidate>
    <div className="lc-field"><label htmlFor="lc-name">Name</label><input id="lc-name" name="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "lc-name-error" : undefined} />{errors.name && <small id="lc-name-error">{errors.name}</small>}</div>
    <div className="lc-field"><label htmlFor="lc-email">Work email</label><input id="lc-email" name="email" type="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "lc-email-error" : undefined} />{errors.email && <small id="lc-email-error">{errors.email}</small>}</div>
    <div className="lc-field"><label htmlFor="lc-surface">Starting surface</label><select id="lc-surface" name="surface" value={values.surface} onChange={(event) => update("surface", event.target.value)} aria-invalid={Boolean(errors.surface)}><option value="quartz">Quartz 01</option><option value="milk">Studio Milk</option><option value="blue-hour">Blue Hour</option><option value="edge">Edge Study</option></select>{errors.surface && <small>{errors.surface}</small>}</div>
    <div className="lc-form-actions"><span className="lc-form-status">Local demo · no request is sent</span><button className="lc-btn lc-btn--solid" type="submit" disabled={state === "loading"}>{state === "loading" ? "Holding…" : "Hold a bench"}</button></div>
  </form>;
}
