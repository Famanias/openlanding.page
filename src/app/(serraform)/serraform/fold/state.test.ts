import { test } from 'vitest';
import assert from 'node:assert/strict';
import { DEFAULT_DESIGN, DEFAULT_VIEW } from './config';
import {
  createInitialFoldState,
  foldReducer,
  getEffectiveOpening,
  viewPresetFromAngles,
} from './state';

test('manual design or view input enters manual mode and preserves story opening', () => {
  let state = createInitialFoldState(true);
  assert.equal(state.mode, 'story');
  assert.equal(getEffectiveOpening(state, 82), 82);

  state = foldReducer(state, {
    type: 'SET_BASE_HEX',
    hex: '#32AA77',
    currentOpening: 82,
  });
  assert.equal(state.mode, 'manual');
  assert.equal(state.design.baseHex, '#32AA77');
  assert.equal(state.design.opening, 82);
  assert.equal(getEffectiveOpening(state, 12), 82);
});

test('follow story preserves custom design colors, print, and motif scale', () => {
  let state = createInitialFoldState(true);
  state = foldReducer(state, { type: 'SET_BASE_HEX', hex: '#32AA77', currentOpening: 75 });
  state = foldReducer(state, { type: 'SET_DESIGN_HEX', hex: '#FFFCF8' });
  state = foldReducer(state, { type: 'SET_PRINT', print: 'landscape' });
  state = foldReducer(state, { type: 'SET_MOTIF_SCALE', motifScale: 125 });

  state = foldReducer(state, { type: 'FOLLOW_STORY' });
  assert.equal(state.mode, 'story');
  assert.equal(state.design.baseHex, '#32AA77');
  assert.equal(state.design.designHex, '#FFFCF8');
  assert.equal(state.design.print, 'landscape');
  assert.equal(state.design.motifScale, 125);
});

test('reset semantics: Reset view, Reset shape, and Reset design remain independent', () => {
  let state = createInitialFoldState(false);
  state = foldReducer(state, { type: 'SET_OPENING', opening: 75 });
  state = foldReducer(state, { type: 'SET_BASE_HEX', hex: '#32AA77' });
  state = foldReducer(state, { type: 'SET_DESIGN_HEX', hex: '#112233' });
  state = foldReducer(state, { type: 'SET_PRINT', print: 'landscape' });
  state = foldReducer(state, { type: 'SET_MOTIF_SCALE', motifScale: 125 });
  state = foldReducer(state, { type: 'SET_VIEW_ANGLES', yawDeg: 185, elevationDeg: 26 });

  // Reset view alters camera only
  const afterViewReset = foldReducer(state, { type: 'RESET_VIEW' });
  assert.deepEqual(afterViewReset.view, DEFAULT_VIEW);
  assert.equal(afterViewReset.design.opening, 75);
  assert.equal(afterViewReset.design.print, 'landscape');
  assert.equal(afterViewReset.design.baseHex, '#32AA77');

  // Reset shape alters opening only
  const afterShapeReset = foldReducer(state, { type: 'RESET_SHAPE' });
  assert.equal(afterShapeReset.design.opening, 50);
  assert.equal(afterShapeReset.design.print, 'landscape');
  assert.equal(afterShapeReset.design.baseHex, '#32AA77');
  assert.deepEqual(afterShapeReset.view, { yawDeg: 185, elevationDeg: 26 });

  // Reset design restores default colors/print/scale without altering opening or camera
  const afterDesignReset = foldReducer(state, { type: 'RESET_DESIGN' });
  assert.equal(afterDesignReset.design.opening, 75);
  assert.equal(afterDesignReset.design.baseHex, DEFAULT_DESIGN.baseHex);
  assert.equal(afterDesignReset.design.designHex, DEFAULT_DESIGN.designHex);
  assert.equal(afterDesignReset.design.print, DEFAULT_DESIGN.print);
  assert.equal(afterDesignReset.design.motifScale, DEFAULT_DESIGN.motifScale);
  assert.deepEqual(afterDesignReset.view, { yawDeg: 185, elevationDeg: 26 });
});

test('camera angle presets match within tolerance and un-press after free rotation', () => {
  assert.equal(viewPresetFromAngles({ yawDeg: 0, elevationDeg: 6 }), 'front');
  assert.equal(viewPresetFromAngles({ yawDeg: 34, elevationDeg: 20 }), 'quarter');
  assert.equal(viewPresetFromAngles({ yawDeg: 84, elevationDeg: 9 }), 'side');
  assert.equal(viewPresetFromAngles({ yawDeg: 180, elevationDeg: 14 }), 'back');
  assert.equal(viewPresetFromAngles({ yawDeg: 49, elevationDeg: 20 }), null);

  let state = createInitialFoldState(false);
  state = foldReducer(state, { type: 'SET_VIEW_PRESET', viewId: 'front' });
  assert.equal(viewPresetFromAngles(state.view), 'front');

  state = foldReducer(state, { type: 'ROTATE_VIEW_STEP', deltaYawDeg: -15 });
  assert.equal(state.view.yawDeg, 345);
  assert.equal(viewPresetFromAngles(state.view), null);

  state = foldReducer(state, { type: 'SET_VIEW_ANGLES', yawDeg: 180, elevationDeg: 90 });
  assert.equal(state.view.elevationDeg, 30);
  state = foldReducer(state, { type: 'SET_VIEW_ANGLES', yawDeg: 180, elevationDeg: -20 });
  assert.equal(state.view.elevationDeg, 5);
});
