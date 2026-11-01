'use client';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
  ExternalLink,
  ArrowDown,
  RotateCcw,
} from 'lucide-react';
import { BrandHeader } from './components/layout/BrandHeader';
import { BootSequence } from './components/motion/BootSequence';
import { CtrlRoomMotion } from './components/motion/CtrlRoomMotion';
import { RevealText } from './components/motion/RevealText';
import { MotionDialog } from './components/motion/MotionDialog';
import { scrollToCtrlRoom } from './components/motion/tokens';
import { DesktopStage } from './components/os/DesktopStage';
import { StreamDeckHardwareView } from './components/hardware/StreamDeckHardwareView';
import { PixelActionIcon, CtrlRoomGlyphLogo } from './components/icons/PixelSprites';
import { ACTION_LIBRARY, getActionById } from './lib/os/actions';
import {
  CURATED_PROFILES,
  cloneProfileSlots,
  isProfileModified,
} from './lib/os/presets';
import {
  assignActionToSlot,
  createInitialSimulationState,
  customizeSlot,
  executeSlotSimulation,
  formatTimestamp,
  getSlotRowCol,
} from './lib/os/simulator';
import {
  clearDemoStorage,
  createDefaultProfilesState,
  loadDemoStateFromStorage,
  saveDemoStateToStorage,
} from './lib/os/storage';
import { soundEngine } from './lib/os/sound';
import {
  ActionCategory,
  AppId,
  DeckSlotConfig,
  PixelIconId,
  ProfileId,
  RunLogEntry,
  SimulationEnvironmentState,
} from './lib/os/types';
import {
  createInitialWindowManagerState,
  windowReducer,
} from './lib/os/windowReducer';

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scanTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [bootReady, setBootReady] = useState(false);
  const completeBoot = useCallback(() => setBootReady(true), []);
  useEffect(() => () => { if (scanTimeout.current) clearTimeout(scanTimeout.current); }, []);
  const [wmState, dispatchWindow] = useReducer(
    windowReducer,
    undefined,
    createInitialWindowManagerState
  );
  const [activeMobileApp, setActiveMobileApp] = useState<AppId>('deck-lab');

  // Initialize with clean defaults for SSR hydration safety
  const [allProfiles, setAllProfiles] = useState<Record<ProfileId, DeckSlotConfig[]>>(createDefaultProfilesState);
  const [activeProfile, setActiveProfile] = useState<ProfileId>('STUDIO');
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);
  const [simEnv, setSimEnv] = useState<SimulationEnvironmentState>(createInitialSimulationState);
  const [runLogs, setRunLogs] = useState<RunLogEntry[]>(() => [
    {
      id: 'init-log-1',
      timestamp: '00:00:00',
      slotIndex: 0,
      row: 1,
      col: 1,
      actionId: 'start-record',
      label: 'SYS BOOT',
      category: 'SYSTEM',
      statusText: 'C/R OS 01.15 READY',
      detail: 'Initialized 15-key (5×3) browser simulation surface. No hardware connected.',
    },
  ]);

  const [isScanningGrid, setIsScanningGrid] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Restore client-saved storage safely on client mount
  useEffect(() => {
    const saved = loadDemoStateFromStorage();
    if (saved) {
      if (saved.profiles) setAllProfiles(saved.profiles);
      if (saved.activeProfile) setActiveProfile(saved.activeProfile);
      if (saved.notesContent) {
        setSimEnv((prev) => ({ ...prev, notesContent: saved.notesContent }));
      }
      if (saved.savedAt) setLastSavedTime(saved.savedAt);
    }
    setRunLogs((prev) =>
      prev.map((log) =>
        log.id === 'init-log-1'
          ? { ...log, timestamp: formatTimestamp(new Date()) }
          : log
      )
    );
  }, []);
  const [statusAnnouncement, setStatusAnnouncement] = useState<string>(
    'CTRL/ROOM OS ready. 15-key virtual deck active.'
  );
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [editorialCategory, setEditorialCategory] = useState<ActionCategory>('CREATE');
  const [pendingProfileConfirm, setPendingProfileConfirm] = useState<ProfileId | null>(null);
  const [profileConfirmOpen, setProfileConfirmOpen] = useState(false);
  const [confirmFromProfile, setConfirmFromProfile] = useState<ProfileId>('STUDIO');

  // Internal sprint timer tick
  useEffect(() => {
    if (!simEnv.timerRunning) return;
    const interval = window.setInterval(() => {
      setSimEnv((prev) => {
        if (!prev.timerRunning) return prev;
        if (prev.timerSeconds <= 1) {
          return { ...prev, timerSeconds: 0, timerRunning: false };
        }
        return { ...prev, timerSeconds: prev.timerSeconds - 1 };
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [simEnv.timerRunning]);

  const currentSlots = allProfiles[activeProfile];

  const handleOpenAppWindow = (appId: AppId) => {
    dispatchWindow({ type: 'OPEN_WINDOW', appId });
    setActiveMobileApp(appId);
  };

  const handleTriggerSlot = (slotIndex: number) => {
    const slot = currentSlots[slotIndex];
    if (!slot) return;
    soundEngine.playKeyClick(480 + slotIndex * 18);

    const result = executeSlotSimulation(simEnv, slot, new Date());
    setSimEnv(result.nextEnv);
    setRunLogs((prev) => [result.logEntry, ...prev.slice(0, 49)]);
    setStatusAnnouncement(
      `Triggered Slot ${slotIndex + 1} (${result.logEntry.label}): ${result.logEntry.statusText}`
    );

    if (result.sideEffect === 'OPEN_NOTES') {
      dispatchWindow({ type: 'OPEN_WINDOW', appId: 'notes' });
    } else if (result.sideEffect === 'OPEN_DEVICE_INFO') {
      dispatchWindow({ type: 'OPEN_WINDOW', appId: 'device-info' });
    } else if (result.sideEffect === 'TIDY_WINDOWS') {
      dispatchWindow({ type: 'TIDY_WINDOWS', stageWidth: 1220, stageHeight: 640 });
    } else if (result.sideEffect === 'TOGGLE_FOCUS_MODE') {
      dispatchWindow({ type: 'SOLO_FOCUS_MODE', active: result.nextEnv.isFocusMode });
    }
  };

  const handleAssignAction = (slotIndex: number, actionId: string) => {
    const action = getActionById(actionId);
    const coords = getSlotRowCol(slotIndex);
    soundEngine.playKeyClick(640);

    setAllProfiles((prev) => ({
      ...prev,
      [activeProfile]: assignActionToSlot(prev[activeProfile], slotIndex, actionId),
    }));

    const logEntry: RunLogEntry = {
      id: `assign-${Date.now()}-${slotIndex}`,
      timestamp: formatTimestamp(new Date()),
      slotIndex,
      row: coords.row,
      col: coords.col,
      actionId: action.id,
      label: action.shortLabel,
      category: action.category,
      statusText: 'SLOT ASSIGNED',
      detail: `Patched "${action.title}" into Slot ${String(slotIndex + 1).padStart(2, '0')} (Row ${coords.row}, Col ${coords.col}).`,
    };
    setRunLogs((prev) => [logEntry, ...prev.slice(0, 49)]);
    setStatusAnnouncement(
      `Assigned ${action.title} to Slot ${slotIndex + 1} (Row ${coords.row}, Column ${coords.col}).`
    );
  };

  const handleCustomizeSlot = (
    slotIndex: number,
    updates: {
      customLabel?: string;
      customIcon?: PixelIconId;
      customAccent?: 'cobalt' | 'voltage' | 'magenta' | 'frost' | 'ice';
    }
  ) => {
    setAllProfiles((prev) => ({
      ...prev,
      [activeProfile]: customizeSlot(prev[activeProfile], slotIndex, updates),
    }));
  };

  const performProfileSwitch = (targetProfile: ProfileId, discardEdits = false) => {
    if (discardEdits) {
      setAllProfiles((prev) => ({
        ...prev,
        [activeProfile]: cloneProfileSlots(activeProfile),
      }));
    }

    soundEngine.playProfileScan();
    setIsScanningGrid(true);
    if (scanTimeout.current) clearTimeout(scanTimeout.current);
    scanTimeout.current = setTimeout(() => setIsScanningGrid(false), 560);

    setActiveProfile(targetProfile);
    setProfileConfirmOpen(false);

    const logEntry: RunLogEntry = {
      id: `prof-${Date.now()}`,
      timestamp: formatTimestamp(new Date()),
      slotIndex: selectedSlotIndex,
      row: 1,
      col: 1,
      actionId: 'profile-switch',
      label: targetProfile,
      category: 'SYSTEM',
      statusText: `PROFILE -> ${targetProfile}`,
      detail: `Switched 5×3 matrix to ${CURATED_PROFILES[targetProfile].name}.`,
    };
    setRunLogs((prev) => [logEntry, ...prev.slice(0, 49)]);
    setStatusAnnouncement(`Loaded ${targetProfile} profile across all 15 keys.`);
  };

  const handleSwitchProfileRequest = (targetProfile: ProfileId) => {
    if (targetProfile === activeProfile) return;
    if (isProfileModified(activeProfile, currentSlots)) {
      setConfirmFromProfile(activeProfile);
      setPendingProfileConfirm(targetProfile);
      setProfileConfirmOpen(true);
      return;
    }
    performProfileSwitch(targetProfile, false);
  };

  const handleResetProfile = (profileId: ProfileId) => {
    setAllProfiles((prev) => ({
      ...prev,
      [profileId]: cloneProfileSlots(profileId),
    }));
    setStatusAnnouncement(`Reset ${profileId} profile to default 15-key layout.`);
  };

  const handleSaveDemo = () => {
    const savedAt = saveDemoStateToStorage({
      activeProfile,
      profiles: allProfiles,
      notesContent: simEnv.notesContent,
    });
    if (!savedAt) {
      setStatusAnnouncement('Save failed. Allow browser storage and try again.');
      return false;
    }
    setLastSavedTime(savedAt);
    setStatusAnnouncement(`Saved demo layout to browser localStorage at ${savedAt}.`);
    return true;
  };

  const handleResetAllDemoData = () => {
    clearDemoStorage();
    setAllProfiles(createDefaultProfilesState());
    setActiveProfile('STUDIO');
    setSelectedSlotIndex(0);
    setSimEnv(createInitialSimulationState());
    setLastSavedTime(null);
    dispatchWindow({ type: 'RESET_WINDOWS' });
    setRunLogs([
      {
        id: `reset-${Date.now()}`,
        timestamp: formatTimestamp(new Date()),
        slotIndex: 0,
        row: 1,
        col: 1,
        actionId: 'reset-all',
        label: 'DEMO RESET',
        category: 'SYSTEM',
        statusText: 'ALL DEMO DATA CLEARED',
        detail: 'Restored default STUDIO, LIVE, and EVERYDAY 15-key layouts and cleared local demo storage.',
      },
    ]);
    setStatusAnnouncement('All demo state reset to initial defaults.');
  };

  const handleToggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundEngine.setEnabled(next);
    if (next) {
      soundEngine.playKeyClick(580);
    }
  };

  const scrollToSection = (id: string) => {
    scrollToCtrlRoom(id);
  };

  return (
    <div id="top" ref={rootRef} data-cr-boot={bootReady ? 'ready' : 'waiting'} className="cr-shell min-h-screen flex flex-col bg-[#111A31] text-[#E8F0FF]">
      <CtrlRoomMotion rootRef={rootRef} bootReady={bootReady} />
      <a className="cr-skip" href="#cr-main">Skip to content</a>
      {/* Deterministic 4-strip Pixel Boot Shutter */}
      <BootSequence onComplete={completeBoot} />
      <noscript><style>{'.cr-boot { display: none !important; }'}</style></noscript>

      {/* Top Bar Contract Navigation */}
      <BrandHeader />

      <main id="cr-main" className="flex-1" tabIndex={-1}>
        {/* =====================================================================
            SCREEN 00 — BOOT / WELCOME HERO
        ===================================================================== */}
        <section
          aria-labelledby="hero-heading"
          className="cr-hero relative border-b-2 border-[#2858FF] cr-bg-ctrl-dither overflow-hidden"
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Campaign Hook, Copy, Primary CTA & Quick App Launchers */}
              <div className="cr-hero-copy lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs cr-font-mono-code text-[#E4FF58]">
                  <span>C/R OS — BUILD 01.15</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#B6D7F7]">FEATURING ELGATO STREAM DECK MK.2</span>
                </div>

                <h1
                  id="hero-heading"
                  className="cr-font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#E8F0FF] leading-[1.06] text-balance"
                >
                  <RevealText text="WELCOME TO YOUR CONTROL ROOM." />
                </h1>

                <p className="text-base sm:text-lg text-[#B6D7F7] max-w-xl leading-relaxed">
                  A tiny desktop for big shortcuts. Explore what 15 programmable keys can make possible.
                </p>

                {/* Primary & Secondary Hero Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    data-cr-magnetic
                    type="button"
                    onClick={() => {
                      handleOpenAppWindow('deck-lab');
                      scrollToSection('desktop-stage');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt cr-transition-control whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>OPEN CTRL/ROOM OS</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <a
                    href="#section-device-info"
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm cr-font-mono-code font-bold bg-[#162344] text-[#E8F0FF] hover:border-[#E4FF58] hover:text-[#E4FF58] border-2 border-[#2858FF] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>SKIP TO PRODUCT</span>
                  </a>
                </div>

                {/* Three Purposeful App-Launcher Icons in Hero */}
                <div className="pt-3 border-t border-[#61728F]/40">
                  <div className="text-[11px] cr-font-mono-code text-[#B6D7F7] mb-2.5">
                    QUICK LAUNCH INTO C/R OS WORKSPACE:
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 max-w-lg">
                    {[
                      { id: 'deck-lab' as AppId, label: '01. DECK LAB', desc: '15-Key Simulator' },
                      {
                        id: 'action-library' as AppId,
                        label: '02. ACTIONS',
                        desc: '25+ Shortcut Tiles',
                      },
                      {
                        id: 'device-info' as AppId,
                        label: '03. MK.2 INFO',
                        desc: 'Real Hardware Specs',
                      },
                    ].map((launcher) => (
                      <button
                        key={launcher.id}
                        type="button"
                        onClick={() => {
                          handleOpenAppWindow(launcher.id);
                          scrollToSection('desktop-stage');
                        }}
                        className="p-2.5 text-left bg-[#111A31] hover:bg-[#19284F] border-2 border-[#2858FF] hover:border-[#E4FF58] cr-shadow-ctrl transition-transform hover:-translate-y-0.5"
                      >
                        <div className="cr-font-mono-code text-xs font-bold text-[#E4FF58]">
                          {launcher.label}
                        </div>
                        <div className="text-[11px] text-[#B6D7F7] truncate">{launcher.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sharp Non-Pixelated Real Stream Deck MK.2 Hardware Anchor */}
              <div className="cr-hero-hardware lg:col-span-6">
                <div className="p-4 sm:p-5 bg-[#111A31] border-2 border-[#2858FF] cr-shadow-ctrl-lg">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#61728F]/40">
                    <span className="cr-font-mono-code text-xs font-bold text-[#E4FF58]">
                      PHYSICAL HERO · ELGATO STREAM DECK MK.2
                    </span>
                    <span className="cr-font-mono-code text-[11px] text-[#B6D7F7]">
                      CLICK ANY KEY TO INSPECT
                    </span>
                  </div>
                  <StreamDeckHardwareView
                    slots={currentSlots}
                    selectedSlotIndex={selectedSlotIndex}
                    onSelectSlot={(idx) => {
                      setSelectedSlotIndex(idx);
                      handleTriggerSlot(idx);
                    }}
                    compact={false}
                    showAngleSwitcher={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 01 & SCREEN 02 — CTRL/ROOM OS DESKTOP STAGE & DECK LAB
        ===================================================================== */}
        <section
          id="desktop-stage"
          aria-labelledby="os-stage-heading"
          className="py-10 lg:py-14 border-b-2 border-[#2858FF] bg-[#0D1529]"
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-5">
            <div id="section-deck-lab" className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs cr-font-mono-code text-[#E4FF58]">
                  01. INTERACTIVE OPERATING SYSTEM & 15-KEY SIMULATOR
                </div>
                <h2
                  id="os-stage-heading"
                  className="cr-font-display text-2xl sm:text-3xl font-bold text-[#E8F0FF] mt-1"
                >
                  CTRL/ROOM OS — YOUR INTERACTIVE DESKTOP STAGE
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs cr-font-mono-code text-[#B6D7F7]">
                <span>DRAG WINDOWS BY TITLEBAR</span>
                <span aria-hidden="true">·</span>
                <span>ASSIGN & TEST 15 KEYS</span>
                <span aria-hidden="true">·</span>
                <a
                  href="https://www.elgato.com/us/en/p/stream-deck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E4FF58] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>OFFICIAL ELGATO PAGE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Interactive Desktop & Window Manager */}
            <DesktopStage
              wmState={wmState}
              activeMobileApp={activeMobileApp}
              activeProfile={activeProfile}
              allProfiles={allProfiles}
              selectedSlotIndex={selectedSlotIndex}
              simEnv={simEnv}
              runLogs={runLogs}
              isScanningGrid={isScanningGrid}
              lastSavedTime={lastSavedTime}
              statusAnnouncement={statusAnnouncement}
              audioEnabled={audioEnabled}
              onSelectMobileApp={setActiveMobileApp}
              onOpenWindow={(appId) => dispatchWindow({ type: 'OPEN_WINDOW', appId })}
              onCloseWindow={(appId) => dispatchWindow({ type: 'CLOSE_WINDOW', appId })}
              onMinimizeWindow={(appId) => dispatchWindow({ type: 'MINIMIZE_WINDOW', appId })}
              onToggleMaximizeWindow={(appId) =>
                dispatchWindow({ type: 'TOGGLE_MAXIMIZE_WINDOW', appId })
              }
              onFocusWindow={(appId) => dispatchWindow({ type: 'FOCUS_WINDOW', appId })}
              onMoveWindow={(appId, x, y, stageWidth, stageHeight) =>
                dispatchWindow({ type: 'MOVE_WINDOW', appId, x, y, stageWidth, stageHeight })
              }
              onNudgeWindow={(appId, dx, dy, stageWidth, stageHeight) =>
                dispatchWindow({ type: 'NUDGE_WINDOW', appId, dx, dy, stageWidth, stageHeight })
              }
              onTidyWindows={(stageWidth, stageHeight) =>
                dispatchWindow({ type: 'TIDY_WINDOWS', stageWidth, stageHeight })
              }
              onSelectSlot={setSelectedSlotIndex}
              onTriggerSlot={handleTriggerSlot}
              onAssignAction={handleAssignAction}
              onCustomizeSlot={handleCustomizeSlot}
              onSwitchProfileRequest={handleSwitchProfileRequest}
              onResetProfile={handleResetProfile}
              onSaveDemo={handleSaveDemo}
              onClearLogs={() => setRunLogs([])}
              onUpdateNotes={(notesContent) =>
                setSimEnv((prev) => ({ ...prev, notesContent }))
              }
              onToggleAudio={handleToggleAudio}
              onResetAllDemoData={handleResetAllDemoData}
            />
          </div>
        </section>

        {/* =====================================================================
            SCREEN 03 — ACTION LIBRARY (EDITORIAL SHOWCASE)
        ===================================================================== */}
        <section
          id="section-action-library"
          aria-labelledby="action-library-heading"
          className="py-14 lg:py-18 border-b-2 border-[#2858FF] bg-[#111A31]"
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs cr-font-mono-code text-[#E4FF58]">
                  02. MODULAR SHORTCUT ARCHITECTURE
                </div>
                <h2
                  id="action-library-heading"
                  className="cr-font-display text-3xl sm:text-4xl font-bold text-[#E8F0FF] text-balance"
                >
                  <RevealText text="YOUR WORKFLOW, ONE PRESS AWAY." />
                </h2>
                <p className="text-sm sm:text-base text-[#B6D7F7] max-w-2xl">
                  Browse example shortcut tiles across four creative disciplines. Click any tile to assign it directly to{' '}
                  <strong className="text-[#E4FF58]">
                    Slot {String(selectedSlotIndex + 1).padStart(2, '0')}
                  </strong>{' '}
                  in the virtual simulator above.
                </p>
              </div>

              {/* Category Filter Controls */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#0C1326] p-1.5 border-2 border-[#2858FF]">
                {(['CREATE', 'STREAM', 'ORGANIZE', 'EXPLORE'] as ActionCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setEditorialCategory(cat)}
                    className={`px-3.5 py-2 text-xs cr-font-mono-code font-bold transition-colors whitespace-nowrap shrink-0 ${
                      editorialCategory === cat
                        ? 'bg-[#E4FF58] text-[#111A31]'
                        : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACTION_LIBRARY.filter((a) => a.category === editorialCategory).map((action) => {
                const isAssigned = currentSlots[selectedSlotIndex]?.actionId === action.id;

                return (
                  <div
                    key={action.id}
                    data-cr-reveal="tile"
                    className={`cr-action-card p-5 bg-[#15203D] border-2 cr-transition-control flex flex-col justify-between gap-4 ${
                      isAssigned
                        ? 'border-[#E4FF58] cr-shadow-ctrl-active'
                        : 'border-[#2858FF] hover:border-[#B6D7F7] cr-shadow-ctrl'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-[#111A31] border border-[#2858FF]">
                          <PixelActionIcon icon={action.icon} className="w-6 h-6" color="#E4FF58" />
                        </div>
                        <span className="text-xs cr-font-mono-code text-[#B6D7F7]">
                          {action.category} · {action.shortLabel}
                        </span>
                      </div>

                      <h3 className="cr-font-display text-lg font-bold text-[#E8F0FF]">
                        {action.title}
                      </h3>

                      <p className="text-sm text-[#B6D7F7] leading-relaxed">{action.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#61728F]/40 space-y-3">
                      <div className="text-xs text-[#E8F0FF]">
                        <span className="cr-font-mono-code text-[10px] text-[#E4FF58] block mb-0.5">
                          REAL HARDWARE CONTEXT:
                        </span>
                        {action.realWorldMapping}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          handleAssignAction(selectedSlotIndex, action.id);
                          scrollToSection('desktop-stage');
                        }}
                        className={`w-full py-2 px-3 text-xs cr-font-mono-code font-bold transition-colors whitespace-nowrap shrink-0 ${
                          isAssigned
                            ? 'bg-[#E4FF58] text-[#111A31]'
                            : 'bg-[#2858FF] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31]'
                        }`}
                      >
                        {isAssigned
                          ? `ASSIGNED TO SLOT ${String(selectedSlotIndex + 1).padStart(2, '0')}`
                          : `PATCH TO SLOT ${String(selectedSlotIndex + 1).padStart(2, '0')} & TEST`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 04 — PROFILE SWITCHER (EDITORIAL PRESETS)
        ===================================================================== */}
        <section
          id="section-profiles"
          aria-labelledby="profiles-heading"
          className="py-14 lg:py-18 border-b-2 border-[#2858FF] bg-[#0D1529]"
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-8">
            <div className="space-y-2">
              <div className="text-xs cr-font-mono-code text-[#E4FF58]">
                03. ADAPTIVE 15-KEY WORKSPACES
              </div>
              <h2
                id="profiles-heading"
                className="cr-font-display text-3xl sm:text-4xl font-bold text-[#E8F0FF] text-balance"
              >
                <RevealText text="ONE DEVICE. MANY WAYS TO WORK." />
              </h2>
              <p className="text-sm sm:text-base text-[#B6D7F7] max-w-2xl">
                Switch between three curated demo profiles to see how the same 5×3 key surface adapts from video post-production to live broadcasting and everyday deep work.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {(['STUDIO', 'LIVE', 'EVERYDAY'] as ProfileId[]).map((profId) => {
                const profile = CURATED_PROFILES[profId];
                const slots = allProfiles[profId];
                const isActive = activeProfile === profId;

                return (
                  <div
                    key={profId}
                    data-cr-reveal="tile"
                    className={`cr-profile-card p-6 bg-[#111A31] border-2 flex flex-col justify-between gap-5 ${
                      isActive
                        ? 'border-[#E4FF58] cr-shadow-ctrl-active'
                        : 'border-[#2858FF] cr-shadow-ctrl'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="cr-font-mono-code text-xs text-[#E4FF58] font-bold">
                          {profile.audience}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31]">
                            ACTIVE IN LAB
                          </span>
                        )}
                      </div>

                      <h3 className="cr-font-display text-xl font-bold text-[#E8F0FF]">
                        {profile.name}
                      </h3>

                      <p className="text-sm text-[#B6D7F7] leading-relaxed">
                        {profile.description}
                      </p>

                      {/* 5x3 Key Matrix Snapshot */}
                      <div className="pt-2">
                        <div className="text-[10px] cr-font-mono-code text-[#B6D7F7] mb-2">
                          15-KEY MATRIX PREVIEW (5×3):
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 p-2.5 bg-[#0A1020] border border-[#61728F]/50">
                          {slots.map((slot) => {
                            const act = getActionById(slot.actionId);
                            return (
                              <div
                                key={slot.slotIndex}
                                className="aspect-square p-1 bg-[#162344] border border-[#2858FF]/50 flex flex-col items-center justify-center gap-0.5"
                                title={act.title}
                              >
                                <PixelActionIcon
                                  icon={slot.customIcon || act.icon}
                                  className="w-3.5 h-3.5"
                                  color="#E8F0FF"
                                />
                                <span className="text-[7px] cr-font-mono-code text-[#B6D7F7] truncate w-full text-center">
                                  {slot.customLabel || act.shortLabel}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleSwitchProfileRequest(profId);
                        scrollToSection('desktop-stage');
                      }}
                      className={`w-full py-3 px-4 text-xs cr-font-mono-code font-bold transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#E4FF58] text-[#111A31]'
                          : 'bg-[#2858FF] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31]'
                      }`}
                    >
                      {isActive ? `CURRENTLY LOADED (${profId})` : `SWITCH SIMULATOR TO ${profId}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 05 — PRODUCT / DEVICE INFO (REAL HARDWARE FOCUS)
        ===================================================================== */}
        <section
          id="section-device-info"
          aria-labelledby="device-info-heading"
          className="py-14 lg:py-20 border-b-2 border-[#2858FF] bg-[#111A31]"
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: High-Clarity Hardware Viewer */}
              <div className="lg:col-span-7">
                <StreamDeckHardwareView
                  slots={currentSlots}
                  selectedSlotIndex={selectedSlotIndex}
                  onSelectSlot={setSelectedSlotIndex}
                  compact={false}
                  showAngleSwitcher={true}
                />
              </div>

              {/* Right Column: Verified Hardware Facts & Direct Manufacturer CTA */}
              <div className="lg:col-span-5 space-y-6">
                <div className="text-xs cr-font-mono-code text-[#E4FF58]">
                  04. THE REAL HARDWARE · ELGATO STREAM DECK MK.2
                </div>

                <h2
                  id="device-info-heading"
                  className="cr-font-display text-3xl sm:text-4xl font-bold text-[#E8F0FF] leading-tight text-balance"
                >
                  <RevealText text="MEET THE BUTTONS BEHIND THE MAGIC." />
                </h2>

                <p className="text-base text-[#B6D7F7] leading-relaxed">
                  15 customizable LCD keys. A hardware control surface ready to become part of your workflow.
                </p>

                {/* Verified Spec Sheet */}
                <div className="border-2 border-[#2858FF] bg-[#15203D] divide-y divide-[#61728F]/40 text-xs">
                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="cr-font-mono-code text-[#B6D7F7]">KEY LAYOUT</span>
                    <span className="cr-font-mono-code font-bold text-[#E8F0FF]">
                      15 Customizable LCD Keys (5 Columns × 3 Rows)
                    </span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="cr-font-mono-code text-[#B6D7F7]">CHASSIS & STAND</span>
                    <span className="cr-font-mono-code font-bold text-[#E8F0FF]">
                      Interchangeable Faceplate + Fixed 45° Desk Stand
                    </span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="cr-font-mono-code text-[#B6D7F7]">CONNECTIVITY</span>
                    <span className="cr-font-mono-code font-bold text-[#E8F0FF]">
                      Detachable USB-C Cable
                    </span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="cr-font-mono-code text-[#B6D7F7]">SOFTWARE ECOSYSTEM</span>
                    <span className="cr-font-mono-code font-bold text-[#E8F0FF]">
                      Elgato Stream Deck App & Compatible Integrations
                    </span>
                  </div>
                </div>

                {/* Primary Outbound CTA & Official Comparison */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="https://www.elgato.com/us/en/p/stream-deck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>EXPLORE STREAM DECK MK.2</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href="https://www.elgato.com/ww/en/explorer/products/stream-deck/stream-deck-device-comparison/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs cr-font-mono-code font-bold text-[#E8F0FF] hover:text-[#E4FF58] border-2 border-[#61728F] hover:border-[#E4FF58] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>COMPARE MODELS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Always-Readable Attribution */}
                <p className="text-xs cr-font-mono-code text-[#B6D7F7] p-3 bg-[#0C1326] border border-[#61728F]">
                  CTRL/ROOM is an independent fictional creative concept featuring Stream Deck MK.2 by Elgato. Not affiliated with or endorsed by Elgato.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 06 — FINAL DESKTOP SIGN-OFF
        ===================================================================== */}
        <section
          aria-labelledby="signoff-heading"
          className="cr-signoff py-16 lg:py-24 cr-bg-ctrl-dither border-b-2 border-[#2858FF]"
        >
          <div className="max-w-[1080px] mx-auto px-4 sm:px-8 text-center space-y-8">
            {/* Condensed Geometric Control Motif */}
            <div data-cr-reveal="matrix" className="cr-signoff-matrix inline-grid grid-cols-5 gap-2 p-4 bg-[#111A31] border-2 border-[#E4FF58] cr-shadow-ctrl-lg">
              {currentSlots.map((slot) => {
                const act = getActionById(slot.actionId);
                return (
                  <button
                    key={slot.slotIndex}
                    type="button"
                    onClick={() => {
                      setSelectedSlotIndex(slot.slotIndex);
                      handleTriggerSlot(slot.slotIndex);
                      scrollToSection('desktop-stage');
                    }}
                    aria-label={`Jump to simulator with key ${slot.slotIndex + 1}: ${act.title}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#17254A] hover:bg-[#2858FF] border border-[#2858FF] hover:border-[#E4FF58] flex items-center justify-center transition-transform hover:-translate-y-0.5"
                  >
                    <PixelActionIcon
                      icon={slot.customIcon || act.icon}
                      className="w-5 h-5"
                      color="#E4FF58"
                    />
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              <div className="text-xs cr-font-mono-code font-bold text-[#E4FF58] tracking-widest">
                LESS CLICKING. MORE MAKING.
              </div>
              <h2
                id="signoff-heading"
                className="cr-font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8F0FF] tracking-tight text-balance"
              >
                <RevealText text="MAKE ONE BUTTON DO MORE." />
              </h2>
              <p className="text-base sm:text-lg text-[#B6D7F7] max-w-xl mx-auto">
                Ready to bring 15 customizable LCD keys to your real desk? Explore the official Stream Deck MK.2 hardware directly from Elgato.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://www.elgato.com/us/en/p/stream-deck"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 text-sm cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt transition-colors whitespace-nowrap shrink-0"
              >
                <span>MEET THE REAL STREAM DECK</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  handleResetAllDemoData();
                  scrollToSection('desktop-stage');
                }}
                className="inline-flex items-center gap-2 px-6 py-4 text-sm cr-font-mono-code font-bold bg-[#111A31] text-[#E8F0FF] hover:border-[#FC5FA9] hover:text-[#FC5FA9] border-2 border-[#61728F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESTART DEMO</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* True Accessible Confirmation Modal when switching away from a user-edited profile */}
      <MotionDialog open={profileConfirmOpen} onClose={() => setProfileConfirmOpen(false)} onAfterClose={() => setPendingProfileConfirm(null)} labelledBy="profile-switch-dialog-title">
          <div className="w-full max-w-md bg-[#111A31] border-2 border-[#E4FF58] cr-shadow-ctrl-lg p-6 space-y-4">
            <div className="cr-font-mono-code text-xs font-bold text-[#FC5FA9]">
              CUSTOMIZED PROFILE DETECTED
            </div>
            <h3
              id="profile-switch-dialog-title"
              className="cr-font-display text-lg font-bold text-[#E8F0FF]"
            >
              Switch from {confirmFromProfile} to {pendingProfileConfirm}?
            </h3>
            <p className="text-xs text-[#B6D7F7] leading-relaxed">
              You customized one or more slots in the <strong>{confirmFromProfile}</strong> profile. Would you like to keep your edits in memory when switching, or restore {confirmFromProfile} to its default preset?
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setProfileConfirmOpen(false)}
                className="px-3 py-2 text-xs cr-font-mono-code text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F]"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => pendingProfileConfirm && performProfileSwitch(pendingProfileConfirm, true)}
                className="px-3 py-2 text-xs cr-font-mono-code font-bold bg-[#FC5FA9] text-[#111A31] hover:bg-[#E8F0FF]"
              >
                RESET & SWITCH
              </button>
              <button
                type="button"
                onClick={() => pendingProfileConfirm && performProfileSwitch(pendingProfileConfirm, false)}
                className="px-4 py-2 text-xs cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF]"
              >
                KEEP EDITS & SWITCH
              </button>
            </div>
          </div>
      </MotionDialog>

      {/* Quiet Footer */}
      <footer className="bg-[#0A1020] py-8 px-4 sm:px-8 text-xs text-[#B6D7F7]">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CtrlRoomGlyphLogo className="w-5 h-5" />
            <span className="cr-font-display font-bold text-[#E8F0FF]">CTRL/ROOM</span>
            <span>·</span>
            <span className="cr-font-mono-code text-[11px]">C/R OS — Build 01.15</span>
          </div>

          <p className="text-[11px] text-[#B6D7F7]">
            CTRL/ROOM is an independent fictional creative concept featuring Stream Deck MK.2 by Elgato. Not affiliated with or endorsed by Elgato.
          </p>

          <div className="flex items-center gap-4 cr-font-mono-code text-[11px]">
            <a
              href="https://www.elgato.com/us/en/p/stream-deck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E4FF58] hover:underline"
            >
              Official Product Page
            </a>
            <a
              href="https://docs.elgato.com/streamdeck/hid/stream-deck-classic/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B6D7F7] hover:text-[#E8F0FF] hover:underline"
            >
              Hardware Family Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
