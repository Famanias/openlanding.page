export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export type DistrictId =
  | 'cbd'
  | 'harbor'
  | 'north_res'
  | 'east_tech'
  | 'south_ind'
  | 'central_park';

export type ArchitecturalFamily =
  | 'glass_tower'
  | 'mid_rise_commercial'
  | 'residential_block'
  | 'industrial_warehouse'
  | 'transit_facility'
  | 'civic_building';

export type RoofType =
  | 'flat_mechanical'
  | 'crown_spire'
  | 'sloped_solar'
  | 'sawtooth'
  | 'arch_vault'
  | 'stepped_terrace';

export type FacadeStyle =
  | 'curtain_wall'
  | 'vertical_fins'
  | 'recessed_grid'
  | 'brushed_panel'
  | 'masonry_ribbed';

export interface DistrictDefinition {
  id: DistrictId;
  name: string;
  code: string;
  purpose: string;
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  center: { x: number; z: number };
  baseElevation: number;
  baselineDemandMw: number;
  primaryFamily: ArchitecturalFamily;
}

export interface BuildingDefinition {
  id: string;
  name: string;
  districtId: DistrictId;
  family: ArchitecturalFamily;
  roofType: RoofType;
  facadeStyle: FacadeStyle;
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  rotationY: number;
  energyDemandKw: number;
  windowDensity: number;
  seed: number;
  isLandmark: boolean;
}

export interface RoadNode {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  districtId: DistrictId;
  nodeType: 'intersection' | 'bridge_anchor' | 'substation' | 'logistics_hub' | 'transit_station';
  description: string;
}

export interface RoadEdge {
  id: string;
  name: string;
  from: string;
  to: string;
  districtId: DistrictId;
  length: number;
  baseCapacity: number;
  baseSpeed: number; // units per minute
  isBridge: boolean;
  isAlternateRoute: boolean;
  isTransitCorridor: boolean;
  isDeliveryCorridor: boolean;
  elevation: number;
  points: Array<{ x: number; y: number; z: number }>;
}

export interface InfrastructureNode {
  id: string;
  name: string;
  layer: 'mobility' | 'energy' | 'logistics';
  districtId: DistrictId;
  x: number;
  y: number;
  z: number;
  capacityLabel: string;
  dependencySummary: string;
  connectedNodeIds: string[];
}

export interface TreeInstance {
  id: string;
  x: number;
  z: number;
  scale: number;
  tint: number;
}

export interface CityWorldData {
  seed: number;
  plinthWidth: number;
  plinthDepth: number;
  riverZ: number;
  districts: DistrictDefinition[];
  buildings: BuildingDefinition[];
  nodes: RoadNode[];
  edges: RoadEdge[];
  infrastructure: InfrastructureNode[];
  trees: TreeInstance[];
}

/**
 * Deterministic 32-bit PRNG (Mulberry32)
 */
export function createSeededRng(seed: number): () => number {
  let a = seed >>> 0;
  return function rng() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DISTRICTS: DistrictDefinition[] = [
  {
    id: 'cbd',
    name: 'Central Business District',
    code: 'SEC-01 / FINANCIAL CORE',
    purpose: 'High-density commercial towers, regional transit hub, and primary peak electrical demand sink.',
    bounds: { minX: -14, maxX: 6, minZ: -17, maxZ: -3 },
    center: { x: -4, z: -10 },
    baseElevation: 0.2,
    baselineDemandMw: 48.5,
    primaryFamily: 'glass_tower',
  },
  {
    id: 'east_tech',
    name: 'East Innovation & Civic Quarter',
    code: 'SEC-02 / CIVIC & MED-TECH',
    purpose: 'Municipal emergency services, university hospital, and high-reliability research laboratories.',
    bounds: { minX: 7, maxX: 22, minZ: -17, maxZ: -3 },
    center: { x: 14.5, z: -10 },
    baseElevation: 0.2,
    baselineDemandMw: 31.0,
    primaryFamily: 'civic_building',
  },
  {
    id: 'north_res',
    name: 'Northside Residential Quarter',
    code: 'SEC-03 / HIGH-DENSITY HOUSING',
    purpose: 'Mixed-income perimeter courtyard blocks generating morning outbound and evening inbound commuter waves.',
    bounds: { minX: -22, maxX: -15, minZ: -17, maxZ: -3 },
    center: { x: -18.5, z: -10 },
    baseElevation: 0.2,
    baselineDemandMw: 22.4,
    primaryFamily: 'residential_block',
  },
  {
    id: 'central_park',
    name: 'Meridian River & Transit Commons',
    code: 'SEC-04 / ARTERIAL CROSSING',
    purpose: 'Hydrological channel spanned by the Meridian Central Bridge, North Viaduct, and Elevated Rail Corridor.',
    bounds: { minX: -22, maxX: 22, minZ: -2.8, maxZ: 2.8 },
    center: { x: 0, z: 0 },
    baseElevation: 0.0,
    baselineDemandMw: 8.2,
    primaryFamily: 'transit_facility',
  },
  {
    id: 'harbor',
    name: 'West Harbor & Logistics Terminal',
    code: 'SEC-05 / INTERMODAL PORT',
    purpose: 'Automated container berths, cold-chain consolidation warehouses, and urban freight dispatch.',
    bounds: { minX: -22, maxX: -2, minZ: 3.2, maxZ: 17 },
    center: { x: -12, z: 10 },
    baseElevation: 0.15,
    baselineDemandMw: 36.8,
    primaryFamily: 'industrial_warehouse',
  },
  {
    id: 'south_ind',
    name: 'South Grid & Clean Energy Park',
    code: 'SEC-06 / SUBSTATION & SOLAR',
    purpose: '220kV primary step-down substation, utility-scale battery storage, and mid-rise commercial distribution.',
    bounds: { minX: -1, maxX: 22, minZ: 3.2, maxZ: 17 },
    center: { x: 10.5, z: 10 },
    baseElevation: 0.18,
    baselineDemandMw: 19.5,
    primaryFamily: 'mid_rise_commercial',
  },
];

function createRoadGraph(): { nodes: RoadNode[]; edges: RoadEdge[] } {
  const nodes: RoadNode[] = [
    // North bank nodes (z < 0)
    {
      id: 'N-RES-NW',
      label: 'Northside West Junction',
      x: -18,
      y: 0.25,
      z: -13,
      districtId: 'north_res',
      nodeType: 'intersection',
      description: 'Residential collector feeding commuter avenues.',
    },
    {
      id: 'N-RES-SW',
      label: 'West Viaduct Approach (North)',
      x: -18,
      y: 0.25,
      z: -4.5,
      districtId: 'north_res',
      nodeType: 'bridge_anchor',
      description: 'Northern approach to the West Harbor Bypass Viaduct.',
    },
    {
      id: 'N-CBD-NW',
      label: 'Financial Plaza North',
      x: -8,
      y: 0.25,
      z: -13,
      districtId: 'cbd',
      nodeType: 'intersection',
      description: 'High-volume intersection serving commercial towers.',
    },
    {
      id: 'N-CBD-NE',
      label: 'Central Transit Hub',
      x: 2,
      y: 0.25,
      z: -13,
      districtId: 'cbd',
      nodeType: 'transit_station',
      description: 'Multimodal rail and bus rapid transit interchange.',
    },
    {
      id: 'N-CBD-SW',
      label: 'Exchange Square',
      x: -8,
      y: 0.25,
      z: -4.5,
      districtId: 'cbd',
      nodeType: 'intersection',
      description: 'Western gateway to the Central Business District.',
    },
    {
      id: 'N-BRIDGE-N',
      label: 'Meridian Bridge North Anchor',
      x: 0,
      y: 0.35,
      z: -4.5,
      districtId: 'cbd',
      nodeType: 'bridge_anchor',
      description: 'Primary northern landing of the 6-lane Meridian Central Bridge.',
    },
    {
      id: 'N-TECH-N',
      label: 'Science Park North',
      x: 13,
      y: 0.25,
      z: -13,
      districtId: 'east_tech',
      nodeType: 'intersection',
      description: 'Access node for the Medical Center and Civic Campus.',
    },
    {
      id: 'N-TECH-S',
      label: 'East Crossing Approach (North)',
      x: 14,
      y: 0.3,
      z: -4.5,
      districtId: 'east_tech',
      nodeType: 'bridge_anchor',
      description: 'Northern approach to the East Tech Span.',
    },

    // South bank nodes (z > 0)
    {
      id: 'S-HARBOR-NW',
      label: 'West Viaduct Approach (South)',
      x: -18,
      y: 0.25,
      z: 4.5,
      districtId: 'harbor',
      nodeType: 'bridge_anchor',
      description: 'Southern landing of the West Harbor Bypass Viaduct.',
    },
    {
      id: 'S-HARBOR-HUB',
      label: 'Port Logistics Gate A',
      x: -12,
      y: 0.25,
      z: 11,
      districtId: 'harbor',
      nodeType: 'logistics_hub',
      description: 'Primary intermodal freight dispatch terminal (340 trucks/hr capacity).',
    },
    {
      id: 'S-HARBOR-E',
      label: 'Docklands Arterial',
      x: -6,
      y: 0.25,
      z: 5.5,
      districtId: 'harbor',
      nodeType: 'intersection',
      description: 'Connector linking container berths to Meridian Bridge.',
    },
    {
      id: 'S-BRIDGE-S',
      label: 'Meridian Bridge South Anchor',
      x: 0,
      y: 0.35,
      z: 4.5,
      districtId: 'south_ind',
      nodeType: 'bridge_anchor',
      description: 'Primary southern landing of the Meridian Central Bridge.',
    },
    {
      id: 'S-GRID-SUB',
      label: 'Meridian 220kV Substation',
      x: 6,
      y: 0.25,
      z: 11,
      districtId: 'south_ind',
      nodeType: 'substation',
      description: 'Primary high-voltage step-down transformer feeding CBD & Harbor.',
    },
    {
      id: 'S-IND-NE',
      label: 'East Crossing Approach (South)',
      x: 14,
      y: 0.3,
      z: 4.5,
      districtId: 'south_ind',
      nodeType: 'bridge_anchor',
      description: 'Southern landing of the East Tech Span.',
    },
    {
      id: 'S-IND-SE',
      label: 'Solar Park & South Depot',
      x: 15,
      y: 0.25,
      z: 12,
      districtId: 'south_ind',
      nodeType: 'logistics_hub',
      description: 'Regional distribution annex and battery storage complex.',
    },
  ];

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  function buildEdge(
    id: string,
    name: string,
    from: string,
    to: string,
    opts: {
      baseCapacity: number;
      baseSpeed: number;
      isBridge?: boolean;
      isAlternateRoute?: boolean;
      isTransitCorridor?: boolean;
      isDeliveryCorridor?: boolean;
      elevation?: number;
      midOffset?: { x?: number; y?: number; z?: number };
    }
  ): RoadEdge {
    const a = nodeMap.get(from)!;
    const b = nodeMap.get(to)!;
    const elev = opts.elevation ?? 0.25;
    const midX = (a.x + b.x) * 0.5 + (opts.midOffset?.x ?? 0);
    const midY = Math.max(a.y, b.y, elev) + (opts.midOffset?.y ?? 0);
    const midZ = (a.z + b.z) * 0.5 + (opts.midOffset?.z ?? 0);

    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const length = Math.hypot(dx, dz);

    return {
      id,
      name,
      from,
      to,
      districtId: a.districtId,
      length: Number(length.toFixed(2)),
      baseCapacity: opts.baseCapacity,
      baseSpeed: opts.baseSpeed,
      isBridge: Boolean(opts.isBridge),
      isAlternateRoute: Boolean(opts.isAlternateRoute),
      isTransitCorridor: Boolean(opts.isTransitCorridor),
      isDeliveryCorridor: Boolean(opts.isDeliveryCorridor),
      elevation: elev,
      points: [
        { x: a.x, y: a.y, z: a.z },
        { x: midX, y: midY, z: midZ },
        { x: b.x, y: b.y, z: b.z },
      ],
    };
  }

  const rawPairs: Array<{
    idBase: string;
    name: string;
    u: string;
    v: string;
    baseCapacity: number;
    baseSpeed: number;
    isBridge?: boolean;
    isAlternateRoute?: boolean;
    isTransitCorridor?: boolean;
    isDeliveryCorridor?: boolean;
    elevation?: number;
    midOffset?: { x?: number; y?: number; z?: number };
  }> = [
    // Primary Central Bridge (Can be closed in disruption)
    {
      idBase: 'EDGE-BRIDGE-CENTRAL',
      name: 'Meridian Central Bridge',
      u: 'S-BRIDGE-S',
      v: 'N-BRIDGE-N',
      baseCapacity: 140,
      baseSpeed: 12,
      isBridge: true,
      isTransitCorridor: true,
      isDeliveryCorridor: true,
      elevation: 0.75,
      midOffset: { y: 0.45 },
    },
    // West Harbor Bypass Viaduct (Alternate crossing 1)
    {
      idBase: 'EDGE-BRIDGE-WEST',
      name: 'West Harbor Bypass Viaduct',
      u: 'S-HARBOR-NW',
      v: 'N-RES-SW',
      baseCapacity: 85,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
      elevation: 0.65,
      midOffset: { y: 0.35 },
    },
    // East Tech Span (Alternate crossing 2)
    {
      idBase: 'EDGE-BRIDGE-EAST',
      name: 'East Innovation Crossing',
      u: 'S-IND-NE',
      v: 'N-TECH-S',
      baseCapacity: 95,
      baseSpeed: 11,
      isAlternateRoute: true,
      isTransitCorridor: true,
      isDeliveryCorridor: true,
      elevation: 0.65,
      midOffset: { y: 0.35 },
    },

    // North bank avenues
    {
      idBase: 'EDGE-N-AVE-1',
      name: 'Northside Arterial',
      u: 'N-RES-NW',
      v: 'N-RES-SW',
      baseCapacity: 80,
      baseSpeed: 9,
      isAlternateRoute: true,
    },
    {
      idBase: 'EDGE-N-AVE-2',
      name: 'Boulevard West',
      u: 'N-RES-NW',
      v: 'N-CBD-NW',
      baseCapacity: 95,
      baseSpeed: 10,
      isTransitCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-3',
      name: 'Riverfront West',
      u: 'N-RES-SW',
      v: 'N-CBD-SW',
      baseCapacity: 90,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-4',
      name: 'Financial Spine West',
      u: 'N-CBD-SW',
      v: 'N-CBD-NW',
      baseCapacity: 110,
      baseSpeed: 9,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-5',
      name: 'Exchange Embankment',
      u: 'N-CBD-SW',
      v: 'N-BRIDGE-N',
      baseCapacity: 120,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-6',
      name: 'Meridian Financial Avenue',
      u: 'N-BRIDGE-N',
      v: 'N-CBD-NE',
      baseCapacity: 130,
      baseSpeed: 11,
      isTransitCorridor: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-7',
      name: 'Midtown Crosstown',
      u: 'N-CBD-NW',
      v: 'N-CBD-NE',
      baseCapacity: 115,
      baseSpeed: 10,
      isTransitCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-8',
      name: 'Innovation Parkway',
      u: 'N-CBD-NE',
      v: 'N-TECH-N',
      baseCapacity: 105,
      baseSpeed: 11,
      isTransitCorridor: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-9',
      name: 'East Embankment',
      u: 'N-BRIDGE-N',
      v: 'N-TECH-S',
      baseCapacity: 100,
      baseSpeed: 10,
      isAlternateRoute: true,
    },
    {
      idBase: 'EDGE-N-AVE-10',
      name: 'Civic Connector',
      u: 'N-TECH-S',
      v: 'N-TECH-N',
      baseCapacity: 95,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },

    // South bank avenues
    {
      idBase: 'EDGE-S-AVE-1',
      name: 'Harbor West Quay',
      u: 'S-HARBOR-HUB',
      v: 'S-HARBOR-NW',
      baseCapacity: 95,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-2',
      name: 'Terminal Express',
      u: 'S-HARBOR-HUB',
      v: 'S-HARBOR-E',
      baseCapacity: 120,
      baseSpeed: 10,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-3',
      name: 'North Dock Link',
      u: 'S-HARBOR-NW',
      v: 'S-HARBOR-E',
      baseCapacity: 85,
      baseSpeed: 9,
      isAlternateRoute: true,
    },
    {
      idBase: 'EDGE-S-AVE-4',
      name: 'Port-to-Bridge Causeway',
      u: 'S-HARBOR-E',
      v: 'S-BRIDGE-S',
      baseCapacity: 125,
      baseSpeed: 10,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-5',
      name: 'Substation Ring Road',
      u: 'S-HARBOR-HUB',
      v: 'S-GRID-SUB',
      baseCapacity: 90,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-6',
      name: 'South Grid Collector',
      u: 'S-BRIDGE-S',
      v: 'S-GRID-SUB',
      baseCapacity: 105,
      baseSpeed: 10,
      isTransitCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-7',
      name: 'South Riverfront East',
      u: 'S-BRIDGE-S',
      v: 'S-IND-NE',
      baseCapacity: 100,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-8',
      name: 'Energy Park Way',
      u: 'S-GRID-SUB',
      v: 'S-IND-NE',
      baseCapacity: 95,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-9',
      name: 'Solar Annex Spur',
      u: 'S-GRID-SUB',
      v: 'S-IND-SE',
      baseCapacity: 85,
      baseSpeed: 9,
    },
    {
      idBase: 'EDGE-S-AVE-10',
      name: 'East Logistics Expressway',
      u: 'S-IND-SE',
      v: 'S-IND-NE',
      baseCapacity: 95,
      baseSpeed: 10,
      isDeliveryCorridor: true,
    },
  ];

  const edges: RoadEdge[] = [];
  for (const pair of rawPairs) {
    edges.push(
      buildEdge(`${pair.idBase}-FWD`, pair.name, pair.u, pair.v, pair),
      buildEdge(`${pair.idBase}-REV`, `${pair.name} (Inbound)`, pair.v, pair.u, pair)
    );
  }

  return { nodes, edges };
}

function isNearRoadOrRiver(x: number, z: number, edges: RoadEdge[]): boolean {
  // Keep river channel clear (-3.1 to +3.1)
  if (Math.abs(z) < 3.2) return true;
  // Check distance to road segments
  for (const edge of edges) {
    if (!edge.id.endsWith('-FWD')) continue;
    const p0 = edge.points[0];
    const p2 = edge.points[2];
    const dx = p2.x - p0.x;
    const dz = p2.z - p0.z;
    const lenSq = dx * dx + dz * dz;
    if (lenSq === 0) continue;
    const t = Math.max(0, Math.min(1, ((x - p0.x) * dx + (z - p0.z) * dz) / lenSq));
    const projX = p0.x + t * dx;
    const projZ = p0.z + t * dz;
    const dist = Math.hypot(x - projX, z - projZ);
    if (dist < 0.92) return true;
  }
  return false;
}

export function generateCityWorld(seed = 20261031, isMobile = false): CityWorldData {
  const rng = createSeededRng(seed);
  const { nodes, edges } = createRoadGraph();

  const targetBuildingCount = isMobile ? 115 : 215;
  const buildings: BuildingDefinition[] = [];

  const roofTypes: RoofType[] = [
    'flat_mechanical',
    'crown_spire',
    'sloped_solar',
    'sawtooth',
    'arch_vault',
    'stepped_terrace',
  ];
  const facadeStyles: FacadeStyle[] = [
    'curtain_wall',
    'vertical_fins',
    'recessed_grid',
    'brushed_panel',
    'masonry_ribbed',
  ];

  // Guarantee at least several buildings of every architectural family
  const families: ArchitecturalFamily[] = [
    'glass_tower',
    'mid_rise_commercial',
    'residential_block',
    'industrial_warehouse',
    'transit_facility',
    'civic_building',
  ];

  let attempts = 0;
  const maxAttempts = 8000;

  while (buildings.length < targetBuildingCount && attempts < maxAttempts) {
    attempts++;

    // Pick a district (excluding central river except for a few transit/park pavilions)
    const districtRoll = rng();
    let district: DistrictDefinition;
    if (districtRoll < 0.28) district = DISTRICTS[0]; // cbd
    else if (districtRoll < 0.48) district = DISTRICTS[1]; // east_tech
    else if (districtRoll < 0.64) district = DISTRICTS[2]; // north_res
    else if (districtRoll < 0.82) district = DISTRICTS[4]; // harbor
    else if (districtRoll < 0.97) district = DISTRICTS[5]; // south_ind
    else district = DISTRICTS[3]; // central_park pavilions

    const x =
      district.bounds.minX +
      0.5 +
      rng() * (district.bounds.maxX - district.bounds.minX - 1.0);
    const z =
      district.bounds.minZ +
      0.5 +
      rng() * (district.bounds.maxZ - district.bounds.minZ - 1.0);

    if (district.id !== 'central_park' && isNearRoadOrRiver(x, z, edges)) {
      continue;
    }
    if (district.id === 'central_park' && (Math.abs(z) < 2.2 || Math.abs(x) < 4)) {
      continue;
    }

    // Choose architectural family based on district with controlled diversity
    let family: ArchitecturalFamily = district.primaryFamily;
    if (buildings.length < families.length * 4) {
      family = families[buildings.length % families.length];
    } else if (rng() < 0.25) {
      family = families[Math.floor(rng() * families.length)];
    }

    // Determine footprint & height by family
    let width = 0.78 + rng() * 0.55;
    let depth = 0.78 + rng() * 0.55;
    let height = 2.0 + rng() * 3.0;
    let roofType: RoofType = roofTypes[Math.floor(rng() * roofTypes.length)];
    let facadeStyle: FacadeStyle = facadeStyles[Math.floor(rng() * facadeStyles.length)];

    if (family === 'glass_tower') {
      width = 0.85 + rng() * 0.65;
      depth = 0.85 + rng() * 0.65;
      const distFromCbdCenter = Math.hypot(x - -4, z - -10);
      const cbdBoost = Math.max(0.35, 1.4 - distFromCbdCenter * 0.08);
      height = (5.2 + rng() * 6.8) * cbdBoost;
      roofType = rng() < 0.45 ? 'crown_spire' : 'stepped_terrace';
      facadeStyle = rng() < 0.6 ? 'curtain_wall' : 'vertical_fins';
    } else if (family === 'mid_rise_commercial') {
      width = 0.85 + rng() * 0.65;
      depth = 0.82 + rng() * 0.62;
      height = 2.4 + rng() * 3.2;
      roofType = rng() < 0.5 ? 'flat_mechanical' : 'stepped_terrace';
      facadeStyle = 'recessed_grid';
    } else if (family === 'residential_block') {
      width = 0.75 + rng() * 0.65;
      depth = 0.72 + rng() * 0.58;
      height = 1.8 + rng() * 2.6;
      roofType = rng() < 0.5 ? 'sloped_solar' : 'flat_mechanical';
      facadeStyle = 'masonry_ribbed';
    } else if (family === 'industrial_warehouse') {
      width = 1.15 + rng() * 0.85;
      depth = 0.95 + rng() * 0.75;
      height = 1.1 + rng() * 1.3;
      roofType = rng() < 0.65 ? 'sawtooth' : 'sloped_solar';
      facadeStyle = 'brushed_panel';
    } else if (family === 'transit_facility') {
      width = 1.05 + rng() * 0.7;
      depth = 0.85 + rng() * 0.55;
      height = 1.4 + rng() * 1.5;
      roofType = 'arch_vault';
      facadeStyle = 'vertical_fins';
    } else if (family === 'civic_building') {
      width = 0.95 + rng() * 0.75;
      depth = 0.9 + rng() * 0.7;
      height = 2.6 + rng() * 3.0;
      roofType = 'stepped_terrace';
      facadeStyle = 'vertical_fins';
    }

    // Overlap check against existing buildings
    let overlaps = false;
    for (const other of buildings) {
      const minSepX = (width + other.width) * 0.5 + 0.14;
      const minSepZ = (depth + other.depth) * 0.5 + 0.14;
      if (Math.abs(x - other.x) < minSepX && Math.abs(z - other.z) < minSepZ) {
        overlaps = true;
        break;
      }
    }
    if (overlaps) continue;

    const idx = buildings.length + 1;
    const isLandmark = height > 8.2 || idx <= 6;
    const energyDemandKw = Math.round(width * depth * height * (family === 'glass_tower' ? 42 : 28));

    buildings.push({
      id: `BLD-${String(idx).padStart(3, '0')}`,
      name: isLandmark
        ? `${district.name.split(' ')[0]} Tower ${idx}`
        : `${district.code.split(' ')[0]} Block ${idx}`,
      districtId: district.id,
      family,
      roofType,
      facadeStyle,
      x: Number(x.toFixed(2)),
      z: Number(z.toFixed(2)),
      width: Number(width.toFixed(2)),
      depth: Number(depth.toFixed(2)),
      height: Number(height.toFixed(2)),
      rotationY: rng() < 0.85 ? 0 : Math.PI * 0.5,
      energyDemandKw,
      windowDensity: Number((0.45 + rng() * 0.45).toFixed(2)),
      seed: Math.floor(rng() * 100000),
      isLandmark,
    });
  }

  const infrastructure: InfrastructureNode[] = [
    {
      id: 'INF-MOB-BRIDGE',
      name: 'Meridian Central Bridge',
      layer: 'mobility',
      districtId: 'central_park',
      x: 0,
      y: 1.4,
      z: 0,
      capacityLabel: '140 veh/min · 6 Lanes + Transit Deck',
      dependencySummary: 'Carries 54% of cross-river commuter & freight flow between Harbor, South Grid, and CBD.',
      connectedNodeIds: ['N-BRIDGE-N', 'S-BRIDGE-S'],
    },
    {
      id: 'INF-MOB-HUB',
      name: 'Central Multimodal Station',
      layer: 'mobility',
      districtId: 'cbd',
      x: 2,
      y: 2.2,
      z: -13,
      capacityLabel: '48,000 pax/hr · Elevated Rail & BRT',
      dependencySummary: 'Absorbs diverted commuter demand when transit capacity scales above baseline.',
      connectedNodeIds: ['N-CBD-NE', 'N-TECH-N'],
    },
    {
      id: 'INF-NRG-SUB',
      name: 'Meridian 220kV Primary Substation',
      layer: 'energy',
      districtId: 'south_ind',
      x: 6,
      y: 1.8,
      z: 11,
      capacityLabel: '185 MW Peak Rating · Dual Busbar',
      dependencySummary: 'Supplies high-voltage feeders under the river to CBD towers and Cold-Chain Port.',
      connectedNodeIds: ['S-GRID-SUB', 'N-BRIDGE-N', 'S-HARBOR-HUB'],
    },
    {
      id: 'INF-NRG-SOLAR',
      name: 'South Grid Solar & Megapack Array',
      layer: 'energy',
      districtId: 'south_ind',
      x: 15,
      y: 1.5,
      z: 12,
      capacityLabel: '64 MWh Dispatchable Storage',
      dependencySummary: 'Buffers afternoon commercial peak and stabilizes electrified transit load.',
      connectedNodeIds: ['S-IND-SE', 'S-GRID-SUB'],
    },
    {
      id: 'INF-LOG-PORT',
      name: 'West Harbor Intermodal Terminal',
      layer: 'logistics',
      districtId: 'harbor',
      x: -12,
      y: 1.9,
      z: 11,
      capacityLabel: '340 TEU/hr · Cold-Chain & Medical Freight',
      dependencySummary: 'Origin of time-critical hospital & commercial deliveries crossing to North Bank.',
      connectedNodeIds: ['S-HARBOR-HUB', 'S-HARBOR-E', 'S-HARBOR-NW'],
    },
    {
      id: 'INF-LOG-MED',
      name: 'East Civic & Hospital Distribution Hub',
      layer: 'logistics',
      districtId: 'east_tech',
      x: 13,
      y: 2.0,
      z: -13,
      capacityLabel: 'Priority SLA Tier-1 Destination',
      dependencySummary: 'Sensitive to cross-river transit delays; depends on East Crossing when Central Bridge closes.',
      connectedNodeIds: ['N-TECH-N', 'N-TECH-S'],
    },
  ];

  // Generate planted trees along riverbanks, parks, and avenues
  const trees: TreeInstance[] = [];
  const treeTarget = isMobile ? 70 : 140;
  let treeAttempts = 0;
  while (trees.length < treeTarget && treeAttempts < 1200) {
    treeAttempts++;
    const tx = -21 + rng() * 42;
    const tz = -16 + rng() * 32;
    // Prefer river promenades (2.3 < |z| < 3.6) or park/residential pockets
    const onPromenade = Math.abs(tz) > 2.2 && Math.abs(tz) < 3.4 && Math.abs(tx) > 1.8;
    if (!onPromenade && isNearRoadOrRiver(tx, tz, edges)) continue;

    let insideBuilding = false;
    for (const b of buildings) {
      if (
        Math.abs(tx - b.x) < b.width * 0.5 + 0.45 &&
        Math.abs(tz - b.z) < b.depth * 0.5 + 0.45
      ) {
        insideBuilding = true;
        break;
      }
    }
    if (insideBuilding) continue;

    trees.push({
      id: `TREE-${trees.length + 1}`,
      x: Number(tx.toFixed(2)),
      z: Number(tz.toFixed(2)),
      scale: Number((0.85 + rng() * 0.3).toFixed(2)),
      tint: Number((rng() * 0.2 - 0.1).toFixed(2)),
    });
  }

  return {
    seed,
    plinthWidth: 48,
    plinthDepth: 38,
    riverZ: 0,
    districts: DISTRICTS,
    buildings,
    nodes,
    edges,
    infrastructure,
    trees,
  };
}
