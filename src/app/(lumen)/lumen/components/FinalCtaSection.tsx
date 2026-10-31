import React, { useState } from 'react';
import { DownloadForm } from './DownloadForm';

interface FinalCtaSectionProps {
  submittedEmail: string | null;
  lastSubmitTimestamp: number | null;
  onSuccessSubmit: (email: string, timestamp: number) => void;
  onResetSubmit: () => void;
  onOpenPreviewSection: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  submittedEmail,
  lastSubmitTimestamp,
  onSuccessSubmit,
  onResetSubmit,
  onOpenPreviewSection,
}) => {
  const [coverFallback, setCoverFallback] = useState(false);

  return (
    <section
      id="final-download"
      aria-labelledby="final-cta-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="glass-panel-active rounded-3xl p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left 7 Columns: Headline, Supporting Copy, and Synchronized Email Form */}
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-medium text-[#657187]">
                08 · FREE RESOURCE — EDITION 2026
              </p>
              <h2
                id="final-cta-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl lg:text-5xl [text-wrap:balance]"
              >
                Your smarter workflow starts here.
              </h2>
              <p className="mt-4 max-w-xl text-base text-[#657187] leading-relaxed">
                Get the free AI Workflow Playbook and start turning repetitive tasks into clearer, more useful systems.
              </p>

              <div className="mt-8">
                <DownloadForm
                  formId="final-download-form"
                  submittedEmail={submittedEmail}
                  lastSubmitTimestamp={lastSubmitTimestamp}
                  onSuccessSubmit={onSuccessSubmit}
                  onResetSubmit={onResetSubmit}
                  onOpenPreviewSection={onOpenPreviewSection}
                />
              </div>
            </div>

            {/* Right 5 Columns: Floating Representation of Actual Playbook Cover + Translucent Glass Sheets */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px]">
                {/* Back Translucent Glass Sheet 2 */}
                <div
                  aria-hidden="true"
                  data-lm-reveal="rear-sheet-2"
                  className="absolute -right-5 -top-5 h-full w-full pointer-events-none"
                >
                  <div className="glass-panel-subtle h-full w-full rounded-3xl rotate-6 scale-95" />
                </div>
                {/* Middle Translucent Glass Sheet 1 */}
                <div
                  aria-hidden="true"
                  data-lm-reveal="rear-sheet-1"
                  className="absolute -left-4 -bottom-4 h-full w-full pointer-events-none"
                >
                  <div className="glass-panel h-full w-full rounded-3xl -rotate-3 scale-95" />
                </div>
                {/* Front Floating Playbook Cover */}
                <div className="glass-panel-active relative z-10 rounded-3xl p-3 shadow-lg transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="overflow-hidden rounded-2xl border border-white/85 bg-[#F8F9FC]">
                    <img
                      src={
                        coverFallback
                          ? '/assets/aistudio/ai-workflow-playbook-cover_2149baf2.png'
                          : '/assets/aistudio/ai-workflow-playbook-cover_dcc4c416.svg'
                      }
                      alt="LUMEN AI Workflow Playbook Cover"
                      referrerPolicy="no-referrer"
                      onError={() => setCoverFallback(true)}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
