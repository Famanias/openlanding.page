import { Vec3 } from '../world/cityGenerator';

export type WorkflowStageIndex = 0 | 1 | 2;
export type WorkflowStageId = 'understand' | 'simulate' | 'decide';

export interface WorkflowBuildingSpec {
  dx: number;
  dz: number;
  w: number;
  d: number;
  h: number;
  roofStyle: 'flat_parapet' | 'stepped_crown' | 'sawtooth' | 'spire_deck';
  tone: 'porcelain' | 'warm_stone' | 'mineral_gray';
}

export interface WorkflowHubSpec {
  id: string;
  code: string;
  label: string;
  shortLabel: string;
  role: string;
  bank: 'north' | 'south';
  position: Vec3;
  connectedCorridors: string[];
  buildings: WorkflowBuildingSpec[];
}

export interface WorkflowCorridorSpec {
  id: string;
  label: string;
  fromHubId: string;
  toHubId: string;
  isBridge: boolean;
  isPrimaryDisrupted: boolean;
  isInterventionRoute: boolean;
  controlPoints: Vec3[];
}

export interface WorkflowLayerSpec {
  id: 'mobility' | 'energy' | 'logistics';
  label: string;
  code: string;
  elevationY: number;
  colorHex: string;
  summary: string;
}

export interface WorkflowStageChoreography {
  stageIndex: WorkflowStageIndex;
  stageId: WorkflowStageId;
  headline: string;
  cameraPosition: Vec3;
  cameraTarget: Vec3;
  fov: number;
  layerVisibility: number;
  bridgeDisrupted: boolean;
  baselineArcAlpha: number;
  interventionArcAlpha: number;
  resolvedPathAlpha: number;
  scenarioCallouts: {
    selectedIntervention: string;
    affectedInfrastructure: string;
    scenarioComparison: string;
  };
}

export const WORKFLOW_LAYERS: WorkflowLayerSpec[] = [
  {
    id: 'mobility',
    label: 'Mobility',
    code: 'LYR-01 // MOBILITY',
    elevationY: 2.05,
    colorHex: '#E85D36',
    summary: 'Arterial bridges, transit loops, and signalized commuter corridors',
  },
  {
    id: 'energy',
    label: 'Energy',
    code: 'LYR-02 // ENERGY',
    elevationY: 2.95,
    colorHex: '#38BDF8',
    summary: 'Substation feeders, traction power, and district load distribution',
  },
  {
    id: 'logistics',
    label: 'Logistics',
    code: 'LYR-03 // LOGISTICS',
    elevationY: 3.85,
    colorHex: '#D99B26',
    summary: 'Port container dispatches, freight consolidation, and hospital cold-chain routes',
  },
];

export const WORKFLOW_HUBS: WorkflowHubSpec[] = [
  {
    id: 'WEST_HARBOR',
    code: 'HUB 01 // WEST HARBOR',
    label: 'WEST HARBOR',
    shortLabel: 'West Harbor',
    role: 'Intermodal Container Terminal & West Bypass Gateway',
    bank: 'south',
    position: { x: -5.2, y: 0.36, z: 3.1 },
    connectedCorridors: ['WEST_VIADUCT', 'SOUTH_WEST_COLLECTOR'],
    buildings: [
      { dx: -0.95, dz: 0.35, w: 0.82, d: 0.54, h: 1.25, roofStyle: 'sawtooth', tone: 'mineral_gray' },
      { dx: -0.32, dz: -0.52, w: 0.62, d: 0.62, h: 1.75, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.52, dz: 0.45, w: 0.76, d: 0.52, h: 1.15, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: -0.88, dz: -0.42, w: 0.52, d: 0.48, h: 1.45, roofStyle: 'flat_parapet', tone: 'porcelain' },
      { dx: 0.62, dz: -0.35, w: 0.58, d: 0.52, h: 1.58, roofStyle: 'stepped_crown', tone: 'warm_stone' },
      { dx: 0.0, dz: 0.68, w: 0.65, d: 0.46, h: 0.98, roofStyle: 'sawtooth', tone: 'mineral_gray' },
    ],
  },
  {
    id: 'SOUTH_PORT',
    code: 'HUB 02 // SOUTH PORT',
    label: 'SOUTH PORT',
    shortLabel: 'South Port',
    role: 'Central Bridge Approach & 145 MW Traction Substation',
    bank: 'south',
    position: { x: 0.0, y: 0.36, z: 3.35 },
    connectedCorridors: ['CENTRAL_BRIDGE', 'SOUTH_WEST_COLLECTOR', 'SOUTH_EAST_COLLECTOR'],
    buildings: [
      { dx: -0.78, dz: 0.35, w: 0.64, d: 0.58, h: 1.85, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.78, dz: 0.32, w: 0.66, d: 0.56, h: 1.68, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: -0.64, dz: -0.48, w: 0.52, d: 0.5, h: 1.38, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
      { dx: 0.64, dz: -0.45, w: 0.54, d: 0.5, h: 1.52, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.0, dz: 0.82, w: 0.76, d: 0.48, h: 1.25, roofStyle: 'sawtooth', tone: 'warm_stone' },
      { dx: -1.28, dz: -0.08, w: 0.48, d: 0.48, h: 1.12, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
    ],
  },
  {
    id: 'SOUTH_IND',
    code: 'HUB 03 // SOUTH IND',
    label: 'SOUTH IND',
    shortLabel: 'South Industrial',
    role: 'Automated Logistics Consolidation & East Crossing Ramp',
    bank: 'south',
    position: { x: 5.2, y: 0.36, z: 3.1 },
    connectedCorridors: ['EAST_CROSSING', 'SOUTH_EAST_COLLECTOR'],
    buildings: [
      { dx: 0.88, dz: 0.38, w: 0.88, d: 0.58, h: 1.18, roofStyle: 'sawtooth', tone: 'mineral_gray' },
      { dx: -0.62, dz: 0.45, w: 0.72, d: 0.54, h: 1.35, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: 0.45, dz: -0.45, w: 0.6, d: 0.56, h: 1.72, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: -0.52, dz: -0.42, w: 0.56, d: 0.5, h: 1.48, roofStyle: 'flat_parapet', tone: 'porcelain' },
      { dx: 1.15, dz: -0.32, w: 0.54, d: 0.52, h: 1.08, roofStyle: 'sawtooth', tone: 'warm_stone' },
      { dx: 0.05, dz: 0.76, w: 0.68, d: 0.46, h: 1.02, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
    ],
  },
  {
    id: 'MIDTOWN',
    code: 'HUB 04 // MIDTOWN',
    label: 'MIDTOWN',
    shortLabel: 'Midtown',
    role: 'Northern Crosstown Exchange & West Viaduct Terminal',
    bank: 'north',
    position: { x: -4.4, y: 0.36, z: -3.05 },
    connectedCorridors: ['WEST_VIADUCT', 'NORTH_WEST_COLLECTOR'],
    buildings: [
      { dx: -0.74, dz: -0.38, w: 0.62, d: 0.62, h: 2.35, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.64, dz: -0.42, w: 0.58, d: 0.58, h: 2.05, roofStyle: 'spire_deck', tone: 'porcelain' },
      { dx: -0.62, dz: 0.45, w: 0.54, d: 0.52, h: 1.62, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: 0.62, dz: 0.42, w: 0.56, d: 0.5, h: 1.72, roofStyle: 'stepped_crown', tone: 'warm_stone' },
      { dx: -1.26, dz: 0.05, w: 0.52, d: 0.52, h: 1.48, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
      { dx: 0.0, dz: -0.82, w: 0.64, d: 0.52, h: 1.92, roofStyle: 'stepped_crown', tone: 'porcelain' },
    ],
  },
  {
    id: 'FINANCIAL_CBD',
    code: 'HUB 05 // FINANCIAL CBD',
    label: 'FINANCIAL CBD',
    shortLabel: 'Financial CBD',
    role: 'Metropolitan Commercial Core & Central Transit Hub',
    bank: 'north',
    position: { x: 0.0, y: 0.36, z: -3.35 },
    connectedCorridors: ['CENTRAL_BRIDGE', 'NORTH_WEST_COLLECTOR', 'NORTH_EAST_COLLECTOR'],
    buildings: [
      { dx: -0.62, dz: -0.32, w: 0.68, d: 0.68, h: 3.15, roofStyle: 'spire_deck', tone: 'porcelain' },
      { dx: 0.64, dz: -0.35, w: 0.66, d: 0.64, h: 2.85, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.0, dz: -0.88, w: 0.72, d: 0.62, h: 3.45, roofStyle: 'spire_deck', tone: 'porcelain' },
      { dx: -1.18, dz: -0.12, w: 0.56, d: 0.56, h: 2.25, roofStyle: 'stepped_crown', tone: 'warm_stone' },
      { dx: 1.18, dz: -0.1, w: 0.56, d: 0.56, h: 2.15, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: -0.68, dz: 0.45, w: 0.54, d: 0.5, h: 1.85, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.68, dz: 0.45, w: 0.54, d: 0.5, h: 1.78, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
    ],
  },
  {
    id: 'EAST_HUB',
    code: 'HUB 06 // EAST HUB',
    label: 'EAST HUB',
    shortLabel: 'East Hub',
    role: 'Hospital Cold-Chain Campus & Innovation Crossing Landing',
    bank: 'north',
    position: { x: 4.4, y: 0.36, z: -3.05 },
    connectedCorridors: ['EAST_CROSSING', 'NORTH_EAST_COLLECTOR'],
    buildings: [
      { dx: 0.68, dz: -0.35, w: 0.66, d: 0.6, h: 2.25, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: -0.58, dz: -0.38, w: 0.6, d: 0.58, h: 1.95, roofStyle: 'spire_deck', tone: 'porcelain' },
      { dx: 0.58, dz: 0.42, w: 0.58, d: 0.52, h: 1.58, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: -0.55, dz: 0.42, w: 0.54, d: 0.5, h: 1.52, roofStyle: 'stepped_crown', tone: 'warm_stone' },
      { dx: 1.24, dz: 0.05, w: 0.54, d: 0.54, h: 1.38, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
      { dx: 0.05, dz: -0.82, w: 0.64, d: 0.52, h: 1.82, roofStyle: 'stepped_crown', tone: 'porcelain' },
    ],
  },
];

export const WORKFLOW_CORRIDORS: WorkflowCorridorSpec[] = [
  {
    id: 'CENTRAL_BRIDGE',
    label: 'Meridian Central Bridge',
    fromHubId: 'SOUTH_PORT',
    toHubId: 'FINANCIAL_CBD',
    isBridge: true,
    isPrimaryDisrupted: true,
    isInterventionRoute: false,
    controlPoints: [
      { x: 0.0, y: 0.42, z: 3.35 },
      { x: 0.0, y: 0.82, z: 1.25 },
      { x: 0.0, y: 0.88, z: 0.0 },
      { x: 0.0, y: 0.82, z: -1.25 },
      { x: 0.0, y: 0.42, z: -3.35 },
    ],
  },
  {
    id: 'WEST_VIADUCT',
    label: 'West Bypass Viaduct',
    fromHubId: 'WEST_HARBOR',
    toHubId: 'MIDTOWN',
    isBridge: true,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: -5.2, y: 0.42, z: 3.1 },
      { x: -5.0, y: 0.78, z: 1.2 },
      { x: -4.8, y: 0.86, z: 0.0 },
      { x: -4.6, y: 0.78, z: -1.2 },
      { x: -4.4, y: 0.42, z: -3.05 },
    ],
  },
  {
    id: 'EAST_CROSSING',
    label: 'East Innovation Crossing',
    fromHubId: 'SOUTH_IND',
    toHubId: 'EAST_HUB',
    isBridge: true,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: 5.2, y: 0.42, z: 3.1 },
      { x: 5.0, y: 0.78, z: 1.2 },
      { x: 4.8, y: 0.86, z: 0.0 },
      { x: 4.6, y: 0.78, z: -1.2 },
      { x: 4.4, y: 0.42, z: -3.05 },
    ],
  },
  {
    id: 'SOUTH_WEST_COLLECTOR',
    label: 'South Harbor Arterial',
    fromHubId: 'WEST_HARBOR',
    toHubId: 'SOUTH_PORT',
    isBridge: false,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: -5.2, y: 0.4, z: 3.1 },
      { x: -2.6, y: 0.42, z: 3.28 },
      { x: 0.0, y: 0.4, z: 3.35 },
    ],
  },
  {
    id: 'SOUTH_EAST_COLLECTOR',
    label: 'South Industrial Arterial',
    fromHubId: 'SOUTH_PORT',
    toHubId: 'SOUTH_IND',
    isBridge: false,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: 0.0, y: 0.4, z: 3.35 },
      { x: 2.6, y: 0.42, z: 3.28 },
      { x: 5.2, y: 0.4, z: 3.1 },
    ],
  },
  {
    id: 'NORTH_WEST_COLLECTOR',
    label: 'Midtown Crosstown Collector',
    fromHubId: 'MIDTOWN',
    toHubId: 'FINANCIAL_CBD',
    isBridge: false,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: -4.4, y: 0.4, z: -3.05 },
      { x: -2.2, y: 0.42, z: -3.25 },
      { x: 0.0, y: 0.4, z: -3.35 },
    ],
  },
  {
    id: 'NORTH_EAST_COLLECTOR',
    label: 'East Civic Collector',
    fromHubId: 'FINANCIAL_CBD',
    toHubId: 'EAST_HUB',
    isBridge: false,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: 0.0, y: 0.4, z: -3.35 },
      { x: 2.2, y: 0.42, z: -3.25 },
      { x: 4.4, y: 0.4, z: -3.05 },
    ],
  },
];

export function computeWorkflowStageChoreography(
  stageIndex: number,
  options?: {
    isMobile?: boolean;
    focusedHubId?: string | null;
  }
): WorkflowStageChoreography {
  const clampedStage: WorkflowStageIndex =
    stageIndex <= 0 ? 0 : stageIndex === 1 ? 1 : 2;
  const isMobile = Boolean(options?.isMobile);
  const mobileScale = isMobile ? 1.42 : 1.0;
  const mobileTargetZOffset = isMobile ? 0.65 : 0.0;

  let basePos: Vec3;
  let baseTarget: Vec3;
  let fov = isMobile ? 39 : 34;
  let stageId: WorkflowStageId = 'understand';
  let headline = 'See the whole system.';
  let layerVisibility = 1.0;
  let bridgeDisrupted = false;
  let baselineArcAlpha = 0.0;
  let interventionArcAlpha = 0.0;
  let resolvedPathAlpha = 0.0;

  if (clampedStage === 0) {
    stageId = 'understand';
    headline = 'See the whole system.';
    basePos = {
      x: 0.4 * mobileScale,
      y: 12.6 * mobileScale,
      z: 16.4 * mobileScale,
    };
    baseTarget = { x: 0.0, y: 0.7, z: 0.0 + mobileTargetZOffset };
    layerVisibility = 1.0;
    bridgeDisrupted = false;
    baselineArcAlpha = 0.0;
    interventionArcAlpha = 0.0;
    resolvedPathAlpha = 0.0;
  } else if (clampedStage === 1) {
    stageId = 'simulate';
    headline = 'Explore what could change.';
    basePos = {
      x: -2.0 * mobileScale,
      y: 10.6 * mobileScale,
      z: 14.2 * mobileScale,
    };
    baseTarget = { x: 0.0, y: 0.55, z: 0.1 + mobileTargetZOffset };
    fov = isMobile ? 38 : 33;
    layerVisibility = 0.28;
    bridgeDisrupted = true;
    baselineArcAlpha = 1.0;
    interventionArcAlpha = 1.0;
    resolvedPathAlpha = 0.25;
  } else {
    stageId = 'decide';
    headline = 'Move forward with clarity.';
    basePos = {
      x: 1.8 * mobileScale,
      y: 11.8 * mobileScale,
      z: 15.6 * mobileScale,
    };
    baseTarget = { x: 0.1, y: 0.5, z: 0.0 + mobileTargetZOffset };
    fov = isMobile ? 39 : 34;
    layerVisibility = 0.45;
    bridgeDisrupted = true;
    baselineArcAlpha = 0.16;
    interventionArcAlpha = 1.0;
    resolvedPathAlpha = 1.0;
  }

  // If visitor clicked or hovered a specific district hub, gently bias target toward it
  if (options?.focusedHubId) {
    const hub = WORKFLOW_HUBS.find((h) => h.id === options.focusedHubId);
    if (hub) {
      baseTarget = {
        x: baseTarget.x * 0.65 + hub.position.x * 0.35,
        y: baseTarget.y,
        z: baseTarget.z * 0.65 + hub.position.z * 0.35,
      };
    }
  }

  return {
    stageIndex: clampedStage,
    stageId,
    headline,
    cameraPosition: basePos,
    cameraTarget: baseTarget,
    fov,
    layerVisibility,
    bridgeDisrupted,
    baselineArcAlpha,
    interventionArcAlpha,
    resolvedPathAlpha,
    scenarioCallouts: {
      selectedIntervention: 'West Viaduct + East Crossing Balanced Reroute',
      affectedInfrastructure: 'Meridian Central Bridge · 6 Connected District Hubs',
      scenarioComparison: 'Baseline Spillback vs. Coordinated Multi-Corridor Bypass',
    },
  };
}
