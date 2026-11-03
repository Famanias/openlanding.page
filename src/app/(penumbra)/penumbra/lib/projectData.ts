export interface ConceptProject {
  id: string;
  index: string;
  title: string;
  category: string;
  studyLabel: string;
  mood: string;
  microcopy: string;
  focalCropPosition: string;
  focalScale: number;
  kelvinProfile: string;
  contrastRatio: string;
  conceptSummary: string;
  architecturalContext: string;
  lightingStrategy: string;
  services: string[];
  diagramType: 'cantilever-graze' | 'interior-reflection' | 'pathway-bollard';
}

export interface PracticePrinciple {
  number: string;
  title: string;
  summary: string;
  detail: string;
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
    category: 'Cultural · Architectural lighting concept',
    studyLabel: 'Conceptual Study I — Cantilever & Monolith Grazing',
    mood: 'Monumental concrete, intimate pools of warm light',
    microcopy: 'A quiet monument to the moments between shadow and form.',
    focalCropPosition: '28% 52%',
    focalScale: 1.18,
    kelvinProfile: '2650K Linear Cove + 2400K Uplight',
    contrastRatio: '14:1 Perimeter-to-Sky Balance',
    conceptSummary:
      'An architectural study exploring how a recessed linear knife-edge cove beneath a cantilevered board-formed concrete canopy can dissolve structural mass after dusk while anchoring the volume to its reflecting basin.',
    architecturalContext:
      'Raw architectural concrete meets still water and mountain twilight. Without careful shielding, floodlighting would flatten the formwork texture and destroy the nocturnal reflection.',
    lightingStrategy:
      'Concealed asymmetric grazing slots wash the vertical concrete core from base to soffit, while a continuous warm soffit reveal traces the floating horizontal plane.',
    services: [
      'Daylight-to-Dusk Transition Study',
      'Custom Recessed Soffit Detailing',
      'Vertical Concrete Grazing Mockups',
      'Glare-Free Water Reflection Calibration',
    ],
    diagramType: 'cantilever-graze',
  },
  {
    id: 'nocturne-house',
    index: '02',
    title: 'Nocturne House',
    category: 'Residential · Lighting concept',
    studyLabel: 'Conceptual Study II — Interior Sanctuary & Stone Volume',
    mood: 'Warm interiors, stone, reflective surfaces',
    microcopy: 'A private retreat shaped by restraint and the warmth of evening.',
    focalCropPosition: '82% 58%',
    focalScale: 1.28,
    kelvinProfile: '2400K Deep Warm Dimming',
    contrastRatio: '8:1 Interior-to-Threshold Gradient',
    conceptSummary:
      'A residential sanctuary concept centered on an interior sculptural boulder and floor-to-ceiling low-iron glazing. By illuminating vertical interior surfaces rather than floors, glass reflections become transparent at blue hour.',
    architecturalContext:
      'Expansive structural glass often turns into an impenetrable black mirror at night when downlights create harsh horizontal hotspots.',
    lightingStrategy:
      'Pin-spot framing optics sculpt the interior monolith with 2400K high-CRI warmth, balanced by low-output ceiling slots that preserve uninterrupted views into the twilight landscape.',
    services: [
      'Low-Reflectance Glazing Balance',
      'Sculptural Object Framing Optics',
      'Circadian Evening Scene Programming',
      'Architectural Hardware Integration',
    ],
    diagramType: 'interior-reflection',
  },
  {
    id: 'meridian-walk',
    index: '03',
    title: 'Meridian Walk',
    category: 'Public realm · Lighting concept',
    studyLabel: 'Conceptual Study III — Waterline & Threshold Orientation',
    mood: 'Pathway illumination, natural landscape, orientation',
    microcopy: 'Guiding movement through landscape without overpowering night.',
    focalCropPosition: '46% 84%',
    focalScale: 1.22,
    kelvinProfile: '2200K Amber Shielded Bollards',
    contrastRatio: '5:1 Low-Horizon Visual Comfort',
    conceptSummary:
      'A nocturnal landscape study investigating how minimal, low-level point sources along a stone plinth and water edge can guide human movement without upward light trespass or skyglow.',
    architecturalContext:
      'Navigating the edge between cast stone, boulders, and dark water requires visual clarity at foot level while keeping the human eye adapted to the surrounding night sky.',
    lightingStrategy:
      'Deep-baffled bronze bollards cast controlled 180-degree fans across the limestone deck and water surface, creating rhythmic vertical reflections that mark the threshold.',
    services: [
      'Dark-Sky Compliant Optics',
      'Custom Bronze Bollard Specification',
      'Subtle Water-Edge Specular Study',
      'Pedestrian Mesopic Vision Calibration',
    ],
    diagramType: 'pathway-bollard',
  },
];

export const PRACTICE_PRINCIPLES: PracticePrinciple[] = [
  {
    number: '01 / Observe',
    title: 'Understand the architecture and the people who inhabit it.',
    summary:
      'Before specifying a single luminaire, we study how natural twilight moves across concrete, timber, stone, and water—and where darkness itself should remain untouched.',
    detail:
      'Every structure possesses an inherent nocturnal quietness. We map sightlines, material specularity, and human thresholds so artificial light feels native to the building.',
    opticalNote: 'Mesopic adaptation · Material reflectance analysis',
  },
  {
    number: '02 / Sculpt',
    title: 'Shape contrast, shadow, temperature, and rhythm with intention.',
    summary:
      'Uniform brightness flattens space. By orchestrating shadow alongside warm 2200K–2700K pools of light, we establish depth, hierarchy, and emotional cadence.',
    detail:
      'We conceal the source wherever possible so the visitor perceives only the illuminated surface—concrete grain, weathered stone, and tranquil water reflections.',
    opticalNote: 'Asymmetric grazing · Shielded aperture geometry',
  },
  {
    number: '03 / Reveal',
    title: 'Make the extraordinary visible without losing the quiet.',
    summary:
      'As evening deepens, architecture should not shout against the night sky. Our scenes transition imperceptibly from blue hour to late night.',
    detail:
      'Through subtle dimming curves and zoned scenes, a building breathes with the evening—inviting gathering at dusk and settling into a calm ember glow at midnight.',
    opticalNote: 'Warm-dim curves · Zero uplight sky preservation',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Listen',
    summary: 'Establish how a space is used and what it should evoke.',
    deliverable: 'Nocturnal Narrative & Threshold Brief',
    luxTarget: 'Darkness Baseline Audit',
  },
  {
    step: '02',
    title: 'Explore',
    summary: 'Study light, material, perspective, and contrast.',
    deliverable: 'Material Grazing & Kelvin Mockup Studies',
    luxTarget: '2200K – 3200K Spectral Range',
  },
  {
    step: '03',
    title: 'Compose',
    summary: 'Prototype scenes, accents, and moments of revelation.',
    deliverable: 'Architectural Cove & Detail Integration',
    luxTarget: 'Concealed Source Detailing',
  },
  {
    step: '04',
    title: 'Refine',
    summary: 'Tune the experience so it feels inevitable, never excessive.',
    deliverable: 'After-Dark Aiming & Scene Commissioning',
    luxTarget: 'Dusk-to-Midnight Scene Curve',
  },
];
