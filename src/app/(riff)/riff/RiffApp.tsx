'use client';

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ManifestoAndHowItWorks } from './components/ManifestoAndHowItWorks';
import { TasteMatcherSection } from './components/TasteMatcherSection';
import { ChemistryAndSceneSections } from './components/ChemistryAndSceneSections';
import { StoriesAndFooter } from './components/StoriesAndFooter';
import { HandStar, WaveformLogo } from './components/ZineMotifs';
import { validatePreviewPass } from './utils/matching';

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Honest Preview / Early-Access Modal State
  const [previewModalSource, setPreviewModalSource] = useState<string | null>(null);
  const [passHandle, setPassHandle] = useState<string>('');
  const [passRecord, setPassRecord] = useState<string>('');
  const [passError, setPassError] = useState<string | null>(null);
  const [stampedPass, setStampedPass] = useState<{
    handle: string;
    record: string;
    serial: string;
  } | null>(null);

  const handleOpenPreview = (source: string) => {
    setPreviewModalSource(source);
    setPassError(null);
  };

  const handleClosePreview = () => {
    setPreviewModalSource(null);
    setPassError(null);
  };

  const handleStampLocalPass = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validatePreviewPass(passHandle, passRecord);
    if (!check.valid) {
      setPassError(check.error || 'Please fill in both fields.');
      return;
    }
    setPassError(null);
    setStampedPass({
      handle: check.normalizedHandle || passHandle.trim(),
      record: passRecord.trim(),
      serial: `RF-${Math.floor(100000 + (passHandle.length * 7919) % 899999)}`,
    });
  };

  return (
    <div
      className={`min-h-screen bg-[#0B0B0B] text-[#F4F0E8] relative selection:bg-[#C92533] selection:text-[#F4F0E8] ${
        !motionEnabled ? 'motion-paused' : ''
      }`}
    >
      {/* Fixed Subtle Analog Grain Overlay (pointer-events-none) */}
      <div aria-hidden="true" className="riff-grain-overlay fixed inset-0 z-40" />

      {/* ====================================================================
          TOP NAVIGATION BAR (3-Zone Contract matching riff-reference.png)
         ==================================================================== */}
      <header className="sticky top-0 z-50 bg-[#0B0B0B]/92 backdrop-blur-md border-b border-[#F4F0E8]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Drawn Waveform */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-[#F4F0E8] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <WaveformLogo className="w-9 h-8" />
            <span className="font-editorial font-black text-[1.95rem] tracking-[-0.03em] leading-none">
              Riff
            </span>
          </a>

          {/* Zone 2: Spaced Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 lg:gap-11 text-[0.95rem] font-normal text-[#F4F0E8]/90"
          >
            <a
              href="#how-it-works"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#taste-matcher"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Matches
            </a>
            <a
              href="#playlists"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Playlists
            </a>
            <a
              href="#stories"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Stories
            </a>
            <button
              type="button"
              onClick={() => handleOpenPreview('Top Nav — Sign In Preview')}
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sign In
            </button>
          </nav>

          {/* Zone 3: Rectangular Red Primary Action ("Join Riff") */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenPreview('Top Nav — Join Riff')}
              className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] font-medium text-[0.95rem] px-5 py-2.5 rounded-[4px] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Join Riff
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile navigation menu"
              className="md:hidden p-2 text-[#F4F0E8] border border-[#F4F0E8]/25 rounded-[3px]"
            >
              <span className="font-mono-code text-xs uppercase">
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden bg-[#141414] border-b border-[#F4F0E8]/20 px-5 py-4 flex flex-col gap-3 text-sm"
          >
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              How It Works
            </a>
            <a
              href="#taste-matcher"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Matches (Interactive Demo)
            </a>
            <a
              href="#playlists"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Playlists
            </a>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Stories
            </a>
            <div className="pt-2 border-t border-[#F4F0E8]/15 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenPreview('Mobile Nav — Sign In Preview');
                }}
                className="text-xs font-mono-code uppercase text-[#AAA8A6] hover:text-[#F4F0E8]"
              >
                Sign In (Preview)
              </button>
              <button
                type="button"
                onClick={() => setMotionEnabled((m) => !m)}
                className="text-xs font-mono-code uppercase text-[#C92533]"
              >
                {motionEnabled ? 'Pause Motion' : 'Resume Motion'}
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* ====================================================================
          MAIN EIGHT-SCENE ZINE NARRATIVE
         ==================================================================== */}
      <main>
        {/* Section A: Hero — Two phones, one chemistry */}
        <HeroSection
          motionEnabled={motionEnabled}
          onOpenPreviewModal={handleOpenPreview}
        />

        {/* Section B: Manifesto & Section C: How It Works */}
        <ManifestoAndHowItWorks />

        {/* Section D: Interactive Taste Matcher */}
        <TasteMatcherSection />

        {/* Section E: Music Chemistry & Section F: The Scene / Playlist Wall */}
        <ChemistryAndSceneSections />

        {/* Section G: Stories & Values + Section H: Final CTA & Footer */}
        <StoriesAndFooter
          motionEnabled={motionEnabled}
          onToggleMotion={() => setMotionEnabled((m) => !m)}
          onOpenPreviewModal={handleOpenPreview}
        />
      </main>

      {/* ====================================================================
          HONEST PREVIEW / EARLY ACCESS STATUS DIALOG
         ==================================================================== */}
      {previewModalSource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg bg-[#141414] border-2 border-[#C92533] rounded-[4px] p-6 sm:p-8 text-[#F4F0E8] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F0E8]/15">
              <span className="text-xs font-mono-code uppercase text-[#C92533] font-bold">
                CONCEPT PREVIEW STATUS · {previewModalSource}
              </span>
              <button
                type="button"
                onClick={handleClosePreview}
                aria-label="Close preview dialog"
                className="px-2 py-0.5 text-sm font-mono-code text-[#AAA8A6] hover:text-[#F4F0E8] border border-transparent hover:border-[#F4F0E8]/30 rounded-[2px] cursor-pointer"
              >
                ESC / &times;
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <HandStar className="w-8 h-8 text-[#C92533] shrink-0" variant={1} />
              <h2
                id="preview-modal-title"
                className="font-editorial font-bold text-2xl sm:text-3xl text-[#F4F0E8]"
              >
                Riff is in interactive concept preview.
              </h2>
            </div>

            <p className="mt-3 text-sm text-[#AAA8A6] leading-relaxed">
              This experience is a live front-end product showcase for <strong className="text-[#F4F0E8]">Riff (18+)</strong>. Native iOS/Android app downloads and live server accounts are not connected yet — we never fake a download or silently send your personal details to a server.
            </p>

            {/* Local-only Backstage Pass Stamper */}
            <form onSubmit={handleStampLocalPass} className="mt-5 space-y-3">
              <div className="text-xs font-mono-code uppercase text-[#F4F0E8]">
                Stamp a local-only backstage pass (stays 100% in your browser):
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="preview-pass-handle"
                    className="block text-[11px] font-mono-code uppercase text-[#AAA8A6] mb-1"
                  >
                    First Name or Zine Alias
                  </label>
                  <input
                    id="preview-pass-handle"
                    type="text"
                    value={passHandle}
                    onChange={(e) => setPassHandle(e.target.value)}
                    placeholder="e.g. Mila"
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#F4F0E8]/30 rounded-[3px] text-sm text-[#F4F0E8] placeholder:text-[#777575]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="preview-pass-record"
                    className="block text-[11px] font-mono-code uppercase text-[#AAA8A6] mb-1"
                  >
                    Zero-Skip Album or Track
                  </label>
                  <input
                    id="preview-pass-record"
                    type="text"
                    value={passRecord}
                    onChange={(e) => setPassRecord(e.target.value)}
                    placeholder="e.g. Punisher / Souvlaki"
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#F4F0E8]/30 rounded-[3px] text-sm text-[#F4F0E8] placeholder:text-[#777575]"
                  />
                </div>
              </div>

              {passError && (
                <p role="alert" className="text-xs font-mono-code text-[#C92533]">
                  {passError}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] text-xs font-mono-code uppercase px-5 py-2.5 rounded-[3px] cursor-pointer"
                >
                  Stamp Local Preview Ticket
                </button>

                <a
                  href="#taste-matcher"
                  onClick={handleClosePreview}
                  className="text-xs font-mono-code uppercase text-[#AAA8A6] hover:text-[#F4F0E8] underline"
                >
                  Or jump to the Taste Matcher &rarr;
                </a>
              </div>
            </form>

            {stampedPass && (
              <div
                role="status"
                className="mt-5 ticket-perforated bg-[#EAE3D5] text-[#0B0B0B] p-4 shadow-xl"
              >
                <div className="border border-[#0B0B0B] p-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono-code uppercase text-[#C92533] font-bold">
                      LOCAL DEMO PASS STAMPED &bull; #{stampedPass.serial}
                    </div>
                    <div className="font-condensed font-extrabold text-xl uppercase mt-0.5">
                      HOLDER: {stampedPass.handle} (18+)
                    </div>
                    <div className="text-xs font-mono-code mt-0.5">
                      ANCHOR RECORD: &ldquo;{stampedPass.record}&rdquo;
                    </div>
                  </div>
                  <div className="text-right font-mono-code text-[9px] uppercase opacity-75">
                    LOCAL MEMORY ONLY
                    <br />
                    MUSIC &gt; LOOKS
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
