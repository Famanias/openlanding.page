import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  buildContinuousSignalPath,
  buildParallelStrandPath,
  deriveExperienceMode,
  transitionPipelineState,
  PipelineSimulationState,
  getStageBadge,
  getModelForPreference,
  validateDemoRequest,
  getScrollCapabilityForProgress,
  getScrollStageForProgress,
  getConvergedStreamCount,
  computeAmbientFieldState,
} from './signalLogic';

test('buildContinuousSignalPath and buildParallelStrandPath create continuous M...C paths through all anchors', () => {
  const anchors = [
    { id: 'hero-exit', x: 920, y: 610 },
    { id: 'cap-entry', x: 860, y: 1120 },
    { id: 'plat-entry', x: 740, y: 1980 },
    { id: 'cta-converge', x: 960, y: 2890 },
  ];
  const path = buildContinuousSignalPath(anchors);
  const strand = buildParallelStrandPath(anchors, 4);
  assert.ok(path.startsWith('M 920 610 C '), 'Expected M start command followed by C segments');
  assert.ok(path.endsWith('960 2890'), 'Expected path to end at final anchor');
  assert.equal((path.match(/ C /g) || []).length, 3, 'Expected 3 cubic Bezier segments for 4 anchors');
  assert.ok(strand.startsWith('M '), 'Expected parallel strand path to start with M');
  assert.notEqual(path, strand, 'Expected offset strand path to differ from center path');
});

test('deriveExperienceMode enforces priority rules across booting, executing, routing, converging, and idle', () => {
  assert.equal(
    deriveExperienceMode({
      isBooting: true,
      demoStatus: 'idle',
      isRoutingTransient: false,
      visibleSection: 'hero',
    }),
    'booting'
  );
  // Executing takes precedence over CTA convergence
  assert.equal(
    deriveExperienceMode({
      isBooting: false,
      demoStatus: 'running',
      isRoutingTransient: false,
      visibleSection: 'cta',
    }),
    'executing'
  );
  assert.equal(
    deriveExperienceMode({
      isBooting: false,
      demoStatus: 'idle',
      isRoutingTransient: true,
      visibleSection: 'capabilities',
    }),
    'routing'
  );
  assert.equal(
    deriveExperienceMode({
      isBooting: false,
      demoStatus: 'idle',
      isRoutingTransient: false,
      visibleSection: 'cta',
    }),
    'converging'
  );
  assert.equal(
    deriveExperienceMode({
      isBooting: false,
      demoStatus: 'idle',
      isRoutingTransient: false,
      visibleSection: 'hero',
    }),
    'idle'
  );
});

test('transitionPipelineState pauses at REVIEW (index 4) for human approval and respects Approve vs Reject', () => {
  let state: PipelineSimulationState = { status: 'idle', activeStageIndex: 2 };
  state = transitionPipelineState(state, { type: 'RUN' });
  assert.deepEqual(state, { status: 'running', activeStageIndex: 0 });

  state = transitionPipelineState(state, { type: 'STEP_TICK' }); // -> 1
  state = transitionPipelineState(state, { type: 'STEP_TICK' }); // -> 2
  state = transitionPipelineState(state, { type: 'STEP_TICK' }); // -> 3
  assert.deepEqual(state, { status: 'running', activeStageIndex: 3 });

  // Advancing from index 3 (EXECUTE) must pause at index 4 (REVIEW)
  state = transitionPipelineState(state, { type: 'STEP_TICK' });
  assert.deepEqual(state, { status: 'awaiting_approval', activeStageIndex: 4 });
  assert.equal(getStageBadge(4, state), 'Awaiting approval');

  // Extra ticks while awaiting approval must NOT auto-advance
  state = transitionPipelineState(state, { type: 'STEP_TICK' });
  assert.deepEqual(state, { status: 'awaiting_approval', activeStageIndex: 4 });

  // Reject branch
  const rejectedState = transitionPipelineState(state, { type: 'REJECT' });
  assert.deepEqual(rejectedState, { status: 'rejected', activeStageIndex: 4 });
  assert.equal(getStageBadge(4, rejectedState), 'Rejected');
  assert.equal(getStageBadge(5, rejectedState), 'Pending');

  // Approve branch
  const approvedState = transitionPipelineState(state, { type: 'APPROVE' });
  assert.deepEqual(approvedState, { status: 'completed', activeStageIndex: 5 });
  assert.equal(getStageBadge(5, approvedState), 'Completed');
});

test('getModelForPreference maps latency, balance, and reasoning to distinct simulated endpoints', () => {
  assert.equal(getModelForPreference('latency').modelId, 'model-1');
  assert.equal(getModelForPreference('balance').modelId, 'model-2');
  assert.equal(getModelForPreference('reasoning').modelId, 'model-3');
});

test('validateDemoRequest enforces non-empty fields and valid work email', () => {
  const invalid = validateDemoRequest({
    name: 'A',
    email: 'not-an-email',
    company: '',
    objective: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.company);
  assert.ok(invalid.errors.objective);

  const valid = validateDemoRequest({
    name: 'Ada Lovelace',
    email: 'ada@analytical.engine',
    company: 'Analytical Engine Corp',
    objective: 'Coordinate multi-agent customer support and tool execution.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('scroll choreography helpers map progress deterministically and reversibly across scenes', () => {
  assert.equal(getScrollCapabilityForProgress(0.05), 'orchestrate');
  assert.equal(getScrollCapabilityForProgress(0.35), 'route');
  assert.equal(getScrollCapabilityForProgress(0.62), 'observe');
  assert.equal(getScrollCapabilityForProgress(0.88), 'govern');

  assert.equal(getScrollStageForProgress(0.0), 0);
  assert.equal(getScrollStageForProgress(0.38), 2);
  assert.equal(getScrollStageForProgress(0.95), 5);

  assert.equal(getConvergedStreamCount(0.05), 1);
  assert.equal(getConvergedStreamCount(0.45), 3);
  assert.equal(getConvergedStreamCount(0.85), 5);
});

test('computeAmbientFieldState interpolates continuously, protects left reading column, and honors simulator state', () => {
  const heroField = computeAmbientFieldState({
    scrollProgress: 0,
    selectedCapability: 'route',
    activeStageIndex: 2,
    demoStatus: 'idle',
    ctaScrollProgress: 0,
    reducedMotion: false,
  });
  assert.ok(heroField.focusXPercent >= 52, 'Expected focus X to stay in right-hand visual zone');
  assert.equal(heroField.heroWeight, 1);
  assert.equal(heroField.ghostPacketsPaused, false);

  const pausedPlatformField = computeAmbientFieldState({
    scrollProgress: 0.62,
    selectedCapability: 'observe',
    activeStageIndex: 3,
    demoStatus: 'paused',
    ctaScrollProgress: 0,
    reducedMotion: false,
  });
  assert.ok(pausedPlatformField.platformWeight > 0.8);
  assert.equal(pausedPlatformField.ghostPacketsPaused, true);
  assert.equal(pausedPlatformField.ghostPacketSpeed, 0);

  const footerField = computeAmbientFieldState({
    scrollProgress: 1.0,
    selectedCapability: 'govern',
    activeStageIndex: 5,
    demoStatus: 'idle',
    ctaScrollProgress: 1.0,
    reducedMotion: false,
  });
  assert.equal(footerField.footerWeight, 1);
  assert.ok(
    footerField.fieldIntensity < heroField.fieldIntensity,
    'Expected footer field intensity to return to a quieter state'
  );
  assert.ok(
    footerField.gridOpacity < pausedPlatformField.gridOpacity,
    'Expected footer grid opacity to subside'
  );
});


