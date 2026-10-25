"use client";

import React, { useState, useSyncExternalStore } from "react";
import { valenceStore } from "../capsule/store";
import { mintSqueezePassCode, validateSqueezeEmail } from "./validation";

export function SqueezeForm() {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );

  const [email, setEmail] = useState(snapshot.squeezeEmail || "");
  const [error, setError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateSqueezeEmail(email);
    if (validationError) {
      setError(validationError);
      setShakeKey((k) => k + 1);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    window.setTimeout(() => {
      const code = mintSqueezePassCode(email, snapshot.selectedCohortId);
      valenceStore.recordSqueezeSuccess(email, code);
      setIsSubmitting(false);
    }, 240);
  };

  if (snapshot.squeezePassCode) {
    return (
      <div
        className="rounded-[28px] border-2 border-[#1E1B2E] bg-[#FBF9F5] p-6 sm:p-8"
        role="status"
        aria-live="polite"
        data-testid="squeeze-success-panel"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#D9F2E6] px-4 py-1.5 vl-mono text-xs font-medium text-[#1E1B2E]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#5B46E8" }}
            />
            RING 02 UNSEALED · EXECUTIVE SYNTHESIS READY
          </span>
          <span className="rounded-full border border-[#1E1B2E]/20 bg-[#E8E0F8] px-4 py-1 vl-mono text-xs font-semibold text-[#1E1B2E]">
            PASS {snapshot.squeezePassCode}
          </span>
        </div>

        <h3 className="vl-display mt-4 text-2xl sm:text-3xl font-bold text-[#1E1B2E]">
          14-Page Executive Digest unlocked for {snapshot.squeezeEmail}.
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[#645D7A]">
          Local demo only — no network request was sent. Chapter 02 in the Gated Asset Preview below is now unblurred, and your email has been carried forward into Stage 03 if you want the full 68-page Monograph.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href="#preview" className="vl-btn vl-btn--primary">
            <span>Read Unlocked Chapter 02</span>
            <span className="vl-btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <button
            type="button"
            onClick={() => {
              valenceStore.recordSqueezeSuccess(snapshot.squeezeEmail, "");
            }}
            className="vl-btn vl-btn--secondary"
          >
            Edit Email Address
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3"
      aria-label="Squeeze Page 1-Field Email Capture"
    >
      <div
        key={shakeKey}
        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-[28px] sm:rounded-full border-2 border-[#1E1B2E] bg-[#FBF9F5] p-2 ${
          error ? "vl-shake" : ""
        }`}
      >
        <label htmlFor="vl-squeeze-email" className="sr-only">
          Work email address
        </label>
        <input
          id="vl-squeeze-email"
          name="squeezeEmail"
          type="email"
          autoComplete="email"
          placeholder="you@company.com — 1 field only"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "vl-squeeze-error" : "vl-squeeze-hint"}
          className="flex-1 rounded-full bg-transparent px-5 py-3.5 text-base text-[#1E1B2E] placeholder:text-[#645D7A] focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="vl-btn vl-btn--primary shrink-0 px-7 py-4"
        >
          <span>
            {isSubmitting ? "Unsealing Digest…" : "Unlock 14-Page Digest"}
          </span>
          <span className="vl-btn__arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>

      {error ? (
        <p
          id="vl-squeeze-error"
          role="alert"
          className="pl-4 text-sm font-medium text-[#D9385A]"
        >
          {error}
        </p>
      ) : (
        <p id="vl-squeeze-hint" className="pl-4 vl-mono text-[11px] text-[#645D7A]">
          INSTANT BROWSER UNLOCK · ZERO SPAM · NO NETWORK REQUEST SENT
        </p>
      )}
    </form>
  );
}
