export interface ConceptProject {
  id: string;
  index: string;
  title: string;
  category: string;
  studyLabel: string;
  focalCropPosition: string;
  focalScale: number;
  kelvinProfile: string;
  contrastRatio: string;
  conceptSummary: string;
  lightingStrategy: string;
  services: string[];
  diagramType: 'cantilever-graze' | 'interior-reflection' | 'pathway-bollard';
}

export interface PracticePrinciple {
  number: string;
  title: string;
  summary: string;
  opticalNote: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  summary: string;
  deliverable: string;
  luxTarget: string;
}

export const CONCEPT_PROJECTS: ConceptProject[] = [
  {
    id: 'solace-pavilion',
    index: '01',
    title: 'Solace Pavilion',
    category: 'Cultural Pavilion',
    studyLabel: 'Study 01 · Cantilever Graze',
    focalCropPosition: '28% 52%',
    focalScale: 1.18,
    kelvinProfile: '2650K Linear Cove',
    contrastRatio: '14:1 Graze Ratio',
    conceptSummary:
      'Concealed knife-edge grazing beneath a cantilevered concrete canopy, dissolving structural mass after dusk while preserving water reflections.',
    lightingStrategy:
      'Asymmetric grazing slots wash the vertical concrete core from base to soffit, while a continuous warm reveal traces the floating horizontal plane.',
    services: [
      'Daylight-to-dusk transition study',
      'Recessed knife-edge soffit detailing',
      'Vertical concrete grazing calibration',
    ],
    diagramType: 'cantilever-graze',
  },
  {
    id: 'nocturne-house',
    index: '02',
    title: 'Nocturne House',
    category: 'Private Residence',
    studyLabel: 'Study 02 · Monolith Framing',
    focalCropPosition: '82% 58%',
    focalScale: 1.28,
    kelvinProfile: '2400K Warm Dimming',
    contrastRatio: '8:1 Threshold Balance',
    conceptSummary:
      'Pin-spot framing optics sculpt an interior stone volume, keeping floor-to-ceiling glazing transparent at blue hour without specular mirror glare.',
    lightingStrategy:
      'Framing projectors illuminate vertical interior stone instead of horizontal floors, preserving uninterrupted outward sightlines into the dark landscape.',
    services: [
      'Low-reflectance glazing balance',
      'Sculptural object framing optics',
      'Circadian evening scene programming',
    ],
    diagramType: 'interior-reflection',
  },
  {
    id: 'meridian-walk',
    index: '03',
    title: 'Meridian Walk',
    category: 'Public Waterfront',
    studyLabel: 'Study 03 · Waterline Baffle',
    focalCropPosition: '46% 84%',
    focalScale: 1.22,
    kelvinProfile: '2200K Shielded Amber',
    contrastRatio: '5:1 Horizon Comfort',
    conceptSummary:
      'Deep-baffled bronze bollards cast controlled 180° light fans across stone plinths and dark water without upward spill or skyglow.',
    lightingStrategy:
      'Low-horizon cutoff optics guide movement at foot level while allowing the human eye to stay adapted to the open night sky.',
    services: [
      'Dark-sky zero-uplight optics',
      'Custom bronze bollard specification',
      'Water-edge specular reflection study',
    ],
    diagramType: 'pathway-bollard',
  },
];

export const PRACTICE_PRINCIPLES: PracticePrinciple[] = [
  {
    number: '01 / Observe',
    title: 'Map natural twilight and untouched shadow',
    summary:
      'Before placing a luminaire, we study how blue hour moves across concrete, stone, and water—identifying where darkness must remain untouched.',
    opticalNote: 'Mesopic adaptation · Reflectance',
  },
  {
    number: '02 / Sculpt',
    title: 'Conceal the source, reveal the surface',
    summary:
      'Uniform illumination flattens form. We orchestrate warm grazing and deep shadow to bring out material texture, depth, and structural grain.',
    opticalNote: 'Asymmetric graze · Concealed aperture',
  },
  {
    number: '03 / Reveal',
    title: 'Transition from dusk to nocturnal quiet',
    summary:
      'Architecture should breathe with the evening. Our scenes dim imperceptibly from twilight clarity into a calm midnight ember glow.',
    opticalNote: 'Warm-dim curve · Zero uplight',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Listen',
    summary: 'Define nocturnal character, sightlines, and darkness baseline.',
    deliverable: 'Nocturnal Brief',
    luxTarget: 'Baseline Darkness Audit',
  },
  {
    step: '02',
    title: 'Explore',
    summary: 'Test material grazing, shadow relief, and Kelvin warmth.',
    deliverable: 'Photometric Mockups',
    luxTarget: '2200K – 3200K Range',
  },
  {
    step: '03',
    title: 'Compose',
    summary: 'Detail concealed coves, optical apertures, and controls.',
    deliverable: 'Architectural Details',
    luxTarget: 'Shielded Source Specs',
  },
  {
    step: '04',
    title: 'Commission',
    summary: 'Aim fixtures on-site and tune dusk-to-midnight scene curves.',
    deliverable: 'Scene Commissioning',
    luxTarget: 'Night-to-Dawn Curves',
  },
];
