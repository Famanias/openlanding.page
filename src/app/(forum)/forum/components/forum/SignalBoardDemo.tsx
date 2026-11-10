'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Check, Copy, HelpCircle, RotateCcw, ArrowUpDown } from 'lucide-react';
import {
  INITIAL_SIGNALS,
  SIGNAL_CATEGORIES,
  SignalFilterCategory,
  SignalRecord,
  SignalSortOrder,
  filterAndSortSignals,
  formatSignalBriefForClipboard,
  resolveSelectedSignalId,
  toggleSignalReviewStatus,
} from '../../lib/forum/demoData';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';
import { AccessibleDialog } from './AccessibleDialog';

interface SignalBoardDemoProps {
  externalCategory: SignalFilterCategory;
  onExternalCategoryChange: (cat: SignalFilterCategory) => void;
  resetTriggerCount: number;
}

export const SignalBoardDemo: React.FC<SignalBoardDemoProps> = ({
  externalCategory,
  onExternalCategoryChange,
  resetTriggerCount,
}) => {
  const reducedMotion = useReducedMotion();
  const [signals, setSignals] = useState<SignalRecord[]>(INITIAL_SIGNALS);
  const [sortOrder, setSortOrder] = useState<SignalSortOrder>('RECENT');
  const [selectedId, setSelectedId] = useState<string>(INITIAL_SIGNALS[0].id);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);

  // Refs for ResizeObserver-driven SVG connector paths on desktop
  const boardGridRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const ledgerTargetRef = useRef<HTMLDivElement | null>(null);
  const [connectorCoord, setConnectorCoord] = useState<{
    startY: number;
    endY: number;
  }>({ startY: 72, endY: 120 });

  // Synchronize with external reset trigger (e.g., from Footer Reset Demo link)
  useEffect(() => {
    if (resetTriggerCount > 0) {
      setSignals(INITIAL_SIGNALS);
      onExternalCategoryChange('ALL');
      setSortOrder('RECENT');
      setSelectedId(INITIAL_SIGNALS[0].id);
      setCopyFeedback(null);
    }
  }, [resetTriggerCount, onExternalCategoryChange]);

  const visibleSignals = useMemo(
    () => filterAndSortSignals(signals, externalCategory, sortOrder),
    [signals, externalCategory, sortOrder]
  );

  const effectiveSelectedId = useMemo(
    () => resolveSelectedSignalId(visibleSignals, selectedId),
    [visibleSignals, selectedId]
  );

  const selectedSignal = useMemo(
    () =>
      visibleSignals.find((s) => s.id === effectiveSelectedId) ||
      visibleSignals[0] ||
      null,
    [visibleSignals, effectiveSelectedId]
  );

  const reviewedCount = useMemo(
    () => signals.filter((s) => s.status === 'REVIEWED').length,
    [signals]
  );

  // Recompute SVG connection anchor coordinates on layout/selection/resize
  useEffect(() => {
    const updateConnector = () => {
      if (!boardGridRef.current || !effectiveSelectedId) return;
      const gridRect = boardGridRef.current.getBoundingClientRect();
      const rowEl = rowRefs.current[effectiveSelectedId];
      const ledgerEl = ledgerTargetRef.current;

      if (rowEl && ledgerEl && gridRect.height > 0) {
        const rowRect = rowEl.getBoundingClientRect();
        const ledgerRect = ledgerEl.getBoundingClientRect();
        const startY = Math.max(
          24,
          Math.min(340, rowRect.top - gridRect.top + rowRect.height / 2)
        );
        const endY = Math.max(
          24,
          Math.min(340, ledgerRect.top - gridRect.top + 88)
        );
        setConnectorCoord({ startY, endY });
      }
    };

    updateConnector();
    if (typeof ResizeObserver !== 'undefined' && boardGridRef.current) {
      const ro = new ResizeObserver(() => updateConnector());
      ro.observe(boardGridRef.current);
      return () => ro.disconnect();
    }
  }, [effectiveSelectedId, visibleSignals, sortOrder]);

  const handleToggleReview = () => {
    if (!selectedSignal) return;
    setSignals((prev) => toggleSignalReviewStatus(prev, selectedSignal.id));
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === 'RECENT' ? 'PRIORITY' : 'RECENT'));
  };

  const handleResetDemo = () => {
    setSignals(INITIAL_SIGNALS);
    onExternalCategoryChange('ALL');
    setSortOrder('RECENT');
    setSelectedId(INITIAL_SIGNALS[0].id);
    setCopyFeedback('DEMO STATE RESTORED TO INITIAL SAMPLE');
    window.setTimeout(() => setCopyFeedback(null), 2600);
  };

  const handleCopyBrief = async () => {
    if (!selectedSignal) return;
    const text = formatSignalBriefForClipboard(selectedSignal);

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopyFeedback('SAMPLE BRIEF COPIED TO CLIPBOARD');
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      // Tested fallback for restricted iframe clipboard permissions
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', 'true');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopyFeedback('SAMPLE BRIEF COPIED TO CLIPBOARD');
      } catch {
        setCopyFeedback('SAMPLE BRIEF PREPARED IN BUFFER');
      }
    }

    window.setTimeout(() => {
      setCopyFeedback(null);
    }, 3000);
  };

  return (
    <section
      id="demo"
      aria-labelledby="demo-board-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full bg-[#0E100C] border-b border-[#B9B28A]/38 py-20 sm:py-28 lg:py-36"
    >
      {/* Secondary anchor alias so #workflows also lands here cleanly */}
      <div id="workflows" className="absolute -top-20" aria-hidden="true" />

      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-14">
        {/* Top Kicker & Mandatory Concept Disclosure Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B9B28A]/35 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
              004 / WORKFLOWS
            </span>
          </div>

          <div
            data-testid="demo-mandatory-label"
            className="border border-[#B9B28A]/50 bg-[#171814] px-3 py-1 font-mono-tech text-[11px] sm:text-xs tracking-[0.13em] text-[#F6F3EA] uppercase"
          >
            INTERACTIVE CONCEPT DEMO · SAMPLE DATA · NO LIVE CRM CONNECTION
          </div>
        </div>

        {/* Heading & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-7">
            <h2
              id="demo-board-heading"
              tabIndex={-1}
              className="font-doto-display uppercase text-[#F6F3EA] text-[clamp(2rem,4.6vw,4.25rem)] leading-[0.94] tracking-[-0.02em] focus:outline-none"
            >
              FROM DETECTION TO DIRECTION.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4">
            <p className="font-prose-support text-base sm:text-lg text-[#D7D1B8] leading-relaxed lg:text-right">
              Explore a sample signal board. Every interaction happens in your browser with illustrative data.
            </p>
            <button
              type="button"
              onClick={() => setHelpDialogOpen(true)}
              data-testid="what-am-i-seeing-btn"
              className="inline-flex items-center gap-2 border border-[#B9B28A]/45 bg-[#171814] px-3.5 py-2 font-doto-ui text-xs text-[#B9B28A] uppercase tracking-[0.1em] hover:border-[#F6F3EA] hover:text-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WHAT AM I SEEING?</span>
            </button>
          </div>
        </div>

        {/* Instrument Panel Controls Bar */}
        <div className="border border-[#B9B28A]/40 bg-[#171814] p-4 sm:p-5 mb-6">
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Category Filter Rail */}
            <LayoutGroup id="demo-category-chips">
              <div
                role="group"
                aria-label="Filter signals by category"
                className="flex flex-wrap items-center gap-2"
              >
                {SIGNAL_CATEGORIES.map((category) => {
                  const isActive = externalCategory === category;
                  const count =
                    category === 'ALL'
                      ? signals.length
                      : signals.filter((s) => s.category === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      data-testid={`filter-chip-${category}`}
                      onClick={() => onExternalCategoryChange(category)}
                      className={`relative px-3.5 py-2 font-doto-ui text-xs tracking-[0.12em] uppercase transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] ${
                        isActive
                          ? 'text-[#0E100C]'
                          : 'text-[#D7D1B8] border border-[#B9B28A]/30 bg-[#0E100C] hover:border-[#B9B28A] hover:text-[#F6F3EA]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="demo-active-category-bg"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 28,
                          }}
                          className="absolute inset-0 bg-[#B9B28A]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-1.5">
                        <span>{category}</span>
                        <span className="font-mono-tech text-[10px] opacity-80">
                          [{count}]
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Right Sort, Counters & Reset Controls */}
            <div className="flex flex-wrap items-center justify-between xl:justify-end gap-3 border-t xl:border-t-0 border-[#B9B28A]/20 pt-3 xl:pt-0">
              <div
                data-testid="demo-status-counters"
                className="font-mono-tech text-xs text-[#D7D1B8] uppercase tracking-[0.12em] px-2"
              >
                SHOWING <strong className="text-[#F6F3EA]">{visibleSignals.length}</strong> · REVIEWED{' '}
                <strong className="text-[#B9B28A]">{reviewedCount}</strong>/{signals.length}
              </div>

              <button
                type="button"
                onClick={handleToggleSort}
                data-testid="sort-toggle-btn"
                className="inline-flex items-center gap-2 border border-[#B9B28A]/45 bg-[#0E100C] px-3.5 py-2 font-doto-ui text-xs text-[#F6F3EA] uppercase tracking-[0.1em] hover:border-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
              >
                <ArrowUpDown className="h-3.5 w-3.5 text-[#B9B28A]" aria-hidden="true" />
                <span>SORT: {sortOrder}</span>
              </button>

              <button
                type="button"
                onClick={handleResetDemo}
                data-testid="reset-demo-btn"
                className="inline-flex items-center gap-1.5 border border-[#B9B28A]/45 bg-[#0E100C] px-3.5 py-2 font-doto-ui text-xs text-[#D7D1B8] uppercase tracking-[0.1em] hover:border-[#F6F3EA] hover:text-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>RESET DEMO</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Three-Zone Signal Instrument Architecture */}
        <div
          ref={boardGridRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch border border-[#B9B28A]/40 bg-[#171814]"
        >
          {/* Left Zone: Signal Stream List (Cols 1-5) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#B9B28A]/35 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#B9B28A]/25 pb-3 mb-4 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#B9B28A]">
                <span>DETECTED SAMPLE SIGNALS</span>
                <span>SELECT TO INSPECT</span>
              </div>

              <LayoutGroup id="signal-rows">
                <div className="space-y-3" role="listbox" aria-label="Sample signals">
                  {visibleSignals.map((sig) => {
                    const isSelected = sig.id === effectiveSelectedId;
                    const isReviewed = sig.status === 'REVIEWED';

                    return (
                      <motion.button
                        layout={!reducedMotion}
                        key={sig.id}
                        ref={(el) => {
                          rowRefs.current[sig.id] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        data-testid={`signal-row-${sig.id}`}
                        onClick={() => setSelectedId(sig.id)}
                        className={`group relative w-full text-left p-4 border transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] ${
                          isSelected
                            ? 'bg-[#0E100C] border-[#F6F3EA] translate-x-0.5'
                            : 'bg-[#0E100C]/65 border-[#B9B28A]/30 hover:border-[#B9B28A] hover:bg-[#0E100C] hover:translate-x-0.5'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-mono-tech text-[11px] uppercase tracking-[0.12em] mb-1.5">
                          <span className="text-[#B9B28A]">
                            {sig.code} · {sig.category}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 border text-[10px] ${
                              isReviewed
                                ? 'border-[#B9B28A] bg-[#B9B28A]/20 text-[#F6F3EA]'
                                : 'border-[#B9B28A]/35 text-[#D7D1B8]'
                            }`}
                          >
                            {sig.status}
                          </span>
                        </div>

                        <div className="font-doto-ui text-base sm:text-lg text-[#F6F3EA] uppercase tracking-tight">
                          {sig.title}
                        </div>

                        <div className="mt-2 flex items-center justify-between font-mono-tech text-[11px] text-[#8C876B] uppercase">
                          <span>{sig.sampleTimeLabel}</span>
                          <span className="text-[#D7D1B8]">
                            {isSelected ? 'ACTIVE PATH ▶' : sig.priorityLabel}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            <div className="mt-6 pt-3 border-t border-[#B9B28A]/20 font-mono-tech text-[11px] text-[#8C876B] uppercase tracking-[0.12em] flex items-center justify-between">
              <span> DETERMINISTIC ORDERING</span>
              <span>MODE: {sortOrder}</span>
            </div>
          </div>

          {/* Center Zone: Dynamic SVG Signal Flow Visualization (Cols 6-7 on Desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-between bg-[#0E100C] border-r border-[#B9B28A]/35 p-3 relative overflow-hidden">
            <div className="w-full text-center font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#B9B28A]/75 border-b border-[#B9B28A]/20 pb-2">
              SIGNAL VECTOR
            </div>

            <svg
              viewBox="0 0 160 360"
              className="w-full h-[360px] overflow-visible"
              aria-hidden="true"
            >
              {/* Background Schematic Guide Grid */}
              <line
                x1="80"
                y1="10"
                x2="80"
                y2="350"
                stroke="rgba(185, 178, 138, 0.18)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx="80"
                cy="180"
                r="34"
                fill="none"
                stroke="rgba(185, 178, 138, 0.22)"
                strokeWidth="1"
              />
              <circle
                cx="80"
                cy="180"
                r="14"
                fill="#171814"
                stroke="#B9B28A"
                strokeWidth="1.2"
              />

              {/* Active Computed Bezier Path from Selected Row to Context Ledger */}
              <path
                d={`M 0 ${connectorCoord.startY} C 65 ${connectorCoord.startY}, 95 ${connectorCoord.endY}, 160 ${connectorCoord.endY}`}
                fill="none"
                stroke="#B9B28A"
                strokeWidth="2"
              />

              {/* Start & End Anchor Squares */}
              <rect
                x="2"
                y={connectorCoord.startY - 5}
                width="10"
                height="10"
                fill="#F6F3EA"
              />
              <rect
                x="148"
                y={connectorCoord.endY - 5}
                width="10"
                height="10"
                fill="#B9B28A"
              />

              {/* Animated Signal Pulse Node along Path */}
              <circle
                cx="80"
                cy={(connectorCoord.startY + connectorCoord.endY) / 2}
                r="5"
                fill="#F6F3EA"
              />
            </svg>

            <div className="w-full text-center font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#B9B28A] border-t border-[#B9B28A]/20 pt-2">
              {selectedSignal ? selectedSignal.signalStrength : 'READY'}
            </div>
          </div>

          {/* Right Zone: Context & Next-Action Ledger (Cols 8-12) */}
          <div
            ref={ledgerTargetRef}
            className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between bg-[#0E100C]/90"
          >
            {selectedSignal ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSignal.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-6"
                >
                  {/* Ledger Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B9B28A]/30 pb-4">
                    <div>
                      <div className="font-mono-tech text-xs text-[#B9B28A] uppercase tracking-[0.14em]">
                        CONTEXT LEDGER // {selectedSignal.code}
                      </div>
                      <h3
                        data-testid="ledger-signal-title"
                        className="mt-1 font-doto-display text-2xl sm:text-3xl text-[#F6F3EA] uppercase tracking-tight"
                      >
                        {selectedSignal.title}
                      </h3>
                    </div>

                    <span
                      data-testid="ledger-signal-status"
                      className={`px-2.5 py-1 font-mono-tech text-xs uppercase border ${
                        selectedSignal.status === 'REVIEWED'
                          ? 'border-[#F6F3EA] bg-[#B9B28A] text-[#0E100C] font-bold'
                          : 'border-[#B9B28A]/50 bg-[#171814] text-[#F6F3EA]'
                      }`}
                    >
                      STATUS: {selectedSignal.status}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border border-[#B9B28A]/25 bg-[#171814] p-3.5 font-mono-tech text-xs">
                    <div>
                      <div className="text-[10px] text-[#8C876B] uppercase">CATEGORY</div>
                      <div className="text-[#F6F3EA] mt-0.5">{selectedSignal.category}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8C876B] uppercase">PRIORITY</div>
                      <div className="text-[#B9B28A] mt-0.5">
                        {selectedSignal.priorityLabel}
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-[#8C876B] uppercase">TRACE SOURCE</div>
                      <div className="text-[#D7D1B8] mt-0.5 truncate">
                        {selectedSignal.traceOrigin}
                      </div>
                    </div>
                  </div>

                  {/* Explanatory Context */}
                  <div>
                    <div className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#B9B28A] mb-2">
                      OBSERVED SIGNAL CONTEXT
                    </div>
                    <p className="font-prose-support text-base text-[#D7D1B8] leading-relaxed">
                      {selectedSignal.contextSummary}
                    </p>
                  </div>

                  {/* Connected Threads */}
                  <div>
                    <div className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#B9B28A] mb-2">
                      LINKED ARTIFACTS (SAMPLE)
                    </div>
                    <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs text-[#D7D1B8]">
                      {selectedSignal.connectedThreads.map((thread, idx) => (
                        <React.Fragment key={thread}>
                          <span>{thread}</span>
                          {idx < selectedSignal.connectedThreads.length - 1 && (
                            <span aria-hidden="true" className="text-[#B9B28A]">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Next Move Box */}
                  <div className="border border-[#B9B28A]/55 bg-[#171814] p-4 sm:p-5">
                    <div className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#B9B28A] mb-1.5">
                      RECOMMENDED NEXT ACTION
                    </div>
                    <p className="font-prose-support text-base sm:text-lg font-medium text-[#F6F3EA] leading-snug">
                      {selectedSignal.suggestedNextAction}
                    </p>
                  </div>

                  {/* Ledger Interactive Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <MagneticButton
                      variant="primary"
                      size="md"
                      onClick={handleToggleReview}
                      dataTestId="mark-reviewed-btn"
                      icon={<Check className="h-4 w-4" />}
                    >
                      {selectedSignal.status === 'REVIEWED'
                        ? 'RESET STATUS'
                        : 'MARK REVIEWED'}
                    </MagneticButton>

                    <MagneticButton
                      variant="secondary"
                      size="md"
                      onClick={handleCopyBrief}
                      dataTestId="copy-sample-brief-btn"
                      icon={<Copy className="h-3.5 w-3.5" />}
                    >
                      COPY SAMPLE BRIEF
                    </MagneticButton>
                  </div>

                  {/* Honest Local Action Feedback Banner */}
                  {copyFeedback && (
                    <div
                      role="status"
                      aria-live="polite"
                      data-testid="copy-feedback-banner"
                      className="border border-[#B9B28A] bg-[#171814] px-3.5 py-2 font-mono-tech text-xs text-[#F6F3EA] uppercase tracking-[0.12em]"
                    >
                      ✓ {copyFeedback}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="py-12 text-center font-mono-tech text-sm text-[#B9B28A] uppercase">
                NO SAMPLE SIGNALS MATCH THIS FILTER. CLICK RESET DEMO TO RESTORE.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accessible Concept Disclosure Dialog ("WHAT AM I SEEING?") */}
      <AccessibleDialog
        isOpen={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        kicker="CONCEPT DISCLOSURE // OPENLANDING"
        title="WHAT AM I SEEING?"
      >
        <div className="space-y-4 font-prose-support text-base text-[#D7D1B8] leading-relaxed">
          <p>
            <strong className="text-[#F6F3EA]">FORUM</strong> is a fictional AI-native revenue intelligence product concept created for <strong className="text-[#F6F3EA]">OpenLanding</strong>.
          </p>
          <p>
            Every record, contact thread, priority index, and recommended action displayed in this Signal Board operates entirely in your browser memory using deterministic example data.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#B9B28A]">
            <li>No live CRM, email, or calendar integrations are connected.</li>
            <li>No background AI inference or external network calls occur when filtering or reviewing signals.</li>
            <li>All controls (filtering, sorting, reviewing, copying a sample brief, and resetting) demonstrate the interface mechanics honestly.</li>
          </ul>
          <div className="pt-4 border-t border-[#B9B28A]/30 flex justify-end">
            <MagneticButton
              variant="primary"
              size="sm"
              onClick={() => setHelpDialogOpen(false)}
            >
              UNDERSTOOD
            </MagneticButton>
          </div>
        </div>
      </AccessibleDialog>
    </section>
  );
};
