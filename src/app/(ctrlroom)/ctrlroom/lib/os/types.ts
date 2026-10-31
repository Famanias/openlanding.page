export type AppId =
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
