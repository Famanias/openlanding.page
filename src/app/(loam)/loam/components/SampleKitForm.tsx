"use client";

import React, { useState } from 'react';
import {
  validateSampleKitForm,
  type SampleKitFormValues,
  type SampleKitFormErrors,
  type SampleKitUseCase,
} from '../logic/formValidation';

interface SampleKitFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  idPrefix?: string;
}

export const SampleKitForm: React.FC<SampleKitFormProps> = ({
  onSuccess,
  compact = false,
  idPrefix = '',
}) => {
  const [values, setValues] = useState<SampleKitFormValues>({
    name: '',
    workEmail: '',
    company: '',
    useCase: 'packaging',
    note: '',
  });
  const [errors, setErrors] = useState<SampleKitFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSampleKitForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const handleChange = (field: keyof SampleKitFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof SampleKitFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-md border-t border-b border-[#f0e8d8]/20 bg-[#080604]/72 px-6 py-8 text-[#f0e8d8]"
      >
        <div className="flex flex-col items-start text-left">
          {/* Animated small mushroom pushing up through dark loam soil */}
          <div className="relative mb-5 flex h-28 w-36 items-end justify-center overflow-hidden">
            <svg
              viewBox="0 0 140 110"
              className="h-full w-full overflow-visible"
              aria-hidden="true"
            >
              {/* Underground foxfire mycelium threads */}
              <path
                d="M70 92 C58 98, 42 102, 26 105 M70 92 C82 99, 98 101, 114 106 M70 92 C68 99, 64 105, 58 109"
                stroke="#c8e64c"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              {/* Sprouting mushroom group */}
              <g className="animate-sprout">
                <path
                  d="M65 90 C62 84, 66 62, 67 42 L73 42 C74 62, 78 84, 75 90 Z"
                  fill="#d8cbb8"
                />
                <ellipse
                  cx="70"
                  cy="54"
                  rx="9"
                  ry="2.8"
                  fill="#e2d6c3"
                  stroke="#7a5b42"
                  strokeWidth="0.8"
                />
                <g className="animate-cap-open">
                  <path
                    d="M36 43 C42 28, 58 24, 64 20 C68 17, 72 17, 76 20 C82 24, 98 28, 104 43 C86 45, 54 45, 36 43 Z"
                    fill="#d2c3ae"
                  />
                  <ellipse cx="70" cy="22" rx="8" ry="4" fill="#4e3522" />
                  <circle cx="57" cy="31" r="2.2" fill="#63452d" />
                  <circle cx="70" cy="30" r="2.4" fill="#63452d" />
                  <circle cx="83" cy="31" r="2.2" fill="#63452d" />
                  <circle cx="48" cy="37" r="2" fill="#73533a" />
                  <circle cx="62" cy="37" r="2.2" fill="#73533a" />
                  <circle cx="78" cy="37" r="2.2" fill="#73533a" />
                  <circle cx="92" cy="37" r="2" fill="#73533a" />
                </g>
              </g>
              {/* Dark loam soil mound foreground */}
              <path
                d="M14 92 Q42 84, 70 88 Q98 84, 126 92 L132 104 L8 104 Z"
                fill="#18120c"
                stroke="#33261b"
                strokeWidth="1"
              />
              <ellipse cx="46" cy="90" rx="8" ry="2.2" fill="#3a4f22" />
              <ellipse cx="92" cy="91" rx="9" ry="2.2" fill="#3a4f22" />
            </svg>
          </div>

          <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-[#c8e64c]">
            Specimen culture initiated
          </p>
          <h3 className="mt-1 font-serif-display text-4xl font-normal tracking-tight text-[#f0e8d8]">
            Something&rsquo;s growing.
          </h3>
          <p className="mt-3 font-sans-body text-sm leading-relaxed text-[#f0e8d8]/75">
            We&rsquo;ve inoculated a sample kit for{' '}
            <span className="font-medium text-[#f0e8d8]">{values.company}</span>
            . Expect dispatch notes at{' '}
            <span className="font-medium text-[#f0e8d8]">
              {values.workEmail}
            </span>{' '}
            within 48 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setValues({
                name: '',
                workEmail: '',
                company: '',
                useCase: 'packaging',
                note: '',
              });
            }}
            className="mt-6 border-b border-[#f0e8d8]/40 pb-1 font-mono-label text-xs uppercase tracking-[0.14em] text-[#f0e8d8]/85 transition-colors hover:border-[#c8e64c] hover:text-[#c8e64c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0"
          >
            Request another kit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Request a sample kit"
      className={`w-full max-w-md border-t border-b border-[#f0e8d8]/20 bg-[#080604]/72 ${
        compact ? 'px-5 py-5' : 'px-6 py-7'
      } text-[#f0e8d8]`}
    >
      <div className="mb-6">
        <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-[#c8e64c]/90">
          06 &mdash; Return
        </p>
        <h2 className="mt-1 font-serif-display text-3xl font-normal tracking-tight text-[#f0e8d8] sm:text-4xl">
          Request a sample kit
        </h2>
        <p className="mt-1.5 font-sans-body text-xs text-[#f0e8d8]/65">
          Evaluate grown mycelium + hemp packaging specimens in your own studio.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor={`${idPrefix}loam-name`}
            className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75"
          >
            Name
          </label>
          <input
            id={`${idPrefix}loam-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Elena Vance"
            aria-invalid={!!errors.name}
            className="mt-1 w-full border-0 border-b border-[#f0e8d8]/25 bg-transparent px-0 py-2 font-sans-body text-sm text-[#f0e8d8] placeholder-[#f0e8d8]/30 transition-colors focus:border-[#c8e64c] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8e64c]"
          />
          {errors.name && (
            <p role="alert" className="mt-1 font-sans-body text-xs text-[#e5886e]">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${idPrefix}loam-email`}
              className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75"
            >
              Work email
            </label>
            <input
              id={`${idPrefix}loam-email`}
              name="workEmail"
              type="email"
              required
              autoComplete="email"
              value={values.workEmail}
              onChange={(e) => handleChange('workEmail', e.target.value)}
              placeholder="elena@studio.co"
              aria-invalid={!!errors.workEmail}
              className="mt-1 w-full border-0 border-b border-[#f0e8d8]/25 bg-transparent px-0 py-2 font-sans-body text-sm text-[#f0e8d8] placeholder-[#f0e8d8]/30 transition-colors focus:border-[#c8e64c] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8e64c]"
            />
            {errors.workEmail && (
              <p role="alert" className="mt-1 font-sans-body text-xs text-[#e5886e]">
                {errors.workEmail}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}loam-company`}
              className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75"
            >
              Company
            </label>
            <input
              id={`${idPrefix}loam-company`}
              name="company"
              type="text"
              required
              autoComplete="organization"
              value={values.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Fieldcraft"
              aria-invalid={!!errors.company}
              className="mt-1 w-full border-0 border-b border-[#f0e8d8]/25 bg-transparent px-0 py-2 font-sans-body text-sm text-[#f0e8d8] placeholder-[#f0e8d8]/30 transition-colors focus:border-[#c8e64c] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8e64c]"
            />
            {errors.company && (
              <p role="alert" className="mt-1 font-sans-body text-xs text-[#e5886e]">
                {errors.company}
              </p>
            )}
          </div>
        </div>

        <div>
          <span className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75">
            Use
          </span>
          <div
            role="radiogroup"
            aria-label="Intended use"
            className="mt-2 grid grid-cols-3 gap-3"
          >
            {(['packaging', 'panels', 'other'] as SampleKitUseCase[]).map(
              (option) => {
                const isSelected = values.useCase === option;
                const label =
                  option === 'packaging'
                    ? 'Packaging'
                    : option === 'panels'
                      ? 'Panels'
                      : 'Other';
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleChange('useCase', option)}
                    className={`border-b py-1.5 text-left font-mono-label text-xs uppercase tracking-[0.12em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8e64c] ${
                      isSelected
                        ? 'border-[#c8e64c] text-[#c8e64c]'
                        : 'border-[#f0e8d8]/20 text-[#f0e8d8]/60 hover:border-[#f0e8d8]/45 hover:text-[#f0e8d8]'
                    }`}
                  >
                    {label}
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}loam-note`}
            className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75"
          >
            Note <span className="text-[#f0e8d8]/40">(optional)</span>
          </label>
          <textarea
            id={`${idPrefix}loam-note`}
            name="note"
            rows={2}
            value={values.note}
            onChange={(e) => handleChange('note', e.target.value)}
            placeholder="Dimensions, annual volume, or mould requirements..."
            className="mt-1 w-full resize-none border-0 border-b border-[#f0e8d8]/25 bg-transparent px-0 py-1.5 font-sans-body text-sm text-[#f0e8d8] placeholder-[#f0e8d8]/30 transition-colors focus:border-[#c8e64c] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8e64c]"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full border border-[#c8e64c] bg-[#c8e64c]/15 px-4 py-2.5 font-mono-label text-xs uppercase tracking-[0.16em] text-[#e4f882] transition-colors hover:bg-[#c8e64c] hover:text-[#080604] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0"
          >
            Request sample kit
          </button>
        </div>
      </div>
    </form>
  );
};
