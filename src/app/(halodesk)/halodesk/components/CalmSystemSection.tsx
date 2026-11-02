import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface CapabilityItem {
  id: 'capture' | 'prioritize' | 'finish';
  number: string;
  title: string;
  summary: string;
  workflowTitle: string;
  workflowDetail: string;
  sampleKey: string;
  accentBg: string;
  accentBorder: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'capture',
    number: '01.',
    title: 'Capture without breaking stride',
    summary:
      'Jot down stray thoughts, links, and follow-ups from anywhere on your desktop with a quiet command bar that tucks straight into your Inbox.',
    workflowTitle: 'Sample flow · Global Quick Capture',
    workflowDetail:
      'Press ⌘ + Shift + Space, type "Send typography spec to Maya #today", and return to your document in under three seconds—zero window switching.',
    sampleKey: 'Inbox → Triaged in 1 keystroke',
    accentBg: 'bg-[#DCD5F6]/55',
    accentBorder: 'border-[#B9A9E8]/50',
  },
  {
    id: 'prioritize',
    number: '02.',
    title: 'Prioritize by energy, not urgency alone',
    summary:
      'Group your day into three gentle rhythms—Deep Focus, Collaborative, and Light Flow—so demanding work lands when your attention is naturally sharpest.',
    workflowTitle: 'Sample flow · Morning Rhythm Alignment',
    workflowDetail:
      'Drag up to four horizontal pastel blocks onto Today. Halo Desk gently warns you if you schedule more than six hours of deep cognitive work.',
    sampleKey: 'Max 4 anchor tasks per day',
    accentBg: 'bg-[#CFDFEF]/65',
    accentBorder: 'border-[#96BCE8]/50',
  },
  {
    id: 'finish',
    number: '03.',
    title: 'Finish with a calm sense of closure',
    summary:
      'Pair any task with a quiet 25-minute ring timer and margin sticky notes. When the afternoon wraps, unfinished items roll forward without guilt.',
    workflowTitle: 'Sample flow · End-of-Day Wind Down',
    workflowDetail:
      'Completed tasks settle into your weekly log while open items offer a single-click "Move to tomorrow morning" transition.',
    sampleKey: '25:00 Focus Ring + Margin Notes',
    accentBg: 'bg-[#D0EFE2]/65',
    accentBorder: 'border-[#95D3BD]/50',
  },
];

export const CalmSystemSection: React.FC = () => {
  const [activeId, setActiveId] = useState<'capture' | 'prioritize' | 'finish'>('capture');
  const [lineProgress, setLineProgress] = useState(0.35);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight || 800;
      const raw = (viewH - rect.top) / (rect.height + viewH * 0.4);
      const clamped = Math.max(0.15, Math.min(1, raw));
      setLineProgress(Number(clamped.toFixed(3)));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strokeLength = 420;
  const strokeOffset = strokeLength * (1 - lineProgress);

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="calm-system-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-24 lg:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left Column: Editorial framing + layered paper-card stack visualization */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
              The Calm System
            </p>
            <h2
              id="calm-system-heading"
              className="text-[34px] sm:text-[42px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
            >
              Less noise. More room to think.
            </h2>
            <p className="text-[16px] text-[#556070] leading-[1.65] max-w-[46ch]">
              Most work tools treat every notification, checklist, and meeting with identical urgency. Halo Desk separates quick capture from protected focus so your workspace feels like a clean sheet of paper.
            </p>
          </div>

          {/* Interactive Layered Paper-Card Visualization */}
          <div
            aria-label="Layered paper card preview of selected capability"
            className="relative pt-4 pb-6 px-2"
          >
            {/* Background paper layer 3 */}
            <div
              aria-hidden="true"
              className={`rounded-2xl border border-[#3A4453]/10 bg-[#FCFBF7]/70 h-52 w-[90%] mx-auto transition-transform duration-500 ${
                activeId === 'finish'
                  ? '-translate-y-3 rotate-[-1.5deg] scale-[0.98]'
                  : 'translate-y-2 rotate-[1.5deg] scale-[0.95]'
              }`}
            />

            {/* Middle paper layer 2 */}
            <div
              aria-hidden="true"
              className={`absolute inset-x-5 top-6 rounded-2xl border border-[#3A4453]/12 h-52 transition-all duration-500 ${
                activeId === 'capture'
                  ? 'bg-[#DCD5F6]/45 -rotate-1 translate-y-1'
                  : activeId === 'prioritize'
                  ? 'bg-[#CFDFEF]/55 rotate-1 -translate-y-1'
                  : 'bg-[#D0EFE2]/55 -rotate-1 translate-y-0.5'
              }`}
            />

            {/* Foreground active paper card */}
            <div className="relative -mt-48 rounded-2xl bg-[#FCFBF7] border border-[#3A4453]/14 shadow-[0_18px_40px_-15px_rgba(41,49,62,0.12)] p-6 space-y-4 transition-all duration-500">
              <div className="flex items-center justify-between border-b border-[#3A4453]/10 pb-3">
                <span className="text-[13px] font-semibold text-[#29313E]">
                  {activeId === 'capture'
                    ? '01 · Instant Inbox Triage'
                    : activeId === 'prioritize'
                    ? '02 · Energy-Balanced Timeline'
                    : '03 · Protected Focus Session'}
                </span>
                <span className="text-[12px] font-mono-tabular text-[#66717F]">
                  {activeId === 'capture'
                    ? '⌘⇧Space'
                    : activeId === 'prioritize'
                    ? '3 blocks / day'
                    : '25:00 ring'}
                </span>
              </div>

              {activeId === 'capture' && (
                <div className="space-y-2.5">
                  <div className="px-3.5 py-2.5 rounded-xl bg-[#F4F2F7] border border-[#3A4453]/10 flex items-center justify-between">
                    <span className="text-[13px] text-[#29313E] font-medium">
                      + Draft architecture note for Tuesday
                    </span>
                    <span className="text-[11px] text-[#66717F] font-mono-tabular">Enter ↵</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-[#DCD5F6]/55 text-[12px] text-[#29313E]">
                      Saved to Inbox · 0s delay
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F7D9CB]/55 text-[12px] text-[#29313E]">
                      Zero context switch
                    </div>
                  </div>
                </div>
              )}

              {activeId === 'prioritize' && (
                <div className="space-y-2">
                  <div className="px-3.5 py-2 rounded-lg bg-[#C3DCF9]/80 flex items-center justify-between text-[12.5px] font-medium text-[#29313E]">
                    <span>Deep work · Core view state</span>
                    <span className="font-mono-tabular text-[11px] text-[#4E5A6E]">90 min</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-[#F8D6C5]/80 flex items-center justify-between text-[12.5px] font-medium text-[#29313E]">
                    <span>Light flow · Editorial outline</span>
                    <span className="font-mono-tabular text-[11px] text-[#4E5A6E]">30 min</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-[#C7EFE1]/80 flex items-center justify-between text-[12.5px] font-medium text-[#29313E]">
                    <span>Collaborative · Studio sync</span>
                    <span className="font-mono-tabular text-[11px] text-[#4E5A6E]">25 min</span>
                  </div>
                </div>
              )}

              {activeId === 'finish' && (
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="space-y-1.5">
                    <p className="text-[13px] font-medium text-[#29313E] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                      4 of 4 daily anchors complete
                    </p>
                    <p className="text-[12px] text-[#556070] leading-relaxed">
                      Sticky note reminders archived cleanly into tomorrow’s brief.
                    </p>
                  </div>
                  <div className="shrink-0 w-16 h-16 rounded-full border-4 border-[#6C798F] flex items-center justify-center font-mono-tabular text-[13px] font-semibold text-[#29313E] bg-[#F8F5EE]">
                    Done
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Three expandable typographic capability rows connected by scroll-drawn SVG line */}
        <div className="lg:col-span-7 relative pl-6 sm:pl-10">
          {/* Fine SVG vertical line that draws as user scrolls */}
          <svg
            aria-hidden="true"
            className="absolute left-1 sm:left-2.5 top-4 bottom-4 w-4 h-[calc(100%-32px)] overflow-visible"
            viewBox="0 0 16 420"
            preserveAspectRatio="none"
          >
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="420"
              stroke="rgba(58, 68, 83, 0.14)"
              strokeWidth="1.5"
            />
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="420"
              stroke="#6C798F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={strokeLength}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-300 ease-out"
            />
          </svg>

          <div className="divide-y divide-[#3A4453]/12 border-t border-b border-[#3A4453]/12">
            {CAPABILITIES.map((cap) => {
              const isExpanded = activeId === cap.id;
              return (
                <div
                  key={cap.id}
                  onMouseEnter={() => setActiveId(cap.id)}
                  className="py-6 sm:py-7 transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setActiveId(cap.id)}
                    className="w-full text-left flex items-baseline justify-between gap-4 group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#29313E] rounded-lg"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[14px] font-mono-tabular font-medium text-[#66717F]">
                        {cap.number}
                      </span>
                      <h3 className="text-[21px] sm:text-[24px] font-semibold tracking-[-0.015em] text-[#29313E] group-hover:text-[#435066] transition-colors">
                        {cap.title}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#3A4453]/15 text-[#29313E] transition-transform duration-300 shrink-0 ${
                        isExpanded ? 'rotate-45 bg-[#29313E] text-[#FCFBF7]' : 'group-hover:bg-black/5'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>

                  <p className="mt-2.5 pl-9 sm:pl-10 text-[15px] text-[#556070] leading-[1.6] max-w-[60ch]">
                    {cap.summary}
                  </p>

                  {/* Animated height / controlled sliding workflow drawer */}
                  <div
                    className={`pl-9 sm:pl-10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isExpanded ? 'max-h-56 pt-4' : 'max-h-0 pt-0'
                    }`}
                  >
                    <div
                      className={`p-4 rounded-xl border ${cap.accentBorder} ${cap.accentBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                    >
                      <div className="space-y-1">
                        <p className="text-[12.5px] font-semibold text-[#29313E] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#4E5A6E]" />
                          {cap.workflowTitle}
                        </p>
                        <p className="text-[13px] text-[#3A4453] leading-relaxed max-w-[52ch]">
                          {cap.workflowDetail}
                        </p>
                      </div>
                      <div className="shrink-0 text-[12px] font-mono-tabular font-medium text-[#29313E] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#556070]" />
                        <span>{cap.sampleKey}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
