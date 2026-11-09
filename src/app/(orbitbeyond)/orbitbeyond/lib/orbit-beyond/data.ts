import { ORBIT_ASSETS } from './assets';

export interface DepartureStage {
  id: 'launch' | 'transfer' | 'arrival';
  index: string;
  code: string;
  label: string;
  title: string;
  altitude: string;
  velocity: string;
  durationMark: string;
  summary: string;
  telemetryNote: string;
  pathProgress: number;
  markerCoords: { x: number; y: number };
}

export const DEPARTURE_STAGES: DepartureStage[] = [
  {
    id: 'launch',
    index: '01',
    code: '01 / LAUNCH',
    label: 'EARTH',
    title: 'Low-Orbit Ascent',
    altitude: '410 KM LEO',
    velocity: '7.67 KM/S',
    durationMark: 'T+00:42',
    summary: 'Ascend in a quiet pressurized cabin as Earth curves into a sapphire horizon.',
    telemetryNote: 'Equatorial ascent corridor.',
    pathProgress: 0.22,
    markerCoords: { x: 185, y: 310 },
  },
  {
    id: 'transfer',
    index: '02',
    code: '02 / TRANSFER',
    label: 'TRANSFER',
    title: 'Cislunar Coast',
    altitude: '192,400 KM',
    velocity: '1.42 KM/S',
    durationMark: 'T+09:15',
    summary: 'Weightless stillness through deep space as the lunar highlands sharpen ahead.',
    telemetryNote: 'Artificial twilight active.',
    pathProgress: 0.62,
    markerCoords: { x: 520, y: 148 },
  },
  {
    id: 'arrival',
    index: '03',
    code: '03 / ARRIVAL',
    label: 'APPROACH',
    title: 'Regolith Touchdown',
    altitude: '0.0 KM',
    velocity: '0.166 G',
    durationMark: 'T+14:00',
    summary: 'Vertical descent over basalt plains beside the warmly lit glass habitat dome.',
    telemetryNote: 'Mare Tranquillitatis dock.',
    pathProgress: 1.0,
    markerCoords: { x: 845, y: 215 },
  },
];

export interface HabitatHotspot {
  id: 'lounge' | 'sleep-pod' | 'observation-deck';
  code: string;
  shortTitle: string;
  zoneSubtitle: string;
  /** Percentage coordinates anchored to the actual regions in 04-habitat-interior.webp */
  coords: { xPercent: number; yPercent: number };
  capacitySpec: string;
  lightingSpec: string;
  acousticSpec: string;
  description: string;
  architecturalNote: string;
}

export const HABITAT_HOTSPOTS: HabitatHotspot[] = [
  {
    id: 'lounge',
    code: '01 / EARTHRISE LOUNGE',
    shortTitle: 'Earthrise Lounge',
    zoneSubtitle: 'Warm acoustic conversation pit',
    coords: { xPercent: 25, yPercent: 68 },
    capacitySpec: '4 Guests',
    lightingSpec: '2700K Amber Coves',
    acousticSpec: '18 dBA Quiet Baffling',
    description:
      'Sunken wool-basalt seating and warm floor coves with direct sightlines to the viewport.',
    architecturalNote: 'Pressure Rib Frame-A',
  },
  {
    id: 'sleep-pod',
    code: '02 / SLEEP POD',
    shortTitle: 'Private Sleep Sanctuary',
    zoneSubtitle: 'Dual-tier acoustic berths',
    coords: { xPercent: 48, yPercent: 49 },
    capacitySpec: '2 Berths / Bay',
    lightingSpec: 'Solar-Drift Dimmer',
    acousticSpec: 'Triple-Sealed Bulkhead',
    description:
      'Recessed cylindrical berths with 1/6g weighted linens and whisper-quiet airflow.',
    architecturalNote: 'Shielded Inner Core',
  },
  {
    id: 'observation-deck',
    code: '03 / OBSERVATION DECK',
    shortTitle: 'Observation Deck & Cupola',
    zoneSubtitle: 'Triple-pane fused silica window',
    coords: { xPercent: 83, yPercent: 46 },
    capacitySpec: '160° Field of View',
    lightingSpec: 'Dark-Adapted Gallery',
    acousticSpec: 'Zero-Vibration Rail',
    description:
      'Brushed titanium guardrail before a monolithic quartz window framing Earth and the crater floor.',
    architecturalNote: 'Optical Quartz Cupola',
  },
];

export interface ItineraryDay {
  id: 'day-01' | 'day-02' | 'day-03';
  dayNumber: string;
  code: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  windowLabel: string;
  elevation: string;
  summary: string;
  highlights: {
    time: string;
    activity: string;
    detail: string;
  }[];
}

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    id: 'day-01',
    dayNumber: '01',
    code: 'DAY 01 / LANDING',
    title: 'Arrival Under a Blue Moon',
    subtitle: 'Orientation in the habitat, first view of Earthrise, settle into the lounge.',
    image: ORBIT_ASSETS.habitatInterior,
    imageAlt: 'Warmly lit circular lunar habitat interior with lounge seating, sleep berths, and Earth visible through the right viewport.',
    windowLabel: 'HOURS 01 — 24',
    elevation: 'HABITAT DOME',
    summary:
      'Step into warm 2700K cabin light, acclimate to 1/6g strides, and gather at the observation rail.',
    highlights: [
      {
        time: '16:00',
        activity: '1/6g Orientation',
        detail: 'Pressurized lock arrival.',
      },
      {
        time: '19:30',
        activity: 'Earthrise Tasting',
        detail: 'Botanicals by the viewport.',
      },
      {
        time: '22:00',
        activity: 'Lights-Out Watch',
        detail: 'Earth-glow deck stillness.',
      },
    ],
  },
  {
    id: 'day-02',
    dayNumber: '02',
    code: 'DAY 02 / EXPLORE',
    title: 'Across the Silent Crater Rim',
    subtitle: 'Guided rover outing, slow surface exploration, crater-rim photo stop.',
    image: ORBIT_ASSETS.lunarRoverExcursion,
    imageAlt: 'Two astronauts and a six-wheeled lunar rover parked along a dramatic sunlit crater ridge with Earth in the black sky.',
    windowLabel: 'HOURS 25 — 48',
    elevation: '+380M RIDGE',
    summary:
      'Follow twin rover tracks up the sunlit escarpment and stand in vacuum silence looking back at Earth.',
    highlights: [
      {
        time: '09:00',
        activity: 'Airlock Egress',
        detail: 'Surface suit check.',
      },
      {
        time: '11:30',
        activity: 'Ridge Traverse',
        detail: '4.2 km escarpment climb.',
      },
      {
        time: '15:00',
        activity: 'Crater Overlook',
        detail: 'Low-gravity ridge walk.',
      },
    ],
  },
  {
    id: 'day-03',
    dayNumber: '03',
    code: 'DAY 03 / RETURN',
    title: 'Earthward Horizon & Ascent',
    subtitle: 'Sunrise reflection, final station breakfast, departure briefing.',
    image: ORBIT_ASSETS.orbitalTransit,
    imageAlt: 'Curved spacecraft window looking out at the glowing blue limb of Earth and swirling white clouds against deep space.',
    windowLabel: 'HOURS 49 — 72',
    elevation: 'RETURN ARC',
    summary:
      'Share a quiet morning in the lounge before boarding the vertical lander back toward Earth.',
    highlights: [
      {
        time: '08:30',
        activity: 'Station Breakfast',
        detail: 'Logbook archival.',
      },
      {
        time: '12:00',
        activity: 'Lunar Liftoff',
        detail: 'Vertical ascent burn.',
      },
      {
        time: '20:45',
        activity: 'Earth Approach',
        detail: 'Blue limb reentry prep.',
      },
    ],
  },
];

export interface LunarExperienceItem {
  id: 'low-gravity-walk' | 'earthrise-lounge';
  code: string;
  title: string;
  kicker: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  captionBand: string;
  durationSpec: string;
  environmentSpec: string;
  elevationSpec: string;
  description: string;
  extendedNotes: string[];
}

export const LUNAR_EXPERIENCES: LunarExperienceItem[] = [
  {
    id: 'low-gravity-walk',
    code: '01 · SURFACE EXCURSION',
    title: 'LOW-GRAVITY WALK',
    kicker: '0.166G RIDGE TRAVERSE',
    subtitle: 'Unhurried exploration along the sunlit crater rim.',
    image: ORBIT_ASSETS.lunarRoverExcursion,
    imageAlt: 'Two astronauts standing beside a lunar rover on the rim of a deep crater with Earth glowing in the upper-left sky.',
    captionBand: '4.2 KM RIDGE LOOP',
    durationSpec: '3.5 Hours EVA',
    environmentSpec: 'Pressurized Suit',
    elevationSpec: '+380m Overlook',
    description:
      'Trace the sharp shadow line of an ancient impact crater on foot and by six-wheel electric rover.',
    extendedNotes: [
      'Lightweight mobility suits with wide-field visors.',
      'Pressurized support rover with backup umbilicals and optics.',
      '4.2 km route along verified basalt bedrock.',
    ],
  },
  {
    id: 'earthrise-lounge',
    code: '02 · HABITAT SANCTUARY',
    title: 'THE EARTHRISE LOUNGE',
    kicker: '2700K INTERIOR',
    subtitle: 'Warm acoustics and uninterrupted views of home.',
    image: ORBIT_ASSETS.habitatInterior,
    imageAlt: 'Interior of the lunar habitat showing warm amber-lit lounge seating on the left and a large window overlooking the Moon and Earth on the right.',
    captionBand: '160° HORIZON WINDOW',
    durationSpec: 'All 72 Hours',
    environmentSpec: '21°C Breathable Cabin',
    elevationSpec: '160° Cupola',
    description:
      'Woven upholstery and indirect amber lighting paired with a monolithic fused-silica viewport.',
    extendedNotes: [
      'Circadian lighting shifting to 2700K evening warmth.',
      'Standing gallery rail directly before the observation window.',
      'Nightly dimmed-cabin hours for unobstructed Earth-glow.',
    ],
  },
];
