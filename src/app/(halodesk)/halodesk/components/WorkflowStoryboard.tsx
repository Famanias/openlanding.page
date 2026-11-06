import React, { useState } from 'react';
import { Check, Clock, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface StoryStep {
  id: 'capture' | 'plan' | 'focus' | 'reflect';
  index: number;
  label: string;
  timeOfDay: string;
  headline: string;
  description: string;
  tileStatus: string;
  tileSubtext: string;
  tileCategoryClass: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    id: 'capture',
    index: 0,
    label: '01 · Capture',
    timeOfDay: '8:50 AM · Morning Desk',
    headline: 'Start by clearing your head into a quiet Inbox.',
    description:
      'Before checking messages, drop raw tasks into Quick Capture. Your priority tile starts as an unscheduled note—visible, safe, and out of your way.',
    tileStatus: 'Captured in Inbox',
    tileSubtext: 'Unscheduled · Waiting for morning triage',
    tileCategoryClass: 'bg-[#DCD5F6] border-[#B9A9E8]',
  },
  {
    id: 'plan',
    index: 1,
    label: '02 · Plan',
    timeOfDay: '9:05 AM · Daily Alignment',
    headline: 'Place the priority tile into Today’s protected morning slot.',
    description:
      'With one drag or keypress, the tile travels from Inbox into your Daily Planner timeline alongside your Weekly Calendar overview.',
    tileStatus: 'Scheduled · Today 9:30 AM',
    tileSubtext: '90 min Deep Focus block reserved',
    tileCategoryClass: 'bg-[#C3DCF9] border-[#96BCE8]',
  },
  {
    id: 'focus',
    index: 2,
    label: '03 · Focus',
    timeOfDay: '9:30 AM · Deep Work Session',
    headline: 'Other lists step back while the 25:00 ring keeps gentle company.',
    description:
      'Secondary tasks dim and tuck aside. The traveling priority tile anchors beside the active Focus Timer and your margin sticky note.',
    tileStatus: 'In Focus · 18:40 remaining',
    tileSubtext: 'Notifications silenced · Margin note linked',
    tileCategoryClass: 'bg-[#F8D6C5] border-[#E2B29B]',
  },
  {
    id: 'reflect',
    index: 3,
    label: '04 · Reflect',
    timeOfDay: '4:45 PM · Afternoon Closure',
    headline: 'Mark complete and leave your desk genuinely finished.',
    description:
      'A single check-circle scribble moves the priority tile into your completed log and prepares a clean slate for tomorrow.',
    tileStatus: 'Completed · Logged to Weekly Reset',
    tileSubtext: '2 focus intervals recorded · Desk clear',
    tileCategoryClass: 'bg-[#C7EFE1] border-[#95D3BD]',
  },
];

export const WorkflowStoryboard: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
  const currentStep = STORY_STEPS[activeStepIndex];

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
    >
      {/* Header & Interactive Step Scrubber */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div className="space-y-3 max-w-xl">
          <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
            Workflow · A Day Unfolding
          </p>
          <h2
            id="workflow-heading"
            className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
          >
            From first thought to finished work, one continuous motion.
          </h2>
        </div>

        {/* Step Controls (Capture -> Plan -> Focus -> Reflect) */}
        <div
          role="tablist"
          aria-label="Workflow progression stages"
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#FCFBF7]/90 border border-[#3A4453]/12 shadow-sm"
        >
          {STORY_STEPS.map((step, idx) => {
            const isSelected = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-4 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#29313E] text-[#FCFBF7] shadow-sm'
                    : 'text-[#556070] hover:text-[#29313E] hover:bg-black/5'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storyboard Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-[24px] bg-[#FCFBF7]/85 border border-[#3A4453]/12 p-6 sm:p-10 shadow-[0_24px_54px_-20px_rgba(41,49,62,0.1)]">
        {/* Left Copy Narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between text-[12.5px] font-mono-tabular text-[#66717F]">
            <span>{currentStep.timeOfDay}</span>
            <span>Step {activeStepIndex + 1} of 4</span>
          </div>

          <h3 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.02em] text-[#29313E] leading-[1.2] text-balance">
            {currentStep.headline}
          </h3>

          <p className="text-[15.5px] text-[#556070] leading-[1.65]">
            {currentStep.description}
          </p>

          {/* Progress Rail & Next/Previous Buttons */}
          <div className="pt-2 space-y-4">
            <div className="w-full h-1.5 rounded-full bg-[#3A4453]/10 overflow-hidden">
              <div
                className="h-full bg-[#6C798F] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((activeStepIndex + 1) / STORY_STEPS.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) => (prev + 1) % STORY_STEPS.length)
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#29313E] hover:bg-[#3A4556] text-[#FCFBF7] text-[13.5px] font-medium transition-colors cursor-pointer"
              >
                {activeStepIndex === STORY_STEPS.length - 1 ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Day</span>
                  </>
                ) : (
                  <>
                    <span>Advance to {STORY_STEPS[activeStepIndex + 1].label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Choreographed Spatial Stage with Traveling Pastel Priority Tile */}
        <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[370px] rounded-2xl bg-[#F4F2F7]/85 border border-[#3A4453]/10 p-5 sm:p-7 overflow-hidden flex flex-col justify-between">
          {/* Top Stage Zones: Inbox Dock | Daily Timeline | Focus Ring */}
          <div className="grid grid-cols-3 gap-3 text-[11.5px] font-medium text-[#66717F]">
            <div
              className={`p-3 rounded-xl border transition-all duration-500 ${
                activeStepIndex === 0
                  ? 'bg-white border-[#3A4453]/20 text-[#29313E] shadow-sm'
                  : 'bg-white/40 border-[#3A4453]/8 opacity-65'
              }`}
            >
              <span>Inbox Tray</span>
              <p className="text-[10.5px] font-mono-tabular mt-0.5">
                {activeStepIndex === 0 ? '1 new capture' : '0 unscheduled'}
              </p>
            </div>

            <div
              className={`p-3 rounded-xl border transition-all duration-500 ${
                activeStepIndex === 1
                  ? 'bg-white border-[#3A4453]/20 text-[#29313E] shadow-sm'
                  : 'bg-white/40 border-[#3A4453]/8 opacity-65'
              }`}
            >
              <span>Today Timeline</span>
              <p className="text-[10.5px] font-mono-tabular mt-0.5">
                {activeStepIndex === 1 ? 'Morning slot active' : '9:30 AM anchor'}
              </p>
            </div>

            <div
              className={`p-3 rounded-xl border transition-all duration-500 ${
                activeStepIndex >= 2
                  ? 'bg-white border-[#3A4453]/20 text-[#29313E] shadow-sm'
                  : 'bg-white/40 border-[#3A4453]/8 opacity-65'
              }`}
            >
              <span>{activeStepIndex === 3 ? 'Completed Log' : 'Focus Mode'}</span>
              <p className="text-[10.5px] font-mono-tabular mt-0.5">
                {activeStepIndex === 2
                  ? '25:00 Timer Live'
                  : activeStepIndex === 3
                  ? 'Archived cleanly'
                  : 'Standby'}
              </p>
            </div>
          </div>

          {/* The Single Traveling Pastel Priority Tile (transform-based FLIP choreography) */}
          <div className="relative my-6 min-h-[130px] flex items-center">
            <div
              style={{
                transform:
                  activeStepIndex === 0
                    ? 'translate3d(0%, -6px, 0) scale(0.96)'
                    : activeStepIndex === 1
                    ? 'translate3d(8%, 0px, 0) scale(1)'
                    : activeStepIndex === 2
                    ? 'translate3d(4%, 4px, 0) scale(1.03)'
                    : 'translate3d(12%, 0px, 0) scale(0.98)',
              }}
              className={`w-full sm:w-[86%] rounded-2xl border p-4 sm:p-5 shadow-[0_14px_30px_-10px_rgba(41,49,62,0.14)] transition-all duration-500 ease-[cubic-bezier(0.22,1.15,0.36,1)] ${currentStep.tileCategoryClass}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-6 h-6 rounded-full border border-[#29313E]/25 flex items-center justify-center transition-colors ${
                      activeStepIndex === 3 ? 'bg-[#29313E] text-white' : 'bg-white/80 text-[#29313E]'
                    }`}
                  >
                    {activeStepIndex === 3 ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono-tabular text-[#4A5565]">
                      {currentStep.tileStatus}
                    </span>
                    <h4
                      className={`text-[16px] sm:text-[17px] font-semibold text-[#232A36] mt-0.5 ${
                        activeStepIndex === 3 ? 'line-through opacity-80' : ''
                      }`}
                    >
                      Design system review & token alignment
                    </h4>
                    <p className="text-[12.5px] text-[#4A5565] mt-1">{currentStep.tileSubtext}</p>
                  </div>
                </div>

                <div className="shrink-0 text-right font-mono-tabular text-[12px] text-[#29313E] bg-white/65 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{activeStepIndex === 2 ? '18:40' : '90m'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Context Strip showing secondary task dimming / sticky note accompaniment */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#3A4453]/10 text-[12px] text-[#556070]">
            <span>
              {activeStepIndex === 0 && 'Press 1–4 or click any stage tab above to inspect the transition.'}
              {activeStepIndex === 1 && 'Positioned at top of Today list · Collaborators notified.'}
              {activeStepIndex === 2 && 'Secondary lists dimmed by 60% so your eyes stay on one priority.'}
              {activeStepIndex === 3 && 'Completed tile saved to Friday Weekly Reset summary.'}
            </span>
            <div className="flex items-center gap-1.5">
              {STORY_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Jump to ${s.label}`}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeStepIndex ? 'w-6 bg-[#29313E]' : 'w-2 bg-[#3A4453]/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
