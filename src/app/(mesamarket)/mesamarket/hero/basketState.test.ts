import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  CRATE_SPEC,
  PRODUCE_CATALOG,
  addProduceInstance,
  clearBasketState,
  createInitialBasketState,
  evaluateFlightArc,
  getCuratedAdditions,
  removeProduceInstance,
} from './basketState';

test('basket starts strictly empty', () => {
  const initial = createInitialBasketState();
  assert.equal(initial.items.length, 0);
  assert.equal(initial.nextSeq, 1);
});

test('clicking source produce adds independent instances without auto-removing carrots (carrot regression fix)', () => {
  let state = createInitialBasketState();

  const tomatoRes = addProduceInstance(state, 'vine-tomatoes', 'src-tomatoes');
  state = tomatoRes.nextState;
  assert.equal(state.items.length, 1);

  const carrotRes = addProduceInstance(state, 'carrots', 'src-carrots');
  state = carrotRes.nextState;
  assert.equal(state.items.length, 2);
  const carrotId = carrotRes.added.instanceId;

  // Adding subsequent produce (lemon, baguette, bell pepper) must NEVER eject or mutate the carrot
  state = addProduceInstance(state, 'lemon', 'src-lemon-upper').nextState;
  state = addProduceInstance(state, 'baguette', 'src-baguette').nextState;
  state = addProduceInstance(state, 'bell-pepper', 'src-bell-pepper').nextState;

  assert.equal(state.items.length, 5);
  const stillHasCarrot = state.items.find((i) => i.instanceId === carrotId);
  assert.ok(stillHasCarrot, 'Carrot instance must remain in basket');
  assert.deepEqual(stillHasCarrot.slot, carrotRes.added.slot);
});

test('supports unlimited quantities of each produce type with distinct non-colliding 3D slots', () => {
  let state = createInitialBasketState();
  const produceTypes = Object.keys(PRODUCE_CATALOG) as Array<keyof typeof PRODUCE_CATALOG>;

  // Add 8 carrots in a row + 20 mixed items (28 total items)
  for (let i = 0; i < 8; i++) {
    state = addProduceInstance(state, 'carrots', 'src-carrots').nextState;
  }
  for (let i = 0; i < 20; i++) {
    const pid = produceTypes[i % produceTypes.length];
    state = addProduceInstance(state, pid).nextState;
  }

  assert.equal(state.items.length, 28);
  const uniqueIds = new Set(state.items.map((item) => item.instanceId));
  assert.equal(uniqueIds.size, 28);

  // Check pairwise 3D positions are distinct (zero exact overlap / z-fighting)
  for (let i = 0; i < state.items.length; i++) {
    for (let j = i + 1; j < state.items.length; j++) {
      const a = state.items[i].slot.worldPosition;
      const b = state.items[j].slot.worldPosition;
      const dist = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      assert.ok(dist > 0.05, `Items ${i} and ${j} collided at distance ${dist}`);
    }
  }
});

test('clicking a specific item inside the basket removes ONLY that instance and preserves duplicates', () => {
  let state = createInitialBasketState();
  const c1 = addProduceInstance(state, 'carrots');
  state = c1.nextState;
  const c2 = addProduceInstance(state, 'carrots');
  state = c2.nextState;
  const c3 = addProduceInstance(state, 'carrots');
  state = c3.nextState;

  assert.equal(state.items.length, 3);

  // Remove middle carrot instance c2
  const rem = removeProduceInstance(state, c2.added.instanceId);
  state = rem.nextState;

  assert.equal(rem.removed?.instanceId, c2.added.instanceId);
  assert.equal(state.items.length, 2);
  assert.deepEqual(
    state.items.map((i) => i.instanceId),
    [c1.added.instanceId, c3.added.instanceId]
  );
  // Remaining items keep their exact slots without jumping
  assert.deepEqual(state.items[0].slot, c1.added.slot);
  assert.deepEqual(state.items[1].slot, c3.added.slot);

  const cleared = clearBasketState(state);
  assert.equal(cleared.items.length, 0);
});

test('evaluateFlightArc produces smooth curved trajectory clearing crate rim with perspective rotation', () => {
  const startPos: [number, number, number] = [-1.22, -0.78, 2.26];
  const endPos: [number, number, number] = [0.85, 0.74, -0.35];
  const startRot: [number, number, number] = [-0.3, 0, 0];
  const endRot: [number, number, number] = [-0.2, 0.04, 0.06];

  const s0 = evaluateFlightArc(startPos, endPos, startRot, endRot, 0, 'into-basket');
  const sMid = evaluateFlightArc(startPos, endPos, startRot, endRot, 0.5, 'into-basket');
  const sEnd = evaluateFlightArc(startPos, endPos, startRot, endRot, 1, 'into-basket');

  assert.ok(Math.abs(s0.position[0] - startPos[0]) < 1e-6);
  assert.ok(Math.abs(s0.position[1] - startPos[1]) < 1e-6);
  assert.ok(Math.abs(sEnd.position[0] - endPos[0]) < 1e-6);
  assert.ok(Math.abs(sEnd.position[1] - endPos[1]) < 1e-6);

  // Mid-flight height must clear crate rim generously
  assert.ok(
    sMid.position[1] > CRATE_SPEC.rimWorldY + 0.5,
    `Mid-flight Y (${sMid.position[1]}) must clear crate rim (${CRATE_SPEC.rimWorldY})`
  );
  // Mid-flight perspective rotation & lift scale must activate
  assert.ok(Math.abs(sMid.rotation[1]) > 0.1);
  assert.ok(sMid.scaleMultiplier > 1.04);

  // Curated basket helper returns full assortment from empty state
  const additions = getCuratedAdditions(createInitialBasketState());
  assert.ok(additions.length >= 10);
});
