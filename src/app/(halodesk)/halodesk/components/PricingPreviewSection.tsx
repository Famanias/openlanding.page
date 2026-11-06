import React, { useState } from 'react';
import { ArrowUp, Check, Sparkles, Monitor, Play, X } from 'lucide-react';
import { validateEarlyAccessEmail } from '../lib/plannerLogic';
import { HaloLogoIcon } from './Navbar';

interface PricingPreviewSectionProps {
  modalState: { open: boolean; mode: 'download' | 'login' | 'start' };
  onOpenModal: (mode: 'download' | 'login' | 'start') => void;
  onCloseModal: () => void;
}

export const PricingPreviewSection: React.FC<PricingPreviewSectionProps> = ({
  modalState,
  onOpenModal,
  onCloseModal,
}) => {
  // Inline Section G Early Access Local Demo Form
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePlatform, setInlinePlatform] = useState<'macOS' | 'Windows' | 'Linux'>('macOS');
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  // Modal Form state
  const [modalEmail, setModalEmail] = useState('');
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSaved, setModalSaved] = useState(false);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateEarlyAccessEmail(inlineEmail);
    if (!check.valid) {
      setInlineError(check.error || 'Invalid email');
      return;
    }
    setInlineError(null);
    setInlineSubmitted(true);
    try {
      localStorage.setItem(
        'halo_desk_demo_interest',
        JSON.stringify({ email: inlineEmail.trim(), platform: inlinePlatform })
      );
    } catch {
      // Ignore storage errors in restricted environments
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateEarlyAccessEmail(modalEmail);
    if (!check.valid) {
      setModalError(check.error || 'Invalid email');
      return;
    }
    setModalError(null);
    setModalSaved(true);
  };

  return (
    <>
      {/* SECTION G — Pricing / Honest Product Preview */}
      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
      >
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
            Product Access & Preview Status
          </p>
          <h2
            id="pricing-heading"
            className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
          >
            Explore the interactive preview right here.
          </h2>
          <p className="text-[16px] text-[#556070] leading-[1.6]">
            Halo Desk is a concept desktop productivity environment in interactive preview. There are no paywalls, subscriptions, or binary installers required to try the full interface on this page.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Interactive On-Page Preview */}
          <div className="lg:col-span-6 rounded-[24px] bg-[#FCFBF7] border border-[#3A4453]/14 p-7 sm:p-9 flex flex-col justify-between shadow-[0_18px_40px_-18px_rgba(41,49,62,0.1)]">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#29313E]">
                  Interactive Web Preview
                </span>
                <span className="text-[12px] font-mono-tabular text-[#4E5A6E] bg-[#D0EFE2]/70 px-3 py-1 rounded-full">
                  Available now on this page
                </span>
              </div>

              <h3 className="text-[26px] font-semibold text-[#29313E] tracking-[-0.02em]">
                Explore the live miniature workspace
              </h3>

              <p className="text-[15px] text-[#556070] leading-relaxed">
                Test task creation, weekday switching, the 25:00 Focus Timer, editable sticky notes, and template presets directly in your browser. All changes stay locally in your session.
              </p>

              <ul className="space-y-2.5 pt-2 text-[14px] text-[#29313E]">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                  <span>Full interactive Hero Planner & Quick Task creator</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                  <span>Real-time 25:00 Focus Timer ring with presets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                  <span>Four one-click weekly rhythm templates</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#home"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#29313E] hover:bg-[#3A4556] text-[#FCFBF7] text-[14.5px] font-medium transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Explore the demo above</span>
              </a>
            </div>
          </div>

          {/* Card 2: Desktop Early Access Preview Form (Explicit Local Demo) */}
          <div className="lg:col-span-6 rounded-[24px] bg-[#F4F2F7]/90 border border-[#3A4453]/14 p-7 sm:p-9 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#29313E]">
                  Desktop Early Access
                </span>
                <span className="text-[12px] font-mono-tabular text-[#4E5A6E] bg-[#DCD5F6]/70 px-3 py-1 rounded-full">
                  Local demonstration
                </span>
              </div>

              <h3 className="text-[26px] font-semibold text-[#29313E] tracking-[-0.02em]">
                Get early access updates
              </h3>

              <p className="text-[15px] text-[#556070] leading-relaxed">
                Curious about a standalone desktop build? Choose your preferred operating system and test our early-access registration flow below. (Note: this form is a local UI demonstration and does not transmit your email to an external server.)
              </p>

              {/* OS Selector */}
              <div className="flex items-center gap-2 pt-1" role="group" aria-label="Preferred desktop platform">
                {(['macOS', 'Windows', 'Linux'] as const).map((os) => (
                  <button
                    key={os}
                    type="button"
                    aria-pressed={inlinePlatform === os}
                    onClick={() => setInlinePlatform(os)}
                    className={`px-3.5 py-1.5 rounded-xl text-[13px] font-medium border transition-colors cursor-pointer ${
                      inlinePlatform === os
                        ? 'bg-[#29313E] text-white border-[#29313E]'
                        : 'bg-white/80 text-[#556070] border-[#3A4453]/12 hover:text-[#29313E]'
                    }`}
                  >
                    {os}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              {!inlineSubmitted ? (
                <form onSubmit={handleInlineSubmit} noValidate className="space-y-2.5">
                  <label htmlFor="early-access-email" className="block text-[12.5px] font-medium text-[#29313E]">
                    Email address (stored locally in browser preview only)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      id="early-access-email"
                      type="email"
                      value={inlineEmail}
                      onChange={(e) => {
                        setInlineEmail(e.target.value);
                        if (inlineError) setInlineError(null);
                      }}
                      placeholder="you@studio.com"
                      className="flex-1 px-4 py-3 rounded-full bg-white border border-[#3A4453]/20 text-[14px] text-[#29313E] placeholder:text-[#66717F] focus:outline-2 focus:outline-[#29313E]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[#6C798F] hover:bg-[#596579] text-[#FCFBF7] text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Get early access
                    </button>
                  </div>
                  {inlineError && (
                    <p role="alert" className="text-[12.5px] text-[#B84A39] pl-2">
                      {inlineError}
                    </p>
                  )}
                </form>
              ) : (
                <div
                  role="status"
                  className="p-4 rounded-2xl bg-[#D0EFE2]/70 border border-[#95D3BD] text-[#232A36] text-[13.5px] flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold">Local preview note saved for {inlinePlatform}</p>
                    <p className="text-[12.5px] text-[#3A4453] mt-0.5">
                      Recorded <span className="font-mono-tabular">{inlineEmail}</span> in local demo state only—no external email was sent.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setInlineSubmitted(false);
                      setInlineEmail('');
                    }}
                    className="text-[12px] font-semibold underline shrink-0 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H — Final CTA and Footer */}
      <footer
        id="contact"
        className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 pb-16 overflow-hidden"
      >
        {/* Final CTA Block with Softly Rising Gradient Halo Ring */}
        <div className="relative rounded-[28px] bg-[#FCFBF7]/85 border border-[#3A4453]/12 px-6 py-16 sm:py-20 text-center overflow-hidden shadow-[0_24px_60px_-24px_rgba(41,49,62,0.1)]">
          {/* Rising Gradient Halo Ring Bookend */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-28 -translate-x-1/2 w-[480px] h-[480px] rounded-full border-[28px] border-[#DCD5F6]/50 bg-gradient-to-t from-[#D0EFE2]/35 via-[#CFDFEF]/30 to-transparent blur-[2px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-20 -translate-x-1/2 w-[340px] h-[340px] rounded-full border-[1.5px] border-[#6C798F]/25"
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#F8F5EE] border border-[#3A4453]/12 shadow-xs">
              <HaloLogoIcon className="w-7 h-7" />
            </div>

            <h2 className="text-[34px] sm:text-[46px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.08] text-balance">
              Make space for your best work.
            </h2>

            <p className="text-[16px] text-[#556070] leading-[1.6]">
              Experience how a calmer daily planner feels—right inside the interactive desktop preview on this page.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenModal('download')}
                className="px-6 py-3.5 rounded-full bg-[#29313E] hover:bg-[#3A4556] text-[#FCFBF7] text-[15px] font-medium transition-all shadow-[0_10px_24px_-8px_rgba(41,49,62,0.3)] cursor-pointer"
              >
                Preview Desktop Access
              </button>
              <a
                href="#home"
                className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white border border-[#3A4453]/18 text-[#29313E] text-[15px] font-medium transition-colors inline-flex items-center gap-2"
              >
                <span>Back to top planner</span>
                <ArrowUp className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Columns: Product, Explore, Support */}
        <div className="mt-16 pt-10 border-t border-[#3A4453]/12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-3">
            <a href="#home" className="inline-flex items-center gap-2.5 text-[#29313E]">
              <HaloLogoIcon className="w-6 h-6" />
              <span className="text-[19px] font-medium tracking-[-0.02em]">Halo Desk</span>
            </a>
            <p className="text-[14px] text-[#556070] max-w-xs leading-relaxed">
              Clear priorities, calm momentum. A desktop productivity app showcase for focused planning, gentle rhythms, and structured days.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-[14px]">
            <div className="space-y-2.5">
              <p className="font-semibold text-[#29313E]">Product</p>
              <ul className="space-y-2 text-[#556070]">
                <li>
                  <a href="#home" className="hover:text-[#29313E] transition-colors">
                    Mini Desktop App
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#29313E] transition-colors">
                    The Calm System
                  </a>
                </li>
                <li>
                  <a href="#lab" className="hover:text-[#29313E] transition-colors">
                    Feature Lab
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="font-semibold text-[#29313E]">Explore</p>
              <ul className="space-y-2 text-[#556070]">
                <li>
                  <a href="#workflow" className="hover:text-[#29313E] transition-colors">
                    Daily Workflow
                  </a>
                </li>
                <li>
                  <a href="#templates" className="hover:text-[#29313E] transition-colors">
                    Starter Templates
                  </a>
                </li>
                <li>
                  <a href="#details" className="hover:text-[#29313E] transition-colors">
                    Interface Craft
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="font-semibold text-[#29313E]">Support</p>
              <ul className="space-y-2 text-[#556070]">
                <li>
                  <a href="#pricing" className="hover:text-[#29313E] transition-colors">
                    Preview Status
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal('start')}
                    className="hover:text-[#29313E] transition-colors cursor-pointer"
                  >
                    Early Access Info
                  </button>
                </li>
                <li>
                  <a href="#home" className="hover:text-[#29313E] transition-colors inline-flex items-center gap-1">
                    <span>Back to top</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#3A4453]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-[#66717F]">
          <p>© 2026 Halo Desk. Interactive concept & functional web showcase.</p>
          <p>Designed with warm ivory space & calm motion.</p>
        </div>
      </footer>

      {/* Honest Early Access / Download Preview Dialog */}
      {modalState.open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="early-access-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29313E]/35 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-[#FCFBF7] border border-[#3A4453]/15 p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#DCD5F6]/70 flex items-center justify-center text-[#29313E]">
                  <Monitor className="w-4 h-4" />
                </span>
                <div>
                  <h3
                    id="early-access-dialog-title"
                    className="text-[18px] font-semibold text-[#29313E]"
                  >
                    {modalState.mode === 'download'
                      ? 'Desktop Preview Status'
                      : modalState.mode === 'login'
                      ? 'Local Session Preview'
                      : 'Start Free in Browser Preview'}
                  </h3>
                  <p className="text-[12px] text-[#66717F]">
                    Honest product preview · No binary download required
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close preview dialog"
                onClick={() => {
                  onCloseModal();
                  setModalError(null);
                }}
                className="p-1.5 rounded-lg text-[#66717F] hover:text-[#29313E] hover:bg-black/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[14px] text-[#556070] leading-relaxed">
              Halo Desk is an interactive product showcase. Rather than downloading a mock installer file, the complete miniature desktop workspace is live right on this page—including task creation, completion, focus timer, and templates.
            </p>

            {!modalSaved ? (
              <form onSubmit={handleModalSubmit} noValidate className="space-y-3 pt-1">
                <label
                  htmlFor="modal-preview-email"
                  className="block text-[12.5px] font-medium text-[#29313E]"
                >
                  Save a local early-access bookmark (stays in this browser):
                </label>
                <input
                  id="modal-preview-email"
                  type="email"
                  value={modalEmail}
                  onChange={(e) => {
                    setModalEmail(e.target.value);
                    if (modalError) setModalError(null);
                  }}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#3A4453]/20 text-[13.5px] text-[#29313E] focus:outline-2 focus:outline-[#29313E]"
                />
                {modalError && (
                  <p role="alert" className="text-[12px] text-[#B84A39]">
                    {modalError}
                  </p>
                )}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onCloseModal}
                    className="px-4 py-2 rounded-full text-[13px] font-medium text-[#556070] hover:text-[#29313E] cursor-pointer"
                  >
                    Return to Live Demo
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#29313E] hover:bg-[#3A4556] text-white text-[13px] font-medium cursor-pointer"
                  >
                    Save Local Note
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3.5 rounded-xl bg-[#D0EFE2]/70 border border-[#95D3BD] text-[13px] text-[#232A36] space-y-2">
                <p className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Saved locally for {modalEmail}
                </p>
                <p className="text-[12px] text-[#3A4453]">
                  This is a local browser demonstration; no external server request was sent.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModalSaved(false);
                    onCloseModal();
                  }}
                  className="mt-1 px-4 py-1.5 rounded-full bg-[#29313E] text-white text-[12px] font-medium cursor-pointer"
                >
                  Explore Hero Workspace
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
