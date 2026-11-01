'use client';
import React, { useRef } from 'react';
import { LayoutGrid, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { APP_CATALOG } from '../../lib/os/windowReducer';
import {
  AppId,
  DeckSlotConfig,
  PixelIconId,
  ProfileId,
  RunLogEntry,
  SimulationEnvironmentState,
  WindowManagerState,
} from '../../lib/os/types';
import { AppLauncherPixelIcon, CtrlRoomGlyphLogo } from '../icons/PixelSprites';
import { OSWindow } from './OSWindow';
import { DeckLabApp } from '../apps/DeckLabApp';
import { ActionLibraryApp } from '../apps/ActionLibraryApp';
import { RunLogApp } from '../apps/RunLogApp';
import { ProfileSwitcherApp } from '../apps/ProfileSwitcherApp';
import { DeviceInfoApp } from '../apps/DeviceInfoApp';
import { AboutConceptApp } from '../apps/AboutConceptApp';
import { NotesApp } from '../apps/NotesApp';

interface DesktopStageProps {
  wmState: WindowManagerState;
  activeMobileApp: AppId;
  activeProfile: ProfileId;
  allProfiles: Record<ProfileId, DeckSlotConfig[]>;
  selectedSlotIndex: number;
  simEnv: SimulationEnvironmentState;
  runLogs: RunLogEntry[];
  isScanningGrid: boolean;
  lastSavedTime: string | null;
  statusAnnouncement: string;
  audioEnabled: boolean;
  onSelectMobileApp: (appId: AppId) => void;
  onOpenWindow: (appId: AppId) => void;
  onCloseWindow: (appId: AppId) => void;
  onMinimizeWindow: (appId: AppId) => void;
  onToggleMaximizeWindow: (appId: AppId) => void;
  onFocusWindow: (appId: AppId) => void;
  onMoveWindow: (appId: AppId, x: number, y: number, w: number, h: number) => void;
  onNudgeWindow: (appId: AppId, dx: number, dy: number, w: number, h: number) => void;
  onTidyWindows: (stageW: number, stageH: number) => void;
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
  onResetProfile: (profileId: ProfileId) => void;
  onSaveDemo: () => boolean;
  onClearLogs: () => void;
  onUpdateNotes: (text: string) => void;
  onToggleAudio: () => void;
  onResetAllDemoData: () => void;
}

export const DesktopStage: React.FC<DesktopStageProps> = ({
  wmState,
  activeMobileApp,
  activeProfile,
  allProfiles,
  selectedSlotIndex,
  simEnv,
  runLogs,
  isScanningGrid,
  lastSavedTime,
  statusAnnouncement,
  audioEnabled,
  onSelectMobileApp,
  onOpenWindow,
  onCloseWindow,
  onMinimizeWindow,
  onToggleMaximizeWindow,
  onFocusWindow,
  onMoveWindow,
  onNudgeWindow,
  onTidyWindows,
  onSelectSlot,
  onTriggerSlot,
  onAssignAction,
  onCustomizeSlot,
  onSwitchProfileRequest,
  onResetProfile,
  onSaveDemo,
  onClearLogs,
  onUpdateNotes,
  onToggleAudio,
  onResetAllDemoData,
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const currentSlots = allProfiles[activeProfile];

  const renderAppContent = (appId: AppId) => {
    switch (appId) {
      case 'deck-lab':
        return (
          <DeckLabApp
            activeProfile={activeProfile}
            slots={currentSlots}
            selectedSlotIndex={selectedSlotIndex}
            simEnv={simEnv}
            isScanningGrid={isScanningGrid}
            lastSavedTime={lastSavedTime}
            statusAnnouncement={statusAnnouncement}
            onSelectSlot={onSelectSlot}
            onTriggerSlot={onTriggerSlot}
            onAssignAction={onAssignAction}
            onCustomizeSlot={onCustomizeSlot}
            onSwitchProfileRequest={onSwitchProfileRequest}
            onSaveDemo={onSaveDemo}
            onResetActiveProfile={() => onResetProfile(activeProfile)}
            onOpenApp={(targetApp) => {
              onOpenWindow(targetApp);
              onSelectMobileApp(targetApp);
            }}
          />
        );
      case 'action-library':
        return (
          <ActionLibraryApp
            selectedSlotIndex={selectedSlotIndex}
            slots={currentSlots}
            onAssignAction={onAssignAction}
            onSelectSlot={onSelectSlot}
          />
        );
      case 'run-log':
        return (
          <RunLogApp
            logs={runLogs}
            onClearLogs={onClearLogs}
            onTriggerDemoKey={() => onTriggerSlot(selectedSlotIndex)}
          />
        );
      case 'profile-switcher':
        return (
          <ProfileSwitcherApp
            activeProfile={activeProfile}
            allProfiles={allProfiles}
            onSwitchProfile={onSwitchProfileRequest}
            onResetProfile={onResetProfile}
          />
        );
      case 'device-info':
        return (
          <DeviceInfoApp
            slots={currentSlots}
            selectedSlotIndex={selectedSlotIndex}
            onSelectSlot={onSelectSlot}
          />
        );
      case 'about-concept':
        return (
          <AboutConceptApp
            audioEnabled={audioEnabled}
            onToggleAudio={onToggleAudio}
            onResetAllDemoData={onResetAllDemoData}
          />
        );
      case 'notes':
        return <NotesApp content={simEnv.notesContent} onChange={onUpdateNotes} />;
    }
  };

  const deckLabWin = wmState.windows['deck-lab'];
  const actionLibWin = wmState.windows['action-library'];
  const showPatchCable =
    deckLabWin.isOpen &&
    !deckLabWin.isMinimized &&
    actionLibWin.isOpen &&
    !actionLibWin.isMinimized;

  return (
    <div data-cr-ambient className="cr-desktop w-full border-2 border-[#2858FF] bg-[#111A31] cr-shadow-ctrl-lg overflow-hidden">
      {/* Top Proprietary CTRL/ROOM OS System Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#162242] border-b-2 border-[#2858FF]">
        <div className="flex items-center gap-2.5">
          <CtrlRoomGlyphLogo className="w-5 h-5" />
          <span className="cr-font-mono-code text-xs font-bold text-[#E8F0FF] tracking-wider">
            C/R OS — BUILD 01.15
          </span>
          <span className="hidden sm:inline-block text-xs text-[#61728F]">·</span>
          <span className="hidden sm:inline-block cr-font-mono-code text-[11px] text-[#E4FF58]">
            PROFILE: {activeProfile}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const rect = stageRef.current?.getBoundingClientRect();
              onTidyWindows(rect?.width || 1220, rect?.height || 640);
            }}
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#111A31] text-[#B6D7F7] hover:text-[#E4FF58] border border-[#61728F] transition-colors whitespace-nowrap shrink-0"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>TIDY WINDOWS</span>
          </button>

          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={audioEnabled ? 'Mute UI synth audio' : 'Enable UI synth audio'}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold border transition-colors whitespace-nowrap shrink-0 ${
              audioEnabled
                ? 'bg-[#E4FF58] text-[#111A31] border-[#111A31]'
                : 'bg-[#111A31] text-[#B6D7F7] border-[#61728F] hover:text-[#E8F0FF]'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{audioEnabled ? 'AUDIO ON' : 'AUDIO MUTED'}</span>
          </button>

          <button
            type="button"
            onClick={onResetAllDemoData}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#111A31] text-[#FC5FA9] hover:bg-[#FC5FA9] hover:text-[#111A31] border border-[#FC5FA9]/60 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET DEMO</span>
          </button>
        </div>
      </div>

      {/* DESKTOP OS WORKSPACE (lg and up): Proprietary Left Launcher Rail + Draggable Freeform Window Stage */}
      <div className="hidden lg:flex h-[670px] relative cr-bg-ctrl-dither">
        {/* Proprietary Left Launcher Rail */}
        <aside
          aria-label="CTRL/ROOM OS Application Launchers"
          className="w-48 shrink-0 bg-[#0D1529]/95 border-r-2 border-[#2858FF] p-2.5 flex flex-col justify-between z-30"
        >
          <div className="space-y-1.5">
            <div className="px-1.5 py-1 text-[10px] cr-font-mono-code font-bold text-[#B6D7F7] tracking-wider">
              STUDIO APPS (7)
            </div>
            {APP_CATALOG.map((app) => {
              const win = wmState.windows[app.id];
              const isOpen = win.isOpen && !win.isMinimized;
              const isFocused = wmState.focusedApp === app.id && isOpen;

              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => onOpenWindow(app.id)}
                  onDoubleClick={() => onOpenWindow(app.id)}
                  aria-label={`Open ${app.shortTitle} application`}
                  className={`group w-full p-2 text-left border-2 cr-transition-control flex items-center justify-between gap-1.5 focus-visible:outline-2 focus-visible:outline-[#E4FF58] ${
                    isFocused
                      ? 'bg-[#2858FF] border-[#E4FF58] text-[#E8F0FF] translate-x-0.5'
                      : isOpen
                      ? 'bg-[#17254A] border-[#2858FF] text-[#E8F0FF] hover:border-[#E4FF58]'
                      : 'bg-[#111A31] border-[#61728F]/50 text-[#B6D7F7] hover:border-[#B6D7F7] hover:text-[#E8F0FF] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <AppLauncherPixelIcon appId={app.id} className="w-4 h-4 shrink-0" />
                    <span className="cr-font-mono-code text-[10.5px] font-bold whitespace-nowrap">
                      {app.shortTitle}
                    </span>
                  </div>
                  {/* Status Pip */}
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 shrink-0 ${
                      isFocused
                        ? 'bg-[#E4FF58]'
                        : win.isOpen
                        ? 'bg-[#FC5FA9]'
                        : 'bg-[#61728F]/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Creative Prompt Box in Rail Footer */}
          <div className="p-2.5 bg-[#111A31] border border-[#2858FF] space-y-1">
            <div className="flex items-center gap-1 text-[10px] cr-font-mono-code font-bold text-[#E4FF58]">
              <Sparkles className="w-3 h-3" />
              <span>WORKFLOW TIP</span>
            </div>
            <p className="text-[11px] text-[#B6D7F7] leading-snug">{simEnv.creativePrompt}</p>
          </div>
        </aside>

        {/* Freeform Desktop Field */}
        <div ref={stageRef} className="relative flex-1 h-full overflow-hidden cr-bg-ice-grid">
          {/* Decorative Wallpaper Geometry & Patch Cable Overlay */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full z-0"
            aria-hidden="true"
          >
            {/* Subtle Asymmetrical Studio Blueprint Lines */}
            <rect
              x="24"
              y="24"
              width="280"
              height="140"
              fill="none"
              stroke="rgba(40, 88, 255, 0.18)"
              strokeWidth="2"
            />
            <rect
              x="820"
              y="390"
              width="320"
              height="180"
              fill="none"
              stroke="rgba(228, 255, 88, 0.12)"
              strokeWidth="2"
            />

            {/* Animated Patch Cable between Action Library and Deck Lab when both are visible */}
            {showPatchCable && (
              <g>
                <path
                  d={`M ${actionLibWin.position.x + 120} ${actionLibWin.position.y + 80} L ${
                    deckLabWin.position.x + 220
                  } ${deckLabWin.position.y + 180}`}
                  stroke="#E4FF58"
                  strokeWidth="3"
                  fill="none"
                  className="cr-patch-cable-line"
                />
                <rect
                  x={deckLabWin.position.x + 215}
                  y={deckLabWin.position.y + 175}
                  width="10"
                  height="10"
                  fill="#FC5FA9"
                />
              </g>
            )}
          </svg>

          {/* Render All Open Non-Minimized Windows */}
          {APP_CATALOG.map((app) => (
            <OSWindow
              key={app.id}
              windowState={wmState.windows[app.id]}
              isFocused={wmState.focusedApp === app.id}
              condensedMode={wmState.condensedMode}
              stageRef={stageRef}
              onFocus={onFocusWindow}
              onClose={onCloseWindow}
              onMinimize={onMinimizeWindow}
              onToggleMaximize={onToggleMaximizeWindow}
              onMove={onMoveWindow}
              onNudge={onNudgeWindow}
            >
              {renderAppContent(app.id)}
            </OSWindow>
          ))}

          {/* Proprietary Bottom-Right Mini-Status Strip */}
          <div className="absolute bottom-2 right-2 left-2 z-40 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-[#0D1529]/95 border-2 border-[#2858FF]">
            {/* Minimized / Background Window Restore Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] cr-font-mono-code font-bold text-[#B6D7F7] mr-1">
                WINDOW TRAY:
              </span>
              {APP_CATALOG.map((app) => {
                const win = wmState.windows[app.id];
                const isActive = wmState.focusedApp === app.id && win.isOpen && !win.isMinimized;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => onOpenWindow(app.id)}
                    className={`px-2 py-0.5 text-[10px] cr-font-mono-code font-bold border transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#E4FF58] text-[#111A31] border-[#111A31]'
                        : win.isMinimized
                        ? 'bg-[#FC5FA9]/20 text-[#FC5FA9] border-[#FC5FA9]'
                        : win.isOpen
                        ? 'bg-[#2858FF] text-[#E8F0FF] border-[#E8F0FF]/40'
                        : 'bg-[#111A31] text-[#B6D7F7] border-[#61728F]/50 hover:text-[#E8F0FF]'
                    }`}
                  >
                    {app.shortTitle}
                    {win.isMinimized ? ' [MIN]' : ''}
                  </button>
                );
              })}
            </div>

            {/* Live Simulation Pips */}
            <div className="flex items-center gap-3 text-[10px] cr-font-mono-code">
              <span className="text-[#B6D7F7]">
                SCENE: <strong className="text-[#E8F0FF]">{simEnv.activeScene}</strong>
              </span>
              <span className="text-[#B6D7F7]">
                EVENTS: <strong className="text-[#E4FF58]">{runLogs.length}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET STACKED APP-SWITCHER (< 1024px): No Freeform Window Dragging */}
      <div className="lg:hidden bg-[#111A31]">
        {/* Accessible Touch App Switcher Tabs */}
        <div
          role="tablist"
          aria-label="CTRL/ROOM OS Mobile Application Switcher"
          className="flex items-center gap-1.5 overflow-x-auto p-2.5 bg-[#0C1326] border-b-2 border-[#2858FF]"
        >
          {APP_CATALOG.map((app) => {
            const isSelected = activeMobileApp === app.id;
            return (
              <button
                key={app.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => onSelectMobileApp(app.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs cr-font-mono-code font-bold border-2 whitespace-nowrap shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#2858FF] text-[#E8F0FF] border-[#E4FF58]'
                    : 'bg-[#15203D] text-[#B6D7F7] border-[#61728F]/50'
                }`}
              >
                <AppLauncherPixelIcon appId={app.id} className="w-4 h-4" />
                <span>{app.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Mobile Panel */}
        <div key={activeMobileApp} role="tabpanel" aria-label={APP_CATALOG.find(app => app.id === activeMobileApp)?.title}
          className="cr-app-panel p-3 sm:p-4">{renderAppContent(activeMobileApp)}</div>
      </div>
    </div>
  );
};
