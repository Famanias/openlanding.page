export interface NavItem {
  id: string;
  label: string;
  href: string;
  action?: 'scroll' | 'studio-dialog' | 'contact-dialog';
}

export interface ApproachStep {
  number: string;
  phase: string;
  title: string;
  summary: string;
  artifacts: string[];
}

export const siteConfig = {
  name: 'ZENO.',
  tagline: 'INDEPENDENT CREATIVE PRACTICE / 2026',
  shortTagline: 'INDEPENDENT CREATIVE PRACTICE',
  copyright: '© 2026 ZENO. ALL IDEAS IN MOTION.',
  contactEmail: 'hello@zeno.studio',
  isDemoInbox: true,
  navItems: [
    { id: 'work', label: 'Work', href: '#work', action: 'scroll' },
    { id: 'expertise', label: 'Expertise', href: '#expertise', action: 'scroll' },
    { id: 'studio', label: 'Studio', href: '#studio', action: 'studio-dialog' },
    { id: 'contact', label: 'Contact', href: '#contact', action: 'scroll' },
  ] as NavItem[],
  hero: {
    eyebrow: 'INDEPENDENT CREATIVE PRACTICE / 2026',
    headlineLines: ['WE MAKE', 'THE EXPECTED', 'IRRELEVANT.'],
    body: 'We build identities, campaigns, and digital experiences for brands ready to challenge convention.',
    primaryCta: { label: 'EXPLORE OUR WORK', href: '#work' },
    secondaryCta: { label: 'GET TO KNOW US', action: 'studio-dialog' as const },
    microtypeLeft: 'STRATEGY / IDENTITY / CAMPAIGNS / DIGITAL',
    microtypeRight: 'SCROLL TO EXPLORE',
    artwork: '/templates/zeno/hero-collage.webp',
  },
  studioManifesto: {
    label: 'STUDIO ARCHIVE / MANIFESTO 2026',
    headline: 'BUILT FOR TENSION, CLARITY, AND CULTURAL WEIGHT.',
    lead: 'ZENO. is an independent creative practice operating at the intersection of Swiss editorial precision, physical print craft, and kinetic digital systems.',
    body: [
      'Most brand systems are engineered for consensus. They smooth away every edge until nothing memorable remains. We work with founders, cultural institutions, and ambitious houses who recognize that blending in is the riskiest position of all.',
      'Our practice treats digital interfaces with the tactile rigor of art-directed printed matter, and print archives with the responsiveness of living software. Every project begins with strategic conviction and resolves in a distinct visual world.',
    ],
    principles: [
      {
        index: '01',
        title: 'Editorial Rigor',
        detail: 'Typography as architecture. Grid systems built to create deliberate visual tension rather than predictable templates.',
      },
      {
        index: '02',
        title: 'Tangible Worlds',
        detail: 'Identities that hold their gravity across uncoated paper stock, spatial environments, and high-frame-rate web experiences.',
      },
      {
        index: '03',
        title: 'Singular Direction',
        detail: 'Direct collaboration with senior directors from initial positioning hypothesis through final production release.',
      },
    ],
  },
  approachSteps: [
    {
      number: '01',
      phase: 'DISCOVER',
      title: 'Uncover the productive tension',
      summary:
        'We audit category conventions, cultural shifts, and internal ambitions to find the exact fault line where your brand can claim undeniable territory.',
      artifacts: ['Cultural & Category Audit', 'Stakeholder Interviews', 'Strategic Fault-Line Map'],
    },
    {
      number: '02',
      phase: 'DEFINE',
      title: 'Set the thesis & verbal spine',
      summary:
        'Before drawing a single glyph, we lock the positioning thesis, narrative posture, and creative direction into a sharp editorial brief.',
      artifacts: ['Positioning Architecture', 'Verbal Identity & Tone', 'Visual World Hypothesis'],
    },
    {
      number: '03',
      phase: 'DESIGN',
      title: 'Construct the visual & kinetic system',
      summary:
        'We craft bespoke typography, material palettes, art direction, and interactive prototypes that behave as one continuous designed world.',
      artifacts: ['Identity & Type System', 'Print & Packaging Direction', 'Interactive Design System'],
    },
    {
      number: '04',
      phase: 'DELIVER',
      title: 'Launch with uncompromising craft',
      summary:
        'We oversee production, engineer front-end motion, and author living archives so the work enters culture with full force and zero dilution.',
      artifacts: ['Production Engineering', 'Campaign Rollout Assets', 'Living Brand Archive'],
    },
  ] as ApproachStep[],
  socials: [
    { label: 'INSTAGRAM', status: 'Template sample — configure handle before publishing' },
    { label: 'BEHANCE', status: 'Template sample — configure portfolio URL before publishing' },
    { label: 'LINKEDIN', status: 'Template sample — configure company page before publishing' },
  ],
};
