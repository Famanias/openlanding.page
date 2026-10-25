"use client";

import { FormEvent, useState } from "react";
import { validateSubscribe, type SubscribeErrors } from "./validate-subscribe";

export function Subscribe() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<SubscribeErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (field: "name" | "email", value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateSubscribe(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0] as "name" | "email";
      document.getElementById(`serein-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 420);
  };

  if (status === "success") {
    return (
      <div className="sr-success" role="status" aria-live="polite">
        <span className="sr-success__seal" aria-hidden="true">SR</span>
        <div><span className="sr-success__code">Dispatched / SR-07</span><h3>Weather, on its way.</h3><p>Thanks, {values.name.trim() || "observer"}. The next report will arrive with the next new moon.</p></div>
        <button className="sr-text-link sr-text-link--button" type="button" onClick={() => { setStatus("idle"); setValues({ name: "", email: "" }); }}>File another name</button>
      </div>
    );
  }

  return (
    <form className="sr-subscribe" onSubmit={submit} noValidate>
      <div className="sr-subscribe__fields">
        <label className="sr-field"><span>Name</span><input id="serein-name" name="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "serein-name-error" : undefined} autoComplete="name" aria-required="true" />{errors.name && <small id="serein-name-error">{errors.name}</small>}</label>
        <label className="sr-field"><span>Email</span><input id="serein-email" type="email" name="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "serein-email-error" : undefined} autoComplete="email" aria-required="true" />{errors.email && <small id="serein-email-error">{errors.email}</small>}</label>
      </div>
      <div className="sr-subscribe__submit"><p>One report / new moon<br /><span>No tracking. No noise.</span></p><button className="sr-button sr-button--paper" type="submit" disabled={status === "loading"} aria-busy={status === "loading"}>{status === "loading" ? "Filing..." : "Join the dispatch"}</button></div>
    </form>
  );
}
