export interface ServiceItem {
  id: 'strategy' | 'identity' | 'campaigns' | 'digital';
  number: string;
  title: string;
  label: string;
  shortDesc: string;
  extendedDesc: string;
  capabilities: string[];
  artwork: string;
  artworkAlt: string;
  archiveCode: string;
  quadrant: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  labelPosition: 'above' | 'below';
  nodeCoord: { x: number; y: number };
}

export const expertiseContent = {
  eyebrow: '01 / WHAT WE DO',
  diagramHeader: 'THE ANATOMY OF AN IDEA',
  headlineLines: ['GOOD IDEAS', "AREN'T", 'ACCIDENTS.'],
  body: 'We connect thinking, making, and moving to create work that stays with people.',
  ctaLabel: 'OUR APPROACH',
};

export const servicesData: ServiceItem[] = [
  {
    id: 'strategy',
    number: '01',
    title: 'STRATEGY',
    label: '01 — STRATEGY',
    shortDesc: 'Positioning, research, direction.',
    extendedDesc:
      'We define the intellectual and cultural foundation of a brand—turning raw market ambiguity into a sharp, defensible point of view.',
    capabilities: [
      'Brand Positioning & Architecture',
      'Cultural & Competitive Research',
      'Narrative & Verbal Direction',
      'Creative Territory Mapping',
    ],
    artwork: '/templates/zeno/strategy-print.webp',
    artworkAlt: 'Editorial grid sheet and bold monochrome print typography specimen for Strategy discipline',
    archiveCode: 'SYS // 01-STR',
    quadrant: 'top-left',
    labelPosition: 'above',
    nodeCoord: { x: 472, y: 540 },
  },
  {
    id: 'identity',
    number: '02',
    title: 'IDENTITY',
    label: '02 — IDENTITY',
    shortDesc: 'Visual systems, typography, expression.',
    extendedDesc:
      'Distinctive visual languages built from custom letterforms, tactile print specifications, and cohesive graphic rules that command recognition.',
    capabilities: [
      'Visual Identity Systems',
      'Bespoke Typography & Wordmarks',
      'Print, Packaging & Materiality',
      'Design Governance & Archives',
    ],
    artwork: '/templates/zeno/identity-print.webp',
    artworkAlt: 'Layered ZENO typographic study with cobalt arc, custom serif glyphs, and registration grid',
    archiveCode: 'SYS // 02-IDN',
    quadrant: 'top-right',
    labelPosition: 'above',
    nodeCoord: { x: 752, y: 386 },
  },
  {
    id: 'campaigns',
    number: '03',
    title: 'CAMPAIGNS',
    label: '03 — CAMPAIGNS',
    shortDesc: 'Art direction, storytelling, activation.',
    extendedDesc:
      'High-tension seasonal campaigns, editorial photography, and physical-to-digital activations designed to interrupt passive scrolling.',
    capabilities: [
      'Campaign Concept & Art Direction',
      'Editorial Photography & Film Direction',
      'Spatial & Print Activations',
      'Launch Choreography',
    ],
    artwork: '/templates/zeno/campaign-print.webp',
    artworkAlt: 'Collage of monochrome editorial posters and high-contrast fashion photography prints',
    archiveCode: 'SYS // 03-CMP',
    quadrant: 'bottom-left',
    labelPosition: 'below',
    nodeCoord: { x: 646, y: 658 },
  },
  {
    id: 'digital',
    number: '04',
    title: 'DIGITAL',
    label: '04 — DIGITAL',
    shortDesc: 'Websites, experiences, interactions.',
    extendedDesc:
      'Flagship websites, interactive archives, and motion-led digital flagships engineered with editorial restraint and tactile precision.',
    capabilities: [
      'Flagship Websites & Digital Worlds',
      'Interactive Art Direction & Motion',
      'Design Systems & Component Libraries',
      'Creative Front-End Engineering',
    ],
    artwork: '/templates/zeno/digital-print.webp',
    artworkAlt: 'Wireframe and typographic motion frame architectural diagram for Digital interfaces',
    archiveCode: 'SYS // 04-DIG',
    quadrant: 'bottom-right',
    labelPosition: 'below',
    nodeCoord: { x: 906, y: 538 },
  },
];
