import { test } from 'vitest';
import assert from 'node:assert/strict';
import { DesertWindField } from './DesertWindField';
import { evaluatePaintingReveal } from './PaintingRevealTimeline';
import {
  TRAVELER_BASE_X,
  TRAVELER_BASE_Y,
  TRAVELER_MAX_WALK_DX,
  TRAVELER_RIDGE_SLOPE,
  computeTravelerPose,
} from './TravelerAnimator';
import { evaluateCinematicScroll } from './CinematicScrollController';
import { LIVING_BRUSH_STROKES, evaluateLivingStroke } from './LivingBrushSystem';
import { DustWashSystem } from './DustWashSystem';
import {
  computeGrassBladeAngleDeg,
  computeShrubBranchAngleDeg,
} from './VegetationAnimator';

test('PaintingRevealTimeline starts blank at 0, stages sequentially, and completes cleanly at 1', () => {
  const s0 = evaluatePaintingReveal(0);
  assert.equal(s0.stage, 'paper');
  assert.equal(s0.sunProgress, 0);
  assert.equal(s0.canyonMidProgress, 0);
  assert.equal(s0.travelerProgress, 0);
  assert.equal(s0.isComplete, false);

  const sMidBrush = evaluatePaintingReveal(0.32);
  assert.equal(sMidBrush.stage, 'brushwork');
  assert.equal(sMidBrush.sunProgress, 1);
  assert.ok(sMidBrush.canyonMidProgress > 0 && sMidBrush.canyonMidProgress < 1);
  assert.equal(sMidBrush.travelerProgress, 0);

  const sDetails = evaluatePaintingReveal(0.64);
  assert.equal(sDetails.stage, 'details');
  assert.ok(sDetails.vegetationProgress > 0.4);
  assert.ok(sDetails.travelerProgress > 0.2);

  const sDone = evaluatePaintingReveal(1);
  assert.equal(sDone.stage, 'alive');
  assert.equal(sDone.isComplete, true);
  assert.equal(sDone.lifeBlend, 1);
  assert.equal(sDone.cliffWallProgress, 1);
});

test('DesertWindField produces coherent directional airflow and localized pointer breeze', () => {
  const field = new DesertWindField();
  const baseSample = field.sampleAt(900, 800, 3.2, {
    windStrength: 1,
    motionIntensity: 1,
  });
  assert.ok(baseSample.dx > 0, 'prevailing canyon wind flows left-to-right');
  assert.ok(baseSample.strength > 0.1);

  const nearPointer = field.sampleAt(900, 800, 3.2, {
    windStrength: 1,
    motionIntensity: 1,
    pointerEnabled: true,
    pointerWind: { x: 920, y: 810, vx: 650, vy: -80, strength: 1 },
  });
  const farPointer = field.sampleAt(1800, 200, 3.2, {
    windStrength: 1,
    motionIntensity: 1,
    pointerEnabled: true,
    pointerWind: { x: 920, y: 810, vx: 650, vy: -80, strength: 1 },
  });
  assert.ok(nearPointer.pointerInfluence > 0.5);
  assert.equal(farPointer.pointerInfluence, 0);
});

test('TravelerAnimator stays strictly bounded on the ridge and grounded along ridge slope', () => {
  const field = new DesertWindField();
  let sawWalking = false;
  let sawIdle = false;

  for (let t = 0; t <= 26; t += 0.5) {
    const wind = field.sampleAt(TRAVELER_BASE_X, TRAVELER_BASE_Y, t, {
      windStrength: 1,
      motionIntensity: 1,
    });
    const pose = computeTravelerPose(t, wind, 0, {
      enabled: true,
      motionIntensity: 1,
      lifeBlend: 1,
    });

    const dx = pose.x - TRAVELER_BASE_X;
    assert.ok(dx >= -0.001 && dx <= TRAVELER_MAX_WALK_DX + 0.001);
    const expectedY = TRAVELER_BASE_Y + dx * TRAVELER_RIDGE_SLOPE;
    assert.ok(Math.abs(pose.y - expectedY) < 0.001, 'feet remain grounded on ridge slope');

    if (pose.mode === 'walking') sawWalking = true;
    if (pose.mode === 'idle') sawIdle = true;
  }

  assert.equal(sawWalking, true, 'traveler performs occasional careful steps');
  assert.equal(sawIdle, true, 'traveler rests calmly in idle state');
});

test('CinematicScrollController progresses smoothly across all 4 acts and stays within safe zoom bounds', () => {
  const a1 = evaluateCinematicScroll(0.1);
  const a2 = evaluateCinematicScroll(0.38);
  const a3 = evaluateCinematicScroll(0.62);
  const a4 = evaluateCinematicScroll(0.95);

  assert.equal(a1.act, 'establishing');
  assert.equal(a2.act, 'entering');
  assert.equal(a3.act, 'passage');
  assert.equal(a4.act, 'settled');

  assert.ok(a1.cameraZoom < a3.cameraZoom);
  assert.ok(a4.cameraZoom <= 1.12, 'zoom stays safely inside bleed overscan');
  assert.ok(a3.passageDustBoost > a1.passageDustBoost);
  assert.ok(a3.passageDustBoost > a4.passageDustBoost, 'dust settles in final act');
  assert.ok(a4.geologicalDetailReveal > a1.geologicalDetailReveal);
});

test('LivingBrushSystem reactivates locally near pointer without altering distant strokes', () => {
  const targetStroke = LIVING_BRUSH_STROKES[0];
  const distantStroke = LIVING_BRUSH_STROKES[LIVING_BRUSH_STROKES.length - 1];

  const nearEval = evaluateLivingStroke(targetStroke, 0, {
    hatchingProgress: 1,
    brushEnabled: true,
    brushActivity: 1,
    motionIntensity: 1,
    geologicalScrollReveal: 0,
    pointerX: targetStroke.cx,
    pointerY: targetStroke.cy,
    pointerActive: true,
    pointerEnabled: true,
  });

  const farEval = evaluateLivingStroke(distantStroke, 0, {
    hatchingProgress: 1,
    brushEnabled: false,
    brushActivity: 0,
    motionIntensity: 1,
    geologicalScrollReveal: 0,
    pointerX: targetStroke.cx,
    pointerY: targetStroke.cy,
    pointerActive: true,
    pointerEnabled: true,
  });

  assert.ok(nearEval.opacity > targetStroke.baseOpacity + 0.25);
  assert.ok(nearEval.drawFraction >= 0.9);
  assert.ok(farEval.opacity <= distantStroke.baseOpacity + 0.01);
});

test('DustWashSystem advects washes coherently downwind and spawns localized pointer wisps', () => {
  const field = new DesertWindField();
  const dust = new DustWashSystem();
  const initialX = dust.washes[0].x;

  for (let i = 0; i < 20; i++) {
    dust.step(0.05, i * 0.05, field, {
      windStrength: 1,
      motionIntensity: 1,
      scrollHazeMultiplier: 1,
      passageDustBoost: 0.2,
      scrollGustBoost: 0.1,
      pointerWind: { x: 960, y: 640, vx: 520, vy: -40, strength: 0.9 },
      pointerEnabled: true,
      lifeBlend: 1,
    });
  }

  assert.ok(dust.washes[0].x > initialX, 'dust washes advect downwind');
  assert.ok(dust.swirlWisps.length > 0, 'pointer sweep spawns localized dust wisps');
});

test('VegetationAnimator keeps shrub trunks rigid while fine twigs and grass flex naturally', () => {
  const wind = { strength: 1.1, gust: 0.7, dx: 0.95, dy: -0.2, pointerInfluence: 0.4 };
  const opts = { enabled: true, motionIntensity: 1, lifeBlend: 1 };

  const trunkAngle = Math.abs(computeShrubBranchAngleDeg(2.1, wind, 'trunk', 0.5, opts));
  const midAngle = Math.abs(computeShrubBranchAngleDeg(2.1, wind, 'mid', 0.5, opts));
  const twigAngle = Math.abs(computeShrubBranchAngleDeg(2.1, wind, 'twig', 0.5, opts));

  assert.ok(trunkAngle < midAngle, 'mid branch flexes more than thick trunk');
  assert.ok(midAngle < twigAngle, 'fine twigs flex more than mid branches');

  const grassAngle = computeGrassBladeAngleDeg(
    2.1,
    wind,
    { freq: 2.8, phase: 0.4, flex: 1.1 },
    opts
  );
  assert.ok(grassAngle > 3, 'grass bends visibly downwind under gust');

  const pausedGrass = computeGrassBladeAngleDeg(
    2.1,
    wind,
    { freq: 2.8, phase: 0.4, flex: 1.1 },
    { enabled: false, motionIntensity: 1, lifeBlend: 1 }
  );
  assert.equal(pausedGrass, 0, 'disabled vegetation stays still');
});

