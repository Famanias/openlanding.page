import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  DEFAULT_FLOOR_PLAN,
  ROOM_PRESETS,
  normalizeFloorPlanData,
  type FurniturePiece,
} from './floorPlan';
import {
  calculateRoomMetrics,
  doPiecesOverlap,
  formatConfigurationSummary,
  formatGridCoordinate,
  getFootprint,
  rotatePieceWithKick,
  validatePlacement,
} from './collision';

test('getFootprint swaps width and height at 90 and 270 degrees', () => {
  const sofa: FurniturePiece = {
    id: 'sofa',
    label: 'Modular sofa',
    widthCells: 3,
    heightCells: 2,
    x: 3,
    y: 2,
    rotation: 0,
    fill: '#B5C8DA',
  };

  assert.deepEqual(getFootprint({ ...sofa, rotation: 0 }), { w: 3, h: 2 });
  assert.deepEqual(getFootprint({ ...sofa, rotation: 90 }), { w: 2, h: 3 });
  assert.deepEqual(getFootprint({ ...sofa, rotation: 180 }), { w: 3, h: 2 });
  assert.deepEqual(getFootprint({ ...sofa, rotation: 270 }), { w: 2, h: 3 });
});

test('all default and preset room layouts have valid non-colliding placements', () => {
  for (const preset of ROOM_PRESETS) {
    for (const piece of preset.modules) {
      const validation = validatePlacement(piece, preset.modules, DEFAULT_FLOOR_PLAN);
      assert.equal(
        validation.valid,
        true,
        `Preset "${preset.name}" piece "${piece.id}" failed validation: ${validation.detail}`
      );
    }
  }
});

test('validatePlacement rejects out-of-bounds, blocked cells, and module overlaps', () => {
  const modules = DEFAULT_FLOOR_PLAN.modules;
  const sofa = modules.find((m) => m.id === 'sofa')!;

  // 1. Out of bounds (left wall)
  const outLeft = validatePlacement({ ...sofa, x: -1, y: 2 }, modules, DEFAULT_FLOOR_PLAN);
  assert.equal(outLeft.valid, false);
  assert.equal(outLeft.reason, 'out-of-bounds');

  // 2. Out of bounds (right wall: x=10 with width=3 exceeds 12 columns)
  const outRight = validatePlacement({ ...sofa, x: 10, y: 2 }, modules, DEFAULT_FLOOR_PLAN);
  assert.equal(outRight.valid, false);
  assert.equal(outRight.reason, 'out-of-bounds');

  // 3. Blocked cell (entry clearance at x:0, y:6)
  const onEntry = validatePlacement({ ...sofa, x: 0, y: 5 }, modules, DEFAULT_FLOOR_PLAN);
  assert.equal(onEntry.valid, false);
  assert.equal(onEntry.reason, 'blocked-cell');

  // 4. Overlap with side table at x:7, y:2
  const onTable = validatePlacement({ ...sofa, x: 5, y: 2 }, modules, DEFAULT_FLOOR_PLAN);
  assert.equal(onTable.valid, false);
  assert.equal(onTable.reason, 'module-overlap');
  assert.equal(onTable.collidingModuleId, 'table');
});

test('rotatePieceWithKick rotates shelf near right perimeter wall by kicking inward', () => {
  const modules = DEFAULT_FLOOR_PLAN.modules;
  const shelf = modules.find((m) => m.id === 'shelf')!; // at x:11, y:1, 1x3 -> rotating to 3x1 needs kick to x:9

  const { result, piece } = rotatePieceWithKick(shelf, modules, DEFAULT_FLOOR_PLAN);
  assert.equal(result.valid, true);
  assert.equal(piece.rotation, 90);
  assert.equal(piece.x, 9);
  assert.equal(piece.y, 1);
});

test('normalizeFloorPlanData preserves canonical 4-module JSON and adds lamp', () => {
  const rawJson = {
    grid: { columns: 12, rows: 8, cellSize: 48, originX: 96, originY: 100 },
    blockedCells: [{ x: 9, y: 0, reason: 'fixed service fixture' }],
    modules: DEFAULT_FLOOR_PLAN.modules.slice(0, 4),
  };

  const normalized = normalizeFloorPlanData(rawJson);
  assert.equal(normalized.modules.length, 5);
  assert.equal(normalized.modules.some((m) => m.id === 'lamp'), true);
});

test('calculateRoomMetrics and formatConfigurationSummary produce accurate telemetry', () => {
  const metrics = calculateRoomMetrics(DEFAULT_FLOOR_PLAN.modules, DEFAULT_FLOOR_PLAN);
  assert.equal(metrics.totalCells, 96);
  assert.equal(metrics.blockedCount, 6);
  // sofa(6) + chair(4) + table(1) + shelf(3) + lamp(1) = 15
  assert.equal(metrics.occupiedCount, 15);
  assert.equal(metrics.openCount, 75);
  assert.equal(formatGridCoordinate(3, 2), '04 · C');

  const summary = formatConfigurationSummary(DEFAULT_FLOOR_PLAN.modules, DEFAULT_FLOOR_PLAN);
  assert.equal(summary.includes('HOLLOWAY — ARCHITECTURAL ROOM SCHEDULE'), true);
  assert.equal(summary.includes('SOFA'), true);
  assert.equal(doPiecesOverlap(DEFAULT_FLOOR_PLAN.modules[0], DEFAULT_FLOOR_PLAN.modules[1]), false);
});
