"use client";

import { useRef, useState, type FormEvent } from "react";
import { validateSubscribe, type SubscribeErrors } from "./validate-subscribe";

/** Mailing-list signup. Validates in the browser and shows a success state; it never sends anything. */
export function Subscribe() {
  const [email, setEmail] = useState("");
  const [side, setSide] = useState("a");
  const [errors, setErrors] = useState<SubscribeErrors>({});
  const [done, setDone] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateSubscribe({ email, side });
    setErrors(found);
    if (found.email) {
      emailRef.current?.focus();
      return;
    }
    if (found.side) return;
    setDone(side === "a" ? "Issue 08 will arrive stitched, with an email to say it's on its way." : "Issue 08 will arrive by email.");
  };

  if (done) {
    return (
      <div className="wf-form wf-form--done" role="status">
        <p className="wf-h3">You&apos;re on the list.</p>
        <p className="wf-text">{done}</p>
      </div>
    );
  }

  return (
    <form className="wf-form" onSubmit={onSubmit} noValidate>
      <div className="wf-field">
        <label htmlFor="wf-email" className="wf-label">
          Email
        </label>
        <input
          ref={emailRef}
          id="wf-email"
          type="email"
          autoComplete="email"
          placeholder="you@yourroom.com"
          value={email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "wf-email-error" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
        />
        {errors.email ? (
          <p id="wf-email-error" className="wf-error wf-label">
            {errors.email}
          </p>
        ) : null}
      </div>

      <fieldset className="wf-sides" aria-describedby={errors.side ? "wf-side-error" : undefined}>
        <legend className="wf-label">How should it reach you?</legend>
        <label className="wf-side">
          <input type="radio" name="side" value="a" checked={side === "a"} onChange={() => setSide("a")} />
          <span>
            <b>Side A</b> The zine, in the post
          </span>
        </label>
        <label className="wf-side">
          <input type="radio" name="side" value="b" checked={side === "b"} onChange={() => setSide("b")} />
          <span>
            <b>Side B</b> Email only
          </span>
        </label>
        {errors.side ? (
          <p id="wf-side-error" className="wf-error wf-label">
            {errors.side}
          </p>
        ) : null}
      </fieldset>

      <button type="submit" className="wf-btn wf-btn--riso">
        Get the next issue
      </button>
    </form>
  );
}
