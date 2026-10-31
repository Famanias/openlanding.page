'use client';

import { create } from 'zustand';
import {
  CityWorldData,
  DistrictId,
  generateCityWorld,
} from '../world/cityGenerator';
import {
  DualSimulationTimeline,
  InterventionStrategy,
  ScenarioParameters,
  WorldSimulationSnapshot,
  getSnapshotAtTime,
  runDeterministicSimulation,
} from '../simulation/engine';
import { HeroMode } from '../simulation/cameraMath';

export type PresentationMode = 'cinematic' | 'exploration' | 'simulation';
export type HeroPresentationState = 'cinematic' | 'interactive';
export type InfrastructureLayerId = 'mobility' | 'energy' | 'logistics';

export interface HeroModeMeta {
  id: HeroMode;
  num: string;
  label: string;
  chapterTitle: string;
  summary: string;
}

export const HERO_MODES: HeroModeMeta[] = [
  {
    id: 'explore',
    num: '01',
    label: 'Explore',
    chapterTitle: 'The World',
    summary: 'Drag to orbit the architectural model or select a district to inspect its role.',
  },
  {
    id: 'systems',
    num: '02',
    label: 'Systems',
    chapterTitle: 'Invisible City',
    summary: 'Inspect the mobility, energy, and logistics layers operating beneath the skyline.',
  },
  {
    id: 'disrupt',
    num: '03',
    label: 'Disrupt',
    chapterTitle: 'The Fracture',
    summary: 'One disruption. Two possible futures: Baseline vs. Coordinated Intervention.',
  },
  {
    id: 'simulate',
    num: '04',
    label: 'Simulate',
    chapterTitle: 'Simulation Lab',
    summary: 'Adjust demand, transit capacity, and intervention rules across the 16-hour timeline.',
  },
  {
    id: 'explain',
    num: '05',
    label: 'Explain',
    chapterTitle: 'Causal Analysis',
    summary: 'Step through the 5-stage causal pathway from initial bridge closure to delivery impact.',
  },
  {
    id: 'outcome',
    num: '06',
    label: 'Outcome',
    chapterTitle: 'Make the Next Move',
    summary: 'Review the consolidated scenario outcome and transition to your decision brief.',
  },
];

export interface SelectedEntityInfo {
  type: 'district' | 'building' | 'road' | 'infrastructure' | 'world';
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  metric: string;
  worldPos: { x: number; y: number; z: number };
}

export interface CausalStepDefinition {
  index: number;
  title: string;
  shortLabel: string;
  locationLabel: string;
  description: string;
  fromPos: { x: number; y: number; z: number };
  toPos: { x: number; y: number; z: number };
  cameraTarget: { x: number; y: number; z: number };
  highlightDistrictId: DistrictId;
  highlightEdgeIds: string[];
}

export const CAUSAL_SEQUENCE: CausalStepDefinition[] = [
  {
    index: 0,
    title: 'Bridge closure',
    shortLabel: '01. Bridge closure',
    locationLabel: 'Meridian Central Bridge (SEC-04)',
    description:
      'At 07:30, an unscheduled structural lockdown closes all 6 lanes of the Meridian Central Bridge, severing the primary arterial link between the South Port and the northern Financial Core.',
    fromPos: { x: 0, y: 1.4, z: 4.5 },
    toPos: { x: 0, y: 1.6, z: -4.5 },
    cameraTarget: { x: 0, y: 1.2, z: 0 },
    highlightDistrictId: 'central_park',
    highlightEdgeIds: ['EDGE-BRIDGE-CENTRAL-FWD', 'EDGE-BRIDGE-CENTRAL-REV'],
  },
  {
    index: 1,
    title: 'Reduced capacity',
    shortLabel: '02. Reduced capacity',
    locationLabel: 'Cross-River Corridor (-42% Capacity)',
    description:
      'Cross-river transport capacity drops by 140 vehicles/min. Commuter and freight queues immediately accumulate along Port-to-Bridge Causeway and Exchange Embankment.',
    fromPos: { x: 0, y: 1.4, z: 0 },
    toPos: { x: -6, y: 1.2, z: 5.5 },
    cameraTarget: { x: -3, y: 1.0, z: 3 },
    highlightDistrictId: 'harbor',
    highlightEdgeIds: ['EDGE-S-AVE-4-FWD', 'EDGE-N-AVE-5-FWD'],
  },
  {
    index: 2,
    title: 'Rerouting',
    shortLabel: '03. Rerouting',
    locationLabel: 'West Viaduct & East Innovation Crossing',
    description:
      'In Future B, PARALLEL dynamically re-weights graph impedances and diverts cross-river flows onto the West Harbor Bypass Viaduct and East Innovation Crossing before gridlock locks in.',
    fromPos: { x: -12, y: 1.4, z: 11 },
    toPos: { x: -18, y: 1.6, z: 0 },
    cameraTarget: { x: -14, y: 1.2, z: 2 },
    highlightDistrictId: 'north_res',
    highlightEdgeIds: ['EDGE-BRIDGE-WEST-FWD', 'EDGE-BRIDGE-EAST-FWD', 'EDGE-S-AVE-1-FWD'],
  },
  {
    index: 3,
    title: 'Congestion',
    shortLabel: '04. Congestion',
    locationLabel: 'CBD & Docklands Arterial Collectors',
    description:
      'Without coordinated signal and transit adaptation (Baseline Future A), diverted queues spill back into Midtown Crosstown and Docklands Arterial, degrading corridor speeds by 58%.',
    fromPos: { x: -8, y: 1.5, z: -4.5 },
    toPos: { x: 2, y: 1.8, z: -13 },
    cameraTarget: { x: -3, y: 1.5, z: -9 },
    highlightDistrictId: 'cbd',
    highlightEdgeIds: ['EDGE-N-AVE-4-FWD', 'EDGE-N-AVE-6-FWD', 'EDGE-N-AVE-7-FWD'],
  },
  {
    index: 4,
    title: 'Delivery impact',
    shortLabel: '05. Delivery impact',
    locationLabel: 'East Civic & Hospital Distribution Hub',
    description:
      'Cold-chain and medical shipments originating at West Harbor reach the East Civic & Hospital Hub 14.2 minutes faster under coordinated dispatch than under unmitigated baseline.',
    fromPos: { x: 2, y: 1.8, z: -13 },
    toPos: { x: 13, y: 1.8, z: -13 },
    cameraTarget: { x: 9, y: 1.4, z: -10 },
    highlightDistrictId: 'east_tech',
    highlightEdgeIds: ['EDGE-N-AVE-8-FWD', 'EDGE-N-AVE-10-FWD'],
  },
];

const MODE_TO_CHAPTER: Record<HeroMode, number> = {
  explore: 1,
  systems: 2,
  disrupt: 3,
  simulate: 4,
  explain: 5,
  outcome: 6,
};

interface ParallelStoreState {
  world: CityWorldData;
  timeline: DualSimulationTimeline;
  heroState: HeroPresentationState;
  heroMode: HeroMode;
  activeChapter: number;
  presentationMode: PresentationMode;
  invisibleLayer: InfrastructureLayerId;
  comparisonBias: number; // -1 (Baseline Future A) to +1 (Intervention Future B)
  mobileActiveFuture: 'A' | 'B';
  scenarioParams: ScenarioParameters;
  simTimeMinutes: number; // 360 to 1320
  isPlaying: boolean;
  causalStepIndex: number; // 0 to 4
  cutawayMode: boolean;
  selectedEntity: SelectedEntityInfo | null;
  hoveredDistrictId: DistrictId | null;
  hoveredWorld: 'A' | 'B' | null;
  highlightedRoadId: string | null;
  isStageExpanded: boolean;
  simDrawerOpen: boolean;
  cameraResetTick: number;
  projectedLabels: Record<string, { x: number; y: number; visible: boolean }>;

  // Actions
  setHeroState: (state: HeroPresentationState) => void;
  setHeroMode: (mode: HeroMode) => void;
  setPresentationMode: (mode: PresentationMode) => void;
  setInvisibleLayer: (layer: InfrastructureLayerId) => void;
  setComparisonBias: (bias: number) => void;
  setMobileActiveFuture: (future: 'A' | 'B') => void;
  setTrafficDemand: (pct: number) => void;
  setTransitCapacity: (pct: number) => void;
  setIntervention: (strategy: InterventionStrategy) => void;
  setBridgeClosed: (closed: boolean) => void;
  setSimTimeMinutes: (minutes: number) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  resetSimulation: () => void;
  setCausalStepIndex: (idx: number) => void;
  setCutawayMode: (enabled: boolean) => void;
  setSelectedEntity: (entity: SelectedEntityInfo | null) => void;
  setHoveredDistrictId: (id: DistrictId | null) => void;
  setHoveredWorld: (world: 'A' | 'B' | null) => void;
  setHighlightedRoadId: (roadId: string | null) => void;
  setStageExpanded: (expanded: boolean) => void;
  setSimDrawerOpen: (open: boolean) => void;
  resetCameraView: () => void;
  setProjectedLabels: (
    labels: Record<string, { x: number; y: number; visible: boolean }>
  ) => void;
  getCurrentSnapshots: () => {
    snapshotA: WorldSimulationSnapshot;
    snapshotB: WorldSimulationSnapshot;
  };
}

const isMobileViewport =
  typeof window !== 'undefined' && window.innerWidth < 768;

const initialWorld = generateCityWorld(20261031, isMobileViewport);

const DEFAULT_PARAMS: ScenarioParameters = {
  trafficDemandPct: 115,
  transitCapacityPct: 100,
  intervention: 'reroute_vehicles',
  bridgeClosed: true,
};

const initialTimeline = runDeterministicSimulation(
  initialWorld,
  DEFAULT_PARAMS,
  isMobileViewport ? 42 : 72
);

export const useParallelStore = create<ParallelStoreState>((set, get) => ({
  world: initialWorld,
  timeline: initialTimeline,
  heroState: 'cinematic',
  heroMode: 'explore',
  activeChapter: 1,
  presentationMode: 'cinematic',
  invisibleLayer: 'mobility',
  comparisonBias: 0,
  mobileActiveFuture: 'B',
  scenarioParams: DEFAULT_PARAMS,
  simTimeMinutes: 540, // 09:00 AM peak disruption window
  isPlaying: false,
  causalStepIndex: 0,
  cutawayMode: false,
  selectedEntity: null,
  hoveredDistrictId: null,
  hoveredWorld: null,
  highlightedRoadId: null,
  isStageExpanded: false,
  simDrawerOpen: true,
  cameraResetTick: 0,
  projectedLabels: {},

  setHeroState: (state) => {
    set({
      heroState: state,
      selectedEntity: state === 'cinematic' ? null : get().selectedEntity,
      highlightedRoadId: state === 'cinematic' ? null : get().highlightedRoadId,
      cutawayMode: state === 'cinematic' ? false : get().cutawayMode,
      presentationMode:
        state === 'cinematic'
          ? 'cinematic'
          : get().heroMode === 'simulate'
          ? 'simulation'
          : 'cinematic',
      cameraResetTick: get().cameraResetTick + 1,
    });
  },

  setHeroMode: (mode) => {
    const ch = MODE_TO_CHAPTER[mode];
    const nextPres: PresentationMode =
      mode === 'simulate' ? 'simulation' : 'cinematic';

    set({
      heroState: 'interactive',
      heroMode: mode,
      activeChapter: ch,
      presentationMode: nextPres,
      cutawayMode: mode === 'explain' ? get().cutawayMode : false,
      selectedEntity: mode === 'explore' ? get().selectedEntity : null,
      highlightedRoadId: mode === 'explain' ? get().highlightedRoadId : null,
      cameraResetTick: get().cameraResetTick + 1,
    });
  },

  setPresentationMode: (mode) => {
    set({
      presentationMode: mode,
      selectedEntity: mode === 'cinematic' ? null : get().selectedEntity,
    });
  },

  setInvisibleLayer: (layer) => {
    set({ invisibleLayer: layer });
  },

  setComparisonBias: (bias) => {
    set({ comparisonBias: Math.max(-1, Math.min(1, bias)) });
  },

  setMobileActiveFuture: (future) => {
    set({
      mobileActiveFuture: future,
      comparisonBias: future === 'A' ? -0.85 : 0.85,
    });
  },

  setTrafficDemand: (pct) => {
    const clamped = Math.max(60, Math.min(160, Math.round(pct)));
    const nextParams = { ...get().scenarioParams, trafficDemandPct: clamped };
    const nextTimeline = runDeterministicSimulation(
      get().world,
      nextParams,
      isMobileViewport ? 42 : 72
    );
    set({ scenarioParams: nextParams, timeline: nextTimeline });
  },

  setTransitCapacity: (pct) => {
    const clamped = Math.max(50, Math.min(150, Math.round(pct)));
    const nextParams = { ...get().scenarioParams, transitCapacityPct: clamped };
    const nextTimeline = runDeterministicSimulation(
      get().world,
      nextParams,
      isMobileViewport ? 42 : 72
    );
    set({ scenarioParams: nextParams, timeline: nextTimeline });
  },

  setIntervention: (strategy) => {
    const nextParams = { ...get().scenarioParams, intervention: strategy };
    const nextTimeline = runDeterministicSimulation(
      get().world,
      nextParams,
      isMobileViewport ? 42 : 72
    );
    set({ scenarioParams: nextParams, timeline: nextTimeline });
  },

  setBridgeClosed: (closed) => {
    const nextParams = { ...get().scenarioParams, bridgeClosed: closed };
    const nextTimeline = runDeterministicSimulation(
      get().world,
      nextParams,
      isMobileViewport ? 42 : 72
    );
    set({ scenarioParams: nextParams, timeline: nextTimeline });
  },

  setSimTimeMinutes: (minutes) => {
    const clamped = Math.max(360, Math.min(1320, minutes));
    set({ simTimeMinutes: clamped });
  },

  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setIsPlaying: (playing) => {
    set({ isPlaying: playing });
  },

  resetSimulation: () => {
    const nextTimeline = runDeterministicSimulation(
      get().world,
      DEFAULT_PARAMS,
      isMobileViewport ? 42 : 72
    );
    set({
      scenarioParams: DEFAULT_PARAMS,
      timeline: nextTimeline,
      simTimeMinutes: 540,
      isPlaying: false,
      comparisonBias: 0,
      selectedEntity: null,
      highlightedRoadId: null,
      cameraResetTick: get().cameraResetTick + 1,
    });
  },

  setCausalStepIndex: (idx) => {
    const clamped = Math.max(0, Math.min(CAUSAL_SEQUENCE.length - 1, idx));
    set({ causalStepIndex: clamped });
  },

  setCutawayMode: (enabled) => {
    set({ cutawayMode: enabled });
  },

  setSelectedEntity: (entity) => {
    set({ selectedEntity: entity });
  },

  setHoveredDistrictId: (id) => {
    set({ hoveredDistrictId: id });
  },

  setHoveredWorld: (world) => {
    set({ hoveredWorld: world });
  },

  setHighlightedRoadId: (roadId) => {
    set({ highlightedRoadId: roadId });
  },

  setStageExpanded: (expanded) => {
    set({ isStageExpanded: expanded });
  },

  setSimDrawerOpen: (open) => {
    set({ simDrawerOpen: open });
  },

  resetCameraView: () => {
    set({
      selectedEntity: null,
      highlightedRoadId: null,
      comparisonBias: 0,
      presentationMode:
        get().heroMode === 'simulate' ? 'simulation' : 'cinematic',
      cameraResetTick: get().cameraResetTick + 1,
    });
  },

  setProjectedLabels: (labels) => {
    set({ projectedLabels: labels });
  },

  getCurrentSnapshots: () => {
    const { timeline, simTimeMinutes } = get();
    return {
      snapshotA: getSnapshotAtTime(timeline, 'A', simTimeMinutes),
      snapshotB: getSnapshotAtTime(timeline, 'B', simTimeMinutes),
    };
  },
}));
