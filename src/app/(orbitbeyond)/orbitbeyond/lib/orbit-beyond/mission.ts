export type MissionStyle = 'earthrise' | 'crater';
export type PartySize = 1 | 2 | 4;
export type TripNights = 2 | 3;

export interface MissionPlan {
  style: MissionStyle;
  party: PartySize;
  nights: TripNights;
  roverWalk: boolean;
}

export const DEFAULT_MISSION_PLAN: MissionPlan = {
  style: 'earthrise',
  party: 2,
  nights: 3,
  roverWalk: true,
};

export interface MissionDerivedDetails {
  styleLabel: string;
  styleCode: string;
  styleDescription: string;
  partyLabel: string;
  cabinAllocation: string;
  durationLabel: string;
  totalHoursLabel: string;
  roverLabel: string;
  orbitalApogee: string;
  surfaceSector: string;
  scheduleOutline: string[];
}

export function deriveMissionDetails(plan: MissionPlan): MissionDerivedDetails {
  const isCrater = plan.style === 'crater';
  const styleLabel = isCrater ? 'CRATER EXPLORER' : 'EARTHRISE RETREAT';
  const styleCode = isCrater ? 'OB-2045-EXP' : 'OB-2045-RET';
  const styleDescription = isCrater
    ? 'Field-focused surface itinerary emphasizing escarpment geology, crater rim traverses, and optical horizon photography.'
    : 'Sanctuary-paced itinerary centered on the Earthrise Lounge, private cupola hours, and unhurried low-gravity stillness.';

  const partyLabel =
    plan.party === 1
      ? '1 SOLO EXPLORER'
      : `${plan.party} PARTICIPANTS`;

  const cabinAllocation =
    plan.party === 1
      ? 'Single Sanctuary Berth · Bay A1'
      : plan.party === 2
      ? 'Dual Sanctuary Suite · Bay A1–A2'
      : 'Full Quadrant Charter · Bays A1–B2';

  const totalHours = plan.nights === 3 ? 72 : 48;
  const durationLabel = `${plan.nights} NIGHTS (${totalHours} HOURS)`;
  const totalHoursLabel = `${totalHours} HRS LUNAR STAY`;

  const roverLabel = plan.roverWalk
    ? 'INCLUDED — 4.2 KM GUIDED ROVER & RIDGE WALK'
    : 'HABITAT-ONLY — DOME & OBSERVATION DECK FOCUS';

  const orbitalApogee = isCrater ? '118 KM LOW POLAR-INCLINED RELAY' : '96 KM EQUATORIAL SCENIC APPROACH';
  const surfaceSector = isCrater
    ? 'Mare Tranquillitatis · North Crater Escarpment'
    : 'Mare Tranquillitatis · Dome 01 Sanctuary Wing';

  const scheduleOutline: string[] = [
    `Day 01: Cislunar arrival, 1/6g habitat orientation, and ${
      isCrater ? 'surface suit telemetry calibration' : 'first Earthrise tasting in the lounge'
    }.`,
    `Day 02: ${
      plan.roverWalk
        ? 'Guided six-wheel rover excursion to +380m crater rim overlook and low-gravity ridge walk.'
        : 'Private cupola observation window, acoustic rest cycle, and hydroponic conservatory tour.'
    }`,
  ];

  if (plan.nights === 3) {
    scheduleOutline.push(
      `Day 03: ${
        isCrater
          ? 'Early shadow-line optical capture, station breakfast, and vertical methalox ascent.'
          : 'Unhurried Earth-glow reflection session, logbook archival, and cislunar return coast.'
      }`
    );
  } else {
    scheduleOutline.push(
      'Return Window (48h): Morning departure briefing and trans-Earth injection burn.'
    );
  }

  return {
    styleLabel,
    styleCode,
    styleDescription,
    partyLabel,
    cabinAllocation,
    durationLabel,
    totalHoursLabel,
    roverLabel,
    orbitalApogee,
    surfaceSector,
    scheduleOutline,
  };
}

export function formatMissionBriefText(plan: MissionPlan): string {
  const details = deriveMissionDetails(plan);
  return [
    '============================================================',
    'ORBIT & BEYOND — 2045 CONCEPT MISSION BRIEF',
    'STATUS: CONCEPT DEMO / NO BOOKING CREATED',
    'ILLUSTRATIVE MISSION PLANNER — NO REAL FLIGHTS OR BOOKINGS.',
    '============================================================',
    `MISSION CODE:      ${details.styleCode}`,
    `MISSION STYLE:     ${details.styleLabel}`,
    `PARTY SIZE:        ${details.partyLabel}`,
    `CABIN ALLOCATION:  ${details.cabinAllocation}`,
    `DURATION:          ${details.durationLabel}`,
    `SURFACE EXCURSION: ${details.roverLabel}`,
    `LANDING SECTOR:    ${details.surfaceSector}`,
    `ORBITAL PROFILE:   ${details.orbitalApogee}`,
    '------------------------------------------------------------',
    'CONCEPT ITINERARY SUMMARY:',
    ...details.scheduleOutline.map((line, idx) => `  0${idx + 1}. ${line}`),
    '------------------------------------------------------------',
    'DISCLAIMER: Fictional speculative concept in the OpenLanding',
    'collection. No reservation, seat inventory, or flight exists.',
    '============================================================',
  ].join('\n');
}
