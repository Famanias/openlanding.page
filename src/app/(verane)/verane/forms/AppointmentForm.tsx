"use client";

import { useState, useRef, type FormEvent } from "react";
import {
  validateAppointment,
  type AppointmentFields,
  type AppointmentErrors,
} from "./validate-appointment";

export function AppointmentForm() {
  const [fields, setFields] = useState<AppointmentFields>({
    name: "",
    email: "",
    edition: "iris-calcaire",
    season: "printemps",
    guests: "1",
    notes: "",
  });

  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const foundErrors = validateAppointment(fields);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      if (foundErrors.name) nameInputRef.current?.focus();
      return;
    }

    setSubmitted(
      `Your consultation request for ${fields.name} has been received. Our salon steward on Rue de l'Oratoire will respond with appointment ledger confirmation within two business days.`,
    );
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="p-8 border border-[var(--color-gilt)] bg-[color-mix(in_srgb,var(--color-oud)_90%,var(--color-ash))] text-[var(--color-calcaire)] rounded-xl"
      >
        <div className="vr-mono text-xs text-[var(--color-gilt)] uppercase mb-2">
          Consultation Confirmed
        </div>
        <h3 className="vr-serif text-2xl sm:text-3xl font-normal mb-3">
          We await you in <em>Grasse.</em>
        </h3>
        <p className="font-light opacity-80 leading-relaxed mb-6">
          {submitted}
        </p>
        <button
          onClick={() => {
            setSubmitted(null);
            setFields({
              name: "",
              email: "",
              edition: "iris-calcaire",
              season: "printemps",
              guests: "1",
              notes: "",
            });
          }}
          className="vr-btn vr-btn--outline-dark"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 text-[var(--color-calcaire)]"
    >
      {/* Name Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="app-name" className="vr-mono text-xs opacity-90">
          Full Name *
        </label>
        <input
          ref={nameInputRef}
          id="app-name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, name: e.target.value }));
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="e.g. Laurent Vianney"
          className="h-12 px-4 bg-transparent border border-[color-mix(in_srgb,var(--color-calcaire)_30%,transparent)] focus:border-[var(--color-gilt)] outline-none text-[var(--color-calcaire)] rounded-lg transition-colors duration-150"
        />
        {errors.name && (
          <span id="name-error" className="vr-mono text-xs text-[var(--color-gilt)] mt-0.5">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="app-email" className="vr-mono text-xs opacity-90">
          Email Address *
        </label>
        <input
          id="app-email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, email: e.target.value }));
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="laurent@example.com"
          className="h-12 px-4 bg-transparent border border-[color-mix(in_srgb,var(--color-calcaire)_30%,transparent)] focus:border-[var(--color-gilt)] outline-none text-[var(--color-calcaire)] rounded-lg transition-colors duration-150"
        />
        {errors.email && (
          <span id="email-error" className="vr-mono text-xs text-[var(--color-gilt)] mt-0.5">
            {errors.email}
          </span>
        )}
      </div>

      {/* Fragrance Focus & Season in 2-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="app-edition" className="vr-mono text-xs opacity-90">
            Fragrance or Consultation *
          </label>
          <select
            id="app-edition"
            value={fields.edition}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, edition: e.target.value }));
              if (errors.edition) setErrors((prev) => ({ ...prev, edition: undefined }));
            }}
            className="h-12 px-3 bg-[var(--color-oud)] border border-[color-mix(in_srgb,var(--color-calcaire)_30%,transparent)] focus:border-[var(--color-gilt)] outline-none text-[var(--color-calcaire)] rounded-lg transition-colors duration-150"
          >
            <option value="premiere-heure">Nº 1 Première Heure</option>
            <option value="iris-calcaire">Nº 2 Iris Calcaire</option>
            <option value="fumee-lente">Nº 3 Fumée Lente</option>
            <option value="nuit-doratoire">Nº 4 Nuit d&apos;Oratoire</option>
            <option value="bespoke-organ">The Organ Bespoke Consultation</option>
            <option value="full-quadriptych">Complete Four-Flacon Tasting</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="app-season" className="vr-mono text-xs opacity-90">
            Preferred Season *
          </label>
          <select
            id="app-season"
            value={fields.season}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, season: e.target.value }));
              if (errors.season) setErrors((prev) => ({ ...prev, season: undefined }));
            }}
            className="h-12 px-3 bg-[var(--color-oud)] border border-[color-mix(in_srgb,var(--color-calcaire)_30%,transparent)] focus:border-[var(--color-gilt)] outline-none text-[var(--color-calcaire)] rounded-lg transition-colors duration-150"
          >
            <option value="printemps">Printemps (March – May)</option>
            <option value="ete">Été (June – August)</option>
            <option value="automne">Automne (September – November)</option>
            <option value="hiver">Hiver (December – February)</option>
          </select>
        </div>
      </div>

      {/* Guest count & Optional notes */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="app-guests" className="vr-mono text-xs opacity-90">
          Consultation Party
        </label>
        <select
          id="app-guests"
          value={fields.guests}
          onChange={(e) => setFields((prev) => ({ ...prev, guests: e.target.value }))}
          className="h-12 px-3 bg-[var(--color-oud)] border border-[color-mix(in_srgb,var(--color-calcaire)_30%,transparent)] focus:border-[var(--color-gilt)] outline-none text-[var(--color-calcaire)] rounded-lg transition-colors duration-150"
        >
          <option value="1">Individual Consultation (1 guest, 90 minutes)</option>
          <option value="2">Paired Consultation (2 guests, 120 minutes)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="app-notes" className="vr-mono text-xs opacity-90">
          Specific Notes or Olfactory Sensitivities (Optional)
        </label>
        <textarea
          id="app-notes"
          rows={3}
          value={fields.notes}
          onChange={(e) => setFields((prev) => ({ ...prev, notes: e.target.value }))}
          placeholder="Mention any particular materials, memories, or bespoke accord desires..."
          className="p-3 bg-transparent border border-[color-mix(in_srgb,var(--color-calcaire)_30%,transparent)] focus:border-[var(--color-gilt)] outline-none text-[var(--color-calcaire)] rounded-lg transition-colors duration-150"
        />
      </div>

      <button type="submit" className="vr-btn vr-btn--orris w-full mt-2">
        Request Appointment at the Salon
      </button>

      <p className="vr-mono text-[10px] opacity-90 text-center m-0">
        40 Rue de l&apos;Oratoire · Grasse, France · By Appointment Only
      </p>
    </form>
  );
}
