import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS, HowItWorksStep } from '../utils/workflowLogic';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<HowItWorksStep['id']>('map');

  const currentStep =
    HOW_IT_WORKS_STEPS.find((s) => s.id === activeStepId) || HOW_IT_WORKS_STEPS[0];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            05 · HOW IT WORKS — MAP, AUTOMATE, REVIEW
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          >
            From idea to working workflow.
          </h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            The playbook walks through a structured three-stage methodology so your workflows remain transparent, testable, and easy to maintain.
          </p>
        </div>

        {/* 3 Step Selector Cards */}
        <div
          role="tablist"
          aria-label="Three-step workflow methodology"
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {HOW_IT_WORKS_STEPS.map((step) => {
            const isSelected = step.id === activeStepId;
            return (
              <button
                key={step.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveStepId(step.id)}
                className={`rounded-2xl p-6 text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
                  isSelected
                    ? 'glass-panel-active border-[#252C43]/35 shadow-sm'
                    : 'glass-panel hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#252C43]">
                    {step.number} — {step.label}
                  </span>
                  <span className={isSelected ? 'text-[#5BA59A] font-medium' : 'text-[#657187]'}>
                    {isSelected ? 'Active Stage' : 'Inspect'}
                  </span>
                </div>
                <h3 className="mt-2.5 text-lg font-bold text-[#1E2432]">
                  {step.headline}
                </h3>
                <p className="mt-1.5 text-sm text-[#657187] leading-relaxed">
                  {step.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Transforming Unified Workflow Diagram */}
        <div className="mt-8 glass-panel-active rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2432]/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#1E2432]">
                {currentStep.number}: {currentStep.label} ARCHITECTURE
              </span>
              <span aria-hidden="true" className="text-[#657187]">·</span>
              <span className="text-xs text-[#657187]">{currentStep.headline}</span>
            </div>
            <span className="font-mono text-xs font-medium text-[#5BA59A]">
              {activeStepId === 'map' && 'STAGE 1: DISCONNECTED DISCOVERY'}
              {activeStepId === 'automate' && 'STAGE 2: CONNECTED AI PATHWAY'}
              {activeStepId === 'review' && 'STAGE 3: VERIFIED HUMAN CHECKPOINTS'}
            </span>
          </div>

          <div className="relative mt-8">
            {/* SVG Connecting Line Across the 4 Nodes */}
            <svg
              viewBox="0 0 1000 90"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none hidden lg:block absolute inset-x-6 top-1/2 -translate-y-1/2 h-24 w-[calc(100%-3rem)]"
            >
              <line
                x1="80"
                y1="45"
                x2="920"
                y2="45"
                stroke={activeStepId === 'map' ? '#CBD5E1' : '#C9DAFA'}
                strokeWidth="2.5"
                strokeDasharray={activeStepId === 'map' ? '6 8' : 'none'}
              />
              {activeStepId !== 'map' && (
                <line
                  x1="80"
                  y1="45"
                  x2="920"
                  y2="45"
                  stroke={activeStepId === 'review' ? '#5BA59A' : '#252C43'}
                  strokeWidth="2.5"
                  className="svg-signal-line"
                />
              )}
            </svg>

            <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {currentStep.nodes.map((node, idx) => {
                const isCheckpoint = node.kind === 'checkpoint';
                const isAi = node.kind === 'ai';
                return (
                  <div
                    key={node.id}
                    className={`rounded-2xl p-5 transition-all duration-300 border ${
                      isCheckpoint
                        ? 'bg-[#252C43] text-white border-[#252C43] shadow-md'
                        : isAi
                        ? 'bg-white/95 text-[#1E2432] border-[#D8D0F7] shadow-xs'
                        : 'bg-white/85 text-[#1E2432] border-white/90 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={isCheckpoint ? 'text-[#C9DAFA]' : 'text-[#657187]'}>
                        0{idx + 1} · {node.kind.toUpperCase()}
                      </span>
                      {isCheckpoint ? (
                        <ShieldCheck className="h-4 w-4 text-[#5BA59A]" aria-hidden="true" />
                      ) : isAi ? (
                        <Cpu className="h-4 w-4 text-[#252C43]" aria-hidden="true" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-[#5BA59A]" aria-hidden="true" />
                      )}
                    </div>

                    <h4
                      className={`mt-3 text-sm font-bold ${
                        isCheckpoint ? 'text-white' : 'text-[#1E2432]'
                      }`}
                    >
                      {node.title}
                    </h4>

                    <p
                      className={`mt-1.5 text-xs leading-relaxed ${
                        isCheckpoint ? 'text-white/80' : 'text-[#657187]'
                      }`}
                    >
                      {node.detail}
                    </p>

                    <div
                      className={`mt-4 flex items-center justify-between border-t pt-2.5 font-mono text-[11px] ${
                        isCheckpoint
                          ? 'border-white/15 text-[#5BA59A]'
                          : 'border-[#1E2432]/8 text-[#657187]'
                      }`}
                    >
                      <span>
                        {activeStepId === 'map'
                          ? 'Mapped node'
                          : activeStepId === 'automate'
                          ? 'Connected route'
                          : 'Verified step'}
                      </span>
                      {idx < currentStep.nodes.length - 1 && (
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
