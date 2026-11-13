'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import {
  InquiryFormInput,
  validateInquiryForm,
} from '../domain/tesseraSystem';
import { MagneticButton, usePrefersReducedMotion } from './InteractivePrimitives';

gsap.registerPlugin(ScrollTrigger);

interface CommissionFooterSectionProps {
  attachedSpecSummary: string;
  suggestedAreaSqM: number;
}

const PROJECT_TYPOLOGIES = [
  'Cultural & Auditorium',
  'Museum & Gallery Atrium',
  'Commercial Executive Headquarters',
  'Hospitality & Fine Dining',
  'Higher Education & Library',
  'Private Residence',
] as const;

export const CommissionFooterSection: React.FC<CommissionFooterSectionProps> = ({
  attachedSpecSummary,
  suggestedAreaSqM,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<InquiryFormInput>({
    architectName: '',
    firmOrStudio: '',
    workEmail: '',
    projectTypology: 'Cultural & Auditorium',
    targetAreaSqM: String(suggestedAreaSqM),
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormInput, string>>>({});
  const [submittedDossier, setSubmittedDossier] = useState<{
    referenceCode: string;
    input: InquiryFormInput;
    spec: string;
  } | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Sync suggested area when configurator transfers spec
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      targetAreaSqM: String(suggestedAreaSqM),
    }));
  }, [suggestedAreaSqM]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotateX: 9, y: 48, opacity: 0, transformPerspective: 1200 },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateInquiryForm(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const deterministicHash = Math.abs(
      form.workEmail.split('').reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7),
    )
      .toString(36)
      .slice(0, 5)
      .toUpperCase();

    setSubmittedDossier({
      referenceCode: `TSR-${deterministicHash}`,
      input: { ...form },
      spec: attachedSpecSummary,
    });
  };

  return (
    <div ref={sectionRef} className="bg-[#0B0D10] border-t border-slate-200/10">
      {/* Final Cinematic Commission CTA */}
      <section id="inquire" className="py-24 sm:py-32">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div
            ref={cardRef}
            className="bg-[#111419] border border-slate-200/12 rounded-2xl p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
          >
            {/* Left Architectural Proposition */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1.08] font-normal text-[#F8FAFC]">
                Plan your space.
              </h2>

              <p className="text-[15px] leading-[1.7] text-[#94A3B8]">
                Choose your finishes and prepare a sample request with your wall specification.
              </p>

              <details className="pt-4 border-t border-slate-200/10 text-xs font-mono-tabular text-[#94A3B8]">
                <summary className="text-[#E2C399] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Your wall specification</summary>
                <p className="mt-3 leading-relaxed whitespace-pre-line text-[#CBD5E1]">
                  {attachedSpecSummary.split('\n').slice(1, 5).join('\n')}
                </p>
              </details>
            </div>

            {/* Right Validated Architectural Request Form */}
            <div className="lg:col-span-7 bg-[#0B0D10] border border-slate-200/10 rounded-xl p-6 sm:p-8">
              {submittedDossier ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="space-y-6 py-4"
                >
                  <div className="flex items-center gap-3 text-[#E2C399]">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <span className="font-mono-tabular text-xs tracking-wider">
                      Sample request prepared: {submittedDossier.referenceCode}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl text-[#F8FAFC]">
                    Thank you, {submittedDossier.input.architectName}.
                  </h3>

                  <p className="text-sm leading-relaxed text-[#94A3B8]">
                    Your request is ready below. This demo does not send emails or ship samples.
                  </p>

                  <pre className="bg-[#111419] border border-slate-200/10 rounded-lg p-4 text-xs font-mono-tabular text-[#CBD5E1] whitespace-pre-wrap">
                    {submittedDossier.spec}
                  </pre>

                  <button
                    type="button"
                    onClick={() => setSubmittedDossier(null)}
                    className="px-4 py-2 text-xs font-medium rounded-md border border-slate-200/15 text-[#CBD5E1] hover:border-[#C89D66] transition-colors cursor-pointer"
                  >
                    Start another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="architect-name"
                        className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="architect-name"
                        type="text"
                        value={form.architectName}
                        aria-invalid={Boolean(errors.architectName)}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, architectName: e.target.value }))
                        }
                        placeholder="Astrid Lindqvist"
                        className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C89D66]"
                      />
                      {errors.architectName && (
                        <p className="mt-1 text-xs text-amber-300" role="alert">
                          {errors.architectName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="firm-studio"
                        className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                      >
                        Studio *
                      </label>
                      <input
                        id="firm-studio"
                        type="text"
                        value={form.firmOrStudio}
                        aria-invalid={Boolean(errors.firmOrStudio)}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, firmOrStudio: e.target.value }))
                        }
                        placeholder="Lindqvist & Partner Arkitekter"
                        className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C89D66]"
                      />
                      {errors.firmOrStudio && (
                        <p className="mt-1 text-xs text-amber-300" role="alert">
                          {errors.firmOrStudio}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="work-email"
                        className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="work-email"
                        type="email"
                        value={form.workEmail}
                        aria-invalid={Boolean(errors.workEmail)}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, workEmail: e.target.value }))
                        }
                        placeholder="astrid@studio.no"
                        className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C89D66]"
                      />
                      {errors.workEmail && (
                        <p className="mt-1 text-xs text-amber-300" role="alert">
                          {errors.workEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="target-area"
                        className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                      >
                        Wall area (m²) *
                      </label>
                      <input
                        id="target-area"
                        type="number"
                        min={1}
                        step="0.1"
                        value={form.targetAreaSqM}
                        aria-invalid={Boolean(errors.targetAreaSqM)}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, targetAreaSqM: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 text-sm font-mono-tabular rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] focus:outline-none focus:border-[#C89D66]"
                      />
                      {errors.targetAreaSqM && (
                        <p className="mt-1 text-xs text-amber-300" role="alert">
                          {errors.targetAreaSqM}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="project-typology"
                      className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                    >
                      Space type *
                    </label>
                    <select
                      id="project-typology"
                      value={form.projectTypology}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, projectTypology: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] focus:outline-none focus:border-[#C89D66]"
                    >
                      {PROJECT_TYPOLOGIES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="project-notes"
                      className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                    >
                      Project notes (optional)
                    </label>
                    <textarea
                      id="project-notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      placeholder="Tell us about your space."
                      className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C89D66]"
                    />
                  </div>

                  <div className="pt-2">
                    <p className="mb-3 text-xs text-[#94A3B8]">Demo form. No request is sent.</p>
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      className="w-full sm:w-auto justify-center"
                    >
                      Prepare sample request
                      <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Architectural Footer */}
      <footer className="border-t border-slate-200/10 py-14 bg-[#0B0D10]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <a
              href="#hero"
              className="font-display text-2xl font-semibold tracking-[0.14em] text-[#F8FAFC]"
            >
              TESSERA
            </a>
            <p className="text-xs text-[#94A3B8]">
              Sound, shaped by design.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-xs text-[#94A3B8]"
          >
            <a href="#philosophy" className="hover:text-[#F1F5F9] transition-colors">
              Philosophy
            </a>
            <a href="#system" className="hover:text-[#F1F5F9] transition-colors">
              System
            </a>
            <a href="#materials" className="hover:text-[#F1F5F9] transition-colors">
              Materials
            </a>
            <a href="#projects" className="hover:text-[#F1F5F9] transition-colors">
              Projects
            </a>
            <a href="#configurator" className="hover:text-[#F1F5F9] transition-colors">
              Configurator
            </a>
          </nav>

          <div className="text-xs text-[#64748B] font-mono-tabular">
            © {currentYear} Tessera Acoustic Systems AG · Zürich &amp; Copenhagen
          </div>
        </div>
      </footer>
    </div>
  );
};
