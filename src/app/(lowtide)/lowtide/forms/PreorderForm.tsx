"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { PRODUCT } from "../content/story";
import { validatePreorder, type PreorderField } from "./preorder";

type Status = "idle" | "submitting" | "success";

export function PreorderForm({ onSuccess }: { onSuccess?: () => void }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<PreorderField, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = validatePreorder({
      email: String(data.get("email") ?? ""),
      size: String(data.get("size") ?? ""),
      finish: String(data.get("finish") ?? ""),
    });
    if (!result.ok) {
      setErrors(result.errors);
      const first = (["email", "size", "finish"] as const).find((f) => result.errors[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      onSuccess?.();
    }, 600);
  }

  if (status === "success") {
    return (
      <div className="lt-form lt-form--done" role="status">
        <p className="lt-form__sand">See you at low tide.</p>
        <p className="lt-form__note">We&apos;ll write once, when your ring ships. No newsletter.</p>
      </div>
    );
  }

  const err = (f: PreorderField) => (errors[f] ? `${id}-${f}-err` : undefined);

  return (
    <form ref={formRef} className="lt-form" data-state={status} onSubmit={submit} noValidate aria-labelledby={`${id}-title`}>
      <p id={`${id}-title`} className="lt-form__title">Pre-order the ring <span className="lt-mono">${PRODUCT.price} · ships in spring</span></p>
      <label className="lt-field lt-field--wide">
        <span className="lt-field__label">Email</span>
        <input className="lt-input" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={err("email")} />
        {errors.email && <span className="lt-field__error" id={err("email")}>{errors.email}</span>}
      </label>
      <label className="lt-field">
        <span className="lt-field__label">Ring size</span>
        <select className="lt-input" name="size" defaultValue="" aria-invalid={Boolean(errors.size)} aria-describedby={err("size")}>
          <option value="" disabled>Choose</option>
          {PRODUCT.sizes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.size && <span className="lt-field__error" id={err("size")}>{errors.size}</span>}
      </label>
      <fieldset className="lt-field lt-field--wide lt-finishes" aria-describedby={err("finish")}>
        <legend className="lt-field__label">Finish</legend>
        <div className="lt-finishes__row">
          {PRODUCT.finishes.map((f) => (
            <label key={f.id} className="lt-finish" data-finish={f.id}>
              <input type="radio" name="finish" value={f.id} />
              <span className="lt-finish__swatch" aria-hidden="true" />
              <span>{f.name}</span>
            </label>
          ))}
        </div>
        {errors.finish && <span className="lt-field__error" id={err("finish")}>{errors.finish}</span>}
      </fieldset>
      <button className="lt-btn" type="submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? "Reserving…" : "Reserve my ring"}</span>
      </button>
    </form>
  );
}
