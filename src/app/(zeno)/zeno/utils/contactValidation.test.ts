import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  formatProjectBrief,
  buildMailtoHref,
} from './contactValidation';
import { servicesData } from '../data/services';
import { projectsData } from '../data/projects';

test('validateContactForm rejects empty fields with clear accessible error messages', () => {
  const result = validateContactForm({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.projectType);
  assert.ok(result.errors.message);
});

test('validateContactForm rejects invalid email and short message', () => {
  const result = validateContactForm({
    name: 'Clara Vance',
    email: 'not-an-email',
    projectType: 'Brand Strategy & Positioning',
    message: 'Too short',
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, undefined);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test('validateContactForm accepts valid inquiry payload and formats brief cleanly', () => {
  const payload = {
    name: 'Julian Vance',
    email: 'julian@auren.house',
    projectType: 'Full-Scope Brand World',
    message: 'We are launching a new architectural hospitality concept in Zurich for Autumn 2026.',
  };
  const result = validateContactForm(payload);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});

  const brief = formatProjectBrief(payload);
  assert.ok(brief.includes('Julian Vance <julian@auren.house>'));
  assert.ok(brief.includes('Full-Scope Brand World'));

  const mailto = buildMailtoHref('hello@zeno.studio', payload);
  assert.ok(mailto.startsWith('mailto:hello@zeno.studio?subject='));
});

test('servicesData and projectsData match required ZENO master prompt specifications', () => {
  assert.equal(servicesData.length, 4);
  assert.deepEqual(
    servicesData.map((s) => s.label),
    ['01 — STRATEGY', '02 — IDENTITY', '03 — CAMPAIGNS', '04 — DIGITAL']
  );
  assert.equal(projectsData.length, 2);
  assert.equal(projectsData[0].title, '01 — AUREN HOUSE');
  assert.equal(projectsData[1].title, '02 — MORROW FIELD');
  assert.deepEqual(projectsData[0].caseStudy.deliverables, [
    'Brand positioning',
    'Identity system',
    'Art direction',
    'Digital experience',
  ]);
  assert.deepEqual(projectsData[1].caseStudy.deliverables, [
    'Campaign concept',
    'Photography direction',
    'Editorial system',
    'Launch materials',
  ]);
});
