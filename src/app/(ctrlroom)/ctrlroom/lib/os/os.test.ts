import { describe, it, expect } from 'vitest';
import {
  createInitialWindowManagerState,
  windowReducer,
  clampWindowPosition,
} from './windowReducer';
import {
  cloneProfileSlots,
  isProfileModified,
  CURATED_PROFILES,
} from './presets';
import {
  assignActionToSlot,
  customizeSlot,
  createInitialSimulationState,
  executeSlotSimulation,
  getSlotRowCol,
} from './simulator';
import { ACTION_LIBRARY } from './actions';

describe('CTRL/ROOM OS Simulator Logic', () => {
  it('Initial window state pre-opens DECK LAB and DEVICE INFO with DECK LAB focused', () => {
    const state = createInitialWindowManagerState();
    expect(state.windows['deck-lab'].isOpen).toBe(true);
    expect(state.windows['device-info'].isOpen).toBe(true);
    expect(state.windows['action-library'].isOpen).toBe(false);
    expect(state.focusedApp).toBe('deck-lab');
    expect(state.windows['deck-lab'].zIndex).toBeGreaterThan(state.windows['device-info'].zIndex);
  });

  it('Window manager open, minimize, maximize, close, and viewport clamping work accurately', () => {
    let state = createInitialWindowManagerState();

    // Open Action Library
    state = windowReducer(state, { type: 'OPEN_WINDOW', appId: 'action-library' });
    expect(state.windows['action-library'].isOpen).toBe(true);
    expect(state.focusedApp).toBe('action-library');

    // Minimize Action Library -> focus falls back to next highest open window (deck-lab)
    state = windowReducer(state, { type: 'MINIMIZE_WINDOW', appId: 'action-library' });
    expect(state.windows['action-library'].isMinimized).toBe(true);
    expect(state.focusedApp).toBe('deck-lab');

    // Move window out of bounds -> clamps within stage bounds so never stranded offscreen
    state = windowReducer(state, {
      type: 'MOVE_WINDOW',
      appId: 'deck-lab',
      x: -500,
      y: 9999,
      stageWidth: 1200,
      stageHeight: 620,
    });
    expect(state.windows['deck-lab'].position.x).toBe(0);
    expect(state.windows['deck-lab'].position.y).toBeLessThanOrEqual(620 - 56);

    // Close Deck Lab -> focus switches to device-info
    state = windowReducer(state, { type: 'CLOSE_WINDOW', appId: 'deck-lab' });
    expect(state.windows['deck-lab'].isOpen).toBe(false);
    expect(state.focusedApp).toBe('device-info');
  });

  it('All curated profiles have 15 slots (5 columns x 3 rows) and detect user edits', () => {
    for (const profileId of ['STUDIO', 'LIVE', 'EVERYDAY'] as const) {
      const slots = cloneProfileSlots(profileId);
      expect(slots).toHaveLength(15);
      expect(isProfileModified(profileId, slots)).toBe(false);

      const updated = assignActionToSlot(slots, 4, 'coffee-break');
      expect(updated[4].actionId).toBe('coffee-break');
      expect(isProfileModified(profileId, updated)).toBe(true);

      const renamed = customizeSlot(updated, 4, {
        customLabel: 'MY TEA',
        customIcon: 'coffee-break',
        customAccent: 'voltage',
      });
      expect(renamed[4].customLabel).toBe('MY TEA');
      expect(renamed[4].customAccent).toBe('voltage');
    }

    // Verify 5x3 coordinate math
    expect(getSlotRowCol(0)).toEqual({ row: 1, col: 1 });
    expect(getSlotRowCol(4)).toEqual({ row: 1, col: 5 });
    expect(getSlotRowCol(5)).toEqual({ row: 2, col: 1 });
    expect(getSlotRowCol(14)).toEqual({ row: 3, col: 5 });
  });

  it('Simulated key actions deterministically update environment and append Run Log entries', () => {
    expect(ACTION_LIBRARY.length).toBeGreaterThanOrEqual(20);

    let env = createInitialSimulationState();
    expect(env.isRecording).toBe(false);
    expect(env.isMicMuted).toBe(false);

    // Trigger START RECORD
    const recResult = executeSlotSimulation(env, {
      slotIndex: 0,
      actionId: 'start-record',
      customLabel: 'START REC',
    });
    env = recResult.nextEnv;
    expect(env.isRecording).toBe(true);
    expect(recResult.logEntry.row).toBe(1);
    expect(recResult.logEntry.col).toBe(1);
    expect(recResult.logEntry.statusText).toContain('REC ACTIVE');

    // Trigger MUTE MIC
    const micResult = executeSlotSimulation(env, {
      slotIndex: 1,
      actionId: 'mute-mic',
    });
    env = micResult.nextEnv;
    expect(env.isMicMuted).toBe(true);

    // Trigger NEXT SCENE
    const sceneResult = executeSlotSimulation(env, {
      slotIndex: 2,
      actionId: 'next-scene',
    });
    env = sceneResult.nextEnv;
    expect(env.activeScene).toBe('CODE_CLOSEUP');

    // Trigger COLOR GRADE
    const gradeResult = executeSlotSimulation(env, {
      slotIndex: 3,
      actionId: 'color-grade',
    });
    env = gradeResult.nextEnv;
    expect(env.colorGradePreset).toBe('COBALT_PUNCH');

    // Trigger OPEN NOTES side effect
    const notesResult = executeSlotSimulation(env, {
      slotIndex: 10,
      actionId: 'open-notes',
    });
    expect(notesResult.sideEffect).toBe('OPEN_NOTES');

    // Check clampWindowPosition directly
    const clamped = clampWindowPosition({ x: 2000, y: 2000, width: 400, height: 300 }, 1000, 600);
    expect(clamped.x).toBe(600);
    expect(clamped.y).toBe(544);
    expect(CURATED_PROFILES.STUDIO.slots).toHaveLength(15);
  });
});
