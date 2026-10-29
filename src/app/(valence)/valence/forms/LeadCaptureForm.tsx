"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { computeTailoredBenchmark } from "../capsule/logic";
import { valenceStore } from "../capsule/store";
import type { BuyerRoleId, CompanySizeBand } from "../content/funnelData";
import {
  type LeadCaptureErrors,
  mintDossierKey,
  validateLeadCaptureForm,
} from "./validation";

const COMPANY_SIZES: Array<{ value: CompanySizeBand; label: string }> = [
  { value: "1-25", label: "1–25 employees (Seed / Studio)" },
  { value: "26-200", label: "26–200 employees (Series A/B)" },
  { value: "201-1000", label: "201–1,000 employees (Mid-Market)" },
  { value: "1000+", label: "1,000+ employees (Enterprise)" },
];

const BUYER_ROLES: Array<{ value: BuyerRoleId; label: string }> = [
  { value: "vp-growth", label: "VP of Growth / CMO" },
  { value: "demand-gen", label: "Demand Generation Lead" },
  { value: "product-growth", label: "Product Growth / PLG Lead" },
  { value: "founder", label: "Founder / Executive" },
];

export function LeadCaptureForm() {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );

  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState(snapshot.squeezeEmail || "");
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState<LeadCaptureErrors>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (snapshot.squeezeEmail && !workEmail) {
      setWorkEmail(snapshot.squeezeEmail);
    }
  }, [snapshot.squeezeEmail, workEmail]);

  const tailored = computeTailoredBenchmark(snapshot.companySize, snapshot.role);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = {
      fullName,
      workEmail,
      companyName,
      companySize: snapshot.companySize,
      role: snapshot.role,
    };
    const nextErrors = validateLeadCaptureForm(input);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setShakeKey((k) => k + 1);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    window.setTimeout(() => {
      const key = mintDossierKey(input);
      valenceStore.recordLeadCaptureSuccess(
        workEmail,
        snapshot.companySize,
        snapshot.role,
        key,
      );
      setIsSubmitting(false);
    }, 280);
  };

  if (snapshot.dossierKey) {
    return (
      <div
        className="rounded-[32px] border-2 border-[#1E1B2E] bg-[#FBF9F5] p-7 sm:p-9"
        role="status"
        aria-live="polite"
        data-testid="lead-capture-success-panel"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FCE2D5] px-4 py-1.5 vl-mono text-xs font-semibold text-[#1E1B2E]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#5B46E8" }}
            />
            100% DOSSIER ACCESS
          </span>
          <span className="rounded-full bg-[#1E1B2E] px-4 py-1.5 vl-mono text-xs font-semibold text-[#FBF9F5]">
            KEY {snapshot.dossierKey}
          </span>
        </div>

        <h3 className="vl-display mt-5 text-3xl font-extrabold text-[#1E1B2E]">
          Full 68-Page Monograph &amp; Custom Audit unsealed for {fullName || snapshot.squeezeEmail}.
        </h3>
        <p className="mt-2 text-base text-[#645D7A]">
          Prepared for <strong>{companyName || "your team"}</strong> ({snapshot.companySize} cohort ·{" "}
          {BUYER_ROLES.find((r) => r.value === snapshot.role)?.label}). All four chapters in the Gated Asset Preview are now unlocked. Local preview only.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-[22px] bg-[#E8E0F8] p-4">
            <span className="vl-mono text-[11px] text-[#645D7A]">SPLASH PASS-THROUGH</span>
            <p className="vl-display mt-1 text-2xl font-extrabold text-[#1E1B2E]">
              {tailored.splashPassThrough}%
            </p>
          </div>
          <div className="rounded-[22px] bg-[#D9F2E6] p-4">
            <span className="vl-mono text-[11px] text-[#645D7A]">SQUEEZE VELOCITY CVR</span>
            <p className="vl-display mt-1 text-2xl font-extrabold text-[#1E1B2E]">
              {tailored.squeezeCvr}%
            </p>
          </div>
          <div className="rounded-[22px] bg-[#FCE2D5] p-4">
            <span className="vl-mono text-[11px] text-[#645D7A]">LEAD-GEN PIPELINE LIFT</span>
            <p className="vl-display mt-1 text-2xl font-extrabold text-[#5B46E8]">
              {tailored.pipelineLift}×
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#preview" className="vl-btn vl-btn--primary">
            <span>Inspect All 4 Unlocked Chapters</span>
            <span className="vl-btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <button
            type="button"
            onClick={() => {
              valenceStore.recordLeadCaptureSuccess(
                workEmail,
                snapshot.companySize,
                snapshot.role,
                "",
              );
            }}
            className="vl-btn vl-btn--secondary"
          >
            Reconfigure Cohort Inputs
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      key={shakeKey}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Stage 03 B2B Lead Capture Dossier Form"
      className={`rounded-[32px] border-2 border-[#1E1B2E] bg-[#FBF9F5] p-6 sm:p-8 space-y-5 ${
        Object.keys(errors).length > 0 ? "vl-shake" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1B2E]/10 pb-4">
        <div>
          <h3 className="vl-display text-2xl font-bold text-[#1E1B2E]">
            Unseal the 68-Page Monograph &amp; Custom Audit
          </h3>
        </div>
        <span className="rounded-full bg-[#FCE2D5] px-3.5 py-1.5 vl-mono text-xs font-medium text-[#1E1B2E]">
          4 FIELDS → 100% ACCESS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 1: Full Name */}
        <div className="vl-input-wrap">
          <label
            htmlFor="vl-lead-name"
            className="block pb-1.5 pl-3 text-xs font-semibold text-[#1E1B2E]"
          >
            Full Name *
          </label>
          <input
            id="vl-lead-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Elena Vance"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "vl-err-name" : undefined}
            className="vl-input"
          />
          {errors.fullName && (
            <p id="vl-err-name" role="alert" className="mt-1 pl-3 text-xs font-medium text-[#D9385A]">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Field 2: Work Email */}
        <div className="vl-input-wrap">
          <label
            htmlFor="vl-lead-email"
            className="block pb-1.5 pl-3 text-xs font-semibold text-[#1E1B2E]"
          >
            Work Email *
          </label>
          <input
            id="vl-lead-email"
            name="workEmail"
            type="email"
            autoComplete="email"
            placeholder="elena@acmecloud.io"
            value={workEmail}
            onChange={(e) => {
              setWorkEmail(e.target.value);
              if (errors.workEmail) setErrors((prev) => ({ ...prev, workEmail: undefined }));
            }}
            aria-invalid={errors.workEmail ? "true" : "false"}
            aria-describedby={errors.workEmail ? "vl-err-email" : undefined}
            className="vl-input"
          />
          {errors.workEmail && (
            <p id="vl-err-email" role="alert" className="mt-1 pl-3 text-xs font-medium text-[#D9385A]">
              {errors.workEmail}
            </p>
          )}
        </div>
      </div>

      {/* Company Name */}
      <div className="vl-input-wrap">
        <label
          htmlFor="vl-lead-company"
          className="block pb-1.5 pl-3 text-xs font-semibold text-[#1E1B2E]"
        >
          Company or Organization *
        </label>
        <input
          id="vl-lead-company"
          name="companyName"
          type="text"
          autoComplete="organization"
          placeholder="Acme Cloud Inc."
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: undefined }));
          }}
          aria-invalid={errors.companyName ? "true" : "false"}
          aria-describedby={errors.companyName ? "vl-err-company" : undefined}
          className="vl-input"
        />
        {errors.companyName && (
          <p id="vl-err-company" role="alert" className="mt-1 pl-3 text-xs font-medium text-[#D9385A]">
            {errors.companyName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 3: Company Size (Live-updates Gated Asset Preview) */}
        <div className="vl-input-wrap">
          <label
            htmlFor="vl-lead-size"
            className="block pb-1.5 pl-3 text-xs font-semibold text-[#1E1B2E]"
          >
            Company Size (tailors benchmark)
          </label>
          <select
            id="vl-lead-size"
            name="companySize"
            value={snapshot.companySize}
            onChange={(e) =>
              valenceStore.setPreviewFilter({
                companySize: e.target.value as CompanySizeBand,
              })
            }
            className="vl-input cursor-pointer"
          >
            {COMPANY_SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Field 4: Role (Live-updates Gated Asset Preview) */}
        <div className="vl-input-wrap">
          <label
            htmlFor="vl-lead-role"
            className="block pb-1.5 pl-3 text-xs font-semibold text-[#1E1B2E]"
          >
            Primary Role (tailors audit)
          </label>
          <select
            id="vl-lead-role"
            name="role"
            value={snapshot.role}
            onChange={(e) =>
              valenceStore.setPreviewFilter({
                role: e.target.value as BuyerRoleId,
              })
            }
            className="vl-input cursor-pointer"
          >
            {BUYER_ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Preview Payoff Strip inside Form */}
      <div className="rounded-[24px] bg-[#E8E0F8] p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="vl-mono text-[11px] text-[#645D7A]">
            LIVE COHORT PREVIEW · {snapshot.companySize.toUpperCase()}
          </span>
          <p className="text-sm font-semibold text-[#1E1B2E]">
            {tailored.recommendedArchitecture}
          </p>
        </div>
        <span className="rounded-full bg-[#FBF9F5] px-3.5 py-1.5 vl-mono text-xs font-bold text-[#5B46E8]">
          {tailored.pipelineLift}× PIPELINE LIFT
        </span>
      </div>

      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="vl-btn vl-btn--primary px-8 py-4 text-base"
        >
          <span>
            {isSubmitting
              ? "Minting Dossier Key…"
              : "Unseal Full Dossier & Mint Key"}
          </span>
          <span className="vl-btn__arrow" aria-hidden="true">
            →
          </span>
        </button>
        <p className="vl-mono text-[11px] text-[#645D7A]">
          CLIENT-SIDE VALIDATED · ZERO NETWORK CALLS
        </p>
      </div>
    </form>
  );
}
