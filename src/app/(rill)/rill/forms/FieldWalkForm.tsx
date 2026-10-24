"use client";

import { useState, type FormEvent } from "react";
import { validateFieldWalk, type FieldWalkErrors, type FieldWalkInput } from "./validation";

const initial: FieldWalkInput = { name: "", farm: "", email: "", acres: "", goal: "" };

export function FieldWalkForm() {
  const [values, setValues] = useState<FieldWalkInput>(initial);
  const [errors, setErrors] = useState<FieldWalkErrors>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const update = (field: keyof FieldWalkInput, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateFieldWalk(values);
    if (!result.ok) {
      setErrors(result.errors);
      setState("idle");
      return;
    }
    setErrors({});
    setState("loading");
    window.setTimeout(() => setState("success"), 650);
  };

  if (state === "success") {
    return <div className="rl-form__success" role="status" aria-live="polite"><span className="rl-form__success-mark" aria-hidden="true">✓</span><h3>The field is on the map.</h3><p>We’ll bring the contour notes and a clean way to read the next storm.</p><button className="rl-button rl-button--quiet" type="button" onClick={() => { setValues(initial); setState("idle"); }}><span>Send another note</span><span className="rl-button__arrow">↗</span></button></div>;
  }

  const describedBy = (field: keyof FieldWalkInput) => errors[field] ? `${field}-error` : undefined;
  return (
    <form className="rl-form" onSubmit={onSubmit} noValidate aria-describedby="rl-form-hint">
      <div className="rl-form__grid">
        <label className="rl-form__field"><span className="rl-label">Your name</span><input className="rl-input" name="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} autoComplete="name" />{errors.name ? <span id="name-error" className="rl-error">{errors.name}</span> : null}</label>
        <label className="rl-form__field"><span className="rl-label">Farm or field</span><input className="rl-input" name="farm" value={values.farm} onChange={(event) => update("farm", event.target.value)} aria-invalid={Boolean(errors.farm)} aria-describedby={describedBy("farm")} />{errors.farm ? <span id="farm-error" className="rl-error">{errors.farm}</span> : null}</label>
        <label className="rl-form__field"><span className="rl-label">Email</span><input className="rl-input" type="email" name="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} autoComplete="email" />{errors.email ? <span id="email-error" className="rl-error">{errors.email}</span> : null}</label>
        <label className="rl-form__field"><span className="rl-label">Acres</span><input className="rl-input" type="number" min="0.1" step="0.1" name="acres" value={values.acres} onChange={(event) => update("acres", event.target.value)} aria-invalid={Boolean(errors.acres)} aria-describedby={describedBy("acres")} inputMode="decimal" />{errors.acres ? <span id="acres-error" className="rl-error">{errors.acres}</span> : null}</label>
        <label className="rl-form__field rl-form__field--wide"><span className="rl-label">What should the field hold?</span><textarea className="rl-input" name="goal" value={values.goal} maxLength={600} onChange={(event) => update("goal", event.target.value)} aria-invalid={Boolean(errors.goal)} aria-describedby={describedBy("goal")} />{errors.goal ? <span id="goal-error" className="rl-error">{errors.goal}</span> : null}</label>
      </div>
      <div className="rl-form__foot"><p id="rl-form-hint" className="rl-form__hint">A first field walk is a 30-minute read of slope, soil and the next useful line.</p><button className="rl-button rl-button--primary rl-submit" type="submit" data-state={state}><span className="rl-button__label">{state === "loading" ? "Reading the field" : "Request a field walk"}</span><span className="rl-button__arrow">↗</span></button></div>
    </form>
  );
}

