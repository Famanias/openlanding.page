import { POSTMARK_ASSETS } from './assets';

export type DestinationId = 'lisbon' | 'kyoto' | 'copenhagen';
export type PhotoStyleId = 'harbor-sun' | 'old-town-laneway' | 'morning-transit';
export type StampStyleId = 'coastal-crest' | 'mountain-air' | 'midnight-ferry';

export interface DestinationMemory {
  id: DestinationId;
  code: string;
  city: string;
  country: string;
  coordinatesLabel: string;
  dateLabel: string;
  postmarkCode: string;
  sampleNote: string;
  storyTitle: string;
  storyExcerpt: string;
  detailTag: string;
  mapPoint: { x: number; y: number };
  defaultPhotoStyle: PhotoStyleId;
  defaultStamp: StampStyleId;
}

export interface PhotoStyleOption {
  id: PhotoStyleId;
  label: string;
  caption: string;
  assetUrl: string;
  cropClass: string;
  frameTintClass: string;
}

export interface StampDefinition {
  id: StampStyleId;
  title: string;
  subtitle: string;
  denomination: string;
  palette: {
    paper: string;
    primary: string;
    secondary: string;
    accent: string;
    ink: string;
  };
}

export interface FilmstripVignette {
  id: string;
  indexLabel: string;
  title: string;
  placeLabel: string;
  dateLabel: string;
  postmarkNumber: string;
  frontCaption: string;
  backHandwriting: string;
  backStory: string;
  assetUrl: string;
  cropClass: string;
  tiltClass: string;
  stampId: StampStyleId;
}

export const DESTINATIONS: Record<DestinationId, DestinationMemory> = {
  lisbon: {
    id: 'lisbon',
    code: 'LIS',
    city: 'Lisbon',
    country: 'Portugal',
    coordinatesLabel: 'Alfama · Miradouro de Santa Luzia',
    dateLabel: '14 OCT · LATE AFTERNOON',
    postmarkCode: 'PM-LIS-014',
    sampleNote: 'The light on the harbor made us stay a little longer. Two coffees turned into sunset over terracotta roofs.',
    storyTitle: 'Terracotta Light Above the Tagus',
    storyExcerpt:
      'Tram 28 rattled past the tiled wall just as the estuary turned copper. We tucked the paper ferry receipt right behind the photograph.',
    detailTag: 'Ferry stub · Tile terrace · Espresso #2',
    mapPoint: { x: 215, y: 310 },
    defaultPhotoStyle: 'harbor-sun',
    defaultStamp: 'coastal-crest',
  },
  kyoto: {
    id: 'kyoto',
    code: 'KYO',
    city: 'Kyoto',
    country: 'Japan',
    coordinatesLabel: 'Higashiyama · Philosopher’s Path',
    dateLabel: '03 NOV · EARLY MORNING',
    postmarkCode: 'PM-KYO-089',
    sampleNote: 'Quiet wooden storefronts before the lanterns came down. Cedar rain on stone steps and warm roasted tea.',
    storyTitle: 'Lantern Mist on Stone Lanes',
    storyExcerpt:
      'Before seven in the morning, the alley sounded only like bicycles and rain dripping off cedar eaves into moss basins.',
    detailTag: 'Local rail ticket · Cedar stamp · Hojicha',
    mapPoint: { x: 745, y: 278 },
    defaultPhotoStyle: 'old-town-laneway',
    defaultStamp: 'mountain-air',
  },
  copenhagen: {
    id: 'copenhagen',
    code: 'CPH',
    city: 'Copenhagen',
    country: 'Denmark',
    coordinatesLabel: 'Christianshavn · South Canal',
    dateLabel: '22 JUN · NORTHERN DUSK',
    postmarkCode: 'PM-CPH-042',
    sampleNote: 'Ten p.m. and the sky still held pale apricot light. Bicycles lined the bridge while sailboats rocked below.',
    storyTitle: 'Long Dusk Along the Canal',
    storyExcerpt:
      'Cardamom buns in a brown paper bag, salt wind off the harbor bath, and timber masts clinking softly until midnight.',
    detailTag: 'Harbor ferry pass · Bakery bag · 22:15 sky',
    mapPoint: { x: 448, y: 158 },
    defaultPhotoStyle: 'morning-transit',
    defaultStamp: 'midnight-ferry',
  },
};

export const DESTINATION_LIST: DestinationMemory[] = [
  DESTINATIONS.lisbon,
  DESTINATIONS.kyoto,
  DESTINATIONS.copenhagen,
];

export const PHOTO_STYLES: PhotoStyleOption[] = [
  {
    id: 'harbor-sun',
    label: 'Harbor Overlook',
    caption: 'Warm coastal print · Matte ivory border',
    assetUrl: POSTMARK_ASSETS.postcardBuilder,
    cropClass: 'pm-crop-harbor',
    frameTintClass: 'pm-tint-warm',
  },
  {
    id: 'old-town-laneway',
    label: 'Quiet Timber Street',
    caption: 'Morning lantern walk · Archival silver tone',
    assetUrl: POSTMARK_ASSETS.memoryMap,
    cropClass: 'pm-crop-kyoto-lane',
    frameTintClass: 'pm-tint-parchment',
  },
  {
    id: 'morning-transit',
    label: 'Corner Café Terrace',
    caption: 'Streetlight table · Sunlit linen stock',
    assetUrl: POSTMARK_ASSETS.heroClean,
    cropClass: 'pm-crop-cafe',
    frameTintClass: 'pm-tint-peach',
  },
];

export const STAMP_DEFINITIONS: Record<StampStyleId, StampDefinition> = {
  'coastal-crest': {
    id: 'coastal-crest',
    title: 'Atlantic Harbor',
    subtitle: 'PAR AVION · COASTAL MAIL',
    denomination: '24',
    palette: {
      paper: '#FFF8EC',
      primary: '#D85743',
      secondary: '#8FC3E6',
      accent: '#F4E07A',
      ink: '#25292C',
    },
  },
  'mountain-air': {
    id: 'mountain-air',
    title: 'Cedar & Ridge',
    subtitle: 'POSTMARK · HIGHLAND ROUTE',
    denomination: '38',
    palette: {
      paper: '#F7F1E8',
      primary: '#77978B',
      secondary: '#5A3528',
      accent: '#D85743',
      ink: '#25292C',
    },
  },
  'midnight-ferry': {
    id: 'midnight-ferry',
    title: 'Northern Crossing',
    subtitle: 'TRANSIT · MARITIME POST',
    denomination: '50',
    palette: {
      paper: '#FFF9EF',
      primary: '#5A3528',
      secondary: '#D8BD96',
      accent: '#D85743',
      ink: '#25292C',
    },
  },
};

export const DESK_EXTRA_STAMPS: Array<{
  id: string;
  stampStyle: StampStyleId;
  label: string;
  originCode: string;
}> = [
  { id: 'stamp-coastal', stampStyle: 'coastal-crest', label: 'Harbor Post · 24c', originCode: 'LIS · 14 OCT' },
  { id: 'stamp-mountain', stampStyle: 'mountain-air', label: 'Highland Cedar · 38c', originCode: 'KYO · 03 NOV' },
  { id: 'stamp-ferry', stampStyle: 'midnight-ferry', label: 'Canal Ferry · 50c', originCode: 'CPH · 22 JUN' },
];

export const FILMSTRIP_VIGNETTES: FilmstripVignette[] = [
  {
    id: 'harbor',
    indexLabel: '01 / THE HARBOR',
    title: 'Salt air and late sun on painted stone.',
    placeLabel: 'Coastal Overlook · Mediterranean & Atlantic',
    dateLabel: 'OCTOBER 14 · 17:40',
    postmarkNumber: 'ARCHIVE NO. 014',
    frontCaption: 'We meant to stay ten minutes at the sea wall and watched three ferries cross instead.',
    backHandwriting: 'Wait for the golden hour by the lower quay—everything turns apricot.',
    backStory:
      'Tucked inside this card: two espresso receipts, the folded harbor timetable, and the sound of gulls echoing off sun-warmed plaster.',
    assetUrl: POSTMARK_ASSETS.ephemeraCollage,
    cropClass: 'pm-film-crop-harbor',
    tiltClass: 'pm-tilt-neg-1',
    stampId: 'coastal-crest',
  },
  {
    id: 'quiet-street',
    indexLabel: '02 / THE QUIET STREET',
    title: 'Wooden eaves before the city wakes.',
    placeLabel: 'Gion & Higashiyama · Kyoto',
    dateLabel: 'NOVEMBER 03 · 06:50',
    postmarkNumber: 'ARCHIVE NO. 089',
    frontCaption: 'Rain-dark flagstones and the smell of roasted tea drifting from a half-open lattice door.',
    backHandwriting: 'Walk north past the small bridge before 7am. Not a single crowd in sight.',
    backStory:
      'Recorded on damp notebook paper under a station awning while waiting for the local train toward Kurama.',
    assetUrl: POSTMARK_ASSETS.memoryMap,
    cropClass: 'pm-film-crop-street',
    tiltClass: 'pm-tilt-pos-1',
    stampId: 'mountain-air',
  },
  {
    id: 'long-way-home',
    indexLabel: '03 / THE LONG WAY HOME',
    title: 'Sidewalk tables and unhurried detours.',
    placeLabel: 'Bairro Alto · Old Quarter',
    dateLabel: 'OCTOBER 16 · 15:15',
    postmarkNumber: 'ARCHIVE NO. 019',
    frontCaption: 'Every wrong turn led to wrought-iron balconies, striped awnings, and another conversation.',
    backHandwriting: 'Never take the shortest street back to the station.',
    backStory:
      'A candid print snapped from across the lane just before the afternoon tram bell cleared the corner.',
    assetUrl: POSTMARK_ASSETS.postcardBuilder,
    cropClass: 'pm-film-crop-cafe',
    tiltClass: 'pm-tilt-neg-2',
    stampId: 'midnight-ferry',
  },
  {
    id: 'place-to-return',
    indexLabel: '04 / A PLACE TO RETURN TO',
    title: 'Tickets, stamps, and ink that outlast the flight.',
    placeLabel: 'Correspondence Folder · Kept Collection',
    dateLabel: 'COLLECTED · YEAR ROUND',
    postmarkNumber: 'ARCHIVE NO. 104',
    frontCaption: 'Long after luggage tags fade, a dated postmark remembers exactly how the afternoon felt.',
    backHandwriting: 'Saved for the next trip—and for opening ten winters from now.',
    backStory:
      'Every journey gathers small paper witnesses: transit stubs, hand-stamped passes, and three honest sentences written on the train.',
    assetUrl: POSTMARK_ASSETS.ephemeraStampSheet,
    cropClass: 'pm-film-crop-stamps',
    tiltClass: 'pm-tilt-pos-2',
    stampId: 'coastal-crest',
  },
];

export const MANIFESTO_NOTES = [
  {
    id: 'the-place',
    kicker: '01 · THE PLACE',
    title: 'Not the landmark—the bench twenty steps past it.',
    body: 'Pin the exact corner where the sea breeze met the bakery door, with coordinates kept gently out of the way until you want them.',
    handwritten: 'Corner of Rua da Saudade, 4:45pm',
    stampCode: 'LAT 38.71° N',
  },
  {
    id: 'the-feeling',
    kicker: '02 · THE FEELING',
    title: 'Three honest sentences while the memory is still warm.',
    body: 'Camera rolls bury moments under thousands of duplicates. A postcard asks only for the single frame and the words you would tell a friend.',
    handwritten: 'Still warm from the sun',
    stampCode: 'KEPT IN INK',
  },
  {
    id: 'the-detail',
    kicker: '03 · THE LITTLE DETAIL',
    title: 'Ferry stubs, cancellation marks, and the weather that day.',
    body: 'Pair every photograph with tactile postal stamps, transit labels, and date cancellations that turn fleeting snapshots into keepsakes.',
    handwritten: 'Carimbo · 14 Outubro',
    stampCode: 'PAR AVION',
  },
] as const;
