export type GenreId =
  | 'shoegaze'
  | 'post-punk'
  | 'indie rock'
  | 'dream pop'
  | 'darkwave'
  | 'emo'
  | 'alt folk';

export type HabitId =
  | 'night drives'
  | 'live gigs'
  | 'vinyl'
  | 'late-night headphones';

export interface TasteProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  pronouns: string;
  tagline: string;
  genres: GenreId[];
  habits: HabitId[];
  topArtists: string[];
  recentTrack: {
    title: string;
    artist: string;
    album: string;
    year: string;
    note: string;
  };
  sharedTrackOptions: {
    id: string;
    title: string;
    artist: string;
    prompt: string;
    context: string;
  }[];
}

export interface OverlapResult {
  percentage: number;
  sharedGenres: GenreId[];
  sharedHabits: HabitId[];
  jaccardGenres: number;
  jaccardHabits: number;
  formulaSummary: string;
  sharedScenes: string[];
  couldTalkAbout: string[];
  introPrompt: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  subtitle: string;
  mood: 'shoegaze' | 'post-punk' | 'late-night' | 'live-basement';
  moodLabel: string;
  curator: string;
  duration: string;
  trackCount: number;
  rotationDeg: number;
  artVariant: 'crimson-horizon' | 'static-guitar' | 'tube-amp' | 'basement-flyer' | 'tape-reel' | 'rain-window';
  sleeveAsset: string;
  gatefoldAsset: string | null;
  context: string;
  conversationQuestion: string;
  tracks: { number: string; title: string; artist: string; length: string }[];
}

export const ALL_GENRES: { id: GenreId; label: string; subnote: string }[] = [
  { id: 'shoegaze', label: 'Shoegaze', subnote: 'Wall-of-sound fuzz & reverb pedals' },
  { id: 'post-punk', label: 'Post-Punk', subnote: 'Driving basslines & angular guitars' },
  { id: 'indie rock', label: 'Indie Rock', subnote: 'Basement amps & ragged hooks' },
  { id: 'dream pop', label: 'Dream Pop', subnote: 'Shimmering keys & nocturnal haze' },
  { id: 'darkwave', label: 'Darkwave', subnote: 'Cold synths & cathedral echo' },
  { id: 'emo', label: 'Midwest / 90s Emo', subnote: 'Open tunings & cathartic bridges' },
  { id: 'alt folk', label: 'Alt Folk', subnote: 'Tape hiss, fingerpicking & lyricism' },
];

export const ALL_HABITS: { id: HabitId; label: string; detail: string }[] = [
  { id: 'night drives', label: 'Night drives', detail: 'Windows cracked on empty highways after 11 PM' },
  { id: 'live gigs', label: 'Live gigs', detail: '200-cap rooms, ear plugs in pocket, near the soundboard' },
  { id: 'vinyl', label: 'Vinyl crate digging', detail: 'Flipping through dusty 7-inch bins on Sunday afternoons' },
  { id: 'late-night headphones', label: 'Late-night headphones', detail: 'Full-album listens in the dark with no skips' },
];

export const SAMPLE_PROFILES: TasteProfile[] = [
  {
    id: 'mila',
    name: 'Mila',
    age: 24,
    city: 'East London',
    pronouns: 'she/her',
    tagline: 'Always by the left speaker stack. Will judge a café by its afternoon playlist.',
    genres: ['shoegaze', 'post-punk', 'indie rock', 'alt folk'],
    habits: ['night drives', 'live gigs', 'late-night headphones'],
    topArtists: ['Fontaines D.C.', 'Wet Leg', 'Phoebe Bridgers'],
    recentTrack: {
      title: 'Kyoto',
      artist: 'Phoebe Bridgers',
      album: 'Punisher',
      year: '2020',
      note: 'Played 4 times walking back from the Lexington in the rain.',
    },
    sharedTrackOptions: [
      {
        id: 'punisher',
        title: 'Kyoto / Punisher',
        artist: 'Phoebe Bridgers',
        prompt: 'Ask them about "Punisher"',
        context: 'You both queued side B after midnight three times this week.',
      },
      {
        id: 'starburster',
        title: 'Starburster',
        artist: 'Fontaines D.C.',
        prompt: 'Ask where they first heard Fontaines D.C. live',
        context: 'Top 1% overlap on Dublin & South London post-punk releases.',
      },
      {
        id: 'chaise',
        title: 'Chaise Longue',
        artist: 'Wet Leg',
        prompt: 'Ask which festival encore nearly blew their eardrums',
        context: 'Both saved to "loud walk to the train" playlists.',
      },
    ],
  },
  {
    id: 'julian',
    name: 'Julian',
    age: 26,
    city: 'Glasgow',
    pronouns: 'he/him',
    tagline: 'Repairs vintage cassette decks and never misses an opening band.',
    genres: ['shoegaze', 'dream pop', 'darkwave', 'post-punk'],
    habits: ['vinyl', 'live gigs', 'late-night headphones'],
    topArtists: ['Slowdive', 'The Cure', 'DIIV'],
    recentTrack: {
      title: 'When the Sun Hits',
      artist: 'Slowdive',
      album: 'Souvlaki',
      year: '1993',
      note: 'First record I ever bought on 180g vinyl.',
    },
    sharedTrackOptions: [
      {
        id: 'souvlaki',
        title: 'Souvlaki Space Station',
        artist: 'Slowdive',
        prompt: 'Ask about their favorite delay pedal setting',
        context: 'Both listen to heavy reverb records between 11 PM and 2 AM.',
      },
    ],
  },
  {
    id: 'sora',
    name: 'Sora',
    age: 23,
    city: 'Chicago',
    pronouns: 'they/them',
    tagline: 'Collects risograph show flyers and cries to horn arrangements in midwest emo.',
    genres: ['emo', 'indie rock', 'alt folk', 'shoegaze'],
    habits: ['night drives', 'live gigs', 'vinyl'],
    topArtists: ['American Football', 'Wednesday', 'Alvvays'],
    recentTrack: {
      title: 'Bull Believer',
      artist: 'Wednesday',
      album: 'Rat Saw God',
      year: '2023',
      note: 'Nothing beats pedal steel through a cranked tube amp.',
    },
    sharedTrackOptions: [
      {
        id: 'ratsaw',
        title: 'Chosen to Deserve',
        artist: 'Wednesday',
        prompt: 'Ask which local venue has the best floor acoustics',
        context: 'Shared affinity for fuzz-pedal storytelling and DIY basements.',
      },
    ],
  },
  {
    id: 'deon',
    name: 'Deon',
    age: 28,
    city: 'Berlin / Detroit',
    pronouns: 'he/they',
    tagline: 'Synth basslines, cold drizzle, and B-sides that run over seven minutes.',
    genres: ['darkwave', 'post-punk', 'dream pop'],
    habits: ['night drives', 'vinyl', 'late-night headphones'],
    topArtists: ['Boy Harsher', 'Molchat Doma', 'Cocteau Twins'],
    recentTrack: {
      title: 'Pain',
      artist: 'Boy Harsher',
      album: 'Lesser Man EP',
      year: '2014',
      note: 'Strictly for 2 A.M. autobahn stretches.',
    },
    sharedTrackOptions: [
      {
        id: 'lesserman',
        title: 'Pain (Extended Cut)',
        artist: 'Boy Harsher',
        prompt: 'Ask what record stays permanently on their turntable',
        context: 'Overlapping nocturnal synth and chorus-bass rotation.',
      },
    ],
  },
];

export const SCENE_PLAYLISTS: PlaylistItem[] = [
  {
    id: 'midnight-static',
    title: 'Midnight Static',
    subtitle: 'Fuzz pedals, sodium streetlights, and 3 A.M. train platforms.',
    mood: 'shoegaze',
    moodLabel: 'Shoegaze / Reverb',
    curator: 'Curated by Mila & 14 East London night owls',
    duration: '48 min',
    trackCount: 11,
    rotationDeg: -1.8,
    artVariant: 'crimson-horizon',
    sleeveAsset: '/assets/riff/sleeves/riff-sc-01-midnight-static.webp',
    gatefoldAsset: '/assets/riff/gatefolds/riff-sc-open-01-midnight-static.webp',
    context:
      'Built for walking home after your ears are still ringing from the encore. Heavy glide guitar and buried vocals.',
    conversationQuestion: 'Which song on here sounds most like your walk home after a gig?',
    tracks: [
      { number: '01', title: 'Glass Platform (Demo)', artist: 'Velvet Escalator', length: '4:12' },
      { number: '02', title: 'Sodium Vapor', artist: 'Pavement Choir', length: '3:54' },
      { number: '03', title: 'Tremolo Letter', artist: 'Siren & the Static', length: '5:08' },
      { number: '04', title: 'Last Overground North', artist: 'Deptford Dept.', length: '4:31' },
    ],
  },
  {
    id: 'after-the-encore',
    title: 'After the Encore',
    subtitle: 'Wire-taut post-punk basslines for sticky floors and cold night air.',
    mood: 'post-punk',
    moodLabel: 'Post-Punk / Angular',
    curator: 'Curated by Julian & Glasgow Sub-Basement',
    duration: '39 min',
    trackCount: 10,
    rotationDeg: 1.5,
    artVariant: 'static-guitar',
    sleeveAsset: '/assets/riff/sleeves/riff-sc-02-after-the-encore.webp',
    gatefoldAsset: '/assets/riff/gatefolds/riff-sc-open-02-after-the-encore.webp',
    context:
      'When the house lights come up too fast and nobody wants to leave the pavement outside the venue.',
    conversationQuestion: 'What is the smallest room you have ever seen a life-changing set in?',
    tracks: [
      { number: '01', title: 'Check the Stamp', artist: 'Concrete Turnstile', length: '3:18' },
      { number: '02', title: 'No Coat Check', artist: 'Brutalista', length: '2:57' },
      { number: '03', title: 'Feedback at the Bar', artist: 'Kerosene Club', length: '4:05' },
      { number: '04', title: 'Taxicab Monochrome', artist: 'The Paper Wristbands', length: '3:44' },
    ],
  },
  {
    id: 'songs-to-walk-home-to',
    title: 'Songs to Walk Home To',
    subtitle: 'Tape-hiss confessions, open tunings, and headphones under a hood.',
    mood: 'late-night',
    moodLabel: 'Late-Night Indie / Folk',
    curator: 'Curated by Riff Editorial Zine #04',
    duration: '52 min',
    trackCount: 13,
    rotationDeg: -1.2,
    artVariant: 'rain-window',
    sleeveAsset: '/assets/riff/sleeves/riff-sc-03-songs-to-walk-home-to.webp',
    gatefoldAsset: '/assets/riff/gatefolds/riff-sc-open-03-songs-to-walk-home-to.webp',
    context:
      'Intimate four-track recordings and sparse piano endings where you can hear the room tone and creaking floorboards.',
    conversationQuestion: 'Do you listen to lyrics first, or the chord changes underneath?',
    tracks: [
      { number: '01', title: 'Radiator Hum in B-Flat', artist: 'Clara Vance', length: '3:49' },
      { number: '02', title: 'Corner Bodega Tulips', artist: 'Half-Lit Windows', length: '4:15' },
      { number: '03', title: 'Voicemail from October', artist: 'Pine & Mercury', length: '3:22' },
      { number: '04', title: 'Spare Key under the Mat', artist: 'Orchard Static', length: '4:50' },
    ],
  },
  {
    id: 'basement-show-memories',
    title: 'Basement Show Memories',
    subtitle: 'Photocopied flyers, blown fuses, and shouting the bridge together.',
    mood: 'live-basement',
    moodLabel: 'Live Basement / Emo',
    curator: 'Curated by Sora & Midwest DIY Tape Exchange',
    duration: '44 min',
    trackCount: 12,
    rotationDeg: 2.1,
    artVariant: 'basement-flyer',
    sleeveAsset: '/assets/riff/sleeves/riff-sc-04-basement-show-memories.webp',
    gatefoldAsset: '/assets/riff/gatefolds/riff-sc-open-04-basement-show-memories.webp',
    context:
      'Sweaty brick walls, a drum kit held together with gaffer tape, and thirty people who know every word.',
    conversationQuestion: 'Have you ever kept a paper ticket stub or gig flyer in your wallet for years?',
    tracks: [
      { number: '01', title: 'Gaffer Tape Snare', artist: 'Cinderblock Porch', length: '2:48' },
      { number: '02', title: 'Five Dollars at the Door', artist: 'Lake Effect Snow', length: '3:36' },
      { number: '03', title: 'Borrowed Jazzmaster', artist: 'Torn Setlist', length: '4:19' },
      { number: '04', title: 'Everyone Load Out', artist: 'The Late Van', length: '3:58' },
    ],
  },
  {
    id: 'cathode-ray-lullabies',
    title: 'Cathode Ray Lullabies',
    subtitle: 'Analog drum machines, chorus-drenched bass, and midnight highways.',
    mood: 'late-night',
    moodLabel: 'Darkwave / Nocturnal',
    curator: 'Curated by Deon & Night Shift Radio',
    duration: '56 min',
    trackCount: 11,
    rotationDeg: -2.0,
    artVariant: 'tube-amp',
    sleeveAsset: '/assets/riff/sleeves/riff-sc-05-cathode-ray-lullabies.webp',
    gatefoldAsset: null,
    context:
      'Hypnotic 118 BPM pulse for empty ring roads, rain streaks on windshields, and 24-hour diners.',
    conversationQuestion: 'What is your ultimate 1 A.M. driving album from start to finish?',
    tracks: [
      { number: '01', title: 'Fluorescent Exit', artist: 'Mirror Bahnhof', length: '5:14' },
      { number: '02', title: 'Cold Solder Joint', artist: 'Tape Oxide', length: '4:42' },
      { number: '03', title: 'Red Dash Light', artist: 'Autobahn Ghosts', length: '4:29' },
      { number: '04', title: 'Last Ferry Radar', artist: 'Subzero Chorus', length: '5:33' },
    ],
  },
  {
    id: 'rain-on-the-amp-case',
    title: 'Rain on the Amp Case',
    subtitle: 'Twelve-string jangle meeting Marshall stack distortion.',
    mood: 'shoegaze',
    moodLabel: 'Shoegaze / Dream Pop',
    curator: 'Curated by Riff Pressing Plant Club',
    duration: '46 min',
    trackCount: 10,
    rotationDeg: 1.4,
    artVariant: 'tape-reel',
    sleeveAsset: '/assets/riff/sleeves/riff-sc-06-rain-on-the-amp-case.webp',
    gatefoldAsset: null,
    context:
      'Where sweet vocal harmonies dissolve into a warm ocean of reverse reverb and fuzz.',
    conversationQuestion: 'Which band would you travel to another city just to catch on a Tuesday night?',
    tracks: [
      { number: '01', title: 'Reverse Cathedral', artist: 'Pale Filament', length: '4:20' },
      { number: '02', title: 'Velvet Capo', artist: 'Sundown Tremolo', length: '3:55' },
      { number: '03', title: 'Fuzz Pedal Lullaby', artist: 'Starling Engine', length: '5:02' },
      { number: '04', title: 'Runout Groove Loop', artist: 'Mono Pressing', length: '4:47' },
    ],
  },
];

/**
 * Deterministic Jaccard + ritual overlap calculation for the Riff Taste Matcher demo.
 * Explicitly documented as an illustrative front-end overlap formula, not romance science.
 */
export function calculateTasteOverlap(
  userGenres: GenreId[],
  userHabits: HabitId[],
  partner: TasteProfile
): OverlapResult {
  const uniqueUserGenres = Array.from(new Set(userGenres));
  const uniqueUserHabits = Array.from(new Set(userHabits));

  if (uniqueUserGenres.length === 0 && uniqueUserHabits.length === 0) {
    return {
      percentage: 0,
      sharedGenres: [],
      sharedHabits: [],
      jaccardGenres: 0,
      jaccardHabits: 0,
      formulaSummary: 'Select at least one genre or listening ritual to compute demo taste overlap.',
      sharedScenes: [],
      couldTalkAbout: ['Pick a few genres or listening rituals on the left to see where your crates overlap.'],
      introPrompt: 'Pick a genre chip to generate a song-first conversation starter.',
    };
  }

  const sharedGenres = uniqueUserGenres.filter((g) => partner.genres.includes(g));
  const unionGenres = new Set([...uniqueUserGenres, ...partner.genres]);
  const jaccardGenres = unionGenres.size > 0 ? sharedGenres.length / unionGenres.size : 0;

  const sharedHabits = uniqueUserHabits.filter((h) => partner.habits.includes(h));
  const unionHabits = new Set([...uniqueUserHabits, ...partner.habits]);
  const jaccardHabits = unionHabits.size > 0 ? sharedHabits.length / unionHabits.size : 0;

  // Weighted demo score: 22% baseline + up to 48% from shared genres + up to 28% from shared habits
  const genreDirectRatio =
    partner.genres.length > 0 ? sharedGenres.length / partner.genres.length : 0;
  const habitDirectRatio =
    partner.habits.length > 0 ? sharedHabits.length / partner.habits.length : 0;

  const rawScore =
    sharedGenres.length === 0 && sharedHabits.length === 0
      ? 18
      : Math.round(
          24 +
            (jaccardGenres * 0.45 + genreDirectRatio * 0.55) * 46 +
            (jaccardHabits * 0.45 + habitDirectRatio * 0.55) * 27
        );

  const percentage = Math.max(12, Math.min(98, rawScore));

  const sharedScenes: string[] = [
    ...sharedGenres.map((g) => {
      const found = ALL_GENRES.find((item) => item.id === g);
      return found ? found.label : g;
    }),
    ...sharedHabits.map((h) => {
      const found = ALL_HABITS.find((item) => item.id === h);
      return found ? found.label : h;
    }),
  ];

  const couldTalkAbout: string[] = [];
  if (sharedGenres.includes('shoegaze') || sharedGenres.includes('dream pop')) {
    couldTalkAbout.push(`Pedalboards, reverse reverb, and ${partner.topArtists[0]}'s guitar tone`);
  }
  if (sharedGenres.includes('post-punk') || sharedGenres.includes('indie rock')) {
    couldTalkAbout.push(`200-cap basement venues and ${partner.topArtists[0]} live bootlegs`);
  }
  if (sharedGenres.includes('alt folk') || sharedGenres.includes('emo')) {
    couldTalkAbout.push(`Track-by-track lyricism on "${partner.recentTrack.album}" (${partner.recentTrack.year})`);
  }
  if (sharedGenres.includes('darkwave')) {
    couldTalkAbout.push(`Analog synth basslines and 2 A.M. post-gig night buses`);
  }
  if (sharedHabits.includes('vinyl')) {
    couldTalkAbout.push('Sunday afternoon 7-inch crate digging and B-side pressings');
  }
  if (sharedHabits.includes('live gigs')) {
    couldTalkAbout.push('Standing near the soundboard vs. the front barrier at loud shows');
  }
  if (sharedHabits.includes('night drives') || sharedHabits.includes('late-night headphones')) {
    couldTalkAbout.push(`Uninterrupted late-night listens to "${partner.recentTrack.title}"`);
  }

  if (couldTalkAbout.length === 0) {
    couldTalkAbout.push(
      `Trading gateway records: your ${uniqueUserGenres[0] || 'favorites'} crate vs. ${partner.name}'s ${partner.genres[0]} rotation`
    );
  }

  let introPrompt = `Ask ${partner.name} what record they put on when walking home after midnight.`;
  if (sharedGenres.length > 0 && sharedHabits.length > 0) {
    introPrompt = `"We both live on ${sharedGenres[0]} and ${sharedHabits[0]} — what is your zero-skip album right now?"`;
  } else if (sharedGenres.length > 0) {
    introPrompt = `"Saw we both overlap on ${sharedGenres.join(' + ')} — have you caught ${partner.topArtists[0]} live yet?"`;
  } else if (sharedHabits.length > 0) {
    introPrompt = `"Our genres are different, but we both swear by ${sharedHabits[0]} — trade me one track for tonight?"`;
  }

  const formulaSummary = `Demo Jaccard + ritual overlap: ${sharedGenres.length}/${unionGenres.size} genres (${Math.round(
    jaccardGenres * 100
  )}%) & ${sharedHabits.length}/${unionHabits.size} habits (${Math.round(
    jaccardHabits * 100
  )}%) with ${partner.name}. Illustrative taste math only.`;

  return {
    percentage,
    sharedGenres,
    sharedHabits,
    jaccardGenres,
    jaccardHabits,
    formulaSummary,
    sharedScenes,
    couldTalkAbout: couldTalkAbout.slice(0, 3),
    introPrompt,
  };
}

export function filterPlaylists(
  playlists: PlaylistItem[],
  moodFilter: 'all' | PlaylistItem['mood']
): PlaylistItem[] {
  if (moodFilter === 'all') {
    return playlists;
  }
  return playlists.filter((item) => item.mood === moodFilter);
}

export interface PreviewFormValidation {
  valid: boolean;
  error?: string;
  normalizedHandle?: string;
}

export function validatePreviewPass(
  handleOrName: string,
  favoriteRecord: string
): PreviewFormValidation {
  const cleanHandle = handleOrName.trim();
  const cleanRecord = favoriteRecord.trim();

  if (cleanHandle.length < 2) {
    return {
      valid: false,
      error: 'Please enter a first name or zine alias (at least 2 characters).',
    };
  }
  if (cleanRecord.length < 2) {
    return {
      valid: false,
      error: 'Name one favorite album or song to stamp your local preview pass.',
    };
  }
  return {
    valid: true,
    normalizedHandle: cleanHandle,
  };
}
