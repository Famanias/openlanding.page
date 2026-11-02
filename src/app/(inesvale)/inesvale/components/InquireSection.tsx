import React, { useState } from 'react';
import {
  InquiryFormInput,
  InquiryValidationErrors,
  validateInquiryForm,
  buildInquiryMailtoUrl
} from '../utils/portfolioLogic';

interface InquireSectionProps {
  onNavigate: (sectionId: string) => void;
}

const PROJECT_TYPES = [
  'Editorial Commission',
  'Fine Art Print Acquisition',
  'Architectural Monograph',
  'Exhibition / Curatorial Loan',
  'Personal Portrait Sitting'
];

export const InquireSection: React.FC<InquireSectionProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState<InquiryFormInput>({
    name: '',
    email: '',
    projectType: 'Editorial Commission',
    timeline: '',
    message: ''
  });
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [draftUrl, setDraftUrl] = useState<string | null>(null);

  const handleFieldChange = (
    field: keyof InquiryFormInput,
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof InquiryValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setDraftUrl(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateInquiryForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setDraftUrl(null);
      return;
    }
    setErrors({});
    const mailto = buildInquiryMailtoUrl(formState);
    setDraftUrl(mailto);
    // Trigger native mailto draft cleanly without window.open popup blocking
    window.location.href = mailto;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="inquire"
      aria-labelledby="inquire-heading"
      className="w-full px-5 sm:px-8 lg:px-14 pt-20 lg:pt-28 pb-14 border-t border-[#BFB7AC] bg-[#F2ECE0]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pb-20 border-b border-[#BFB7AC]">
        {/* Left Closing Editorial Call */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-4 tabular-nums">
              07 — INQUIRE & CORRESPONDENCE
            </p>
            <h2
              id="inquire-heading"
              className="font-serif-editorial text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-[-0.02em] text-[#201C19] leading-[0.96] uppercase"
              style={{ textWrap: 'balance' }}
            >
              LET&apos;S MAKE SOMETHING WORTH REMEMBERING.
            </h2>

            <div className="mt-5 mb-8" aria-hidden="true">
              <div className="w-16 h-[3px] bg-[#A65D46]" />
            </div>

            <p className="text-[15.5px] leading-[1.6] text-[#201C19]/85 max-w-[430px]">
              For editorial assignments, monograph collaborations, or signed archival pigment prints from the collection, prepare a correspondence draft below or write directly to the studio.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-[#BFB7AC]/70 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px]">
            <div>
              <p className="text-[10.5px] tracking-[0.08em] uppercase text-[#79756F] mb-1">
                DIRECT STUDIO DESK
              </p>
              <a
                href="mailto:studio@inesvale.studio"
                className="ink-link text-[#201C19] font-medium"
              >
                studio@inesvale.studio
              </a>
              <p className="text-[#79756F] mt-1">Lisbon · Rua da Escola Politécnica</p>
            </div>

            <div>
              <p className="text-[10.5px] tracking-[0.08em] uppercase text-[#79756F] mb-1">
                PRINT EDITIONS & LICENSING
              </p>
              <p className="text-[#201C19]">Archival Cotton Rag · Editions of 7 + 2 AP</p>
              <p className="text-[#79756F] mt-1">Certificate of Authenticity included</p>
            </div>
          </div>
        </div>

        {/* Right Honest Inquiry Form -> Pre-filled Mailto Draft */}
        <div className="lg:col-span-6 bg-[#F7F4ED] border border-[#BFB7AC] p-6 sm:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#BFB7AC]/60 pb-3">
              <span className="text-[11px] tracking-[0.08em] uppercase text-[#201C19]">
                STUDIO INQUIRY SHEET
              </span>
              <span className="text-[10.5px] tracking-[0.06em] uppercase text-[#79756F]">
                PRE-FILLED EMAIL DRAFT
              </span>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
              >
                YOUR NAME OR STUDIO *
              </label>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="e.g. Clara Mendes / Atelier Sul"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                className="w-full bg-transparent border-b border-[#BFB7AC] focus:border-[#A65D46] py-2.5 text-[15px] text-[#201C19] placeholder:text-[#79756F]/60 focus:outline-none transition-colors"
              />
              {errors.name && (
                <p
                  id="inquiry-name-error"
                  role="alert"
                  className="mt-1.5 text-[12px] text-[#A65D46]"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
              >
                RETURN EMAIL ADDRESS *
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="name@publication.org"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                className="w-full bg-transparent border-b border-[#BFB7AC] focus:border-[#A65D46] py-2.5 text-[15px] text-[#201C19] placeholder:text-[#79756F]/60 focus:outline-none transition-colors"
              />
              {errors.email && (
                <p
                  id="inquiry-email-error"
                  role="alert"
                  className="mt-1.5 text-[12px] text-[#A65D46]"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Project Type & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="inquiry-type"
                  className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
                >
                  NATURE OF INQUIRY *
                </label>
                <select
                  id="inquiry-type"
                  name="projectType"
                  value={formState.projectType}
                  onChange={(e) => handleFieldChange('projectType', e.target.value)}
                  className="w-full bg-[#F7F4ED] border-b border-[#BFB7AC] focus:border-[#A65D46] py-2.5 text-[14.5px] text-[#201C19] focus:outline-none"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-timeline"
                  className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
                >
                  PROPOSED TIMELINE / EDITION
                </label>
                <input
                  id="inquiry-timeline"
                  name="timeline"
                  type="text"
                  value={formState.timeline}
                  onChange={(e) => handleFieldChange('timeline', e.target.value)}
                  placeholder="e.g. Winter 2026 / Plate I"
                  className="w-full bg-transparent border-b border-[#BFB7AC] focus:border-[#A65D46] py-2.5 text-[15px] text-[#201C19] placeholder:text-[#79756F]/60 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="inquiry-message"
                className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
              >
                PROJECT NOTES OR PRINT SPECIFICATION *
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={4}
                required
                value={formState.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                placeholder="Share location, publication context, or archival plate number..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                className="w-full bg-transparent border-b border-[#BFB7AC] focus:border-[#A65D46] py-2 text-[15px] text-[#201C19] placeholder:text-[#79756F]/60 focus:outline-none transition-colors resize-y"
              />
              {errors.message && (
                <p
                  id="inquiry-message-error"
                  role="alert"
                  className="mt-1.5 text-[12px] text-[#A65D46]"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honest Mailto Action */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                className="min-h-[46px] px-7 py-3 bg-[#201C19] text-[#F2ECE0] hover:bg-[#A65D46] text-[12px] tracking-[0.08em] uppercase transition-colors whitespace-nowrap shrink-0"
              >
                OPEN EMAIL DRAFT ↗
              </button>
              <span className="text-[11.5px] text-[#79756F]">
                Opens your default mail client with a formatted inquiry to studio@inesvale.studio.
              </span>
            </div>

            {/* Prepared Mailto Link Confirmation Box */}
            {draftUrl && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 p-4 border border-[#A65D46]/60 bg-[#F2ECE0] text-[13px] text-[#201C19] space-y-2"
              >
                <p className="font-medium text-[#201C19]">
                  Email draft prepared for {formState.name} ({formState.projectType}).
                </p>
                <p className="text-[12px] text-[#79756F]">
                  If your mail client did not launch automatically, use the direct link below:
                </p>
                <a
                  href={draftUrl}
                  className="inline-block text-[11.5px] tracking-[0.07em] uppercase text-[#A65D46] underline"
                >
                  LAUNCH MAILTO DRAFT FOR STUDIO@INESVALE.STUDIO ↗
                </a>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Footer Colophon */}
      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[11.5px] tracking-[0.05em] uppercase text-[#79756F]">
        <div className="flex items-center gap-3 tabular-nums">
          <span className="font-serif-editorial text-lg text-[#201C19] tracking-tight">
            INES VALE
          </span>
          <span aria-hidden="true">·</span>
          <span>© {currentYear} INES VALE STUDIO</span>
        </div>

        <nav aria-label="Footer Anchor Navigation" className="flex flex-wrap items-center gap-6">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            TOP ↑
          </a>
          <a
            href="#stories"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('stories');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            STORIES
          </a>
          <a
            href="#archive"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('archive');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            ARCHIVE
          </a>
          <a
            href="#closer-look"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('closer-look');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            METHOD
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            ARTIST
          </a>
          <a
            href="#notes"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('notes');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            NOTES
          </a>
        </nav>
      </div>
    </footer>
  );
};
