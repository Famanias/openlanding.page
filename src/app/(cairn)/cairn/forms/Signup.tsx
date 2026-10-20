"use client";

import { useRef, useState, type FormEvent } from "react";
import { validateEmail } from "./validate-email";

/** Expedition-list signup. Validates in the browser and shows a success state; it never sends anything. */
export function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const problem = validateEmail(email);
    setError(problem);
    if (problem) {
      inputRef.current?.focus();
      return;
    }
    setJoined(true);
  };

  if (joined) {
    return (
      <div className="crn-signup crn-signup--done" role="status">
        <p className="crn-h3">You&apos;re on the list.</p>
        <p className="crn-muted">We write before each expedition, and when something new survives the mountain.</p>
      </div>
    );
  }

  return (
    <form className="crn-signup" onSubmit={onSubmit} noValidate>
      <label htmlFor="signup-email" className="crn-label">
        Email
      </label>
      <div className="crn-signup__row">
        <input
          ref={inputRef}
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@basecamp.com"
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "signup-error" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
        />
        <button type="submit" className="crn-btn">
          Join the expedition list
        </button>
      </div>
      {error ? (
        <p id="signup-error" className="crn-signup__error crn-label">
          {error}
        </p>
      ) : null}
    </form>
  );
}
