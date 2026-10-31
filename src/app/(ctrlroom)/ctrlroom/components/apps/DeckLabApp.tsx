'use client';
import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Save,
  Library,
  Terminal,
  Sliders,
  Layers,
  Mic,
  MicOff,
  Video,
  Clock,
} from 'lucide-react';
import { getActionById, PIXEL_ICON_OPTIONS } from '../../lib/os/actions';
import { getSlotRowCol } from '../../lib/os/simulator';
import {
  AppId,
  DeckSlotConfig,
  PixelIconId,
  ProfileId,
  SimulationEnvironmentState,
} from '../../lib/os/types';
import { PixelActionIcon } from '../icons/PixelSprites';

interface DeckLabAppProps {
  activeProfile: ProfileId;
  slots: DeckSlotConfig[];
  selectedSlotIndex: number;
  simEnv: SimulationEnvironmentState;
  isScanningGrid: boolean;
  lastSavedTime: string | null;
  statusAnnouncement: string;
  onSelectSlot: (slotIndex: number) => void;
  onTriggerSlot: (slotIndex: number) => void;
  onAssignAction: (slotIndex: number, actionId: string) => void;
  onCustomizeSlot: (
    slotIndex: number,
    updates: {
      customLabel?: string;
      customIcon?: PixelIconId;
      customAccent?: 'cobalt' | 'voltage' | 'magenta' | 'frost' | 'ice';
    }
  ) => void;
  onSwitchProfileRequest: (profileId: ProfileId) => void;
  onSaveDemo: () => void;
  onResetActiveProfile: () => void;
  onOpenApp: (appId: AppId) => void;
}

export const DeckLabApp: React.FC<DeckLabAppProps> = ({
  activeProfile,
  slots,
  selectedSlotIndex,
  simEnv,
  isScanningGrid,
  lastSavedTime,
  statusAnnouncement,
  onSelectSlot,
  onTriggerSlot,
  onAssignAction,
  onCustomizeSlot,
  onSwitchProfileRequest,
  onSaveDemo,
  onResetActiveProfile,
  onOpenApp,
}) => {
  const [interactionMode, setInteractionMode] = useState<'RUN' | 'CONFIGURE'>('RUN');
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);

  const selectedSlot = slots[selectedSlotIndex] || slots[0];
  const selectedAction = getActionById(selectedSlot.actionId);
  const { row, col } = getSlotRowCol(selectedSlot.slotIndex);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const getAccentClasses = (accent: string, isSelected: boolean) => {
    if (isSelected) {
      return 'border-[#E4FF58] bg-[#2858FF] text-[#E8F0FF] cr-shadow-ctrl-active';
    }
    switch (accent) {
      case 'voltage':
        return 'border-[#E4FF58]/80 bg-[#182547] text-[#E8F0FF] hover:border-[#E4FF58]';
      case 'magenta':
        return 'border-[#FC5FA9]/80 bg-[#1B1F3D] text-[#E8F0FF] hover:border-[#FC5FA9]';
      case 'cobalt':
        return 'border-[#2858FF] bg-[#152347] text-[#E8F0FF] hover:border-[#E4FF58]';
      default:
        return 'border-[#B6D7F7]/60 bg-[#15203D] text-[#E8F0FF] hover:border-[#E8F0FF]';
    }
  };

  const getSceneFilterStyle = () => {
    switch (simEnv.colorGradePreset) {
      case 'COBALT_PUNCH':
        return 'bg-gradient-to-br from-[#2858FF]/45 via-[#111A31] to-[#FC5FA9]/30';
      case 'VOLTAGE_WARM':
        return 'bg-gradient-to-br from-[#E4FF58]/30 via-[#19284B] to-[#2858FF]/35';
      default:
        return 'bg-gradient-to-br from-[#192544] via-[#111A31] to-[#0B1121]';
    }
  };

  return (
    <div className="space-y-4">
      {/* Polite Live Region for Screen Reader Announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusAnnouncement}
      </div>

      {/* Simulation Honesty Banner + Quick Profile Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#0C1326] border-2 border-[#2858FF]">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31]">
            SIMULATOR
          </span>
          <span className="cr-font-mono-code text-[11px] font-bold text-[#E8F0FF] tracking-wide">
            INTERACTIVE BROWSER SIMULATION — NO DEVICE CONNECTION
          </span>
        </div>

        <div className="flex items-center gap-1">
          {(['STUDIO', 'LIVE', 'EVERYDAY'] as ProfileId[]).map((prof) => (
            <button
              key={prof}
              type="button"
              onClick={() => onSwitchProfileRequest(prof)}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold transition-colors whitespace-nowrap shrink-0 ${
                activeProfile === prof
                  ? 'bg-[#E4FF58] text-[#111A31]'
                  : 'bg-[#172342] text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              {prof}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: 5x3 Virtual Key Grid (Left) + Studio Preview & Slot Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: 5x3 Virtual Deck Surface */}
        <div className="lg:col-span-7 space-y-3">
          {/* Mode Switch & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-[#0C1326] p-1 border border-[#61728F]">
              <button
                type="button"
                onClick={() => setInteractionMode('RUN')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs cr-font-mono-code font-bold whitespace-nowrap shrink-0 ${
                  interactionMode === 'RUN'
                    ? 'bg-[#E4FF58] text-[#111A31]'
                    : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>TEST KEYS (RUN)</span>
              </button>
              <button
                type="button"
                onClick={() => setInteractionMode('CONFIGURE')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs cr-font-mono-code font-bold whitespace-nowrap shrink-0 ${
                  interactionMode === 'CONFIGURE'
                    ? 'bg-[#2858FF] text-[#E8F0FF]'
                    : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>EDIT / ASSIGN</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onOpenApp('action-library')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#182649] text-[#E8F0FF] border border-[#2858FF] hover:border-[#E4FF58] transition-colors whitespace-nowrap shrink-0"
              >
                <Library className="w-3.5 h-3.5 text-[#E4FF58]" />
                <span>ACTION LIBRARY</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenApp('run-log')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#182649] text-[#E8F0FF] border border-[#61728F] hover:border-[#E4FF58] transition-colors whitespace-nowrap shrink-0"
              >
                <Terminal className="w-3.5 h-3.5 text-[#FC5FA9]" />
                <span>RUN LOG</span>
              </button>
            </div>
          </div>

          {/* 5 Columns x 3 Rows Virtual Key Matrix */}
          <div className="relative p-3.5 bg-[#0A1020] border-2 border-[#2858FF] cr-shadow-ctrl overflow-hidden">
            {/* Grid Scan Overlay on Profile Change */}
            {isScanningGrid && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-[#E4FF58]/35 to-transparent cr-animate-grid-scan"
              />
            )}

            <div className="flex items-center justify-between mb-2.5 text-[11px] cr-font-mono-code text-[#B6D7F7]">
              <span>5 COLUMNS × 3 ROWS (15 PROGRAMMABLE LCD SLOTS)</span>
              <span className="text-[#E4FF58] font-bold">
                SELECTED: SLOT {String(selectedSlotIndex + 1).padStart(2, '0')} (R{row}·C{col})
              </span>
            </div>

            <div
              role="grid"
              aria-label="15-Key Stream Deck MK.2 Virtual Control Grid"
              className="grid grid-cols-5 gap-2 sm:gap-2.5"
            >
              {slots.map((slot) => {
                const action = getActionById(slot.actionId);
                const isSelected = slot.slotIndex === selectedSlotIndex;
                const isRecentlyTriggered = simEnv.lastTriggeredSlot === slot.slotIndex;
                const label = slot.customLabel || action.shortLabel;
                const iconId = slot.customIcon || action.icon;
                const accent = slot.customAccent || action.accentColor;

                const isToggleActive =
                  (action.id === 'start-record' && simEnv.isRecording) ||
                  (action.id === 'mute-mic' && simEnv.isMicMuted) ||
                  (action.id === 'focus-mode' && simEnv.isFocusMode) ||
                  (action.id === 'launch-timer' && simEnv.timerRunning);

                return (
                  <button
                    key={slot.slotIndex}
                    type="button"
                    data-testid={`deck-slot-${slot.slotIndex}`}
                    data-pressed={isRecentlyTriggered ? 'true' : 'false'}
                    aria-label={`Slot ${slot.slotIndex + 1}: ${label} (${action.title})`}
                    aria-pressed={isSelected}
                    onClick={() => {
                      onSelectSlot(slot.slotIndex);
                      if (interactionMode === 'RUN') {
                        onTriggerSlot(slot.slotIndex);
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverSlot(slot.slotIndex);
                    }}
                    onDragLeave={() => setDragOverSlot(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverSlot(null);
                      const droppedActionId = e.dataTransfer.getData('text/plain');
                      if (droppedActionId) {
                        onSelectSlot(slot.slotIndex);
                        onAssignAction(slot.slotIndex, droppedActionId);
                      }
                    }}
                    className={`cr-deck-key-btn relative aspect-square p-1.5 sm:p-2 flex flex-col items-center justify-between border-2 transition-all focus-visible:outline-2 focus-visible:outline-[#E4FF58] ${getAccentClasses(
                      accent,
                      isSelected
                    )} ${dragOverSlot === slot.slotIndex ? 'ring-2 ring-[#FC5FA9] scale-105' : ''}`}
                  >
                    {/* Top Row: Slot Number + Live Pip */}
                    <div className="w-full flex items-center justify-between text-[9px] cr-font-mono-code leading-none">
                      <span className={isSelected ? 'text-[#E4FF58] font-bold' : 'text-[#B6D7F7]'}>
                        {String(slot.slotIndex + 1).padStart(2, '0')}
                      </span>
                      {isToggleActive && (
                        <span className="px-1 bg-[#E4FF58] text-[#111A31] font-bold text-[8px]">
                          ON
                        </span>
                      )}
                    </div>

                    {/* Center 16x16 Pixel Icon */}
                    <div className="my-auto">
                      <PixelActionIcon
                        icon={iconId}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        color={isSelected ? '#E4FF58' : '#E8F0FF'}
                      />
                    </div>

                    {/* Bottom Key Label */}
                    <span className="w-full truncate text-center cr-font-mono-code text-[8.5px] font-bold tracking-tighter leading-none">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Persistence & Reset Controls */}
            <div className="mt-3 pt-3 border-t border-[#61728F]/40 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onSaveDemo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] transition-colors whitespace-nowrap shrink-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>SAVE THIS DEMO</span>
                </button>
                <button
                  type="button"
                  onClick={onResetActiveProfile}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs cr-font-mono-code font-bold bg-[#172342] text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F] transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET PROFILE</span>
                </button>
              </div>

              <span className="text-[10px] cr-font-mono-code text-[#B6D7F7]">
                {lastSavedTime
                  ? `SAVED TO BROWSER STORAGE @ ${lastSavedTime}`
                  : 'LOCAL BROWSER STORAGE ONLY'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Simulated Studio Monitor + Selected Slot Customizer */}
        <div className="lg:col-span-5 space-y-3">
          {/* Simulated Studio Preview Monitor */}
          <div className="p-3 bg-[#0A1020] border-2 border-[#61728F]">
            <div className="flex items-center justify-between mb-2">
              <span className="cr-font-mono-code text-[11px] font-bold text-[#E4FF58]">
                SIMULATED STUDIO MONITOR
              </span>
              <span className="cr-font-mono-code text-[10px] text-[#B6D7F7]">
                LUT: {simEnv.colorGradePreset.replace('_', ' ')}
              </span>
            </div>

            {/* Viewport Screen */}
            <div
              className={`relative h-36 border border-[#2858FF] p-3 flex flex-col justify-between overflow-hidden transition-all ${getSceneFilterStyle()}`}
            >
              {/* Top Status Chips inside Monitor */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 z-10">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] cr-font-mono-code font-bold ${
                      simEnv.isRecording
                        ? 'bg-[#FC5FA9] text-[#111A31]'
                        : 'bg-[#111A31]/90 text-[#B6D7F7] border border-[#61728F]'
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    {simEnv.isRecording ? 'REC ON [DEMO]' : 'STANDBY'}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] cr-font-mono-code font-bold ${
                      simEnv.isMicMuted
                        ? 'bg-[#E4FF58] text-[#111A31]'
                        : 'bg-[#111A31]/90 text-[#E8F0FF] border border-[#2858FF]'
                    }`}
                  >
                    {simEnv.isMicMuted ? (
                      <>
                        <MicOff className="w-3 h-3" /> DEMO MIC MUTED
                      </>
                    ) : (
                      <>
                        <Mic className="w-3 h-3" /> DEMO MIC LIVE
                      </>
                    )}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#111A31] text-[#E4FF58] border border-[#E4FF58]/50">
                  <Clock className="w-3 h-3" />
                  {formatTimer(simEnv.timerSeconds)}
                </span>
              </div>

              {/* Center Scene Illustration */}
              <div
                className={`my-auto flex items-center justify-between px-2 transition-transform duration-200 ${
                  simEnv.camZoomLevel === 2 ? 'scale-110' : 'scale-100'
                }`}
              >
                <div>
                  <div className="text-[10px] cr-font-mono-code text-[#B6D7F7]">
                    ACTIVE SCENE · {simEnv.camZoomLevel}X OPTIC
                  </div>
                  <div className="cr-font-display text-sm font-bold text-[#E8F0FF]">
                    {simEnv.activeScene.replace('_', ' ')}
                  </div>
                </div>
                {simEnv.audioDuckActive && (
                  <span className="px-2 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#2858FF] text-[#E8F0FF]">
                    BGM -12dB
                  </span>
                )}
              </div>

              {/* Lower Third Overlay + Sequence Markers */}
              <div className="space-y-1.5 z-10">
                {simEnv.lowerThirdVisible && (
                  <div className="px-2 py-1 bg-[#111A31]/95 border-l-2 border-[#E4FF58] flex items-center justify-between text-[10px] cr-font-mono-code">
                    <span className="font-bold text-[#E8F0FF]">CTRL/ROOM STUDIO</span>
                    <span className="text-[#E4FF58]">{activeProfile} PRESET</span>
                  </div>
                )}

                {/* Timeline Scrubber with Markers */}
                <div className="relative h-2 bg-[#111A31] border border-[#61728F]/60">
                  <div
                    className="h-full bg-[#2858FF]/50"
                    style={{ width: `${simEnv.renderProgress}%` }}
                  />
                  {simEnv.timelineMarkers.map((pos, idx) => (
                    <span
                      key={`${pos}-${idx}`}
                      style={{ left: `${pos}%` }}
                      className="absolute top-0 bottom-0 w-1 bg-[#E4FF58]"
                      title={`Timeline Marker @ ${pos}%`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slot Inspector & Customizer */}
          <div className="p-3 bg-[#15203D] border-2 border-[#2858FF] space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] cr-font-mono-code font-bold text-[#E4FF58]">
                  SLOT {String(selectedSlotIndex + 1).padStart(2, '0')} INSPECTOR (ROW {row}, COL {col})
                </span>
                <h3 className="cr-font-display text-sm font-bold text-[#E8F0FF]">
                  {selectedAction.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onTriggerSlot(selectedSlotIndex)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                <span>TEST RUN</span>
              </button>
            </div>

            <p className="text-xs text-[#B6D7F7] leading-relaxed">{selectedAction.description}</p>

            {/* Rename Key Label & Choose Custom Icon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <label
                  htmlFor="slot-custom-label"
                  className="block text-[10px] cr-font-mono-code font-bold text-[#B6D7F7] mb-1"
                >
                  CUSTOM KEY LABEL
                </label>
                <input
                  id="slot-custom-label"
                  type="text"
                  maxLength={12}
                  value={selectedSlot.customLabel ?? selectedAction.shortLabel}
                  onChange={(e) =>
                    onCustomizeSlot(selectedSlotIndex, { customLabel: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 text-xs cr-font-mono-code bg-[#0C1326] text-[#E8F0FF] border border-[#61728F] focus:border-[#E4FF58] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="slot-custom-icon"
                  className="block text-[10px] cr-font-mono-code font-bold text-[#B6D7F7] mb-1"
                >
                  PIXEL ICON GLYPH
                </label>
                <select
                  id="slot-custom-icon"
                  value={selectedSlot.customIcon || selectedAction.icon}
                  onChange={(e) =>
                    onCustomizeSlot(selectedSlotIndex, {
                      customIcon: e.target.value as PixelIconId,
                    })
                  }
                  className="w-full px-2 py-1.5 text-xs cr-font-mono-code bg-[#0C1326] text-[#E8F0FF] border border-[#61728F] focus:border-[#E4FF58] focus:outline-none"
                >
                  {PIXEL_ICON_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="cr-font-mono-code text-[#B6D7F7]">
                Want a different shortcut on Slot {String(selectedSlotIndex + 1).padStart(2, '0')}?
              </span>
              <button
                type="button"
                onClick={() => onOpenApp('action-library')}
                className="inline-flex items-center gap-1 cr-font-mono-code font-bold text-[#E4FF58] hover:underline whitespace-nowrap shrink-0"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>SWAP ACTION</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
