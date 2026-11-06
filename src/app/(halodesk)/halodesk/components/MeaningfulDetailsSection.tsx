import React, { useState } from 'react';
import { Bell, BellOff, CornerDownLeft, Eye, EyeOff } from 'lucide-react';

export const MeaningfulDetailsSection: React.FC = () => {
  // Mini-demo 1: Quick capture shortcut simulator
  const [captureDraft, setCaptureDraft] = useState('Send colour tokens to studio');
  const [capturedList, setCapturedList] = useState<string[]>([
    'Review Friday changelog notes',
  ]);

  // Mini-demo 2: Thoughtful reminders (defer until focus ends)
  const [deferNudges, setDeferNudges] = useState(true);

  // Mini-demo 3: Room for deep work (ambient chrome dimmer)
  const [dimChrome, setDimChrome] = useState(true);

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = captureDraft.trim();
    if (!trimmed) return;
    setCapturedList((prev) => [trimmed, ...prev.slice(0, 2)]);
    setCaptureDraft('');
  };

  return (
    <section
      id="details"
      aria-labelledby="details-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
    >
      {/* Editorial Intro */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#29313E]/15">
        <div className="space-y-3 max-w-xl">
          <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
            Craft & Restraint
          </p>
          <h2
            id="details-heading"
            className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
          >
            Small, meaningful details that respect your attention.
          </h2>
        </div>

        {/* Honest interface behavior measurements (not fabricated business metrics) */}
        <div className="flex flex-wrap items-center gap-8 text-[#29313E]">
          <div>
            <p className="text-[22px] font-semibold font-mono-tabular">0 badges</p>
            <p className="text-[12.5px] text-[#556070]">No unread red counters in Focus Mode</p>
          </div>
          <div className="h-8 w-[1px] bg-[#29313E]/15 hidden sm:block" aria-hidden="true" />
          <div>
            <p className="text-[22px] font-semibold font-mono-tabular">1 keystroke</p>
            <p className="text-[12.5px] text-[#556070]">Global quick capture to Inbox</p>
          </div>
        </div>
      </div>

      {/* Three Horizontal Typographic Rows with Miniature Interactive Demos */}
      <div className="divide-y divide-[#29313E]/15 border-b border-[#29313E]/15">
        {/* Detail 1: Quick capture */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[12.5px] font-mono-tabular text-[#66717F]">Detail 01</span>
            <h3 className="text-[24px] font-semibold text-[#29313E] tracking-[-0.015em]">
              <span className="bg-gradient-to-r from-[#29313E] to-[#29313E] bg-[length:0%_1.5px] group-hover:bg-[length:100%_1.5px] bg-no-repeat bg-left-bottom transition-[background-size] duration-500 pb-0.5">
                Quick capture
              </span>
            </h3>
            <p className="text-[15px] text-[#556070] leading-[1.6] max-w-md">
              Capture an idea the moment it surfaces without leaving your current window. Press Enter below to test how thoughts tuck quietly into your Inbox queue.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="p-5 rounded-2xl bg-[#FCFBF7]/90 border border-[#3A4453]/12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <form onSubmit={handleCaptureSubmit} className="flex-1 flex items-center gap-2">
                <label htmlFor="mini-capture-input" className="sr-only">
                  Quick capture demo input
                </label>
                <input
                  id="mini-capture-input"
                  type="text"
                  value={captureDraft}
                  onChange={(e) => setCaptureDraft(e.target.value)}
                  placeholder="Type a quick thought and press Enter…"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F2F7] border border-[#3A4453]/15 text-[13.5px] text-[#29313E] placeholder:text-[#66717F] focus:outline-2 focus:outline-[#29313E]"
                />
                <button
                  type="submit"
                  aria-label="Save quick capture"
                  className="px-3.5 py-2 rounded-xl bg-[#29313E] text-[#FCFBF7] text-[12.5px] font-medium inline-flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-[#3B4658]"
                >
                  <span>Save</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="sm:w-56 space-y-1">
                <span className="text-[11px] font-mono-tabular text-[#66717F]">
                  Inbox Tray ({capturedList.length})
                </span>
                {capturedList.map((item, idx) => (
                  <div
                    key={`${item}-${idx}`}
                    className="px-2.5 py-1 rounded-lg bg-[#DCD5F6]/55 text-[12px] text-[#29313E] truncate"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail 2: Thoughtful reminders */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[12.5px] font-mono-tabular text-[#66717F]">Detail 02</span>
            <h3 className="text-[24px] font-semibold text-[#29313E] tracking-[-0.015em]">
              <span className="bg-gradient-to-r from-[#29313E] to-[#29313E] bg-[length:0%_1.5px] group-hover:bg-[length:100%_1.5px] bg-no-repeat bg-left-bottom transition-[background-size] duration-500 pb-0.5">
                Thoughtful reminders
              </span>
            </h3>
            <p className="text-[15px] text-[#556070] leading-[1.6] max-w-md">
              Reminders wait until your active 25-minute timer finishes before appearing—neverchiming in the middle of a sentence or code block.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="p-5 rounded-2xl bg-[#FCFBF7]/90 border border-[#3A4453]/12 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    deferNudges ? 'bg-[#D0EFE2] text-[#29313E]' : 'bg-[#F7D9CB] text-[#29313E]'
                  }`}
                >
                  {deferNudges ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-[#29313E]">
                    {deferNudges
                      ? 'Holding 2 reminders until Focus Timer ends'
                      : 'Immediate banner notifications active'}
                  </p>
                  <p className="text-[12.5px] text-[#556070]">
                    {deferNudges
                      ? 'Next gentle summary scheduled for 10:25 AM'
                      : 'Interrupts immediately when scheduled time arrives'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-pressed={deferNudges}
                onClick={() => setDeferNudges((prev) => !prev)}
                className="px-4 py-2 rounded-full border border-[#29313E]/20 bg-white hover:bg-[#F4F2F7] text-[12.5px] font-medium text-[#29313E] transition-colors cursor-pointer"
              >
                {deferNudges ? 'Switch to Immediate' : 'Hold During Focus'}
              </button>
            </div>
          </div>
        </div>

        {/* Detail 3: Room for deep work */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[12.5px] font-mono-tabular text-[#66717F]">Detail 03</span>
            <h3 className="text-[24px] font-semibold text-[#29313E] tracking-[-0.015em]">
              <span className="bg-gradient-to-r from-[#29313E] to-[#29313E] bg-[length:0%_1.5px] group-hover:bg-[length:100%_1.5px] bg-no-repeat bg-left-bottom transition-[background-size] duration-500 pb-0.5">
                Room for deep work
              </span>
            </h3>
            <p className="text-[15px] text-[#556070] leading-[1.6] max-w-md">
              Soften surrounding navigation rails with a single toggle so only your current task and margin sticky note stay at full contrast.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="p-5 rounded-2xl bg-[#FCFBF7]/90 border border-[#3A4453]/12 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[220px]">
                <div
                  className={`px-3 py-2 rounded-lg bg-[#E5E8F0] text-[12px] text-[#556070] transition-opacity duration-300 ${
                    dimChrome ? 'opacity-35' : 'opacity-100'
                  }`}
                >
                  Sidebar rail
                </div>
                <div className="px-3.5 py-2 rounded-lg bg-[#CFDFEF] text-[12.5px] font-semibold text-[#29313E] shadow-xs">
                  Active Deep Work Block
                </div>
                <div
                  className={`px-3 py-2 rounded-lg bg-[#FFF1AE] text-[12px] text-[#29313E] transition-opacity duration-300 ${
                    dimChrome ? 'opacity-95' : 'opacity-100'
                  }`}
                >
                  Sticky note
                </div>
              </div>

              <button
                type="button"
                aria-pressed={dimChrome}
                onClick={() => setDimChrome((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#29313E]/20 bg-white hover:bg-[#F4F2F7] text-[12.5px] font-medium text-[#29313E] transition-colors cursor-pointer"
              >
                {dimChrome ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{dimChrome ? 'Restore peripheral UI' : 'Dim peripheral UI'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
