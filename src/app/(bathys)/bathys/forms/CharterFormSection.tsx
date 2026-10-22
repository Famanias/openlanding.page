"use client";

import React, { useState } from "react";
import { validateCharterForm, type CharterFormValues, type CharterFormErrors } from "./validate";
import { Reveal } from "../motion/Reveal";

const INITIAL_VALUES: CharterFormValues = {
  name: "",
  email: "",
  organization: "",
  trenchZone: "mariana",
  payloadMassKg: 50,
  missionWindow: "2026-Q4",
  requirements: "",
};

export function CharterFormSection() {
  const [values, setValues] = useState<CharterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CharterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    // Clear error on edit
    if (errors[name as keyof CharterFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCharterForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulated short client-side verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setIsSuccess(false);
  };

  return (
    <section id="charter" className="py-24 border-b border-glass bg-navy/40 relative">
      <div className="bat-wrap">
        <Reveal variant="rise" className="mb-12">
          <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold block mb-2">
            06 // Expedition Commission
          </span>
          <h2 className="bat-display text-3xl sm:text-5xl font-bold uppercase text-titanium">
            Charter &amp; Scientific Payload Intake
          </h2>
          <p className="text-mist max-w-2xl mt-4 font-body text-base">
            Reserve autonomous dive missions or integrate bespoke academic sensor payloads onto the Bathys H-11 vehicle platform.
          </p>
        </Reveal>

        <div className="max-w-3xl mx-auto bg-navy border border-glass rounded-xl p-6 sm:p-10 relative">
          {isSuccess ? (
            <div
              role="status"
              aria-live="polite"
              className="text-center py-10 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-cyan/10 border-2 border-cyan flex items-center justify-center mb-6">
                <span className="text-cyan font-bold text-2xl">✓</span>
              </div>
              <h3 className="bat-display text-2xl sm:text-3xl font-bold uppercase text-titanium mb-3">
                Mission Dossier Lodged
              </h3>
              <p className="text-mist font-body max-w-md mx-auto mb-6 text-sm sm:text-base leading-relaxed">
                Thank you, <strong className="text-titanium">{values.name}</strong>. Your charter request for the{" "}
                <span className="text-cyan font-mono font-semibold uppercase">{values.trenchZone} Trench</span> ({values.payloadMassKg} kg payload) has been logged in the Brest flight ledger.
              </p>
              <div className="bat-mono text-xs text-slate bg-glass/60 border border-glass px-4 py-2 rounded mb-8">
                FLIGHT CONFIRMATION // HADAL-2026-X8
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="bat-btn bat-btn-outline text-xs"
              >
                Submit Additional Mission Intake
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Principal Investigator Name */}
                <div>
                  <label htmlFor="name" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Principal Investigator *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={values.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Marianne Moreau"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  />
                  {errors.name && (
                    <span id="name-error" className="bat-mono text-xs text-amber mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Institutional Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder="e.g. m.moreau@ifremer.fr"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  />
                  {errors.email && (
                    <span id="email-error" className="bat-mono text-xs text-amber mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Research Organization */}
              <div>
                <label htmlFor="organization" className="block bat-mono text-xs text-slate uppercase mb-2">
                  Institution or Agency *
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  value={values.organization}
                  onChange={handleChange}
                  placeholder="e.g. Woods Hole Oceanographic Institution / IFREMER"
                  aria-describedby={errors.organization ? "organization-error" : undefined}
                  aria-invalid={!!errors.organization}
                  className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                />
                {errors.organization && (
                  <span id="organization-error" className="bat-mono text-xs text-amber mt-1 block">
                    {errors.organization}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Target Trench Zone */}
                <div>
                  <label htmlFor="trenchZone" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Target Trench *
                  </label>
                  <select
                    id="trenchZone"
                    name="trenchZone"
                    value={values.trenchZone}
                    onChange={handleChange}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  >
                    <option value="mariana">Mariana Trench (10,928m)</option>
                    <option value="kermadec">Kermadec Trench (10,047m)</option>
                    <option value="puertorico">Puerto Rico Trench (8,376m)</option>
                    <option value="philippine">Philippine Trench (10,540m)</option>
                  </select>
                </div>

                {/* Payload Mass */}
                <div>
                  <label htmlFor="payloadMassKg" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Payload Mass (kg) *
                  </label>
                  <input
                    id="payloadMassKg"
                    name="payloadMassKg"
                    type="number"
                    min="1"
                    max="500"
                    required
                    value={values.payloadMassKg}
                    onChange={handleChange}
                    aria-describedby={errors.payloadMassKg ? "payload-error" : undefined}
                    aria-invalid={!!errors.payloadMassKg}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  />
                  {errors.payloadMassKg && (
                    <span id="payload-error" className="bat-mono text-xs text-amber mt-1 block">
                      {errors.payloadMassKg}
                    </span>
                  )}
                </div>

                {/* Mission Window */}
                <div>
                  <label htmlFor="missionWindow" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Launch Window
                  </label>
                  <select
                    id="missionWindow"
                    name="missionWindow"
                    value={values.missionWindow}
                    onChange={handleChange}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  >
                    <option value="2026-Q4">2026 Q4 (Winter Window)</option>
                    <option value="2027-Q1">2027 Q1 (Spring Window)</option>
                    <option value="2027-Q2">2027 Q2 (Summer Window)</option>
                    <option value="2027-Q3">2027 Q3 (Autumn Window)</option>
                  </select>
                </div>
              </div>

              {/* Scientific Requirements */}
              <div>
                <label htmlFor="requirements" className="block bat-mono text-xs text-slate uppercase mb-2">
                  Mission Parameters &amp; Sensor Specifications *
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  required
                  value={values.requirements}
                  onChange={handleChange}
                  placeholder="Outline desired benthic sampling targets, optical survey tracks, or custom electronics integration requirements..."
                  aria-describedby={errors.requirements ? "requirements-error" : undefined}
                  aria-invalid={!!errors.requirements}
                  className="w-full bg-glass border border-glass rounded-md p-4 text-titanium text-sm focus:border-cyan outline-none transition-colors resize-y"
                />
                {errors.requirements && (
                  <span id="requirements-error" className="bat-mono text-xs text-amber mt-1 block">
                    {errors.requirements}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bat-btn bat-btn-primary w-full py-3.5 text-sm font-bold"
              >
                {isSubmitting ? "Verifying Telemetry Parameters..." : "Submit Mission Charter Dossier"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
