export type ArchiveCategory = 'All' | 'Portraits' | 'Places' | 'Architecture' | 'Details';

export interface HeroSlide {
  id: string;
  indexNumber: number; // 1..6
  serialCode?: '01' | '02' | '03';
  seriesTitle: string;
  year: string;
  workType: string;
  image: string;
  alt: string;
  location: string;
  cameraNote: string;
}

export interface StoryItem {
  id: string;
  number: string;
  title: string;
  year: string;
  locationMood: string;
  layoutVariant: 'wide-lead' | 'paper-inset' | 'diptych-lead' | 'asymmetric-offset';
  summary: string;
  essay: string[];
  technicalSpecs: string;
  images: {
    src: string;
    alt: string;
    caption: string;
    aspect: 'portrait' | 'landscape' | 'wide';
  }[];
}

export interface ArchivePhoto {
  id: string;
  plateNumber: string;
  title: string;
  series: string;
  category: Exclude<ArchiveCategory, 'All'>;
  year: string;
  location: string;
  src: string;
  alt: string;
  caption: string;
  exif: string;
  spanClass: string;
  aspectClass: string;
}

export interface CloserLookStep {
  id: string;
  stepNumber: string;
  verb: 'OBSERVE' | 'WAIT' | 'REMEMBER';
  headline: string;
  reflection: string;
  technicalNote: string;
  image: string;
  secondaryImage: string;
  alt: string;
}

export interface JournalNote {
  id: string;
  issueNumber: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  readTime: string;
  image: string;
  alt: string;
  excerpt: string;
  paragraphs: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'quiet-coast-main',
    indexNumber: 1,
    seriesTitle: 'SERIES 04 — THE QUIET COAST',
    year: '2026',
    workType: 'PERSONAL WORK',
    image: '/templates/inesvale/quiet-coast-01.webp',
    alt: 'Solitary figure in a dark rust coat standing on a misty slate-blue ocean shoreline at dusk',
    location: 'North Atlantic Littoral, 57°N',
    cameraNote: 'Hasselblad 500C/M · 80mm f/2.8 · Kodak Portra 400'
  },
  {
    id: 'serial-01-portrait',
    indexNumber: 2,
    serialCode: '01',
    seriesTitle: 'SERIES 01 — INTIMATE SHADOWS',
    year: '2026',
    workType: 'PORTRAIT STUDY',
    image: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Intimate low-key portrait of a woman in dark studio light with hand raised near her face',
    location: 'Lisbon North-Light Studio',
    cameraNote: 'Leica M6 · 50mm Summilux · Kodak Portra 800'
  },
  {
    id: 'serial-02-architecture',
    indexNumber: 3,
    serialCode: '02',
    seriesTitle: 'SERIES 02 — MONOLITH & SALT',
    year: '2025',
    workType: 'ARCHITECTURAL STUDY',
    image: '/templates/inesvale/architecture-01.webp',
    alt: 'Minimalist pale geometric coastal concrete architecture under a muted blue-gray sky',
    location: 'Algarve Chalk Coast',
    cameraNote: 'Mamiya 7II · 65mm f/4 · Fujifilm Pro 400H'
  },
  {
    id: 'serial-03-shoreline',
    indexNumber: 4,
    serialCode: '03',
    seriesTitle: 'SERIES 04 — THE QUIET COAST II',
    year: '2026',
    workType: 'PERSONAL WORK',
    image: '/templates/inesvale/quiet-coast-02.webp',
    alt: 'High-angle photograph of a curved dark wet sand beach meeting foaming slate-blue tide in fog',
    location: 'Vík Black Sand Spit',
    cameraNote: 'Hasselblad 500C/M · 150mm f/4 · Kodak Portra 400'
  },
  {
    id: 'soft-distances-main',
    indexNumber: 5,
    seriesTitle: 'SERIES 03 — SOFT DISTANCES',
    year: '2025',
    workType: 'EDITORIAL monograph',
    image: '/templates/inesvale/distance-01.webp',
    alt: 'Misty coastal headlands and sea stacks veiled in dense silver-blue marine fog',
    location: 'Faroe Islands, Late October',
    cameraNote: 'Pentax 67 · 105mm f/2.4 · Ilford Delta 400'
  },
  {
    id: 'common-silences-main',
    indexNumber: 6,
    seriesTitle: 'SERIES 05 — COMMON SILENCES',
    year: '2026',
    workType: 'STILL LIFE STUDY',
    image: '/templates/inesvale/still-life-01.webp',
    alt: 'Matte unglazed stoneware vessel resting on a warm travertine plinth in soft side window light',
    location: 'Porto Atelier, Winter Light',
    cameraNote: 'Chamonix 4x5 · 150mm Symmar · Kodak Ektar 100'
  }
];

export const CONTACT_SHEET_THUMBNAILS = [
  {
    serial: '01' as const,
    slideIndex: 1,
    label: 'SERIAL',
    image: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Serial 01 — Intimate portrait study in low-key warm light'
  },
  {
    serial: '02' as const,
    slideIndex: 2,
    label: 'SERIAL',
    image: '/templates/inesvale/architecture-01.webp',
    alt: 'Serial 02 — Minimalist pale coastal architecture'
  },
  {
    serial: '03' as const,
    slideIndex: 3,
    label: 'SERIAL',
    image: '/templates/inesvale/quiet-coast-02.webp',
    alt: 'Serial 03 — Curved dark wet shoreline disappearing into fog'
  }
];

export const SELECTED_STORIES: StoryItem[] = [
  {
    id: 'the-quiet-coast',
    number: '01',
    title: 'THE QUIET COAST',
    year: '2026',
    locationMood: 'North Atlantic · Marine Twilight & Wet Basalt',
    layoutVariant: 'wide-lead',
    summary:
      'Six weeks along the northern tide line during the winter solstice, waiting for the twenty-minute window when sea mist and dusk erase the horizon.',
    essay: [
      'Along the basalt beaches of the North Atlantic, winter light does not arrive so much as it briefly hesitates. Between three and four in the afternoon, the cloud ceiling drops until the ocean and sky share a single slate-gray density.',
      'Working exclusively on medium-format film with a tripod sunk into wet tidal sand, these frames were exposed at half-second shutter speeds. A solitary wool coat becomes the only warm anchor against miles of cold mineral water.',
      'The series asks what remains in a landscape when spectacle is stripped away—leaving only tide lines, damp air, and the quiet posture of waiting.'
    ],
    technicalSpecs: '120 Medium Format · Kodak Portra 400 pushed +1 · Natural Twilight',
    images: [
      {
        src: '/templates/inesvale/quiet-coast-01.webp',
        alt: 'Solitary figure in rust coat facing misty ocean horizon',
        caption: 'Plate I — Low tide before nightfall, 16:12 GMT.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/quiet-coast-02.webp',
        alt: 'Curved dark volcanic beach and white foam',
        caption: 'Plate IV — Receding surf along the western spit.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/quiet-coast-03.webp',
        alt: 'Wet sand reflection under dusk clouds',
        caption: 'Plate VI — Mirror film on wet tidal flats.',
        aspect: 'landscape'
      }
    ]
  },
  {
    id: 'soft-distances',
    number: '02',
    title: 'SOFT DISTANCES',
    year: '2025',
    locationMood: 'Western Headlands · Altitude, Fog & Scale',
    layoutVariant: 'paper-inset',
    summary:
      'An inquiry into human scale within immense coastal and mountain topographies where weather acts as a physical curtain.',
    essay: [
      'Distance in photography is rarely measured in meters; it is measured in atmospheric density. When sea fog rolls inland across high coastal pastures, a ridge three hundred meters away reads like a memory.',
      'In Soft Distances, figures appear only at the threshold of legibility—never posing, never claiming the frame, merely passing through geological time.',
      'Printed on warm cotton rag paper, the highlights intentionally hold the cream tone of the sheet so the mist feels continuous with the page itself.'
    ],
    technicalSpecs: 'Pentax 67 · 105mm & 165mm Lenses · Silver Gelatin & Chromogenic Prints',
    images: [
      {
        src: '/templates/inesvale/distance-01.webp',
        alt: 'Misty coastal headlands and sea stacks veiled in fog',
        caption: 'Plate II — Sea mist crossing the headland at dawn.',
        aspect: 'wide'
      },
      {
        src: '/templates/inesvale/distance-02.webp',
        alt: 'Long-exposure ocean swell between dark coastal rocks',
        caption: 'Plate V — Four-second exposure in rising tide.',
        aspect: 'landscape'
      },
      {
        src: '/templates/inesvale/distance-03.webp',
        alt: 'Distant solitary figure on a misty mountain ridge',
        caption: 'Plate VIII — Ridge walker before rain.',
        aspect: 'wide'
      }
    ]
  },
  {
    id: 'after-the-light',
    number: '03',
    title: 'AFTER THE LIGHT',
    year: '2025',
    locationMood: 'Iberian Coast · Monolithic Lime, Shadow & Salt',
    layoutVariant: 'diptych-lead',
    summary:
      'Architectural fragments and quiet domestic thresholds photographed in the final hour after direct sunlight leaves the lime-washed walls.',
    essay: [
      'Mediterranean and Atlantic architecture is habitually photographed at high noon, when shadows are razor-sharp and theatrical. Yet buildings breathe most honestly twenty minutes after sunset.',
      'During that interval, whitewashed concrete and travertine absorb the slate blue of the upper sky while holding the last residual warmth of the day in recessed doorways.',
      'Each frame in After the Light treats walls and apertures as quiet sundials recording the end of an afternoon.'
    ],
    technicalSpecs: 'Mamiya 7II · 65mm f/4 · Unfiltered Daylight & Dusk Exposures',
    images: [
      {
        src: '/templates/inesvale/architecture-01.webp',
        alt: 'Minimalist pale concrete architecture against muted sky',
        caption: 'Plate I — Upper terrace volumes facing north.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/architecture-02.webp',
        alt: 'Crisp diagonal sunlight and shadow across gridded white wall',
        caption: 'Plate III — Late equinox shadow across tiled facade.',
        aspect: 'landscape'
      },
      {
        src: '/templates/inesvale/after-light-01.webp',
        alt: 'Deep blue-hour ocean surface under pale horizon',
        caption: 'Plate VII — Sea horizon from the lower courtyard.',
        aspect: 'landscape'
      }
    ]
  },
  {
    id: 'common-silences',
    number: '04',
    title: 'COMMON SILENCES',
    year: '2026',
    locationMood: 'Porto & Lisbon · Studio Objects & Intimate Portraits',
    layoutVariant: 'asymmetric-offset',
    summary:
      'Portraits made without conversation and still lifes arranged from everyday stoneware, linen, and winter north light.',
    essay: [
      'A portrait changes character the moment the sitter stops preparing their expression for the lens. My studio sessions last three hours, though I rarely expose more than two rolls of ten frames.',
      'Between portraits, the camera turns toward the corner table: unglazed clay vessels, folded linen, a branch brought back from the estuary.',
      'Placed side by side, human gestures and inanimate objects share the same quiet gravity.'
    ],
    technicalSpecs: 'Hasselblad 500C/M & 4x5 Field Camera · North Window Illumination',
    images: [
      {
        src: '/templates/inesvale/portrait-study-01.webp',
        alt: 'Low-key portrait of woman with hand near hair in warm shadow',
        caption: 'Plate I — Clara, late November studio sitting.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/still-life-01.webp',
        alt: 'Matte cream ceramic vase on travertine stone plinth',
        caption: 'Plate IV — Stoneware vessel on travertine block.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/still-life-02.webp',
        alt: 'Handmade ceramic plates and bowls on weathered wood table',
        caption: 'Plate VI — Wheel-thrown ceramics in raking light.',
        aspect: 'landscape'
      }
    ]
  }
];

export const ARCHIVE_PHOTOS: ArchivePhoto[] = [
  {
    id: 'arch-01',
    plateNumber: 'PL. 01',
    title: 'Low Tide Watcher',
    series: 'The Quiet Coast',
    category: 'Places',
    year: '2026',
    location: 'North Atlantic',
    src: '/templates/inesvale/quiet-coast-01.webp',
    alt: 'Solitary person in a rust coat on a misty dark beach facing the sea',
    caption: 'Solitary figure in wool coat along the basalt tide line at dusk.',
    exif: '80mm · f/4 · 1/15s · Portra 400',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-02',
    plateNumber: 'PL. 02',
    title: 'Study in Chiaroscuro I',
    series: 'Common Silences',
    category: 'Portraits',
    year: '2026',
    location: 'Lisbon Studio',
    src: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Low-key studio portrait of a woman against dark charcoal shadow',
    caption: 'Unstaged pause between frames under diffused north window light.',
    exif: '50mm · f/2 · 1/60s · Portra 800',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-03',
    plateNumber: 'PL. 03',
    title: 'Cantilever & Sky',
    series: 'After the Light',
    category: 'Architecture',
    year: '2025',
    location: 'Algarve',
    src: '/templates/inesvale/architecture-01.webp',
    alt: 'Minimalist white geometric architectural volumes under pale blue-gray sky',
    caption: 'Lime-washed geometric volumes photographed twenty minutes before dusk.',
    exif: '65mm · f/8 · 1/125s · Pro 400H',
    spanClass: 'md:col-span-3',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-04',
    plateNumber: 'PL. 04',
    title: 'Headland Fog Curtain',
    series: 'Soft Distances',
    category: 'Places',
    year: '2025',
    location: 'Faroe Islands',
    src: '/templates/inesvale/distance-01.webp',
    alt: 'Misty coastal headlands and sea stacks veiled in fog',
    caption: 'Advancing marine layer erasing the western sea stacks.',
    exif: '105mm · f/5.6 · 1/30s · Delta 400',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]'
  },
  {
    id: 'arch-05',
    plateNumber: 'PL. 05',
    title: 'Travertine & Vessel',
    series: 'Common Silences',
    category: 'Details',
    year: '2026',
    location: 'Porto Atelier',
    src: '/templates/inesvale/still-life-01.webp',
    alt: 'Matte stoneware vase resting on a travertine plinth',
    caption: 'Unglazed stoneware vessel and botanical branch on cut travertine.',
    exif: '150mm · f/16 · 1/4s · Ektar 100',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-06',
    plateNumber: 'PL. 06',
    title: 'Equinox Facade Shadow',
    series: 'After the Light',
    category: 'Architecture',
    year: '2025',
    location: 'Porto',
    src: '/templates/inesvale/architecture-02.webp',
    alt: 'Diagonal patch of sunlight on a minimalist gridded white wall',
    caption: 'Forty-minute trapezoidal light projection across interior courtyard tile.',
    exif: '65mm · f/11 · 1/250s · Portra 160',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/3]'
  },
  {
    id: 'arch-07',
    plateNumber: 'PL. 07',
    title: 'Black Sand Littoral',
    series: 'The Quiet Coast',
    category: 'Places',
    year: '2026',
    location: 'Vík Shoreline',
    src: '/templates/inesvale/quiet-coast-02.webp',
    alt: 'Elevated view of curved dark beach and foaming slate-blue tide',
    caption: 'Tidal arc seen from the basalt bluff during incoming mist.',
    exif: '150mm · f/5.6 · 1/60s · Portra 400',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-08',
    plateNumber: 'PL. 08',
    title: 'Helena in Dusk Light',
    series: 'Common Silences',
    category: 'Portraits',
    year: '2025',
    location: 'Madrid',
    src: '/templates/inesvale/portrait-study-02.webp',
    alt: 'Close-up editorial portrait of a dark-haired woman against warm terracotta backdrop',
    caption: 'Late afternoon sitting on medium format, natural courtyard bounce.',
    exif: '110mm · f/2.8 · 1/60s · Portra 400',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-09',
    plateNumber: 'PL. 09',
    title: 'Stoneware Stack',
    series: 'Common Silences',
    category: 'Details',
    year: '2026',
    location: 'Alentejo Kiln',
    src: '/templates/inesvale/still-life-02.webp',
    alt: 'Handmade ceramic plates and bowls on rustic wooden table',
    caption: 'Mineral-glazed stoneware cooled after wood-kiln firing.',
    exif: '80mm · f/5.6 · 1/30s · Portra 400',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]'
  },
  {
    id: 'arch-10',
    plateNumber: 'PL. 10',
    title: 'Pleated Concrete Fold',
    series: 'After the Light',
    category: 'Architecture',
    year: '2025',
    location: 'Sines Coast',
    src: '/templates/inesvale/architecture-03.webp',
    alt: 'Abstract close-up of pale architectural pleats and soft tonal shadows',
    caption: 'Vertical concrete fluting under overcast winter sky.',
    exif: '90mm · f/11 · 1/60s · Pro 400H',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-11',
    plateNumber: 'PL. 11',
    title: 'Four-Second Swell',
    series: 'Soft Distances',
    category: 'Places',
    year: '2025',
    location: 'Basque Coast',
    src: '/templates/inesvale/distance-02.webp',
    alt: 'Long exposure ocean mist swirling around dark sea stacks',
    caption: 'Tidal channel photographed with a neutral-density glass filter at dusk.',
    exif: '80mm · f/16 · 4.0s · Delta 100',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/10]'
  },
  {
    id: 'arch-12',
    plateNumber: 'PL. 12',
    title: 'Ridge Figure at First Rain',
    series: 'Soft Distances',
    category: 'Places',
    year: '2025',
    location: 'Picos de Europa',
    src: '/templates/inesvale/distance-03.webp',
    alt: 'Tiny solitary person standing on a craggy mountain ridge in mist',
    caption: 'Solitary figure on limestone crest as low cloud fills the valley.',
    exif: '105mm · f/8 · 1/125s · Portra 400',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/10]'
  },
  {
    id: 'arch-13',
    plateNumber: 'PL. 13',
    title: 'Self-Timer in North Light',
    series: 'Studio Archive',
    category: 'Portraits',
    year: '2026',
    location: 'Lisbon',
    src: '/templates/inesvale/artist-portrait.webp',
    alt: 'Editorial portrait of Ines Vale in soft natural daylight',
    caption: 'Test frame from the winter monograph proof session.',
    exif: '80mm · f/2.8 · 1/60s · Portra 400',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-14',
    plateNumber: 'PL. 14',
    title: 'Quiet Room with Dried Grass',
    series: 'Common Silences',
    category: 'Details',
    year: '2025',
    location: 'Comporta',
    src: '/templates/inesvale/still-life-03.webp',
    alt: 'Minimalist interior corner with dried coastal grass and afternoon light',
    caption: 'Afternoon silence inside a lime-plastered writer’s cabin.',
    exif: '50mm · f/5.6 · 1/30s · Portra 160',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]'
  },
  {
    id: 'arch-15',
    plateNumber: 'PL. 15',
    title: 'Tidal Mirror at Last Light',
    series: 'The Quiet Coast',
    category: 'Places',
    year: '2026',
    location: 'Ovar Littoral',
    src: '/templates/inesvale/quiet-coast-03.webp',
    alt: 'Shallow wet sand reflecting twilight clouds along a quiet beach',
    caption: 'Thin sheet of receding tide holding the warm amber remnant of sunset.',
    exif: '80mm · f/5.6 · 1/15s · Portra 400',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]'
  }
];

export const CLOSER_LOOK_STEPS: CloserLookStep[] = [
  {
    id: 'step-observe',
    stepNumber: '01 / 03',
    verb: 'OBSERVE',
    headline: 'Before raising the viewfinder, read the weight of the air.',
    reflection:
      'Every place carries an acoustic and tonal signature before a lens is ever uncapped. I spend the first hour on location without exposing a frame—watching how mist settles against dark stone and where the eye naturally rests when nothing demands attention.',
    technicalNote: 'Incident meter reading · Uncoated 80mm glass · Patience before composition',
    image: '/templates/inesvale/quiet-coast-01.webp',
    secondaryImage: '/templates/inesvale/architecture-02.webp',
    alt: 'Solitary figure on misty shoreline under vast overcast sky'
  },
  {
    id: 'step-wait',
    stepNumber: '02 / 03',
    verb: 'WAIT',
    headline: 'Stillness arrives only after the obvious moment has passed.',
    reflection:
      'The decisive moment in editorial and landscape work is rarely a sudden action; it is the quiet exhale after movement subsides. When wind drops for three seconds or a sitter forgets the camera is present, the frame aligns.',
    technicalNote: 'Cable release · 1/4s to 4s shutter durations · Medium-format 6x6 negative',
    image: '/templates/inesvale/distance-02.webp',
    secondaryImage: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Long exposure ocean mist swirling gently between dark coastal rocks'
  },
  {
    id: 'step-remember',
    stepNumber: '03 / 03',
    verb: 'REMEMBER',
    headline: 'A photograph is not a document of a place, but how it felt to stand there.',
    reflection:
      'In the darkroom and colour-grading suite, highlights are softened toward warm photographic paper while shadows retain mineral depth. The final print should feel like an half-remembered evening you have carried for years.',
    technicalNote: '310gsm Warm Cotton Rag · Hand-trimmed borders · Archival pigment & silver prints',
    image: '/templates/inesvale/quiet-coast-03.webp',
    secondaryImage: '/templates/inesvale/still-life-01.webp',
    alt: 'Wet tidal sand reflecting warm twilight clouds'
  }
];

export const JOURNAL_NOTES: JournalNote[] = [
  {
    id: 'note-winter-tides',
    issueNumber: 'NOTE NO. 14',
    title: 'On Metering for Fog and Wet Basalt',
    subtitle: 'Field notes from six weeks along the 57th parallel',
    date: 'October 2026',
    location: 'North Atlantic',
    readTime: '4 min read',
    image: '/templates/inesvale/quiet-coast-02.webp',
    alt: 'Curved dark volcanic shoreline meeting misty ocean tide',
    excerpt:
      'Why reflected-light meters misread sea mist, and how placing dark wet sand on Zone III preserves the quiet weight of overcast twilight.',
    paragraphs: [
      'When you point an internal camera meter at a wall of coastal fog, the instrument assumes the world is middle gray and underexposes by nearly two stops. The resulting negative turns luminous mist into muddy ash.',
      'Throughout the making of The Quiet Coast, I relied exclusively on an old selenium incident meter held toward the camera position, overexposing Portra 400 by two-thirds of a stop and pulling development slightly in the bath.',
      'That small calibration allows the wet volcanic sand to hold rich charcoal detail while the upper sky breathes like damp cotton paper.'
    ]
  },
  {
    id: 'note-north-window',
    issueNumber: 'NOTE NO. 13',
    title: 'The Architecture of a Three-Hour Sitting',
    subtitle: 'Why silence in the studio matters more than direction',
    date: 'August 2026',
    location: 'Lisbon Studio',
    readTime: '5 min read',
    image: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Intimate low-key portrait in studio window light',
    excerpt:
      'Most portrait subjects arrive carrying a practiced mask. It takes ninety minutes of unhurried quiet for the shoulders to drop by half an inch.',
    paragraphs: [
      'In commercial photography, speed is treated as a virtue: forty frames a minute under strobe banks. Yet the human face under strobe light almost always registers a subtle defensive tension.',
      'In my Lisbon room, there is only one north-facing casement window and a heavy wool curtain to control falloff. We drink tea, listen to rain in the courtyard, and let the medium-format waist-level finder sit at chest height so I never hide behind a black camera body.',
      'The frame that survives into the archive is almost always exposed while the sitter believes we are pausing between takes.'
    ]
  },
  {
    id: 'note-lime-and-shadow',
    issueNumber: 'NOTE NO. 12',
    title: 'Lime Plaster as a Slow Photographic Emulsion',
    subtitle: 'Observing southern walls after sunset',
    date: 'May 2026',
    location: 'Algarve & Porto',
    readTime: '3 min read',
    image: '/templates/inesvale/architecture-02.webp',
    alt: 'Geometric white wall with diagonal natural shadow',
    excerpt:
      'Traditional lime-washed walls weather with salt air and rain, recording seasons with the same fidelity as silver gelatin paper.',
    paragraphs: [
      'Modern elastomeric paint seals a building in plastic; it looks identical in January and August until it peels. Lime wash, by contrast, is porous and mineral.',
      'When coastal humidity rises at dusk, lime plaster darkens subtly in tone, drinking in the ambient slate blue of the Atlantic sky. Photographing these surfaces requires treating the wall not as a geometric diagram, but as skin.'
    ]
  },
  {
    id: 'note-paper-permanence',
    issueNumber: 'NOTE NO. 11',
    title: 'Why Every Series Begins as a Sequenced Dummy Book',
    subtitle: 'Pacing, blank pages, and the weight of uncoated stock',
    date: 'February 2026',
    location: 'Porto Bindery',
    readTime: '4 min read',
    image: '/templates/inesvale/still-life-01.webp',
    alt: 'Ceramic vessel on travertine stone in quiet studio light',
    excerpt:
      'A single photograph is a chord; a sequence across folded signatures of warm paper is where rhythm and memory actually live.',
    paragraphs: [
      'Long before an exhibition is hung or a digital gallery is published, I print small 10×12cm work proofs and tape them into hand-sewn signatures of 120gsm ivory paper.',
      'Living with a physical dummy book on the studio table reveals immediately when two images are shouting over each other, or where a blank left-hand page is required so a quiet seascape can land with full emotional weight.'
    ]
  }
];

export const ARTIST_CREDITS = {
  note: 'Illustrative fictional portfolio credits curated for Ines Vale',
  exhibitions: [
    { year: '2026', title: 'The Quiet Coast (Solo Monograph Exhibition)', venue: 'Galeria da Calçada, Lisbon' },
    { year: '2025', title: 'Soft Distances & Other Silences', venue: 'Atelier Nordisk, Copenhagen' },
    { year: '2024', title: 'New Iberian Topography (Group)', venue: 'Fundación Piedra & Luz, Madrid' },
    { year: '2023', title: 'After the Light: Architectural Studies', venue: 'Fondazione Forma, Milan' }
  ],
  publications: [
    { year: '2026', title: 'The Quiet Coast — Hardcover Cloth Monograph (96 plates)', publisher: 'Vale & Quarto Press' },
    { year: '2025', title: 'Cahier No. 08: Atlantic Littoral', publisher: 'Éditions du Brume, Paris' },
    { year: '2024', title: 'Stillness in Medium Format', publisher: 'Koto Architectural Annual' }
  ]
};
