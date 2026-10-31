import { test } from 'vitest';
import assert from 'node:assert/strict';
import { generateCityWorld } from '../world/cityGenerator';
import {
  findShortestPath,
  runDeterministicSimulation,
  getSnapshotAtTime,
  ScenarioParameters,
} from './engine';
import {
  computeModeChoreography,
  computeSceneChoreography,
  dampValue,
} from './cameraMath';
import { validateDemoRequest } from './validation';
import {
  WORKFLOW_HUBS,
  WORKFLOW_CORRIDORS,
  WORKFLOW_LAYERS,
  computeWorkflowStageChoreography,
} from './workflowTwinMath';

test('1. Seeded world consistency: identical seeds generate identical city geometry and IDs', () => {
  const world1 = generateCityWorld(20261031, false);
  const world2 = generateCityWorld(20261031, false);

  assert.equal(world1.buildings.length, world2.buildings.length);
  assert.ok(world1.buildings.length >= 180 && world1.buildings.length <= 300);
  assert.deepEqual(world1.buildings[0], world2.buildings[0]);
  assert.deepEqual(world1.buildings[120], world2.buildings[120]);
  assert.deepEqual(world1.edges, world2.edges);

  // Verify all 6 architectural families are represented
  const families = new Set(world1.buildings.map((b) => b.family));
  assert.equal(families.size, 6);
});

test('2. Road graph connectivity: all major districts and hubs are reachable when open', () => {
  const world = generateCityWorld(20261031, false);
  const openSet = new Set<string>();
  const pathHarborToCbd = findShortestPath(
    world.edges,
    'S-HARBOR-HUB',
    'N-CBD-NE',
    {},
    openSet
  );
  assert.ok(pathHarborToCbd.length > 0, 'Harbor to CBD path should exist');
  assert.ok(
    pathHarborToCbd.includes('EDGE-BRIDGE-CENTRAL-FWD'),
    'Default shortest path from Harbor to CBD should use Meridian Central Bridge'
  );
});

test('3. Pathfinding around closures: closing Meridian Central Bridge reroutes vehicles via alternate crossings', () => {
  const world = generateCityWorld(20261031, false);
  const closedSet = new Set<string>([
    'EDGE-BRIDGE-CENTRAL-FWD',
    'EDGE-BRIDGE-CENTRAL-REV',
  ]);
  const reroutedPath = findShortestPath(
    world.edges,
    'S-HARBOR-HUB',
    'N-CBD-NE',
    {},
    closedSet
  );
  assert.ok(reroutedPath.length > 0, 'Rerouted path should exist when central bridge closes');
  assert.ok(
    !reroutedPath.includes('EDGE-BRIDGE-CENTRAL-FWD'),
    'Rerouted path must not traverse closed central bridge'
  );
  const usesAlternate =
    reroutedPath.includes('EDGE-BRIDGE-WEST-FWD') ||
    reroutedPath.includes('EDGE-BRIDGE-EAST-FWD');
  assert.ok(usesAlternate, 'Rerouted path must use West Viaduct or East Crossing');
});

test('4. Simulation determinism: identical parameters produce identical timelines and metrics', () => {
  const world = generateCityWorld(20261031, false);
  const params: ScenarioParameters = {
    trafficDemandPct: 110,
    transitCapacityPct: 100,
    intervention: 'reroute_vehicles',
    bridgeClosed: true,
  };
  const run1 = runDeterministicSimulation(world, params, 40);
  const run2 = runDeterministicSimulation(world, params, 40);

  assert.deepEqual(run1.futureA[20].metrics, run2.futureA[20].metrics);
  assert.deepEqual(run1.futureB[20].metrics, run2.futureB[20].metrics);
  assert.deepEqual(run1.futureB[20].vehicles[0], run2.futureB[20].vehicles[0]);
});

test('5. Intervention parameter effects: Future B outperforms Future A under disruption and responds to demand/transit sliders', () => {
  const world = generateCityWorld(20261031, false);
  const baseParams: ScenarioParameters = {
    trafficDemandPct: 120,
    transitCapacityPct: 100,
    intervention: 'reroute_vehicles',
    bridgeClosed: true,
  };
  const sim = runDeterministicSimulation(world, baseParams, 40);
  const peakA = getSnapshotAtTime(sim, 'A', 1020); // 17:00
  const peakB = getSnapshotAtTime(sim, 'B', 1020); // 17:00

  assert.ok(
    peakB.metrics.avgTravelDelayMin < peakA.metrics.avgTravelDelayMin,
    'Coordinated Future B should have lower travel delay than Future A'
  );
  assert.ok(
    peakB.metrics.completedDeliveries > peakA.metrics.completedDeliveries,
    'Coordinated Future B should complete more deliveries than Future A'
  );

  // Increasing traffic demand should increase delay and congestion
  const highDemandSim = runDeterministicSimulation(
    world,
    { ...baseParams, trafficDemandPct: 155 },
    40
  );
  const peakHighDemandB = getSnapshotAtTime(highDemandSim, 'B', 1020);
  assert.ok(
    peakHighDemandB.metrics.avgTravelDelayMin > peakB.metrics.avgTravelDelayMin,
    'Higher traffic demand should increase average travel delay'
  );

  // Increasing transit capacity with increase_transit intervention should raise transit share and reduce road delay
  const lowTransitSim = runDeterministicSimulation(
    world,
    { ...baseParams, intervention: 'increase_transit', transitCapacityPct: 60 },
    40
  );
  const highTransitSim = runDeterministicSimulation(
    world,
    { ...baseParams, intervention: 'increase_transit', transitCapacityPct: 145 },
    40
  );
  const snapLowTransit = getSnapshotAtTime(lowTransitSim, 'B', 1020);
  const snapHighTransit = getSnapshotAtTime(highTransitSim, 'B', 1020);
  assert.ok(
    snapHighTransit.metrics.transitSharePct > snapLowTransit.metrics.transitSharePct
  );
  assert.ok(
    snapHighTransit.metrics.avgTravelDelayMin < snapLowTransit.metrics.avgTravelDelayMin
  );
});

test('6. Replay and backward time scrubbing: scrubbing forward then backward restores exact earlier state', () => {
  const world = generateCityWorld(20261031, false);
  const params: ScenarioParameters = {
    trafficDemandPct: 100,
    transitCapacityPct: 100,
    intervention: 'coordinate_deliveries',
    bridgeClosed: true,
  };
  const timeline = runDeterministicSimulation(world, params, 40);

  const morningInitial = getSnapshotAtTime(timeline, 'B', 510); // 08:30
  const eveningPeak = getSnapshotAtTime(timeline, 'B', 1080); // 18:00
  const morningScrubbedBack = getSnapshotAtTime(timeline, 'B', 510); // 08:30

  assert.notDeepEqual(morningInitial.metrics, eveningPeak.metrics);
  assert.deepEqual(morningInitial, morningScrubbedBack);
});

test('7. Camera mode transitions and reversible split choreography across cinematic hero and all 6 interactive modes', () => {
  const cinematicHero = computeModeChoreography('explore', {
    heroState: 'cinematic',
  });
  assert.equal(cinematicHero.splitFactor, 0);
  assert.equal(cinematicHero.mode, 'cinematic_hero');

  const explore = computeModeChoreography('explore', {
    heroState: 'interactive',
  });
  assert.equal(explore.splitFactor, 0);
  assert.equal(explore.mode, 'macro_low_angle');

  const systems = computeModeChoreography('systems');
  assert.equal(systems.splitFactor, 0);
  assert.equal(systems.mode, 'axonometric_layers');

  const disrupt = computeModeChoreography('disrupt');
  assert.equal(disrupt.splitFactor, 1);
  assert.equal(disrupt.mode, 'symmetrical_dual_split');

  const simulate = computeModeChoreography('simulate');
  assert.equal(simulate.splitFactor, 1);
  assert.equal(simulate.mode, 'simulation_lab_split');

  const explain = computeModeChoreography('explain', {
    causalTarget: { x: 0, y: 1.2, z: 0 },
  });
  assert.equal(explain.splitFactor, 0);
  assert.equal(explain.mode, 'causal_isolation');

  const outcome = computeModeChoreography('outcome');
  assert.equal(outcome.splitFactor, 0);
  assert.equal(outcome.mode, 'realigned_studio');
  assert.ok(outcome.realignGhostAlpha > 0);

  // Reversible mode switching back to Explore restores exact initial pose and splitFactor = 0
  const backToExplore = computeModeChoreography('explore');
  assert.equal(backToExplore.splitFactor, 0);
  assert.deepEqual(explore.pose, backToExplore.pose);

  // Legacy wrapper compatibility
  const ch3Split = computeSceneChoreography(0.50);
  assert.equal(ch3Split.splitFactor, 1);

  // Damping helper moves smoothly toward target
  const damped = dampValue(0, 10, 5, 0.1);
  assert.ok(damped > 0 && damped < 10);
});

test('8. Input validation: Demo request form rejects invalid inputs and accepts valid V2 submission', () => {
  const emptyResult = validateDemoRequest({
    fullName: '',
    workEmail: 'invalid-email',
    company: '',
    industry: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.fullName);
  assert.ok(emptyResult.errors.workEmail);
  assert.ok(emptyResult.errors.company);
  assert.ok(emptyResult.errors.industry);

  const validResult = validateDemoRequest({
    fullName: 'Dr. Elena Rostova',
    workEmail: 'elena.rostova@meridian-grid.org',
    company: 'Meridian Urban Systems',
    industry: 'Mobility',
    modelingGoal: 'Cross-river transit resilience during scheduled bridge retrofit.',
  });
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('9. Section 02 Workflow 3D Twin: 6 district hubs, 3 analytical layers, and reversible 3-stage choreography', () => {
  assert.equal(WORKFLOW_HUBS.length, 6);
  assert.equal(WORKFLOW_LAYERS.length, 3);
  assert.equal(WORKFLOW_CORRIDORS.length, 7);

  // Every hub must have composite building clusters and connected corridors
  for (const hub of WORKFLOW_HUBS) {
    assert.ok(hub.buildings.length >= 6, `${hub.id} should have at least 6 building blocks`);
    assert.ok(hub.connectedCorridors.length >= 2, `${hub.id} should connect to at least 2 corridors`);
  }

  const stage0 = computeWorkflowStageChoreography(0);
  assert.equal(stage0.stageId, 'understand');
  assert.equal(stage0.bridgeDisrupted, false);
  assert.equal(stage0.layerVisibility, 1.0);
  assert.equal(stage0.baselineArcAlpha, 0.0);
  assert.equal(stage0.interventionArcAlpha, 0.0);

  const stage1 = computeWorkflowStageChoreography(1);
  assert.equal(stage1.stageId, 'simulate');
  assert.equal(stage1.bridgeDisrupted, true);
  assert.equal(stage1.baselineArcAlpha, 1.0);
  assert.equal(stage1.interventionArcAlpha, 1.0);

  const stage2 = computeWorkflowStageChoreography(2);
  assert.equal(stage2.stageId, 'decide');
  assert.equal(stage2.bridgeDisrupted, true);
  assert.ok(stage2.baselineArcAlpha < 0.3, 'Unselected baseline route should be translucent in Decide stage');
  assert.equal(stage2.interventionArcAlpha, 1.0);
  assert.equal(stage2.resolvedPathAlpha, 1.0);

  // Focusing a hub biases the camera target toward that hub
  const focused = computeWorkflowStageChoreography(0, { focusedHubId: 'WEST_HARBOR' });
  assert.ok(focused.cameraTarget.x < stage0.cameraTarget.x);
});
