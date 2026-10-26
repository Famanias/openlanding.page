"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PARTS, partById } from "../content/parts";
import { companyById } from "../content/companies";
import { useSheet } from "../dock/useSheet";
import { callSheetRef, firstCallTime, isValid, validateAudition, type Audition, type AuditionErrors } from "./audition";

type Status = "idle" | "sending" | "done";

/**
 * Start: book a first call time. Validates on the client, morphs the key into a loading state,
 * then swaps the form for a call sheet that slides up and stamps. No network request is made.
 */
export function AuditionSheet({ open, onClose, part }: { open: boolean; onClose: () => void; part?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<Audition>({ name: "", email: "", part: part ?? "" });
  const [errors, setErrors] = useState<AuditionErrors>({});
  const [shake, setShake] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<{ ref: string; day: string; part: string; company: string } | null>(null);
  useSheet(open, ref, onClose, nameRef);

  // opened from a part card: a fresh form with that part chosen, even after an earlier booking
  useEffect(() => {
    if (!open || !part) return;
    setValues((v) => ({ ...v, part }));
    setStatus((s) => (s === "done" ? "idle" : s));
    setResult((r) => (r ? null : r));
  }, [open, part]);

  const set = (key: keyof Audition) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => { const next = { ...er }; delete next[key]; return next; });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    const found = validateAudition(values);
    setErrors(found);
    if (!isValid(found)) {
      setShake((n) => n + 1);
      const first = (["name", "email", "part"] as const).find((k) => found[k]);
      ref.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const chosen = partById(values.part)!;
    window.setTimeout(() => {
      setResult({ ref: callSheetRef(values), day: firstCallTime(new Date()).day, part: chosen.title, company: companyById(chosen.company).name });
      setStatus("done");
    }, 950);
  };

  const reset = () => {
    setValues({ name: "", email: "", part: "" });
    setResult(null);
    setStatus("idle");
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  const field = (key: "name" | "email", label: string, type: string, auto: string) => (
    <div className="us-field" data-invalid={Boolean(errors[key])} data-shake={errors[key] ? shake % 2 : undefined}>
      <input ref={key === "name" ? nameRef : undefined} id={`us-a-${key}`} name={key} type={type} autoComplete={auto} placeholder=" "
        value={values[key]} onChange={set(key)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `us-a-${key}-e` : undefined} />
      <label htmlFor={`us-a-${key}`}>{label}</label>
      <p className="us-field__e" id={`us-a-${key}-e`} role={errors[key] ? "alert" : undefined}>{errors[key]}</p>
    </div>
  );

  return (
    <div ref={ref} id="us-start-sheet" className="us-sheet us-sheet--start" role="dialog" aria-modal="true" aria-labelledby="us-start-t" data-open={open} data-status={status} inert={!open}>
      <div className="us-sheet__head">
        <p className="us-mono">Start · free for a week</p>
        <p id="us-start-t" className="us-sheet__t">Book your first call time.</p>
        <button type="button" className="us-x" onClick={onClose}><span className="us-sr">Close</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
      </div>
      <div className="us-swap">
        <form className="us-form" noValidate onSubmit={submit} aria-hidden={status === "done"} inert={status === "done"}>
          {field("name", "Your name", "text", "name")}
          {field("email", "Email", "email", "email")}
          <div className="us-field us-field--select" data-invalid={Boolean(errors.part)} data-shake={errors.part ? shake % 2 : undefined}>
            <select id="us-a-part" name="part" value={values.part} onChange={set("part")} aria-invalid={Boolean(errors.part)} aria-describedby={errors.part ? "us-a-part-e" : undefined}>
              <option value="">Choose a part…</option>
              {PARTS.map((p) => <option key={p.id} value={p.id}>{p.title} · {p.weeks} weeks</option>)}
            </select>
            <label htmlFor="us-a-part">The part</label>
            <p className="us-field__e" id="us-a-part-e" role={errors.part ? "alert" : undefined}>{errors.part}</p>
          </div>
          <button className="us-btn us-btn--ink us-form__go" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
            <span className="us-btn__label us-roll" data-text="Book my call time"><span>Book my call time</span></span>
            <span className="us-btn__dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="us-sr" aria-live="polite">{status === "sending" ? "Booking your call time" : ""}</span>
          </button>
          <p className="us-form__fine">A template: nothing is sent anywhere.</p>
        </form>
        <div className="us-ticket" aria-hidden={status !== "done"} inert={status !== "done"}>
          {result && (
            <>
              <p className="us-mono us-ticket__k">Call sheet · {result.ref}</p>
              <p className="us-ticket__t" role="status">You&rsquo;re on the call sheet, {values.name.trim().split(" ")[0]}.</p>
              <dl className="us-ticket__dl">
                <div><dt>Part</dt><dd>{result.part}</dd></div>
                <div><dt>Company</dt><dd>{result.company}</dd></div>
                <div><dt>First call</dt><dd>{result.day}, 09:00</dd></div>
              </dl>
              <span className="us-ticket__stamp" aria-hidden="true">Cast</span>
              <button type="button" className="us-link" onClick={reset}>Book another part</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
