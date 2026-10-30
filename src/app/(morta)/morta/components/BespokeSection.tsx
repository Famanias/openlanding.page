import React, { useEffect, useState } from 'react';
import {
  CommissionFormInput,
  CommissionValidationResult,
  MORTA_ASSETS,
  validateCommissionForm,
} from '../utils/mortaLogic';
import { MortaImage } from './MortaImage';
import { PointedSealOrnament, SectionHandoffRule } from './MortaMark';

interface BespokeSectionProps {
  selectedPieceReference: string;
}

const PIECE_OPTIONS = [
  'Bespoke Solitary Commission (New Wax Study)',
  '01 — Reliquary (Signet ring)',
  '02 — Thorn (Pendant)',
  '03 — Vigil (Drop earrings)',
];

export const BespokeSection: React.FC<BespokeSectionProps> = ({
  selectedPieceReference,
}) => {
  const [formData, setFormData] = useState<CommissionFormInput>({
    name: '',
    email: '',
    pieceReference: PIECE_OPTIONS[0],
    description: '',
  });
  const [validation, setValidation] = useState<CommissionValidationResult>({
    isValid: true,
    errors: {},
  });
  const [submittedRecord, setSubmittedRecord] =
    useState<CommissionFormInput | null>(null);

  useEffect(() => {
    if (selectedPieceReference) {
      setFormData((prev) => ({
        ...prev,
        pieceReference: selectedPieceReference,
      }));
      setSubmittedRecord(null);
    }
  }, [selectedPieceReference]);

  const handleFieldChange = (
    field: keyof CommissionFormInput,
    value: string
  ) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (validation.errors[field]) {
      setValidation((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: undefined,
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validateCommissionForm(formData);
    setValidation(check);
    if (!check.isValid) {
      return;
    }

    setSubmittedRecord({
      name: formData.name.trim(),
      email: formData.email.trim(),
      pieceReference: formData.pieceReference.trim(),
      description: formData.description.trim(),
    });
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setFormData({
      name: '',
      email: '',
      pieceReference: PIECE_OPTIONS[0],
      description: '',
    });
    setValidation({ isValid: true, errors: {} });
  };

  return (
    <section
      id="commissions"
      aria-labelledby="commissions-heading"
      className="relative morta-atmosphere border-b border-white/20"
    >
      <SectionHandoffRule
        chapterNumber="CH. V"
        chapterLabel="Bespoke Commissions"
      />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bespoke Plate (morta-bespoke.png) & Editorial Invitation */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70">
                SOLITARY WORKS · GRAPHITE TO STERLING
              </p>
              <h2
                id="commissions-heading"
                className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-white leading-[1.06]"
                style={{ textWrap: 'balance' }}
              >
                Begin a piece shaped
                <br />
                for one hand.
              </h2>
              <p className="text-base text-white/80 leading-relaxed">
                Bespoke commissions begin with a drawing and a hand-carved
                wax model, shaped to your measurements and ideas.
              </p>
            </div>

            <figure className="border border-white/25 bg-black p-4 sm:p-6">
              <MortaImage
                asset={MORTA_ASSETS.bespoke}
                priority={false}
                className="w-full"
              />
              <figcaption className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/70">
                <span>PLATE III · GRAPHITE STUDIES &amp; NEEDLE FILE</span>
                <span>925 STERLING</span>
              </figcaption>
            </figure>
          </div>

          {/* Right Column: Accessible Enquiry Form & Transparent Demo Success State */}
          <div className="lg:col-span-7">
            <div className="border border-white/25 bg-black p-6 sm:p-10 lg:p-12">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <PointedSealOrnament className="w-3.5 h-5 text-white" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                    Commission Enquiry Ledger
                  </span>
                </div>
                <span className="font-mono text-xs text-white/65 tracking-[0.14em]">
                  DIRECT BENCH CONSULTATION
                </span>
              </div>

              {submittedRecord ? (
                <div
                  role="status"
                  aria-live="polite"
                  data-testid="commission-demo-success"
                  className="space-y-8 py-4"
                >
                  <div className="p-6 border border-white bg-black space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                      DEMONSTRATION PREVIEW · ENQUIRY NOT TRANSMITTED
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl font-normal text-white">
                      Your commission study has been formatted locally.
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      This interface is an interactive demonstration with no
                      connected mail server. Your enquiry details were validated
                      and previewed in your browser only—no message has been sent.
                    </p>
                  </div>

                  <dl className="border border-white/20 divide-y divide-white/15 text-sm">
                    <div className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        Patron Name
                      </dt>
                      <dd className="sm:col-span-2 text-white font-medium">
                        {submittedRecord.name}
                      </dd>
                    </div>
                    <div className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        Correspondence Email
                      </dt>
                      <dd className="sm:col-span-2 text-white font-mono">
                        {submittedRecord.email}
                      </dd>
                    </div>
                    <div className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        Starting Form
                      </dt>
                      <dd className="sm:col-span-2 text-white">
                        {submittedRecord.pieceReference}
                      </dd>
                    </div>
                    <div className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        Commission Notes
                      </dt>
                      <dd className="sm:col-span-2 text-white/90 leading-relaxed">
                        {submittedRecord.description}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-[0.18em] border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap"
                    >
                      Draft another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  aria-label="Bespoke commission enquiry form"
                >
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="commission-name"
                      className="block font-mono text-xs uppercase tracking-[0.18em] text-white mb-2"
                    >
                      Your Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="commission-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      aria-invalid={Boolean(validation.errors.name)}
                      aria-describedby={
                        validation.errors.name
                          ? 'commission-name-error'
                          : undefined
                      }
                      placeholder="e.g. Clara Vance"
                      className={`w-full px-4 py-3.5 bg-black text-white placeholder:text-white/35 border font-sans text-sm focus:outline-none focus:border-white transition-colors ${
                        validation.errors.name
                          ? 'border-white'
                          : 'border-white/35'
                      }`}
                    />
                    {validation.errors.name && (
                      <p
                        id="commission-name-error"
                        role="alert"
                        className="mt-2 font-mono text-xs text-white flex items-center gap-2"
                      >
                        <span aria-hidden="true">!</span>
                        <span>{validation.errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="commission-email"
                      className="block font-mono text-xs uppercase tracking-[0.18em] text-white mb-2"
                    >
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="commission-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleFieldChange('email', e.target.value)
                      }
                      aria-invalid={Boolean(validation.errors.email)}
                      aria-describedby={
                        validation.errors.email
                          ? 'commission-email-error'
                          : undefined
                      }
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-3.5 bg-black text-white placeholder:text-white/35 border font-sans text-sm focus:outline-none focus:border-white transition-colors ${
                        validation.errors.email
                          ? 'border-white'
                          : 'border-white/35'
                      }`}
                    />
                    {validation.errors.email && (
                      <p
                        id="commission-email-error"
                        role="alert"
                        className="mt-2 font-mono text-xs text-white flex items-center gap-2"
                      >
                        <span aria-hidden="true">!</span>
                        <span>{validation.errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Starting Form / Edition Reference */}
                  <div>
                    <label
                      htmlFor="commission-piece"
                      className="block font-mono text-xs uppercase tracking-[0.18em] text-white mb-2"
                    >
                      Study or Edition Reference
                    </label>
                    <select
                      id="commission-piece"
                      name="pieceReference"
                      value={formData.pieceReference}
                      onChange={(e) =>
                        handleFieldChange('pieceReference', e.target.value)
                      }
                      className="w-full px-4 py-3.5 bg-black text-white border border-white/35 font-sans text-sm focus:outline-none focus:border-white transition-colors"
                    >
                      {PIECE_OPTIONS.map((option) => (
                        <option key={option} value={option} className="bg-black text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label
                      htmlFor="commission-description"
                      className="block font-mono text-xs uppercase tracking-[0.18em] text-white mb-2"
                    >
                      Commission Brief &amp; Proportions{' '}
                      <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="commission-description"
                      name="description"
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) =>
                        handleFieldChange('description', e.target.value)
                      }
                      aria-invalid={Boolean(validation.errors.description)}
                      aria-describedby={
                        validation.errors.description
                          ? 'commission-description-error'
                          : 'commission-description-hint'
                      }
                      placeholder="Describe the piece, including your ring size or chain length if known..."
                      className={`w-full px-4 py-3.5 bg-black text-white placeholder:text-white/35 border font-sans text-sm leading-relaxed focus:outline-none focus:border-white transition-colors ${
                        validation.errors.description
                          ? 'border-white'
                          : 'border-white/35'
                      }`}
                    />
                    <p
                      id="commission-description-hint"
                      className="mt-1.5 font-mono text-xs text-white/55"
                    >
                      Minimum 15 characters. Include ring size or chain drop if
                      known.
                    </p>
                    {validation.errors.description && (
                      <p
                        id="commission-description-error"
                        role="alert"
                        className="mt-2 font-mono text-xs text-white flex items-center gap-2"
                      >
                        <span aria-hidden="true">!</span>
                        <span>{validation.errors.description}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit & Demonstration Notice */}
                  <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs font-mono text-white/65 leading-relaxed max-w-sm">
                      Demonstration mode: submitting previews your formatted
                      commission brief locally without sending an external email.
                    </p>

                    <button
                      type="submit"
                      className="px-7 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
                    >
                      Submit commission enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
