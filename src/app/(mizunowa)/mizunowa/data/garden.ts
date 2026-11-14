export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';
export type KoiId = 'kohaku' | 'yamabuki' | 'shiro' | 'sanke';

export interface NavItem {
  label: string;
  href: string;
}

export interface KoiSpecimen {
  id: KoiId;
  number: string;
  label: string;
  visiblePattern: string;
  caption: string;
  /** How this fish moves through the note pond, and so the line it leaves. */
  line: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  /** Colour and dash pattern of the wake drawn behind the fish. */
  trailColor: string;
  trailDash: readonly number[];
}

export interface GardenStop {
  number: string;
  title: string;
  description: string;
  mapLabel: string;
  japanese: string;
  reading: string;
  notice: string;
  /** Marker position in the 1200 x 900 map viewBox. */
  x: number;
  y: number;
}

export interface SeasonNote {
  id: SeasonId;
  season: string;
  kanji: string;
  reading: string;
  japanese: string;
  summary: string;
  detail: string;
  light: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const NAV_LINKS: readonly NavItem[] = [
  { label: 'PHILOSOPHY', href: '#koi' },
  { label: 'VIRTUAL TOUR', href: '#walk' },
  { label: 'ABOUT', href: '#seasons' },
];

export const KOI_SPECIMENS: readonly KoiSpecimen[] = [
  {
    id: 'kohaku',
    number: '01',
    label: 'Red and white',
    visiblePattern: 'Porcelain body, vermilion islands',
    caption: 'Warm patches on a pale body.',
    line: 'Wide, slow circuits of the whole pond.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#9E3F32',
    accentColor: '#9E3F32',
    trailColor: '#C7A6A2',
    trailDash: [],
  },
  {
    id: 'yamabuki',
    number: '02',
    label: 'Gold',
    visiblePattern: 'Gold body with a porcelain underside',
    caption: 'A warm glint beneath the water.',
    line: 'A figure of eight, crossing its own wake.',
    primaryColor: '#CB9462',
    secondaryColor: '#FDFBF5',
    accentColor: '#CB9462',
    trailColor: '#CB9462',
    trailDash: [14, 9],
  },
  {
    id: 'shiro',
    number: '03',
    label: 'Ink and white',
    visiblePattern: 'Porcelain with irregular charcoal patches',
    caption: 'Dark markings, softly defined.',
    line: 'Tight turns, close to the near bank.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#1E2320',
    accentColor: '#1E2320',
    trailColor: '#D6C7A9',
    trailDash: [2, 8],
  },
  {
    id: 'sanke',
    number: '04',
    label: 'Three colours',
    visiblePattern: 'Porcelain, vermilion and charcoal',
    caption: 'A pattern made of light and shadow.',
    line: 'A long wander that never quite repeats.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#9E3F32',
    accentColor: '#1E2320',
    trailColor: '#F4EFE2',
    trailDash: [26, 7, 3, 7],
  },
];

export const GARDEN_STOPS: readonly GardenStop[] = [
  {
    number: '01',
    title: 'Pond edge',
    description: 'Begin where the koi move through the clear green water.',
    mapLabel: '01 · Pond edge',
    japanese: '池',
    reading: 'Ike',
    notice: 'Four koi, each keeping to its own line.',
    x: 312,
    y: 688,
  },
  {
    number: '02',
    title: 'Sakura grove',
    description: 'Follow the path beneath a canopy of pale spring blossoms.',
    mapLabel: '02 · Sakura grove',
    japanese: '桜',
    reading: 'Sakura',
    notice: 'Petals resting on the water below the branches.',
    x: 240,
    y: 296,
  },
  {
    number: '03',
    title: 'Shrine courtyard',
    description: 'Pass the torii and arrive at a small timber hall set back among the trees.',
    mapLabel: '03 · Shrine courtyard',
    japanese: '参道',
    reading: 'Sandō',
    notice: 'The path, the gate and the hall, set in one line.',
    x: 910,
    y: 218,
  },
];

export const SEASON_NOTES: readonly SeasonNote[] = [
  {
    id: 'spring',
    season: 'Spring',
    kanji: '春',
    reading: 'Haru',
    japanese: '春 / Haru',
    summary: 'Soft blossoms gather over the water.',
    detail:
      'Pale pink sakura clusters frame the bank while stray petals drift quietly over the jade surface.',
    light: 'Low and rose-tinted',
  },
  {
    id: 'summer',
    season: 'Summer',
    kanji: '夏',
    reading: 'Natsu',
    japanese: '夏 / Natsu',
    summary: 'Deep green leaves make a little shade.',
    detail:
      'Blossoms give way to full leaf canopies and dense moss along the stepping stones, cooling the edges of the pond.',
    light: 'High and green-gold',
  },
  {
    id: 'autumn',
    season: 'Autumn',
    kanji: '秋',
    reading: 'Aki',
    japanese: '秋 / Aki',
    summary: 'The path takes on warmer colors.',
    detail:
      'Ochre foliage and warm stone tones settle along the shrine approach, echoing the gold koi moving underneath.',
    light: 'Long and amber',
  },
  {
    id: 'winter',
    season: 'Winter',
    kanji: '冬',
    reading: 'Fuyu',
    japanese: '冬 / Fuyu',
    summary: 'Bare branches let the shape of the garden show.',
    detail:
      'With leaves cleared away, the dark timber uprights, gabled roof, and curving stone bank read in crisp silhouette.',
    light: 'Pale and clear',
  },
];

export const PLAN_STEPS = [
  { number: '01', label: 'Watch the water' },
  { number: '02', label: 'Follow the blossoms' },
  { number: '03', label: 'Find the courtyard' },
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'Is MIZUNOWA a real place?',
    answer: 'No. This is an imagined garden created as a digital landing-page template.',
  },
  {
    question: 'Can I interact with the pond?',
    answer:
      'Yes. Click or touch the pond water directly to drop food and send ripples across the surface.',
  },
  {
    question: 'What if my device cannot run the 3D scene?',
    answer:
      'A composed still view remains visible, and you can continue through the full garden guide.',
  },
  {
    question: 'Can I pause the movement?',
    answer:
      'Yes. Rely on your device’s reduced-motion setting for a composed still view automatically.',
  },
  {
    question: 'Are the koi real fish?',
    answer:
      'No. They are original computer-generated characters with four distinct color patterns.',
  },
  {
    question: 'Can I book a visit?',
    answer:
      'No. The garden is fictional, and this template does not make bookings or collect personal information.',
  },
];
