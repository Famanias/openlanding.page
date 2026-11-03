export interface ProjectItem {
  id: 'auren-house' | 'morrow-field';
  number: string;
  name: string;
  title: string;
  disciplines: string;
  disciplineList: string[];
  description: string;
  artwork: string;
  artworkAlt: string;
  archiveStamp: string;
  year: string;
  theme: 'warm-limestone' | 'cobalt-editorial';
  palette: {
    name: string;
    swatches: { label: string; hex: string }[];
  };
  caseStudy: {
    conceptNotice: string;
    theBrief: string;
    creativeDirection: string;
    deliverables: string[];
    editorialNotes: string;
  };
}

export const workSectionContent = {
  eyebrow: '02 / SELECTED WORK',
  headlineLines: ['WORK THAT', 'CHANGES PERSPECTIVE.'],
  subtitle: 'Different challenges. Distinctive worlds. Ideas made tangible.',
  archiveLabel: 'STUDIO ARCHIVE / 2026',
};

export const projectsData: ProjectItem[] = [
  {
    id: 'auren-house',
    number: '01',
    name: 'AUREN HOUSE',
    title: '01 — AUREN HOUSE',
    disciplines: 'HOSPITALITY / BRAND IDENTITY / DIGITAL',
    disciplineList: ['HOSPITALITY', 'BRAND IDENTITY', 'DIGITAL'],
    description:
      'An identity and digital world built around quiet ritual, considered materials, and modern hospitality.',
    artwork: '/templates/zeno/auren-world.webp',
    artworkAlt:
      'Auren House brand world collage featuring travertine architectural furniture, blind-debossed stationery, monogrammed envelopes, and editorial web layouts',
    archiveStamp: 'ARCHIVE REF // AH-2026-01',
    year: '2026',
    theme: 'warm-limestone',
    palette: {
      name: 'Limestone, Uncoated Cream & Warm Umber',
      swatches: [
        { label: 'Travertine', hex: '#E6DEC8' },
        { label: 'Warm Umber', hex: '#6E5A4F' },
        { label: 'Parchment', hex: '#F3EFE6' },
        { label: 'Obsidian Ink', hex: '#181715' },
      ],
    },
    caseStudy: {
      conceptNotice: 'Fictional concept project from the ZENO. 2026 Studio Archive.',
      theBrief:
        'Auren House envisioned a new category of architectural sanctuary—bridging private residential calm with slow-paced hospitality. They needed a brand identity and digital flagship that rejected hospitality clichés in favor of tactile silence, monolithic stonework, and unhurried ritual.',
      creativeDirection:
        'We anchored the visual world in raw travertine geometry, blind-debossed cotton rag papers, and a high-contrast flared serif wordmark. Every digital transition mirrors the physical weight of turning heavy archival pages—pairing warm limestone photography with generous editorial margins.',
      deliverables: [
        'Brand positioning',
        'Identity system',
        'Art direction',
        'Digital experience',
      ],
      editorialNotes:
        'Printed collateral produced on 400gsm cotton stock with custom wax-toned seals and architectural room folios.',
    },
  },
  {
    id: 'morrow-field',
    number: '02',
    name: 'MORROW FIELD',
    title: '02 — MORROW FIELD',
    disciplines: 'FASHION / CAMPAIGN / CREATIVE DIRECTION',
    disciplineList: ['FASHION', 'CAMPAIGN', 'CREATIVE DIRECTION'],
    description:
      'A sharp, culture-led campaign system combining editorial fashion, expressive type, and bold visual rhythm.',
    artwork: '/templates/zeno/morrow-world.webp',
    artworkAlt:
      'Morrow Field Fall Winter 2026 campaign world featuring technical outerwear portrait photography, electric cobalt MF posters, and lookbook spreads',
    archiveStamp: 'ARCHIVE REF // MF-2026-02',
    year: '2026',
    theme: 'cobalt-editorial',
    palette: {
      name: 'Electric Cobalt, Stark Newsprint & Carbon Black',
      swatches: [
        { label: 'Signal Cobalt', hex: '#3B52F6' },
        { label: 'Stark Ivory', hex: '#F2F0EB' },
        { label: 'Carbon Black', hex: '#121216' },
        { label: 'Silver Halide', hex: '#B8B6C2' },
      ],
    },
    caseStudy: {
      conceptNotice: 'Fictional concept project from the ZENO. 2026 Studio Archive.',
      theBrief:
        'For its Fall/Winter 2026 collection, outerwear label Morrow Field sought to break away from sterile lookbooks and establish an unmistakable street-level cultural presence across print posters, zines, and digital lookbooks.',
      creativeDirection:
        'We constructed a modular graphic system around oversized condensed grotesk typography ("MF"), split circular geometric masks, and stark monochrome studio portraits punctuated by electric cobalt technical garments. The campaign reads with the immediacy of wheat-pasted wheatpaste posters and archival Swiss exhibition catalogs.',
      deliverables: [
        'Campaign concept',
        'Photography direction',
        'Editorial system',
        'Launch materials',
      ],
      editorialNotes:
        'Accompanied by a 48-page saddle-stitched newsprint lookbook and wild-posting street campaign system.',
    },
  },
];
