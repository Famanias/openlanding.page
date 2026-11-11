'use client';

import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EnvelopeEntry } from './components/postmark/EnvelopeEntry';
import { PostmarkHeader } from './components/postmark/PostmarkHeader';
import { HeroDesk } from './components/postmark/HeroDesk';
import { KeepsakeManifesto } from './components/postmark/KeepsakeManifesto';
import { PostcardBuilderStory } from './components/postmark/PostcardBuilderStory';
import { MemoryMap } from './components/postmark/MemoryMap';
import { StampDesk } from './components/postmark/StampDesk';
import { TravelFilmstrip } from './components/postmark/TravelFilmstrip';
import { FinalLetterFooter } from './components/postmark/FinalLetterFooter';
import { ensureGsapRegistered, shouldSkipEntryIntro } from './lib/postmark/motion';

export default function PostmarkApp() {
  const [introReady, setIntroReady] = useState<boolean>(() => shouldSkipEntryIntro());
  const [introFinished, setIntroFinished] = useState<boolean>(() => shouldSkipEntryIntro());

  const handleIntroHandoff = useCallback(() => {
    setIntroReady(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroReady(true);
    setIntroFinished(true);
  }, []);

  useEffect(() => {
    ensureGsapRegistered();
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => window.clearTimeout(timer);
  }, [introFinished]);

  return (
    <div className="min-h-screen w-full bg-[var(--pm-paper)] text-[var(--pm-ink)] selection:bg-[var(--pm-peach)] selection:text-[var(--pm-ink)]">
      {/* Chapter 00: Signature Opening Envelope Sequence */}
      {!introFinished && (
        <EnvelopeEntry
          onHandoff={handleIntroHandoff}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Integrated Editorial Top Bar */}
      <PostmarkHeader introReady={introReady} />

      {/* Continuous Scroll-Choreographed 7-Chapter Presentation */}
      <main id="pm-main">
        {/* Chapter 01: Hero — Collect Places. Keep Stories. */}
        <HeroDesk introReady={introReady} />

        {/* Chapter 02: The Keepsake Manifesto */}
        <KeepsakeManifesto />

        {/* Chapter 03: The Postcard Builder (3 Pinned Scroll Stages: Choose -> Write -> Stamp) */}
        <PostcardBuilderStory />

        {/* Chapter 04: The Memory Map */}
        <MemoryMap />

        {/* Chapter 05: The Stamp Desk */}
        <StampDesk />

        {/* Chapter 06: Travel Filmstrip */}
        <TravelFilmstrip />
      </main>

      {/* Chapter 07: The Final Letter CTA + Torn Paper Transition + True Footer */}
      <FinalLetterFooter />
    </div>
  );
}
