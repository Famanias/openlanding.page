import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  DEFAULT_MISSION_PLAN,
  deriveMissionDetails,
  formatMissionBriefText,
  type MissionPlan,
} from './mission';
import { DEPARTURE_STAGES, HABITAT_HOTSPOTS, ITINERARY_DAYS } from './data';
import { ORBIT_ASSETS } from './assets';

test('DEFAULT_MISSION_PLAN matches expected baseline values', () => {
  assert.equal(DEFAULT_MISSION_PLAN.style, 'earthrise');
  assert.equal(DEFAULT_MISSION_PLAN.party, 2);
  assert.equal(DEFAULT_MISSION_PLAN.nights, 3);
  assert.equal(DEFAULT_MISSION_PLAN.roverWalk, true);
});

test('deriveMissionDetails accurately reflects all user selections', () => {
  const customPlan: MissionPlan = {
    style: 'crater',
    party: 4,
    nights: 2,
    roverWalk: false,
  };

  const derived = deriveMissionDetails(customPlan);
  assert.equal(derived.styleLabel, 'CRATER EXPLORER');
  assert.equal(derived.styleCode, 'OB-2045-EXP');
  assert.equal(derived.partyLabel, '4 PARTICIPANTS');
  assert.equal(derived.durationLabel, '2 NIGHTS (48 HOURS)');
  assert.match(derived.roverLabel, /HABITAT-ONLY/);
  assert.equal(derived.scheduleOutline.length, 3);
});

test('formatMissionBriefText includes mandatory concept demo disclaimer and selected options', () => {
  const plan: MissionPlan = {
    style: 'earthrise',
    party: 1,
    nights: 3,
    roverWalk: true,
  };

  const brief = formatMissionBriefText(plan);
  assert.match(brief, /CONCEPT DEMO \/ NO BOOKING CREATED/);
  assert.match(brief, /ILLUSTRATIVE MISSION PLANNER — NO REAL FLIGHTS OR BOOKINGS\./);
  assert.match(brief, /EARTHRISE RETREAT/);
  assert.match(brief, /1 SOLO EXPLORER/);
  assert.match(brief, /3 NIGHTS \(72 HOURS\)/);
  assert.match(brief, /INCLUDED — 4\.2 KM GUIDED ROVER & RIDGE WALK/);
});

test('Asset paths and scene data structures are complete and valid', () => {
  assert.equal(ORBIT_ASSETS.heroPoster, '/templates/orbitbeyond/orbit-beyond/01-hero-lunar-clean.webp');
  assert.equal(ORBIT_ASSETS.heroVideo, '/templates/orbitbeyond/orbit-beyond/02-hero-lunar-loop.mp4');
  assert.equal(DEPARTURE_STAGES.length, 3);
  assert.equal(HABITAT_HOTSPOTS.length, 3);
  assert.equal(ITINERARY_DAYS.length, 3);
});
