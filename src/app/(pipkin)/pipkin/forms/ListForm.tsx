"use client";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { FLAVORS } from "../data/shop";
import { toneVar } from "../brand/Jar";
import { Arrow, Check } from "../brand/Marks";
import { Magnetic } from "../motion/Magnetic";
import { isValid, validateList, type ListErrors, type ListValues } from "./validation";

/** The Friday list. Floating labels, shake-on-invalid, a loading button, and a success ticket that replaces the form. No network. */
export function ListForm() {
  const [values, setValues] = useState<ListValues>({ name: "", email: "", leaning: "" });
  const [errors, setErrors] = useState<ListErrors>({});
  const [shake, setShake] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const set = (k: keyof ListValues, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    const next = validateList(values);
    setErrors(next);
    if (!isValid(next)) {
      setShake((n) => n + 1);
      const first = (["name", "email", "leaning"] as const).find((k) => next[k]);
      document.getElementById(`pk-list-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("done"), 1000);
  };

  const pick = FLAVORS.find((f) => f.id === values.leaning);

  return (
    <section id="list" className="pk-sec pk-sec--mint" aria-labelledby="list-title">
      <div className="pk-wrap pk-list" data-status={status}>
        <div className="pk-list-copy">
          <p className="pk-eyebrow">The Friday list</p>
          <h2 id="list-title" className="pk-h2">One email, <span className="pk-hl">every Friday.</span></h2>
          <p className="pk-lede">The next flavour, the next cook day and one tiny recipe. No discount popups, no daily nudges, unsubscribe in one tap.</p>
        </div>

        <div className="pk-list-card">
          <form className="pk-form" noValidate onSubmit={submit} data-shake={shake % 2} aria-hidden={status === "done"} inert={status === "done"}>
            <div className="pk-field" data-error={errors.name ? "true" : "false"}>
              <input id="pk-list-name" name="name" type="text" autoComplete="given-name" placeholder=" " value={values.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "pk-list-name-err" : undefined} />
              <label htmlFor="pk-list-name">First name</label>
              <p className="pk-err" id="pk-list-name-err" role={errors.name ? "alert" : undefined}>{errors.name}</p>
            </div>
            <div className="pk-field" data-error={errors.email ? "true" : "false"}>
              <input id="pk-list-email" name="email" type="email" autoComplete="email" placeholder=" " value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "pk-list-email-err" : undefined} />
              <label htmlFor="pk-list-email">Email</label>
              <p className="pk-err" id="pk-list-email-err" role={errors.email ? "alert" : undefined}>{errors.email}</p>
            </div>
            <fieldset className="pk-lean" data-error={errors.leaning ? "true" : "false"}>
              <legend className="pk-label">Which jar do you lean towards?</legend>
              <div className="pk-lean-grid">
                {FLAVORS.map((f, i) => (
                  <label key={f.id} className="pk-lean-opt" style={{ "--tone": toneVar(f.tone) } as CSSProperties}>
                    <input id={i === 0 ? "pk-list-leaning" : undefined} type="radio" name="leaning" value={f.id} checked={values.leaning === f.id} onChange={() => set("leaning", f.id)} />
                    <span>{f.name.split(" ")[0]}</span>
                  </label>
                ))}
              </div>
              <p className="pk-err" role={errors.leaning ? "alert" : undefined}>{errors.leaning}</p>
            </fieldset>
            <Magnetic className="pk-block">
              <button type="submit" className="pk-btn pk-btn-primary pk-btn-wide" data-loading={status === "loading" ? "true" : "false"} disabled={status === "loading"}>
                <span className="pk-btn-label">{status === "loading" ? "Adding you" : "Join the list"}</span>
                {status === "loading" ? <span className="pk-spinner" aria-hidden="true" /> : <Arrow className="pk-btn-arrow" />}
              </button>
            </Magnetic>
          </form>

          <div className="pk-done" role="status" aria-hidden={status !== "done"}>
            {status === "done" ? (
              <div className="pk-done-inner">
                <span className="pk-ticket-check"><Check /></span>
                <p className="pk-eyebrow">You&rsquo;re on the list</p>
                <h3 className="pk-h3">Thanks, {values.name.trim()}.</h3>
                <p>Friday&rsquo;s email will lead with {pick ? pick.name : "something fruity"}. Check {values.email.trim()} for a welcome note, and look for the jar on the shelf.</p>
                <a href="#shelf" className="pk-btn pk-btn-ghost pk-btn-sm"><span className="pk-btn-label">Back to the shelf</span></a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
