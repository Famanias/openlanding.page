import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, Users, BookOpen } from 'lucide-react';

export const CredibilitySection: React.FC = () => {
  const [comparisonView, setComparisonView] = useState<'before' | 'after'>('after');

  return (
    <section
      id="practical-credibility"
      aria-labelledby="credibility-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            06 · RESOURCE CREDIBILITY &amp; PRACTICAL EXAMPLES
          </p>
          <h2
            id="credibility-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          >
            Practical ideas. Clear frameworks. No unnecessary complexity.
          </h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            Built from real operational workflow templates—without hype, black-box promises, or unverified automation claims.
          </p>
        </div>

        {/* Worked Before & After Example + Genuine Excerpt */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Columns: Interactive Before & After Worked Example */}
          <div className="glass-panel-active rounded-3xl p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E2432]/10 pb-4">
                <div>
                  <span className="font-mono text-xs font-semibold text-[#657187]">
                    WORKED EXAMPLE · CHAPTER 08
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-[#1E2432]">
                    From incoming email to prepared response.
                  </h3>
                </div>

                {/* Before / After Switcher */}
                <div
                  role="group"
                  aria-label="Compare manual vs AI-assisted workflow"
                  className="inline-flex items-center gap-1 rounded-xl border border-white/85 bg-[#F0F3FA] p-1"
                >
                  <button
                    type="button"
                    aria-pressed={comparisonView === 'before'}
                    onClick={() => setComparisonView('before')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      comparisonView === 'before'
                        ? 'bg-[#252C43] text-white shadow-xs'
                        : 'text-[#657187] hover:text-[#1E2432]'
                    }`}
                  >
                    Before: Manual Triage
                  </button>
                  <button
                    type="button"
                    aria-pressed={comparisonView === 'after'}
                    onClick={() => setComparisonView('after')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      comparisonView === 'after'
                        ? 'bg-[#252C43] text-white shadow-xs'
                        : 'text-[#657187] hover:text-[#1E2432]'
                    }`}
                  >
                    After: AI-Assisted + Review
                  </button>
                </div>
              </div>

              {comparisonView === 'before' ? (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-mono text-[#657187]">
                    MANUAL PROCESS — REPETITIVE CONTEXT SWITCHING
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/80 bg-white/75 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">01. READ &amp; SORT</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Manual classification
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Open long email threads, identify intent, and copy details into tracker.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/80 bg-white/75 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">02. SUMMARIZE</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Ad-hoc notes
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Rewrite key dates and questions by hand for the internal team channel.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/80 bg-white/75 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">03. FOLLOW-UP</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Blank-page drafting
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Search past replies for standard policy clauses and draft response from scratch.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-mono text-[#5BA59A] font-medium">
                    STRUCTURED AI-ASSISTED WORKFLOW WITH HUMAN REVIEW STEP
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-[#D8D0F7] bg-white/90 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">01. CLASSIFY &amp; EXTRACT</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Structured intake brief
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Workflow tags category, extracts requested dates, and flags any ambiguous items.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#C9DAFA] bg-white/90 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">02. PREPARE DRAFT</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Grounded reply template
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Assembles a draft response using approved reference clauses and source facts.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#5BA59A]/50 bg-[#252C43] text-white p-4">
                      <span className="font-mono text-[11px] text-[#C9DAFA]">03. HUMAN CHECKPOINT</span>
                      <p className="mt-1.5 text-xs font-semibold text-white">
                        Verify &amp; send
                      </p>
                      <p className="mt-1 text-xs text-white/80">
                        Account owner verifies extracted facts in 60 seconds and approves delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Requirement Notice */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/90 bg-white/80 p-4 text-xs text-[#1E2432]">
              <ShieldAlert className="mt-0.5 h-4 w-4 text-[#252C43] shrink-0" aria-hidden="true" />
              <div>
                <span className="font-semibold">Human verification required: </span>
                <span className="text-[#657187]">
                  AI outputs require verification before external release. The playbook teaches how to design fast review gates rather than unmonitored full automation.
                </span>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Genuine Excerpt + Who This Guide Is For */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Genuine Excerpt Card */}
            <div className="glass-panel rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#657187]">
                <BookOpen className="h-3.5 w-3.5 text-[#252C43]" aria-hidden="true" />
                <span>DIRECT EXCERPT · PAGE 07</span>
              </div>
              <blockquote className="mt-3 text-sm font-medium text-[#1E2432] leading-relaxed">
                &ldquo;Never ask a single prompt to interpret raw input, make a policy decision, and trigger an external action at once. Separate classification from drafting, and always place a human checkpoint before external delivery.&rdquo;
              </blockquote>
              <div className="mt-3 font-mono text-[11px] text-[#657187]">
                — Section 04: The Separation of Responsibilities Rule
              </div>
            </div>

            {/* Who the Guide Is For */}
            <div className="glass-panel rounded-3xl p-6 flex-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#657187]">
                <Users className="h-3.5 w-3.5 text-[#252C43]" aria-hidden="true" />
                <span>WHO THIS GUIDE IS FOR</span>
              </div>
              <h3 className="mt-2 text-base font-bold text-[#1E2432]">
                Designed for practical builders and operations teams
              </h3>
              <ul className="mt-3.5 space-y-2.5 text-xs text-[#657187]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#5BA59A] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1E2432]">Operations &amp; Delivery Leads</strong> structuring client intake, questionnaires, and status reporting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#5BA59A] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1E2432]">Product &amp; Project Managers</strong> turning meeting transcripts and research notes into clear action logs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#5BA59A] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1E2432]">Cross-Functional Teams</strong> adopting AI workflows without requiring custom software engineering.
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#1E2432]">
                <span>Tool-agnostic frameworks</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#5BA59A]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
