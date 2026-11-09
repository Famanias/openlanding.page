export interface GridConfig {
  columns: number;
  rows: number;
  cellSize: number;
  originX: number;
  originY: number;
}

export interface BlockedCell {
  x: number;
  y: number;
  reason: string;
}

export interface FurniturePiece {
  id: string;
  label: string;
  widthCells: number;
  heightCells: number;
  x: number;
  y: number;
  rotation: number;
  fill: string;
}

export interface FloorPlanData {
  schemaVersion?: number;
  name?: string;
  notes?: string;
  grid: GridConfig;
  blockedCells: BlockedCell[];
  modules: FurniturePiece[];
}

export interface FurnitureCatalogEntry {
  id: string;
  index: string;
  code: string;
  shortName: string;
  fullName: string;
  category: string;
  materialSummary: string;
  dimensionsMetric: string;
  gridFootprintLabel: string;
  architecturalNote: string;
  imageUrl: string;
  swatchHex: string;
  textColorHex: string;
}

/**
 * Centralized asset & metadata registry for HOLLOWAY No. 092.
 * Note: Preserves existing files in /templates/holloway/holloway/ while mapping each furniture ID
 * to its matching visual photograph (03-chair-alpha.webp is the walnut table;
 * 04-table-alpha.webp is the muted burgundy lounge chair).
 */
export const HOLLOWAY_ASSETS = {
  heroScene: '/templates/holloway/holloway/00-hero-room-scene.jpg',
  heroReference: '/templates/holloway/holloway/hero-reference.webp',
  footerReference: '/templates/holloway/holloway/footer-reference.webp',
  collectionScene: '/templates/holloway/holloway/13-collection-room-scene.jpg',
  emptyRoomModel: '/templates/holloway/holloway/01-empty-room-base.webp',
  sofaAlpha: '/templates/holloway/holloway/02-sofa-alpha.webp',
  tableAlpha: '/templates/holloway/holloway/03-chair-alpha.webp',
  chairAlpha: '/templates/holloway/holloway/04-table-alpha.webp',
  shelfAlpha: '/templates/holloway/holloway/05-shelf-alpha.webp',
  lampAlpha: '/templates/holloway/holloway/06-lamp-alpha.webp',
  woodTexture: '/templates/holloway/holloway/07-wood-texture.webp',
  plasterTexture: '/templates/holloway/holloway/08-fabric-texture.webp',
  fabricTexture: '/templates/holloway/holloway/09-stone-texture.webp',
  lifestyleRoom: '/templates/holloway/holloway/10-lifestyle-room.webp',
  assemblyDetail: '/templates/holloway/holloway/11-assembly-detail.webp',
  floorPlanSvg: '/templates/holloway/holloway/12-room-floor-plan.svg',
  floorPlanJson: '/templates/holloway/holloway/12-room-floor-plan.data.json',
} as const;

export const FURNITURE_CATALOG: Record<string, FurnitureCatalogEntry> = {
  sofa: {
    id: 'sofa',
    index: '01',
    code: 'HW-092-S1',
    shortName: 'SOFA',
    fullName: 'Atelier 01 Modular Sofa',
    category: 'Primary Seating System',
    materialSummary: 'Powder-blue architectural wool bouclé over kiln-dried European oak plinth',
    dimensionsMetric: '2400 × 1520 × 740 mm',
    gridFootprintLabel: '3 × 2 Cells',
    architecturalNote:
      'Low-profile horizontal datum designed to anchor open floor plans without obstructing sightlines across the room.',
    imageUrl: HOLLOWAY_ASSETS.sofaAlpha,
    swatchHex: '#A6BBC7',
    textColorHex: '#262824',
  },
  chair: {
    id: 'chair',
    index: '02',
    code: 'HW-092-C2',
    shortName: 'CHAIR',
    fullName: 'Vesper Lounge Chair',
    category: 'Occasional Seating',
    materialSummary: 'Muted burgundy felted wool shell with turned walnut underframe',
    dimensionsMetric: '820 × 840 × 730 mm',
    gridFootprintLabel: '2 × 2 Cells',
    architecturalNote:
      'Cantilevered wrap-around bolster offering acoustic intimacy and an oblique conversational axis.',
    imageUrl: HOLLOWAY_ASSETS.chairAlpha,
    swatchHex: '#874C54',
    textColorHex: '#F5F2EA',
  },
  table: {
    id: 'table',
    index: '03',
    code: 'HW-092-T3',
    shortName: 'TABLE',
    fullName: 'Plinth Low Table',
    category: 'Horizontal Surface',
    materialSummary: 'Oiled American walnut & quartersawn oak with bridle-jointed lower shelf',
    dimensionsMetric: '780 × 540 × 410 mm',
    gridFootprintLabel: '1 × 1 Cell',
    architecturalNote:
      'Conceived as an architectural datum plane—proportioned for monographs, ceramic vessels, and daily reach.',
    imageUrl: HOLLOWAY_ASSETS.tableAlpha,
    swatchHex: '#B88C60',
    textColorHex: '#262824',
  },
  shelf: {
    id: 'shelf',
    index: '04',
    code: 'HW-092-SH4',
    shortName: 'SHELF',
    fullName: 'Cadence Open Shelving',
    category: 'Vertical Architecture',
    materialSummary: 'Powder-coated mineral steel uprights with recessed timber inlay channels',
    dimensionsMetric: '1800 × 420 × 1140 mm',
    gridFootprintLabel: '1 × 3 Cells',
    architecturalNote:
      'Acts as either a wall-bound library or a porous spatial partition that filters natural light through the room.',
    imageUrl: HOLLOWAY_ASSETS.shelfAlpha,
    swatchHex: '#343536',
    textColorHex: '#F5F2EA',
  },
  lamp: {
    id: 'lamp',
    index: '05',
    code: 'HW-092-L5',
    shortName: 'LAMP',
    fullName: 'Column Floor Lamp',
    category: 'Atmospheric Illumination',
    materialSummary: 'Hand-laid warm Washi parchment diffuser on oxblood-lacquered steel stem',
    dimensionsMetric: 'Ø 340 × 1480 mm',
    gridFootprintLabel: '1 × 1 Cell',
    architecturalNote:
      'Vertical punctuation mark that casts a 2700K architectural wash across lime plaster walls at dusk.',
    imageUrl: HOLLOWAY_ASSETS.lampAlpha,
    swatchHex: '#C89D66',
    textColorHex: '#262824',
  },
};

export const ORDERED_FURNITURE_IDS = ['sofa', 'chair', 'table', 'shelf', 'lamp'] as const;

export const DEFAULT_FLOOR_PLAN: FloorPlanData = {
  schemaVersion: 1,
  name: 'HOLLOWAY example room',
  notes: 'Illustrative 12 × 8 logical-cell room; cell values are not real-world measurements.',
  grid: {
    columns: 12,
    rows: 8,
    cellSize: 48,
    originX: 96,
    originY: 100,
  },
  blockedCells: [
    { x: 9, y: 0, reason: 'fixed service fixture' },
    { x: 10, y: 0, reason: 'fixed service fixture' },
    { x: 0, y: 6, reason: 'entry clearance' },
    { x: 1, y: 6, reason: 'entry clearance' },
    { x: 0, y: 7, reason: 'entry clearance' },
    { x: 1, y: 7, reason: 'entry clearance' },
  ],
  modules: [
    {
      id: 'sofa',
      label: 'Modular sofa',
      widthCells: 3,
      heightCells: 2,
      x: 3,
      y: 2,
      rotation: 0,
      fill: '#B5C8DA',
    },
    {
      id: 'chair',
      label: 'Lounge chair',
      widthCells: 2,
      heightCells: 2,
      x: 8,
      y: 4,
      rotation: 0,
      fill: '#76404B',
    },
    {
      id: 'table',
      label: 'Side table',
      widthCells: 1,
      heightCells: 1,
      x: 7,
      y: 2,
      rotation: 0,
      fill: '#604431',
    },
    {
      id: 'shelf',
      label: 'Shelf',
      widthCells: 1,
      heightCells: 3,
      x: 11,
      y: 1,
      rotation: 0,
      fill: '#343536',
    },
    {
      id: 'lamp',
      label: 'Floor lamp',
      widthCells: 1,
      heightCells: 1,
      x: 2,
      y: 1,
      rotation: 0,
      fill: '#C89D66',
    },
  ],
};

export interface RoomPreset {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  description: string;
  modules: FurniturePiece[];
}

export const ROOM_PRESETS: RoomPreset[] = [
  {
    id: 'canonical',
    index: '01',
    name: 'Canonical Salon',
    subtitle: 'Open Conversation & North Light',
    description:
      'The signature HOLLOWAY arrangement: sofa anchored centrally with oblique lounge chair and perimeter vertical storage.',
    modules: DEFAULT_FLOOR_PLAN.modules,
  },
  {
    id: 'reading-sanctuary',
    index: '02',
    name: 'Reading Sanctuary',
    subtitle: 'Zoned Library & Quiet Corner',
    description:
      'Rotates the shelving to divide the studio while clustering the lounge chair, lamp, and low table into an intimate study alcove.',
    modules: [
      {
        id: 'sofa',
        label: 'Modular sofa',
        widthCells: 3,
        heightCells: 2,
        x: 2,
        y: 3,
        rotation: 0,
        fill: '#B5C8DA',
      },
      {
        id: 'chair',
        label: 'Lounge chair',
        widthCells: 2,
        heightCells: 2,
        x: 8,
        y: 2,
        rotation: 90,
        fill: '#76404B',
      },
      {
        id: 'table',
        label: 'Side table',
        widthCells: 1,
        heightCells: 1,
        x: 7,
        y: 3,
        rotation: 0,
        fill: '#604431',
      },
      {
        id: 'shelf',
        label: 'Shelf',
        widthCells: 1,
        heightCells: 3,
        x: 6,
        y: 0,
        rotation: 90,
        fill: '#343536',
      },
      {
        id: 'lamp',
        label: 'Floor lamp',
        widthCells: 1,
        heightCells: 1,
        x: 10,
        y: 2,
        rotation: 0,
        fill: '#C89D66',
      },
    ],
  },
  {
    id: 'architect-atelier',
    index: '03',
    name: 'Architect’s Atelier',
    subtitle: 'Perimeter Flow & Open Center',
    description:
      'Clears the central floor datum for circulation and spatial openness, aligning seating along the architectural axes.',
    modules: [
      {
        id: 'sofa',
        label: 'Modular sofa',
        widthCells: 3,
        heightCells: 2,
        x: 1,
        y: 1,
        rotation: 90,
        fill: '#B5C8DA',
      },
      {
        id: 'chair',
        label: 'Lounge chair',
        widthCells: 2,
        heightCells: 2,
        x: 5,
        y: 5,
        rotation: 180,
        fill: '#76404B',
      },
      {
        id: 'table',
        label: 'Side table',
        widthCells: 1,
        heightCells: 1,
        x: 4,
        y: 2,
        rotation: 0,
        fill: '#604431',
      },
      {
        id: 'shelf',
        label: 'Shelf',
        widthCells: 1,
        heightCells: 3,
        x: 11,
        y: 3,
        rotation: 0,
        fill: '#343536',
      },
      {
        id: 'lamp',
        label: 'Floor lamp',
        widthCells: 1,
        heightCells: 1,
        x: 1,
        y: 4,
        rotation: 0,
        fill: '#C89D66',
      },
    ],
  },
];

/**
 * Normalizes loaded JSON floor plan data and ensures all 5 core HOLLOWAY modules
 * (sofa, chair, table, shelf, lamp) are present without colliding.
 */
export function normalizeFloorPlanData(raw: Partial<FloorPlanData> | null | undefined): FloorPlanData {
  if (!raw || !raw.grid || !Array.isArray(raw.modules)) {
    return structuredClone(DEFAULT_FLOOR_PLAN);
  }

  const modules: FurniturePiece[] = raw.modules.map((m) => ({
    id: String(m.id),
    label: String(m.label),
    widthCells: Number(m.widthCells) || 1,
    heightCells: Number(m.heightCells) || 1,
    x: Number(m.x) || 0,
    y: Number(m.y) || 0,
    rotation: Number(m.rotation) || 0,
    fill: String(m.fill || '#B5C8DA'),
  }));

  // Ensure the 05 / LAMP piece is available in the interactive studio alongside the 4 JSON modules
  if (!modules.some((m) => m.id === 'lamp')) {
    modules.push({
      id: 'lamp',
      label: 'Floor lamp',
      widthCells: 1,
      heightCells: 1,
      x: 2,
      y: 1,
      rotation: 0,
      fill: '#C89D66',
    });
  }

  return {
    schemaVersion: raw.schemaVersion ?? 1,
    name: raw.name ?? DEFAULT_FLOOR_PLAN.name,
    notes: raw.notes ?? DEFAULT_FLOOR_PLAN.notes,
    grid: {
      columns: Number(raw.grid.columns) || 12,
      rows: Number(raw.grid.rows) || 8,
      cellSize: Number(raw.grid.cellSize) || 48,
      originX: Number(raw.grid.originX) || 96,
      originY: Number(raw.grid.originY) || 100,
    },
    blockedCells: Array.isArray(raw.blockedCells)
      ? raw.blockedCells.map((b) => ({
          x: Number(b.x),
          y: Number(b.y),
          reason: String(b.reason || 'reserved zone'),
        }))
      : DEFAULT_FLOOR_PLAN.blockedCells,
    modules,
  };
}
