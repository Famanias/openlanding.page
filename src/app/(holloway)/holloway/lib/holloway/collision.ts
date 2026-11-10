import type { BlockedCell, FloorPlanData, FurniturePiece } from './floorPlan';

export interface Footprint {
  w: number;
  h: number;
}

export type PlacementRejectionReason =
  | 'out-of-bounds'
  | 'blocked-cell'
  | 'module-overlap';

export interface PlacementValidationResult {
  valid: boolean;
  reason?: PlacementRejectionReason;
  detail?: string;
  collidingCells?: { x: number; y: number }[];
  collidingModuleId?: string;
}

export interface RoomMetrics {
  totalCells: number;
  blockedCount: number;
  occupiedCount: number;
  openCount: number;
  openPercentage: number;
}

/**
 * Computes axis-aligned cell footprint after rotation (0/180 vs 90/270).
 */
export function getFootprint(piece: Pick<FurniturePiece, 'widthCells' | 'heightCells' | 'rotation'>): Footprint {
  const normalizedRotation = ((piece.rotation % 360) + 360) % 360;
  return normalizedRotation % 180 === 0
    ? { w: piece.widthCells, h: piece.heightCells }
    : { w: piece.heightCells, h: piece.widthCells };
}

/**
 * Returns all grid cells covered by a furniture piece.
 */
export function getOccupiedCells(piece: FurniturePiece): { x: number; y: number }[] {
  const { w, h } = getFootprint(piece);
  const cells: { x: number; y: number }[] = [];
  for (let y = piece.y; y < piece.y + h; y++) {
    for (let x = piece.x; x < piece.x + w; x++) {
      cells.push({ x, y });
    }
  }
  return cells;
}

/**
 * Checks whether two furniture pieces overlap in grid space.
 */
export function doPiecesOverlap(a: FurniturePiece, b: FurniturePiece): boolean {
  const A = getFootprint(a);
  const B = getFootprint(b);
  return (
    a.x < b.x + B.w &&
    a.x + A.w > b.x &&
    a.y < b.y + B.h &&
    a.y + A.h > b.y
  );
}

/**
 * Checks whether a single cell is reserved/blocked in the floor plan.
 */
export function getBlockedCellAt(
  x: number,
  y: number,
  blockedCells: BlockedCell[]
): BlockedCell | undefined {
  return blockedCells.find((cell) => cell.x === x && cell.y === y);
}

/**
 * Validates whether a candidate piece placement is legal within the floor plan.
 */
export function validatePlacement(
  candidate: FurniturePiece,
  allModules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): PlacementValidationResult {
  const { w, h } = getFootprint(candidate);
  const { columns, rows } = plan.grid;

  // 1. Check grid bounds
  if (
    candidate.x < 0 ||
    candidate.y < 0 ||
    candidate.x + w > columns ||
    candidate.y + h > rows
  ) {
    return {
      valid: false,
      reason: 'out-of-bounds',
      detail: `Placement exceeds perimeter wall bounds (${columns} × ${rows} grid).`,
    };
  }

  // 2. Check blocked architectural zones
  const collidingBlocked: { x: number; y: number }[] = [];
  let blockedReason = '';
  for (let y = candidate.y; y < candidate.y + h; y++) {
    for (let x = candidate.x; x < candidate.x + w; x++) {
      const blocked = getBlockedCellAt(x, y, plan.blockedCells);
      if (blocked) {
        collidingBlocked.push({ x, y });
        if (!blockedReason) blockedReason = blocked.reason;
      }
    }
  }

  if (collidingBlocked.length > 0) {
    return {
      valid: false,
      reason: 'blocked-cell',
      detail: `Placement intersects reserved architectural zone (${blockedReason}).`,
      collidingCells: collidingBlocked,
    };
  }

  // 3. Check overlap with other furniture modules
  for (const other of allModules) {
    if (other.id === candidate.id) continue;
    if (doPiecesOverlap(candidate, other)) {
      const otherCells = getOccupiedCells(other);
      const candidateCells = getOccupiedCells(candidate);
      const overlapCells = candidateCells.filter((c) =>
        otherCells.some((o) => o.x === c.x && o.y === c.y)
      );
      return {
        valid: false,
        reason: 'module-overlap',
        detail: `Placement collides with ${other.label.toLowerCase()}.`,
        collidingCells: overlapCells,
        collidingModuleId: other.id,
      };
    }
  }

  return { valid: true };
}

/**
 * Boolean convenience wrapper matching the canonical floor plan specification.
 */
export function isLegalPlacement(
  candidate: FurniturePiece,
  allModules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): boolean {
  return validatePlacement(candidate, allModules, plan).valid;
}

/**
 * Attempts to rotate a piece by 90 degrees clockwise. If rotating in place hits
 * a boundary or obstacle, attempts a 1-cell architectural wall kick so rotation
 * near room edges feels responsive while strictly honoring collision rules.
 */
export function rotatePieceWithKick(
  piece: FurniturePiece,
  allModules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): { result: PlacementValidationResult; piece: FurniturePiece } {
  const nextRotation = (piece.rotation + 90) % 360;
  const directCandidate: FurniturePiece = { ...piece, rotation: nextRotation };
  const directValidation = validatePlacement(directCandidate, allModules, plan);
  if (directValidation.valid) {
    return { result: directValidation, piece: directCandidate };
  }

  // Try subtle 1-cell kick offsets for edge rotation
  const kickOffsets: [number, number][] = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [-2, 0],
    [0, -2],
  ];
  for (const [dx, dy] of kickOffsets) {
    const kicked: FurniturePiece = {
      ...piece,
      x: piece.x + dx,
      y: piece.y + dy,
      rotation: nextRotation,
    };
    const kickValidation = validatePlacement(kicked, allModules, plan);
    if (kickValidation.valid) {
      return { result: kickValidation, piece: kicked };
    }
  }

  return { result: directValidation, piece };
}

/**
 * Formats row index (0-based) as architectural row letter (A-H).
 */
export function formatRowLetter(rowIndex: number): string {
  return String.fromCharCode(65 + Math.max(0, rowIndex));
}

/**
 * Formats column index (0-based) as 2-digit architectural grid numeral (01-12).
 */
export function formatColumnNumber(colIndex: number): string {
  return String(colIndex + 1).padStart(2, '0');
}

/**
 * Formats a coordinate pair as architectural grid reference (e.g., "04 / C").
 */
export function formatGridCoordinate(x: number, y: number): string {
  return `${formatColumnNumber(x)} · ${formatRowLetter(y)}`;
}

/**
 * Computes spatial occupancy metrics for the room studio readout.
 */
export function calculateRoomMetrics(
  modules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): RoomMetrics {
  const totalCells = plan.grid.columns * plan.grid.rows;
  const blockedCount = plan.blockedCells.length;
  const occupiedCount = modules.reduce((sum, piece) => {
    const { w, h } = getFootprint(piece);
    return sum + w * h;
  }, 0);
  const usableCells = Math.max(1, totalCells - blockedCount);
  const openCount = Math.max(0, usableCells - occupiedCount);
  const openPercentage = Math.round((openCount / usableCells) * 100);

  return {
    totalCells,
    blockedCount,
    occupiedCount,
    openCount,
    openPercentage,
  };
}

/**
 * Formats a copyable architectural schedule for the current arrangement.
 */
export function formatConfigurationSummary(
  modules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): string {
  const metrics = calculateRoomMetrics(modules, plan);
  const lines = modules.map((m) => {
    const { w, h } = getFootprint(m);
    return `${m.id.toUpperCase().padEnd(6, ' ')} | ${m.label.padEnd(14, ' ')} | Grid ${formatColumnNumber(m.x)}${formatRowLetter(m.y)} (Col ${m.x + 1}, Row ${m.y + 1}) | Footprint ${w}×${h} | Rot ${m.rotation}°`;
  });
  return [
    'HOLLOWAY — ARCHITECTURAL ROOM SCHEDULE (NO. 092)',
    `GRID: ${plan.grid.columns} × ${plan.grid.rows} LOGICAL CELLS · OPEN CIRCULATION: ${metrics.openPercentage}%`,
    '------------------------------------------------------------------------',
    ...lines,
  ].join('\n');
}
