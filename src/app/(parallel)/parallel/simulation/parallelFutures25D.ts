import { InterventionStrategy } from './engine';

export type ParallelEntityCategory = 'bridge' | 'district' | 'corridor';

export interface IsoPoint2D {
  sx: number;
  sy: number;
  depth: number;
}

export interface WorldPoint3D {
  x: number;
  y: number;
  z: number;
}

export type ArchitecturalBuildingFamily =
  | 'commercial_tower'
  | 'midrise_block'
  | 'industrial_warehouse'
  | 'transit_station'
  | 'distribution_facility'
  | 'utility_substation';

export interface IsoBuilding25D {
  id: string;
  districtId: string;
  family: ArchitecturalBuildingFamily;
  label?: string;
  wx: number;
  wy: number;
  ww: number;
  wd: number;
  wh: number;
  depth: number;
  shadowPolygon: string;
  leftFacePolygon: string;
  rightFacePolygon: string;
  topFacePolygon: string;
  parapetPolygon: string;
  crownFaces?: {
    left: string;
    right: string;
    top: string;
  };
  roofDetails: {
    type: 'crown' | 'hvac' | 'sawtooth' | 'canopy' | 'solar' | 'gantry';
    lines: Array<{ x1: number; y1: number; x2: number; y2: number }>;
    accents: Array<{ points: string; fill: string }>;
  };
  facadeLines: Array<{ x1: number; y1: number; x2: number; y2: number }>;
  topCenter: IsoPoint2D;
}

export interface IsoDistrict25D {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  bank: 'north' | 'south';
  wx: number;
  wy: number;
  ww: number;
  wd: number;
  plinthPolygon: string;
  leftEdgePolygon: string;
  rightEdgePolygon: string;
  labelPos: IsoPoint2D;
  hubPos: IsoPoint2D;
  worldHub: WorldPoint3D;
}

export interface IsoBridge25D {
  id: string;
  code: string;
  name: string;
  shortName: string;
  isPrimaryClosureTarget: boolean;
  corridorId: string;
  wx: number;
  wyStart: number;
  wyEnd: number;
  width: number;
  deckPolygon: string;
  sideFacePolygon: string;
  shadowPolygon: string;
  pierPolygons: string[];
  trussLines: Array<{ x1: number; y1: number; x2: number; y2: number }>;
  centerPos: IsoPoint2D;
}

export interface IsoCorridor25D {
  id: string;
  name: string;
  shortLabel: string;
  kind: 'bridge' | 'arterial' | 'collector' | 'transit' | 'freight';
  bridgeId?: string;
  fromDistrictId: string;
  toDistrictId: string;
  waypoints: WorldPoint3D[];
  projectedPoints: IsoPoint2D[];
  svgPath: string;
  elevatedSvgPath: string;
  strokeWidth: number;
  midPoint: IsoPoint2D;
}

export interface CanonicalCity25D {
  viewBoxWidth: number;
  viewBoxHeight: number;
  plinthTopPolygon: string;
  plinthLeftPolygon: string;
  plinthRightPolygon: string;
  riverWaterPolygon: string;
  riverNorthBankPolygon: string;
  riverSouthBankPolygon: string;
  riverFlowLines: string[];
  districts: IsoDistrict25D[];
  bridges: IsoBridge25D[];
  corridors: IsoCorridor25D[];
  buildings: IsoBuilding25D[];
}

export interface CorridorRuntimeState {
  corridorId: string;
  closed: boolean;
  congestion: number; // 0 to 1
  flowRate: number; // 0 to 100
  statusTag: 'OPEN' | 'CLOSED' | 'CONGESTED' | 'REROUTED' | 'TRANSIT_SURGE' | 'FREIGHT_SLOT';
  highlightLevel: 'neutral' | 'disrupted' | 'optimized' | 'closed';
  queueClusters: Array<{ sx: number; sy: number; intensity: number }>;
}

export interface DistrictRuntimeState {
  districtId: string;
  pressure: number; // 0 to 1
  transitPulse: number; // 0 to 1
  freightActive: boolean;
  statusSummary: string;
}

export interface VehicleMarker25D {
  id: string;
  corridorId: string;
  vehicleType: 'car' | 'transit' | 'freight';
  sx: number;
  sy: number;
  dx: number;
  dy: number;
  speedRatio: number;
  state: 'normal' | 'queued' | 'optimized';
}

export interface ElevatedDataArc25D {
  id: string;
  fromDistrictId: string;
  toDistrictId: string;
  svgPath: string;
  label: string;
  color: string;
  active: boolean;
}

export interface FutureWorldState25D {
  futureId: 'A' | 'B';
  title: string;
  subtitle: string;
  timeMinutes: number;
  timeFormatted: string;
  bridgeClosed: boolean;
  intervention: InterventionStrategy;
  corridorStates: Record<string, CorridorRuntimeState>;
  districtStates: Record<string, DistrictRuntimeState>;
  vehicles: VehicleMarker25D[];
  elevatedArcs: ElevatedDataArc25D[];
  metrics: {
    avgTravelDelayMin: number;
    congestionIndex: number;
    completedDeliveries: number;
    transitSharePct: number;
    corridorThroughputPct: number;
  };
  observations: [string, string];
  systemHeadline: string;
}

export interface ParallelFuturesComparisonState {
  timeMinutes: number;
  timeFormatted: string;
  closureActive: boolean;
  minutesSinceClosure: number;
  intervention: InterventionStrategy;
  interventionMeta: {
    id: InterventionStrategy;
    label: string;
    shortCode: string;
    mechanismSummary: string;
    primaryCorridors: string[];
  };
  baseline: FutureWorldState25D;
  alternative: FutureWorldState25D;
  deltas: {
    delaySavedMin: number;
    congestionReducedPct: number;
    extraDeliveries: number;
  };
}

export interface EntityComparisonInspection {
  entityId: string;
  category: ParallelEntityCategory;
  name: string;
  code: string;
  baselineStatus: string;
  baselineMetric: string;
  baselineSeverity: 'normal' | 'warning' | 'critical';
  alternativeStatus: string;
  alternativeMetric: string;
  alternativeBenefit: string;
}

export interface RealitySplitChoreography {
  progress: number; // 0 to 1
  phase: 1 | 2 | 3 | 4 | 5;
  phaseLabel: string;
  splitAmount: number; // 0 (unified) to 1 (fully split side-by-side)
  bridgeAlertIntensity: number; // 0 to 1
  divergenceAlpha: number; // 0 to 1
  metricsAlpha: number; // 0 to 1
}

export const PARALLEL_FUTURES_START_MIN = 420; // 07:00
export const PARALLEL_FUTURES_CLOSURE_MIN = 450; // 07:30
export const PARALLEL_FUTURES_END_MIN = 600; // 10:00

export const INTERVENTION_METADATA: Record<
  InterventionStrategy,
  {
    id: InterventionStrategy;
    label: string;
    shortCode: string;
    mechanismSummary: string;
    primaryCorridors: string[];
  }
> = {
  reroute_vehicles: {
    id: 'reroute_vehicles',
    label: 'Dynamic Rerouting',
    shortCode: 'POL-01 // REROUTE',
    mechanismSummary:
      'Predictive impedance re-weighting diverts cross-river flows to West Bypass Viaduct and East Innovation Crossing before central approaches gridlock.',
    primaryCorridors: ['CORRIDOR_WEST_VIADUCT', 'CORRIDOR_EAST_CROSSING', 'CORRIDOR_NORTH_ARTERIAL_WEST'],
  },
  increase_transit: {
    id: 'increase_transit',
    label: 'Transit Capacity Surge',
    shortCode: 'POL-02 // TRANSIT',
    mechanismSummary:
      'Deploys +45% high-frequency express transit headways across cross-river rail/bus corridors, absorbing commuter demand and thinning private vehicle queues.',
    primaryCorridors: ['CORRIDOR_TRANSIT_EXPRESS', 'CORRIDOR_WEST_VIADUCT', 'CORRIDOR_EAST_CROSSING'],
  },
  coordinate_deliveries: {
    id: 'coordinate_deliveries',
    label: 'Freight Window Slotting',
    shortCode: 'POL-03 // FREIGHT',
    mechanismSummary:
      'Re-slots heavy logistics dispatches onto the Southern & Eastern Freight Ring with staggered dock windows, keeping commuter crossings clear.',
    primaryCorridors: ['CORRIDOR_FREIGHT_RING', 'CORRIDOR_EAST_CROSSING', 'CORRIDOR_SOUTH_ARTERIAL_EAST'],
  },
};

/**
 * Fixed Isometric Projection:
 * World coordinates:
 *   x in [-170, 170] (west to east)
 *   y in [-115, 115] (north bank y < 0, river y in [-20, 20], south bank y > 0)
 *   z in [0, 85] (vertical height)
 */
const ISO_COS = 0.8660254; // cos(30 deg)
const ISO_SIN = 0.5; // sin(30 deg)
const ISO_SCALE = 1.48;
const ISO_ORIGIN_X = 360;
const ISO_ORIGIN_Y = 216;

export function projectIso(x: number, y: number, z: number = 0): IsoPoint2D {
  const sx = ISO_ORIGIN_X + (x - y * 0.72) * ISO_COS * ISO_SCALE;
  const sy = ISO_ORIGIN_Y + (x * 0.28 + y * 0.88) * ISO_SIN * ISO_SCALE - z * 1.18;
  const depth = x * 0.35 + y * 1.0 + z * 0.01;
  return {
    sx: Number(sx.toFixed(2)),
    sy: Number(sy.toFixed(2)),
    depth: Number(depth.toFixed(3)),
  };
}

function ptsToPolygon(pts: IsoPoint2D[]): string {
  return pts.map((p) => `${p.sx},${p.sy}`).join(' ');
}

function buildExtrudedBoxPolygons(
  wx: number,
  wy: number,
  ww: number,
  wd: number,
  zBase: number,
  zTop: number
) {
  const x0 = wx - ww / 2;
  const x1 = wx + ww / 2;
  const y0 = wy - wd / 2;
  const y1 = wy + wd / 2;

  const tNW = projectIso(x0, y0, zTop);
  const tNE = projectIso(x1, y0, zTop);
  const tSE = projectIso(x1, y1, zTop);
  const tSW = projectIso(x0, y1, zTop);

  const bNW = projectIso(x0, y0, zBase);
  const bNE = projectIso(x1, y0, zBase);
  const bSE = projectIso(x1, y1, zBase);
  const bSW = projectIso(x0, y1, zBase);

  // Contact shadow projected slightly south-east on zBase
  const shOffset = Math.min(10, (zTop - zBase) * 0.22);
  const sSW = projectIso(x0 - 1.5, y1 + shOffset * 0.6, zBase);
  const sSE = projectIso(x1 + shOffset * 0.85, y1 + shOffset * 0.6, zBase);
  const sNE = projectIso(x1 + shOffset * 0.85, y0 + 1.5, zBase);

  return {
    topFacePolygon: ptsToPolygon([tNW, tNE, tSE, tSW]),
    leftFacePolygon: ptsToPolygon([tSW, tSE, bSE, bSW]), // South-facing front/left shaded face
    rightFacePolygon: ptsToPolygon([tSE, tNE, bNE, bSE]), // East-facing side shaded face
    shadowPolygon: ptsToPolygon([bSW, sSW, sSE, sNE, bNE, bSE]),
    cornersTop: { tNW, tNE, tSE, tSW },
    cornersBase: { bNW, bNE, bSE, bSW },
  };
}

function createBuilding25D(
  id: string,
  districtId: string,
  family: ArchitecturalBuildingFamily,
  wx: number,
  wy: number,
  ww: number,
  wd: number,
  wh: number,
  label?: string
): IsoBuilding25D {
  const zBase = 0;
  const box = buildExtrudedBoxPolygons(wx, wy, ww, wd, zBase, wh);

  // Inner parapet inset on the roof
  const inset = Math.min(2.2, ww * 0.14, wd * 0.14);
  const pNW = projectIso(wx - ww / 2 + inset, wy - wd / 2 + inset, wh + 0.4);
  const pNE = projectIso(wx + ww / 2 - inset, wy - wd / 2 + inset, wh + 0.4);
  const pSE = projectIso(wx + ww / 2 - inset, wy + wd / 2 - inset, wh + 0.4);
  const pSW = projectIso(wx - ww / 2 + inset, wy + wd / 2 - inset, wh + 0.4);
  const parapetPolygon = ptsToPolygon([pNW, pNE, pSE, pSW]);

  // Facade floor/structural lines on the front-south face and east face
  const facadeLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  const stepZ = family === 'commercial_tower' ? 9 : family === 'midrise_block' ? 8 : 7;
  for (let z = stepZ; z < wh - 3; z += stepZ) {
    const fSW = projectIso(wx - ww / 2, wy + wd / 2, z);
    const fSE = projectIso(wx + ww / 2, wy + wd / 2, z);
    const fNE = projectIso(wx + ww / 2, wy - wd / 2, z);
    facadeLines.push({ x1: fSW.sx, y1: fSW.sy, x2: fSE.sx, y2: fSE.sy });
    facadeLines.push({ x1: fSE.sx, y1: fSE.sy, x2: fNE.sx, y2: fNE.sy });
  }

  let crownFaces: IsoBuilding25D['crownFaces'];
  const roofLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  const roofAccents: Array<{ points: string; fill: string }> = [];

  let detailType: IsoBuilding25D['roofDetails']['type'] = 'hvac';

  if (family === 'commercial_tower') {
    detailType = 'crown';
    const cw = ww * 0.56;
    const cd = wd * 0.56;
    const ch = Math.max(5, wh * 0.16);
    const crownBox = buildExtrudedBoxPolygons(wx, wy, cw, cd, wh, wh + ch);
    crownFaces = {
      left: crownBox.leftFacePolygon,
      right: crownBox.rightFacePolygon,
      top: crownBox.topFacePolygon,
    };
    const spireBase = projectIso(wx, wy, wh + ch);
    const spireTip = projectIso(wx, wy, wh + ch + 7);
    roofLines.push({
      x1: spireBase.sx,
      y1: spireBase.sy,
      x2: spireTip.sx,
      y2: spireTip.sy,
    });
  } else if (family === 'industrial_warehouse') {
    detailType = 'sawtooth';
    for (let frac = -0.28; frac <= 0.3; frac += 0.28) {
      const r1 = projectIso(wx - ww * 0.36, wy + wd * frac, wh + 1.2);
      const r2 = projectIso(wx + ww * 0.36, wy + wd * frac, wh + 1.2);
      roofLines.push({ x1: r1.sx, y1: r1.sy, x2: r2.sx, y2: r2.sy });
    }
  } else if (family === 'transit_station') {
    detailType = 'canopy';
    const s1 = projectIso(wx - ww * 0.34, wy, wh + 1.4);
    const s2 = projectIso(wx + ww * 0.34, wy, wh + 1.4);
    roofLines.push({ x1: s1.sx, y1: s1.sy, x2: s2.sx, y2: s2.sy });
    const cBox = buildExtrudedBoxPolygons(wx, wy, ww * 0.68, wd * 0.38, wh, wh + 2.4);
    roofAccents.push({ points: cBox.topFacePolygon, fill: '#E2E6E4' });
  } else if (family === 'distribution_facility') {
    detailType = 'solar';
    for (const offset of [-0.22, 0.22]) {
      const panel = buildExtrudedBoxPolygons(
        wx + ww * offset,
        wy,
        ww * 0.3,
        wd * 0.58,
        wh,
        wh + 1.1
      );
      roofAccents.push({ points: panel.topFacePolygon, fill: '#D5DDD9' });
    }
  } else if (family === 'utility_substation') {
    detailType = 'gantry';
    const g1 = projectIso(wx - ww * 0.25, wy - wd * 0.2, wh);
    const g2 = projectIso(wx - ww * 0.25, wy - wd * 0.2, wh + 6);
    const g3 = projectIso(wx + ww * 0.25, wy - wd * 0.2, wh + 6);
    const g4 = projectIso(wx + ww * 0.25, wy - wd * 0.2, wh);
    roofLines.push(
      { x1: g1.sx, y1: g1.sy, x2: g2.sx, y2: g2.sy },
      { x1: g2.sx, y1: g2.sy, x2: g3.sx, y2: g3.sy },
      { x1: g3.sx, y1: g3.sy, x2: g4.sx, y2: g4.sy }
    );
  } else {
    detailType = 'hvac';
    const hvac = buildExtrudedBoxPolygons(
      wx - ww * 0.16,
      wy - wd * 0.12,
      ww * 0.28,
      wd * 0.28,
      wh,
      wh + 2.5
    );
    roofAccents.push({ points: hvac.topFacePolygon, fill: '#E4E5E0' });
  }

  const topCenter = projectIso(wx, wy, wh + 2);
  const depth = wx * 0.35 + wy * 1.0;

  return {
    id,
    districtId,
    family,
    label,
    wx,
    wy,
    ww,
    wd,
    wh,
    depth,
    shadowPolygon: box.shadowPolygon,
    leftFacePolygon: box.leftFacePolygon,
    rightFacePolygon: box.rightFacePolygon,
    topFacePolygon: box.topFacePolygon,
    parapetPolygon,
    crownFaces,
    roofDetails: {
      type: detailType,
      lines: roofLines,
      accents: roofAccents,
    },
    facadeLines,
    topCenter,
  };
}

let cachedCanonicalCity: CanonicalCity25D | null = null;

/**
 * Generates and caches the canonical 2.5D miniature city shared by Future A and Future B.
 */
export function getCanonicalCity25D(): CanonicalCity25D {
  if (cachedCanonicalCity) return cachedCanonicalCity;

  // Architectural base plinth
  const plinthBox = buildExtrudedBoxPolygons(0, 0, 328, 224, -8, 0);

  // Meridian River channel (y from -19 to +19 across x in [-164, 164])
  const rNW = projectIso(-164, -19, -2.5);
  const rNE = projectIso(164, -19, -2.5);
  const rSE = projectIso(164, 19, -2.5);
  const rSW = projectIso(-164, 19, -2.5);

  const rTopNW = projectIso(-164, -19, 0);
  const rTopNE = projectIso(164, -19, 0);
  const rTopSW = projectIso(-164, 19, 0);
  const rTopSE = projectIso(164, 19, 0);

  const riverFlowLines: string[] = [-10, -3, 4, 11].map((ry) => {
    const p1 = projectIso(-158, ry, -2.2);
    const p2 = projectIso(158, ry, -2.2);
    return `M ${p1.sx} ${p1.sy} L ${p2.sx} ${p2.sy}`;
  });

  // 6 Canonical Districts
  const rawDistricts: Array<{
    id: string;
    code: string;
    name: string;
    subtitle: string;
    bank: 'north' | 'south';
    wx: number;
    wy: number;
    ww: number;
    wd: number;
    hubX: number;
    hubY: number;
  }> = [
    {
      id: 'MIDTOWN',
      code: 'SEC-01',
      name: 'Midtown Core',
      subtitle: 'North-West Commercial & Transit Hub',
      bank: 'north',
      wx: -102,
      wy: -66,
      ww: 88,
      wd: 68,
      hubX: -98,
      hubY: -54,
    },
    {
      id: 'FINANCIAL_CBD',
      code: 'SEC-02',
      name: 'Financial CBD',
      subtitle: 'Central High-Density Tower Cluster',
      bank: 'north',
      wx: 0,
      wy: -68,
      ww: 92,
      wd: 70,
      hubX: 0,
      hubY: -52,
    },
    {
      id: 'EAST_HUB',
      code: 'SEC-03',
      name: 'East Civic & Tech Hub',
      subtitle: 'Medical, Research & Eastern Exchange',
      bank: 'north',
      wx: 104,
      wy: -66,
      ww: 86,
      wd: 68,
      hubX: 100,
      hubY: -54,
    },
    {
      id: 'WEST_HARBOR',
      code: 'SEC-04',
      name: 'West Harbor Logistics',
      subtitle: 'Intermodal Freight & Western Viaduct Gate',
      bank: 'south',
      wx: -104,
      wy: 66,
      ww: 88,
      wd: 68,
      hubX: -100,
      hubY: 54,
    },
    {
      id: 'SOUTH_PORT',
      code: 'SEC-05',
      name: 'South Port Terminal',
      subtitle: 'Central Causeway & Maritime Dispatch',
      bank: 'south',
      wx: 0,
      wy: 68,
      ww: 92,
      wd: 70,
      hubX: 0,
      hubY: 54,
    },
    {
      id: 'SOUTH_IND',
      code: 'SEC-06',
      name: 'South Industrial Grid',
      subtitle: 'Heavy Manufacturing & Freight Ring Hub',
      bank: 'south',
      wx: 104,
      wy: 66,
      ww: 86,
      wd: 68,
      hubX: 100,
      hubY: 54,
    },
  ];

  const districts: IsoDistrict25D[] = rawDistricts.map((d) => {
    const pad = buildExtrudedBoxPolygons(d.wx, d.wy, d.ww, d.wd, 0, 1.6);
    const labelPos = projectIso(d.wx, d.wy + (d.bank === 'north' ? -24 : 26), 2);
    const hubPos = projectIso(d.hubX, d.hubY, 2.5);
    return {
      id: d.id,
      code: d.code,
      name: d.name,
      subtitle: d.subtitle,
      bank: d.bank,
      wx: d.wx,
      wy: d.wy,
      ww: d.ww,
      wd: d.wd,
      plinthPolygon: pad.topFacePolygon,
      leftEdgePolygon: pad.leftFacePolygon,
      rightEdgePolygon: pad.rightFacePolygon,
      labelPos,
      hubPos,
      worldHub: { x: d.hubX, y: d.hubY, z: 2.5 },
    };
  });

  // 3 Bridges across the Meridian River
  const bridgeSpecs: Array<{
    id: string;
    code: string;
    name: string;
    shortName: string;
    isPrimaryClosureTarget: boolean;
    corridorId: string;
    wx: number;
    width: number;
  }> = [
    {
      id: 'BRIDGE_WEST',
      code: 'BRG-01',
      name: 'West Bypass Viaduct',
      shortName: 'West Viaduct',
      isPrimaryClosureTarget: false,
      corridorId: 'CORRIDOR_WEST_VIADUCT',
      wx: -100,
      width: 15,
    },
    {
      id: 'BRIDGE_CENTRAL',
      code: 'BRG-02',
      name: 'Meridian Central Bridge',
      shortName: 'Central Bridge',
      isPrimaryClosureTarget: true,
      corridorId: 'CORRIDOR_CENTRAL_BRIDGE',
      wx: 0,
      width: 18,
    },
    {
      id: 'BRIDGE_EAST',
      code: 'BRG-03',
      name: 'East Innovation Crossing',
      shortName: 'East Crossing',
      isPrimaryClosureTarget: false,
      corridorId: 'CORRIDOR_EAST_CROSSING',
      wx: 100,
      width: 15,
    },
  ];

  const bridges: IsoBridge25D[] = bridgeSpecs.map((b) => {
    const wyStart = -24;
    const wyEnd = 24;
    const deck = buildExtrudedBoxPolygons(b.wx, 0, b.width, wyEnd - wyStart, 1.2, 4.2);
    const pier1 = buildExtrudedBoxPolygons(b.wx, -9, b.width * 0.82, 4.5, -2.5, 1.5);
    const pier2 = buildExtrudedBoxPolygons(b.wx, 9, b.width * 0.82, 4.5, -2.5, 1.5);

    // Bridge arch / truss lines on both sides of the span
    const trussLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    for (const side of [-1, 1]) {
      const xEdge = b.wx + (b.width * 0.45) * side;
      const pNorth = projectIso(xEdge, -20, 4.2);
      const pMidN = projectIso(xEdge, -8, b.isPrimaryClosureTarget ? 12.5 : 9.5);
      const pMidS = projectIso(xEdge, 8, b.isPrimaryClosureTarget ? 12.5 : 9.5);
      const pSouth = projectIso(xEdge, 20, 4.2);

      const dMidN = projectIso(xEdge, -8, 4.2);
      const dMidS = projectIso(xEdge, 8, 4.2);

      trussLines.push(
        { x1: pNorth.sx, y1: pNorth.sy, x2: pMidN.sx, y2: pMidN.sy },
        { x1: pMidN.sx, y1: pMidN.sy, x2: pMidS.sx, y2: pMidS.sy },
        { x1: pMidS.sx, y1: pMidS.sy, x2: pSouth.sx, y2: pSouth.sy },
        { x1: dMidN.sx, y1: dMidN.sy, x2: pMidN.sx, y2: pMidN.sy },
        { x1: dMidS.sx, y1: dMidS.sy, x2: pMidS.sx, y2: pMidS.sy }
      );
    }

    return {
      id: b.id,
      code: b.code,
      name: b.name,
      shortName: b.shortName,
      isPrimaryClosureTarget: b.isPrimaryClosureTarget,
      corridorId: b.corridorId,
      wx: b.wx,
      wyStart,
      wyEnd,
      width: b.width,
      deckPolygon: deck.topFacePolygon,
      sideFacePolygon: `${deck.leftFacePolygon} ${deck.rightFacePolygon}`,
      shadowPolygon: deck.shadowPolygon,
      pierPolygons: [pier1.leftFacePolygon, pier1.rightFacePolygon, pier2.leftFacePolygon, pier2.rightFacePolygon],
      trussLines,
      centerPos: projectIso(b.wx, 0, 5.5),
    };
  });

  // 11 Coherent Road & Infrastructure Corridors
  const corridorDefs: Array<{
    id: string;
    name: string;
    shortLabel: string;
    kind: IsoCorridor25D['kind'];
    bridgeId?: string;
    fromDistrictId: string;
    toDistrictId: string;
    strokeWidth: number;
    waypoints: WorldPoint3D[];
  }> = [
    {
      id: 'CORRIDOR_CENTRAL_BRIDGE',
      name: 'Meridian Central Bridge Corridor',
      shortLabel: 'Central Bridge',
      kind: 'bridge',
      bridgeId: 'BRIDGE_CENTRAL',
      fromDistrictId: 'SOUTH_PORT',
      toDistrictId: 'FINANCIAL_CBD',
      strokeWidth: 6.5,
      waypoints: [
        { x: 0, y: 42, z: 2.2 },
        { x: 0, y: 22, z: 3.8 },
        { x: 0, y: 0, z: 4.5 },
        { x: 0, y: -22, z: 3.8 },
        { x: 0, y: -42, z: 2.2 },
      ],
    },
    {
      id: 'CORRIDOR_WEST_VIADUCT',
      name: 'West Bypass Viaduct Corridor',
      shortLabel: 'West Viaduct',
      kind: 'bridge',
      bridgeId: 'BRIDGE_WEST',
      fromDistrictId: 'WEST_HARBOR',
      toDistrictId: 'MIDTOWN',
      strokeWidth: 5.5,
      waypoints: [
        { x: -100, y: 52, z: 2.2 },
        { x: -100, y: 22, z: 3.8 },
        { x: -100, y: 0, z: 4.4 },
        { x: -100, y: -22, z: 3.8 },
        { x: -100, y: -52, z: 2.2 },
      ],
    },
    {
      id: 'CORRIDOR_EAST_CROSSING',
      name: 'East Innovation Crossing Corridor',
      shortLabel: 'East Crossing',
      kind: 'bridge',
      bridgeId: 'BRIDGE_EAST',
      fromDistrictId: 'SOUTH_IND',
      toDistrictId: 'EAST_HUB',
      strokeWidth: 5.5,
      waypoints: [
        { x: 100, y: 52, z: 2.2 },
        { x: 100, y: 22, z: 3.8 },
        { x: 100, y: 0, z: 4.4 },
        { x: 100, y: -22, z: 3.8 },
        { x: 100, y: -52, z: 2.2 },
      ],
    },
    {
      id: 'CORRIDOR_MIDTOWN_APPROACH',
      name: 'North Central Bridge Approach',
      shortLabel: 'CBD Approach',
      kind: 'collector',
      fromDistrictId: 'FINANCIAL_CBD',
      toDistrictId: 'FINANCIAL_CBD',
      strokeWidth: 5,
      waypoints: [
        { x: -34, y: -52, z: 2.0 },
        { x: 0, y: -52, z: 2.2 },
        { x: 0, y: -36, z: 2.5 },
      ],
    },
    {
      id: 'CORRIDOR_PORT_APPROACH',
      name: 'South Port Bridge Causeway',
      shortLabel: 'Port Causeway',
      kind: 'collector',
      fromDistrictId: 'SOUTH_PORT',
      toDistrictId: 'SOUTH_PORT',
      strokeWidth: 5,
      waypoints: [
        { x: -34, y: 52, z: 2.0 },
        { x: 0, y: 52, z: 2.2 },
        { x: 0, y: 36, z: 2.5 },
      ],
    },
    {
      id: 'CORRIDOR_NORTH_ARTERIAL_WEST',
      name: 'Midtown — CBD Crosstown Arterial',
      shortLabel: 'Midtown Arterial',
      kind: 'arterial',
      fromDistrictId: 'MIDTOWN',
      toDistrictId: 'FINANCIAL_CBD',
      strokeWidth: 5,
      waypoints: [
        { x: -100, y: -52, z: 2.0 },
        { x: -52, y: -52, z: 2.0 },
        { x: 0, y: -52, z: 2.0 },
      ],
    },
    {
      id: 'CORRIDOR_NORTH_ARTERIAL_EAST',
      name: 'CBD — East Hub Exchange Arterial',
      shortLabel: 'East Exchange',
      kind: 'arterial',
      fromDistrictId: 'FINANCIAL_CBD',
      toDistrictId: 'EAST_HUB',
      strokeWidth: 5,
      waypoints: [
        { x: 0, y: -52, z: 2.0 },
        { x: 52, y: -52, z: 2.0 },
        { x: 100, y: -52, z: 2.0 },
      ],
    },
    {
      id: 'CORRIDOR_SOUTH_ARTERIAL_WEST',
      name: 'West Harbor — South Port Causeway',
      shortLabel: 'Harbor Causeway',
      kind: 'arterial',
      fromDistrictId: 'WEST_HARBOR',
      toDistrictId: 'SOUTH_PORT',
      strokeWidth: 5,
      waypoints: [
        { x: -100, y: 52, z: 2.0 },
        { x: -52, y: 52, z: 2.0 },
        { x: 0, y: 52, z: 2.0 },
      ],
    },
    {
      id: 'CORRIDOR_SOUTH_ARTERIAL_EAST',
      name: 'South Port — Industrial Arterial',
      shortLabel: 'Industrial Way',
      kind: 'arterial',
      fromDistrictId: 'SOUTH_PORT',
      toDistrictId: 'SOUTH_IND',
      strokeWidth: 5,
      waypoints: [
        { x: 0, y: 52, z: 2.0 },
        { x: 52, y: 52, z: 2.0 },
        { x: 100, y: 52, z: 2.0 },
      ],
    },
    {
      id: 'CORRIDOR_TRANSIT_EXPRESS',
      name: 'Meridian Cross-River Transit Spine',
      shortLabel: 'Transit Spine',
      kind: 'transit',
      fromDistrictId: 'WEST_HARBOR',
      toDistrictId: 'EAST_HUB',
      strokeWidth: 4,
      waypoints: [
        { x: -100, y: 66, z: 3.2 },
        { x: -100, y: -66, z: 3.6 },
        { x: 0, y: -66, z: 3.6 },
        { x: 100, y: -66, z: 3.6 },
      ],
    },
    {
      id: 'CORRIDOR_FREIGHT_RING',
      name: 'Southern & Eastern Logistics Ring',
      shortLabel: 'Freight Ring',
      kind: 'freight',
      fromDistrictId: 'WEST_HARBOR',
      toDistrictId: 'EAST_HUB',
      strokeWidth: 4.2,
      waypoints: [
        { x: -100, y: 82, z: 2.4 },
        { x: 0, y: 82, z: 2.4 },
        { x: 100, y: 82, z: 2.4 },
        { x: 100, y: -52, z: 3.6 },
      ],
    },
  ];

  const corridors: IsoCorridor25D[] = corridorDefs.map((c) => {
    const projectedPoints = c.waypoints.map((w) => projectIso(w.x, w.y, w.z));
    const elevatedPoints = c.waypoints.map((w) => projectIso(w.x, w.y, w.z + 5));
    const svgPath = projectedPoints
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.sx} ${p.sy}`)
      .join(' ');
    const elevatedSvgPath = elevatedPoints
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.sx} ${p.sy}`)
      .join(' ');
    const midIdx = Math.floor(projectedPoints.length / 2);
    return {
      id: c.id,
      name: c.name,
      shortLabel: c.shortLabel,
      kind: c.kind,
      bridgeId: c.bridgeId,
      fromDistrictId: c.fromDistrictId,
      toDistrictId: c.toDistrictId,
      waypoints: c.waypoints,
      projectedPoints,
      svgPath,
      elevatedSvgPath,
      strokeWidth: c.strokeWidth,
      midPoint: projectedPoints[midIdx],
    };
  });

  // 48 Canonical Extruded 2.5D Buildings (8 per district across all 6 districts)
  const buildingSpecs: Array<{
    id: string;
    districtId: string;
    family: ArchitecturalBuildingFamily;
    wx: number;
    wy: number;
    ww: number;
    wd: number;
    wh: number;
    label?: string;
  }> = [
    // MIDTOWN (8 buildings)
    { id: 'BLD-MID-01', districtId: 'MIDTOWN', family: 'commercial_tower', wx: -126, wy: -86, ww: 15, wd: 14, wh: 44, label: 'Midtown West Tower' },
    { id: 'BLD-MID-02', districtId: 'MIDTOWN', family: 'commercial_tower', wx: -102, wy: -88, ww: 16, wd: 15, wh: 52 },
    { id: 'BLD-MID-03', districtId: 'MIDTOWN', family: 'midrise_block', wx: -76, wy: -84, ww: 16, wd: 14, wh: 30 },
    { id: 'BLD-MID-04', districtId: 'MIDTOWN', family: 'transit_station', wx: -122, wy: -64, ww: 18, wd: 14, wh: 18, label: 'Midtown Rail Hub' },
    { id: 'BLD-MID-05', districtId: 'MIDTOWN', family: 'midrise_block', wx: -80, wy: -64, ww: 15, wd: 13, wh: 26 },
    { id: 'BLD-MID-06', districtId: 'MIDTOWN', family: 'midrise_block', wx: -126, wy: -40, ww: 14, wd: 12, wh: 24 },
    { id: 'BLD-MID-07', districtId: 'MIDTOWN', family: 'utility_substation', wx: -78, wy: -38, ww: 13, wd: 12, wh: 15 },
    { id: 'BLD-MID-08', districtId: 'MIDTOWN', family: 'commercial_tower', wx: -102, wy: -36, ww: 14, wd: 12, wh: 34 },

    // FINANCIAL_CBD (8 buildings - tallest skyline cluster)
    { id: 'BLD-CBD-01', districtId: 'FINANCIAL_CBD', family: 'commercial_tower', wx: -28, wy: -88, ww: 16, wd: 15, wh: 64 },
    { id: 'BLD-CBD-02', districtId: 'FINANCIAL_CBD', family: 'commercial_tower', wx: -4, wy: -90, ww: 18, wd: 16, wh: 76, label: 'Meridian Exchange Spire' },
    { id: 'BLD-CBD-03', districtId: 'FINANCIAL_CBD', family: 'commercial_tower', wx: 24, wy: -86, ww: 16, wd: 15, wh: 58 },
    { id: 'BLD-CBD-04', districtId: 'FINANCIAL_CBD', family: 'midrise_block', wx: -32, wy: -66, ww: 15, wd: 14, wh: 40 },
    { id: 'BLD-CBD-05', districtId: 'FINANCIAL_CBD', family: 'transit_station', wx: 0, wy: -68, ww: 19, wd: 14, wh: 22, label: 'Central Exchange Station' },
    { id: 'BLD-CBD-06', districtId: 'FINANCIAL_CBD', family: 'commercial_tower', wx: 28, wy: -64, ww: 15, wd: 14, wh: 48 },
    { id: 'BLD-CBD-07', districtId: 'FINANCIAL_CBD', family: 'midrise_block', wx: -24, wy: -38, ww: 14, wd: 12, wh: 32 },
    { id: 'BLD-CBD-08', districtId: 'FINANCIAL_CBD', family: 'midrise_block', wx: 24, wy: -38, ww: 14, wd: 12, wh: 30 },

    // EAST_HUB (8 buildings - tech, hospital, civic distribution)
    { id: 'BLD-EAST-01', districtId: 'EAST_HUB', family: 'commercial_tower', wx: 78, wy: -86, ww: 15, wd: 14, wh: 46 },
    { id: 'BLD-EAST-02', districtId: 'EAST_HUB', family: 'midrise_block', wx: 104, wy: -88, ww: 18, wd: 15, wh: 38, label: 'East Medical Center' },
    { id: 'BLD-EAST-03', districtId: 'EAST_HUB', family: 'commercial_tower', wx: 128, wy: -84, ww: 15, wd: 14, wh: 42 },
    { id: 'BLD-EAST-04', districtId: 'EAST_HUB', family: 'distribution_facility', wx: 76, wy: -64, ww: 16, wd: 14, wh: 20 },
    { id: 'BLD-EAST-05', districtId: 'EAST_HUB', family: 'transit_station', wx: 124, wy: -64, ww: 17, wd: 14, wh: 18, label: 'East Tech Transit Hub' },
    { id: 'BLD-EAST-06', districtId: 'EAST_HUB', family: 'midrise_block', wx: 78, wy: -38, ww: 14, wd: 12, wh: 26 },
    { id: 'BLD-EAST-07', districtId: 'EAST_HUB', family: 'utility_substation', wx: 126, wy: -38, ww: 14, wd: 12, wh: 16 },
    { id: 'BLD-EAST-08', districtId: 'EAST_HUB', family: 'midrise_block', wx: 102, wy: -36, ww: 15, wd: 12, wh: 28 },

    // WEST_HARBOR (8 buildings - intermodal logistics, warehouses, port gate)
    { id: 'BLD-WHB-01', districtId: 'WEST_HARBOR', family: 'distribution_facility', wx: -126, wy: 38, ww: 18, wd: 14, wh: 18, label: 'Harbor Cold-Chain Dock' },
    { id: 'BLD-WHB-02', districtId: 'WEST_HARBOR', family: 'midrise_block', wx: -78, wy: 38, ww: 15, wd: 13, wh: 26 },
    { id: 'BLD-WHB-03', districtId: 'WEST_HARBOR', family: 'transit_station', wx: -124, wy: 64, ww: 17, wd: 14, wh: 17 },
    { id: 'BLD-WHB-04', districtId: 'WEST_HARBOR', family: 'industrial_warehouse', wx: -78, wy: 64, ww: 18, wd: 14, wh: 19 },
    { id: 'BLD-WHB-05', districtId: 'WEST_HARBOR', family: 'distribution_facility', wx: -126, wy: 88, ww: 20, wd: 15, wh: 16 },
    { id: 'BLD-WHB-06', districtId: 'WEST_HARBOR', family: 'industrial_warehouse', wx: -100, wy: 90, ww: 19, wd: 15, wh: 20 },
    { id: 'BLD-WHB-07', districtId: 'WEST_HARBOR', family: 'utility_substation', wx: -74, wy: 88, ww: 14, wd: 13, wh: 15 },
    { id: 'BLD-WHB-08', districtId: 'WEST_HARBOR', family: 'commercial_tower', wx: -102, wy: 36, ww: 14, wd: 12, wh: 32 },

    // SOUTH_PORT (8 buildings - central port terminal & causeway dispatch)
    { id: 'BLD-SPT-01', districtId: 'SOUTH_PORT', family: 'midrise_block', wx: -26, wy: 38, ww: 15, wd: 13, wh: 28 },
    { id: 'BLD-SPT-02', districtId: 'SOUTH_PORT', family: 'midrise_block', wx: 26, wy: 38, ww: 15, wd: 13, wh: 26 },
    { id: 'BLD-SPT-03', districtId: 'SOUTH_PORT', family: 'distribution_facility', wx: -30, wy: 66, ww: 18, wd: 14, wh: 20 },
    { id: 'BLD-SPT-04', districtId: 'SOUTH_PORT', family: 'transit_station', wx: 0, wy: 68, ww: 18, wd: 14, wh: 19, label: 'South Port Dispatch' },
    { id: 'BLD-SPT-05', districtId: 'SOUTH_PORT', family: 'industrial_warehouse', wx: 30, wy: 66, ww: 18, wd: 14, wh: 20 },
    { id: 'BLD-SPT-06', districtId: 'SOUTH_PORT', family: 'industrial_warehouse', wx: -28, wy: 90, ww: 19, wd: 15, wh: 18 },
    { id: 'BLD-SPT-07', districtId: 'SOUTH_PORT', family: 'distribution_facility', wx: 0, wy: 92, ww: 20, wd: 15, wh: 17 },
    { id: 'BLD-SPT-08', districtId: 'SOUTH_PORT', family: 'utility_substation', wx: 28, wy: 90, ww: 15, wd: 13, wh: 15 },

    // SOUTH_IND (8 buildings - heavy industrial & eastern logistics gate)
    { id: 'BLD-SIN-01', districtId: 'SOUTH_IND', family: 'midrise_block', wx: 78, wy: 38, ww: 15, wd: 13, wh: 25 },
    { id: 'BLD-SIN-02', districtId: 'SOUTH_IND', family: 'commercial_tower', wx: 124, wy: 38, ww: 15, wd: 13, wh: 34 },
    { id: 'BLD-SIN-03', districtId: 'SOUTH_IND', family: 'industrial_warehouse', wx: 78, wy: 64, ww: 18, wd: 14, wh: 19 },
    { id: 'BLD-SIN-04', districtId: 'SOUTH_IND', family: 'distribution_facility', wx: 126, wy: 64, ww: 18, wd: 14, wh: 20, label: 'East Freight Consolidation' },
    { id: 'BLD-SIN-05', districtId: 'SOUTH_IND', family: 'industrial_warehouse', wx: 76, wy: 88, ww: 19, wd: 15, wh: 18 },
    { id: 'BLD-SIN-06', districtId: 'SOUTH_IND', family: 'distribution_facility', wx: 102, wy: 90, ww: 20, wd: 15, wh: 17 },
    { id: 'BLD-SIN-07', districtId: 'SOUTH_IND', family: 'utility_substation', wx: 128, wy: 88, ww: 15, wd: 13, wh: 16 },
    { id: 'BLD-SIN-08', districtId: 'SOUTH_IND', family: 'midrise_block', wx: 102, wy: 36, ww: 14, wd: 12, wh: 24 },
  ];

  const buildings = buildingSpecs
    .map((b) =>
      createBuilding25D(
        b.id,
        b.districtId,
        b.family,
        b.wx,
        b.wy,
        b.ww,
        b.wd,
        b.wh,
        b.label
      )
    )
    .sort((a, b) => a.depth - b.depth);

  cachedCanonicalCity = {
    viewBoxWidth: 720,
    viewBoxHeight: 420,
    plinthTopPolygon: plinthBox.topFacePolygon,
    plinthLeftPolygon: plinthBox.leftFacePolygon,
    plinthRightPolygon: plinthBox.rightFacePolygon,
    riverWaterPolygon: ptsToPolygon([rNW, rNE, rSE, rSW]),
    riverNorthBankPolygon: ptsToPolygon([rTopNW, rTopNE, rNE, rNW]),
    riverSouthBankPolygon: ptsToPolygon([rSW, rSE, rTopSE, rTopSW]),
    riverFlowLines,
    districts,
    bridges,
    corridors,
    buildings,
  };

  return cachedCanonicalCity;
}

export function formatParallelTime(minutes: number): string {
  const clamped = Math.max(0, Math.min(1439, Math.round(minutes)));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function sampleAlongProjectedPolyline(
  points: IsoPoint2D[],
  tNormalized: number
): { sx: number; sy: number; dx: number; dy: number } {
  if (points.length === 0) return { sx: 0, sy: 0, dx: 1, dy: 0 };
  if (points.length === 1) return { sx: points[0].sx, sy: points[0].sy, dx: 1, dy: 0 };

  const t = ((tNormalized % 1) + 1) % 1;
  const segLengths: number[] = [];
  let totalLen = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].sx - points[i].sx;
    const dy = points[i + 1].sy - points[i].sy;
    const len = Math.hypot(dx, dy);
    segLengths.push(len);
    totalLen += len;
  }

  if (totalLen <= 0.001) {
    return { sx: points[0].sx, sy: points[0].sy, dx: 1, dy: 0 };
  }

  let targetDist = t * totalLen;
  for (let i = 0; i < segLengths.length; i++) {
    const segLen = segLengths[i];
    if (targetDist <= segLen || i === segLengths.length - 1) {
      const localT = segLen > 0 ? Math.max(0, Math.min(1, targetDist / segLen)) : 0;
      const p0 = points[i];
      const p1 = points[i + 1];
      const dx = p1.sx - p0.sx;
      const dy = p1.sy - p0.sy;
      const norm = Math.hypot(dx, dy) || 1;
      return {
        sx: Number((p0.sx + dx * localT).toFixed(2)),
        sy: Number((p0.sy + dy * localT).toFixed(2)),
        dx: Number((dx / norm).toFixed(3)),
        dy: Number((dy / norm).toFixed(3)),
      };
    }
    targetDist -= segLen;
  }

  const last = points[points.length - 1];
  return { sx: last.sx, sy: last.sy, dx: 1, dy: 0 };
}

function buildElevatedArcPath(from: WorldPoint3D, to: WorldPoint3D, apexZ: number): string {
  const pStart = projectIso(from.x, from.y, from.z + 12);
  const pEnd = projectIso(to.x, to.y, to.z + 12);
  const midX = (from.x + to.x) * 0.5;
  const midY = (from.y + to.y) * 0.5;
  const pCtrl = projectIso(midX, midY, apexZ);
  return `M ${pStart.sx} ${pStart.sy} Q ${pCtrl.sx} ${pCtrl.sy} ${pEnd.sx} ${pEnd.sy}`;
}

/**
 * Pure deterministic simulation evaluator for Section 04 (07:00 to 10:00 morning disruption window).
 * Guarantees:
 * - Future A (Baseline) is completely independent of `intervention`.
 * - After 07:30 (timeMinutes >= 450), `CORRIDOR_CENTRAL_BRIDGE` is closed and has ZERO moving vehicles in both futures.
 * - Future B (Alternative) adapts road flows, vehicle types, elevated arcs, metrics, and observations based on `intervention`.
 */
const PARALLEL_FUTURES_STATE_CACHE = new Map<string, ParallelFuturesComparisonState>();
const ENTITY_COMPARISON_CACHE = new Map<string, EntityComparisonInspection>();

let futuresCacheHits = 0;
let futuresCacheMisses = 0;

export function getParallelFuturesCacheStats() {
  return {
    stateCacheSize: PARALLEL_FUTURES_STATE_CACHE.size,
    entityCacheSize: ENTITY_COMPARISON_CACHE.size,
    hits: futuresCacheHits,
    misses: futuresCacheMisses,
  };
}

export function clearParallelFuturesCache() {
  PARALLEL_FUTURES_STATE_CACHE.clear();
  ENTITY_COMPARISON_CACHE.clear();
  futuresCacheHits = 0;
  futuresCacheMisses = 0;
}

export function evaluateParallelFuturesState(
  rawTimeMinutes: number,
  intervention: InterventionStrategy
): ParallelFuturesComparisonState {
  const timeMinutes = Math.max(
    PARALLEL_FUTURES_START_MIN,
    Math.min(PARALLEL_FUTURES_END_MIN, Math.round(rawTimeMinutes))
  );

  const cacheKey = `${timeMinutes}:${intervention}`;
  const cachedState = PARALLEL_FUTURES_STATE_CACHE.get(cacheKey);
  if (cachedState) {
    futuresCacheHits++;
    return cachedState;
  }
  futuresCacheMisses++;

  const city = getCanonicalCity25D();
  const timeFormatted = formatParallelTime(timeMinutes);
  const closureActive = timeMinutes >= PARALLEL_FUTURES_CLOSURE_MIN;
  const minutesSinceClosure = closureActive
    ? timeMinutes - PARALLEL_FUTURES_CLOSURE_MIN
    : 0;

  // Normalized progression after 07:30 closure (0 at 07:30, 1 at 09:15, sustained/recovering to 10:00)
  const postClosureRamp = closureActive
    ? Math.min(1, minutesSinceClosure / 90)
    : 0;
  // Slight late-morning stabilization after 09:15 (555 min)
  const recoveryFactor =
    timeMinutes > 555 ? (timeMinutes - 555) / 45 : 0;

  // Pre-closure warm-up (07:00 to 07:30)
  const preClosureWarmup = !closureActive
    ? (timeMinutes - PARALLEL_FUTURES_START_MIN) / 30
    : 1;

  // -------------------------------------------------------------------------
  // 1. FUTURE A — BASELINE (WITHOUT INTERVENTION)
  //    Strictly independent of `intervention`!
  // -------------------------------------------------------------------------
  const baselineCorridors: Record<string, CorridorRuntimeState> = {};
  for (const cor of city.corridors) {
    let closed = false;
    let congestion = 0.22 + preClosureWarmup * 0.06;
    let flowRate = 48;
    let statusTag: CorridorRuntimeState['statusTag'] = 'OPEN';
    let highlightLevel: CorridorRuntimeState['highlightLevel'] = 'neutral';
    const queueClusters: Array<{ sx: number; sy: number; intensity: number }> = [];

    if (cor.id === 'CORRIDOR_CENTRAL_BRIDGE') {
      if (closureActive) {
        closed = true;
        congestion = 1.0;
        flowRate = 0;
        statusTag = 'CLOSED';
        highlightLevel = 'closed';
      } else {
        congestion = 0.34 + preClosureWarmup * 0.08;
        flowRate = 82;
      }
    } else if (
      cor.id === 'CORRIDOR_MIDTOWN_APPROACH' ||
      cor.id === 'CORRIDOR_PORT_APPROACH'
    ) {
      if (closureActive) {
        congestion = Math.min(0.98, 0.58 + postClosureRamp * 0.38);
        flowRate = Math.round(18 + (1 - postClosureRamp) * 22);
        statusTag = 'CONGESTED';
        highlightLevel = 'disrupted';
        const qPt1 = sampleAlongProjectedPolyline(cor.projectedPoints, 0.35);
        const qPt2 = sampleAlongProjectedPolyline(cor.projectedPoints, 0.78);
        queueClusters.push(
          { sx: qPt1.sx, sy: qPt1.sy, intensity: congestion },
          { sx: qPt2.sx, sy: qPt2.sy, intensity: congestion }
        );
      } else {
        congestion = 0.28 + preClosureWarmup * 0.06;
        flowRate = 64;
      }
    } else if (
      cor.id === 'CORRIDOR_NORTH_ARTERIAL_WEST' ||
      cor.id === 'CORRIDOR_SOUTH_ARTERIAL_WEST' ||
      cor.id === 'CORRIDOR_NORTH_ARTERIAL_EAST' ||
      cor.id === 'CORRIDOR_SOUTH_ARTERIAL_EAST'
    ) {
      if (closureActive) {
        const isWest = cor.id.endsWith('WEST');
        congestion = Math.min(
          0.92,
          (isWest ? 0.52 : 0.46) + postClosureRamp * (isWest ? 0.38 : 0.34) - recoveryFactor * 0.05
        );
        flowRate = Math.round(74 + postClosureRamp * 18);
        statusTag = 'CONGESTED';
        highlightLevel = 'disrupted';
        const qPt = sampleAlongProjectedPolyline(cor.projectedPoints, 0.52);
        queueClusters.push({ sx: qPt.sx, sy: qPt.sy, intensity: congestion });
      } else {
        congestion = 0.26 + preClosureWarmup * 0.05;
        flowRate = 58;
      }
    } else if (
      cor.id === 'CORRIDOR_WEST_VIADUCT' ||
      cor.id === 'CORRIDOR_EAST_CROSSING'
    ) {
      if (closureActive) {
        // Uncoordinated spillover jams the approaches of alternate bridges
        const isWest = cor.id === 'CORRIDOR_WEST_VIADUCT';
        congestion = Math.min(
          0.9,
          (isWest ? 0.5 : 0.44) + postClosureRamp * (isWest ? 0.38 : 0.32)
        );
        flowRate = Math.round(78 + postClosureRamp * 16);
        statusTag = 'CONGESTED';
        highlightLevel = 'disrupted';
        const qPt = sampleAlongProjectedPolyline(cor.projectedPoints, 0.22);
        queueClusters.push({ sx: qPt.sx, sy: qPt.sy, intensity: congestion * 0.9 });
      } else {
        congestion = 0.28 + preClosureWarmup * 0.05;
        flowRate = 55;
      }
    } else {
      // Transit & Freight corridors in Baseline remain under-utilized / uncoordinated
      congestion = closureActive ? 0.48 + postClosureRamp * 0.22 : 0.22;
      flowRate = closureActive ? 42 : 40;
    }

    baselineCorridors[cor.id] = {
      corridorId: cor.id,
      closed,
      congestion: Number(congestion.toFixed(2)),
      flowRate,
      statusTag,
      highlightLevel,
      queueClusters,
    };
  }

  const baselineDistricts: Record<string, DistrictRuntimeState> = {};
  for (const dist of city.districts) {
    let pressure = 0.24 + preClosureWarmup * 0.05;
    let statusSummary = 'Nominal morning operations';
    if (closureActive) {
      if (dist.id === 'FINANCIAL_CBD' || dist.id === 'SOUTH_PORT') {
        pressure = Math.min(0.95, 0.62 + postClosureRamp * 0.32);
        statusSummary = 'Severe approach gridlock & spillover queues';
      } else if (dist.id === 'MIDTOWN' || dist.id === 'WEST_HARBOR') {
        pressure = Math.min(0.86, 0.5 + postClosureRamp * 0.34);
        statusSummary = 'Uncoordinated bypass overflow (+18m delay)';
      } else {
        pressure = Math.min(0.78, 0.44 + postClosureRamp * 0.28);
        statusSummary = 'Secondary arterial delay & late freight';
      }
    }
    baselineDistricts[dist.id] = {
      districtId: dist.id,
      pressure: Number(pressure.toFixed(2)),
      transitPulse: 0.15,
      freightActive: false,
      statusSummary,
    };
  }

  // Generate deterministic vehicles for Future A
  const baselineVehicles: VehicleMarker25D[] = [];
  const timePhase = (timeMinutes - PARALLEL_FUTURES_START_MIN) / 60;
  for (const cor of city.corridors) {
    const cState = baselineCorridors[cor.id];
    // NEVER place moving vehicles on a closed corridor!
    if (cState.closed) continue;
    if (cor.kind === 'transit' || cor.kind === 'freight') continue;

    const count =
      cor.kind === 'bridge'
        ? closureActive
          ? 5
          : 4
        : closureActive
          ? 4
          : 3;
    const speedFactor = closureActive ? Math.max(0.18, 1 - cState.congestion * 0.78) : 0.85;

    for (let i = 0; i < count; i++) {
      const baseOffset = i / count;
      const tPos = (baseOffset + timePhase * speedFactor * 0.55) % 1;
      const pos = sampleAlongProjectedPolyline(cor.projectedPoints, tPos);
      baselineVehicles.push({
        id: `VEH-A-${cor.id}-${i}`,
        corridorId: cor.id,
        vehicleType: i % 3 === 0 ? 'freight' : 'car',
        sx: pos.sx,
        sy: pos.sy,
        dx: pos.dx,
        dy: pos.dy,
        speedRatio: Number(speedFactor.toFixed(2)),
        state: closureActive && cState.congestion > 0.55 ? 'queued' : 'normal',
      });
    }
  }

  const baselineDelay = !closureActive
    ? Number((4.2 + preClosureWarmup * 0.9).toFixed(1))
    : Number((6.8 + postClosureRamp * 19.6 - recoveryFactor * 1.4).toFixed(1));
  const baselineCongestion = !closureActive
    ? Math.round(22 + preClosureWarmup * 5)
    : Math.round(36 + postClosureRamp * 48 - recoveryFactor * 4);
  const elapsedHours = (timeMinutes - PARALLEL_FUTURES_START_MIN) / 60;
  const baselineDeliveries = !closureActive
    ? Math.round(18 + elapsedHours * 64)
    : Math.round(50 + (minutesSinceClosure / 60) * (38 - postClosureRamp * 12));

  const baselineObservations: [string, string] = !closureActive
    ? [
        'All three cross-river bridges operating within nominal morning capacity.',
        'Cross-river freight and commuter flows concentrated on Meridian Central Bridge.',
      ]
    : [
        'Uncoordinated detour queues lock Central Bridge approaches and spill across Midtown & Port collectors.',
        'Secondary bottlenecks overload West Viaduct (+78% queue density) and stall cross-river freight dispatches.',
      ];

  const baselineState: FutureWorldState25D = {
    futureId: 'A',
    title: 'WITHOUT INTERVENTION',
    subtitle: 'Uncoordinated response · Reactive congestion cascade',
    timeMinutes,
    timeFormatted,
    bridgeClosed: closureActive,
    intervention,
    corridorStates: baselineCorridors,
    districtStates: baselineDistricts,
    vehicles: baselineVehicles,
    elevatedArcs: [],
    metrics: {
      avgTravelDelayMin: baselineDelay,
      congestionIndex: baselineCongestion,
      completedDeliveries: baselineDeliveries,
      transitSharePct: closureActive ? 24 : 26,
      corridorThroughputPct: closureActive ? Math.round(52 - postClosureRamp * 14) : 88,
    },
    observations: baselineObservations,
    systemHeadline: !closureActive
      ? 'NOMINAL BASELINE TOPOLOGY'
      : 'UNMITIGATED BRIDGE CLOSURE CASCADE',
  };

  // -------------------------------------------------------------------------
  // 2. FUTURE B — COORDINATED RESPONSE (ADAPTS TO `intervention`)
  // -------------------------------------------------------------------------
  const altCorridors: Record<string, CorridorRuntimeState> = {};
  for (const cor of city.corridors) {
    let closed = false;
    let congestion = 0.22 + preClosureWarmup * 0.06;
    let flowRate = 48;
    let statusTag: CorridorRuntimeState['statusTag'] = 'OPEN';
    let highlightLevel: CorridorRuntimeState['highlightLevel'] = 'neutral';

    if (cor.id === 'CORRIDOR_CENTRAL_BRIDGE') {
      if (closureActive) {
        closed = true;
        congestion = 1.0;
        flowRate = 0;
        statusTag = 'CLOSED';
        highlightLevel = 'closed';
      } else {
        congestion = 0.34 + preClosureWarmup * 0.08;
        flowRate = 82;
      }
    } else if (closureActive) {
      if (intervention === 'reroute_vehicles') {
        if (
          cor.id === 'CORRIDOR_WEST_VIADUCT' ||
          cor.id === 'CORRIDOR_EAST_CROSSING' ||
          cor.id === 'CORRIDOR_NORTH_ARTERIAL_WEST' ||
          cor.id === 'CORRIDOR_NORTH_ARTERIAL_EAST' ||
          cor.id === 'CORRIDOR_SOUTH_ARTERIAL_WEST' ||
          cor.id === 'CORRIDOR_SOUTH_ARTERIAL_EAST'
        ) {
          congestion = Number((0.34 + postClosureRamp * 0.1 - recoveryFactor * 0.06).toFixed(2));
          flowRate = Math.round(82 + postClosureRamp * 12);
          statusTag = 'REROUTED';
          highlightLevel = 'optimized';
        } else if (
          cor.id === 'CORRIDOR_MIDTOWN_APPROACH' ||
          cor.id === 'CORRIDOR_PORT_APPROACH'
        ) {
          congestion = Number((0.22 + postClosureRamp * 0.06).toFixed(2));
          flowRate = 24;
          statusTag = 'OPEN';
          highlightLevel = 'neutral';
        }
      } else if (intervention === 'increase_transit') {
        if (
          cor.id === 'CORRIDOR_TRANSIT_EXPRESS' ||
          cor.id === 'CORRIDOR_WEST_VIADUCT' ||
          cor.id === 'CORRIDOR_EAST_CROSSING'
        ) {
          congestion = Number((0.28 + postClosureRamp * 0.08 - recoveryFactor * 0.05).toFixed(2));
          flowRate = Math.round(88 + postClosureRamp * 10);
          statusTag = 'TRANSIT_SURGE';
          highlightLevel = 'optimized';
        } else if (cor.kind === 'arterial') {
          congestion = Number((0.3 + postClosureRamp * 0.08).toFixed(2));
          flowRate = 68;
          statusTag = 'OPEN';
          highlightLevel = 'optimized';
        } else {
          congestion = 0.2;
          flowRate = 22;
        }
      } else if (intervention === 'coordinate_deliveries') {
        if (
          cor.id === 'CORRIDOR_FREIGHT_RING' ||
          cor.id === 'CORRIDOR_EAST_CROSSING' ||
          cor.id === 'CORRIDOR_SOUTH_ARTERIAL_EAST' ||
          cor.id === 'CORRIDOR_NORTH_ARTERIAL_EAST'
        ) {
          congestion = Number((0.31 + postClosureRamp * 0.09 - recoveryFactor * 0.04).toFixed(2));
          flowRate = Math.round(86 + postClosureRamp * 11);
          statusTag = 'FREIGHT_SLOT';
          highlightLevel = 'optimized';
        } else if (cor.id === 'CORRIDOR_WEST_VIADUCT' || cor.id.endsWith('WEST')) {
          congestion = Number((0.35 + postClosureRamp * 0.1).toFixed(2));
          flowRate = 76;
          statusTag = 'REROUTED';
          highlightLevel = 'optimized';
        } else {
          congestion = 0.24;
          flowRate = 25;
        }
      }
    }

    altCorridors[cor.id] = {
      corridorId: cor.id,
      closed,
      congestion: Number(congestion.toFixed(2)),
      flowRate,
      statusTag,
      highlightLevel,
      queueClusters: [],
    };
  }

  const altDistricts: Record<string, DistrictRuntimeState> = {};
  for (const dist of city.districts) {
    let pressure = 0.24 + preClosureWarmup * 0.05;
    let transitPulse = 0.2;
    let freightActive = false;
    let statusSummary = 'Nominal morning operations';

    if (closureActive) {
      if (intervention === 'reroute_vehicles') {
        pressure = Number((0.32 + postClosureRamp * 0.08).toFixed(2));
        statusSummary =
          dist.id === 'MIDTOWN' || dist.id === 'EAST_HUB' || dist.id === 'WEST_HARBOR'
            ? 'Balanced bypass split absorbing diverted cross-river volume'
            : 'Approaches cleared via upstream dynamic impedance routing';
      } else if (intervention === 'increase_transit') {
        pressure = Number((0.28 + postClosureRamp * 0.07).toFixed(2));
        transitPulse =
          dist.id === 'MIDTOWN' ||
          dist.id === 'FINANCIAL_CBD' ||
          dist.id === 'EAST_HUB' ||
          dist.id === 'WEST_HARBOR'
            ? 0.92
            : 0.65;
        statusSummary = 'High-frequency transit surge (+45% headways) shifting commuter mode share';
      } else {
        pressure = Number((0.33 + postClosureRamp * 0.09).toFixed(2));
        freightActive =
          dist.id === 'WEST_HARBOR' ||
          dist.id === 'SOUTH_PORT' ||
          dist.id === 'SOUTH_IND' ||
          dist.id === 'EAST_HUB';
        statusSummary = freightActive
          ? 'Time-slotted logistics dispatch active on Eastern Crossing & Freight Ring'
          : 'Commuter lanes isolated from heavy port freight queues';
      }
    }

    altDistricts[dist.id] = {
      districtId: dist.id,
      pressure,
      transitPulse,
      freightActive,
      statusSummary,
    };
  }

  // Generate deterministic vehicles for Future B
  const altVehicles: VehicleMarker25D[] = [];
  for (const cor of city.corridors) {
    const cState = altCorridors[cor.id];
    // NEVER place moving vehicles on a closed corridor!
    if (cState.closed) continue;

    // Filter corridors based on active intervention
    if (cor.kind === 'transit' && intervention !== 'increase_transit') continue;
    if (cor.kind === 'freight' && intervention !== 'coordinate_deliveries') continue;
    if (
      closureActive &&
      (cor.id === 'CORRIDOR_MIDTOWN_APPROACH' || cor.id === 'CORRIDOR_PORT_APPROACH')
    ) {
      // Upstream routing keeps closed bridge approaches clear in Future B
      continue;
    }

    let count = 3;
    if (closureActive) {
      if (intervention === 'reroute_vehicles' && (cor.id === 'CORRIDOR_WEST_VIADUCT' || cor.id === 'CORRIDOR_EAST_CROSSING')) {
        count = 5;
      } else if (intervention === 'increase_transit' && cor.id === 'CORRIDOR_TRANSIT_EXPRESS') {
        count = 6;
      } else if (intervention === 'coordinate_deliveries' && cor.id === 'CORRIDOR_FREIGHT_RING') {
        count = 6;
      } else {
        count = 3;
      }
    }

    const speedFactor = closureActive ? 0.92 : 0.85;
    for (let i = 0; i < count; i++) {
      const baseOffset = i / count;
      const tPos = (baseOffset + timePhase * speedFactor * 0.65) % 1;
      const pos = sampleAlongProjectedPolyline(cor.projectedPoints, tPos);

      let vehicleType: VehicleMarker25D['vehicleType'] = 'car';
      if (cor.kind === 'transit' || (intervention === 'increase_transit' && i % 2 === 0)) {
        vehicleType = 'transit';
      } else if (cor.kind === 'freight' || (intervention === 'coordinate_deliveries' && i % 2 === 0)) {
        vehicleType = 'freight';
      }

      altVehicles.push({
        id: `VEH-B-${cor.id}-${i}`,
        corridorId: cor.id,
        vehicleType,
        sx: pos.sx,
        sy: pos.sy,
        dx: pos.dx,
        dy: pos.dy,
        speedRatio: speedFactor,
        state: closureActive && cState.highlightLevel === 'optimized' ? 'optimized' : 'normal',
      });
    }
  }

  // Elevated coordination data arcs for Future B when closure is active
  const districtMap = new Map(city.districts.map((d) => [d.id, d]));
  const elevatedArcs: ElevatedDataArc25D[] = [];
  if (closureActive) {
    if (intervention === 'reroute_vehicles') {
      const wh = districtMap.get('WEST_HARBOR')!;
      const mid = districtMap.get('MIDTOWN')!;
      const cbd = districtMap.get('FINANCIAL_CBD')!;
      const sin = districtMap.get('SOUTH_IND')!;
      const eh = districtMap.get('EAST_HUB')!;
      elevatedArcs.push(
        {
          id: 'ARC-REROUTE-WEST',
          fromDistrictId: 'WEST_HARBOR',
          toDistrictId: 'MIDTOWN',
          svgPath: buildElevatedArcPath(wh.worldHub, mid.worldHub, 46),
          label: 'WEST VIADUCT SPLIT (52%)',
          color: '#259A6C',
          active: true,
        },
        {
          id: 'ARC-REROUTE-EAST',
          fromDistrictId: 'SOUTH_IND',
          toDistrictId: 'EAST_HUB',
          svgPath: buildElevatedArcPath(sin.worldHub, eh.worldHub, 46),
          label: 'EAST CROSSING SPLIT (48%)',
          color: '#259A6C',
          active: true,
        },
        {
          id: 'ARC-REROUTE-CBD',
          fromDistrictId: 'MIDTOWN',
          toDistrictId: 'FINANCIAL_CBD',
          svgPath: buildElevatedArcPath(mid.worldHub, cbd.worldHub, 42),
          label: 'GREEN-WAVE SIGNAL SYNC',
          color: '#259A6C',
          active: true,
        }
      );
    } else if (intervention === 'increase_transit') {
      const wh = districtMap.get('WEST_HARBOR')!;
      const mid = districtMap.get('MIDTOWN')!;
      const cbd = districtMap.get('FINANCIAL_CBD')!;
      const eh = districtMap.get('EAST_HUB')!;
      elevatedArcs.push(
        {
          id: 'ARC-TRANSIT-1',
          fromDistrictId: 'WEST_HARBOR',
          toDistrictId: 'MIDTOWN',
          svgPath: buildElevatedArcPath(wh.worldHub, mid.worldHub, 50),
          label: 'EXPRESS RAIL SURGE (+45%)',
          color: '#259A6C',
          active: true,
        },
        {
          id: 'ARC-TRANSIT-2',
          fromDistrictId: 'MIDTOWN',
          toDistrictId: 'FINANCIAL_CBD',
          svgPath: buildElevatedArcPath(mid.worldHub, cbd.worldHub, 52),
          label: 'CBD METRO SHUTTLE',
          color: '#259A6C',
          active: true,
        },
        {
          id: 'ARC-TRANSIT-3',
          fromDistrictId: 'FINANCIAL_CBD',
          toDistrictId: 'EAST_HUB',
          svgPath: buildElevatedArcPath(cbd.worldHub, eh.worldHub, 50),
          label: 'CIVIC CORRIDOR PRIORITY',
          color: '#259A6C',
          active: true,
        }
      );
    } else {
      const wh = districtMap.get('WEST_HARBOR')!;
      const spt = districtMap.get('SOUTH_PORT')!;
      const sin = districtMap.get('SOUTH_IND')!;
      const eh = districtMap.get('EAST_HUB')!;
      elevatedArcs.push(
        {
          id: 'ARC-FREIGHT-1',
          fromDistrictId: 'WEST_HARBOR',
          toDistrictId: 'SOUTH_PORT',
          svgPath: buildElevatedArcPath(wh.worldHub, spt.worldHub, 44),
          label: 'PORT DISPATCH WINDOWING',
          color: '#259A6C',
          active: true,
        },
        {
          id: 'ARC-FREIGHT-2',
          fromDistrictId: 'SOUTH_PORT',
          toDistrictId: 'SOUTH_IND',
          svgPath: buildElevatedArcPath(spt.worldHub, sin.worldHub, 44),
          label: 'FREIGHT RING PLATOON',
          color: '#259A6C',
          active: true,
        },
        {
          id: 'ARC-FREIGHT-3',
          fromDistrictId: 'SOUTH_IND',
          toDistrictId: 'EAST_HUB',
          svgPath: buildElevatedArcPath(sin.worldHub, eh.worldHub, 48),
          label: 'COLD-CHAIN PRIORITY LANE',
          color: '#259A6C',
          active: true,
        }
      );
    }
  }

  // Distinct metrics & observations per intervention for Future B
  let altDelay = baselineDelay;
  let altCongestion = baselineCongestion;
  let altDeliveries = baselineDeliveries;
  let altTransitShare = 26;
  let altThroughput = 88;
  let altObservations: [string, string] = baselineObservations;
  let altHeadline = 'NOMINAL BASELINE TOPOLOGY';

  if (closureActive) {
    if (intervention === 'reroute_vehicles') {
      altDelay = Number((5.8 + postClosureRamp * 6.4 - recoveryFactor * 1.1).toFixed(1));
      altCongestion = Math.round(28 + postClosureRamp * 14 - recoveryFactor * 3);
      altDeliveries = Math.round(baselineDeliveries + 12 + postClosureRamp * 28);
      altTransitShare = 31;
      altThroughput = Math.round(84 - postClosureRamp * 4 + recoveryFactor * 3);
      altHeadline = 'DYNAMIC WEST & EAST VIADUCT LOAD BALANCING';
      altObservations = [
        'Cross-river flow splits 52% / 48% across West Bypass Viaduct and East Innovation Crossing before queues form.',
        `Upstream signal coordination saves ${(baselineDelay - altDelay).toFixed(1)} min average travel delay and clears CBD approaches.`,
      ];
    } else if (intervention === 'increase_transit') {
      altDelay = Number((5.4 + postClosureRamp * 5.2 - recoveryFactor * 1.0).toFixed(1));
      altCongestion = Math.round(25 + postClosureRamp * 11 - recoveryFactor * 3);
      altDeliveries = Math.round(baselineDeliveries + 9 + postClosureRamp * 22);
      altTransitShare = Math.round(44 + postClosureRamp * 8);
      altThroughput = Math.round(89 - postClosureRamp * 3 + recoveryFactor * 2);
      altHeadline = 'HIGH-FREQUENCY CROSS-RIVER TRANSIT SURGE';
      altObservations = [
        'Express rail & bus headways surge +45%, absorbing commuter volume across Midtown, CBD, and East Hub stations.',
        `Private vehicle density drops by ${baselineCongestion - altCongestion} percentage points, keeping alternate river crossings free-flowing.`,
      ];
    } else {
      altDelay = Number((6.2 + postClosureRamp * 6.9 - recoveryFactor * 1.0).toFixed(1));
      altCongestion = Math.round(30 + postClosureRamp * 15 - recoveryFactor * 3);
      altDeliveries = Math.round(baselineDeliveries + 18 + postClosureRamp * 38);
      altTransitShare = 29;
      altThroughput = Math.round(86 - postClosureRamp * 3 + recoveryFactor * 3);
      altHeadline = 'COORDINATED FREIGHT WINDOW SLOTTING';
      altObservations = [
        'Heavy port logistics platoons route via the Southern Freight Ring & East Crossing in staggered 15-min windows.',
        `Completes +${Math.round(18 + postClosureRamp * 38)} time-critical hospital & cold-chain deliveries without blocking West Viaduct commuters.`,
      ];
    }
  }

  const alternativeState: FutureWorldState25D = {
    futureId: 'B',
    title: 'WITH COORDINATED RESPONSE',
    subtitle: `${INTERVENTION_METADATA[intervention].label} · Active stabilization`,
    timeMinutes,
    timeFormatted,
    bridgeClosed: closureActive,
    intervention,
    corridorStates: altCorridors,
    districtStates: altDistricts,
    vehicles: altVehicles,
    elevatedArcs,
    metrics: {
      avgTravelDelayMin: altDelay,
      congestionIndex: altCongestion,
      completedDeliveries: altDeliveries,
      transitSharePct: altTransitShare,
      corridorThroughputPct: altThroughput,
    },
    observations: altObservations,
    systemHeadline: altHeadline,
  };

  const result: ParallelFuturesComparisonState = {
    timeMinutes,
    timeFormatted,
    closureActive,
    minutesSinceClosure,
    intervention,
    interventionMeta: INTERVENTION_METADATA[intervention],
    baseline: baselineState,
    alternative: alternativeState,
    deltas: {
      delaySavedMin: Number(Math.max(0, baselineDelay - altDelay).toFixed(1)),
      congestionReducedPct: Math.max(0, baselineCongestion - altCongestion),
      extraDeliveries: Math.max(0, altDeliveries - baselineDeliveries),
    },
  };

  PARALLEL_FUTURES_STATE_CACHE.set(cacheKey, result);
  return result;
}

/**
 * Paired entity inspection across Future A and Future B.
 * Allows hovering or selecting any bridge, district, or corridor in one panel
 * to highlight the matching element in both panels and compare their states.
 */
export function getInspectableEntityComparison(
  entityId: string,
  state: ParallelFuturesComparisonState
): EntityComparisonInspection {
  const entityCacheKey = `${entityId}:${state.timeMinutes}:${state.intervention}`;
  const cachedEntity = ENTITY_COMPARISON_CACHE.get(entityCacheKey);
  if (cachedEntity) {
    return cachedEntity;
  }

  const city = getCanonicalCity25D();
  let result: EntityComparisonInspection;

  // 1. Check Bridges
  const bridge = city.bridges.find((b) => b.id === entityId);
  if (bridge) {
    const cA = state.baseline.corridorStates[bridge.corridorId];
    const cB = state.alternative.corridorStates[bridge.corridorId];

    if (bridge.isPrimaryClosureTarget) {
      result = {
        entityId: bridge.id,
        category: 'bridge',
        name: bridge.name,
        code: bridge.code,
        baselineStatus: state.closureActive
          ? 'CLOSED AT 07:30 · Unwarned approaches gridlocked'
          : 'OPEN · Carrying 82 veh/min across central span',
        baselineMetric: state.closureActive ? '0 veh/min · 96% approach queue' : '82 veh/min',
        baselineSeverity: state.closureActive ? 'critical' : 'normal',
        alternativeStatus: state.closureActive
          ? 'CLOSED AT 07:30 · Upstream traffic pre-diverted'
          : 'OPEN · Nominal cross-river span',
        alternativeMetric: state.closureActive ? '0 veh/min · Approaches clear (22%)' : '82 veh/min',
        alternativeBenefit: state.closureActive
          ? 'Upstream beacon routing prevents approach spillback'
          : 'Synchronized baseline monitoring',
      };
    } else {
      result = {
        entityId: bridge.id,
        category: 'bridge',
        name: bridge.name,
        code: bridge.code,
        baselineStatus: state.closureActive
          ? `Overloaded by uncoordinated detour spillback (${Math.round(cA.congestion * 100)}% load)`
          : 'Nominal cross-river flow',
        baselineMetric: `${cA.flowRate} veh/min · ${Math.round(cA.congestion * 100)}% congestion`,
        baselineSeverity: state.closureActive ? 'warning' : 'normal',
        alternativeStatus: state.closureActive
          ? `${cB.statusTag.replace('_', ' ')} · Balanced cross-river corridor`
          : 'Nominal cross-river flow',
        alternativeMetric: `${cB.flowRate} veh/min · ${Math.round(cB.congestion * 100)}% congestion`,
        alternativeBenefit: state.closureActive
          ? `-${Math.max(8, Math.round((cA.congestion - cB.congestion) * 100))}% queue density via ${state.interventionMeta.label}`
          : 'Balanced capacity reserve',
      };
    }
    ENTITY_COMPARISON_CACHE.set(entityCacheKey, result);
    return result;
  }

  // 2. Check Districts
  const district = city.districts.find((d) => d.id === entityId);
  if (district) {
    const dA = state.baseline.districtStates[district.id];
    const dB = state.alternative.districtStates[district.id];
    result = {
      entityId: district.id,
      category: 'district',
      name: district.name,
      code: district.code,
      baselineStatus: dA.statusSummary,
      baselineMetric: `${Math.round(dA.pressure * 100)}% network pressure`,
      baselineSeverity: dA.pressure > 0.75 ? 'critical' : dA.pressure > 0.5 ? 'warning' : 'normal',
      alternativeStatus: dB.statusSummary,
      alternativeMetric: `${Math.round(dB.pressure * 100)}% network pressure`,
      alternativeBenefit: state.closureActive
        ? `-${Math.max(10, Math.round((dA.pressure - dB.pressure) * 100))}% district congestion load`
        : 'Identical pre-disruption baseline',
    };
    ENTITY_COMPARISON_CACHE.set(entityCacheKey, result);
    return result;
  }

  // 3. Check Corridors
  const corridor = city.corridors.find((c) => c.id === entityId) ?? city.corridors[1];
  const cA = state.baseline.corridorStates[corridor.id];
  const cB = state.alternative.corridorStates[corridor.id];

  result = {
    entityId: corridor.id,
    category: 'corridor',
    name: corridor.name,
    code: corridor.shortLabel.toUpperCase(),
    baselineStatus: cA.closed
      ? 'Closed span · Zero throughput'
      : `Uncoordinated load (${cA.statusTag})`,
    baselineMetric: `${cA.flowRate} veh/min · ${Math.round(cA.congestion * 100)}% congestion`,
    baselineSeverity: cA.congestion > 0.7 ? 'critical' : cA.congestion > 0.45 ? 'warning' : 'normal',
    alternativeStatus: cB.closed
      ? 'Closed span · Approaches bypassed'
      : `Coordinated flow (${cB.statusTag.replace('_', ' ')})`,
    alternativeMetric: `${cB.flowRate} veh/min · ${Math.round(cB.congestion * 100)}% congestion`,
    alternativeBenefit: state.closureActive
      ? `${state.interventionMeta.label} stabilizes corridor speed`
      : 'Nominal corridor state',
  };
  ENTITY_COMPARISON_CACHE.set(entityCacheKey, result);
  return result;
}

/**
 * Pure choreography function for the 5-phase "Reality Split" reveal.
 * Strictly decoupled from simulation time and intervention parameters.
 */
export function computeRealitySplitChoreography(rawProgress: number): RealitySplitChoreography {
  const progress = Math.max(0, Math.min(1, rawProgress));

  let phase: 1 | 2 | 3 | 4 | 5 = 1;
  let phaseLabel = 'PHASE 01 // UNIFIED BASELINE CITY';

  if (progress < 0.18) {
    phase = 1;
    phaseLabel = 'PHASE 01 // UNIFIED BASELINE CITY';
  } else if (progress < 0.36) {
    phase = 2;
    phaseLabel = 'PHASE 02 // 07:30 MERIDIAN BRIDGE CLOSURE';
  } else if (progress < 0.64) {
    phase = 3;
    phaseLabel = 'PHASE 03 // REALITY SPLIT: ONE WORLD, TWO OUTCOMES';
  } else if (progress < 0.84) {
    phase = 4;
    phaseLabel = 'PHASE 04 // DIVERGING CORRIDOR DYNAMICS';
  } else {
    phase = 5;
    phaseLabel = 'PHASE 05 // COMPARATIVE OUTCOME TELEMETRY';
  }

  const splitAmount =
    progress <= 0.25
      ? 0
      : progress >= 0.62
        ? 1
        : Number(((progress - 0.25) / 0.37).toFixed(3));

  const bridgeAlertIntensity =
    progress < 0.15
      ? 0
      : progress < 0.4
        ? Number(((progress - 0.15) / 0.25).toFixed(3))
        : 1;

  const divergenceAlpha =
    progress < 0.48
      ? 0
      : progress >= 0.8
        ? 1
        : Number(((progress - 0.48) / 0.32).toFixed(3));

  const metricsAlpha =
    progress < 0.68
      ? 0.35
      : progress >= 0.92
        ? 1
        : Number((0.35 + ((progress - 0.68) / 0.24) * 0.65).toFixed(3));

  return {
    progress: Number(progress.toFixed(3)),
    phase,
    phaseLabel,
    splitAmount,
    bridgeAlertIntensity,
    divergenceAlpha,
    metricsAlpha,
  };
}
