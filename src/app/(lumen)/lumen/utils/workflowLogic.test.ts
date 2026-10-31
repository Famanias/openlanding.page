import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  validateWorkEmail,
  canSubmitEmail,
  getStageCaption,
  getPreviewStackOrder,
  WORKSPACE_SCENARIOS,
  PLAYBOOK_PREVIEW_PAGES,
  HOW_IT_WORKS_STEPS,
  FAQ_ITEMS,
} from './workflowLogic';

test('validateWorkEmail trims whitespace and validates format accurately', () => {
  const emptyRes = validateWorkEmail('   ');
  assert.equal(emptyRes.valid, false);
  assert.ok(emptyRes.error?.includes('enter your work email'));

  const invalidRes = validateWorkEmail('alex-at-company');
  assert.equal(invalidRes.valid, false);
  assert.ok(invalidRes.error?.includes('valid email address'));

  const validRes = validateWorkEmail('  Alex.Rivera@LumenStudio.io  ');
  assert.equal(validRes.valid, true);
  assert.equal(validRes.normalizedEmail, 'alex.rivera@lumenstudio.io');
  assert.equal(validRes.error, undefined);
});

test('canSubmitEmail blocks rapid duplicate submissions within cooldown window', () => {
  const firstCheck = canSubmitEmail('alex@company.com', null, null, 1000);
  assert.equal(firstCheck.allowed, true);

  const duplicateCheck = canSubmitEmail('alex@company.com', 'alex@company.com', 1000, 2500, 4000);
  assert.equal(duplicateCheck.allowed, false);
  assert.ok(duplicateCheck.reason?.includes('already processed'));

  const afterCooldownCheck = canSubmitEmail('alex@company.com', 'alex@company.com', 1000, 6000, 4000);
  assert.equal(afterCooldownCheck.allowed, true);
});

test('getStageCaption returns exact specification descriptions for each stage', () => {
  assert.equal(getStageCaption('input'), 'A new request enters the workflow.');
  assert.equal(
    getStageCaption('processing'),
    'The workflow classifies the request, extracts important information, and proposes a destination.'
  );
  assert.equal(
    getStageCaption('output'),
    'A structured draft and next actions are prepared for review.'
  );
});

test('getPreviewStackOrder assigns unique front, middle, and back positions', () => {
  const findOrder = getPreviewStackOrder('find');
  assert.deepEqual(findOrder, { find: 'front', design: 'middle', build: 'back' });

  const designOrder = getPreviewStackOrder('design');
  assert.deepEqual(designOrder, { design: 'front', build: 'middle', find: 'back' });

  const buildOrder = getPreviewStackOrder('build');
  assert.deepEqual(buildOrder, { build: 'front', find: 'middle', design: 'back' });
});

test('content datasets contain all required sections and scenarios', () => {
  assert.equal(WORKSPACE_SCENARIOS.length, 4);
  assert.equal(PLAYBOOK_PREVIEW_PAGES.length, 3);
  assert.equal(HOW_IT_WORKS_STEPS.length, 3);
  assert.equal(FAQ_ITEMS.length, 6);
});
