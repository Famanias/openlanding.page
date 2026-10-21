"use client";

import { useState, useRef, type FormEvent } from "react";
import {
  validateWholesale,
  VOLUME_OPTIONS,
  type WholesaleFields,
  type WholesaleErrors,
} from "./validate-wholesale";

const EMPTY: WholesaleFields = {
  name: "",
  business: "",
  email: "",
  volume: "5-15",
  message: "",
};

export function WholesaleForm() {
  const [fields, setFields] = useState<WholesaleFields>(EMPTY);
  const [errors, setErrors] = useState<WholesaleErrors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateWholesale(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      if (found.name) nameRef.current?.focus();
      return;
    }
    setSubmitted(
      `Thanks, ${fields.name.trim()} — your wholesale enquiry for ${fields.business.trim()} is on the bench. We reply from the roastery within one business day, usually with a sample bag of the current lots.`,
    );
  };

  if (submitted) {
    return (
      <div role="status" className="sd-card sd-wholesale__done">
        <p className="sd-mono" style={{ color: "var(--color-roastgreen)", margin: "0 0 10px" }}>
          Enquiry received
        </p>
        <h3 className="sd-display" style={{ fontSize: "clamp(26px, 3vw, 38px)", margin: "0 0 12px" }}>
          We&apos;ll bring the samples.
        </h3>
        <p style={{ margin: "0 0 24px", maxWidth: "46ch" }}>{submitted}</p>
        <button
          type="button"
          className="sd-btn sd-btn--outline"
          onClick={() => {
            setSubmitted(null);
            setFields(EMPTY);
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="sd-form">
      <div className="sd-form__row">
        <div>
          <label htmlFor="ws-name" className="sd-label">
            Your name *
          </label>
          <input
            ref={nameRef}
            id="ws-name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, name: e.target.value }));
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "ws-name-error" : undefined}
            placeholder="Dana Okafor"
            className="sd-input"
          />
          {errors.name && (
            <p id="ws-name-error" className="sd-field-error">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="ws-business" className="sd-label">
            Business *
          </label>
          <input
            id="ws-business"
            type="text"
            autoComplete="organization"
            value={fields.business}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, business: e.target.value }));
              if (errors.business) setErrors((prev) => ({ ...prev, business: undefined }));
            }}
            aria-invalid={errors.business ? "true" : undefined}
            aria-describedby={errors.business ? "ws-business-error" : undefined}
            placeholder="Third Place Café"
            className="sd-input"
          />
          {errors.business && (
            <p id="ws-business-error" className="sd-field-error">
              {errors.business}
            </p>
          )}
        </div>
      </div>

      <div className="sd-form__row">
        <div>
          <label htmlFor="ws-email" className="sd-label">
            Email *
          </label>
          <input
            id="ws-email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, email: e.target.value }));
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "ws-email-error" : undefined}
            placeholder="dana@thirdplace.cafe"
            className="sd-input"
          />
          {errors.email && (
            <p id="ws-email-error" className="sd-field-error">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="ws-volume" className="sd-label">
            Weekly volume *
          </label>
          <select
            id="ws-volume"
            value={fields.volume}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, volume: e.target.value }));
              if (errors.volume) setErrors((prev) => ({ ...prev, volume: undefined }));
            }}
            aria-invalid={errors.volume ? "true" : undefined}
            aria-describedby={errors.volume ? "ws-volume-error" : undefined}
            className="sd-input"
          >
            {VOLUME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.volume && (
            <p id="ws-volume-error" className="sd-field-error">
              {errors.volume}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="ws-message" className="sd-label">
          What are you brewing? (optional)
        </label>
        <textarea
          id="ws-message"
          rows={4}
          value={fields.message}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, message: e.target.value }));
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "ws-message-error" : undefined}
          placeholder="Two filter options, espresso all day, beans for the retail shelf…"
          className="sd-input"
        />
        {errors.message && (
          <p id="ws-message-error" className="sd-field-error">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="sd-btn sd-btn--tangerine" style={{ width: "100%" }}>
        Send wholesale enquiry
      </button>
      <p className="sd-mono" style={{ color: "var(--color-husk)", textAlign: "center", margin: "4px 0 0" }}>
        41 Mill Street · No networks were harmed — this form never leaves the page
      </p>
    </form>
  );
}
