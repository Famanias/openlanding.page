export interface CaseStudyMetric {
  label: string;
  value: string;
  context: string;
}

export interface CaseStudy {
  id: 'loop' | 'forma' | 'kindred';
  index: string;
  code: string;
  title: string;
  category: string;
  year: string;
  clientType: string;
  role: string;
  duration: string;
  panelColor: string;
  accentColor: string;
  heroImage: string;
  secondaryImage: string;
  summary: string;
  challenge: string;
  process: string;
  solution: string;
  outcome: string;
  deliverables: string[];
  metrics: CaseStudyMetric[];
  specs: { label: string; value: string }[];
}

export interface AnatomyPart {
  id: 'cover' | 'dial' | 'pcb' | 'buttons' | 'usb';
  code: string;
  name: string;
  shortLabel: string;
  material: string;
  finish: string;
  tolerance: string;
  description: string;
  layerImage: string;
  /** Anchor % on device stage (0-100) */
  anchorX: number;
  anchorY: number;
  /** Label % on device stage (0-100) */
  labelX: number;
  labelY: number;
  /** Exploded offset in px / deg */
  explodeDx: number;
  explodeDy: number;
  explodeRotate: number;
  explodeScale: number;
}

export interface LoopTrack {
  id: string;
  number: string;
  title: string;
  artist: string;
  bpm: number;
  durationSec: number;
  keySignature: string;
  waveform: number[];
}

export interface ProcessStep {
  id: 'notice' | 'sketch' | 'prototype' | 'refine';
  index: string;
  phase: string;
  title: string;
  subtitle: string;
  color: string;
  sketchAsset: string;
  annotation: string;
  description: string;
  artifacts: string[];
  gridCoord: { col: number; row: number };
}

export interface EditorialNote {
  id: string;
  number: string;
  date: string;
  readTime: string;
  category: string;
  title: string;
  excerpt: string;
  accentColor: string;
  illustration: string;
  takeaway: string;
  paragraphs: string[];
}

export interface SwatchItem {
  id: string;
  name: string;
  hex: string;
  pantoneCode: string;
  surfaceRole: string;
  textColor: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  projectScope: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'loop',
    index: '01',
    code: '01 / LOOP — INDUSTRIAL DESIGN',
    title: 'LOOP',
    category: 'Personal Audio · Industrial & Apparatus UI',
    year: '2026',
    clientType: 'Concept Hardware & Companion OS',
    role: 'Lead Industrial & Interaction Designer',
    duration: '14 Weeks · Concept to DFM Prototype',
    panelColor: '#D5C8FC',
    accentColor: '#FF735D',
    heroImage: '/templates/nicopark/loop-hero.webp',
    secondaryImage: '/templates/nicopark/loop-detail-01.webp',
    summary:
      'A pocketable, screen-minimal personal audio player that brings physical inertia, optical acrylic depth, and mechanical detents back to everyday listening.',
    challenge:
      'Modern streaming apps bury music underneath infinite notification feeds and flat glass rectangles. Listeners wanted a dedicated physical object for intentional album sessions and stem looping without sacrificing wireless convenience or tactile joy.',
    process:
      'Through 28 CNC-milled foam and resin enclosure iterations, we paired a single-piece compression-molded coral polycarbonate shell with an oversized optical-grade PMMA frosted dial cover that exposes the dark gold-traced PCB and optical hall-effect ring underneath.',
    solution:
      'LOOP combines a 36-detent magnetic rotary wheel on the top shoulder with a capacitive-mechanical front acrylic platter and a lightweight yellow E-Ink / OLED companion apparatus UI for library curation and loop point slicing.',
    outcome:
      'Reduced eyes-on-screen time during active listening sessions by 84% in 40-person studio usability testing while achieving full IP54 splash resistance and 3-screw modular repairability.',
    deliverables: [
      'Industrial Design & CAD Enclosure Assembly',
      'Optical Acrylic Platter & Hall-Effect Detent Mechanism',
      'LOOP Apparatus Companion UI System',
      'Exploded Sub-Assembly DFM Documentation'
    ],
    metrics: [
      { label: 'Eyes-Free Operation', value: '84%', context: 'Reduction in screen glances per 45-min session across 40 studio testers' },
      { label: 'Modular Disassembly', value: '90 sec', context: 'Full battery & USB-C sub-assembly swap using a single T6 driver' },
      { label: 'Rotary Precision', value: '36 steps', context: 'Neodymium hall-effect detents per 360° revolution with zero mechanical wear' }
    ],
    specs: [
      { label: 'Dimensions', value: '94 × 94 × 31 mm (168g)' },
      { label: 'Shell Material', value: '30% Glass-Filled Recycled Polycarbonate (#FF735D Matte)' },
      { label: 'Front Platter', value: '3.2mm Optical Cast PMMA with Laser-Etched Vernier Scale' },
      { label: 'I/O Sub-Assembly', value: 'Modular USB-C PD + Balanced 3.5mm + Line-In Record' }
    ]
  },
  {
    id: 'forma',
    index: '02',
    code: '02 / FORMA — DIGITAL PRODUCT',
    title: 'FORMA',
    category: 'Spatial Digital Workspace & Tactile Controller',
    year: '2025',
    clientType: 'Creative Tools Platform',
    role: 'Principal Product & Systems Designer',
    duration: '18 Weeks · Design System & Desktop Client',
    panelColor: '#3049F0',
    accentColor: '#F7E36B',
    heroImage: '/templates/nicopark/forma-ui.svg',
    secondaryImage: '/templates/nicopark/process-sketch-03.svg',
    summary:
      'A modular digital workbench for hardware-software teams that replaces nested folder trees with physical-feeling spatial trays, timeline strips, and a desk puck.',
    challenge:
      'Industrial designers and firmware engineers constantly context-switch between CAD viewers, issue trackers, and oscilloscope captures. Traditional SaaS boards flatten visual artifacts into identical grey cards.',
    process:
      'We observed 16 hardware engineering studios and mapped how physical project trays are arranged on workbenches. We translated that spatial logic into a snap-grid canvas with 1:1 physical scale rulers and an optional rotary desk puck.',
    solution:
      'FORMA organizes active sprints into magnetic color-coded trays—butter yellow for live firmware builds, lavender for CAD revisions, and coral for blocker tolerances—with instant keyboard and rotary scrubbing through build history.',
    outcome:
      'Adopted by 14 independent design studios during beta, cutting cross-discipline design review prep time from 3.5 hours to 35 minutes per weekly critique.',
    deliverables: [
      'Spatial Canvas Architecture & Snap Physics Engine',
      'Multi-Modal Design Token System (Cobalt / Ivory / Butter)',
      'CAD-to-Timeline Annotation Bridge',
      'Hardware Rotary Puck HID Interaction Spec'
    ],
    metrics: [
      { label: 'Review Prep Time', value: '-83%', context: 'Weekly critique setup dropped from 3.5 hrs to 35 mins across 14 beta studios' },
      { label: 'Canvas Frame Rate', value: '120 fps', context: 'Zero-layout-thrash compositor transforms with 400+ live inspection nodes' },
      { label: 'Keyboard & Puck Speed', value: '2.4×', context: 'Faster CAD tolerance comparison versus tabbed browser workflows' }
    ],
    specs: [
      { label: 'Platform', value: 'WebGL / React Spatial Canvas + WebHID Rotary Support' },
      { label: 'Grid System', value: '8pt Modular Snap Matrix with True-Millimeter Zoom Calibration' },
      { label: 'Color Architecture', value: 'High-Contrast Daylight Studio Palette (WCAG AAA Compliant)' },
      { label: 'Export Formats', value: 'STEP Metadata, SVG Schematic Package, JSON Design Tokens' }
    ]
  },
  {
    id: 'kindred',
    index: '03',
    code: '03 / KINDRED — BRAND EXPERIENCE',
    title: 'KINDRED',
    category: 'Community Toolkit · Service & Brand System',
    year: '2025',
    clientType: 'Public Repair & Maker Collectives',
    role: 'Brand, Packaging & Service Designer',
    duration: '10 Weeks · Identity & Physical Toolkit',
    panelColor: '#FF735D',
    accentColor: '#D5C8FC',
    heroImage: '/templates/nicopark/kindred-brand.svg',
    secondaryImage: '/templates/nicopark/process-sketch-02.svg',
    summary:
      'An open-source physical and digital identity toolkit for neighborhood repair cafés, tool libraries, and weekend hardware workshops.',
    challenge:
      'Community repair clinics often feel intimidating or makeshift to newcomers. Organizers needed a low-cost, modular signage, triage card, and badge system that felt welcoming, durable, and unmistakably optimistic.',
    process:
      'Working alongside three community repair collectives, we designed a two-color risograph and letterpress print system anchored by an 8-spoke modular asterisk symbol where each spoke represents a core repair skill.',
    solution:
      'The KINDRED kit ships flat in a recycled board portfolio containing die-cut triage tags, magnetic skill badges, exposed-spine repair passports, and a browser-based stencil generator for local chapters.',
    outcome:
      'Deployed across 22 neighborhood tool libraries in 6 countries, increasing first-time visitor sign-ups by 62% during weekend repair sessions.',
    deliverables: [
      '8-Arm Parametric Asterisk Identity System',
      'Flat-Pack Risograph Field Guide & Repair Passport',
      'Tactile Enamel & Magnetic Skill Token System',
      'Browser-Based Chapter Poster & Label Generator'
    ],
    metrics: [
      { label: 'Active Chapters', value: '22 hubs', context: 'Neighborhood tool libraries using the physical kit across 6 countries' },
      { label: 'First-Time Visitors', value: '+62%', context: 'Increase in walk-in repair session participation over 6 months' },
      { label: 'Unit Print Cost', value: '$1.40', context: 'Per complete newcomer passport & triage tag set using 2-ink risograph' }
    ],
    specs: [
      { label: 'Paper Stock', value: '350gsm Uncoated Cotton Rag & Recycled Millboard' },
      { label: 'Ink System', value: 'Soy-Based Risograph Fluorescent Coral, Cobalt & Rich Black' },
      { label: 'Binding', value: 'Lay-Flat Exposed Smyth-Sewn Linen Thread Spine' },
      { label: 'License', value: 'Creative Commons BY-SA 4.0 Open Hardware & Identity Spec' }
    ]
  }
];

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'cover',
    code: '01 / SUB-ASSY A',
    name: 'Frosted Optical Acrylic Platter',
    shortLabel: 'EXPLODED VIEW',
    material: '3.2mm Cast PMMA (Optical Grade)',
    finish: 'Double-Sided Diamond Polish + Micro-Etched Vernier Ring',
    tolerance: '±0.03 mm CNC Perimeter Chamfer',
    description:
      'The signature circular front window floats 4.5mm proud of the coral enclosure, acting as both a protective lens over the internal PCB and a capacitive scrub platter with laser-etched 1° radial ticks.',
    layerImage: '/templates/nicopark/loop-cover.png',
    anchorX: 33,
    anchorY: 36,
    labelX: 82,
    labelY: 16,
    explodeDx: -64,
    explodeDy: -38,
    explodeRotate: -6,
    explodeScale: 1.07
  },
  {
    id: 'dial',
    code: '02 / SUB-ASSY B',
    name: 'CNC Knurled Tactile Rotary Dial',
    shortLabel: 'TACTILE DIAL',
    material: '6061-T6 Bead-Blasted Aluminum (Lilac Anodized)',
    finish: '72-Tooth Straight Diamond Knurl',
    tolerance: '±0.015 mm Concentric Shaft Runout',
    description:
      'Mounted on the upper-right shoulder at an ergonomic 28° thumb angle, this weighted aluminum encoder pairs with a contactless neodymium magnet array to deliver 36 crisp detents per revolution.',
    layerImage: '/templates/nicopark/loop-dial.png',
    anchorX: 69,
    anchorY: 22,
    labelX: 84,
    labelY: 24,
    explodeDx: 58,
    explodeDy: -48,
    explodeRotate: 12,
    explodeScale: 1.12
  },
  {
    id: 'pcb',
    code: '03 / SUB-ASSY C',
    name: 'Exposed Matte-Black DSP & Coil Array',
    shortLabel: 'INTERNAL DSP',
    material: '4-Layer FR4 Matte Black Solder Mask + ENIG Gold',
    finish: 'Conformal Coated Exposed Component Architecture',
    tolerance: '0.10 mm Pick-and-Place Alignment',
    description:
      'Rather than hiding electronics behind opaque plastic, LOOP treats the circuit layout as graphic typography—aligning the DAC, hall-effect sensors, and copper inductors along concentric arcs.',
    layerImage: '/templates/nicopark/loop-shell.png',
    anchorX: 46,
    anchorY: 44,
    labelX: 16,
    labelY: 79,
    explodeDx: 0,
    explodeDy: 0,
    explodeRotate: 0,
    explodeScale: 1.0
  },
  {
    id: 'buttons',
    code: '04 / SUB-ASSY D',
    name: 'Modular Side Sub-Assembly & Transport Pills',
    shortLabel: 'SUB-ASSEMBLY',
    material: 'Compression-Molded LSR Silicone + Polycarbonate',
    finish: 'Soft-Touch UV Matte Coating (65 Shore A)',
    tolerance: '±0.05 mm Gasket Seal Compression',
    description:
      'A removable lilac oval side plate houses the instant-record trigger, loop-lock toggle, and secondary lanyard anchor, sealed against dust and rain with an integrated perimeter O-ring.',
    layerImage: '/templates/nicopark/loop-buttons.png',
    anchorX: 71,
    anchorY: 51,
    labelX: 84,
    labelY: 61,
    explodeDx: 56,
    explodeDy: 28,
    explodeRotate: 5,
    explodeScale: 1.06
  },
  {
    id: 'usb',
    code: '05 / SUB-ASSY E',
    name: 'Bottom USB-C PD & Balanced Audio I/O Bay',
    shortLabel: 'USB-C PORT',
    material: 'Stainless Steel 316L Port Collar + Lilac Carrier',
    finish: 'PVD Matte Graphite Inner Sleeve',
    tolerance: '10,000+ Insertion Cycle Rated',
    description:
      'Because charging ports are the #1 failure point in portable electronics, LOOP isolates the USB-C and dual 3.5mm TRS jacks on a 2-screw replaceable daughterboard at the base.',
    layerImage: '/templates/nicopark/loop-buttons.png',
    anchorX: 45,
    anchorY: 74,
    labelX: 80,
    labelY: 70,
    explodeDx: -28,
    explodeDy: 54,
    explodeRotate: -4,
    explodeScale: 1.05
  }
];

export const LOOP_TRACKS: LoopTrack[] = [
  {
    id: 'trk-01',
    number: '01',
    title: 'SOLAR DETENT (STEM A)',
    artist: 'NICO PARK STUDIO LAB',
    bpm: 114,
    durationSec: 168,
    keySignature: 'F Maj · Tape Loop',
    waveform: [28, 45, 72, 38, 88, 95, 62, 40, 78, 92, 54, 34, 68, 84, 50, 30, 74, 90, 64, 42]
  },
  {
    id: 'trk-02',
    number: '02',
    title: 'ANODIZED MORNING',
    artist: 'KINETIC FOUNDRY',
    bpm: 98,
    durationSec: 204,
    keySignature: 'C Min · Modular Synth',
    waveform: [42, 60, 52, 84, 70, 48, 94, 80, 36, 58, 76, 88, 44, 62, 90, 72, 38, 54, 68, 46]
  },
  {
    id: 'trk-03',
    number: '03',
    title: 'POLYCARBONATE RAIN',
    artist: 'ATELIER 04',
    bpm: 126,
    durationSec: 152,
    keySignature: 'A Min · Field Recording',
    waveform: [64, 82, 90, 46, 58, 96, 74, 52, 86, 68, 40, 78, 92, 84, 56, 48, 80, 62, 50, 36]
  },
  {
    id: 'trk-04',
    number: '04',
    title: 'VERNIER PHASE SHIFT',
    artist: 'DIETER & THE DIALS',
    bpm: 108,
    durationSec: 185,
    keySignature: 'D Maj · Percussion Study',
    waveform: [32, 76, 54, 92, 66, 44, 82, 96, 58, 70, 48, 88, 74, 40, 64, 86, 52, 78, 60, 38]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'notice',
    index: '01',
    phase: 'NOTICE',
    title: 'Observe Real Friction in the Wild',
    subtitle: 'Field ethnography, broken hardware teardown, and tactile habit mapping',
    color: '#D5C8FC',
    sketchAsset: '/templates/nicopark/process-sketch-01.svg',
    annotation: 'FIG 1.1 — THUMB ARC ERGONOMIC SWEEP (R = 48MM)',
    description:
      'Every project begins by watching where people fumble, squint, or improvise workarounds. Before drawing a single curve on LOOP, we cataloged 40 worn-out portable cassette players, field recorders, and pocket cameras to see where human fingers naturally rest.',
    artifacts: [
      'Thumb-reach heatmaps on 1:1 clay bucks',
      'Failure analysis of worn ports & switches',
      'Single-sentence problem framing card'
    ],
    gridCoord: { col: 1, row: 1 }
  },
  {
    id: 'sketch',
    index: '02',
    phase: 'SKETCH',
    title: 'Orthographic Geometry & Bold Proportions',
    subtitle: 'Rapid marker elevations, strict primary silhouettes, and interface wireframes',
    color: '#F7E36B',
    sketchAsset: '/templates/nicopark/process-sketch-02.svg',
    annotation: 'FIG 2.4 — CONCENTRIC PLATTER RATIO (1 : 1.618)',
    description:
      'If a product silhouette is not recognizable at 24 pixels wide, it is too complicated. We pair orthographic marker drawings with low-latency HTML/SVG schematics on day three so industrial form and screen behavior evolve as one organism.',
    artifacts: [
      '1:1 millimeter-grid orthographic elevations',
      'Interactive SVG state-machine schematics',
      'Color-blocked CMF (Color, Material, Finish) boards'
    ],
    gridCoord: { col: 2, row: 1 }
  },
  {
    id: 'prototype',
    index: '03',
    phase: 'PROTOTYPE',
    title: 'Build Things You Can Drop on a Desk',
    subtitle: 'SLA resin enclosures, magnetic detent rigs, and live browser-to-hardware bridges',
    color: '#FF735D',
    sketchAsset: '/templates/nicopark/process-sketch-03.svg',
    annotation: 'FIG 3.2 — HALL-EFFECT TORQUE CURVE (36 DETENTS)',
    description:
      'Static slides lie about weight, friction, and latency. We print threaded resin shells, wire rotary encoders into live WebHID React sandboxes, and tune spring constants and switch travel in people’s hands within the first three weeks.',
    artifacts: [
      'Weighted SLA resin & CNC aluminum test rigs',
      'WebHID hardware-in-the-loop UI prototypes',
      'Acoustic & tactile switch force-displacement curves'
    ],
    gridCoord: { col: 3, row: 1 }
  },
  {
    id: 'refine',
    index: '04',
    phase: 'REFINE',
    title: 'Sweat the Seam Lines, Parting Lines & 60fps Curves',
    subtitle: 'DFM tolerance stacks, accessible contrast tuning, and repairable sub-assemblies',
    color: '#3049F0',
    sketchAsset: '/templates/nicopark/loop-detail-02.webp',
    annotation: 'FIG 4.0 — PRODUCTION DFM TOLERANCE (±0.03MM)',
    description:
      'Great design feels inevitable because every parting line, screw boss, focus ring, and spring curve was ruthlessly edited. We partner directly with mechanical engineers and frontend teams until the shipping artifact matches the studio prototype.',
    artifacts: [
      'Production STEP files & mold-flow parting specs',
      'Zero-layout-shift CSS/SVG motion specifications',
      'Modular repair & disassembly service guides'
    ],
    gridCoord: { col: 4, row: 1 }
  }
];

export const EDITORIAL_NOTES: EditorialNote[] = [
  {
    id: 'note-01',
    number: 'NOTE 01',
    date: 'OCTOBER 2026',
    readTime: '4 MIN READ',
    category: 'INDUSTRIAL CRAFT',
    title: 'Why Buttons Should Push Back: A Defense of Mechanical Detents',
    excerpt:
      'Capacitive glass taught us that every interface can morph into anything—and as a result, everything feels like nothing. Here is how we engineered the 36-step magnetic rotary feel on LOOP.',
    accentColor: '#FF735D',
    illustration: '/templates/nicopark/loop-detail-01.webp',
    takeaway: 'Tactile feedback is not nostalgia; it is cognitive offloading that lets your eyes stay in the real world.',
    paragraphs: [
      'When you reach into your coat pocket to skip a track or lower the volume, a flat glass rectangle forces you to pull the device out, wake the screen, parse visual hierarchy, and tap a 44-pixel target. That is four seconds of broken attention for a one-bit decision.',
      'During the early prototypes of LOOP, we tested seven different rotary encoders—from standard phosphor-bronze mechanical wipers to smooth fluid-damped potentiometers. Traditional mechanical encoders felt crisp on day one but developed gritty play after 8,000 cycles.',
      'Our breakthrough came from pairing a CNC-machined lilac aluminum wheel with an alternating ring of 18 micro neodymium magnets opposing a stationary stator above a contactless hall-effect sensor. Because nothing physically scrapes, the 36-detent snap feels identical on cycle 100,000 as it does out of the box—with a warm, unmistakable mechanical thud.'
    ]
  },
  {
    id: 'note-02',
    number: 'NOTE 02',
    date: 'SEPTEMBER 2026',
    readTime: '3 MIN READ',
    category: 'COLOR & MATERIALS',
    title: 'Designing with Optimistic Color Fields in a Sea of Space Grey',
    excerpt:
      'Why consumer hardware and creative software retreated into anodized charcoal—and how high-chroma coral, cobalt, and butter yellow improve spatial memory.',
    accentColor: '#F7E36B',
    illustration: '/templates/nicopark/studio-workspace.svg',
    takeaway: 'Color is not decoration applied at the end of CAD; it is an architectural wayfinding system.',
    paragraphs: [
      'Walk through any electronics aisle or SaaS dashboard directory and you will see the same desaturated slate grey repeated ad infinitum. Designers often mistake low saturation for seriousness.',
      'In both physical hardware (like LOOP) and spatial software (like FORMA), high-contrast color blocking performs real ergonomic work. When a secondary sub-assembly is molded in soft lilac (#D5C8FC) against a warm coral shell (#FF735D), a user immediately understands which part rotates, which part presses, and which seam opens for repair.',
      'The secret to keeping bold color fields timeless rather than toy-like is strict surface discipline: ultra-matte textures (SPI-C3 mold polish), crisp 2-pixel structural outlines, and generous warm-paper negative space (#F8F7F2) that lets the eye rest.'
    ]
  },
  {
    id: 'note-03',
    number: 'NOTE 03',
    date: 'AUGUST 2026',
    readTime: '5 MIN READ',
    category: 'INTERACTION PHYSICS',
    title: 'Treating DOM Panels Like Machined Aluminum Trays',
    excerpt:
      'Web interfaces feel weightless when everything fades in with identical opacity curves. By giving UI modules mass, friction, and snap targets, software starts to feel tangible.',
    accentColor: '#D5C8FC',
    illustration: '/templates/nicopark/forma-ui.svg',
    takeaway: 'Good interface motion communicates spatial origin and mechanical constraint, never arbitrary bounce.',
    paragraphs: [
      'When every element on a webpage transitions from opacity 0 to 1 over 400 milliseconds, nothing has permanence. Your brain perceives a projection on smoke rather than an instrument you can hold.',
      'In our studio, we choreograph digital panels the same way we tolerance physical desk trays. A primary stage has high mass and low displacement; a secondary inspector tile slides laterally along a rail and settles with a slight 1.5-degree spring overshoot.',
      'Crucially, great interaction physics must respect user agency: animations respond instantaneously on hover (<180ms), reverse cleanly when you scroll back, and step aside completely when prefers-reduced-motion is enabled.'
    ]
  }
];

export const PLAYGROUND_SWATCHES: SwatchItem[] = [
  { id: 'sw-coral', name: 'Signal Coral', hex: '#FF735D', pantoneCode: 'PMS 17-1461', surfaceRole: 'Primary Enclosure', textColor: '#191919' },
  { id: 'sw-cobalt', name: 'Electric Cobalt', hex: '#3049F0', pantoneCode: 'PMS 18-3963', surfaceRole: 'Focal Action & Ink', textColor: '#FFFFFF' },
  { id: 'sw-butter', name: 'Apparatus Butter', hex: '#F7E36B', pantoneCode: 'PMS 12-0752', surfaceRole: 'UI Stage & Badges', textColor: '#191919' },
  { id: 'sw-lavender', name: 'Tactile Lilac', hex: '#D5C8FC', pantoneCode: 'PMS 14-3812', surfaceRole: 'Sub-Assembly Controls', textColor: '#191919' },
  { id: 'sw-canvas', name: 'Studio Paper', hex: '#F8F7F2', pantoneCode: 'PMS 11-0105', surfaceRole: 'Drafting Canvas', textColor: '#191919' },
  { id: 'sw-ink', name: 'Carbon Graphite', hex: '#191919', pantoneCode: 'PMS 19-4004', surfaceRole: 'PCB & Structural Line', textColor: '#F8F7F2' }
];

/** Pure helper functions for deterministic state & unit testing */

export function getAnatomyPartTransform(
  part: AnatomyPart,
  isExploded: boolean,
  explodeFactor = 1
): { x: number; y: number; rotate: number; scale: number } {
  if (!isExploded || explodeFactor <= 0) {
    return { x: 0, y: 0, rotate: 0, scale: 1 };
  }
  const clamped = Math.max(0, Math.min(1, explodeFactor));
  return {
    x: Math.round(part.explodeDx * clamped * 10) / 10,
    y: Math.round(part.explodeDy * clamped * 10) / 10,
    rotate: Math.round(part.explodeRotate * clamped * 10) / 10,
    scale: Math.round((1 + (part.explodeScale - 1) * clamped) * 1000) / 1000
  };
}

export function cycleAnatomyPart(currentId: AnatomyPart['id'], direction: 1 | -1 = 1): AnatomyPart {
  const idx = ANATOMY_PARTS.findIndex((p) => p.id === currentId);
  const safeIdx = idx === -1 ? 0 : idx;
  const nextIdx = (safeIdx + direction + ANATOMY_PARTS.length) % ANATOMY_PARTS.length;
  return ANATOMY_PARTS[nextIdx];
}

export function cycleLoopTrack(currentId: string, direction: 1 | -1 = 1): LoopTrack {
  const idx = LOOP_TRACKS.findIndex((t) => t.id === currentId);
  const safeIdx = idx === -1 ? 0 : idx;
  const nextIdx = (safeIdx + direction + LOOP_TRACKS.length) % LOOP_TRACKS.length;
  return LOOP_TRACKS[nextIdx];
}

export function formatTrackTime(seconds: number): string {
  const clamped = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function calculateAsteriskSpokes(
  armCount: number,
  rotationDeg: number,
  radius: number
): Array<{ x1: number; y1: number; x2: number; y2: number; angleDeg: number }> {
  const safeArms = Math.max(2, Math.min(16, Math.round(armCount)));
  const safeRadius = Math.max(10, Math.min(200, radius));
  const spokes: Array<{ x1: number; y1: number; x2: number; y2: number; angleDeg: number }> = [];
  for (let i = 0; i < safeArms; i++) {
    const angleDeg = rotationDeg + (i * 180) / safeArms;
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.cos(rad) * safeRadius;
    const dy = Math.sin(rad) * safeRadius;
    spokes.push({
      x1: Math.round(-dx * 100) / 100,
      y1: Math.round(-dy * 100) / 100,
      x2: Math.round(dx * 100) / 100,
      y2: Math.round(dy * 100) / 100,
      angleDeg: Math.round(angleDeg * 10) / 10
    });
  }
  return spokes;
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedScope = input.projectScope.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address so Nico can reply.';
  }
  if (!trimmedScope) {
    errors.projectScope = 'Please select a project discipline.';
  }
  if (trimmedMessage.length < 12) {
    errors.message = 'Please share a brief note about your project (at least 12 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function buildMailtoHref(input: ContactFormInput): string {
  const subject = encodeURIComponent(`[Portfolio Inquiry] ${input.projectScope} — from ${input.name.trim()}`);
  const body = encodeURIComponent(
    `Hi Nico,\n\n${input.message.trim()}\n\n—\nName: ${input.name.trim()}\nEmail: ${input.email.trim()}\nDiscipline: ${input.projectScope}`
  );
  return `mailto:nico@nicopark.design?subject=${subject}&body=${body}`;
}
