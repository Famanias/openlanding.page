"use client";

import React, { useEffect, useRef, useState } from "react";
import { CounterStamp, ScissorsIcon } from "../brand/Logo";
import { ARCHETYPES, PLANS } from "../content/data";
import type { ArchetypeId, PlanId } from "../counter/ticket";
import {
  buildTrialPass,
  type CounterFormErrors,
  type CounterFormInput,
  type TrialPass,
  validateCounterForm,
} from "./validate";

export function CounterForm() {
  const [form, setForm] = useState<CounterFormInput>({
    shopName: "",
    email: "",
    archetype: "tailor",
    plan: "workshop",
    depositPct: 50,
    serviceNote: "",
  });

  const [errors, setErrors] = useState<CounterFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [trialPass, setTrialPass] = useState<TrialPass | null>(null);
  const [copied, setCopied] = useState(false);

  const shopNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const serviceNoteRef = useRef<HTMLTextAreaElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  // Sync from URL query params or custom events from the Counter / Pricing sections
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qArch = params.get("archetype") as ArchetypeId | null;
      const qPlan = params.get("plan") as PlanId | null;
      if (qArch && ARCHETYPES.some((a) => a.id === qArch)) {
        setForm((prev) => ({ ...prev, archetype: qArch }));
      }
      if (qPlan && PLANS.some((p) => p.id === qPlan)) {
        setForm((prev) => ({ ...prev, plan: qPlan }));
      }
    } catch {}

    const onSelectConfig = (e: Event) => {
      const detail = (
        e as CustomEvent<{
          archetype?: ArchetypeId;
          plan?: PlanId;
          depositPct?: number;
        }>
      ).detail;
      if (!detail) return;
      setForm((prev) => ({
        ...prev,
        archetype: detail.archetype ?? prev.archetype,
        plan: detail.plan ?? prev.plan,
        depositPct: detail.depositPct ?? prev.depositPct,
      }));
    };

    window.addEventListener("tally:select-config", onSelectConfig);
    return () => window.removeEventListener("tally:select-config", onSelectConfig);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCounterForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      if (validation.errors.shopName) {
        shopNameRef.current?.focus();
      } else if (validation.errors.email) {
        emailRef.current?.focus();
      } else if (validation.errors.serviceNote) {
        serviceNoteRef.current?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitting(true);
    window.setTimeout(() => {
      const pass = buildTrialPass(form);
      setSubmitting(false);
      setTrialPass(pass);
      window.setTimeout(() => {
        successRef.current?.focus();
      }, 40);
    }, 320);
  };

  const handleCopyPass = async () => {
    if (!trialPass) return;
    try {
      await navigator.clipboard.writeText(trialPass.summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
    }
  };

  const handleReset = () => {
    setTrialPass(null);
    setCopied(false);
    setErrors({});
  };

  if (trialPass) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="tl-trial-pass-card"
        role="region"
        aria-label="Issued Merchant Trial Pass"
      >
        <div className="tl-pass-main">
          <div className="tl-pass-header">
            <span className="tl-mono tl-badge-pill" data-tone="mint">
              COUNTER TRIAL PASS ISSUED · LOCAL DEMO
            </span>
            <span className="tl-mono tl-pass-code">{trialPass.passCode}</span>
          </div>

          <h3 className="tl-pass-title">
            Your counter kit for <em>{trialPass.shopName}</em> is stamped and ready.
          </h3>
          <p className="tl-pass-disclaimer">
            This is a local interactive template demo—no network request was sent and nothing was stored on a server.
          </p>

          <dl className="tl-pass-details">
            <div className="tl-pass-row">
              <dt>Merchant Storefront</dt>
              <dd className="tl-mono">
                {trialPass.shopName} ({trialPass.email})
              </dd>
            </div>
            <div className="tl-pass-row">
              <dt>Counter Archetype</dt>
              <dd className="tl-mono">{trialPass.archetypeLabel}</dd>
            </div>
            <div className="tl-pass-row">
              <dt>Selected Ledger Tier</dt>
              <dd className="tl-mono">
                {trialPass.planLabel} · {trialPass.depositPct}% Checkout Deposit
              </dd>
            </div>
            <div className="tl-pass-row">
              <dt>Primary Bench Service</dt>
              <dd>{trialPass.serviceNote}</dd>
            </div>
          </dl>

          <div className="tl-pass-actions">
            <button
              type="button"
              className="tl-btn tl-btn-primary"
              onClick={handleCopyPass}
            >
              <span>{copied ? "Trial Pass Copied" : "Copy Trial Pass Brief"}</span>
            </button>
            <button
              type="button"
              className="tl-btn tl-btn-secondary"
              onClick={handleReset}
            >
              <span>Configure Another Counter</span>
            </button>
          </div>
        </div>

        <div className="tl-pass-stub">
          <CounterStamp
            label="TRIAL STAMPED"
            sublabel={trialPass.passCode}
            stamped={true}
          />
          <div className="tl-mono tl-pass-stub-code">{trialPass.passCode}</div>
          <div className="tl-mono tl-pass-stub-meta">14-DAY FREE BENCH TRIAL</div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="tl-counter-form"
      aria-label="Open your service counter"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="tl-form-top-bar">
        <span className="tl-mono">NEW MERCHANT COUNTER REQUISITION</span>
        <span className="tl-mono">14 DAYS FREE · 0% COMMISSION</span>
      </div>

      <div className="tl-form-grid">
        <div
          className="tl-field"
          data-invalid={errors.shopName ? "true" : "false"}
        >
          <label htmlFor="tl-shop-name" className="tl-label">
            Shopify store or workshop name
          </label>
          <input
            ref={shopNameRef}
            id="tl-shop-name"
            name="shopName"
            type="text"
            placeholder="e.g. Hem & Haw Atelier"
            value={form.shopName}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, shopName: e.target.value }));
              if (errors.shopName) setErrors((prev) => ({ ...prev, shopName: undefined }));
            }}
            aria-invalid={Boolean(errors.shopName)}
            aria-describedby={errors.shopName ? "tl-err-shop" : undefined}
            className="tl-input"
          />
          {errors.shopName && (
            <p id="tl-err-shop" className="tl-error" role="alert">
              {errors.shopName}
            </p>
          )}
        </div>

        <div
          className="tl-field"
          data-invalid={errors.email ? "true" : "false"}
        >
          <label htmlFor="tl-merchant-email" className="tl-label">
            Merchant email address
          </label>
          <input
            ref={emailRef}
            id="tl-merchant-email"
            name="email"
            type="email"
            placeholder="you@yourshop.co"
            value={form.email}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "tl-err-email" : undefined}
            className="tl-input"
          />
          {errors.email && (
            <p id="tl-err-email" className="tl-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="tl-field">
          <label htmlFor="tl-form-archetype" className="tl-label">
            Primary service archetype
          </label>
          <select
            id="tl-form-archetype"
            name="archetype"
            value={form.archetype}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                archetype: e.target.value as ArchetypeId,
              }))
            }
            className="tl-select"
          >
            {ARCHETYPES.map((arch) => (
              <option key={arch.id} value={arch.id}>
                {arch.name} ({arch.shopExample})
              </option>
            ))}
          </select>
        </div>

        <div className="tl-field">
          <label htmlFor="tl-form-plan" className="tl-label">
            Merchant ledger tier
          </label>
          <select
            id="tl-form-plan"
            name="plan"
            value={form.plan}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, plan: e.target.value as PlanId }))
            }
            className="tl-select"
          >
            {PLANS.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} — ${plan.price}/mo ({plan.badge})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="tl-field tl-field-full"
        data-invalid={errors.serviceNote ? "true" : "false"}
      >
        <label htmlFor="tl-service-note" className="tl-label">
          What service or bench workflow are you putting on Shopify?
        </label>
        <textarea
          ref={serviceNoteRef}
          id="tl-service-note"
          name="serviceNote"
          rows={3}
          placeholder="e.g. In-store denim chain-stitch hemming, mail-in watch servicing, or 6-seat wheel throwing classes..."
          value={form.serviceNote}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, serviceNote: e.target.value }));
            if (errors.serviceNote)
              setErrors((prev) => ({ ...prev, serviceNote: undefined }));
          }}
          aria-invalid={Boolean(errors.serviceNote)}
          aria-describedby={errors.serviceNote ? "tl-err-note" : undefined}
          className="tl-textarea"
        />
        {errors.serviceNote && (
          <p id="tl-err-note" className="tl-error" role="alert">
            {errors.serviceNote}
          </p>
        )}
      </div>

      <div className="tl-form-footer">
        <p className="tl-mono tl-form-footnote">
          DEFAULT CHECKOUT DEPOSIT: {form.depositPct}% · LOCAL DEMO ONLY (NO NETWORK REQUEST)
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="tl-btn tl-btn-primary tl-submit-btn"
        >
          <ScissorsIcon />
          <span>
            {submitting ? "Stamping your trial pass…" : "Stamp & Issue Trial Pass"}
          </span>
        </button>
      </div>
    </form>
  );
}
