import { describe, it, expect } from 'vitest';
import {
  CHAPTERS,
  REST_POINT_4A,
  REST_POINT_4B,
  getChapterStateAtProgress,
  getNearestChapterSnapProgress,
  getNextChapterProgress,
  computeCameraPoseAtProgress,
  computeSunlightState,
  DEFAULT_SUNLIGHT,
  computeChapter5SubState,
  LIFECYCLE_STEPS,
} from './chapters';
import {
  HOLD_DURATION_MS,
  createInitialInspectState,
  onInspectPointerDown,
  onInspectPointerMove,
  onInspectPointerUp,
  tickInspectState,
  toggleKeyboardInspect,
  applyKeyboardRotationStep,
  exitInspectMode,
  isPinFacingCamera,
} from './holdInspectLogic';
import {
  generateMyceliumNetwork,
  computePulseWaveIntensity,
  generateTrayMorphCoordinates,
} from './networkGenerator';
import { validateSampleKitForm } from './formValidation';

describe('LOAM core logic', () => {
  it('chapters progress state maps 0..1 deterministically including 4a and 4b rest points', () => {
    const ch1 = getChapterStateAtProgress(0.0);
    expect(ch1.activeChapterIndex).toBe(0);
    expect(ch1.activeChapter.markerLabel).toBe('01 — The fruit');
    expect(ch1.activeChapter.inspectableObject).toBe('mushroom');
    expect(ch1.undergroundFactor).toBe(0);
    expect(ch1.networkGrowth).toBe(0);

    const ch2 = getChapterStateAtProgress(0.18);
    expect(ch2.activeChapterIndex).toBe(1);
    expect(ch2.activeChapter.markerLabel).toBe('02 — Under the cap');
    expect(ch2.gillSporeIntensity).toBeGreaterThan(0.8);

    // Rest point 4a (close on the clump: inspectable here and only here)
    const ch4a = getChapterStateAtProgress(REST_POINT_4A);
    expect(ch4a.activeChapterIndex).toBe(3);
    expect(ch4a.activeChapter.markerLabel).toBe('04 — The network');
    expect(ch4a.isChapter4aClump).toBe(true);
    expect(ch4a.isChapter4bWide).toBe(false);
    expect(ch4a.activeChapter.inspectableObject).toBe('clump');
    expect(ch4a.clumpReveal).toBeGreaterThan(0.9);

    // Rest point 4b (wide network: clump is no longer inspectable, network fully grown)
    const ch4b = getChapterStateAtProgress(REST_POINT_4B);
    expect(ch4b.activeChapterIndex).toBe(3);
    expect(ch4b.activeChapter.markerLabel).toBe('04 — The network');
    expect(ch4b.isChapter4aClump).toBe(false);
    expect(ch4b.isChapter4bWide).toBe(true);
    expect(ch4b.activeChapter.inspectableObject).toBeNull();
    expect(ch4b.undergroundFactor).toBe(1);
    expect(ch4b.networkGrowth).toBeGreaterThan(0.95);

    const ch5 = getChapterStateAtProgress(0.83);
    expect(ch5.activeChapterIndex).toBe(4);
    expect(ch5.activeChapter.markerLabel).toBe('05 — The material');
    expect(ch5.activeChapter.inspectableObject).toBe('tray');
    expect(ch5.trayMorphProgress).toBe(1);
    expect(ch5.traySolidOpacity).toBeGreaterThan(0.9);

    const ch6 = getChapterStateAtProgress(1.0);
    expect(ch6.activeChapterIndex).toBe(5);
    expect(ch6.activeChapter.markerLabel).toBe('06 — Return');
    expect(ch6.undergroundFactor).toBe(0);
    expect(ch6.fairyRingGrowth).toBe(1);
  });

  it('chapter snapping and keyboard stepping include both 4a and 4b rest points', () => {
    expect(getNearestChapterSnapProgress(0.02)).toBe(CHAPTERS[0].restProgress);
    expect(getNearestChapterSnapProgress(0.17)).toBe(CHAPTERS[1].restProgress);
    expect(getNearestChapterSnapProgress(0.50)).toBe(REST_POINT_4A);
    expect(getNearestChapterSnapProgress(0.64)).toBe(REST_POINT_4B);
    expect(getNearestChapterSnapProgress(0.98)).toBe(CHAPTERS[5].restProgress);

    const step1 = getNextChapterProgress(0.0, 1);
    expect(step1).toBe(CHAPTERS[1].restProgress);
    const stepBack = getNextChapterProgress(step1, -1);
    expect(stepBack).toBe(CHAPTERS[0].restProgress);

    // Stepping forward from Ch 3 (0.35) goes to 4a (0.52), and from 4a goes to 4b (0.66)
    const to4a = getNextChapterProgress(0.35, 1);
    expect(to4a).toBe(REST_POINT_4A);
    const to4b = getNextChapterProgress(REST_POINT_4A, 1);
    expect(to4b).toBe(REST_POINT_4B);
  });

  it('Catmull-Rom camera pose interpolation is continuous, avoids clipping, and rises through soil', () => {
    const startPose = computeCameraPoseAtProgress(0);
    const preDescentPose = computeCameraPoseAtProgress(0.26);
    const breakingGroundPose = computeCameraPoseAtProgress(0.29);
    const ch3RestPose = computeCameraPoseAtProgress(0.35);
    const subsoilPose = computeCameraPoseAtProgress(0.43);
    const ch4aPose = computeCameraPoseAtProgress(REST_POINT_4A);
    const ch4bPose = computeCameraPoseAtProgress(REST_POINT_4B);
    const ch5Pose = computeCameraPoseAtProgress(0.83);
    const ascentPose = computeCameraPoseAtProgress(0.91);
    const endPose = computeCameraPoseAtProgress(1);

    expect(startPose.position[1]).toBeGreaterThan(0);
    expect(preDescentPose.position[1]).toBeGreaterThan(breakingGroundPose.position[1]);
    expect(Math.abs(breakingGroundPose.position[1])).toBeLessThan(0.12);
    expect(breakingGroundPose.position[1]).toBeGreaterThan(ch3RestPose.position[1]);
    expect(ch3RestPose.position[1]).toBeGreaterThan(subsoilPose.position[1]);
    expect(subsoilPose.position[1]).toBeGreaterThan(ch4aPose.position[1]);

    // Camera maintains safe z clearance (>= 2.2m) in front of the soil cross-section wall, roots, and rocks across 0.26..0.52
    for (let p = 0.26; p <= 0.52; p += 0.02) {
      const pose = computeCameraPoseAtProgress(p);
      expect(pose.position[2]).toBeGreaterThanOrEqual(2.2);
    }

    expect(ch4aPose.position[1]).toBeLessThan(0);
    expect(ch4bPose.position[2]).toBeGreaterThan(ch4aPose.position[2] + 8);
    expect(ascentPose.position[1]).toBeGreaterThan(ch5Pose.position[1]);
    expect(ascentPose.position[1]).toBeLessThan(0);
    expect(endPose.position[1]).toBeGreaterThan(0);
  });

  it('hold-to-inspect state machine requires ~350ms hold and ignores quick taps or swipes', () => {
    let state = createInitialInspectState();

    // Quick tap (< 350ms) does not trigger inspect
    state = onInspectPointerDown(state, 'mushroom', 200, 200);
    expect(state.phase).toBe('holding');
    state = tickInspectState(state, 150);
    expect(state.phase).toBe('holding');
    state = onInspectPointerUp(state);
    expect(state.phase).toBe('idle');
    expect(state.hasUsedInspect).toBe(false);

    // Swipe movement during hold cancels inspect
    state = onInspectPointerDown(state, 'mushroom', 200, 200);
    state = tickInspectState(state, 100);
    state = onInspectPointerMove(state, 230, 200); // > 10px threshold
    expect(state.phase).toBe('idle');

    // Holding for >= 350ms transitions to inspecting and supports quaternion rotation
    state = onInspectPointerDown(state, 'mushroom', 200, 200);
    state = tickInspectState(state, HOLD_DURATION_MS + 10);
    expect(state.phase).toBe('inspecting');
    expect(state.hasUsedInspect).toBe(true);

    // Dragging rotates quaternion without NaN or gimbal lock
    state = onInspectPointerMove(state, 280, 120, 0.016);
    const qLen = Math.hypot(...state.quaternion);
    expect(Math.abs(qLen - 1)).toBeLessThan(1e-5);
    expect(state.quaternion[3]).toBeLessThan(0.999);

    // Releasing springs smoothly back to rest pose
    state = onInspectPointerUp(state);
    expect(state.phase).toBe('returning');
    for (let i = 0; i < 40; i++) {
      state = tickInspectState(state, 50);
    }
    expect(state.phase).toBe('idle');
  });

  it('keyboard inspect toggle, arrow rotation, and backface pin culling work cleanly', () => {
    let state = createInitialInspectState();
    state = toggleKeyboardInspect(state, 'tray');
    expect(state.phase).toBe('inspecting');
    expect(state.keyboardMode).toBe(true);

    state = applyKeyboardRotationStep(state, 'ArrowRight');
    state = applyKeyboardRotationStep(state, 'ArrowUp');
    expect(state.quaternion[3]).toBeLessThan(1);

    // Front-facing pin normal [0, 0, 1] is visible at identity rotation, hidden when rotated 180 deg around Y
    expect(isPinFacingCamera([0, 0, 1], [0, 0, 0, 1])).toBe(true);
    expect(isPinFacingCamera([0, 0, 1], [0, 1, 0, 0])).toBe(false);

    state = exitInspectMode(state);
    expect(state.phase).toBe('returning');
  });

  it('procedural mycelium network generates a 3-tier hierarchy of over 1,000 filaments', () => {
    const netA = generateMyceliumNetwork(1234);
    const netB = generateMyceliumNetwork(1234);

    expect(netA.neighborMushrooms.length).toBe(5);
    expect(netA.branches.length).toBe(netB.branches.length);
    expect(netA.branches.length).toBeGreaterThan(1000);
    expect(netA.branches[0].points[3]).toEqual(netB.branches[0].points[3]);

    const tier0 = netA.branches.filter((b) => b.tier === 0).length;
    const tier1 = netA.branches.filter((b) => b.tier === 1).length;
    const tier2 = netA.branches.filter((b) => b.tier === 2).length;
    expect(tier0).toBeGreaterThanOrEqual(8);
    expect(tier1).toBeGreaterThan(100);
    expect(tier2).toBeGreaterThan(800);

    // Pulse wave propagates outward with elapsed time
    const origin: [number, number, number] = [0, -1, 0];
    const nearIntensity = computePulseWaveIntensity([1.3, -1, 0], origin, 0.2, 6.5);
    const farIntensityAtStart = computePulseWaveIntensity([9.0, -1, 0], origin, 0.2, 6.5);
    expect(nearIntensity).toBeGreaterThan(0.5);
    expect(farIntensityAtStart).toBe(0);

    const morph = generateTrayMorphCoordinates(200, 99);
    expect(morph.sourcePositions.length).toBe(600);
    expect(morph.targetPositions.length).toBe(600);
  });

  it('sample kit form validation enforces required fields and valid work email', () => {
    const emptyResult = validateSampleKitForm({
      name: '',
      workEmail: 'invalid-email',
      company: '',
      useCase: 'packaging',
      note: '',
    });
    expect(emptyResult.isValid).toBe(false);
    expect(emptyResult.errors.name).toBeDefined();
    expect(emptyResult.errors.workEmail).toBeDefined();
    expect(emptyResult.errors.company).toBeDefined();

    const validResult = validateSampleKitForm({
      name: 'Elena Vance',
      workEmail: 'elena@fieldcraft.co',
      company: 'Fieldcraft Studio',
      useCase: 'packaging',
      note: 'Looking for 5,000 custom bottle inserts.',
    });
    expect(validResult.isValid).toBe(true);
    expect(Object.keys(validResult.errors).length).toBe(0);
  });

  it('sunlight time-of-day state interpolates sun arc, color temperature, exposure, and CSS variables across 0..1', () => {
    expect(DEFAULT_SUNLIGHT).toBe(0.75);

    const dusk = computeSunlightState(0.0);
    const golden = computeSunlightState(0.35);
    const morning = computeSunlightState(DEFAULT_SUNLIGHT);
    const midday = computeSunlightState(1.0);

    // Sun elevation arcs upward from low dusk angle to high overhead midday angle
    expect(dusk.sunOffset[1]).toBeLessThan(golden.sunOffset[1]);
    expect(golden.sunOffset[1]).toBeLessThan(morning.sunOffset[1]);
    expect(morning.sunOffset[1]).toBeLessThan(midday.sunOffset[1]);

    // Color temperature shifts from warm amber (#ff8a3d) at dusk to neutral daylight (#f4f8fb) at midday
    expect(dusk.sunColorHex).toBe('#ff8a3d');
    expect(golden.sunColorHex).toBe('#ffa751');
    expect(midday.sunColorHex).toBe('#f4f8fb');

    // Intensity and exposure scale monotonically without exceeding safe tone-mapping bounds
    expect(dusk.sunIntensityMultiplier).toBeLessThan(midday.sunIntensityMultiplier);
    expect(dusk.toneMappingExposure).toBeGreaterThanOrEqual(0.65);
    expect(midday.toneMappingExposure).toBeLessThanOrEqual(0.85);

    // CSS custom properties are populated for 2D atmosphere synchronization
    expect(dusk.cssVars['--page-bg'].startsWith('#')).toBe(true);
    expect(midday.cssVars['--sky-ambient'].startsWith('rgba(')).toBe(true);
    expect(midday.cssVars['--text-contrast'].startsWith('#')).toBe(true);
  });

  it('Chapter 05 studio reveal sub-state transitions cleanly from dark foxfire morph (0.72..0.77) to bright studio rest (0.83) and dims on exit (0.91)', () => {
    expect(LIFECYCLE_STEPS.length).toBe(3);
    expect(LIFECYCLE_STEPS[0].label).toBe('Grown in 7 days');
    expect(LIFECYCLE_STEPS[1].label).toBe('Protects in transit');
    expect(LIFECYCLE_STEPS[2].label).toBe('Composts back to soil');

    // Before Chapter 05 (in Chapter 04 wide network)
    const preCh5 = computeChapter5SubState(0.70);
    expect(preCh5.trayMorphProgress).toBe(0);
    expect(preCh5.studioLightness).toBe(0);
    expect(preCh5.fragileObjectSettle).toBe(0);
    expect(preCh5.productFamilySlide).toBe(0);
    expect(preCh5.lifecycleStripReveal).toBe(0);

    // Mid-convergence in the dark (0.76): threads are braiding with foxfire glow before studio lights fully lift
    const midMorph = computeChapter5SubState(0.76);
    expect(midMorph.trayMorphProgress).toBeGreaterThan(0.35);
    expect(midMorph.trayMorphProgress).toBeLessThan(0.9);
    expect(midMorph.foxfireGlowFade).toBeGreaterThan(0.25);
    expect(midMorph.studioLightness).toBe(0);

    // Rest point (0.83): studio is fully lit, foxfire glow is completely off (0), bottle settled, family slid in, lifecycle strip visible
    const atRest = computeChapter5SubState(0.83);
    expect(atRest.trayMorphProgress).toBe(1);
    expect(atRest.traySolidOpacity).toBeGreaterThan(0.98);
    expect(atRest.studioLightness).toBeGreaterThan(0.98);
    expect(atRest.foxfireGlowFade).toBe(0);
    expect(atRest.fragileObjectSettle).toBeGreaterThan(0.98);
    expect(atRest.productFamilySlide).toBeGreaterThan(0.95);
    expect(atRest.lifecycleStripReveal).toBeGreaterThan(0.95);
    expect(atRest.lifecycleStepReveals.every((v) => v > 0.9)).toBe(true);

    // Exiting toward Chapter 06 (0.915): studio dims back down so ascent to forest floor is seamless
    const postCh5 = computeChapter5SubState(0.915);
    expect(postCh5.studioLightness).toBe(0);
    expect(postCh5.lifecycleStripReveal).toBe(0);

    // Camera framing at 0.83 has generous three-quarter distance so tray fits comfortably during 360-deg Hold-to-Inspect
    const ch5Pose = computeCameraPoseAtProgress(0.83);
    const camDist = Math.hypot(
      ch5Pose.position[0] - ch5Pose.target[0],
      ch5Pose.position[1] - ch5Pose.target[1],
      ch5Pose.position[2] - ch5Pose.target[2],
    );
    expect(camDist).toBeGreaterThanOrEqual(4.8);
  });
});
