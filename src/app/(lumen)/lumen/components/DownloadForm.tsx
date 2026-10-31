import React, { useState } from 'react';
import { CheckCircle2, FileDown, BookOpen, ArrowRight, AlertCircle } from 'lucide-react';
import { validateWorkEmail, canSubmitEmail } from '../utils/workflowLogic';

interface DownloadFormProps {
  formId: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  submittedEmail: string | null;
  lastSubmitTimestamp: number | null;
  onSuccessSubmit: (email: string, timestamp: number) => void;
  onResetSubmit: () => void;
  onOpenPreviewSection?: () => void;
  compact?: boolean;
}

export const DownloadForm: React.FC<DownloadFormProps> = ({
  formId,
  inputRef,
  submittedEmail,
  lastSubmitTimestamp,
  onSuccessSubmit,
  onResetSubmit,
  onOpenPreviewSection,
  compact = false,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorId = `${formId}-error`;
  const privacyId = `${formId}-privacy`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateWorkEmail(emailInput);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please enter a valid work email.');
      return;
    }

    const now = Date.now();
    const guard = canSubmitEmail(
      validation.normalizedEmail,
      submittedEmail,
      lastSubmitTimestamp,
      now
    );

    if (!guard.allowed) {
      setErrorMessage(null);
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      onSuccessSubmit(validation.normalizedEmail, now);
    }, 220);
  };

  if (submittedEmail) {
    return (
      <div
        id={formId}
        role="region"
        aria-live="polite"
        aria-label="Playbook download confirmation"
        className="lm-form-success glass-panel-active rounded-2xl p-6 transition-[transform,opacity,background-color,border-color,box-shadow] duration-300"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-[#5BA59A] shrink-0" aria-hidden="true" />
            <h3 className="text-base font-semibold text-[#1E2432]">
              Your playbook is ready.
            </h3>
          </div>
          <span className="text-xs font-mono text-[#657187]">
            16 PAGES · PDF EDITION
          </span>
        </div>

        <p className="mt-2 text-sm text-[#657187] leading-relaxed">
          Prepared for <span className="font-medium text-[#1E2432]">{submittedEmail}</span>. Access the complete guide with the automation opportunity checklist, 5-stage mapping framework, and reusable prompt templates.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* Per user instruction: the Download PDF button does not need to trigger a file download */}
          <button
            type="button"
            className="lm-form-submit lm-magnetic inline-flex items-center justify-center gap-2 rounded-xl bg-[#252C43] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1E2432] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            <span>Download PDF</span>
          </button>

          {onOpenPreviewSection && (
            <button
              type="button"
              onClick={onOpenPreviewSection}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1E2432]/15 bg-white/75 px-4 py-3 text-sm font-medium text-[#1E2432] hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
            >
              <BookOpen className="h-4 w-4 text-[#657187]" aria-hidden="true" />
              <span>Explore Interactive Pages</span>
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#1E2432]/10 pt-3 text-xs text-[#657187]">
          <span>
            Interactive demonstration mode · Email verified locally in browser (not stored on a server).
          </span>
          <button
            type="button"
            onClick={() => {
              setEmailInput('');
              onResetSubmit();
            }}
            className="font-medium text-[#1E2432] underline underline-offset-2 hover:text-[#252C43] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      noValidate
      className={compact ? 'w-full' : 'w-full max-w-xl'}
    >
      <div className="lm-form-surface glass-panel rounded-2xl p-2 sm:p-2.5">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <label htmlFor={`${formId}-email`} className="sr-only">
              Your work email
            </label>
            <input
              ref={inputRef}
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Your work email"
              aria-invalid={errorMessage ? 'true' : 'false'}
              aria-describedby={errorMessage ? `${errorId} ${privacyId}` : privacyId}
              className="w-full rounded-xl bg-white/85 px-4 py-3.5 text-sm text-[#1E2432] placeholder:text-[#657187]/80 border border-white/90 focus:border-[#252C43]/40 focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="lm-form-submit lm-magnetic inline-flex items-center justify-center gap-2 rounded-xl bg-[#252C43] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1E2432] disabled:opacity-60 transition-[transform,opacity,background-color,border-color,box-shadow] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
          >
            <span>{isSubmitting ? 'Preparing guide...' : 'Get the free playbook'}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {errorMessage && (
        <div
          id={errorId}
          role="alert"
          className="mt-2.5 flex items-center gap-2 text-xs font-medium text-rose-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div
        id={privacyId}
        className="mt-3 flex flex-col gap-1 text-xs text-[#657187] sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2 font-medium text-[#1E2432]/85">
          <span>Free PDF. No credit card required.</span>
          <span aria-hidden="true">·</span>
          <span>16 Practical Pages</span>
        </div>
        <span className="text-[11px] text-[#657187]">
          Demo mode: validated locally; no leads are stored or emailed.
        </span>
      </div>
    </form>
  );
};
