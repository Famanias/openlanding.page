import { getActionById } from './actions';
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
