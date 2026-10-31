<template slug="ctrlroom" name="CTRL/ROOM">
  <dependencies>
    {
      "dependencies": {
        "lucide-react": "0.475.0",
        "motion": "^14.4.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(ctrlroom)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./ctrlroom/ctrlroom.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CTRL/ROOM — Stream Deck MK.2 Interactive OS",
  description:
    "An original 2D pixel-desktop operating system and interactive 15-key macro-deck simulator featuring the Elgato Stream Deck MK.2.",
  openGraph: {
    title: "CTRL/ROOM — Stream Deck MK.2 Interactive OS",
    description:
      "An original 2D pixel-desktop operating system and interactive 15-key macro-deck simulator featuring the Elgato Stream Deck MK.2.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111A31",
  colorScheme: "dark",
};

export default function CtrlRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-[#111A31] text-[#E8F0FF] antialiased selection:bg-[#E4FF58] selection:text-[#111A31]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/App.tsx">
<![CDATA['use client';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useReducer, useState } from 'react';
import {
  ExternalLink,
  ArrowDown,
  Sparkles,
  Layers,
  RotateCcw,
  Check,
  Terminal,
  Sliders,
} from 'lucide-react';
import { BrandHeader } from './components/layout/BrandHeader';
import { BootSequence } from './components/motion/BootSequence';
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
    window.setTimeout(() => setIsScanningGrid(false), 560);

    setActiveProfile(targetProfile);
    setPendingProfileConfirm(null);

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
      setPendingProfileConfirm(targetProfile);
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
    setLastSavedTime(savedAt);
    setStatusAnnouncement(`Saved demo layout to browser localStorage at ${savedAt}.`);
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#111A31] text-[#E8F0FF]">
      {/* Deterministic 4-strip Pixel Boot Shutter */}
      <BootSequence />

      {/* Top Bar Contract Navigation */}
      <BrandHeader />

      <main className="flex-1">
        {/* =====================================================================
            SCREEN 00 — BOOT / WELCOME HERO
        ===================================================================== */}
        <section
          aria-labelledby="hero-heading"
          className="relative border-b-2 border-[#2858FF] cr-bg-ctrl-dither overflow-hidden"
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Campaign Hook, Copy, Primary CTA & Quick App Launchers */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs cr-font-mono-code text-[#E4FF58]">
                  <span>C/R OS — BUILD 01.15</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#B6D7F7]">FEATURING ELGATO STREAM DECK MK.2</span>
                </div>

                <h1
                  id="hero-heading"
                  className="cr-font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#E8F0FF] leading-[1.06] text-balance"
                >
                  WELCOME TO YOUR CONTROL ROOM.
                </h1>

                <p className="text-base sm:text-lg text-[#B6D7F7] max-w-xl leading-relaxed">
                  A tiny desktop for big shortcuts. Explore what 15 programmable keys can make possible.
                </p>

                {/* Primary & Secondary Hero Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      handleOpenAppWindow('deck-lab');
                      scrollToSection('desktop-stage');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt transition-all whitespace-nowrap shrink-0 cursor-pointer"
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
              <div className="lg:col-span-6">
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
                  YOUR WORKFLOW, ONE PRESS AWAY.
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
                    className={`p-5 bg-[#15203D] border-2 transition-all flex flex-col justify-between gap-4 ${
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
                ONE DEVICE. MANY WAYS TO WORK.
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
                    className={`p-6 bg-[#111A31] border-2 flex flex-col justify-between gap-5 ${
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
                  MEET THE BUTTONS BEHIND THE MAGIC.
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
          className="py-16 lg:py-24 cr-bg-ctrl-dither border-b-2 border-[#2858FF]"
        >
          <div className="max-w-[1080px] mx-auto px-4 sm:px-8 text-center space-y-8">
            {/* Condensed Geometric Control Motif */}
            <div className="inline-grid grid-cols-5 gap-2 p-4 bg-[#111A31] border-2 border-[#E4FF58] cr-shadow-ctrl-lg">
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
                MAKE ONE BUTTON DO MORE.
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
      {pendingProfileConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-switch-dialog-title"
          className="fixed inset-0 z-[110] bg-[#111A31]/85 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md bg-[#111A31] border-2 border-[#E4FF58] cr-shadow-ctrl-lg p-6 space-y-4">
            <div className="cr-font-mono-code text-xs font-bold text-[#FC5FA9]">
              CUSTOMIZED PROFILE DETECTED
            </div>
            <h3
              id="profile-switch-dialog-title"
              className="cr-font-display text-lg font-bold text-[#E8F0FF]"
            >
              Switch from {activeProfile} to {pendingProfileConfirm}?
            </h3>
            <p className="text-xs text-[#B6D7F7] leading-relaxed">
              You customized one or more slots in the <strong>{activeProfile}</strong> profile. Would you like to keep your edits in memory when switching, or restore {activeProfile} to its default preset?
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPendingProfileConfirm(null)}
                className="px-3 py-2 text-xs cr-font-mono-code text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F]"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => performProfileSwitch(pendingProfileConfirm, true)}
                className="px-3 py-2 text-xs cr-font-mono-code font-bold bg-[#FC5FA9] text-[#111A31] hover:bg-[#E8F0FF]"
              >
                RESET & SWITCH
              </button>
              <button
                type="button"
                onClick={() => performProfileSwitch(pendingProfileConfirm, false)}
                className="px-4 py-2 text-xs cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF]"
              >
                KEEP EDITS & SWITCH
              </button>
            </div>
          </div>
        </div>
      )}

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
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/ctrlroom.css">
<![CDATA[@import "tailwindcss";

@layer base {
  :root {
    --cr-kernel-navy: #111A31;
    --cr-hyper-cobalt: #2858FF;
    --cr-monitor-frost: #E8F0FF;
    --cr-voltage-yellow: #E4FF58;
    --cr-bubble-magenta: #FC5FA9;
    --cr-registry-slate: #61728F;
    --cr-screen-ice: #B6D7F7;

    --cr-font-display: var(--font-display, 'Chakra Petch', sans-serif);
    --cr-font-sans: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
    --cr-font-mono: var(--font-mono, 'JetBrains Mono', monospace);
  }
}

.cr-font-display {
  font-family: var(--cr-font-display);
}

.cr-font-mono-code {
  font-family: var(--cr-font-mono);
  font-variant-numeric: tabular-nums;
}

.cr-font-sans-body {
  font-family: var(--cr-font-sans);
}

/* Crisp pixel rendering strictly for 16x16 / 12x12 pixel icon sprites */
.cr-pixel-sprite {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* Proprietary CTRL/ROOM Dither & Patchwork Wallpaper Patterns */
.cr-bg-ctrl-dither {
  background-color: #111A31;
  background-image:
    radial-gradient(#2858FF 1.25px, transparent 1.25px),
    radial-gradient(#1B2E5E 1.25px, #111A31 1.25px);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
}

.cr-bg-cobalt-dither {
  background-color: #2858FF;
  background-image:
    linear-gradient(45deg, rgba(17, 26, 49, 0.22) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(17, 26, 49, 0.22) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(17, 26, 49, 0.22) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(17, 26, 49, 0.22) 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0;
}

.cr-bg-ice-grid {
  background-size: 24px 24px;
  background-image:
    linear-gradient(to right, rgba(182, 215, 247, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 215, 247, 0.08) 1px, transparent 1px);
}

/* Hard-edged CTRL/ROOM offset shadows (no blurry skeuomorphism) */
.cr-shadow-ctrl {
  box-shadow: 4px 4px 0px #111A31;
}

.cr-shadow-ctrl-lg {
  box-shadow: 6px 6px 0px #090E1C;
}

.cr-shadow-ctrl-active {
  box-shadow: 6px 6px 0px #E4FF58;
}

.cr-shadow-ctrl-cobalt {
  box-shadow: 4px 4px 0px #2858FF;
}

.cr-shadow-ctrl-magenta {
  box-shadow: 4px 4px 0px #FC5FA9;
}

/* Custom CTRL/ROOM Keyed-Notch Corner Motif */
.cr-ctrl-notch-tr {
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
}

.cr-ctrl-notch-both {
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
}

/* Tactile 2px key depression */
.cr-deck-key-btn {
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 120ms cubic-bezier(0.16, 1, 0.3, 1);
}
.cr-deck-key-btn:active,
.cr-deck-key-btn[data-pressed="true"] {
  transform: translate(2px, 2px);
}

/* Stepped Grid-Scan Animation for Profile Switch */
@keyframes crCtrlGridScan {
  0% {
    transform: translateY(-100%);
    opacity: 0.9;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

.cr-animate-grid-scan {
  animation: crCtrlGridScan 550ms steps(8, end) forwards;
}

/* Patch Cable Pulse */
@keyframes crPatchDash {
  to {
    stroke-dashoffset: -24;
  }
}

.cr-patch-cable-line {
  stroke-dasharray: 6 6;
  animation: crPatchDash 1.2s linear infinite;
}
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges">
  <rect x="0" y="0" width="24" height="24" fill="#2858FF" />
  <rect x="20" y="0" width="4" height="4" fill="#111A31" />
  <rect x="3" y="3" width="5" height="5" fill="#E4FF58" />
  <rect x="10" y="3" width="5" height="5" fill="#E8F0FF" />
  <rect x="3" y="10" width="5" height="5" fill="#E8F0FF" />
  <rect x="10" y="10" width="5" height="5" fill="#111A31" />
  <rect x="17" y="10" width="4" height="5" fill="#FC5FA9" />
  <rect x="3" y="17" width="18" height="4" fill="#111A31" />
  <rect x="5" y="18" width="6" height="2" fill="#E4FF58" />
</svg>
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/page.tsx">
<![CDATA[import App from "./App";

export default function CtrlRoomPage() {
  return <App />;
}
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/apps/AboutConceptApp.tsx">
<![CDATA['use client';
import React from 'react';
import { Volume2, VolumeX, ShieldAlert, RotateCcw, ExternalLink } from 'lucide-react';

interface AboutConceptAppProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onResetAllDemoData: () => void;
}

export const AboutConceptApp: React.FC<AboutConceptAppProps> = ({
  audioEnabled,
  onToggleAudio,
  onResetAllDemoData,
}) => {
  return (
    <div className="space-y-3 text-xs">
      <div className="p-3 bg-[#0C1326] border-2 border-[#FC5FA9]">
        <div className="flex items-center gap-2 cr-font-mono-code text-[11px] font-bold text-[#FC5FA9]">
          <ShieldAlert className="w-4 h-4" />
          <span>INDEPENDENCE & HONESTY DISCLOSURE</span>
        </div>
        <p className="mt-1.5 text-[#E8F0FF] leading-relaxed">
          <strong>CTRL/ROOM (C/R OS — Build 01.15)</strong> is an original, independent fictional desktop concept created to showcase what a 15-key programmable control surface can feel like. It is{' '}
          <strong className="text-[#E4FF58]">not affiliated with, sponsored by, or endorsed by Elgato</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 bg-[#15203D] border border-[#2858FF]">
          <div className="cr-font-mono-code text-[11px] font-bold text-[#E4FF58] mb-1">
            WHAT THIS WEB SIMULATOR DOES
          </div>
          <ul className="space-y-1 text-[#B6D7F7] list-disc list-inside">
            <li>Lets you configure a 5×3 virtual key matrix in your browser</li>
            <li>Simulates studio actions inside the on-page preview monitor</li>
            <li>Logs mock execution timestamps in the Run Log window</li>
            <li>Optionally saves your demo layout to browser localStorage</li>
          </ul>
        </div>

        <div className="p-3 bg-[#15203D] border border-[#61728F]">
          <div className="cr-font-mono-code text-[11px] font-bold text-[#FC5FA9] mb-1">
            WHAT IT NEVER DOES
          </div>
          <ul className="space-y-1 text-[#B6D7F7] list-disc list-inside">
            <li>Does not pair with USB/HID hardware or physical Stream Decks</li>
            <li>Does not access your microphone, camera, or OS shortcuts</li>
            <li>Does not control OBS, broadcasts, or external desktop apps</li>
            <li>Does not represent Elgato&apos;s official desktop configurator UI</li>
          </ul>
        </div>
      </div>

      {/* Optional Original UI Audio Control & Full Demo Reset */}
      <div className="p-3 bg-[#0C1326] border border-[#61728F] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleAudio}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 cr-font-mono-code text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
              audioEnabled
                ? 'bg-[#E4FF58] text-[#111A31]'
                : 'bg-[#172342] text-[#E8F0FF] border border-[#61728F]'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{audioEnabled ? 'SYNTH UI AUDIO: ON' : 'SYNTH UI AUDIO: MUTED (DEFAULT)'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onResetAllDemoData}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 cr-font-mono-code text-xs font-bold bg-[#FC5FA9] text-[#111A31] hover:bg-[#E4FF58] transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET ALL DEMO DATA</span>
        </button>
      </div>

      <div className="pt-1 flex items-center justify-between text-[11px] text-[#B6D7F7]">
        <span>Official Product Documentation:</span>
        <a
          href="https://www.elgato.com/us/en/p/stream-deck"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 cr-font-mono-code font-bold text-[#E4FF58] hover:underline"
        >
          <span>elgato.com/stream-deck</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/apps/ActionLibraryApp.tsx">
<![CDATA['use client';
import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { ACTION_LIBRARY } from '../../lib/os/actions';
import { getSlotRowCol } from '../../lib/os/simulator';
import { ActionCategory, DeckSlotConfig } from '../../lib/os/types';
import { PixelActionIcon } from '../icons/PixelSprites';

interface ActionLibraryAppProps {
  selectedSlotIndex: number;
  slots: DeckSlotConfig[];
  onAssignAction: (slotIndex: number, actionId: string) => void;
  onSelectSlot: (slotIndex: number) => void;
}

export const ActionLibraryApp: React.FC<ActionLibraryAppProps> = ({
  selectedSlotIndex,
  slots,
  onAssignAction,
  onSelectSlot,
}) => {
  const [category, setCategory] = useState<'ALL' | ActionCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredActionId, setHoveredActionId] = useState<string | null>(null);

  const { row, col } = getSlotRowCol(selectedSlotIndex);
  const currentSlot = slots[selectedSlotIndex] || slots[0];

  const filteredActions = ACTION_LIBRARY.filter((item) => {
    const matchesCat = category === 'ALL' || item.category === category;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const hoveredAction =
    ACTION_LIBRARY.find((a) => a.id === hoveredActionId) ||
    ACTION_LIBRARY.find((a) => a.id === currentSlot.actionId) ||
    ACTION_LIBRARY[0];

  return (
    <div className="space-y-3">
      {/* Header & Target Slot Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#0C1326] border border-[#2858FF]">
        <div>
          <div className="text-[10px] cr-font-mono-code font-bold text-[#E4FF58]">
            YOUR WORKFLOW, ONE PRESS AWAY.
          </div>
          <p className="text-xs text-[#B6D7F7]">
            Click any action tile below to patch it into{' '}
            <strong className="text-[#E8F0FF]">
              Slot {String(selectedSlotIndex + 1).padStart(2, '0')} (Row {row}, Col {col})
            </strong>
            .
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <label htmlFor="target-slot-select" className="text-[10px] cr-font-mono-code text-[#B6D7F7]">
            TARGET SLOT:
          </label>
          <select
            id="target-slot-select"
            value={selectedSlotIndex}
            onChange={(e) => onSelectSlot(Number(e.target.value))}
            className="px-2 py-1 text-xs cr-font-mono-code font-bold bg-[#162344] text-[#E4FF58] border border-[#E4FF58]"
          >
            {slots.map((s) => {
              const coords = getSlotRowCol(s.slotIndex);
              return (
                <option key={s.slotIndex} value={s.slotIndex}>
                  Slot {String(s.slotIndex + 1).padStart(2, '0')} (R{coords.row}·C{coords.col})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Category Filter Tabs & Search */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1 bg-[#0C1326] p-1 border border-[#61728F]">
          {(['ALL', 'CREATE', 'STREAM', 'ORGANIZE', 'EXPLORE'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold transition-colors whitespace-nowrap shrink-0 ${
                category === cat
                  ? 'bg-[#2858FF] text-[#E8F0FF]'
                  : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="Filter actions..."
          aria-label="Filter actions by keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2.5 py-1 text-xs cr-font-mono-code bg-[#0C1326] text-[#E8F0FF] border border-[#61728F] focus:border-[#E4FF58] focus:outline-none"
        />
      </div>

      {/* Modular Action Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
        {filteredActions.map((action) => {
          const isAssignedToCurrent = currentSlot.actionId === action.id;

          return (
            <div
              key={action.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', action.id);
              }}
              onMouseEnter={() => setHoveredActionId(action.id)}
              className={`p-2.5 border-2 transition-all flex items-start justify-between gap-2.5 ${
                isAssignedToCurrent
                  ? 'bg-[#2858FF]/30 border-[#E4FF58]'
                  : 'bg-[#15203D] border-[#61728F]/60 hover:border-[#2858FF]'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="p-2 bg-[#0C1326] border border-[#2858FF] shrink-0">
                  <PixelActionIcon icon={action.icon} className="w-5 h-5" color="#E4FF58" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="cr-font-mono-code text-xs font-bold text-[#E8F0FF] truncate">
                      {action.title}
                    </span>
                    <span className="text-[10px] cr-font-mono-code text-[#B6D7F7]">
                      · {action.category}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#B6D7F7] line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAssignAction(selectedSlotIndex, action.id)}
                aria-label={`Assign ${action.title} to Slot ${selectedSlotIndex + 1}`}
                className={`px-2.5 py-1.5 text-[10px] cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                  isAssignedToCurrent
                    ? 'bg-[#E4FF58] text-[#111A31]'
                    : 'bg-[#2858FF] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31]'
                }`}
              >
                {isAssignedToCurrent ? (
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-3 h-3" /> PATCHED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    ASSIGN <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Real-World Hardware Mapping Tooltip Box */}
      <div className="p-2.5 bg-[#0C1326] border border-[#61728F] text-xs space-y-1">
        <div className="flex items-center justify-between cr-font-mono-code text-[10px] text-[#E4FF58]">
          <span className="inline-flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3" /> HOW THIS MAPS TO REAL HARDWARE: {hoveredAction.title}
          </span>
          <span className="text-[#B6D7F7]">WEB DEMO TILE</span>
        </div>
        <p className="text-[11px] text-[#E8F0FF]">{hoveredAction.realWorldMapping}</p>
        <p className="text-[10px] text-[#B6D7F7]">
          Note: These tiles are illustrative browser simulations and do not claim to be bundled native Elgato plugins.
        </p>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/apps/DeckLabApp.tsx">
<![CDATA['use client';
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
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/apps/DeviceInfoApp.tsx">
<![CDATA['use client';
import React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { DeckSlotConfig } from '../../lib/os/types';
import { StreamDeckHardwareView } from '../hardware/StreamDeckHardwareView';

interface DeviceInfoAppProps {
  slots: DeckSlotConfig[];
  selectedSlotIndex: number;
  onSelectSlot: (idx: number) => void;
}

export const DeviceInfoApp: React.FC<DeviceInfoAppProps> = ({
  slots,
  selectedSlotIndex,
  onSelectSlot,
}) => {
  const verifiedFacts = [
    '15 customizable LCD keys arranged in a 5 columns × 3 rows matrix',
    'Instant visual feedback on every key face for actions, folders, and toggles',
    'Interchangeable removable faceplate for clean customization',
    'Detachable USB-C cable and weighted non-slip 45° desk stand included',
    'Works with official Elgato Stream Deck software on macOS and Windows',
  ];

  return (
    <div className="space-y-3">
      <div className="p-2.5 bg-[#0C1326] border border-[#2858FF]">
        <div className="cr-font-mono-code text-[10px] font-bold text-[#E4FF58]">
          REAL FEATURED PRODUCT · BY ELGATO
        </div>
        <h3 className="cr-font-display text-base font-bold text-[#E8F0FF]">
          MEET THE BUTTONS BEHIND THE MAGIC.
        </h3>
        <p className="text-xs text-[#B6D7F7] mt-0.5">
          15 customizable LCD keys. A hardware control surface ready to become part of your workflow.
        </p>
      </div>

      {/* Interactive High-Clarity Hardware Viewer */}
      <StreamDeckHardwareView
        slots={slots}
        selectedSlotIndex={selectedSlotIndex}
        onSelectSlot={onSelectSlot}
        compact={true}
        showAngleSwitcher={true}
      />

      {/* Verified Specification List */}
      <div className="p-3 bg-[#15203D] border border-[#61728F] space-y-1.5">
        <div className="cr-font-mono-code text-[11px] font-bold text-[#E4FF58]">
          VERIFIED STREAM DECK MK.2 HARDWARE FACTS
        </div>
        <ul className="space-y-1 text-xs text-[#E8F0FF]">
          {verifiedFacts.map((fact) => (
            <li key={fact} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#E4FF58] shrink-0 mt-0.5" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary Manufacturer CTA & Comparison Link */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
        <a
          href="https://www.elgato.com/us/en/p/stream-deck"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt transition-colors whitespace-nowrap shrink-0"
        >
          <span>EXPLORE STREAM DECK MK.2</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <a
          href="https://www.elgato.com/ww/en/explorer/products/stream-deck/stream-deck-device-comparison/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] cr-font-mono-code text-[#B6D7F7] hover:text-[#E4FF58] underline underline-offset-4 whitespace-nowrap shrink-0"
        >
          <span>Official Device Comparison</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <p className="text-[10px] cr-font-mono-code text-[#B6D7F7] leading-relaxed border-t border-[#61728F]/40 pt-2">
        CTRL/ROOM is an independent fictional creative concept featuring Stream Deck MK.2 by Elgato. Not affiliated with or endorsed by Elgato.
      </p>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/apps/NotesApp.tsx">
<![CDATA['use client';
import React from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';

interface NotesAppProps {
  content: string;
  onChange: (nextContent: string) => void;
}

export const NotesApp: React.FC<NotesAppProps> = ({ content, onChange }) => {
  const appendSnippet = (snippet: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    onChange(`${content}\n[${time}] ${snippet}`);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#0C1326] border border-[#2858FF]">
        <div className="flex items-center gap-1.5 cr-font-mono-code text-xs font-bold text-[#E4FF58]">
          <FileText className="w-3.5 h-3.5" />
          <span>INTERNAL STUDIO SCRATCHPAD (DEMO ONLY)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => appendSnippet('Checked camera framing & LUT contrast.')}
            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] cr-font-mono-code font-bold bg-[#2858FF] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31] whitespace-nowrap shrink-0"
          >
            <Plus className="w-3 h-3" />
            <span>STAMP NOTE</span>
          </button>
          <button
            type="button"
            onClick={() => onChange('CTRL/ROOM STUDIO SCRATCHPAD\n---------------------------\n')}
            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] cr-font-mono-code font-bold bg-[#172342] text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F] whitespace-nowrap shrink-0"
          >
            <Trash2 className="w-3 h-3" />
            <span>CLEAR</span>
          </button>
        </div>
      </div>

      <label htmlFor="ctrl-room-notes-textarea" className="sr-only">
        Studio Scratchpad Notes
      </label>
      <textarea
        id="ctrl-room-notes-textarea"
        rows={9}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 cr-font-mono-code text-xs bg-[#0A1020] text-[#E8F0FF] border-2 border-[#61728F] focus:border-[#E4FF58] focus:outline-none leading-relaxed"
      />
      <p className="text-[10px] cr-font-mono-code text-[#B6D7F7]">
        Triggered by <strong className="text-[#E8F0FF]">OPEN NOTES</strong>,{' '}
        <strong className="text-[#E8F0FF]">DAILY STAMP</strong>, and{' '}
        <strong className="text-[#E8F0FF]">CLIP 30S</strong> actions in the 15-key simulator.
      </p>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/apps/ProfileSwitcherApp.tsx">
<![CDATA['use client';
import React from 'react';
import { CheckCircle2, RotateCcw, Layers } from 'lucide-react';
import { getActionById } from '../../lib/os/actions';
import { CURATED_PROFILES, isProfileModified } from '../../lib/os/presets';
import { DeckSlotConfig, ProfileId } from '../../lib/os/types';
import { PixelActionIcon } from '../icons/PixelSprites';

interface ProfileSwitcherAppProps {
  activeProfile: ProfileId;
  allProfiles: Record<ProfileId, DeckSlotConfig[]>;
  onSwitchProfile: (profileId: ProfileId) => void;
  onResetProfile: (profileId: ProfileId) => void;
}

export const ProfileSwitcherApp: React.FC<ProfileSwitcherAppProps> = ({
  activeProfile,
  allProfiles,
  onSwitchProfile,
  onResetProfile,
}) => {
  return (
    <div className="space-y-3">
      <div className="p-2.5 bg-[#0C1326] border border-[#2858FF]">
        <div className="cr-font-mono-code text-[11px] font-bold text-[#E4FF58]">
          ONE DEVICE. MANY WAYS TO WORK.
        </div>
        <p className="text-xs text-[#B6D7F7]">
          Swap between three curated 15-key workspaces. Your custom slot edits are preserved per profile in browser memory until you reset them.
        </p>
      </div>

      <div className="space-y-2.5">
        {(['STUDIO', 'LIVE', 'EVERYDAY'] as ProfileId[]).map((profId) => {
          const def = CURATED_PROFILES[profId];
          const slots = allProfiles[profId];
          const isCurrent = activeProfile === profId;
          const isDirty = isProfileModified(profId, slots);

          return (
            <div
              key={profId}
              className={`p-3 border-2 transition-colors ${
                isCurrent
                  ? 'bg-[#17254A] border-[#E4FF58]'
                  : 'bg-[#0C1326] border-[#61728F]/60 hover:border-[#2858FF]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="cr-font-display text-sm font-bold text-[#E8F0FF]">
                      {def.name}
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31]">
                        ACTIVE
                      </span>
                    )}
                    {isDirty && (
                      <span className="px-1.5 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#FC5FA9] text-[#111A31]">
                        CUSTOMIZED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#B6D7F7] mt-0.5">{def.tagline}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  {isDirty && (
                    <button
                      type="button"
                      onClick={() => onResetProfile(profId)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[10px] cr-font-mono-code font-bold bg-[#111A31] text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F] whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>RESTORE DEFAULT</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSwitchProfile(profId)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                      isCurrent
                        ? 'bg-[#E4FF58] text-[#111A31]'
                        : 'bg-[#2858FF] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31]'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>LOADED</span>
                      </>
                    ) : (
                      <>
                        <Layers className="w-3.5 h-3.5" />
                        <span>LOAD {profId}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 5x3 Mini Matrix Preview */}
              <div className="mt-2.5 grid grid-cols-5 gap-1.5 pt-2 border-t border-[#61728F]/30">
                {slots.slice(0, 10).map((slot) => {
                  const action = getActionById(slot.actionId);
                  return (
                    <div
                      key={slot.slotIndex}
                      className="px-1.5 py-1 bg-[#111A31] border border-[#61728F]/40 flex items-center gap-1 min-w-0"
                    >
                      <PixelActionIcon
                        icon={slot.customIcon || action.icon}
                        className="w-3.5 h-3.5 shrink-0"
                        color="#E4FF58"
                      />
                      <span className="text-[9px] cr-font-mono-code text-[#E8F0FF] truncate">
                        {slot.customLabel || action.shortLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/apps/RunLogApp.tsx">
<![CDATA['use client';
import React from 'react';
import { Trash2, Zap, Terminal } from 'lucide-react';
import { RunLogEntry } from '../../lib/os/types';

interface RunLogAppProps {
  logs: RunLogEntry[];
  onClearLogs: () => void;
  onTriggerDemoKey: () => void;
}

export const RunLogApp: React.FC<RunLogAppProps> = ({
  logs,
  onClearLogs,
  onTriggerDemoKey,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#0C1326] border border-[#2858FF]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#E4FF58]" />
          <div>
            <div className="cr-font-mono-code text-xs font-bold text-[#E8F0FF]">
              SIMULATION EVENT STREAM ({logs.length} EVENTS)
            </div>
            <div className="text-[10px] text-[#B6D7F7]">
              Every key press executes deterministic local browser state—no external OS commands.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onTriggerDemoKey}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] transition-colors whitespace-nowrap shrink-0"
          >
            <Zap className="w-3 h-3" />
            <span>FIRE TEST KEY</span>
          </button>
          <button
            type="button"
            onClick={onClearLogs}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#172342] text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F] transition-colors whitespace-nowrap shrink-0"
          >
            <Trash2 className="w-3 h-3" />
            <span>CLEAR</span>
          </button>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="p-6 text-center bg-[#0C1326] border border-[#61728F]/50 space-y-2">
          <p className="cr-font-mono-code text-xs text-[#B6D7F7]">
            NO KEYS TRIGGERED YET IN THIS SESSION.
          </p>
          <p className="text-xs text-[#E8F0FF]">
            Click any key inside <strong className="text-[#E4FF58]">DECK LAB</strong> or click{' '}
            <strong>FIRE TEST KEY</strong> above to watch a simulated macro run.
          </p>
        </div>
      ) : (
        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 cr-font-mono-code">
          {logs.map((entry) => (
            <div
              key={entry.id}
              className="p-2.5 bg-[#0C1326] border-l-2 border-[#E4FF58] border-y border-r border-[#61728F]/40 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#B6D7F7] text-[10px]">{entry.timestamp}</span>
                  <span className="px-1.5 py-0.5 bg-[#2858FF] text-[#E8F0FF] text-[10px] font-bold">
                    SLOT {String(entry.slotIndex + 1).padStart(2, '0')} (R{entry.row}·C{entry.col})
                  </span>
                  <span className="font-bold text-[#E4FF58]">{entry.label}</span>
                </div>
                <span className="text-[10px] font-bold text-[#FC5FA9]">{entry.statusText}</span>
              </div>
              <p className="mt-1 text-[11px] font-sans text-[#E8F0FF]">{entry.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/hardware/StreamDeckHardwareView.tsx">
<![CDATA['use client';
import React, { useState } from 'react';
import { Maximize2, X, CheckCircle2, Usb, Layers, Sliders } from 'lucide-react';
import { getActionById } from '../../lib/os/actions';
import { DeckSlotConfig } from '../../lib/os/types';
import { PixelActionIcon } from '../icons/PixelSprites';

interface StreamDeckHardwareViewProps {
  slots: DeckSlotConfig[];
  selectedSlotIndex?: number;
  onSelectSlot?: (index: number) => void;
  compact?: boolean;
  showAngleSwitcher?: boolean;
}

type HardwareAngle = 'FRONTAL' | 'STAND_45' | 'REAR_DETAIL';

/**
 * High-resolution, non-pixelated, smooth studio hardware illustration & interactive
 * photograph-grade render of the physical Elgato Stream Deck MK.2 (5 columns x 3 rows).
 * Strictly contrasts with the pixelated OS interface per Section 3 & Section 5.
 */
export const StreamDeckHardwareView: React.FC<StreamDeckHardwareViewProps> = ({
  slots,
  selectedSlotIndex,
  onSelectSlot,
  compact = false,
  showAngleSwitcher = true,
}) => {
  const [angle, setAngle] = useState<HardwareAngle>('FRONTAL');
  const [zoomOpen, setZoomOpen] = useState(false);
  const [activeCallout, setActiveCallout] = useState<number | null>(null);

  const callouts = [
    {
      id: 1,
      title: '15 Customizable LCD Keys (5 × 3 Matrix)',
      detail: 'Each key is an individual high-resolution LCD screen ready to display dynamic icons and trigger single or multi-step actions.',
    },
    {
      id: 2,
      title: 'Removable Matte Faceplate',
      detail: 'Precision-engineered detachable top plate lets creators swap designs or clean the key bezel effortlessly.',
    },
    {
      id: 3,
      title: 'Detachable USB-C Connection & Fixed 45° Stand',
      detail: 'Weighted non-slip desk stand holds the surface at an optimal viewing angle with a rear recessed USB-C port.',
    },
  ];

  const renderHardwareChassis = (isLarge = false) => {
    if (angle === 'REAR_DETAIL') {
      return (
        <div className="relative w-full max-w-[520px] mx-auto select-none">
          <svg
            viewBox="0 0 640 400"
            className="w-full h-auto drop-shadow-[0_24px_38px_rgba(0,0,0,0.65)]"
            role="img"
            aria-label="Elgato Stream Deck MK.2 Rear USB-C Port, Detachable Stand, and Removable Faceplate Architecture"
          >
            <defs>
              <linearGradient id="mk2RearBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#262B36" />
                <stop offset="50%" stopColor="#171A21" />
                <stop offset="100%" stopColor="#0D0F14" />
              </linearGradient>
              <linearGradient id="mk2StandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E222B" />
                <stop offset="100%" stopColor="#0B0D12" />
              </linearGradient>
            </defs>

            {/* Studio Desk Horizon */}
            <ellipse cx="320" cy="348" rx="250" ry="26" fill="rgba(0,0,0,0.55)" />

            {/* Detachable 45-degree Non-slip Stand */}
            <path
              d="M150 230 L490 230 L525 340 L115 340 Z"
              fill="url(#mk2StandGrad)"
              stroke="#3A4252"
              strokeWidth="2"
            />
            <rect x="135" y="332" width="370" height="8" rx="4" fill="#2858FF" opacity="0.55" />

            {/* Main MK.2 Angled Chassis Rear */}
            <rect
              x="120"
              y="56"
              width="400"
              height="230"
              rx="22"
              fill="url(#mk2RearBody)"
              stroke="#475166"
              strokeWidth="2.5"
            />

            {/* Subtle Elgato-style geometric rear recess */}
            <rect
              x="250"
              y="150"
              width="140"
              height="90"
              rx="10"
              fill="#0B0D12"
              stroke="#2C3342"
              strokeWidth="1.5"
            />
            {/* USB-C Female Port */}
            <rect
              x="298"
              y="182"
              width="44"
              height="16"
              rx="8"
              fill="#050608"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            <rect x="308" y="188" width="24" height="4" rx="2" fill="#E4FF58" />

            {/* Braided Detachable USB-C Cable */}
            <path
              d="M320 198 L320 375"
              stroke="#1E2430"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M320 198 L320 375"
              stroke="#3B4454"
              strokeWidth="10"
              strokeDasharray="4 6"
            />

            {/* Callout Badges */}
            <g transform="translate(148, 86)">
              <rect x="0" y="0" width="168" height="30" rx="6" fill="#111A31" stroke="#E4FF58" strokeWidth="1.5" />
              <text x="12" y="19" fill="#E4FF58" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                FIXED 45° DESK STAND
              </text>
            </g>
            <g transform="translate(358, 174)">
              <rect x="0" y="0" width="144" height="30" rx="6" fill="#111A31" stroke="#B6D7F7" strokeWidth="1.5" />
              <text x="12" y="19" fill="#E8F0FF" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                DETACHABLE USB-C
              </text>
            </g>
          </svg>
        </div>
      );
    }

    return (
      <div
        className={`relative mx-auto select-none transition-transform duration-300 ${
          angle === 'STAND_45' ? 'perspective-[1100px]' : ''
        } ${isLarge ? 'max-w-[640px]' : compact ? 'max-w-[360px]' : 'max-w-[480px]'}`}
      >
        <div
          className={`relative rounded-[24px] p-5 sm:p-6 bg-gradient-to-br from-[#2B303C] via-[#181B22] to-[#0E1015] border border-[#495366]/80 shadow-[0_24px_48px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.22)] transition-transform duration-300 ${
            angle === 'STAND_45' ? 'rotate-x-[14deg] -rotate-y-[10deg] scale-[0.97]' : ''
          }`}
        >
          {/* Top Hardware Bezel Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E8F0FF]/60" />
              <span className="text-[11px] font-sans font-semibold tracking-[0.18em] text-[#E8F0FF]/80 uppercase">
                ELGATO STREAM DECK MK.2
              </span>
            </div>
            <span className="text-[10px] cr-font-mono-code text-[#B6D7F7]/75">
              5 × 3 LCD MATRIX · 15 KEYS
            </span>
          </div>

          {/* Inner Removable Matte Faceplate Recess */}
          <div className="rounded-[16px] p-3 sm:p-4 bg-[#0D0F14] border border-[#272D3A] shadow-[inset_0_3px_10px_rgba(0,0,0,0.85)]">
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
              {slots.slice(0, 15).map((slot) => {
                const action = getActionById(slot.actionId);
                const label = slot.customLabel || action.shortLabel;
                const iconId = slot.customIcon || action.icon;
                const isSelected = selectedSlotIndex === slot.slotIndex;

                return (
                  <button
                    key={slot.slotIndex}
                    type="button"
                    onClick={() => onSelectSlot?.(slot.slotIndex)}
                    aria-label={`Hardware preview key ${slot.slotIndex + 1}: ${label}`}
                    className={`group relative aspect-square rounded-[10px] p-1.5 flex flex-col items-center justify-between overflow-hidden transition-all duration-150 ${
                      isSelected
                        ? 'ring-2 ring-[#E4FF58] bg-gradient-to-b from-[#2858FF] to-[#132247] scale-[0.98]'
                        : 'bg-gradient-to-b from-[#1E263B] to-[#0F1420] hover:from-[#26324D] hover:to-[#131B2E]'
                    } border border-white/15 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.28)]`}
                  >
                    {/* Subtle optical glass keycap lens highlight */}
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-[9px]"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-[8px] cr-font-mono-code text-[#B6D7F7]/70 self-start leading-none">
                      {String(slot.slotIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="relative z-10 my-auto">
                      <PixelActionIcon
                        icon={iconId}
                        className={compact ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'}
                        color="#E8F0FF"
                      />
                    </div>
                    <span className="relative z-10 w-full truncate text-center text-[8px] sm:text-[9px] cr-font-mono-code font-bold text-[#E8F0FF] tracking-tight leading-none">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stand Base Lip */}
          <div className="mt-3 flex items-center justify-between px-2 text-[10px] cr-font-mono-code text-[#B6D7F7]/70">
            <span>REMOVABLE FACEPLATE</span>
            <span>USB-C DETACHABLE</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Angle & Inspection Toolbar */}
      {showAngleSwitcher && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-[#0C1326] p-1 border border-[#61728F]/50">
            <button
              type="button"
              onClick={() => setAngle('FRONTAL')}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                angle === 'FRONTAL'
                  ? 'bg-[#2858FF] text-[#E8F0FF]'
                  : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              FRONTAL 5×3
            </button>
            <button
              type="button"
              onClick={() => setAngle('STAND_45')}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                angle === 'STAND_45'
                  ? 'bg-[#2858FF] text-[#E8F0FF]'
                  : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              45° STAND ANGLE
            </button>
            <button
              type="button"
              onClick={() => setAngle('REAR_DETAIL')}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                angle === 'REAR_DETAIL'
                  ? 'bg-[#2858FF] text-[#E8F0FF]'
                  : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              USB-C & STAND
            </button>
          </div>

          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#111A31] text-[#E4FF58] border border-[#E4FF58]/60 hover:bg-[#E4FF58] hover:text-[#111A31] transition-colors whitespace-nowrap shrink-0"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>ZOOM HARDWARE</span>
          </button>
        </div>
      )}

      {/* Main High-Clarity Hardware Stage */}
      <div className="relative rounded-none bg-gradient-to-b from-[#162242] to-[#0C1326] border-2 border-[#61728F]/60 p-4 sm:p-5">
        {renderHardwareChassis(false)}

        {/* Interactive Feature Callout Pills */}
        {!compact && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-[#61728F]/30">
            {callouts.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCallout(activeCallout === idx ? null : idx)}
                className={`text-left p-2.5 border transition-colors ${
                  activeCallout === idx
                    ? 'bg-[#2858FF]/25 border-[#E4FF58] text-[#E8F0FF]'
                    : 'bg-[#111A31]/80 border-[#61728F]/40 text-[#B6D7F7] hover:border-[#B6D7F7]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] cr-font-mono-code font-bold text-[#E4FF58]">
                  <span>0{item.id}. SPEC FACT</span>
                  {idx === 0 ? (
                    <Sliders className="w-3.5 h-3.5" />
                  ) : idx === 1 ? (
                    <Layers className="w-3.5 h-3.5" />
                  ) : (
                    <Usb className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="mt-1 text-xs font-semibold text-[#E8F0FF]">{item.title}</div>
                {activeCallout === idx && (
                  <p className="mt-1.5 text-[11px] text-[#B6D7F7] leading-relaxed">{item.detail}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hardware Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[120] bg-[#111A31]/90 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Stream Deck MK.2 Hardware Inspection Lightbox"
        >
          <div className="w-full max-w-3xl bg-[#111A31] border-2 border-[#E4FF58] cr-shadow-ctrl-lg p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#61728F]/50">
              <div>
                <h3 className="cr-font-display text-lg font-bold text-[#E8F0FF]">
                  ELGATO STREAM DECK MK.2 — HARDWARE INSPECTION
                </h3>
                <p className="text-xs text-[#B6D7F7]">
                  15 customizable LCD keys (5 columns × 3 rows) · Interchangeable faceplate · Detachable USB-C · Fixed 45° stand
                </p>
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                aria-label="Close hardware zoom modal"
                className="px-3 py-1.5 bg-[#FC5FA9] text-[#111A31] cr-font-mono-code text-xs font-bold hover:bg-[#E4FF58] transition-colors"
              >
                <span className="inline-flex items-center gap-1">
                  <X className="w-4 h-4" /> CLOSE
                </span>
              </button>
            </div>

            <div className="py-4">{renderHardwareChassis(true)}</div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {callouts.map((c) => (
                <div key={c.id} className="p-3 bg-[#172342] border border-[#61728F]/50">
                  <div className="flex items-center gap-1.5 cr-font-mono-code font-bold text-[#E4FF58]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{c.title}</span>
                  </div>
                  <p className="mt-1 text-[#B6D7F7] leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/icons/PixelSprites.tsx">
<![CDATA['use client';
import React from 'react';
import { AppId, PixelIconId } from '../../lib/os/types';

interface SpriteProps {
  icon: PixelIconId;
  className?: string;
  color?: string;
}

/**
 * Strict 16x16 logical pixel-grid icon suite designed specifically for CTRL/ROOM OS.
 * Rendered with shapeRendering="crispEdges" so every icon has razor-sharp pixel geometry.
 */
export const PixelActionIcon: React.FC<SpriteProps> = ({
  icon,
  className = 'w-6 h-6',
  color = 'currentColor',
}) => {
  const renderPixels = () => {
    switch (icon) {
      case 'record':
        return (
          <>
            <rect x="4" y="2" width="8" height="2" fill={color} />
            <rect x="2" y="4" width="12" height="8" fill={color} />
            <rect x="4" y="12" width="8" height="2" fill={color} />
            <rect x="6" y="6" width="4" height="4" fill="#FC5FA9" />
          </>
        );
      case 'mic':
        return (
          <>
            <rect x="6" y="1" width="4" height="7" fill={color} />
            <rect x="3" y="5" width="2" height="4" fill={color} />
            <rect x="11" y="5" width="2" height="4" fill={color} />
            <rect x="5" y="9" width="6" height="2" fill={color} />
            <rect x="7" y="11" width="2" height="3" fill={color} />
            <rect x="4" y="14" width="8" height="2" fill="#E4FF58" />
          </>
        );
      case 'notes':
        return (
          <>
            <rect x="2" y="1" width="12" height="14" fill="none" stroke={color} strokeWidth="2" />
            <rect x="5" y="4" width="6" height="2" fill="#E4FF58" />
            <rect x="5" y="7" width="6" height="2" fill={color} />
            <rect x="5" y="10" width="4" height="2" fill={color} />
          </>
        );
      case 'scene':
        return (
          <>
            <rect x="1" y="2" width="9" height="7" fill={color} />
            <rect x="3" y="4" width="5" height="3" fill="#111A31" />
            <rect x="6" y="7" width="9" height="7" fill="#E4FF58" />
            <rect x="8" y="9" width="5" height="3" fill="#111A31" />
          </>
        );
      case 'color':
        return (
          <>
            <rect x="2" y="2" width="5" height="5" fill="#FC5FA9" />
            <rect x="9" y="2" width="5" height="5" fill="#E4FF58" />
            <rect x="2" y="9" width="5" height="5" fill="#2858FF" />
            <rect x="9" y="9" width="5" height="5" fill={color} />
            <rect x="7" y="7" width="2" height="2" fill="#E8F0FF" />
          </>
        );
      case 'focus':
        return (
          <>
            <rect x="2" y="2" width="4" height="2" fill={color} />
            <rect x="2" y="2" width="2" height="4" fill={color} />
            <rect x="10" y="2" width="4" height="2" fill={color} />
            <rect x="12" y="2" width="2" height="4" fill={color} />
            <rect x="2" y="12" width="4" height="2" fill={color} />
            <rect x="2" y="10" width="2" height="4" fill={color} />
            <rect x="10" y="12" width="4" height="2" fill={color} />
            <rect x="12" y="10" width="2" height="4" fill={color} />
            <rect x="6" y="6" width="4" height="4" fill="#E4FF58" />
          </>
        );
      case 'timer':
        return (
          <>
            <rect x="5" y="1" width="6" height="2" fill="#E4FF58" />
            <rect x="3" y="4" width="10" height="10" fill={color} />
            <rect x="5" y="6" width="6" height="6" fill="#111A31" />
            <rect x="7" y="6" width="2" height="4" fill="#E4FF58" />
            <rect x="9" y="8" width="2" height="2" fill="#FC5FA9" />
          </>
        );
      case 'marker':
        return (
          <>
            <rect x="3" y="2" width="2" height="12" fill={color} />
            <rect x="5" y="2" width="8" height="6" fill="#E4FF58" />
            <rect x="7" y="4" width="4" height="2" fill="#111A31" />
          </>
        );
      case 'render':
        return (
          <>
            <rect x="2" y="3" width="12" height="4" fill={color} />
            <rect x="2" y="9" width="12" height="4" fill={color} />
            <rect x="4" y="4" width="6" height="2" fill="#E4FF58" />
            <rect x="4" y="10" width="9" height="2" fill="#FC5FA9" />
          </>
        );
      case 'split':
        return (
          <>
            <rect x="1" y="6" width="5" height="4" fill={color} />
            <rect x="10" y="6" width="5" height="4" fill={color} />
            <rect x="7" y="1" width="2" height="14" fill="#E4FF58" />
          </>
        );
      case 'lut':
        return (
          <>
            <rect x="2" y="2" width="6" height="12" fill={color} />
            <rect x="8" y="2" width="6" height="12" fill="#FC5FA9" />
            <rect x="4" y="5" width="8" height="6" fill="#E4FF58" />
          </>
        );
      case 'keyframe':
        return (
          <>
            <rect x="7" y="2" width="2" height="2" fill="#E4FF58" />
            <rect x="5" y="4" width="6" height="2" fill="#E4FF58" />
            <rect x="3" y="6" width="10" height="4" fill={color} />
            <rect x="5" y="10" width="6" height="2" fill="#E4FF58" />
            <rect x="7" y="12" width="2" height="2" fill="#E4FF58" />
          </>
        );
      case 'audio-duck':
        return (
          <>
            <rect x="2" y="4" width="2" height="8" fill={color} />
            <rect x="5" y="7" width="2" height="5" fill="#E4FF58" />
            <rect x="8" y="9" width="2" height="3" fill="#E4FF58" />
            <rect x="11" y="4" width="2" height="8" fill={color} />
            <rect x="5" y="3" width="5" height="2" fill="#FC5FA9" />
          </>
        );
      case 'brb':
        return (
          <>
            <rect x="1" y="3" width="14" height="10" fill={color} />
            <rect x="3" y="5" width="2" height="6" fill="#111A31" />
            <rect x="7" y="5" width="2" height="6" fill="#FC5FA9" />
            <rect x="11" y="5" width="2" height="6" fill="#E4FF58" />
          </>
        );
      case 'chat-mark':
        return (
          <>
            <rect x="2" y="2" width="12" height="9" fill={color} />
            <rect x="4" y="11" width="3" height="3" fill={color} />
            <rect x="5" y="5" width="6" height="3" fill="#111A31" />
          </>
        );
      case 'lower-third':
        return (
          <>
            <rect x="1" y="2" width="14" height="12" fill="none" stroke={color} strokeWidth="2" />
            <rect x="3" y="9" width="10" height="3" fill="#E4FF58" />
            <rect x="3" y="6" width="5" height="2" fill="#FC5FA9" />
          </>
        );
      case 'cam-zoom':
        return (
          <>
            <rect x="2" y="3" width="9" height="9" fill={color} />
            <rect x="4" y="5" width="5" height="5" fill="#111A31" />
            <rect x="11" y="5" width="3" height="5" fill="#E4FF58" />
          </>
        );
      case 'stream-clip':
        return (
          <>
            <rect x="2" y="2" width="12" height="3" fill="#E4FF58" />
            <rect x="2" y="6" width="12" height="8" fill={color} />
            <rect x="6" y="8" width="4" height="4" fill="#111A31" />
          </>
        );
      case 'pomodoro':
      case 'window-tidy':
        return (
          <>
            <rect x="2" y="2" width="5" height="5" fill={color} />
            <rect x="9" y="2" width="5" height="5" fill="#E4FF58" />
            <rect x="2" y="9" width="5" height="5" fill="#B6D7F7" />
            <rect x="9" y="9" width="5" height="5" fill={color} />
          </>
        );
      case 'daily-log':
        return (
          <>
            <rect x="3" y="2" width="10" height="12" fill={color} />
            <rect x="5" y="5" width="2" height="2" fill="#111A31" />
            <rect x="8" y="5" width="3" height="2" fill="#111A31" />
            <rect x="5" y="9" width="6" height="2" fill="#E4FF58" />
          </>
        );
      case 'calc-macro':
        return (
          <>
            <rect x="2" y="2" width="12" height="12" fill={color} />
            <rect x="4" y="4" width="8" height="3" fill="#111A31" />
            <rect x="4" y="9" width="3" height="3" fill="#E4FF58" />
            <rect x="9" y="9" width="3" height="3" fill="#FC5FA9" />
          </>
        );
      case 'folder-jump':
        return (
          <>
            <rect x="2" y="3" width="5" height="2" fill="#E4FF58" />
            <rect x="2" y="5" width="12" height="9" fill={color} />
            <rect x="5" y="8" width="6" height="3" fill="#111A31" />
          </>
        );
      case 'ambient-synth':
        return (
          <>
            <rect x="2" y="8" width="2" height="5" fill={color} />
            <rect x="5" y="4" width="2" height="9" fill="#E4FF58" />
            <rect x="8" y="6" width="2" height="7" fill="#FC5FA9" />
            <rect x="11" y="2" width="2" height="11" fill={color} />
          </>
        );
      case 'dice-prompt':
        return (
          <>
            <rect x="2" y="2" width="12" height="12" fill={color} />
            <rect x="4" y="4" width="2" height="2" fill="#111A31" />
            <rect x="10" y="4" width="2" height="2" fill="#111A31" />
            <rect x="7" y="7" width="2" height="2" fill="#FC5FA9" />
            <rect x="4" y="10" width="2" height="2" fill="#111A31" />
            <rect x="10" y="10" width="2" height="2" fill="#111A31" />
          </>
        );
      case 'coffee-break':
        return (
          <>
            <rect x="5" y="2" width="2" height="2" fill="#E4FF58" />
            <rect x="9" y="2" width="2" height="2" fill="#E4FF58" />
            <rect x="3" y="5" width="8" height="8" fill={color} />
            <rect x="11" y="6" width="2" height="4" fill={color} />
            <rect x="2" y="13" width="10" height="2" fill="#FC5FA9" />
          </>
        );
      default:
        return <rect x="3" y="3" width="10" height="10" fill={color} />;
    }
  };

  return (
    <svg
      viewBox="0 0 16 16"
      className={`cr-pixel-sprite shrink-0 ${className}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {renderPixels()}
    </svg>
  );
};

export const AppLauncherPixelIcon: React.FC<{ appId: AppId; className?: string }> = ({
  appId,
  className = 'w-6 h-6',
}) => {
  switch (appId) {
    case 'deck-lab':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="1" y="2" width="14" height="12" fill="#111A31" stroke="#E8F0FF" strokeWidth="1" />
          <rect x="3" y="4" width="2" height="2" fill="#E4FF58" />
          <rect x="7" y="4" width="2" height="2" fill="#2858FF" />
          <rect x="11" y="4" width="2" height="2" fill="#FC5FA9" />
          <rect x="3" y="7" width="2" height="2" fill="#2858FF" />
          <rect x="7" y="7" width="2" height="2" fill="#E8F0FF" />
          <rect x="11" y="7" width="2" height="2" fill="#2858FF" />
          <rect x="3" y="10" width="2" height="2" fill="#B6D7F7" />
          <rect x="7" y="10" width="2" height="2" fill="#E4FF58" />
          <rect x="11" y="10" width="2" height="2" fill="#B6D7F7" />
        </svg>
      );
    case 'action-library':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="5" height="5" fill="#E4FF58" />
          <rect x="9" y="2" width="5" height="5" fill="#FC5FA9" />
          <rect x="2" y="9" width="5" height="5" fill="#E8F0FF" />
          <rect x="9" y="9" width="5" height="5" fill="#2858FF" />
        </svg>
      );
    case 'run-log':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="1" y="2" width="14" height="12" fill="#111A31" stroke="#B6D7F7" strokeWidth="1" />
          <rect x="3" y="5" width="3" height="2" fill="#E4FF58" />
          <rect x="7" y="5" width="6" height="2" fill="#E8F0FF" />
          <rect x="3" y="9" width="3" height="2" fill="#FC5FA9" />
          <rect x="7" y="9" width="5" height="2" fill="#B6D7F7" />
        </svg>
      );
    case 'profile-switcher':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="9" height="7" fill="#2858FF" />
          <rect x="4" y="5" width="9" height="7" fill="#FC5FA9" />
          <rect x="6" y="8" width="8" height="6" fill="#E4FF58" />
        </svg>
      );
    case 'device-info':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" fill="#E8F0FF" />
          <rect x="4" y="4" width="8" height="8" fill="#111A31" />
          <rect x="7" y="5" width="2" height="2" fill="#E4FF58" />
          <rect x="7" y="8" width="2" height="3" fill="#2858FF" />
        </svg>
      );
    case 'about-concept':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" fill="#FC5FA9" />
          <rect x="4" y="4" width="8" height="8" fill="#111A31" />
          <rect x="6" y="6" width="4" height="4" fill="#E4FF58" />
        </svg>
      );
    case 'notes':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="3" y="1" width="10" height="14" fill="#E8F0FF" />
          <rect x="5" y="4" width="6" height="2" fill="#2858FF" />
          <rect x="5" y="8" width="6" height="2" fill="#111A31" />
          <rect x="5" y="11" width="4" height="2" fill="#FC5FA9" />
        </svg>
      );
  }
};

export const CtrlRoomGlyphLogo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 24 24"
    className={`cr-pixel-sprite shrink-0 ${className}`}
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <rect x="0" y="0" width="24" height="24" fill="#2858FF" />
    <rect x="20" y="0" width="4" height="4" fill="#111A31" />
    <rect x="3" y="3" width="5" height="5" fill="#E4FF58" />
    <rect x="10" y="3" width="5" height="5" fill="#E8F0FF" />
    <rect x="3" y="10" width="5" height="5" fill="#E8F0FF" />
    <rect x="10" y="10" width="5" height="5" fill="#111A31" />
    <rect x="17" y="10" width="4" height="5" fill="#FC5FA9" />
    <rect x="3" y="17" width="18" height="4" fill="#111A31" />
    <rect x="5" y="18" width="6" height="2" fill="#E4FF58" />
  </svg>
);
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/layout/BrandHeader.tsx">
<![CDATA['use client';
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CtrlRoomGlyphLogo } from '../icons/PixelSprites';

export const BrandHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 bg-[#111A31]/95 backdrop-blur-xs border-b-2 border-[#2858FF]">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#top"
        className="inline-flex items-center gap-2.5 cr-font-display text-lg sm:text-xl font-bold tracking-tight text-[#E8F0FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
      >
        <CtrlRoomGlyphLogo className="w-6 h-6" />
        <span>CTRL/ROOM</span>
      </a>

      {/* Zone 2: 5 clean single-line text navigation links */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex items-center gap-6 text-sm font-medium text-[#B6D7F7]"
      >
        <a
          href="#desktop-stage"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Desktop OS
        </a>
        <a
          href="#section-deck-lab"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Deck Lab
        </a>
        <a
          href="#section-action-library"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Action Library
        </a>
        <a
          href="#section-profiles"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Profiles
        </a>
        <a
          href="#section-device-info"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Stream Deck MK.2
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <a
          href="https://www.elgato.com/us/en/p/stream-deck"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs cr-font-mono-code font-bold text-[#111A31] bg-[#E4FF58] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt transition-colors whitespace-nowrap shrink-0"
        >
          <span>SEE REAL PRODUCT</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/motion/BootSequence.tsx">
<![CDATA['use client';
import React, { useEffect, useState } from 'react';
import { CtrlRoomGlyphLogo } from '../icons/PixelSprites';

interface BootSequenceProps {
  onComplete?: () => void;
}

/**
 * Deterministic 4-strip pixel shutter reveal per Section 4 & Section 6:
 * - Settles in ~650ms so it never blocks navigation.
 * - Immediately bypassed when ?autostart=1, session repeat, or prefers-reduced-motion is active.
 */
export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      onComplete?.();
      return;
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.();
      return;
    }
    try {
      if (window.sessionStorage.getItem('ctrl_room_booted') === '1') {
        onComplete?.();
        return;
      }
    } catch {
      // Ignore sessionStorage restrictions
    }
    setVisible(true);
  }, [onComplete]);

  useEffect(() => {
    if (!visible) return;

    const t1 = window.setTimeout(() => setStep(1), 120);
    const t2 = window.setTimeout(() => setStep(2), 340);
    const t3 = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem('ctrl_room_booted', '1');
      } catch {
        // Ignore
      }
      setVisible(false);
      onComplete?.();
    }, 680);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      onClick={() => setVisible(false)}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] grid grid-rows-4 overflow-hidden"
    >
      {[0, 1, 2, 3].map((stripIdx) => (
        <div
          key={stripIdx}
          style={{
            transform: step >= 2 ? 'translateX(100%)' : 'translateX(0%)',
            transition: `transform 320ms steps(6, end) ${stripIdx * 55}ms`,
          }}
          className="bg-[#111A31] border-b-2 border-[#2858FF] flex items-center justify-between px-8"
        >
          {stripIdx === 1 && (
            <div className="flex items-center gap-3">
              <CtrlRoomGlyphLogo className="w-8 h-8" />
              <span className="cr-font-mono-code text-xs sm:text-sm font-bold text-[#E4FF58] tracking-widest">
                C/R OS — BUILD 01.15 — INITIALIZING 15-KEY SURFACE...
              </span>
            </div>
          )}
          {stripIdx === 2 && (
            <div className="w-full max-w-md h-2 bg-[#1A2747] border border-[#2858FF]">
              <div
                className="h-full bg-[#E4FF58] transition-all duration-200"
                style={{ width: step >= 1 ? '100%' : '35%' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/os/DesktopStage.tsx">
<![CDATA['use client';
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
  onSaveDemo: () => void;
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
    <div className="w-full border-2 border-[#2858FF] bg-[#111A31] cr-shadow-ctrl-lg overflow-hidden">
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
                  className={`group w-full p-2 text-left border-2 transition-all flex items-center justify-between gap-1.5 focus-visible:outline-2 focus-visible:outline-[#E4FF58] ${
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
        <div className="p-3 sm:p-4">{renderAppContent(activeMobileApp)}</div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/components/os/OSWindow.tsx">
<![CDATA['use client';
import React, { useRef, useState } from 'react';
import {
  Minus,
  Maximize2,
  Minimize2,
  X,
  Move,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { AppId, OSWindowState } from '../../lib/os/types';
import { AppLauncherPixelIcon } from '../icons/PixelSprites';

interface OSWindowProps {
  windowState: OSWindowState;
  isFocused: boolean;
  condensedMode?: boolean;
  stageRef: React.RefObject<HTMLDivElement | null>;
  onFocus: (appId: AppId) => void;
  onClose: (appId: AppId) => void;
  onMinimize: (appId: AppId) => void;
  onToggleMaximize: (appId: AppId) => void;
  onMove: (appId: AppId, x: number, y: number, stageW: number, stageH: number) => void;
  onNudge: (appId: AppId, dx: number, dy: number, stageW: number, stageH: number) => void;
  children: React.ReactNode;
}

/**
 * Genuine draggable, keyboard-accessible CTRL/ROOM OS window component.
 * Uses direct Pointer Events + requestAnimationFrame batching for zero-latency dragging,
 * plus an explicit keyboard directional move popover for full keyboard-only accessibility.
 */
export const OSWindow: React.FC<OSWindowProps> = ({
  windowState,
  isFocused,
  condensedMode = false,
  stageRef,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onNudge,
  children,
}) => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const [showKeyboardMove, setShowKeyboardMove] = useState(false);
  const dragStateRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    rafId: number | null;
  }>({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    rafId: null,
  });

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const getStageDimensions = () => {
    const rect = stageRef.current?.getBoundingClientRect();
    return {
      width: rect ? rect.width : 1220,
      height: rect ? rect.height : 640,
    };
  };

  const handlePointerDownTitlebar = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus(windowState.id);
    if (windowState.isMaximized) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: windowState.position.x,
      origY: windowState.position.y,
      rafId: null,
    };
  };

  const handlePointerMoveTitlebar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.dragging) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const dy = e.clientY - dragStateRef.current.startY;
    const nextX = dragStateRef.current.origX + dx;
    const nextY = dragStateRef.current.origY + dy;

    if (dragStateRef.current.rafId !== null) {
      cancelAnimationFrame(dragStateRef.current.rafId);
    }

    dragStateRef.current.rafId = requestAnimationFrame(() => {
      const { width, height } = getStageDimensions();
      onMove(windowState.id, nextX, nextY, width, height);
    });
  };

  const handlePointerUpTitlebar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.dragging) return;
    dragStateRef.current.dragging = false;
    if (dragStateRef.current.rafId !== null) {
      cancelAnimationFrame(dragStateRef.current.rafId);
      dragStateRef.current.rafId = null;
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer already released
    }
  };

  const triggerNudge = (dx: number, dy: number) => {
    const { width, height } = getStageDimensions();
    onNudge(windowState.id, dx, dy, width, height);
  };

  const style: React.CSSProperties = windowState.isMaximized
    ? {
        left: 8,
        top: 8,
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 56px)',
        zIndex: windowState.zIndex,
      }
    : condensedMode
    ? {
        left: windowState.id === 'deck-lab' ? 40 : 620,
        top: 32,
        width: windowState.id === 'deck-lab' ? 560 : 420,
        height: 460,
        zIndex: windowState.zIndex,
        transform: 'scale(0.96)',
      }
    : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.position.width,
        maxWidth: 'calc(100% - 16px)',
        height: windowState.position.height,
        maxHeight: 'calc(100% - 52px)',
        zIndex: windowState.zIndex,
      };

  return (
    <section
      ref={windowRef}
      aria-label={windowState.title}
      onMouseDown={() => onFocus(windowState.id)}
      style={style}
      className={`absolute flex flex-col bg-[#111A31] transition-shadow duration-150 ${
        isFocused
          ? 'border-2 border-[#E4FF58] cr-shadow-ctrl-lg'
          : 'border-2 border-[#61728F] cr-shadow-ctrl opacity-95'
      }`}
    >
      {/* Custom Notched Titlebar Handle */}
      <div
        onPointerDown={handlePointerDownTitlebar}
        onPointerMove={handlePointerMoveTitlebar}
        onPointerUp={handlePointerUpTitlebar}
        onPointerCancel={handlePointerUpTitlebar}
        className={`flex items-center justify-between gap-2 px-3 py-2 select-none cursor-grab active:cursor-grabbing border-b-2 ${
          isFocused
            ? 'bg-[#2858FF] text-[#E8F0FF] border-[#E4FF58]'
            : 'bg-[#192544] text-[#B6D7F7] border-[#61728F]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <AppLauncherPixelIcon appId={windowState.id} className="w-4 h-4 shrink-0" />
          <h2 className="cr-font-mono-code text-xs font-bold tracking-wider truncate">
            {windowState.title}
          </h2>
          {isFocused && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#111A31] text-[#E4FF58]">
              ACTIVE
            </span>
          )}
        </div>

        {/* Window Controls: Keyboard Move, Minimize, Expand/Restore, Close */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowKeyboardMove((prev) => !prev)}
              aria-label={`Move ${windowState.title} window with keyboard`}
              aria-expanded={showKeyboardMove}
              title="Keyboard Window Move Controls"
              className="p-1 bg-[#111A31] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31] border border-[#E8F0FF]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
            >
              <Move className="w-3.5 h-3.5" />
            </button>

            {showKeyboardMove && (
              <div
                role="group"
                aria-label={`Position controls for ${windowState.title}`}
                className="absolute right-0 top-full mt-1 z-50 p-2 bg-[#111A31] border-2 border-[#E4FF58] cr-shadow-ctrl w-40"
              >
                <div className="text-[10px] cr-font-mono-code font-bold text-[#E4FF58] mb-1.5">
                  NUDGE WINDOW (24PX)
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div />
                  <button
                    type="button"
                    onClick={() => triggerNudge(0, -24)}
                    aria-label={`Move ${windowState.title} up`}
                    className="p-1.5 bg-[#1B284A] hover:bg-[#2858FF] text-[#E8F0FF] flex justify-center border border-[#61728F]"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <div />
                  <button
                    type="button"
                    onClick={() => triggerNudge(-24, 0)}
                    aria-label={`Move ${windowState.title} left`}
                    className="p-1.5 bg-[#1B284A] hover:bg-[#2858FF] text-[#E8F0FF] flex justify-center border border-[#61728F]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKeyboardMove(false)}
                    aria-label="Done moving window"
                    className="p-1 text-[9px] cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31]"
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerNudge(24, 0)}
                    aria-label={`Move ${windowState.title} right`}
                    className="p-1.5 bg-[#1B284A] hover:bg-[#2858FF] text-[#E8F0FF] flex justify-center border border-[#61728F]"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div />
                  <button
                    type="button"
                    onClick={() => triggerNudge(0, 24)}
                    aria-label={`Move ${windowState.title} down`}
                    className="p-1.5 bg-[#1B284A] hover:bg-[#2858FF] text-[#E8F0FF] flex justify-center border border-[#61728F]"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <div />
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onMinimize(windowState.id)}
            aria-label={`Minimize ${windowState.title}`}
            title="Minimize"
            className="p-1 bg-[#111A31] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31] border border-[#E8F0FF]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onToggleMaximize(windowState.id)}
            aria-label={
              windowState.isMaximized
                ? `Restore ${windowState.title}`
                : `Expand ${windowState.title}`
            }
            title={windowState.isMaximized ? 'Restore' : 'Expand'}
            className="p-1 bg-[#111A31] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31] border border-[#E8F0FF]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
          >
            {windowState.isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onClose(windowState.id)}
            aria-label={`Close ${windowState.title}`}
            title="Close"
            className="p-1 bg-[#FC5FA9] text-[#111A31] hover:bg-[#E4FF58] border border-[#111A31] transition-colors focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 bg-[#111A31] text-[#E8F0FF]">
        {children}
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/lib/os/actions.ts">
<![CDATA[import { ActionDefinition, PixelIconId } from './types';

export const PIXEL_ICON_OPTIONS: { id: PixelIconId; label: string }[] = [
  { id: 'record', label: 'Record Dot' },
  { id: 'mic', label: 'Studio Mic' },
  { id: 'notes', label: 'Scratchpad' },
  { id: 'scene', label: 'Scene Switch' },
  { id: 'color', label: 'Color Grade' },
  { id: 'focus', label: 'Focus Shield' },
  { id: 'timer', label: 'Chrono Timer' },
  { id: 'marker', label: 'Flag Marker' },
  { id: 'render', label: 'Render Queue' },
  { id: 'split', label: 'Razor Split' },
  { id: 'lut', label: 'LUT Matrix' },
  { id: 'keyframe', label: 'Keyframe Diamond' },
  { id: 'audio-duck', label: 'Audio Ducking' },
  { id: 'brb', label: 'Standby Slate' },
  { id: 'chat-mark', label: 'Stream Bookmark' },
  { id: 'lower-third', label: 'Lower Third' },
  { id: 'cam-zoom', label: 'Optic Zoom' },
  { id: 'stream-clip', label: 'Instant Clip' },
  { id: 'pomodoro', label: 'Sprint Block' },
  { id: 'window-tidy', label: 'Tile Windows' },
  { id: 'daily-log', label: 'Status Stamp' },
  { id: 'calc-macro', label: 'Batch Macro' },
  { id: 'folder-jump', label: 'Asset Vault' },
  { id: 'ambient-synth', label: 'Synth Pad' },
  { id: 'dice-prompt', label: 'Idea Spark' },
  { id: 'coffee-break', label: 'Steep Break' },
];

export const ACTION_LIBRARY: ActionDefinition[] = [
  // CORE SIGNATURE ACTIONS FROM SPEC
  {
    id: 'start-record',
    title: 'START RECORD',
    shortLabel: 'START REC',
    category: 'STREAM',
    icon: 'record',
    accentColor: 'magenta',
    description: 'Toggle the simulated studio recording transport indicator and log a timestamped session event.',
    simulatedOutcome: 'Toggles fake recording status chip inside CTRL/ROOM OS and logs transport state.',
    realWorldMapping: 'On a real Stream Deck MK.2, a single LCD key can trigger capture start/stop in supported recording software.',
  },
  {
    id: 'mute-mic',
    title: 'MUTE MIC',
    shortLabel: 'MUTE MIC',
    category: 'STREAM',
    icon: 'mic',
    accentColor: 'voltage',
    description: 'Toggle a demo-only microphone mute indicator with instant visual status feedback on the key face.',
    simulatedOutcome: 'Toggles internal demo microphone badge (does not access your hardware microphone).',
    realWorldMapping: 'Hardware LCD keys update their icon state dynamically so you always know if your audio channel is live.',
  },
  {
    id: 'open-notes',
    title: 'OPEN NOTES',
    shortLabel: 'OPEN NOTES',
    category: 'ORGANIZE',
    icon: 'notes',
    accentColor: 'cobalt',
    description: 'Launch and focus the internal CTRL/ROOM scratchpad window to jot down session ideas or timestamps.',
    simulatedOutcome: 'Opens or brings forward the internal fictional NOTES application window.',
    realWorldMapping: 'Physical keys can launch daily scratchpads, documents, or multi-step workspace routines in one press.',
  },
  {
    id: 'next-scene',
    title: 'NEXT SCENE',
    shortLabel: 'NEXT SCENE',
    category: 'STREAM',
    icon: 'scene',
    accentColor: 'cobalt',
    description: 'Cycle the on-page broadcast monitor between Wide Desk, Code Closeup, Overhead Rig, and Standby views.',
    simulatedOutcome: 'Switches the simulated broadcast preview frame inside Deck Lab (no OBS connection).',
    realWorldMapping: 'Streamers use dedicated 5x3 grid keys to switch camera angles and broadcast scenes without alt-tabbing.',
  },
  {
    id: 'color-grade',
    title: 'COLOR GRADE',
    shortLabel: 'COLOR GRADE',
    category: 'CREATE',
    icon: 'color',
    accentColor: 'magenta',
    description: 'Toggle illustrative color treatment presets (Neutral Rec.709, Cobalt Punch, Voltage Warm) in the studio preview.',
    simulatedOutcome: 'Cycles the mock video monitor color LUT inside the Deck Lab preview monitor.',
    realWorldMapping: 'Editors bind repetitive grading macros, node trees, and preview toggles to dedicated tactile keys.',
  },
  {
    id: 'focus-mode',
    title: 'FOCUS MODE',
    shortLabel: 'FOCUS MODE',
    category: 'ORGANIZE',
    icon: 'focus',
    accentColor: 'voltage',
    description: 'Simplify the internal CTRL/ROOM workspace by minimizing secondary windows and highlighting Deck Lab.',
    simulatedOutcome: 'Collapses background demo windows inside the site stage (does not touch your real OS).',
    realWorldMapping: 'Multi-Actions let one button dim lights, silence notifications, and arrange project windows.',
  },
  {
    id: 'launch-timer',
    title: 'LAUNCH TIMER',
    shortLabel: 'TIMER 15M',
    category: 'ORGANIZE',
    icon: 'timer',
    accentColor: 'voltage',
    description: 'Start, pause, or reset the built-in 15-minute creative sprint countdown timer on the desktop rail.',
    simulatedOutcome: 'Starts or pauses the internal countdown timer in the Deck Lab & status bar.',
    realWorldMapping: 'Keep countdowns, Pomodoro intervals, and break reminders visible right on your desk surface.',
  },

  // ADDITIONAL CREATE ACTIONS
  {
    id: 'drop-marker',
    title: 'DROP MARKER',
    shortLabel: 'ADD MARKER',
    category: 'CREATE',
    icon: 'marker',
    accentColor: 'voltage',
    description: 'Stamp a timeline edit marker onto the simulated NLE sequence bar for fast post-production review.',
    simulatedOutcome: 'Adds a visual cue pin onto the Deck Lab sequence scrubber.',
    realWorldMapping: 'Mark funny moments, audio flubs, or beat drops while recording or reviewing footage.',
  },
  {
    id: 'razor-split',
    title: 'RAZOR SPLIT',
    shortLabel: 'SPLIT CLIP',
    category: 'CREATE',
    icon: 'split',
    accentColor: 'cobalt',
    description: 'Simulate a playhead blade cut across active timeline tracks and log the edit point.',
    simulatedOutcome: 'Slices the simulated timeline segment at the current playhead marker.',
    realWorldMapping: 'Replace complex three-finger keyboard chords with a single labeled key press.',
  },
  {
    id: 'render-draft',
    title: 'RENDER DRAFT',
    shortLabel: 'EXPORT H264',
    category: 'CREATE',
    icon: 'render',
    accentColor: 'frost',
    description: 'Run a simulated fast-pass proxy export in the studio monitor and record completion in Run Log.',
    simulatedOutcome: 'Advances the demo render progress bar to 100% and logs proxy output.',
    realWorldMapping: 'Trigger export presets, media encoder queues, or project backups with zero menu diving.',
  },
  {
    id: 'keyframe-ease',
    title: 'KEYFRAME EASE',
    shortLabel: 'SMOOTH EASE',
    category: 'CREATE',
    icon: 'keyframe',
    accentColor: 'magenta',
    description: 'Apply a simulated cubic-bezier velocity curve to selected motion keyframes in the studio preview.',
    simulatedOutcome: 'Logs cubic-bezier(0.16, 1, 0.3, 1) curve application in Run Log.',
    realWorldMapping: 'Motion designers map easing scripts and layer alignments to a dedicated Studio profile.',
  },
  {
    id: 'lut-compare',
    title: 'A/B LUT CHECK',
    shortLabel: 'A/B BYPASS',
    category: 'CREATE',
    icon: 'lut',
    accentColor: 'ice',
    description: 'Quickly flip between graded and ungraded monitor states to verify skin tones and shadow contrast.',
    simulatedOutcome: 'Toggles color grade bypass in the simulated monitor and logs A/B check.',
    realWorldMapping: 'Instant visual verification during color sessions without moving the mouse cursor.',
  },
  {
    id: 'audio-duck',
    title: 'VOICE DUCKING',
    shortLabel: 'DUCK BGM -12',
    category: 'CREATE',
    icon: 'audio-duck',
    accentColor: 'cobalt',
    description: 'Dip simulated background music track by -12dB so voiceover commentary cuts through cleanly.',
    simulatedOutcome: 'Toggles the -12dB BGM ducking indicator in the Deck Lab monitor.',
    realWorldMapping: 'Balance background music and dialogue tracks on the fly during live edits or podcasts.',
  },

  // ADDITIONAL STREAM ACTIONS
  {
    id: 'standby-slate',
    title: 'STANDBY SLATE',
    shortLabel: 'BRB SLATE',
    category: 'STREAM',
    icon: 'brb',
    accentColor: 'magenta',
    description: 'Switch the simulated broadcast monitor immediately to the "Be Right Back" graphic intermission card.',
    simulatedOutcome: 'Sets the mock broadcast preview to the Standby Slate view.',
    realWorldMapping: 'Step away confidently knowing a single press switches scenes and mutes your mic.',
  },
  {
    id: 'lower-third',
    title: 'LOWER THIRD',
    shortLabel: 'NAME CARD',
    category: 'STREAM',
    icon: 'lower-third',
    accentColor: 'voltage',
    description: 'Animate an on-screen speaker title overlay across the bottom of the simulated broadcast monitor.',
    simulatedOutcome: 'Toggles the speaker chyrons overlay inside the Deck Lab preview monitor.',
    realWorldMapping: 'Trigger graphic overlays, guest introductions, and sponsor banners on cue.',
  },
  {
    id: 'cam-zoom',
    title: 'OPTIC PUNCH-IN',
    shortLabel: 'CAM 2X ZOOM',
    category: 'STREAM',
    icon: 'cam-zoom',
    accentColor: 'cobalt',
    description: 'Toggle a simulated 2x digital punch-in framing on the active studio camera preview.',
    simulatedOutcome: 'Toggles 1x / 2x framing scale inside the Deck Lab preview monitor.',
    realWorldMapping: 'Add comedic or instructional framing punch-ins during live product walkthroughs.',
  },
  {
    id: 'stream-clip',
    title: 'SAVE HIGHLIGHT',
    shortLabel: 'CLIP 30S',
    category: 'STREAM',
    icon: 'stream-clip',
    accentColor: 'frost',
    description: 'Log a simulated 30-second replay buffer capture and append the highlight timestamp to Run Log.',
    simulatedOutcome: 'Creates a timestamped highlight bookmark in Run Log and Notes.',
    realWorldMapping: 'Capture unforgettable live moments for social shorts without breaking concentration.',
  },
  {
    id: 'chat-marker',
    title: 'CHAPTER STAMP',
    shortLabel: 'VOD CHAPTER',
    category: 'STREAM',
    icon: 'chat-mark',
    accentColor: 'ice',
    description: 'Insert a clean chapter boundary in the simulated stream log for effortless VOD navigation.',
    simulatedOutcome: 'Appends a numbered VOD chapter marker to the Run Log.',
    realWorldMapping: 'Help viewers jump straight to Q&A, teardown, or demo segments in archived recordings.',
  },

  // ADDITIONAL ORGANIZE ACTIONS
  {
    id: 'window-tidy',
    title: 'CASCADE WINDOWS',
    shortLabel: 'TIDY DESK',
    category: 'ORGANIZE',
    icon: 'window-tidy',
    accentColor: 'cobalt',
    description: 'Neatly arrange open CTRL/ROOM OS windows into a balanced studio grid inside the desktop stage.',
    simulatedOutcome: 'Resets open CTRL/ROOM OS window positions to clean, non-overlapping coordinates.',
    realWorldMapping: 'Position code editors, reference browsers, and chat windows across monitors in one tap.',
  },
  {
    id: 'daily-log',
    title: 'STAMP STANDUP',
    shortLabel: 'DAILY STAMP',
    category: 'ORGANIZE',
    icon: 'daily-log',
    accentColor: 'frost',
    description: 'Insert a structured daily progress checklist template directly into the CTRL/ROOM Notes app.',
    simulatedOutcome: 'Appends a dated standup template to the internal Notes window and opens it.',
    realWorldMapping: 'Paste recurring text snippets, bug report templates, or release checklists effortlessly.',
  },
  {
    id: 'folder-jump',
    title: 'INSPECT HARDWARE',
    shortLabel: 'MK.2 SPECS',
    category: 'ORGANIZE',
    icon: 'folder-jump',
    accentColor: 'ice',
    description: 'Open and focus the Device Info application window to inspect verified Elgato Stream Deck MK.2 facts.',
    simulatedOutcome: 'Opens and brings the DEVICE INFO window to the front of CTRL/ROOM OS.',
    realWorldMapping: 'Jump directly to deep project directories, brand kits, or documentation hubs.',
  },
  {
    id: 'calc-macro',
    title: 'PROFILE AUDIT',
    shortLabel: 'AUDIT 15 KEYS',
    category: 'ORGANIZE',
    icon: 'calc-macro',
    accentColor: 'voltage',
    description: 'Count active key assignments across the 5x3 grid and print a diagnostic summary to Run Log.',
    simulatedOutcome: 'Logs a full 15-slot assignment breakdown to the Run Log window.',
    realWorldMapping: 'Chain multi-step verification scripts or build tasks into a single hardware key.',
  },

  // EXPLORE ACTIONS
  {
    id: 'dice-prompt',
    title: 'CREATIVE SPARK',
    shortLabel: 'IDEA SPARK',
    category: 'EXPLORE',
    icon: 'dice-prompt',
    accentColor: 'magenta',
    description: 'Generate a fresh production prompt or shortcut experiment inside the Deck Lab status banner.',
    simulatedOutcome: 'Cycles a curated creative workflow prompt in the Deck Lab monitor.',
    realWorldMapping: 'Trigger custom webhooks, local scripts, or creative Oblique Strategies prompts.',
  },
  {
    id: 'ambient-synth',
    title: 'SYNTH TEST TONE',
    shortLabel: 'BEEP TEST',
    category: 'EXPLORE',
    icon: 'ambient-synth',
    accentColor: 'voltage',
    description: 'Trigger a visual frequency pulse in the studio monitor (and optional synth tone if UI audio is enabled).',
    simulatedOutcome: 'Pulses the studio waveform visualizer and logs a 440Hz reference check.',
    realWorldMapping: 'Trigger soundboard stingers, studio reference tones, or MIDI notes.',
  },
  {
    id: 'coffee-break',
    title: 'STEEP TIMER 4M',
    shortLabel: 'TEA / COFFEE',
    category: 'EXPLORE',
    icon: 'coffee-break',
    accentColor: 'frost',
    description: 'Set the internal desktop countdown timer to a 4-minute pour-over / tea steeping interval.',
    simulatedOutcome: 'Sets internal demo countdown timer to 04:00 and starts ticking.',
    realWorldMapping: 'Even everyday desk rituals—from steeping tea to stretching—fit right on your control surface.',
  },
];

export const ACTION_BY_ID: Record<string, ActionDefinition> = Object.fromEntries(
  ACTION_LIBRARY.map((action) => [action.id, action])
);

export function getActionById(actionId: string): ActionDefinition {
  return ACTION_BY_ID[actionId] || ACTION_LIBRARY[0];
}
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/lib/os/presets.ts">
<![CDATA[import { DeckSlotConfig, ProfileDefinition, ProfileId } from './types';

export const CURATED_PROFILES: Record<ProfileId, ProfileDefinition> = {
  STUDIO: {
    id: 'STUDIO',
    name: 'STUDIO · POST & COLOR',
    tagline: 'Video editing, timeline cutting, LUT grading, and render macros.',
    description:
      'Designed for editors, colorists, and sound designers who want timeline markers, blade cuts, LUT comparisons, and proxy exports under five fingertips.',
    audience: 'Video Editors · Colorists · Sound Designers',
    slots: [
      { slotIndex: 0, actionId: 'start-record', customLabel: 'TRACK REC' },
      { slotIndex: 1, actionId: 'drop-marker', customLabel: 'ADD MARKER' },
      { slotIndex: 2, actionId: 'razor-split', customLabel: 'RAZOR CUT' },
      { slotIndex: 3, actionId: 'color-grade', customLabel: 'CYCLE LUT' },
      { slotIndex: 4, actionId: 'lut-compare', customLabel: 'A/B GRADE' },
      { slotIndex: 5, actionId: 'keyframe-ease', customLabel: 'EASE CURVE' },
      { slotIndex: 6, actionId: 'audio-duck', customLabel: 'DUCK -12DB' },
      { slotIndex: 7, actionId: 'render-draft', customLabel: 'RENDER H264' },
      { slotIndex: 8, actionId: 'next-scene', customLabel: 'MONITOR CAM' },
      { slotIndex: 9, actionId: 'cam-zoom', customLabel: '2X PUNCH' },
      { slotIndex: 10, actionId: 'open-notes', customLabel: 'EDIT NOTES' },
      { slotIndex: 11, actionId: 'launch-timer', customLabel: 'SPRINT 15M' },
      { slotIndex: 12, actionId: 'focus-mode', customLabel: 'SOLO DESK' },
      { slotIndex: 13, actionId: 'ambient-synth', customLabel: 'TONE 440HZ' },
      { slotIndex: 14, actionId: 'folder-jump', customLabel: 'MK.2 SPECS' },
    ],
  },
  LIVE: {
    id: 'LIVE',
    name: 'LIVE · BROADCAST CONTROL',
    tagline: 'Instant scene switching, mic control, overlays, and VOD markers.',
    description:
      'Built for live streamers, educators, and showrunners managing multi-camera scenes, lower-third graphics, audio mute states, and highlight clips on the fly.',
    audience: 'Livestreamers · Showrunners · Technical Producers',
    slots: [
      { slotIndex: 0, actionId: 'start-record', customLabel: 'GO LIVE' },
      { slotIndex: 1, actionId: 'mute-mic', customLabel: 'MUTE MIC' },
      { slotIndex: 2, actionId: 'next-scene', customLabel: 'NEXT SCENE' },
      { slotIndex: 3, actionId: 'standby-slate', customLabel: 'BRB SLATE' },
      { slotIndex: 4, actionId: 'lower-third', customLabel: 'NAME CARD' },
      { slotIndex: 5, actionId: 'cam-zoom', customLabel: 'CAM 2X' },
      { slotIndex: 6, actionId: 'audio-duck', customLabel: 'DUCK MUSIC' },
      { slotIndex: 7, actionId: 'stream-clip', customLabel: 'CLIP 30S' },
      { slotIndex: 8, actionId: 'chat-marker', customLabel: 'VOD STAMP' },
      { slotIndex: 9, actionId: 'color-grade', customLabel: 'CAM LOOK' },
      { slotIndex: 10, actionId: 'open-notes', customLabel: 'SHOW RUNNER' },
      { slotIndex: 11, actionId: 'launch-timer', customLabel: 'BREAK TIMER' },
      { slotIndex: 12, actionId: 'dice-prompt', customLabel: 'Q&A TOPIC' },
      { slotIndex: 13, actionId: 'window-tidy', customLabel: 'TIDY STAGE' },
      { slotIndex: 14, actionId: 'folder-jump', customLabel: 'MK.2 INFO' },
    ],
  },
  EVERYDAY: {
    id: 'EVERYDAY',
    name: 'EVERYDAY · DEEP WORK',
    tagline: 'Focus blocks, window tiling, quick scratchpads, and desk rituals.',
    description:
      'Stream Deck MK.2 is not just for broadcasts. Automate daily standup notes, deep-work timers, window layouts, and repetitive shortcut sequences.',
    audience: 'Designers · Developers · Productive Makers',
    slots: [
      { slotIndex: 0, actionId: 'focus-mode', customLabel: 'FOCUS MODE' },
      { slotIndex: 1, actionId: 'launch-timer', customLabel: 'TIMER 15M' },
      { slotIndex: 2, actionId: 'open-notes', customLabel: 'SCRATCHPAD' },
      { slotIndex: 3, actionId: 'daily-log', customLabel: 'DAILY STAMP' },
      { slotIndex: 4, actionId: 'window-tidy', customLabel: 'TILE DESK' },
      { slotIndex: 5, actionId: 'coffee-break', customLabel: 'STEEP 4M' },
      { slotIndex: 6, actionId: 'mute-mic', customLabel: 'CALL MUTE' },
      { slotIndex: 7, actionId: 'calc-macro', customLabel: 'DECK AUDIT' },
      { slotIndex: 8, actionId: 'dice-prompt', customLabel: 'IDEA SPARK' },
      { slotIndex: 9, actionId: 'folder-jump', customLabel: 'MK.2 SPECS' },
      { slotIndex: 10, actionId: 'drop-marker', customLabel: 'PIN TASK' },
      { slotIndex: 11, actionId: 'color-grade', customLabel: 'PREVIEW LUT' },
      { slotIndex: 12, actionId: 'next-scene', customLabel: 'DESK CAM' },
      { slotIndex: 13, actionId: 'ambient-synth', customLabel: 'CHIME TEST' },
      { slotIndex: 14, actionId: 'start-record', customLabel: 'VOICE MEMO' },
    ],
  },
};

export function cloneProfileSlots(profileId: ProfileId): DeckSlotConfig[] {
  const profile = CURATED_PROFILES[profileId];
  return profile.slots.map((slot) => ({ ...slot }));
}

export function isProfileModified(profileId: ProfileId, currentSlots: DeckSlotConfig[]): boolean {
  const defaultSlots = CURATED_PROFILES[profileId].slots;
  if (currentSlots.length !== defaultSlots.length) return true;
  for (let i = 0; i < defaultSlots.length; i++) {
    const curr = currentSlots[i];
    const def = defaultSlots[i];
    if (
      curr.actionId !== def.actionId ||
      (curr.customLabel || '') !== (def.customLabel || '') ||
      curr.customIcon !== def.customIcon ||
      curr.customAccent !== def.customAccent
    ) {
      return true;
    }
  }
  return false;
}
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/lib/os/simulator.ts">
<![CDATA[import { getActionById } from './actions';
import {
  BroadcastScene,
  ColorGradePreset,
  DeckSlotConfig,
  PixelIconId,
  RunLogEntry,
  SimulationEnvironmentState,
} from './types';

export const CREATIVE_PROMPTS = [
  'Map one key to close distractions and open your timeline.',
  'Bind a 3-key chord into a single labeled LCD icon.',
  'Use top-left Slot 01 for your most frequent transport trigger.',
  'Group camera scenes on Row 1 and audio controls on Row 2.',
  'Pair a 15-minute sprint timer with an automatic scratchpad stamp.',
];

export const SCENE_ORDER: BroadcastScene[] = [
  'WIDE_DESK',
  'CODE_CLOSEUP',
  'OVERHEAD_RIG',
  'STANDBY_SLATE',
];

export const COLOR_GRADE_ORDER: ColorGradePreset[] = [
  'NEUTRAL_REC709',
  'COBALT_PUNCH',
  'VOLTAGE_WARM',
];

export function createInitialSimulationState(): SimulationEnvironmentState {
  return {
    isRecording: false,
    recordingDurationSec: 0,
    isMicMuted: false,
    activeScene: 'WIDE_DESK',
    colorGradePreset: 'NEUTRAL_REC709',
    isFocusMode: false,
    timerSeconds: 15 * 60,
    timerRunning: false,
    audioDuckActive: false,
    lowerThirdVisible: true,
    camZoomLevel: 1,
    timelineMarkers: [18, 46, 72],
    renderProgress: 100,
    creativePrompt: CREATIVE_PROMPTS[0],
    notesContent:
      'CTRL/ROOM STUDIO SCRATCHPAD\n---------------------------\n- [x] Verify 5x3 LCD key matrix layout\n- [x] Test Broadcast Scene & LUT presets\n- [ ] Assign custom macro to Slot 05',
    lastTriggeredSlot: null,
  };
}

export function getSlotRowCol(slotIndex: number): { row: number; col: number } {
  const clamped = Math.max(0, Math.min(14, slotIndex));
  return {
    row: Math.floor(clamped / 5) + 1,
    col: (clamped % 5) + 1,
  };
}

export function formatTimestamp(date = new Date()): string {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export function assignActionToSlot(
  slots: DeckSlotConfig[],
  slotIndex: number,
  actionId: string
): DeckSlotConfig[] {
  const action = getActionById(actionId);
  return slots.map((slot) =>
    slot.slotIndex === slotIndex
      ? {
          slotIndex,
          actionId: action.id,
          customLabel: action.shortLabel,
          customIcon: undefined,
          customAccent: undefined,
        }
      : slot
  );
}

export function customizeSlot(
  slots: DeckSlotConfig[],
  slotIndex: number,
  updates: {
    customLabel?: string;
    customIcon?: PixelIconId;
    customAccent?: 'cobalt' | 'voltage' | 'magenta' | 'frost' | 'ice';
  }
): DeckSlotConfig[] {
  return slots.map((slot) =>
    slot.slotIndex === slotIndex
      ? {
          ...slot,
          ...updates,
        }
      : slot
  );
}

export interface SimulationExecutionResult {
  nextEnv: SimulationEnvironmentState;
  logEntry: RunLogEntry;
  sideEffect?: 'OPEN_NOTES' | 'OPEN_DEVICE_INFO' | 'TIDY_WINDOWS' | 'TOGGLE_FOCUS_MODE';
}

export function executeSlotSimulation(
  env: SimulationEnvironmentState,
  slot: DeckSlotConfig,
  now = new Date()
): SimulationExecutionResult {
  const action = getActionById(slot.actionId);
  const { row, col } = getSlotRowCol(slot.slotIndex);
  const displayLabel = slot.customLabel || action.shortLabel;
  const timestamp = formatTimestamp(now);
  const nextEnv: SimulationEnvironmentState = {
    ...env,
    lastTriggeredSlot: slot.slotIndex,
  };

  let statusText = 'SIMULATED OK';
  let detail = action.simulatedOutcome;
  let sideEffect: SimulationExecutionResult['sideEffect'] = undefined;

  switch (action.id) {
    case 'start-record': {
      nextEnv.isRecording = !env.isRecording;
      if (!nextEnv.isRecording) {
        nextEnv.recordingDurationSec = 0;
      }
      statusText = nextEnv.isRecording ? 'REC ACTIVE [DEMO]' : 'REC STOPPED [DEMO]';
      detail = nextEnv.isRecording
        ? 'Started simulated studio recording indicator in Deck Lab.'
        : 'Stopped simulated studio recording transport.';
      break;
    }

    case 'mute-mic': {
      nextEnv.isMicMuted = !env.isMicMuted;
      statusText = nextEnv.isMicMuted ? 'MIC MUTED [DEMO]' : 'MIC LIVE [DEMO]';
      detail = nextEnv.isMicMuted
        ? 'Demo-only microphone indicator set to MUTE (no hardware mic accessed).'
        : 'Demo-only microphone indicator returned to LIVE.';
      break;
    }

    case 'open-notes': {
      statusText = 'WINDOW FOCUSED';
      detail = 'Opened internal CTRL/ROOM Notes scratchpad window.';
      sideEffect = 'OPEN_NOTES';
      break;
    }

    case 'next-scene': {
      const idx = SCENE_ORDER.indexOf(env.activeScene);
      const nextScene = SCENE_ORDER[(idx + 1) % SCENE_ORDER.length];
      nextEnv.activeScene = nextScene;
      statusText = `SCENE -> ${nextScene}`;
      detail = `Switched on-page broadcast preview monitor to ${nextScene.replace('_', ' ')}.`;
      break;
    }

    case 'standby-slate': {
      nextEnv.activeScene = 'STANDBY_SLATE';
      statusText = 'SCENE -> STANDBY_SLATE';
      detail = 'Activated simulated Standby Intermission Slate in broadcast preview.';
      break;
    }

    case 'color-grade': {
      const idx = COLOR_GRADE_ORDER.indexOf(env.colorGradePreset);
      const nextGrade = COLOR_GRADE_ORDER[(idx + 1) % COLOR_GRADE_ORDER.length];
      nextEnv.colorGradePreset = nextGrade;
      statusText = `LUT -> ${nextGrade}`;
      detail = `Applied ${nextGrade.replace('_', ' ')} illustrative color treatment to studio preview.`;
      break;
    }

    case 'lut-compare': {
      nextEnv.colorGradePreset =
        env.colorGradePreset === 'NEUTRAL_REC709' ? 'COBALT_PUNCH' : 'NEUTRAL_REC709';
      statusText = `A/B -> ${nextEnv.colorGradePreset}`;
      detail = `Toggled A/B LUT comparison to ${nextEnv.colorGradePreset}.`;
      break;
    }

    case 'focus-mode': {
      nextEnv.isFocusMode = !env.isFocusMode;
      statusText = nextEnv.isFocusMode ? 'FOCUS ON [DEMO]' : 'FOCUS OFF [DEMO]';
      detail = nextEnv.isFocusMode
        ? 'Simplified CTRL/ROOM workspace to highlight Deck Lab.'
        : 'Restored secondary CTRL/ROOM desktop windows.';
      sideEffect = 'TOGGLE_FOCUS_MODE';
      break;
    }

    case 'launch-timer': {
      nextEnv.timerRunning = !env.timerRunning;
      if (nextEnv.timerSeconds <= 0) {
        nextEnv.timerSeconds = 15 * 60;
      }
      statusText = nextEnv.timerRunning ? 'TIMER RUNNING' : 'TIMER PAUSED';
      detail = nextEnv.timerRunning
        ? 'Started internal 15:00 countdown timer in browser simulator.'
        : 'Paused internal countdown timer.';
      break;
    }

    case 'coffee-break': {
      nextEnv.timerSeconds = 4 * 60;
      nextEnv.timerRunning = true;
      statusText = 'STEEP 04:00 START';
      detail = 'Set internal countdown timer to 04:00 break interval and started clock.';
      break;
    }

    case 'drop-marker': {
      const nextMarker = ((env.timelineMarkers[env.timelineMarkers.length - 1] || 15) + 17) % 94;
      nextEnv.timelineMarkers = [...env.timelineMarkers.slice(-5), Math.max(6, nextMarker)];
      statusText = `MARKER @ ${Math.max(6, nextMarker)}%`;
      detail = `Added timeline cue pin at sequence position ${Math.max(6, nextMarker)}%.`;
      break;
    }

    case 'razor-split': {
      statusText = 'CLIP SPLIT [DEMO]';
      detail = 'Executed simulated blade cut on active sequence track V1/A1.';
      break;
    }

    case 'render-draft': {
      nextEnv.renderProgress = env.renderProgress >= 100 ? 64 : 100;
      statusText = `PROXY ${nextEnv.renderProgress}%`;
      detail = 'Triggered simulated H.264 draft proxy export in studio monitor.';
      break;
    }

    case 'audio-duck': {
      nextEnv.audioDuckActive = !env.audioDuckActive;
      statusText = nextEnv.audioDuckActive ? 'BGM -12dB ON' : 'BGM 0dB NORM';
      detail = nextEnv.audioDuckActive
        ? 'Ducked simulated background audio track by -12dB for voice clarity.'
        : 'Restored simulated background audio track to unity gain.';
      break;
    }

    case 'lower-third': {
      nextEnv.lowerThirdVisible = !env.lowerThirdVisible;
      statusText = nextEnv.lowerThirdVisible ? 'CHYRON VISIBLE' : 'CHYRON HIDDEN';
      detail = nextEnv.lowerThirdVisible
        ? 'Displayed speaker lower-third overlay on broadcast preview.'
        : 'Hid speaker lower-third overlay on broadcast preview.';
      break;
    }

    case 'cam-zoom': {
      nextEnv.camZoomLevel = env.camZoomLevel === 1 ? 2 : 1;
      statusText = `OPTIC ${nextEnv.camZoomLevel}X`;
      detail = `Set simulated studio camera framing to ${nextEnv.camZoomLevel}x zoom.`;
      break;
    }

    case 'stream-clip': {
      const noteStamp = `\n[CLIP ${timestamp}] Saved 30s demo highlight from ${env.activeScene}`;
      nextEnv.notesContent = env.notesContent + noteStamp;
      statusText = 'CLIP LOGGED [30S]';
      detail = 'Appended simulated 30s highlight timestamp to Run Log and Scratchpad.';
      break;
    }

    case 'daily-log': {
      const standup = `\n\nDAILY STAMP (${timestamp}):\n- Shipped: 5x3 preset layout\n- Next: Color pass`;
      nextEnv.notesContent = env.notesContent + standup;
      statusText = 'NOTES UPDATED';
      detail = 'Inserted daily progress checklist into internal Notes window.';
      sideEffect = 'OPEN_NOTES';
      break;
    }

    case 'window-tidy': {
      statusText = 'DESKTOP TIDIED';
      detail = 'Arranged open CTRL/ROOM OS windows into clean studio positions.';
      sideEffect = 'TIDY_WINDOWS';
      break;
    }

    case 'folder-jump': {
      statusText = 'DEVICE INFO OPEN';
      detail = 'Brought Elgato Stream Deck MK.2 hardware specification window forward.';
      sideEffect = 'OPEN_DEVICE_INFO';
      break;
    }

    case 'dice-prompt': {
      const currentIdx = CREATIVE_PROMPTS.indexOf(env.creativePrompt);
      const nextPrompt = CREATIVE_PROMPTS[(currentIdx + 1) % CREATIVE_PROMPTS.length];
      nextEnv.creativePrompt = nextPrompt;
      statusText = 'NEW PROMPT';
      detail = `Prompt: "${nextPrompt}"`;
      break;
    }

    default: {
      statusText = 'MACRO EXECUTED';
      detail = action.simulatedOutcome;
      break;
    }
  }

  const logEntry: RunLogEntry = {
    id: `log-${now.getTime()}-${slot.slotIndex}`,
    timestamp,
    slotIndex: slot.slotIndex,
    row,
    col,
    actionId: action.id,
    label: displayLabel,
    category: action.category,
    statusText,
    detail,
  };

  return {
    nextEnv,
    logEntry,
    sideEffect,
  };
}
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/lib/os/sound.ts">
<![CDATA[// Optional original UI sound synthesizer using Web Audio API.
// Strictly opt-in (disabled by default) per Section 6 & Section 9 of specification.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = false;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
    if (next && typeof window !== 'undefined' && !this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playKeyClick(freq = 520): void {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, this.ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.055);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore audio context restrictions
    }
  }

  public playProfileScan(): void {
    if (!this.enabled || !this.ctx) return;
    [330, 440, 587, 659].forEach((f, idx) => {
      setTimeout(() => this.playKeyClick(f), idx * 45);
    });
  }
}

export const soundEngine = new SoundEngine();
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/lib/os/storage.ts">
<![CDATA[import { cloneProfileSlots } from './presets';
import { DeckSlotConfig, ProfileId } from './types';

const STORAGE_KEY = 'ctrl_room_os_demo_state_v1';

export interface StoredDemoState {
  activeProfile: ProfileId;
  profiles: Record<ProfileId, DeckSlotConfig[]>;
  notesContent: string;
  savedAt: string;
}

export function createDefaultProfilesState(): Record<ProfileId, DeckSlotConfig[]> {
  return {
    STUDIO: cloneProfileSlots('STUDIO'),
    LIVE: cloneProfileSlots('LIVE'),
    EVERYDAY: cloneProfileSlots('EVERYDAY'),
  };
}

export function loadDemoStateFromStorage(): StoredDemoState | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredDemoState;
    if (
      !parsed ||
      !parsed.activeProfile ||
      !parsed.profiles ||
      !Array.isArray(parsed.profiles.STUDIO) ||
      parsed.profiles.STUDIO.length !== 15
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveDemoStateToStorage(state: Omit<StoredDemoState, 'savedAt'>): string {
  const timestamp = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const payload: StoredDemoState = {
        ...state,
        savedAt: timestamp,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore quota errors in restricted sandboxes
    }
  }
  return timestamp;
}

export function clearDemoStorage(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage access errors
    }
  }
}
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/lib/os/types.ts">
<![CDATA[export type AppId =
  | 'deck-lab'
  | 'action-library'
  | 'run-log'
  | 'profile-switcher'
  | 'device-info'
  | 'about-concept'
  | 'notes';

export type ActionCategory = 'CREATE' | 'STREAM' | 'ORGANIZE' | 'EXPLORE';

export type ProfileId = 'STUDIO' | 'LIVE' | 'EVERYDAY';

export type PixelIconId =
  | 'record'
  | 'mic'
  | 'notes'
  | 'scene'
  | 'color'
  | 'focus'
  | 'timer'
  | 'marker'
  | 'render'
  | 'split'
  | 'lut'
  | 'keyframe'
  | 'audio-duck'
  | 'brb'
  | 'chat-mark'
  | 'lower-third'
  | 'cam-zoom'
  | 'stream-clip'
  | 'pomodoro'
  | 'window-tidy'
  | 'daily-log'
  | 'calc-macro'
  | 'folder-jump'
  | 'ambient-synth'
  | 'dice-prompt'
  | 'coffee-break';

export interface ActionDefinition {
  id: string;
  title: string;
  shortLabel: string;
  category: ActionCategory;
  icon: PixelIconId;
  accentColor: 'cobalt' | 'voltage' | 'magenta' | 'frost' | 'ice';
  description: string;
  simulatedOutcome: string;
  realWorldMapping: string;
}

export interface DeckSlotConfig {
  slotIndex: number; // 0..14 (5 cols x 3 rows)
  actionId: string;
  customLabel?: string;
  customIcon?: PixelIconId;
  customAccent?: 'cobalt' | 'voltage' | 'magenta' | 'frost' | 'ice';
}

export interface ProfileDefinition {
  id: ProfileId;
  name: string;
  tagline: string;
  description: string;
  audience: string;
  slots: DeckSlotConfig[];
}

export interface RunLogEntry {
  id: string;
  timestamp: string;
  slotIndex: number;
  row: number;
  col: number;
  actionId: string;
  label: string;
  category: ActionCategory | 'SYSTEM';
  statusText: string;
  detail: string;
}

export type BroadcastScene = 'WIDE_DESK' | 'CODE_CLOSEUP' | 'OVERHEAD_RIG' | 'STANDBY_SLATE';
export type ColorGradePreset = 'NEUTRAL_REC709' | 'COBALT_PUNCH' | 'VOLTAGE_WARM';

export interface SimulationEnvironmentState {
  isRecording: boolean;
  recordingDurationSec: number;
  isMicMuted: boolean;
  activeScene: BroadcastScene;
  colorGradePreset: ColorGradePreset;
  isFocusMode: boolean;
  timerSeconds: number;
  timerRunning: boolean;
  audioDuckActive: boolean;
  lowerThirdVisible: boolean;
  camZoomLevel: 1 | 2;
  timelineMarkers: number[];
  renderProgress: number;
  creativePrompt: string;
  notesContent: string;
  lastTriggeredSlot: number | null;
}

export interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OSWindowState {
  id: AppId;
  title: string;
  subtitle: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  defaultPosition: WindowPosition;
}

export interface WindowManagerState {
  windows: Record<AppId, OSWindowState>;
  focusedApp: AppId | null;
  topZIndex: number;
  condensedMode: boolean;
}
]]>
    </file>
    <file path="src/app/(ctrlroom)/ctrlroom/lib/os/windowReducer.ts">
<![CDATA[import { AppId, OSWindowState, WindowManagerState, WindowPosition } from './types';

export const APP_CATALOG: {
  id: AppId;
  title: string;
  shortTitle: string;
  subtitle: string;
  defaultOpen: boolean;
  defaultPosition: WindowPosition;
}[] = [
  {
    id: 'deck-lab',
    title: 'DECK LAB — 15-KEY SIMULATOR',
    shortTitle: 'DECK LAB',
    subtitle: '5×3 Programmable Surface & Studio Preview',
    defaultOpen: true,
    defaultPosition: { x: 12, y: 12, width: 676, height: 590 },
  },
  {
    id: 'device-info',
    title: 'DEVICE INFO — STREAM DECK MK.2',
    shortTitle: 'DEVICE INFO',
    subtitle: 'Verified Hardware Specs & Photography',
    defaultOpen: true,
    defaultPosition: { x: 700, y: 12, width: 412, height: 590 },
  },
  {
    id: 'action-library',
    title: 'ACTION LIBRARY — SHORTCUT TILES',
    shortTitle: 'ACTION LIBRARY',
    subtitle: 'Browse & Patch 25+ Modular Actions',
    defaultOpen: false,
    defaultPosition: { x: 64, y: 36, width: 580, height: 500 },
  },
  {
    id: 'run-log',
    title: 'RUN LOG — EXECUTION MONITOR',
    shortTitle: 'RUN LOG',
    subtitle: 'Live Browser Demo Event Stream',
    defaultOpen: false,
    defaultPosition: { x: 580, y: 64, width: 490, height: 440 },
  },
  {
    id: 'profile-switcher',
    title: 'PROFILE SWITCHER — WORKSPACE PRESETS',
    shortTitle: 'PROFILES',
    subtitle: 'Swap STUDIO, LIVE & EVERYDAY Matrices',
    defaultOpen: false,
    defaultPosition: { x: 120, y: 52, width: 560, height: 460 },
  },
  {
    id: 'about-concept',
    title: 'ABOUT THIS CONCEPT — CTRL/ROOM OS',
    shortTitle: 'ABOUT CONCEPT',
    subtitle: 'Independence & Simulation Scope Disclosure',
    defaultOpen: false,
    defaultPosition: { x: 210, y: 70, width: 520, height: 430 },
  },
  {
    id: 'notes',
    title: 'NOTES — STUDIO SCRATCHPAD',
    shortTitle: 'NOTES',
    subtitle: 'Session Scratchpad & Macro Snippets',
    defaultOpen: false,
    defaultPosition: { x: 280, y: 88, width: 460, height: 400 },
  },
];

export function createInitialWindowManagerState(): WindowManagerState {
  const windows = {} as Record<AppId, OSWindowState>;
  let z = 10;

  for (const app of APP_CATALOG) {
    windows[app.id] = {
      id: app.id,
      title: app.title,
      subtitle: app.subtitle,
      isOpen: app.defaultOpen,
      isMinimized: false,
      isMaximized: false,
      zIndex: app.id === 'deck-lab' ? 25 : app.defaultOpen ? 20 : ++z,
      position: { ...app.defaultPosition },
      defaultPosition: { ...app.defaultPosition },
    };
  }

  return {
    windows,
    focusedApp: 'deck-lab',
    topZIndex: 25,
    condensedMode: false,
  };
}

export function clampWindowPosition(
  pos: WindowPosition,
  stageWidth = 1220,
  stageHeight = 640
): WindowPosition {
  const minVisibleWidth = Math.min(pos.width, Math.max(280, stageWidth - 24));
  const minVisibleHeight = Math.min(pos.height, Math.max(220, stageHeight - 24));

  const maxX = Math.max(0, stageWidth - minVisibleWidth);
  const maxY = Math.max(0, stageHeight - 56);

  return {
    x: Math.max(0, Math.min(Math.round(pos.x), maxX)),
    y: Math.max(0, Math.min(Math.round(pos.y), maxY)),
    width: pos.width,
    height: pos.height,
  };
}

export type WindowAction =
  | { type: 'OPEN_WINDOW'; appId: AppId }
  | { type: 'CLOSE_WINDOW'; appId: AppId }
  | { type: 'MINIMIZE_WINDOW'; appId: AppId }
  | { type: 'TOGGLE_MAXIMIZE_WINDOW'; appId: AppId }
  | { type: 'FOCUS_WINDOW'; appId: AppId }
  | {
      type: 'MOVE_WINDOW';
      appId: AppId;
      x: number;
      y: number;
      stageWidth?: number;
      stageHeight?: number;
    }
  | {
      type: 'NUDGE_WINDOW';
      appId: AppId;
      dx: number;
      dy: number;
      stageWidth?: number;
      stageHeight?: number;
    }
  | { type: 'TIDY_WINDOWS'; stageWidth?: number; stageHeight?: number }
  | { type: 'SOLO_FOCUS_MODE'; active: boolean }
  | { type: 'SET_CONDENSED_MODE'; condensed: boolean }
  | { type: 'RESET_WINDOWS' };

export function windowReducer(
  state: WindowManagerState,
  action: WindowAction
): WindowManagerState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const target = state.windows[action.appId];
      if (!target) return state;
      const nextZ = state.topZIndex + 1;
      return {
        ...state,
        condensedMode: false,
        focusedApp: action.appId,
        topZIndex: nextZ,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...target,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
          },
        },
      };
    }

    case 'CLOSE_WINDOW': {
      const target = state.windows[action.appId];
      if (!target) return state;
      const updatedWindows: Record<AppId, OSWindowState> = {
        ...state.windows,
        [action.appId]: {
          ...target,
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      };
      const remainingOpen = (Object.values(updatedWindows) as OSWindowState[])
        .filter((w) => w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);

      return {
        ...state,
        windows: updatedWindows,
        focusedApp: remainingOpen.length > 0 ? remainingOpen[0].id : null,
      };
    }

    case 'MINIMIZE_WINDOW': {
      const target = state.windows[action.appId];
      if (!target) return state;
      const updatedWindows: Record<AppId, OSWindowState> = {
        ...state.windows,
        [action.appId]: {
          ...target,
          isMinimized: true,
          isMaximized: false,
        },
      };
      const remainingOpen = (Object.values(updatedWindows) as OSWindowState[])
        .filter((w) => w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);

      return {
        ...state,
        windows: updatedWindows,
        focusedApp: remainingOpen.length > 0 ? remainingOpen[0].id : null,
      };
    }

    case 'TOGGLE_MAXIMIZE_WINDOW': {
      const target = state.windows[action.appId];
      if (!target) return state;
      const nextZ = state.topZIndex + 1;
      return {
        ...state,
        focusedApp: action.appId,
        topZIndex: nextZ,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...target,
            isOpen: true,
            isMinimized: false,
            isMaximized: !target.isMaximized,
            zIndex: nextZ,
          },
        },
      };
    }

    case 'FOCUS_WINDOW': {
      const target = state.windows[action.appId];
      if (!target || !target.isOpen) return state;
      if (state.focusedApp === action.appId && !target.isMinimized) {
        return state;
      }
      const nextZ = state.topZIndex + 1;
      return {
        ...state,
        focusedApp: action.appId,
        topZIndex: nextZ,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...target,
            isMinimized: false,
            zIndex: nextZ,
          },
        },
      };
    }

    case 'MOVE_WINDOW': {
      const target = state.windows[action.appId];
      if (!target) return state;
      const clamped = clampWindowPosition(
        {
          ...target.position,
          x: action.x,
          y: action.y,
        },
        action.stageWidth,
        action.stageHeight
      );
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...target,
            isMaximized: false,
            position: clamped,
          },
        },
      };
    }

    case 'NUDGE_WINDOW': {
      const target = state.windows[action.appId];
      if (!target) return state;
      const nextZ = state.topZIndex + 1;
      const clamped = clampWindowPosition(
        {
          ...target.position,
          x: target.position.x + action.dx,
          y: target.position.y + action.dy,
        },
        action.stageWidth,
        action.stageHeight
      );
      return {
        ...state,
        focusedApp: action.appId,
        topZIndex: nextZ,
        windows: {
          ...state.windows,
          [action.appId]: {
            ...target,
            isMaximized: false,
            zIndex: nextZ,
            position: clamped,
          },
        },
      };
    }

    case 'TIDY_WINDOWS': {
      const nextWindows = { ...state.windows };
      let nextZ = state.topZIndex;
      const openApps = (Object.values(nextWindows) as OSWindowState[]).filter(
        (w) => w.isOpen && !w.isMinimized
      );

      openApps.forEach((win, idx) => {
        nextZ += 1;
        const basePos = win.defaultPosition;
        const clamped = clampWindowPosition(
          {
            ...basePos,
            x: idx === 0 ? 16 : idx === 1 ? 756 : 64 + idx * 36,
            y: idx === 0 ? 16 : idx === 1 ? 16 : 36 + idx * 28,
          },
          action.stageWidth,
          action.stageHeight
        );
        nextWindows[win.id] = {
          ...win,
          isMaximized: false,
          position: clamped,
          zIndex: win.id === 'deck-lab' ? nextZ + 5 : nextZ,
        };
      });

      return {
        ...state,
        condensedMode: false,
        topZIndex: nextZ + 6,
        focusedApp: 'deck-lab',
        windows: nextWindows,
      };
    }

    case 'SOLO_FOCUS_MODE': {
      const nextWindows = { ...state.windows };
      const nextZ = state.topZIndex + 2;
      (Object.keys(nextWindows) as AppId[]).forEach((id) => {
        if (id === 'deck-lab') {
          nextWindows[id] = {
            ...nextWindows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
          };
        } else if (action.active && nextWindows[id].isOpen) {
          nextWindows[id] = {
            ...nextWindows[id],
            isMinimized: true,
          };
        } else if (!action.active && id === 'device-info') {
          nextWindows[id] = {
            ...nextWindows[id],
            isOpen: true,
            isMinimized: false,
          };
        }
      });
      return {
        ...state,
        focusedApp: 'deck-lab',
        topZIndex: nextZ,
        windows: nextWindows,
      };
    }

    case 'SET_CONDENSED_MODE': {
      return {
        ...state,
        condensedMode: action.condensed,
      };
    }

    case 'RESET_WINDOWS': {
      return createInitialWindowManagerState();
    }

    default:
      return state;
  }
}
]]>
    </file>
  </files>
</template>
