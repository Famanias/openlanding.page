import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  computeRealitySplitChoreography,
  evaluateParallelFuturesState,
  getCanonicalCity25D,
  getInspectableEntityComparison,
  getParallelFuturesCacheStats,
  clearParallelFuturesCache,
} from './parallelFutures25D';

test('10. Section 04 Canonical 2.5D City: shared 48-building, 6-district, 3-bridge isometric model', () => {
  const city1 = getCanonicalCity25D();
  const city2 = getCanonicalCity25D();

  assert.equal(city1, city2, 'Canonical 2.5D city should be deterministically cached and shared');
  assert.equal(city1.districts.length, 6);
  assert.equal(city1.bridges.length, 3);
  assert.ok(
    city1.buildings.length >= 30 && city1.buildings.length <= 60,
    `Expected 30-60 buildings, got ${city1.buildings.length}`
  );

  // Verify depth sorting (back-to-front)
  for (let i = 1; i < city1.buildings.length; i++) {
    assert.ok(
      city1.buildings[i].depth >= city1.buildings[i - 1].depth,
      'Buildings must be depth-sorted back-to-front for isometric painter rendering'
    );
  }

  // Verify all 6 architectural building families are present
  const families = new Set(city1.buildings.map((b) => b.family));
  assert.equal(families.size, 6);
});

test('11. Section 04 Bridge Closure & Vehicle Path Validity: zero vehicles traverse closed bridge after 07:30', () => {
  const preClosure = evaluateParallelFuturesState(435, 'reroute_vehicles'); // 07:15
  assert.equal(preClosure.closureActive, false);
  assert.equal(
    preClosure.baseline.corridorStates['CORRIDOR_CENTRAL_BRIDGE'].closed,
    false
  );
  assert.deepEqual(
    preClosure.baseline.metrics,
    preClosure.alternative.metrics,
    'Before 07:30 closure, Future A and Future B should have identical baseline metrics'
  );

  for (const strategy of [
    'reroute_vehicles',
    'increase_transit',
    'coordinate_deliveries',
  ] as const) {
    const postClosure = evaluateParallelFuturesState(525, strategy); // 08:45
    assert.equal(postClosure.closureActive, true);
    assert.equal(
      postClosure.baseline.corridorStates['CORRIDOR_CENTRAL_BRIDGE'].closed,
      true
    );
    assert.equal(
      postClosure.alternative.corridorStates['CORRIDOR_CENTRAL_BRIDGE'].closed,
      true
    );

    const baselineBridgeVehicles = postClosure.baseline.vehicles.filter(
      (v) => v.corridorId === 'CORRIDOR_CENTRAL_BRIDGE'
    );
    const altBridgeVehicles = postClosure.alternative.vehicles.filter(
      (v) => v.corridorId === 'CORRIDOR_CENTRAL_BRIDGE'
    );
    assert.equal(
      baselineBridgeVehicles.length,
      0,
      'No baseline vehicles may cross the closed Meridian Central Bridge after 07:30'
    );
    assert.equal(
      altBridgeVehicles.length,
      0,
      `No Future B (${strategy}) vehicles may cross the closed Meridian Central Bridge after 07:30`
    );
  }
});

test('12. Section 04 Intervention Isolation: Future A remains fixed while Future B adapts per strategy', () => {
  const reroute = evaluateParallelFuturesState(525, 'reroute_vehicles');
  const transit = evaluateParallelFuturesState(525, 'increase_transit');
  const freight = evaluateParallelFuturesState(525, 'coordinate_deliveries');

  // Future A (Baseline) must remain 100% invariant when switching Future B interventions
  assert.deepEqual(reroute.baseline.metrics, transit.baseline.metrics);
  assert.deepEqual(reroute.baseline.metrics, freight.baseline.metrics);
  assert.deepEqual(reroute.baseline.corridorStates, transit.baseline.corridorStates);
  assert.deepEqual(reroute.baseline.vehicles, freight.baseline.vehicles);

  // Future B must outperform Future A across all 3 interventions
  for (const state of [reroute, transit, freight]) {
    assert.ok(
      state.alternative.metrics.avgTravelDelayMin < state.baseline.metrics.avgTravelDelayMin
    );
    assert.ok(
      state.alternative.metrics.congestionIndex < state.baseline.metrics.congestionIndex
    );
    assert.ok(
      state.alternative.metrics.completedDeliveries >
        state.baseline.metrics.completedDeliveries
    );
  }

  // Each intervention produces distinct Future B metrics and observations
  assert.notDeepEqual(reroute.alternative.metrics, transit.alternative.metrics);
  assert.notDeepEqual(transit.alternative.metrics, freight.alternative.metrics);
  assert.ok(
    freight.alternative.metrics.completedDeliveries >
      reroute.alternative.metrics.completedDeliveries,
    'Freight Window Slotting should maximize completed deliveries'
  );
  assert.ok(
    transit.alternative.metrics.transitSharePct >
      reroute.alternative.metrics.transitSharePct,
    'Transit Capacity Surge should maximize transit mode share'
  );
});

test('13. Section 04 Timeline Scrubbing, Paired Entity Inspection & Reality Split Choreography', () => {
  const tEarly = evaluateParallelFuturesState(480, 'reroute_vehicles'); // 08:00
  const tLate = evaluateParallelFuturesState(570, 'reroute_vehicles'); // 09:30
  const tScrubbedBack = evaluateParallelFuturesState(480, 'reroute_vehicles'); // 08:00

  assert.notDeepEqual(tEarly.baseline.metrics, tLate.baseline.metrics);
  assert.deepEqual(tEarly, tScrubbedBack);

  const centralInsp = getInspectableEntityComparison('BRIDGE_CENTRAL', tLate);
  assert.equal(centralInsp.category, 'bridge');
  assert.equal(centralInsp.baselineSeverity, 'critical');

  const phase1 = computeRealitySplitChoreography(0.1);
  const phase3 = computeRealitySplitChoreography(0.5);
  const phase5 = computeRealitySplitChoreography(1.0);

  assert.equal(phase1.phase, 1);
  assert.equal(phase1.splitAmount, 0);
  assert.equal(phase3.phase, 3);
  assert.ok(phase3.splitAmount > 0 && phase3.splitAmount < 1);
  assert.equal(phase5.phase, 5);
  assert.equal(phase5.splitAmount, 1);
});

test('15. Section 04 2.5D State & Entity Inspection Caching: O(1) reference identity on repeated scrub', () => {
  clearParallelFuturesCache();
  const s1 = evaluateParallelFuturesState(525, 'reroute_vehicles');
  const s2 = evaluateParallelFuturesState(525, 'reroute_vehicles');
  const stats = getParallelFuturesCacheStats();

  assert.equal(s1, s2, 'Repeated 2.5D state evaluation should return cached object reference');
  assert.equal(stats.misses, 1);
  assert.equal(stats.hits, 1);

  const e1 = getInspectableEntityComparison('BRIDGE_CENTRAL', s1);
  const e2 = getInspectableEntityComparison('BRIDGE_CENTRAL', s2);
  assert.equal(e1, e2, 'Repeated entity inspection should return cached object reference');
});



