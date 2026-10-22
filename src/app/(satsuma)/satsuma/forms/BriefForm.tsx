"use client";

import { useEffect, useId, useRef, useState } from "react";
import { formatUsd, packById, PACKS } from "../content/packs";
import { CATEGORIES } from "../content/steps";
import { SegmentRing } from "../sections/SegmentRing";
import { briefReference, isValid, NOTE_MAX, validateBrief, type BriefErrors, type BriefField, type BriefInput } from "./brief";

const ORDER: BriefField[] = ["brand", "email", "category", "pack", "note"];
const INITIAL: BriefInput = { brand: "", email: "", category: "", pack: "half", note: "" };

type Phase = "idle" | "loading" | "success";

/**
 * "Make a Reel": validates on the client, morphs the button to a loading state, then swaps the form for a
 * confirmation whose satsuma fills wedge by wedge. Nothing is sent anywhere. Pack buttons and "Brief {maker}"
 * links elsewhere on the page pre-fill it through data-pack / data-maker.
 */
export function BriefForm() {
  const uid = useId();
  const [values, setValues] = useState<BriefInput>(INITIAL);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shake, setShake] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const set = (field: BriefField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateBrief(next));
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-pack], [data-maker]");
      if (!el) return;
      setPhase((p) => (p === "success" ? "idle" : p));
      setValues((v) => {
        const next = { ...v };
        if (el.dataset.pack && packById(el.dataset.pack)) next.pack = el.dataset.pack;
        if (el.dataset.maker && !v.note.trim()) next.note = `I'd love ${el.dataset.maker} for this one.`;
        return next;
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (phase === "success") doneRef.current?.focus();
  }, [phase]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "loading") return;
    setSubmitted(true);
    const errs = validateBrief(values);
    setErrors(errs);
    if (!isValid(errs)) {
      setShake((n) => n + 1);
      const first = ORDER.find((f) => errs[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase("loading");
    const live = document.documentElement.dataset.saMotion === "live";
    window.setTimeout(() => setPhase("success"), live ? 1200 : 200);
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    setPhase("idle");
  };

  const pack = packById(values.pack);
  const err = (f: BriefField) => (errors[f] ? `${uid}-${f}-err` : undefined);

  return (
    <div className="sa-brief__card" data-phase={phase}>
      <form ref={formRef} className="sa-form" noValidate onSubmit={onSubmit} data-shake={shake % 2} aria-hidden={phase === "success"} inert={phase === "success"}>
        <div className="sa-field" data-invalid={!!errors.brand} data-filled={values.brand ? "true" : "false"}>
          <input id={`${uid}-brand`} name="brand" className="sa-input" placeholder=" " autoComplete="organization" value={values.brand} aria-invalid={!!errors.brand} aria-describedby={err("brand")} onChange={(e) => set("brand", e.target.value)} />
          <label htmlFor={`${uid}-brand`}>Brand name</label>
          {errors.brand && (
            <p id={err("brand")} className="sa-field__error" role="alert">
              {errors.brand}
            </p>
          )}
        </div>

        <div className="sa-field" data-invalid={!!errors.email} data-filled={values.email ? "true" : "false"}>
          <input id={`${uid}-email`} name="email" type="email" className="sa-input" placeholder=" " autoComplete="email" value={values.email} aria-invalid={!!errors.email} aria-describedby={err("email")} onChange={(e) => set("email", e.target.value)} />
          <label htmlFor={`${uid}-email`}>Work email</label>
          {errors.email && (
            <p id={err("email")} className="sa-field__error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sa-field sa-field--select" data-invalid={!!errors.category} data-filled={values.category ? "true" : "false"}>
          <select id={`${uid}-category`} name="category" className="sa-input" value={values.category} aria-invalid={!!errors.category} aria-describedby={err("category")} onChange={(e) => set("category", e.target.value)}>
            <option value="" disabled />
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label htmlFor={`${uid}-category`}>What do you sell?</label>
          {errors.category && (
            <p id={err("category")} className="sa-field__error" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        <fieldset className="sa-packpick" aria-describedby={err("pack")}>
          <legend>Pack</legend>
          <div className="sa-packpick__row">
            {PACKS.map((p) => (
              <label key={p.id} className="sa-packpick__opt">
                <input type="radio" name="pack" value={p.id} checked={values.pack === p.id} onChange={() => set("pack", p.id)} />
                <span className="sa-packpick__face">
                  <span className="sa-packpick__name">{p.name}</span>
                  <span className="sa-packpick__meta">
                    {p.segments} reels · {formatUsd(p.price)}
                  </span>
                </span>
              </label>
            ))}
          </div>
          {errors.pack && (
            <p id={err("pack")} className="sa-field__error" role="alert">
              {errors.pack}
            </p>
          )}
        </fieldset>

        <div className="sa-field sa-field--area" data-invalid={!!errors.note} data-filled={values.note ? "true" : "false"}>
          <textarea id={`${uid}-note`} name="note" className="sa-input" placeholder=" " rows={3} value={values.note} aria-invalid={!!errors.note} aria-describedby={err("note")} onChange={(e) => set("note", e.target.value)} />
          <label htmlFor={`${uid}-note`}>Anything we should know? (optional)</label>
          <span className="sa-field__count" aria-hidden="true">
            {values.note.length}/{NOTE_MAX}
          </span>
          {errors.note && (
            <p id={err("note")} className="sa-field__error" role="alert">
              {errors.note}
            </p>
          )}
        </div>

        <button type="submit" className="sa-btn sa-btn--sat sa-form__submit" data-loading={phase === "loading"} disabled={phase === "loading"}>
          <span className="sa-form__submit-label">Make a Reel</span>
          <span className="sa-form__submit-busy" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="sa-sr" aria-live="polite">
            {phase === "loading" ? "Sending your brief" : ""}
          </span>
        </button>
        <p className="sa-form__fine">Free to brief. You only pay when you pick a maker.</p>
      </form>

      <div ref={doneRef} className="sa-done" tabIndex={-1} aria-hidden={phase !== "success"} inert={phase !== "success"}>
        <SegmentRing count={pack?.segments ?? 12} className="sa-done__ring" />
        <p className="sa-done__ref">{briefReference(values)}</p>
        <h3 className="sa-done__title">Brief received.</h3>
        <p className="sa-done__body">
          {values.brand.trim() || "Your brand"}, your {pack?.name ?? "Half"} pack ({pack?.segments ?? 12} reels) is in the queue. A maker will be in touch at {values.email.trim() || "your email"} within a day.
        </p>
        <button type="button" className="sa-btn sa-btn--paper" onClick={reset}>
          Send another brief
        </button>
      </div>
    </div>
  );
}
