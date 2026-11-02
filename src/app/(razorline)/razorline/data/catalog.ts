export interface ProductModel {
  id: string;
  code: string;
  name: string;
  colorway: string;
  tagline: string;
  price: number;
  weightGrams: number;
  dropMm: number;
  stackHeightMm: string;
  accentHex: string;
  secondaryHex: string;
  heroImage: string;
  detailImage: string;
  altText: string;
  statusLabel: string;
  description: string;
  architectureNotes: string[];
  availableSizes: number[];
}

export interface TechChapter {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  imageAlt: string;
  metricLabel: string;
  metricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  coordinates: string;
  callouts: { label: string; value: string; x: string; y: string }[];
}

export interface BreakawayFeature {
  index: string;
  title: string;
  kicker: string;
  metric: string;
  unit: string;
  description: string;
  image: string;
  imageAlt: string;
  specNote: string;
}

export interface AthleteStory {
  id: string;
  frameNumber: string;
  athleteName: string;
  discipline: string;
  location: string;
  sessionData: string;
  quote: string;
  narrative: string;
  modelUsed: string;
  image: string;
  accentColor: 'lime' | 'cobalt';
}

export interface LookbookFrame {
  id: string;
  index: string;
  title: string;
  caption: string;
  locationCode: string;
  modelName: string;
  image: string;
  secondaryImage: string;
  aspectLabel: string;
}

export const US_SHOE_SIZES: number[] = [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 13.0];

export const RL01_COLLECTION: ProductModel[] = [
  {
    id: 'rl01-voltage',
    code: 'RL-01 // VLT',
    name: 'RL-01 VOLTAGE',
    colorway: 'Carbon Black / Voltage Lime / Cobalt',
    tagline: 'Flagship asymmetric hollow-cavity road racer.',
    price: 240,
    weightGrams: 168,
    dropMm: 6,
    stackHeightMm: '38mm / 32mm',
    accentHex: '#D3FF35',
    secondaryHex: '#375CFF',
    heroImage: '/templates/razorline/rl01-voltage.png',
    detailImage: '/templates/razorline/rl01-detail-sole.png',
    altText: 'RAZORLINE RL-01 Voltage performance running shoe in three-quarter lateral profile with translucent voltage-lime hollow midsole and cobalt accents',
    statusLabel: 'Launch Edition · Fictional Demo Price',
    description:
      'Built around an exposed three-tunnel sculptural midsole that compresses and rebounds under high-cadence forefoot strikes without excess foam bulk.',
    architectureNotes: [
      'Sculpted dual-density hollow cavity midsole geometry',
      'Ripstop carbon-weave monofilament upper with cobalt tension saddle',
      '6mm offset geometry tuned for midfoot-to-forefoot transition'
    ],
    availableSizes: [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 13.0]
  },
  {
    id: 'rl01-cobalt',
    code: 'RL-01 // CBL',
    name: 'RL-01 COBALT',
    colorway: 'Obsidian / Electric Cobalt / Acid Lime',
    tagline: 'High-visibility night-track interval configuration.',
    price: 240,
    weightGrams: 168,
    dropMm: 6,
    stackHeightMm: '38mm / 32mm',
    accentHex: '#375CFF',
    secondaryHex: '#D3FF35',
    heroImage: '/templates/razorline/rl01-cobalt.png',
    detailImage: '/templates/razorline/rl01-detail-mesh.png',
    altText: 'RAZORLINE RL-01 Cobalt performance running shoe featuring an electric cobalt hollow-cavity midsole and voltage-lime eyelet lock',
    statusLabel: 'Track Series · Fictional Demo Price',
    description:
      'Engineered for high-speed cornering and wet tarmac grip. Features an electric cobalt structural chassis paired with voltage-lime lockdown eyelets.',
    architectureNotes: [
      'Reinforced lateral eyelet cage for tight radius track turns',
      'High-contrast cobalt polymer chassis with micro-siped outsole lugs',
      'Breathable zero-stretch matrix mesh across the vamp and midfoot'
    ],
    availableSizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0]
  },
  {
    id: 'rl01-shadow',
    code: 'RL-01 // SHD',
    name: 'RL-01 SHADOW',
    colorway: 'Matte Carbon / Smoked Graphite / Raw Steel',
    tagline: 'Sub-zero stealth finish for long-distance tempo blocks.',
    price: 255,
    weightGrams: 171,
    dropMm: 6,
    stackHeightMm: '38mm / 32mm',
    accentHex: '#A1A5A5',
    secondaryHex: '#D3FF35',
    heroImage: '/templates/razorline/rl01-shadow.png',
    detailImage: '/templates/razorline/rl01-detail-heel.png',
    altText: 'RAZORLINE RL-01 Shadow stealth performance running shoe in matte carbon black and smoked graphite hollow midsole',
    statusLabel: 'Blackout Run · Fictional Demo Price',
    description:
      'Stripped of high-chroma pigment for runners who prefer raw structural form. Uses a weather-treated carbon weave upper and smoked graphite cavity sole.',
    architectureNotes: [
      'Hydrophobic micro-coated carbon mesh upper for wet-weather sessions',
      'Smoked translucent elastomer sole with raw steel reflective stitch lines',
      'Extended Achilles pull-loop and molded heel counter lock'
    ],
    availableSizes: [7.5, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 12.0, 13.0]
  }
];

export const BREAKAWAY_FEATURES: BreakawayFeature[] = [
  {
    index: '01',
    title: 'Adaptive Sole Geometry',
    kicker: 'STRUCTURAL CAVITY CHASSIS',
    metric: '3-Chamber',
    unit: 'Mechanical Void Layout',
    description:
      'Instead of relying on solid blocks of soft foam that bottom out over distance, the RL-01 midsole carves three directional compression tunnels through the heel and midfoot. At footstrike, the walls flex inward and snap back as weight rolls toward the toe.',
    image: '/templates/razorline/rl01-detail-sole.png',
    imageAlt: 'Macro close-up of the RL-01 translucent lime hollow cavity midsole and sculpted compression struts',
    specNote: 'Design concept specification · Non-certified fictional architecture'
  },
  {
    index: '02',
    title: 'Engineered Matrix Mesh',
    kicker: 'CARBON-THREAD MONOFILAMENT',
    metric: '168g',
    unit: 'Target Concept Mass (US 9)',
    description:
      'Woven from non-absorbent monofilament yarns reinforced with directional ripstop ribs. The upper holds the foot flat over the footbed during sharp pace changes while shedding trapped heat through open-weave forefoot zones.',
    image: '/templates/razorline/rl01-detail-mesh.png',
    imageAlt: 'Macro close-up of the black carbon-textured monofilament mesh upper and cobalt blue support overlays',
    specNote: 'Design concept specification · Non-certified fictional architecture'
  },
  {
    index: '03',
    title: 'Precise Heel Support',
    kicker: 'CANTILEVERED ACHILLES CRADLE',
    metric: '6.0mm',
    unit: 'Heel-to-Toe Geometry Offset',
    description:
      'An external carbon-patterned heel wrap pairs with a flared rear sole lip to stabilize high-velocity landings. The sculpted collar flares away from the Achilles tendon to eliminate friction while locking the calcaneus in place.',
    image: '/templates/razorline/rl01-detail-heel.png',
    imageAlt: 'Macro close-up of the RL-01 rear heel counter, pull tab, and cantilevered lime midsole bulb',
    specNote: 'Design concept specification · Non-certified fictional architecture'
  }
];

export const TECH_CHAPTERS: TechChapter[] = [
  {
    id: 'chapter-sole',
    index: '01',
    title: 'HOLLOW-CORE AERO MIDSOLE',
    subtitle: 'Directional Void Compression & Propulsion',
    summary:
      'Traditional marathon foams trade stability for softness. The RL-01 replaces solid foam mass with three tuned geometric chambers that deform along a 14-degree forward vector, storing mechanical energy on impact and releasing it through toe-off.',
    image: '/templates/razorline/rl01-detail-sole.png',
    imageAlt: 'Detailed view of the translucent voltage-lime hollow midsole cavities',
    metricLabel: 'STACK GEOMETRY',
    metricValue: '38mm / 32mm',
    secondaryMetricLabel: 'CHAMBER WALL',
    secondaryMetricValue: '4.2mm Elastomer',
    coordinates: 'SEC // MIDSOLE-01 · LAT 45.10',
    callouts: [
      { label: 'REAR IMPACT VOID', value: '18mm Vertical Travel', x: '24%', y: '52%' },
      { label: 'MIDFOOT BRIDGE', value: 'Torsion Ribbing', x: '58%', y: '68%' },
      { label: 'FOREFOOT FLARE', value: '6mm Offset Roll', x: '82%', y: '78%' }
    ]
  },
  {
    id: 'chapter-mesh',
    index: '02',
    title: 'MATRIX MONOFILAMENT UPPER',
    subtitle: 'Zero-Stretch Lockdown & Thermal Venting',
    summary:
      'A dual-layer grid blends hydrophobic carbon-look ripstop across the heel and saddle with an ultra-open micro-mesh over the metatarsals. Cobalt TPU eyelet wings distribute lace tension evenly across the instep without pressure points.',
    image: '/templates/razorline/rl01-detail-mesh.png',
    imageAlt: 'Detailed view of the black carbon-weave mesh upper and cobalt-blue eyelet reinforcements',
    metricLabel: 'UPPER WEAVE',
    metricValue: '0.45mm Grid',
    secondaryMetricLabel: 'TENSION SADDLE',
    secondaryMetricValue: 'Dual Cobalt TPU',
    coordinates: 'SEC // UPPER-02 · LAT 45.10',
    callouts: [
      { label: 'COBALT EYELET STAY', value: 'Multi-Vector Lock', x: '46%', y: '28%' },
      { label: 'LATERAL SADDLE', value: 'Double-Stitched Seam', x: '42%', y: '56%' },
      { label: 'VAMP VENT ZONE', value: 'High-Airflow Weave', x: '76%', y: '64%' }
    ]
  },
  {
    id: 'chapter-heel',
    index: '03',
    title: 'TORSION-LOCK HEEL CRADLE',
    subtitle: 'Rearfoot Centering & Outsole Bite',
    summary:
      'The rear quarter combines a rigid woven heel cup with an extended bevelled midsole tail. Under the forefoot and heel strike zones, a high-durometer cobalt rubber outsole provides biting traction on wet asphalt and synthetic track surfaces.',
    image: '/templates/razorline/rl01-detail-heel.png',
    imageAlt: 'Detailed view of the sculpted heel counter and rear midsole geometry',
    metricLabel: 'HEEL LOCK',
    metricValue: '360° Cradle',
    secondaryMetricLabel: 'OUTSOLE COMPOUND',
    secondaryMetricValue: 'Cobalt Grip-70',
    coordinates: 'SEC // CHASSIS-03 · LAT 45.10',
    callouts: [
      { label: 'BALLISTIC PULL LOOP', value: 'Rapid Entry Tab', x: '48%', y: '18%' },
      { label: 'MOLDED COUNTER', value: 'Carbon-Weave Wrap', x: '38%', y: '48%' },
      { label: 'BEVELLED TAIL', value: 'Smooth Strike Entry', x: '26%', y: '74%' }
    ]
  }
];

export const ATHLETE_STORIES: AthleteStory[] = [
  {
    id: 'story-01',
    frameNumber: '01',
    athleteName: 'KAI VANCE',
    discipline: 'Unsanctioned Night Mile & Road 10K',
    location: 'BERLIN // TEMPELHOF RUNWAY',
    sessionData: 'PACE: 2:54/KM · SURFACE: WET TARMAC',
    quote: '“WHEN THE PACE DROPS BELOW THREE MINUTES PER KILOMETER, YOU WANT A SHOE THAT FEELS LIKE A BLADE, NOT A PILLOW.”',
    narrative:
      'Fictional test runner persona. Tested across 400km of late-night tarmac intervals on decommissioned runway strips where lateral stiffness and immediate ground read matter most.',
    modelUsed: 'RL-01 VOLTAGE // US 10.0',
    image: '/templates/razorline/rl01-voltage.png',
    accentColor: 'lime'
  },
  {
    id: 'story-02',
    frameNumber: '02',
    athleteName: 'SORA TAKAHASHI',
    discipline: 'Urban Tempo & Bridge Repeats',
    location: 'TOKYO // SHIBUYA OVERPASS LOOP',
    sessionData: 'CADENCE: 194 SPM · ELEVATION: +310M',
    quote: '“THE HOLLOW CHAMBERS COMPRESS ON THE DOWNHILL AND SNAP BACK INSTANTLY WHEN YOU HIT THE FLAT.”',
    narrative:
      'Fictional test runner persona. Focused on steep urban camber transitions and steel bridge grates, evaluating midfoot torsion control and forefoot traction.',
    modelUsed: 'RL-01 COBALT // US 8.5',
    image: '/templates/razorline/rl01-cobalt.png',
    accentColor: 'cobalt'
  },
  {
    id: 'story-03',
    frameNumber: '03',
    athleteName: 'MARCUS VEY',
    discipline: 'Threshold Half-Marathon Progression',
    location: 'ZURICH // INDUSTRIAL CANAL SECTOR',
    sessionData: 'SPLIT: 63:40 · TEMP: 4°C RAIN',
    quote: '“ZERO WATER RETENTION IN THE MESH. KILOMETER TWENTY FEELS EXACTLY AS LIGHT AS KILOMETER ONE.”',
    narrative:
      'Fictional test runner persona. Long-duration wet-weather progression runs verifying non-absorbent monofilament upper stability and Achilles collar comfort.',
    modelUsed: 'RL-01 SHADOW // US 10.5',
    image: '/templates/razorline/rl01-shadow.png',
    accentColor: 'lime'
  }
];

export const LOOKBOOK_FRAMES: LookbookFrame[] = [
  {
    id: 'look-01',
    index: '01 / 04',
    title: 'RL-01 VOLTAGE — LATERAL FLIGHT PROFILE',
    caption: 'Three-quarter suspended studio study highlighting the sculpted lime cavity chassis and cobalt tension stays.',
    locationCode: 'STUDIO LAB // SECTOR 01',
    modelName: 'RL-01 VOLTAGE',
    image: '/templates/razorline/rl01-voltage.png',
    secondaryImage: '/templates/razorline/rl01-detail-sole.png',
    aspectLabel: 'LATERAL ARCHIVE // 01'
  },
  {
    id: 'look-02',
    index: '02 / 04',
    title: 'HOLLOW-CHAMBER MIDSOLE COMPRESSION STUDY',
    caption: 'Macro cross-section of the three aerodynamic tunnels engineered to deform and rebound under forefoot load.',
    locationCode: 'CHASSIS TEST // SECTOR 02',
    modelName: 'AERO-SOLE CHASSIS',
    image: '/templates/razorline/rl01-detail-sole.png',
    secondaryImage: '/templates/razorline/rl01-voltage.png',
    aspectLabel: 'MACRO SOLE // 02'
  },
  {
    id: 'look-03',
    index: '03 / 04',
    title: 'RL-01 COBALT — NIGHT TRACK SPECIFICATION',
    caption: 'Electric cobalt structural polymer paired with high-visibility voltage-lime lockdown hardware for nocturnal speed.',
    locationCode: 'NIGHT TRACK // SECTOR 03',
    modelName: 'RL-01 COBALT',
    image: '/templates/razorline/rl01-cobalt.png',
    secondaryImage: '/templates/razorline/rl01-detail-mesh.png',
    aspectLabel: 'COBALT EDITION // 03'
  },
  {
    id: 'look-04',
    index: '04 / 04',
    title: 'RL-01 SHADOW — SUB-ZERO STEALTH ARCHITECTURE',
    caption: 'Matte carbon monofilament weave and smoked graphite sole geometry stripped to pure mechanical silhouette.',
    locationCode: 'BLACKOUT LAB // SECTOR 04',
    modelName: 'RL-01 SHADOW',
    image: '/templates/razorline/rl01-shadow.png',
    secondaryImage: '/templates/razorline/rl01-detail-heel.png',
    aspectLabel: 'SHADOW EDITION // 04'
  }
];
