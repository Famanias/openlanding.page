'use client';
import { SplitText } from '../motion/SplitText';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, FileText, Mic, CheckSquare, Activity, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TaskFragment {
  id: string;
  label: string;
  detail: string;
  source: string;
  scatteredClass: string;
  structuredOrder: string;
}

const TASK_FRAGMENTS: TaskFragment[] = [
  {
    id: 'email',
    label: 'Customer intake email',
    detail: 'Product issue reported with screenshot and logs',
    source: 'Inbox · Priority',
    scatteredClass: 'lm-fragment--drift-0',
    structuredOrder: '01 · Intake Captured',
  },
  {
    id: 'doc',
    label: 'Product specification',
    detail: 'Design guidelines and technical boundary notes',
    source: 'Knowledge Base',
    scatteredClass: 'lm-fragment--drift-1',
    structuredOrder: '02 · Context Retrieved',
  },
  {
    id: 'note',
    label: 'Sync meeting audio',
    detail: 'Recorded customer call decisions and action items',
    source: 'Meeting Archive',
    scatteredClass: 'lm-fragment--drift-2',
    structuredOrder: '03 · Audio Transcribed',
  },
  {
    id: 'action',
    label: 'Unassigned action item',
    detail: 'Resolve authentication race condition before release',
    source: 'Project Board',
    scatteredClass: 'lm-fragment--drift-3',
    structuredOrder: '04 · Actions Synthesized',
  },
  {
    id: 'status',
    label: 'Status update',
    detail: 'Manual weekly summary assembled across 4 tabs',
    source: 'Team Channel',
    scatteredClass: 'lm-fragment--drift-4',
    structuredOrder: '05 · Review Ready',
  },
];

export const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorPathRef = useRef<SVGPathElement>(null);
  const manualInteractionRef = useRef<boolean>(false);
  const [isStructured, setIsStructured] = useState<boolean>(false);
  const [isManualTransition, setIsManualTransition] = useState<boolean>(false);

  const traceConnector = useCallback(() => {
    const path = connectorPathRef.current;
    if (!path) return;
    try {
      const len = path.getTotalLength ? path.getTotalLength() : 920;
      gsap.fromTo(
        path,
        { strokeDasharray: `${len} ${len}`, strokeDashoffset: len, opacity: 0.3 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.52, ease: 'power2.out' }
      );
    } catch {
      // JSDOM fallback
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsStructured(true);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 62%',
        once: true,
        onEnter: () => {
          if (!manualInteractionRef.current) {
            setIsManualTransition(false);
            setIsStructured(true);
            traceConnector();
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [traceConnector]);

  const handleManualToggle = (structured: boolean) => {
    manualInteractionRef.current = true;
    setIsManualTransition(true);
    setIsStructured(structured);
    if (structured) {
      traceConnector();
    }
  };

  const renderFragmentIcon = (id: string) => {
    switch (id) {
      case 'email':
        return <Mail className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
      case 'doc':
        return <FileText className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
      case 'note':
        return <Mic className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
      case 'action':
        return <CheckSquare className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
      default:
        return <Activity className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="the-problem"
      aria-labelledby="problem-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
        {/* Section Header + Interactive State Switcher */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-[#657187]">
              02 · THE PROBLEM — DISCONNECTED WORK
            </p>
            <h2 data-lm-heading=""
              id="problem-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
            ><SplitText text="Your work is connected. Your tools aren't." /></h2>
            <p className="mt-4 text-base text-[#657187] leading-relaxed">
              Requests arrive everywhere. Information becomes fragmented. Repetitive tasks consume attention that could be spent on more important work.
            </p>
          </div>

          <div
            role="group"
            aria-label="Toggle workflow organization state"
            className="inline-flex items-center gap-1 self-start rounded-xl border border-white/85 bg-white/75 p-1 shadow-xs backdrop-blur-md"
          >
            <button
              type="button"
              aria-pressed={!isStructured}
              onClick={() => handleManualToggle(false)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-[transform,opacity,background-color,border-color,box-shadow] whitespace-nowrap shrink-0 cursor-pointer ${
                !isStructured
                  ? 'bg-[#252C43] text-white shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              Fragmented State
            </button>
            <button
              type="button"
              aria-pressed={isStructured}
              onClick={() => handleManualToggle(true)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-[transform,opacity,background-color,border-color,box-shadow] whitespace-nowrap shrink-0 cursor-pointer ${
                isStructured
                  ? 'bg-[#252C43] text-white shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              Structured System
            </button>
          </div>
        </div>

        {/* Interactive Canvas: Scattered Fragments -> Intentional Connected System */}
        <div className="lm-problem-canvas relative mt-12 rounded-3xl border border-white/85 bg-white/50 p-6 sm:p-10 shadow-xs backdrop-blur-md overflow-hidden">
          {/* Connecting SVG Pathways (Visible when structured) */}
          <svg
            viewBox="0 0 1100 160"
            fill="none"
            aria-hidden="true"
            className={`pointer-events-none hidden lg:block absolute inset-x-8 top-1/2 -translate-y-1/2 h-40 w-[calc(100%-4rem)] transition-opacity duration-300 ${
              isStructured ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <path
              d="M 95 80 L 1005 80"
              stroke="#C9DAFA"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <path
              ref={connectorPathRef}
              d="M 95 80 L 1005 80"
              stroke="#5BA59A"
              strokeWidth="2.5"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TASK_FRAGMENTS.map((frag, index) => {
              const transitionStyle = isManualTransition
                ? { transition: 'transform 260ms cubic-bezier(0.77, 0, 0.175, 1), border-color 260ms, background-color 260ms' }
                : {
                    transition: 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1), border-color 520ms, background-color 520ms',
                    transitionDelay: `${index * 40}ms`,
                  };

              return (
                <div
                  key={frag.id}
                  style={transitionStyle}
                  className={`lm-fragment glass-panel rounded-2xl p-4 ${
                    isStructured
                      ? 'translate-x-0 translate-y-0 rotate-0 border-[#5BA59A]/40 bg-white/85'
                      : frag.scatteredClass
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] font-medium text-[#657187]">
                      {isStructured ? frag.structuredOrder : frag.source}
                    </span>
                    {renderFragmentIcon(frag.id)}
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-[#1E2432]">
                    {frag.label}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#657187] leading-relaxed">
                    {frag.detail}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-[#1E2432]/8 pt-2.5 text-[11px] font-mono">
                    <span className={isStructured ? 'text-[#5BA59A] font-medium' : 'text-[#657187]'}>
                      {isStructured ? 'Connected step' : 'Unlinked fragment'}
                    </span>
                    {isStructured && index < TASK_FRAGMENTS.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-[#5BA59A]" aria-hidden="true" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[#1E2432]/8 pt-5 text-xs text-[#657187] sm:flex-row sm:items-center">
            <span>
              {isStructured
                ? 'Intentional workflow structure: Each incoming item follows a defined path from intake to human verification.'
                : 'Without workflow design: Context is re-read, copied, and manually reformatted between every tool.'}
            </span>
            <span className="font-mono text-[11px] text-[#1E2432] font-medium">
              CHAPTER 01 IN THE PLAYBOOK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
