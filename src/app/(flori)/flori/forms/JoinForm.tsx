"use client";
import { useEffect, useRef, useState } from "react";
import { FLOWERS } from "../content/flowers";
import { PRICES, SIZES, SIZE_LABELS, selectionFromSearch, type Feeling, type BunchSize } from "../bouquet/model";
import { validateJoin, type JoinErrors } from "./validation";
import { Flower } from "../brand/Flower";

export function JoinForm() {
  const [selection, setSelection] = useState<{ feeling: Feeling; size: BunchSize }>({ feeling: "daydream", size: "little" });
  const [errors, setErrors] = useState<JoinErrors>({});
  const [status, setStatus] = useState<"idle" | "preparing" | "success">("idle");
  const [name, setName] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const sync = () => { if (location.hash === "#join") setSelection(selectionFromSearch(location.search)); };
    sync(); window.addEventListener("hashchange", sync);
    return () => { window.removeEventListener("hashchange", sync); if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => { if (status === "success") success.current?.focus(); }, [status]);
  const submit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = { name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), ...selection };
    const problems = validateJoin(values);
    setErrors(problems);
    if (Object.keys(problems).length) { form.current?.querySelector<HTMLElement>(`[name="${Object.keys(problems)[0]}"]`)?.focus(); return; }
    setName(values.name.trim()); setStatus("preparing");
    timer.current = setTimeout(() => setStatus("success"), 850);
  };
  const feeling = FLOWERS.find((item) => item.id === selection.feeling)!;
  return <>
    <div className="fl-enhanced fl-form-panel" data-state={status}>
      {status === "success" ? <div className="fl-success" ref={success} tabIndex={-1} role="status"><Flower /><p className="fl-script">a lovely little beginning</p><h3>Hello, {name}.</h3><p>Your {feeling.name.toLowerCase()} bunch is looking lovely.</p><p>{SIZE_LABELS[selection.size]} · £{PRICES[selection.size]} per delivery</p><p className="fl-small">You’ve tried the Flori signup. This is a demo: your details haven’t been sent or saved, and no order has been placed.</p><button className="fl-button fl-button--outline" type="button" onClick={() => { setStatus("idle"); setName(""); requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>("input")?.focus()); }}>Try another little bunch <span aria-hidden="true">↗</span></button></div> : <form ref={form} onSubmit={submit} noValidate aria-label="Join the Flori flower club" aria-busy={status === "preparing"}>
        <div className="fl-form-heading"><Flower /><span>A little hello</span><span>01 / you</span></div>
        <div className="fl-fields">{[{ id: "name" as const, label: "Your first name", type: "text", autoComplete: "given-name", max: 80 }, { id: "email" as const, label: "Your email address", type: "email", autoComplete: "email", max: 254 }].map((field) => <div className="fl-field" key={field.id} data-invalid={Boolean(errors[field.id])}>
          <input id={`fl-${field.id}`} name={field.id} type={field.type} autoComplete={field.autoComplete} maxLength={field.max} required placeholder=" " aria-invalid={Boolean(errors[field.id])} aria-describedby={errors[field.id] ? `fl-${field.id}-error` : undefined} disabled={status === "preparing"} onChange={() => setErrors((current) => ({ ...current, [field.id]: undefined }))} />
          <label htmlFor={`fl-${field.id}`}>{field.label}</label>{errors[field.id] && <p id={`fl-${field.id}-error`} className="fl-field-error">{errors[field.id]}</p>}
        </div>)}</div>
        <div className="fl-form-choices"><label htmlFor="fl-join-feeling">Your flower feeling<select id="fl-join-feeling" name="feeling" value={selection.feeling} disabled={status === "preparing"} onChange={(event) => { const feeling = FLOWERS.find((item) => item.id === event.target.value); if (feeling) setSelection((current) => ({ ...current, feeling: feeling.id })); }}>{FLOWERS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label htmlFor="fl-join-size">Your bunch size<select id="fl-join-size" name="size" value={selection.size} disabled={status === "preparing"} onChange={(event) => { const size = SIZES.find((item) => item === event.target.value); if (size) setSelection((current) => ({ ...current, size })); }}>{SIZES.map((item) => <option key={item} value={item}>{SIZE_LABELS[item]} · £{PRICES[item]}</option>)}</select></label></div>
        <div className="fl-form-summary"><span>Something to look forward to</span><strong>£{PRICES[selection.size]} <small>/ fortnight</small></strong></div>
        <button className="fl-button" type="submit" disabled={status === "preparing"}>{status === "preparing" ? "Gathering your little hello…" : "Count me in"}<span aria-hidden="true">{status === "preparing" ? "✿" : "↗"}</span></button>
        <p className="fl-small fl-form-privacy">A demo signup for a fictional club. Nothing is sent or saved.</p>
        <span className="fl-status" role="status">{status === "preparing" ? "Preparing your bouquet preview." : ""}</span>
      </form>}
    </div>
    <div className="fl-nojs fl-form-fallback"><Flower /><h3>A little hello goes a long way.</h3><p>Daydream, Sunbeam, or Wild Thing — bunches from £24. This is a fictional club and demo template.</p><a className="fl-button" href="mailto:hello@flori.example">Say hello by email <span aria-hidden="true">↗</span></a></div>
  </>;
}
