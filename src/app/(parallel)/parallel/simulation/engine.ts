import {
  CityWorldData,
  DistrictId,
  RoadEdge,
  createSeededRng,
} from '../world/cityGenerator';

export type InterventionStrategy =
  | 'reroute_vehicles'
  | 'increase_transit'
  | 'coordinate_deliveries';

export interface ScenarioParameters {
  trafficDemandPct: number; // 60 to 160
  transitCapacityPct: number; // 50 to 150
  intervention: InterventionStrategy;
  bridgeClosed: boolean;
}

export interface EdgeSimulationState {
  edgeId: string;
  closed: boolean;
  flowRate: number;
  effectiveCapacity: number;
  queueLength: number;
  utilization: number; // 0 to 2.5+
  congestionLevel: number; // 0 to 1 normalized
  travelTimeMin: number;
}

export interface SimulatedVehicle {
  id: string;
  vehicleType: 'car' | 'bus' | 'delivery';
  routeEdgeIds: string[];
  currentEdgeId: string;
  progressOnEdge: number; // 0 to 1
  x: number;
  y: number;
  z: number;
  headingRad: number;
  speedRatio: number;
  isDelayed: boolean;
}

export interface WorldSimulationSnapshot {
  timeMinutes: number; // 360 (06:00) to 1320 (22:00)
  timeFormatted: string;
  futureId: 'A' | 'B';
  edgeStates: Record<string, EdgeSimulationState>;
  districtCongestion: Record<DistrictId, number>;
  vehicles: SimulatedVehicle[];
  metrics: {
    avgTravelDelayMin: number;
    congestionIndex: number; // 0 to 100
    completedDeliveries: number;
    transitSharePct: number;
    gridLoadMw: number;
  };
}

export interface DualSimulationTimeline {
  params: ScenarioParameters;
  checkpointsMinutes: number[];
  futureA: WorldSimulationSnapshot[];
  futureB: WorldSimulationSnapshot[];
}

export function formatSimTime(minutes: number): string {
  const clamped = Math.max(360, Math.min(1320, Math.round(minutes)));
  const hrs = Math.floor(clamped / 60);
  const mins = clamped % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * Weighted Dijkstra shortest-path solver on the directed road graph.
 * Respects closed edges (unless allowClosedFallback is set) and edge travel costs.
 */
export function findShortestPath(
  edges: RoadEdge[],
  startNodeId: string,
  endNodeId: string,
  edgeCosts: Record<string, number>,
  closedEdgeIds: Set<string>
): string[] {
  if (startNodeId === endNodeId) return [];

  const adj = new Map<string, RoadEdge[]>();
  for (const edge of edges) {
    if (closedEdgeIds.has(edge.id)) continue;
    const list = adj.get(edge.from) ?? [];
    list.push(edge);
    adj.set(edge.from, list);
  }

  const dist = new Map<string, number>();
  const prevEdge = new Map<string, RoadEdge>();
  const visited = new Set<string>();

  dist.set(startNodeId, 0);

  while (true) {
    let bestNode: string | null = null;
    let bestDist = Infinity;

    for (const [nodeId, d] of dist.entries()) {
      if (!visited.has(nodeId) && d < bestDist) {
        bestDist = d;
        bestNode = nodeId;
      }
    }

    if (!bestNode || bestNode === endNodeId) break;
    visited.add(bestNode);

    const outgoing = adj.get(bestNode) ?? [];
    for (const edge of outgoing) {
      const cost = edgeCosts[edge.id] ?? edge.length / Math.max(1, edge.baseSpeed);
      const nextDist = bestDist + cost;
      if (nextDist < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, nextDist);
        prevEdge.set(edge.to, edge);
      }
    }
  }

  if (!prevEdge.has(endNodeId)) {
    return [];
  }

  const route: string[] = [];
  let curr = endNodeId;
  while (curr !== startNodeId) {
    const edge = prevEdge.get(curr);
    if (!edge) break;
    route.unshift(edge.id);
    curr = edge.from;
  }
  return route;
}

interface ODRouteDemand {
  from: string;
  to: string;
  baseFlow: number;
  isFreight: boolean;
}

const OD_DEMAND_PAIRS: ODRouteDemand[] = [
  { from: 'S-HARBOR-HUB', to: 'N-CBD-NE', baseFlow: 58, isFreight: true },
  { from: 'S-HARBOR-HUB', to: 'N-TECH-N', baseFlow: 46, isFreight: true },
  { from: 'S-HARBOR-E', to: 'N-CBD-SW', baseFlow: 42, isFreight: false },
  { from: 'S-GRID-SUB', to: 'N-CBD-NW', baseFlow: 52, isFreight: false },
  { from: 'S-IND-SE', to: 'N-TECH-N', baseFlow: 38, isFreight: true },
  { from: 'N-RES-NW', to: 'N-CBD-NE', baseFlow: 48, isFreight: false },
  { from: 'N-RES-NW', to: 'S-GRID-SUB', baseFlow: 36, isFreight: false },
  { from: 'N-CBD-NE', to: 'S-HARBOR-HUB', baseFlow: 44, isFreight: true },
  { from: 'N-TECH-N', to: 'S-IND-SE', baseFlow: 34, isFreight: false },
];

function getTimeOfDayDemandCurve(minutes: number): number {
  // Morning peak around 08:30 (510), midday plateau, afternoon peak around 17:30 (1050)
  const morningPeak = Math.exp(-Math.pow((minutes - 525) / 110, 2)) * 0.48;
  const eveningPeak = Math.exp(-Math.pow((minutes - 1035) / 130, 2)) * 0.52;
  const baseDay = 0.62 + 0.18 * Math.sin(((minutes - 360) / 960) * Math.PI);
  return baseDay + morningPeak + eveningPeak;
}

function simulateSingleFutureTimeline(
  world: CityWorldData,
  params: ScenarioParameters,
  futureId: 'A' | 'B',
  checkpoints: number[],
  vehicleCount = 72
): WorldSimulationSnapshot[] {
  const edges = world.edges;
  const edgeMap = new Map(edges.map((e) => [e.id, e]));

  // Persistent queue state across discrete steps
  const queues: Record<string, number> = {};
  for (const e of edges) queues[e.id] = 0;

  let cumulativeDeliveries = 0;
  const snapshots: WorldSimulationSnapshot[] = [];

  // Pre-seed deterministic vehicles
  const rng = createSeededRng(world.seed + (futureId === 'A' ? 101 : 202));
  const baseVehicles = Array.from({ length: vehicleCount }, (_, idx) => {
    const od = OD_DEMAND_PAIRS[idx % OD_DEMAND_PAIRS.length];
    const vType: 'car' | 'bus' | 'delivery' =
      idx % 5 === 0 ? 'delivery' : idx % 7 === 0 ? 'bus' : 'car';
    return {
      id: `VEH-${futureId}-${String(idx + 1).padStart(3, '0')}`,
      od,
      vehicleType: vType,
      phaseOffset: rng(),
      speedSeed: 0.88 + rng() * 0.24,
    };
  });

  for (let stepIdx = 0; stepIdx < checkpoints.length; stepIdx++) {
    const tMin = checkpoints[stepIdx];
    const todFactor = getTimeOfDayDemandCurve(tMin);

    // Bridge disruption occurs from 07:30 (450) onwards if bridgeClosed is true
    const isDisruptionActive = params.bridgeClosed && tMin >= 450;
    const closedSet = new Set<string>();
    if (isDisruptionActive) {
      closedSet.add('EDGE-BRIDGE-CENTRAL-FWD');
      closedSet.add('EDGE-BRIDGE-CENTRAL-REV');
    }

    // Demand & transit adjustments
    const userDemandMult = params.trafficDemandPct / 100;
    const userTransitMult = params.transitCapacityPct / 100;

    // Future A uses baseline static assumptions; Future B applies active intervention
    const activeIntervention = futureId === 'B' ? params.intervention : null;

    let transitAbsorption = 0.16 * userTransitMult;
    if (activeIntervention === 'increase_transit') {
      transitAbsorption = Math.min(0.52, 0.26 * userTransitMult + 0.12);
    } else if (futureId === 'B') {
      transitAbsorption = Math.min(0.42, 0.20 * userTransitMult);
    }

    // Calculate current edge costs for pathfinding
    const edgeCosts: Record<string, number> = {};
    for (const e of edges) {
      const baseTime = e.length / Math.max(1, e.baseSpeed);
      const qPenalty = (queues[e.id] ?? 0) / Math.max(20, e.baseCapacity);

      if (activeIntervention === 'reroute_vehicles') {
        // Coordinated system routes actively penalize congested approaches and favor alternate bridges
        const altBonus = e.isAlternateRoute ? 0.68 : 1.0;
        edgeCosts[e.id] = (baseTime * (1 + qPenalty * 2.4)) * altBonus;
      } else {
        // Baseline Future A has delayed congestion awareness and bottlenecks near central bridge approaches
        edgeCosts[e.id] = baseTime * (1 + qPenalty * 0.45);
      }
    }

    // Inject demand across OD pairs
    const stepFlows: Record<string, number> = {};
    for (const e of edges) stepFlows[e.id] = 8 * todFactor * userDemandMult;

    for (const od of OD_DEMAND_PAIRS) {
      let pairDemand = od.baseFlow * todFactor * userDemandMult;
      if (!od.isFreight) {
        pairDemand *= 1 - transitAbsorption;
      } else if (activeIntervention === 'coordinate_deliveries') {
        // Smooth peak freight surges & prioritize freight corridors
        const isPeak = tMin >= 480 && tMin <= 630;
        pairDemand *= isPeak ? 0.78 : 1.08;
      }

      const route = findShortestPath(edges, od.from, od.to, edgeCosts, closedSet);
      for (const edgeId of route) {
        stepFlows[edgeId] = (stepFlows[edgeId] ?? 0) + pairDemand;
      }

      // In Future A (No Intervention), when the bridge closes, uncoordinated traffic piles up on the immediate approaches
      if (isDisruptionActive && futureId === 'A') {
        stepFlows['EDGE-S-AVE-4-FWD'] = (stepFlows['EDGE-S-AVE-4-FWD'] ?? 0) + pairDemand * 0.42;
        stepFlows['EDGE-N-AVE-5-FWD'] = (stepFlows['EDGE-N-AVE-5-FWD'] ?? 0) + pairDemand * 0.38;
        stepFlows['EDGE-N-AVE-6-REV'] = (stepFlows['EDGE-N-AVE-6-REV'] ?? 0) + pairDemand * 0.35;
      }
    }

    // Update queues and compute edge states
    const edgeStates: Record<string, EdgeSimulationState> = {};
    let totalWeightedDelay = 0;
    let totalFlowWeight = 0;
    let sumCongestion = 0;
    let openEdgeCount = 0;

    for (const e of edges) {
      const isClosed = closedSet.has(e.id);
      let effectiveCap = e.baseCapacity;

      if (activeIntervention === 'reroute_vehicles' && e.isAlternateRoute) {
        effectiveCap *= 1.32; // Signal timing & reversible lane optimization
      }
      if (activeIntervention === 'increase_transit' && e.isTransitCorridor) {
        effectiveCap *= 1.24; // Dedicated busway & high-frequency rail priority
      }
      if (activeIntervention === 'coordinate_deliveries' && e.isDeliveryCorridor) {
        effectiveCap *= 1.26; // Smart loading windows & green-wave freight routing
      }

      if (isClosed) {
        queues[e.id] = 0;
        edgeStates[e.id] = {
          edgeId: e.id,
          closed: true,
          flowRate: 0,
          effectiveCapacity: 0,
          queueLength: 0,
          utilization: 0,
          congestionLevel: 1,
          travelTimeMin: Infinity,
        };
        continue;
      }

      const inflow = stepFlows[e.id] ?? 0;
      const prevQueue = queues[e.id] ?? 0;
      const demandLoad = inflow + prevQueue * 0.55;
      const discharged = Math.min(demandLoad, effectiveCap);
      const nextQueue = Math.max(0, (demandLoad - discharged) * (futureId === 'A' ? 0.92 : 0.62));
      queues[e.id] = Number(nextQueue.toFixed(2));

      const utilization = demandLoad / Math.max(1, effectiveCap);
      const congestionLevel = Math.min(
        1,
        Math.max(0, (utilization - 0.38) / (futureId === 'A' ? 0.95 : 1.15))
      );

      // BPR (Bureau of Public Roads) style travel time formula
      const freeFlowMin = (e.length / Math.max(1, e.baseSpeed)) * 2.2;
      const bprMultiplier = 1 + 0.65 * Math.pow(utilization, 2.6) + nextQueue * 0.025;
      const travelTimeMin = freeFlowMin * bprMultiplier;
      const delayMin = Math.max(0, travelTimeMin - freeFlowMin);

      totalWeightedDelay += delayMin * (inflow + 1);
      totalFlowWeight += inflow + 1;
      sumCongestion += congestionLevel;
      openEdgeCount++;

      edgeStates[e.id] = {
        edgeId: e.id,
        closed: false,
        flowRate: Number(inflow.toFixed(1)),
        effectiveCapacity: Number(effectiveCap.toFixed(1)),
        queueLength: Number(nextQueue.toFixed(1)),
        utilization: Number(utilization.toFixed(2)),
        congestionLevel: Number(congestionLevel.toFixed(3)),
        travelTimeMin: Number(travelTimeMin.toFixed(2)),
      };
    }

    // District congestion aggregation
    const districtAccum: Record<DistrictId, { sum: number; count: number }> = {
      cbd: { sum: 0, count: 0 },
      harbor: { sum: 0, count: 0 },
      north_res: { sum: 0, count: 0 },
      east_tech: { sum: 0, count: 0 },
      south_ind: { sum: 0, count: 0 },
      central_park: { sum: 0, count: 0 },
    };

    for (const e of edges) {
      const st = edgeStates[e.id];
      if (!st || st.closed) continue;
      districtAccum[e.districtId].sum += st.congestionLevel;
      districtAccum[e.districtId].count += 1;
    }

    const districtCongestion: Record<DistrictId, number> = {
      cbd: 0,
      harbor: 0,
      north_res: 0,
      east_tech: 0,
      south_ind: 0,
      central_park: 0,
    };
    for (const dId of Object.keys(districtAccum) as DistrictId[]) {
      const item = districtAccum[dId];
      districtCongestion[dId] = Number(
        (item.count > 0 ? item.sum / item.count : 0).toFixed(2)
      );
    }

    const avgDelay = totalFlowWeight > 0 ? totalWeightedDelay / totalFlowWeight : 0;
    const rawCongestionIdx =
      openEdgeCount > 0 ? (sumCongestion / openEdgeCount) * 100 : 0;
    const congestionIndex = Math.min(99, Math.max(8, Math.round(rawCongestionIdx * 1.25)));

    // Completed deliveries increment per 15-min step based on network fluidity and freight intervention
    const baseStepDeliveries = 26 * todFactor * (0.75 + 0.25 * userDemandMult);
    const delayFriction = Math.max(0.32, 1 - avgDelay * 0.055);
    const coordinationBonus =
      activeIntervention === 'coordinate_deliveries'
        ? 1.28
        : activeIntervention === 'reroute_vehicles'
        ? 1.15
        : activeIntervention === 'increase_transit'
        ? 1.11
        : 1.0;

    if (stepIdx > 0) {
      cumulativeDeliveries += baseStepDeliveries * delayFriction * coordinationBonus;
    } else {
      cumulativeDeliveries = 42;
    }

    // Position vehicles deterministically along their active paths
    const simVehicles: SimulatedVehicle[] = [];
    for (let vIdx = 0; vIdx < baseVehicles.length; vIdx++) {
      const bv = baseVehicles[vIdx];
      const route = findShortestPath(
        edges,
        bv.od.from,
        bv.od.to,
        edgeCosts,
        closedSet
      );
      if (route.length === 0) continue;

      const timeNorm = (tMin - 360) / 960;
      const speedMod =
        bv.speedSeed * (futureId === 'B' ? 1.18 : 0.85) / (1 + avgDelay * 0.08);
      const totalProgress = (bv.phaseOffset + timeNorm * 14 * speedMod) % 1;
      const scaledEdgePos = totalProgress * route.length;
      const edgeChoiceIdx = Math.min(route.length - 1, Math.floor(scaledEdgePos));
      const progressOnEdge = scaledEdgePos - edgeChoiceIdx;

      const activeEdgeId = route[edgeChoiceIdx];
      const edgeObj = edgeMap.get(activeEdgeId);
      if (!edgeObj) continue;

      // Quadratic Bezier interpolation along edgeObj.points[0..2]
      const [p0, p1, p2] = edgeObj.points;
      const invT = 1 - progressOnEdge;
      const x =
        invT * invT * p0.x +
        2 * invT * progressOnEdge * p1.x +
        progressOnEdge * progressOnEdge * p2.x;
      const y =
        invT * invT * p0.y +
        2 * invT * progressOnEdge * p1.y +
        progressOnEdge * progressOnEdge * p2.y;
      const z =
        invT * invT * p0.z +
        2 * invT * progressOnEdge * p1.z +
        progressOnEdge * progressOnEdge * p2.z;

      // Tangent derivative for heading
      const tx = 2 * invT * (p1.x - p0.x) + 2 * progressOnEdge * (p2.x - p1.x);
      const tz = 2 * invT * (p1.z - p0.z) + 2 * progressOnEdge * (p2.z - p1.z);
      const headingRad = Math.atan2(tx, tz);

      const eState = edgeStates[activeEdgeId];
      const isDelayed = (eState?.congestionLevel ?? 0) > 0.58;

      simVehicles.push({
        id: bv.id,
        vehicleType: bv.vehicleType,
        routeEdgeIds: route,
        currentEdgeId: activeEdgeId,
        progressOnEdge: Number(progressOnEdge.toFixed(3)),
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        z: Number(z.toFixed(2)),
        headingRad: Number(headingRad.toFixed(3)),
        speedRatio: Number(Math.max(0.2, 1 - (eState?.congestionLevel ?? 0) * 0.7).toFixed(2)),
        isDelayed,
      });
    }

    const gridLoadMw = Number(
      (
        142 *
        todFactor *
        (0.85 + 0.15 * userDemandMult) *
        (activeIntervention === 'increase_transit' ? 1.06 : 1.0)
      ).toFixed(1)
    );

    snapshots.push({
      timeMinutes: tMin,
      timeFormatted: formatSimTime(tMin),
      futureId,
      edgeStates,
      districtCongestion,
      vehicles: simVehicles,
      metrics: {
        avgTravelDelayMin: Number(avgDelay.toFixed(1)),
        congestionIndex,
        completedDeliveries: Math.round(cumulativeDeliveries),
        transitSharePct: Math.round(transitAbsorption * 100),
        gridLoadMw,
      },
    });
  }

  return snapshots;
}

/**
 * Generates the complete deterministic dual-future simulation timeline
 * from 06:00 (360m) to 22:00 (1320m) in 15-minute checkpoints.
 */
export function runDeterministicSimulation(
  world: CityWorldData,
  params: ScenarioParameters,
  vehicleCount = 72
): DualSimulationTimeline {
  const checkpointsMinutes: number[] = [];
  for (let m = 360; m <= 1320; m += 15) {
    checkpointsMinutes.push(m);
  }

  const futureA = simulateSingleFutureTimeline(
    world,
    params,
    'A',
    checkpointsMinutes,
    vehicleCount
  );
  const futureB = simulateSingleFutureTimeline(
    world,
    params,
    'B',
    checkpointsMinutes,
    vehicleCount
  );

  return {
    params: { ...params },
    checkpointsMinutes,
    futureA,
    futureB,
  };
}

/**
 * Retrieves or interpolates the exact deterministic snapshot at any simulated minute (360..1320).
 * Scrubbing backward or forward always yields the exact reproducible state for that timestamp.
 */
export function getSnapshotAtTime(
  timeline: DualSimulationTimeline,
  futureId: 'A' | 'B',
  targetMinutes: number
): WorldSimulationSnapshot {
  const list = futureId === 'A' ? timeline.futureA : timeline.futureB;
  const clamped = Math.max(360, Math.min(1320, targetMinutes));
  const idxFloat = (clamped - 360) / 15;
  const lowIdx = Math.max(0, Math.min(list.length - 1, Math.floor(idxFloat)));
  const highIdx = Math.max(0, Math.min(list.length - 1, Math.ceil(idxFloat)));
  const alpha = idxFloat - lowIdx;

  if (lowIdx === highIdx || alpha < 0.001) {
    return list[lowIdx];
  }

  const snapLow = list[lowIdx];
  const snapHigh = list[highIdx];

  return {
    ...snapLow,
    timeMinutes: Math.round(clamped),
    timeFormatted: formatSimTime(clamped),
    metrics: {
      avgTravelDelayMin: Number(
        (
          snapLow.metrics.avgTravelDelayMin * (1 - alpha) +
          snapHigh.metrics.avgTravelDelayMin * alpha
        ).toFixed(1)
      ),
      congestionIndex: Math.round(
        snapLow.metrics.congestionIndex * (1 - alpha) +
          snapHigh.metrics.congestionIndex * alpha
      ),
      completedDeliveries: Math.round(
        snapLow.metrics.completedDeliveries * (1 - alpha) +
          snapHigh.metrics.completedDeliveries * alpha
      ),
      transitSharePct: snapLow.metrics.transitSharePct,
      gridLoadMw: Number(
        (
          snapLow.metrics.gridLoadMw * (1 - alpha) +
          snapHigh.metrics.gridLoadMw * alpha
        ).toFixed(1)
      ),
    },
  };
}
