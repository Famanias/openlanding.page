export interface Award {
  stars: number;
  label: string;
  quote: string;
}

export interface PeakStats {
  success: number;
  survival: number;
  elevation: string;
  prominence: string;
  country: string;
  season: string;
  coordinates: string;
}

export interface Peak {
  id: string;
  name: string;
  titleLines: [string, string];
  eyebrow: string;
  range: string;
  rank: string;
  year: string;
  firstAscent: string;
  imageId: string;
  description: string;
  stats: PeakStats;
  awards: [Award, Award, Award];
}

const award = (stars: number, label: string, quote: string): Award => ({ stars, label, quote });

export const PEAKS: Peak[] = [
  {
    id: "mount-everest",
    name: "Mount Everest",
    titleLines: ["Mount", "Everest"],
    eyebrow: "Sagarmatha / Chomolungma 8,849m",
    range: "Mahalangur Himal",
    rank: "rank 01",
    year: "1953",
    firstAscent: "Hillary & Norgay",
    imageId: "1544735716-392fe2489ffa",
    description: "Rising above the Death Zone into the jet stream, Earth’s highest massif commands an empire of cobalt ice and blinding snow. Plumes of frozen crystal trail from its pyramid summit as winds scour its black limestone strata.",
    stats: { success: 62, survival: 96, elevation: "8,849m", prominence: "8,849m", country: "Nepal / Tibet", season: "Spring / Autumn", coordinates: "27°59'N 86°55'E" },
    awards: [award(5, "Roof of the world", "Where earth meets stratosphere"), award(5, "Khumbu icefall", "A labyrinth of shifting blue ice"), award(4, "South Col route", "The ultimate alpinist crucible")],
  },
  {
    id: "k2-godwin-austen",
    name: "K2",
    titleLines: ["Savage", "Peak K2"],
    eyebrow: "Karakoram / Chhogori 8,611m",
    range: "Baltoro Muztagh",
    rank: "rank 02",
    year: "1954",
    firstAscent: "Lacedelli & Compagnoni",
    imageId: "1464822759023-fed622ff2c3b",
    description: "Isolated deep within the Baltoro Muztagh, K2 presents three thousand vertical metres of unbroken blue ice and sheer rock on every face. With no easy ridge and violent storms that materialize without warning, it remains the mountaineer’s mountain.",
    stats: { success: 28, survival: 77, elevation: "8,611m", prominence: "4,020m", country: "Pakistan / China", season: "Summer / Winter", coordinates: "35°52'N 76°30'E" },
    awards: [award(5, "The savage mountain", "A perfect pyramid of granite and ice"), award(5, "Abruzzi Spur", "Relentless steepness from base to peak"), award(5, "The Bottleneck", "Beneath the overhanging serac")],
  },
  {
    id: "kangchenjunga",
    name: "Kangchenjunga",
    titleLines: ["Kangchen", "Junga"],
    eyebrow: "Five treasures / Himalaya 8,586m",
    range: "Kangchenjunga Himal",
    rank: "rank 03",
    year: "1955",
    firstAscent: "Brown & Band",
    imageId: "1519681393784-d120267933ba",
    description: "The easternmost of the eight-thousanders catches the full fury of the monsoon, burying its five colossal summits in deep, unstable powder. In deference to Sikkimese tradition, climbers halt below the virgin apex of snow.",
    stats: { success: 44, survival: 85, elevation: "8,586m", prominence: "3,922m", country: "Nepal / India", season: "Spring", coordinates: "27°42'N 88°08'E" },
    awards: [award(5, "Sacred summit", "Five peaks of eternal snow"), award(5, "Eastern bastion", "Guarded by avalanche and monsoon"), award(4, "Yalung face", "An immense wall of glacial frost")],
  },
  {
    id: "lhotse",
    name: "Lhotse",
    titleLines: ["Lhotse", "Massif"],
    eyebrow: "South peak / Mahalangur 8,516m",
    range: "Mahalangur Himal",
    rank: "rank 04",
    year: "1956",
    firstAscent: "Luchsinger & Reiss",
    imageId: "1454496522488-7a8e488e8606",
    description: "Linked to Everest via the windswept South Col, Lhotse boasts the most intimidating southern wall in the world, rising 3.2 kilometres in just 2.25 kilometres of horizontal distance.",
    stats: { success: 51, survival: 94, elevation: "8,516m", prominence: "610m", country: "Nepal / Tibet", season: "Spring / Autumn", coordinates: "27°57'N 86°56'E" },
    awards: [award(5, "Lhotse face", "Twelve hundred metres of blue ice"), award(5, "South wall", "Three kilometres of vertical shadow"), award(4, "Reiss couloir", "A razor cut through frozen rock")],
  },
  {
    id: "makalu",
    name: "Makalu",
    titleLines: ["Makalu", "Pyramid"],
    eyebrow: "The great black / Himal 8,485m",
    range: "Mahalangur Himal",
    rank: "rank 05",
    year: "1955",
    firstAscent: "Terray & Couzy",
    imageId: "1486870591958-9b9d0d1dda99",
    description: "Fourteen miles southeast of Everest, Makalu stands isolated as an astonishing four-sided pyramid of dark granite and sculpted snow ridges. Its knife-edge summit arête requires technical rock and ice climbing above eight thousand metres.",
    stats: { success: 48, survival: 89, elevation: "8,485m", prominence: "2,378m", country: "Nepal / Tibet", season: "Spring", coordinates: "27°53'N 87°05'E" },
    awards: [award(5, "Four-sided pyramid", "Symmetry carved by arctic winds"), award(5, "French pillar", "Sustained technical altitude"), award(4, "West pillar", "Granite prow in the clouds")],
  },
  {
    id: "cho-oyu",
    name: "Cho Oyu",
    titleLines: ["Cho Oyu", "Goddess"],
    eyebrow: "Turquoise goddess / Himal 8,188m",
    range: "Mahalangur Himal",
    rank: "rank 06",
    year: "1954",
    firstAscent: "Tichy, Jochler & Dawa",
    imageId: "1506744038136-46273834b3fb",
    description: "Named the Turquoise Goddess for the icy azure hue its snowfields cast at twilight, Cho Oyu anchors the western end of the Khumbu sub-range. Its vast summit plateau feels like another planet.",
    stats: { success: 71, survival: 98, elevation: "8,188m", prominence: "2,340m", country: "Nepal / Tibet", season: "Spring / Autumn", coordinates: "28°05'N 86°39'E" },
    awards: [award(5, "Turquoise shadow", "Glowing blue in high-altitude dusk"), award(4, "Nangpa La pass", "An ancient glacial trade corridor"), award(5, "West flank", "Endless slopes of wind-packed snow")],
  },
  {
    id: "dhaulagiri-i",
    name: "Dhaulagiri I",
    titleLines: ["Dhaula", "Giri I"],
    eyebrow: "White mountain / Himalaya 8,167m",
    range: "Dhaulagiri Himal",
    rank: "rank 07",
    year: "1960",
    firstAscent: "Diemberger & expedition",
    imageId: "1483728642387-6c3bdd6c93e5",
    description: "From the floor of the Kali Gandaki Gorge, Dhaulagiri I rockets nearly seven thousand vertical metres without interruption, the greatest abrupt relief on Earth.",
    stats: { success: 39, survival: 84, elevation: "8,167m", prominence: "3,357m", country: "Nepal", season: "Spring / Autumn", coordinates: "28°41'N 83°29'E" },
    awards: [award(5, "Dazzling white", "Seven kilometres above Kali Gandaki"), award(5, "Eiger parete", "Sweeping arcs of fluted ice"), award(4, "Northeast col", "Cradle of ferocious gales")],
  },
  {
    id: "manaslu",
    name: "Manaslu",
    titleLines: ["Manaslu", "Spirit"],
    eyebrow: "Mountain of the spirit / 8,163m",
    range: "Manasiri Himal",
    rank: "rank 08",
    year: "1956",
    firstAscent: "Imanishi & Norbu",
    imageId: "1516655855035-d5215bcb5604",
    description: "Derived from the Sanskrit word Manasa, meaning intellect or soul, Manaslu dominates the Gorkha district with long, sweeping ridges and hanging valley glaciers.",
    stats: { success: 58, survival: 91, elevation: "8,163m", prominence: "3,092m", country: "Nepal", season: "Autumn / Spring", coordinates: "28°33'N 84°33'E" },
    awards: [award(5, "Twin horns", "Soaring ridges of crystalline snow"), award(4, "Larkya glacier", "Cracking blue chasms below"), award(5, "True apex", "A cornice edge above the abyss")],
  },
  {
    id: "nanga-parbat",
    name: "Nanga Parbat",
    titleLines: ["Nanga", "Parbat"],
    eyebrow: "Diamir / king of mountains 8,125m",
    range: "Western Himalaya",
    rank: "rank 09",
    year: "1953",
    firstAscent: "Hermann Buhl (solo)",
    imageId: "1542224566-6e85f2e6772f",
    description: "Anchoring the westernmost bend of the Himalayas above the Indus River, Nanga Parbat’s Rupal Face rises 4,600 metres from base camp, the tallest mountain face on Earth.",
    stats: { success: 31, survival: 79, elevation: "8,125m", prominence: "4,608m", country: "Pakistan", season: "Summer", coordinates: "35°14'N 74°35'E" },
    awards: [award(5, "Rupal face", "Earth’s highest vertical wall"), award(5, "Buhl’s solo", "Forty-one hours without oxygen"), award(5, "Mazeno ridge", "Ten kilometres above the clouds")],
  },
  {
    id: "annapurna-i",
    name: "Annapurna I",
    titleLines: ["Anna", "Purna I"],
    eyebrow: "First 8000er climbed / 8,091m",
    range: "Annapurna Himal",
    rank: "rank 10",
    year: "1950",
    firstAscent: "Herzog & Lachenal",
    imageId: "1534447677768-be436bb09401",
    description: "In 1950, Maurice Herzog and Louis Lachenal made Annapurna I the first eight-thousand-metre peak climbed by humankind. It remains the most statistically perilous massif in the Himalayas.",
    stats: { success: 27, survival: 72, elevation: "8,091m", prominence: "2,984m", country: "Nepal", season: "Spring", coordinates: "28°35'N 83°49'E" },
    awards: [award(5, "Pioneer summit", "The first 8000m peak ever scaled"), award(5, "South sanctuary", "An amphitheatre of hanging seracs"), award(5, "North face ice", "Unforgiving avalanche corridors")],
  },
  {
    id: "gasherbrum-i",
    name: "Gasherbrum I",
    titleLines: ["Gasher", "Brum I"],
    eyebrow: "Hidden peak / Karakoram 8,080m",
    range: "Baltoro Muztagh",
    rank: "rank 11",
    year: "1958",
    firstAscent: "Schoening & Kauffman",
    imageId: "1491555103944-7c647fd857e6",
    description: "Often called Hidden Peak due to its remoteness at the head of the Baltoro Glacier, Gasherbrum I means Beautiful Mountain in Balti.",
    stats: { success: 42, survival: 91, elevation: "8,080m", prominence: "2,155m", country: "Pakistan / China", season: "Summer", coordinates: "35°43'N 76°41'E" },
    awards: [award(5, "Shining wall", "Baltoro’s most remote sanctuary"), award(4, "Japanese couloir", "Sheer ice through dark dolomite"), award(5, "Alpine style", "Clean ascent in pure solitude")],
  },
  {
    id: "broad-peak",
    name: "Broad Peak",
    titleLines: ["Broad", "Peak"],
    eyebrow: "Falchan Kangri / Karakoram 8,051m",
    range: "Baltoro Muztagh",
    rank: "rank 12",
    year: "1957",
    firstAscent: "Buhl, Diemberger, Schmuck & Wintersteller",
    imageId: "1522163182402-834f871fd851",
    description: "Named for its undulating summit ridge, Broad Peak stands across the Godwin-Austen Glacier from K2. Its first ascent was achieved without supplemental oxygen.",
    stats: { success: 53, survival: 94, elevation: "8,051m", prominence: "1,701m", country: "Pakistan / China", season: "Summer", coordinates: "35°48'N 76°34'E" },
    awards: [award(5, "Summit crest", "Over one kilometre of skyline ridge"), award(5, "Oxygenless pact", "Pioneered without bottled air"), award(4, "Godwin-Austen", "Face to face with mighty K2")],
  },
  {
    id: "gasherbrum-ii",
    name: "Gasherbrum II",
    titleLines: ["Gasher", "Brum II"],
    eyebrow: "Shining wall K4 / Karakoram 8,035m",
    range: "Baltoro Muztagh",
    rank: "rank 13",
    year: "1956",
    firstAscent: "Moravec, Larch & Willenpart",
    imageId: "1551632811-561732d1e306",
    description: "Rising above the upper Baltoro like a crystalline shark fin, Gasherbrum II is the third-highest peak in the Karakoram, a delicate arête above the clouds.",
    stats: { success: 66, survival: 97, elevation: "8,035m", prominence: "1,524m", country: "Pakistan / China", season: "Summer", coordinates: "35°45'N 76°39'E" },
    awards: [award(5, "Ice pyramid", "Chiseled geometry in deep blue"), award(5, "Banana ridge", "Curving spine of frozen snow"), award(5, "Winter triumph", "Conquered at minus forty")],
  },
  {
    id: "shishapangma",
    name: "Shishapangma",
    titleLines: ["Shisha", "Pangma"],
    eyebrow: "Crest above grassy plains / 8,027m",
    range: "Langtang Himal",
    rank: "rank 14",
    year: "1964",
    firstAscent: "Hsu Ching & expedition",
    imageId: "1508739773434-c26b3d09e071",
    description: "The only eight-thousander standing entirely within Tibet, Shishapangma was the final summit climbed due to decades of border isolation. Its southwest face is fluted snow and blue granite.",
    stats: { success: 61, survival: 92, elevation: "8,027m", prominence: "2,897m", country: "Tibet / China", season: "Spring / Autumn", coordinates: "28°21'N 85°46'E" },
    awards: [award(5, "Final 8000er", "The last crown of the fourteen"), award(5, "Tibetan plateau", "Solitary fortress of wind and ice"), award(4, "Southwest face", "Two kilometres of glacial white")],
  },
];
