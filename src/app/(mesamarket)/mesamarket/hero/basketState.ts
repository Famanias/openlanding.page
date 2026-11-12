export type ProduceId =
  | 'vine-tomatoes'
  | 'carrots'
  | 'lemon'
  | 'red-apple'
  | 'green-apple'
  | 'bell-pepper'
  | 'kale-greens'
  | 'chili-peppers'
  | 'baguette'
  | 'jam-jar';

export type Vec3Tuple = [number, number, number];

export interface ProduceSpec {
  id: ProduceId;
  name: string;
  shortName: string;
  farm: string;
  unitLabel: string;
  note: string;
  accentHex: string;
}

export interface SourceAnchorSpec {
  anchorId: string;
  produceId: ProduceId;
  label: string;
  worldPosition: Vec3Tuple;
  worldRotation: Vec3Tuple;
  worldScale: number;
  variant?: 'alt';
}

export interface CrateSlot {
  localPosition: Vec3Tuple;
  worldPosition: Vec3Tuple;
  worldRotation: Vec3Tuple;
  scale: number;
}

export interface BasketItemInstance {
  instanceId: string;
  produceId: ProduceId;
  sourceAnchorId: string;
  slot: CrateSlot;
  addedSeq: number;
}

export interface BasketState {
  items: BasketItemInstance[];
  nextSeq: number;
}

export const CRATE_SPEC = {
  center: [0.06, 0.02, -0.12] as Vec3Tuple,
  rotationY: 0.59,
  lengthX: 3.18,
  widthZ: 2.26,
  heightY: 1.62,
  plankThickness: 0.11,
  rimWorldY: 0.85,
} as const;

export function localCrateToWorld(lx: number, ly: number, lz: number): Vec3Tuple {
  const cos = Math.cos(CRATE_SPEC.rotationY);
  const sin = Math.sin(CRATE_SPEC.rotationY);
  const wx = CRATE_SPEC.center[0] + lx * cos + lz * sin;
  const wy = CRATE_SPEC.center[1] + ly;
  const wz = CRATE_SPEC.center[2] - lx * sin + lz * cos;
  return [
    Number(wx.toFixed(4)),
    Number(wy.toFixed(4)),
    Number(wz.toFixed(4)),
  ];
}

export const PRODUCE_CATALOG: Record<ProduceId, ProduceSpec> = {
  'vine-tomatoes': {
    id: 'vine-tomatoes',
    name: 'Early Girl Vine Tomatoes',
    shortName: 'Vine Tomatoes',
    farm: 'Full Belly Farm · Capay Valley',
    unitLabel: '1 lb cluster',
    note: 'Dry-farmed on mineral clay soils for concentrated sweet-tart flavor.',
    accentHex: '#DC4328',
  },
  carrots: {
    id: 'carrots',
    name: 'Nantes Bunched Carrots',
    shortName: 'Nantes Carrots',
    farm: 'Riverdog Farm · Guinda',
    unitLabel: '1 bunch w/ tops',
    note: 'Pulled at dawn with crisp, sweet cores and aromatic feathery greens.',
    accentHex: '#E8772E',
  },
  lemon: {
    id: 'lemon',
    name: 'Meyer & Eureka Lemons',
    shortName: 'Meyer Lemon',
    farm: 'Gold Ridge Groves · Sebastopol',
    unitLabel: 'Single fruit',
    note: 'Thin, floral citrus rind bursting with bright coastal juice.',
    accentHex: '#F0C436',
  },
  'red-apple': {
    id: 'red-apple',
    name: 'Sonoma Gala Apple',
    shortName: 'Red Orchard Apple',
    farm: 'Devoto Orchards · Sonoma',
    unitLabel: 'Single fruit',
    note: 'Honeyed crunch with sun-blushed scarlet skin straight off the tree.',
    accentHex: '#DE4D31',
  },
  'green-apple': {
    id: 'green-apple',
    name: 'Heirloom Goldrush Apple',
    shortName: 'Goldrush Apple',
    farm: 'apple-a-day · Gravenstein Hwy',
    unitLabel: 'Single fruit',
    note: 'Crisp, effervescent cider-apple snap with warm olive-gold skin.',
    accentHex: '#A8B251',
  },
  'bell-pepper': {
    id: 'bell-pepper',
    name: 'Sunburst Sweet Bell Pepper',
    shortName: 'Golden Bell Pepper',
    farm: 'Terra Firma Farm · Winters',
    unitLabel: 'Single pepper',
    note: 'Thick, glossy golden walls ripened on the vine for mellow sweetness.',
    accentHex: '#F0AF32',
  },
  'kale-greens': {
    id: 'kale-greens',
    name: 'Tuscan Kale & Orchard Greens',
    shortName: 'Harvest Greens',
    farm: 'Star Route Farms · Bolinas',
    unitLabel: '1 tied bunch',
    note: 'Tender ruffled leaves bundled in red farm twine for sautés and salads.',
    accentHex: '#618240',
  },
  'chili-peppers': {
    id: 'chili-peppers',
    name: 'Fresno & Serrano Chilis',
    shortName: 'Farmstead Chilis',
    farm: 'Tierra Vegetables · Santa Rosa',
    unitLabel: '2-pepper pair',
    note: 'Bright, fruity medium heat picked red-ripe and emerald-fresh.',
    accentHex: '#D63F27',
  },
  baguette: {
    id: 'baguette',
    name: 'Country Sourdough Baguette',
    shortName: 'Sourdough Baguette',
    farm: 'Della Fattoria · Petaluma',
    unitLabel: '1 hearth loaf',
    note: 'Naturally leavened heritage wheat baked on stone and tucked in kraft paper.',
    accentHex: '#C6894E',
  },
  'jam-jar': {
    id: 'jam-jar',
    name: 'Heirloom Tomato & Peach Conserve',
    shortName: 'Pantry Conserve',
    farm: 'Mesa Pantry · Sonoma',
    unitLabel: '8 oz glass jar',
    note: 'Small-batch copper-kettle preserve simmered from peak orchard fruit.',
    accentHex: '#CF4B2C',
  },
};

export const SOURCE_ANCHORS: SourceAnchorSpec[] = [
  {
    anchorId: 'src-tomatoes',
    produceId: 'vine-tomatoes',
    label: 'Add Early Girl Vine Tomatoes',
    worldPosition: [-2.12, -0.58, 1.38],
    worldRotation: [-0.26, 0.08, 0.04],
    worldScale: 1.24,
  },
  {
    anchorId: 'src-carrots',
    produceId: 'carrots',
    label: 'Add Nantes Bunched Carrots',
    worldPosition: [-1.22, -0.78, 2.26],
    worldRotation: [-0.32, 0.04, 0.02],
    worldScale: 1.42,
  },
  {
    anchorId: 'src-lemon-upper',
    produceId: 'lemon',
    label: 'Add Meyer Lemon',
    worldPosition: [-0.46, -0.76, 2.42],
    worldRotation: [-0.30, 0.02, -0.08],
    worldScale: 0.78,
  },
  {
    anchorId: 'src-lemon-lower',
    produceId: 'lemon',
    label: 'Add Eureka Lemon',
    worldPosition: [-0.84, -0.84, 2.94],
    worldRotation: [-0.32, 0.02, 0.08],
    worldScale: 0.82,
    variant: 'alt',
  },
  {
    anchorId: 'src-red-apple',
    produceId: 'red-apple',
    label: 'Add Sonoma Gala Apple',
    worldPosition: [-0.08, -0.84, 2.92],
    worldRotation: [-0.28, 0.0, -0.03],
    worldScale: 0.80,
  },
  {
    anchorId: 'src-green-apple',
    produceId: 'green-apple',
    label: 'Add Heirloom Goldrush Apple',
    worldPosition: [0.34, -0.74, 2.38],
    worldRotation: [-0.28, -0.02, 0.04],
    worldScale: 0.82,
  },
  {
    anchorId: 'src-bell-pepper',
    produceId: 'bell-pepper',
    label: 'Add Sunburst Sweet Bell Pepper',
    worldPosition: [0.78, -0.66, 2.02],
    worldRotation: [-0.26, -0.03, 0.02],
    worldScale: 0.90,
  },
  {
    anchorId: 'src-kale-greens',
    produceId: 'kale-greens',
    label: 'Add Tuscan Kale & Orchard Greens',
    worldPosition: [1.34, -0.44, 1.58],
    worldRotation: [-0.24, -0.05, -0.06],
    worldScale: 1.24,
  },
  {
    anchorId: 'src-chili-mid',
    produceId: 'chili-peppers',
    label: 'Add Fresno & Serrano Chilis',
    worldPosition: [0.82, -0.84, 2.74],
    worldRotation: [-0.32, 0.0, 0.06],
    worldScale: 0.92,
  },
  {
    anchorId: 'src-baguette',
    produceId: 'baguette',
    label: 'Add Country Sourdough Baguette',
    worldPosition: [1.94, -0.72, 2.22],
    worldRotation: [-0.30, -0.05, -0.02],
    worldScale: 1.56,
  },
  {
    anchorId: 'src-chili-right',
    produceId: 'chili-peppers',
    label: 'Add Red & Green Chilis',
    worldPosition: [2.16, -0.86, 2.84],
    worldRotation: [-0.32, -0.04, -0.18],
    worldScale: 0.86,
    variant: 'alt',
  },
  {
    anchorId: 'src-jam-jar',
    produceId: 'jam-jar',
    label: 'Add Heirloom Tomato & Peach Conserve',
    worldPosition: [2.14, -0.34, 1.06],
    worldRotation: [-0.22, -0.06, 0.0],
    worldScale: 1.02,
  },
];

interface LocalSlotTemplate {
  local: Vec3Tuple;
  rot: Vec3Tuple;
  scale: number;
}

const PREFERRED_CRATE_SLOTS: Record<ProduceId, LocalSlotTemplate[]> = {
  'kale-greens': [
    { local: [-0.08, 0.90, -0.64], rot: [-0.18, 0.04, 0.06], scale: 1.44 },
    { local: [-0.68, 0.84, -0.56], rot: [-0.18, 0.06, 0.16], scale: 1.30 },
  ],
  baguette: [
    { local: [0.76, 0.92, -0.58], rot: [-0.18, -0.04, 0.04], scale: 1.36 },
    { local: [0.38, 0.86, -0.44], rot: [-0.18, 0.02, -0.04], scale: 1.24 },
  ],
  'jam-jar': [
    { local: [1.08, 0.70, -0.08], rot: [-0.18, -0.02, 0.04], scale: 1.02 },
    { local: [0.80, 0.64, 0.18], rot: [-0.18, 0.02, -0.05], scale: 0.96 },
  ],
  carrots: [
    { local: [0.94, 0.76, 0.46], rot: [-0.20, 0.04, 0.04], scale: 1.42 },
    { local: [0.54, 0.72, 0.56], rot: [-0.20, 0.02, 0.12], scale: 1.30 },
  ],
  'vine-tomatoes': [
    { local: [-0.42, 0.62, -0.02], rot: [-0.22, 0.02, 0.04], scale: 1.12 },
    { local: [0.36, 0.66, -0.10], rot: [-0.20, -0.02, -0.08], scale: 1.04 },
    { local: [-1.08, 0.64, -0.16], rot: [-0.20, 0.05, 0.12], scale: 1.08 },
  ],
  'bell-pepper': [
    { local: [0.0, 0.68, -0.14], rot: [-0.20, 0.0, 0.05], scale: 0.98 },
    { local: [-0.38, 0.64, -0.34], rot: [-0.20, 0.04, -0.08], scale: 0.92 },
  ],
  lemon: [
    { local: [0.34, 0.60, 0.30], rot: [-0.22, 0.02, -0.14], scale: 0.86 },
    { local: [-0.08, 0.56, 0.36], rot: [-0.22, -0.02, 0.12], scale: 0.84 },
  ],
  'red-apple': [
    { local: [-0.64, 0.58, 0.60], rot: [-0.22, 0.02, -0.04], scale: 0.88 },
    { local: [-1.14, 0.60, 0.18], rot: [-0.22, 0.04, 0.08], scale: 0.86 },
  ],
  'green-apple': [
    { local: [-0.18, 0.60, 0.64], rot: [-0.22, -0.02, 0.06], scale: 0.88 },
    { local: [-0.94, 0.58, 0.44], rot: [-0.22, 0.02, -0.06], scale: 0.84 },
  ],
  'chili-peppers': [
    { local: [-1.16, 0.64, -0.38], rot: [-0.20, 0.04, 0.24], scale: 0.96 },
    { local: [0.18, 0.58, 0.68], rot: [-0.22, -0.02, -0.12], scale: 0.90 },
  ],
};

function dist3(a: Vec3Tuple, b: Vec3Tuple): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function createInitialBasketState(): BasketState {
  return {
    items: [],
    nextSeq: 1,
  };
}

export function getDefaultAnchorForProduce(produceId: ProduceId): SourceAnchorSpec {
  const found = SOURCE_ANCHORS.find((a) => a.produceId === produceId);
  return found ?? SOURCE_ANCHORS[0];
}

export function allocateCrateSlot(
  existingItems: BasketItemInstance[],
  produceId: ProduceId,
  seqSeed: number
): CrateSlot {
  const templates = PREFERRED_CRATE_SLOTS[produceId];
  const minClearance = 0.23;

  // 1. Try curated art-directed slots first if unoccupied
  for (const tpl of templates) {
    const collides = existingItems.some(
      (item) => dist3(item.slot.localPosition, tpl.local) < minClearance
    );
    if (!collides) {
      return {
        localPosition: tpl.local,
        worldPosition: localCrateToWorld(tpl.local[0], tpl.local[1], tpl.local[2]),
        worldRotation: tpl.rot,
        scale: tpl.scale,
      };
    }
  }

  // 2. Unlimited mounding allocator using deterministic golden-angle spiral inside crate bounds
  const goldenAngle = 2.399963229728653;
  const baseTpl = templates[0];
  const isTall =
    produceId === 'kale-greens' ||
    produceId === 'baguette' ||
    produceId === 'carrots' ||
    produceId === 'jam-jar';

  for (let attempt = 0; attempt < 160; attempt++) {
    const idx = seqSeed + attempt * 3;
    const angle = idx * goldenAngle;
    const ring = ((attempt % 12) + 1) / 12;
    const tier = Math.floor(existingItems.length / 9) + Math.floor(attempt / 14);

    let lx = Math.cos(angle) * (0.98 * Math.sqrt(ring));
    let lz = Math.sin(angle) * (0.64 * Math.sqrt(ring));

    if (isTall) {
      // Bias taller items slightly toward the back/sides so front produce stays visible
      lz = Math.max(-0.72, Math.min(0.45, lz - 0.18));
    }

    lx = Math.max(-1.14, Math.min(1.12, lx));
    lz = Math.max(-0.72, Math.min(0.70, lz));

    const baseLy = isTall ? 0.72 : 0.52;
    const ly = Number((baseLy + tier * 0.14 + (attempt % 3) * 0.035).toFixed(4));
    const candidateLocal: Vec3Tuple = [
      Number(lx.toFixed(4)),
      ly,
      Number(lz.toFixed(4)),
    ];

    const collides = existingItems.some(
      (item) => dist3(item.slot.localPosition, candidateLocal) < minClearance
    );
    if (!collides) {
      const tiltZ = Number(
        (baseTpl.rot[2] + Math.sin(idx * 1.7) * 0.14).toFixed(4)
      );
      return {
        localPosition: candidateLocal,
        worldPosition: localCrateToWorld(
          candidateLocal[0],
          candidateLocal[1],
          candidateLocal[2]
        ),
        worldRotation: [baseTpl.rot[0], baseTpl.rot[1], tiltZ],
        scale: Number((baseTpl.scale * 0.95).toFixed(4)),
      };
    }
  }

  // Fallback high mound top
  const fallbackLocal: Vec3Tuple = [
    0,
    Number((0.75 + existingItems.length * 0.05).toFixed(4)),
    0,
  ];
  return {
    localPosition: fallbackLocal,
    worldPosition: localCrateToWorld(
      fallbackLocal[0],
      fallbackLocal[1],
      fallbackLocal[2]
    ),
    worldRotation: baseTpl.rot,
    scale: baseTpl.scale,
  };
}

export function addProduceInstance(
  state: BasketState,
  produceId: ProduceId,
  sourceAnchorId?: string
): { nextState: BasketState; added: BasketItemInstance } {
  const anchor =
    SOURCE_ANCHORS.find((a) => a.anchorId === sourceAnchorId) ??
    getDefaultAnchorForProduce(produceId);

  const seq = state.nextSeq;
  const instanceId = `crate-item-${seq}`;
  const slot = allocateCrateSlot(state.items, produceId, seq);

  const added: BasketItemInstance = {
    instanceId,
    produceId,
    sourceAnchorId: anchor.anchorId,
    slot,
    addedSeq: seq,
  };

  return {
    nextState: {
      items: [...state.items, added],
      nextSeq: seq + 1,
    },
    added,
  };
}

export function removeProduceInstance(
  state: BasketState,
  instanceId: string
): { nextState: BasketState; removed: BasketItemInstance | null } {
  const target = state.items.find((item) => item.instanceId === instanceId) ?? null;
  if (!target) {
    return { nextState: state, removed: null };
  }

  return {
    nextState: {
      items: state.items.filter((item) => item.instanceId !== instanceId),
      nextSeq: state.nextSeq,
    },
    removed: target,
  };
}

export function clearBasketState(state: BasketState): BasketState {
  return {
    items: [],
    nextSeq: state.nextSeq,
  };
}

export const CURATED_FULL_BASKET_ORDER: ProduceId[] = [
  'kale-greens',
  'kale-greens',
  'baguette',
  'jam-jar',
  'carrots',
  'vine-tomatoes',
  'bell-pepper',
  'vine-tomatoes',
  'lemon',
  'lemon',
  'red-apple',
  'green-apple',
  'vine-tomatoes',
  'green-apple',
  'chili-peppers',
];

export function getCuratedAdditions(state: BasketState): ProduceId[] {
  // Count existing produce quantities
  const counts: Partial<Record<ProduceId, number>> = {};
  for (const item of state.items) {
    counts[item.produceId] = (counts[item.produceId] ?? 0) + 1;
  }

  // Needed to reach the signature full-basket composition
  const needed: ProduceId[] = [];
  const targetCounts: Partial<Record<ProduceId, number>> = {};
  for (const pid of CURATED_FULL_BASKET_ORDER) {
    targetCounts[pid] = (targetCounts[pid] ?? 0) + 1;
    const have = counts[pid] ?? 0;
    if (targetCounts[pid]! > have) {
      needed.push(pid);
    }
  }

  // If user already has a full basket, add a fresh seasonal trio so the CTA always responds interactively
  if (needed.length === 0) {
    return ['vine-tomatoes', 'carrots', 'lemon', 'red-apple'];
  }

  return needed;
}

export interface FlightSample {
  position: Vec3Tuple;
  rotation: Vec3Tuple;
  scaleMultiplier: number;
}

/**
 * Evaluates a smooth 3D quadratic Bezier trajectory + perspective rotation + mid-air lift scale
 * between `startPos` and `endPos` at normalized progress `t` in [0, 1].
 */
export function evaluateFlightArc(
  startPos: Vec3Tuple,
  endPos: Vec3Tuple,
  startRot: Vec3Tuple,
  endRot: Vec3Tuple,
  t: number,
  direction: 'into-basket' | 'out-of-basket' = 'into-basket'
): FlightSample {
  const clamped = Math.max(0, Math.min(1, t));
  const inv = 1 - clamped;

  // Compute control point Y so the true curve apex at t=0.5 reaches desiredApexY
  const highestEndpoint = Math.max(startPos[1], endPos[1], CRATE_SPEC.rimWorldY);
  const arcClearance = direction === 'into-basket' ? 1.05 : 0.92;
  const desiredApexY = highestEndpoint + arcClearance;

  const ctrlX = (startPos[0] + endPos[0]) * 0.5 + (endPos[0] - startPos[0]) * 0.08;
  const ctrlY = 2 * desiredApexY - 0.5 * (startPos[1] + endPos[1]);
  const ctrlZ = (startPos[2] + endPos[2]) * 0.5 + 0.38;

  const px = inv * inv * startPos[0] + 2 * inv * clamped * ctrlX + clamped * clamped * endPos[0];
  const py = inv * inv * startPos[1] + 2 * inv * clamped * ctrlY + clamped * clamped * endPos[1];
  const pz = inv * inv * startPos[2] + 2 * inv * clamped * ctrlZ + clamped * clamped * endPos[2];

  // Dynamic 2.5D/3D perspective rotation during flight (pitch, yaw turn, and bank)
  const archWave = Math.sin(Math.PI * clamped);
  const bankSign = endPos[0] >= startPos[0] ? -1 : 1;

  const rx =
    startRot[0] +
    (endRot[0] - startRot[0]) * clamped +
    archWave * (direction === 'into-basket' ? 0.34 : -0.28);
  const ry =
    startRot[1] +
    (endRot[1] - startRot[1]) * clamped +
    archWave * bankSign * -0.38;
  const rz =
    startRot[2] +
    (endRot[2] - startRot[2]) * clamped +
    archWave * bankSign * 0.26;

  // Gentle perspective swell at apex
  const scaleMultiplier = 1 + 0.1 * archWave;

  return {
    position: [px, py, pz],
    rotation: [rx, ry, rz],
    scaleMultiplier,
  };
}
