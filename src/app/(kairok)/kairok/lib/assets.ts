export const KAIRO_ASSETS = {
  hero: '/templates/kairok/kairo-01-hero-camera.webp',
  cameraCutout: '/templates/kairok/kairo-02-camera-cutout-alpha.png',
  lens: '/templates/kairok/kairo-03-lens-macro.webp',
  city: '/templates/kairok/kairo-04-city-environment.webp',
  sensor: '/templates/kairok/kairo-05-sensor-detail.webp',
  exploded: '/templates/kairok/kairo-06-exploded-camera.webp',
  lineup: '/templates/kairok/kairo-07-camera-collection.webp',
  sample: '/templates/kairok/kairo-08-sample-photo.webp',
  flythrough: '/templates/kairok/kairo-09-lens-to-city-flythrough.mp4',
  videoFirst: '/templates/kairok/kairo-video-first.webp',
  videoLast: '/templates/kairok/kairo-video-last.webp',
  icons: {
    aperture: '/templates/kairok/icons/aperture.svg',
    reticle: '/templates/kairok/icons/reticle.svg',
    arrowUpRight: '/templates/kairok/icons/arrow-up-right.svg',
  },
} as const;

export const SEQUENCE_FRAME_COUNT = 120;
export const FLYTHROUGH_DURATION_SEC = 7.91;

export function getSequenceFrameUrl(frameNumber1Based: number): string {
  const clamped = Math.max(1, Math.min(SEQUENCE_FRAME_COUNT, Math.round(frameNumber1Based)));
  const padded = String(clamped).padStart(3, '0');
  return `/templates/kairok/sequence/frame-${padded}.webp`;
}

export interface CityHotspot {
  id: 'light' | 'depth' | 'motion' | 'detail';
  code: string;
  label: string;
  title: string;
  xPercent: number;
  yPercent: number;
  summary: string;
  opticalNote: string;
  focusZone: 'shopfront' | 'distant' | 'balanced';
}

export const CITY_HOTSPOTS: CityHotspot[] = [
  {
    id: 'light',
    code: 'FN-01',
    label: 'LIGHT',
    title: 'Warm practical highlights without blooming spill',
    xPercent: 24,
    yPercent: 54,
    summary:
      'Incandescent storefront bulbs hold their warm filament core against the damp brick facade while surrounding shadow detail stays intact.',
    opticalNote: 'Illustrative concept note · Highlight roll-off study',
    focusZone: 'shopfront',
  },
  {
    id: 'motion',
    code: 'FN-02',
    label: 'MOTION',
    title: 'Quiet stillness inside a moving street',
    xPercent: 32,
    yPercent: 62,
    summary:
      'A figure beneath an umbrella separates cleanly from the wet pavement reflections, preserving posture and atmosphere in low ambient light.',
    opticalNote: 'Illustrative concept note · Subject separation study',
    focusZone: 'shopfront',
  },
  {
    id: 'depth',
    code: 'FN-03',
    label: 'DEPTH',
    title: 'Layered atmospheric perspective into the mist',
    xPercent: 50,
    yPercent: 52,
    summary:
      'From foreground crosswalk texture to distant traffic signals suspended in rain haze, tonal planes recede naturally without artificial flattening.',
    opticalNote: 'Illustrative concept note · Axial transition study',
    focusZone: 'distant',
  },
  {
    id: 'detail',
    code: 'FN-04',
    label: 'DETAIL',
    title: 'Micro-texture across rain-slicked asphalt',
    xPercent: 72,
    yPercent: 74,
    summary:
      'Copper and amber reflections skim across wet stone grain and painted road markings without harsh digital oversharpening.',
    opticalNote: 'Illustrative concept note · Surface micro-contrast study',
    focusZone: 'balanced',
  },
];

export type FocusEmphasisMode = 'balanced' | 'shopfront' | 'distant';

export interface FocusEmphasisConfig {
  id: FocusEmphasisMode;
  label: string;
  subtitle: string;
  description: string;
  focalOriginX: number;
  focalOriginY: number;
  vignetteOpacity: number;
  edgeBlurPx: number;
}

export const FOCUS_EMPHASIS_MODES: FocusEmphasisConfig[] = [
  {
    id: 'balanced',
    label: 'Full Street Frame',
    subtitle: 'Natural deep field across foreground & avenue',
    description:
      'Balanced scene rendering across both the warm corner bistro and the misty avenue vanishing point.',
    focalOriginX: 50,
    focalOriginY: 56,
    vignetteOpacity: 0.22,
    edgeBlurPx: 0,
  },
  {
    id: 'shopfront',
    label: 'Shopfront Warmth',
    subtitle: 'Near-plane emphasis on awning light & umbrella figure',
    description:
      'Draws visual weight toward the illuminated left-side storefront and pedestrian silhouette while softening distant traffic glare.',
    focalOriginX: 28,
    focalOriginY: 58,
    vignetteOpacity: 0.48,
    edgeBlurPx: 3.5,
  },
  {
    id: 'distant',
    label: 'Distant Signals',
    subtitle: 'Far-plane emphasis down the rain-wet corridor',
    description:
      'Centers emphasis on the suspended street lamps and receding tail lights in the central atmospheric mist.',
    focalOriginX: 51,
    focalOriginY: 50,
    vignetteOpacity: 0.45,
    edgeBlurPx: 3.0,
  },
];

export type ApertureStateId = 'open' | 'balanced' | 'narrow';

export interface AperturePreset {
  id: ApertureStateId;
  label: string;
  displayStop: string;
  irisRadiusPercent: number;
  bladeRotationDeg: number;
  sampleBlurPx: number;
  vignetteStrength: number;
  lightTransmissionLabel: string;
  characterTitle: string;
  description: string;
}

export const APERTURE_PRESETS: AperturePreset[] = [
  {
    id: 'open',
    label: 'Open',
    displayStop: 'Wide · Shallow Plane',
    irisRadiusPercent: 78,
    bladeRotationDeg: 0,
    sampleBlurPx: 4.5,
    vignetteStrength: 0.46,
    lightTransmissionLabel: 'Maximum ambient gathering',
    characterTitle: 'Intimate subject isolation in nocturnal light',
    description:
      'Opens the mechanical iris to gather every trace of street-level tungsten and neon, melting background clutter into smooth circular bokeh.',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    displayStop: 'Mid · Contextual Depth',
    irisRadiusPercent: 52,
    bladeRotationDeg: 18,
    sampleBlurPx: 1.5,
    vignetteStrength: 0.26,
    lightTransmissionLabel: 'Equilibrium of subject & place',
    characterTitle: 'Crisp subject framing with environmental story',
    description:
      'Balances center-to-corner clarity with gentle depth separation—made for documentary street frames where place matters as much as portrait.',
  },
  {
    id: 'narrow',
    label: 'Narrow',
    displayStop: 'Stopped Down · Deep Field',
    irisRadiusPercent: 28,
    bladeRotationDeg: 36,
    sampleBlurPx: 0,
    vignetteStrength: 0.14,
    lightTransmissionLabel: 'Structured point-source geometry',
    characterTitle: 'Edge-to-edge architectural precision',
    description:
      'Contracts the nine-blade iris to hold foreground pavement texture, mid-ground figures, and distant skyline geometry in simultaneous focus.',
  },
];

export interface EngineeringCallout {
  id: 'optical-assembly' | 'image-sensor' | 'body-control';
  index: string;
  code: string;
  label: string;
  headline: string;
  xPercent: number;
  yPercent: number;
  imagePanXPercent: number;
  imageScale: number;
  summary: string;
  detailPoints: string[];
}

export const ENGINEERING_CALLOUTS: EngineeringCallout[] = [
  {
    id: 'optical-assembly',
    index: '01',
    code: 'OPTICAL ASSEMBLY',
    label: 'OPTICAL ASSEMBLY',
    headline: 'Multi-group glass pathway with anodized copper control ring',
    xPercent: 31,
    yPercent: 60,
    imagePanXPercent: 28,
    imageScale: 1.12,
    summary:
      'Precision-aligned optical groups sit inside a damped barrel with a signature copper accent ring engineered for deliberate manual focus throw.',
    detailPoints: [
      'Nine-blade circular iris geometry for smooth out-of-focus transitions',
      'Anti-reflective multi-coating formulated to tame harsh wet-street glare',
      'Tactile knurled focus collar with consistent mechanical resistance',
    ],
  },
  {
    id: 'image-sensor',
    index: '02',
    code: 'IMAGE SENSOR',
    label: 'IMAGE SENSOR',
    headline: 'Direct light path onto the recessed full-surface sensor mount',
    xPercent: 69,
    yPercent: 49,
    imagePanXPercent: 65,
    imageScale: 1.16,
    summary:
      'A short flange focal distance places the rear glass element close to the sensor plane, preserving oblique light rays across the frame edges.',
    detailPoints: [
      'Machined stainless bayonet throat with copper-toned contact array',
      'Matte light-baffled inner chamber to suppress internal stray reflections',
      'Illustrative concept architecture designed around tonal latitude',
    ],
  },
  {
    id: 'body-control',
    index: '03',
    code: 'BODY & CONTROL',
    label: 'BODY & CONTROL',
    headline: 'Monolithic top deck with twin milled tactile dials',
    xPercent: 79,
    yPercent: 27,
    imagePanXPercent: 76,
    imageScale: 1.12,
    summary:
      'Sculpted from a single top plate with low-profile command dials and a sculpted thumb contour so your eye never has to leave the frame.',
    detailPoints: [
      'Direct physical dials for intuitive exposure and focus mode adjustments',
      'Textured high-grip bolster balanced for one-handed street carry',
      'Uncluttered top profile free of unnecessary status screens or distractions',
    ],
  },
];

export type CameraFinishId = 'carbon' | 'silver' | 'titanium';

export interface CameraFinishOption {
  id: CameraFinishId;
  name: string;
  fullName: string;
  swatchHex: string;
  accentHex: string;
  cropPositionXPercent: number;
  cropOriginXPercent: number;
  surfaceNote: string;
  description: string;
  characterNote: string;
}

export const CAMERA_FINISHES: CameraFinishOption[] = [
  {
    id: 'carbon',
    name: 'Carbon',
    fullName: 'K-01 · Stealth Carbon & Brushed Slate',
    swatchHex: '#1f2226',
    accentHex: '#e68f63',
    cropPositionXPercent: 0,
    cropOriginXPercent: 18,
    surfaceNote: 'Matte carbon lower chassis · Dark graphite top plate · Copper ring',
    description:
      'Designed to disappear into night streets and dimly lit interiors. The deep carbon finish minimizes reflections when shooting through glass or rain.',
    characterNote: 'Left unit in collection study · Low-visibility street profile',
  },
  {
    id: 'silver',
    name: 'Silver',
    fullName: 'K-01 · Bead-Blasted Alumina Silver',
    swatchHex: '#9ea3a8',
    accentHex: '#e68f63',
    cropPositionXPercent: 50,
    cropOriginXPercent: 50,
    surfaceNote: 'Fine-grain silver alloy body · Black textured grip · Copper ring',
    description:
      'A bright, sculptural tribute to classic mechanical instruments. Fine bead-blasting catches natural daylight across every chamfered edge.',
    characterNote: 'Center unit in collection study · Classic studio silhouette',
  },
  {
    id: 'titanium',
    name: 'Titanium',
    fullName: 'K-01 · Warm Raw Titanium',
    swatchHex: '#6e6963',
    accentHex: '#e68f63',
    cropPositionXPercent: 100,
    cropOriginXPercent: 82,
    surfaceNote: 'Warm mineral titanium finish · Obsidian grip · Copper ring',
    description:
      'An understated warm metallic tone that bridges dark carbon and classic silver, pairing organically with the warm copper lens ring.',
    characterNote: 'Right unit in collection study · Warm architectural finish',
  },
];
