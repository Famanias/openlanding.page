import { AppId, OSWindowState, WindowManagerState, WindowPosition } from './types';

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
