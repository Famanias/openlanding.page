import React, { useState } from 'react';
import { Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { TEMPLATE_PRESETS, TemplatePreset } from '../lib/plannerLogic';

interface TemplatesSectionProps {
  onApplyTemplate: (preset: TemplatePreset) => void;
}

const ACCENT_SURFACE: Record<
  TemplatePreset['accent'],
  { card: string; border: string; pill: string }
> = {
  lavender: {
    card: 'bg-[#E3DCFA]',
    border: 'border-[#C1B3EE]',
    pill: 'bg-[#CEC2F5] text-[#29313E]',
  },
  powder: {
    card: 'bg-[#CEE2F9]',
    border: 'border-[#9EC2EC]',
    pill: 'bg-[#B6D4F6] text-[#29313E]',
  },
  peach: {
    card: 'bg-[#F9DCD0]',
    border: 'border-[#E6B8A4]',
    pill: 'bg-[#F3C7B5] text-[#29313E]',
  },
  mint: {
    card: 'bg-[#CFF1E4]',
    border: 'border-[#9DD8C2]',
    pill: 'bg-[#B7E8D5] text-[#29313E]',
  },
};

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onApplyTemplate }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(TEMPLATE_PRESETS[0].id);
  const [appliedPresetId, setAppliedPresetId] = useState<string | null>(null);

  const activePreset =
    TEMPLATE_PRESETS.find((p) => p.id === selectedPresetId) || TEMPLATE_PRESETS[0];

  const handleUseTemplate = (preset: TemplatePreset) => {
    onApplyTemplate(preset);
    setAppliedPresetId(preset.id);
  };

  return (
    <section
      id="templates"
      aria-labelledby="templates-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-xl">
          <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
            Templates · Beautiful Starting Points
          </p>
          <h2
            id="templates-heading"
            className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
          >
            Thoughtful rhythms ready for your week.
          </h2>
        </div>
        <p className="text-[15.5px] text-[#556070] max-w-md leading-[1.6]">
          Select any planner card below to inspect its structure, or load it directly into the interactive Hero Planner at the top of the page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: 4 Overlapping Pastel Planner Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEMPLATE_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            const styles = ACCENT_SURFACE[preset.accent];

            return (
              <div
                key={preset.id}
                className="relative group"
              >
                {/* Overlapping secondary sheet behind card that slides into view on hover */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-2xl border ${styles.border} bg-[#FCFBF7]/85 transition-transform duration-300 ${
                    isSelected
                      ? 'translate-x-2 translate-y-2 rotate-1'
                      : 'group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-1'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setSelectedPresetId(preset.id)}
                  aria-pressed={isSelected}
                  className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#29313E] ${
                    styles.card
                  } ${styles.border} ${
                    isSelected
                      ? '-translate-y-1 shadow-[0_16px_32px_-12px_rgba(41,49,62,0.18)] ring-2 ring-[#29313E]'
                      : 'hover:-translate-y-1 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11.5px] font-mono-tabular text-[#3A4453]">
                      {preset.rhythmLabel}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#29313E] opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-[19px] font-semibold text-[#232A36] tracking-[-0.01em]">
                    {preset.name}
                  </h3>
                  <p className="text-[13px] text-[#4A5565] mt-1 leading-snug">
                    {preset.tagline}
                  </p>

                  {/* Mini preview bars inside the overlapping card */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-[#29313E]/10">
                    {preset.tasks.map((t, i) => (
                      <div
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white/70 text-[11.5px] font-medium text-[#29313E] truncate flex items-center justify-between"
                      >
                        <span className="truncate">{t.title}</span>
                        <span className="text-[10px] font-mono-tabular text-[#66717F] ml-2 shrink-0">
                          {t.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Live Interactive Preview Panel for Selected Template */}
        <div className="lg:col-span-6 rounded-[22px] bg-[#FCFBF7] border border-[#3A4453]/14 p-6 sm:p-8 shadow-[0_22px_48px_-18px_rgba(41,49,62,0.12)] space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#3A4453]/10 pb-5">
            <div>
              <span className="text-[12px] font-mono-tabular text-[#66717F]">
                Live Template Preview · {activePreset.focusBlocks} focus intervals
              </span>
              <h3 className="text-[24px] font-semibold text-[#29313E] mt-1">
                {activePreset.name}
              </h3>
              <p className="text-[14px] text-[#556070] mt-1 max-w-md leading-relaxed">
                {activePreset.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleUseTemplate(activePreset)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#29313E] hover:bg-[#3A4556] active:scale-[0.98] text-[#FCFBF7] text-[13.5px] font-medium transition-all cursor-pointer shrink-0"
            >
              {appliedPresetId === activePreset.id ? (
                <>
                  <Check className="w-4 h-4 text-[#D0EFE2]" />
                  <span>Loaded in Hero Planner</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#DCD5F6]" />
                  <span>Use template</span>
                </>
              )}
            </button>
          </div>

          {/* Schedule Breakdown */}
          <div className="space-y-3">
            <p className="text-[12.5px] font-medium text-[#66717F]">
              Included daily anchors (fictional demo preset):
            </p>
            {activePreset.tasks.map((task, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                  ACCENT_SURFACE[task.category].card
                } ${ACCENT_SURFACE[task.category].border}`}
              >
                <div>
                  <p className="text-[14px] font-semibold text-[#232A36]">{task.title}</p>
                  <p className="text-[12px] text-[#4A5565] mt-0.5">
                    {task.subtitle} · {task.energy}
                  </p>
                </div>
                <span className="text-[12px] font-mono-tabular font-medium text-[#29313E] bg-white/75 px-2.5 py-1 rounded-lg shrink-0">
                  {task.duration}
                </span>
              </div>
            ))}
          </div>

          {appliedPresetId === activePreset.id && (
            <div
              role="status"
              className="p-3.5 rounded-xl bg-[#D0EFE2]/65 border border-[#95D3BD] flex items-center justify-between gap-3 text-[13px] text-[#232A36]"
            >
              <span>
                <strong>“{activePreset.name}”</strong> is now active in the Hero Planner above.
              </span>
              <a
                href="#home"
                className="font-semibold underline whitespace-nowrap shrink-0 hover:text-[#29313E]"
              >
                Jump to Hero ↑
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
