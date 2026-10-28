"use client";
import { useEffect, useState } from "react";
import { Hanko } from "../brand/Hanko";
import { validateCommission } from "./validation";

export function CommissionForm({
  canopy,
  onSuccess,
}: {
  canopy: string;
  onSuccess: () => void;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [fields, setFields] = useState({ name: "", email: "", occasion: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <div className="am-success" role="status">
        <Hanko />
        <span className="am-kicker">雨音 / received</span>
        <h3>Your umbrella is on the bench.</h3>
        <p>
          We saved your {canopy} canopy request. Amaoto will write within one
          working day.
        </p>
      </div>
    );
  return (
    <form
      className="am-form"
      onSubmit={(event) => {
        event.preventDefault();
        const next = validateCommission(fields);
        setErrors(next);
        if (!Object.keys(next).length) {
          setSent(true);
          onSuccess();
        }
      }}
      noValidate
    >
      <label>
        <span>Name</span>
        <input
          id="am-name"
          name="name"
          autoComplete="name"
          placeholder=" "
          maxLength={160}
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "am-name-error" : undefined}
        />
        {errors.name && <small id="am-name-error">{errors.name}</small>}
      </label>
      <label>
        <span>Email</span>
        <input
          id="am-email"
          name="email"
          autoComplete="email"
          placeholder=" "
          maxLength={254}
          type="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "am-email-error" : undefined}
        />
        {errors.email && <small id="am-email-error">{errors.email}</small>}
      </label>
      <label>
        <span>Occasion</span>
        <input
          id="am-occasion"
          name="occasion"
          placeholder=" "
          maxLength={160}
          value={fields.occasion}
          onChange={(e) => setFields({ ...fields, occasion: e.target.value })}
          aria-invalid={Boolean(errors.occasion)}
          aria-describedby={errors.occasion ? "am-occasion-error" : undefined}
        />
        {errors.occasion && (
          <small id="am-occasion-error">{errors.occasion}</small>
        )}
      </label>
      <noscript>
        <p>Enable JavaScript to preview your commission request.</p>
      </noscript>
      <button
        type="submit"
        disabled={!ready}
        className="am-button am-button--red"
      >
        Reserve a commission <span>↗</span>
      </button>
    </form>
  );
}
