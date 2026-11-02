export interface MushroomKit {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  tag: string;
  difficulty: string;
  typicalDays: string;
  flushes: string;
  cardBg: string;
  accentColor: string;
  badgeText: string;
  image: string;
  shortDescription: string;
  flavorNotes: string;
  idealSpot: string;
  boxContents: string[];
  substrateInfo: string;
  yieldNote: string;
}

export interface GrowStage {
  id: string;
  stepNumber: string;
  verb: 'OPEN' | 'MIST' | 'WATCH' | 'HARVEST';
  title: string;
  daysWindow: string;
  summary: string;
  detail: string;
  conditionTip: string;
  image: string;
  accentBg: string;
}

export type JournalCategory = 'Getting started' | 'Care' | 'Recipes';

export interface JournalArticle {
  id: string;
  title: string;
  category: JournalCategory;
  readTime: string;
  seasonNote: string;
  excerpt: string;
  image: string;
  accentTint: string;
  keyTakeaways: string[];
  bodyParagraphs: string[];
  recipeIngredients?: string[];
}

export interface GrowerVignette {
  id: string;
  growerName: string;
  location: string;
  kitUsed: string;
  daysToHarvest: string;
  quote: string;
  countertopSpot: string;
  image: string;
  bgTint: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const MUSHROOM_KITS: MushroomKit[] = [
  {
    id: 'first-sprout',
    name: 'First Sprout',
    subtitle: 'Terracotta Pink & Coral Oyster Starter Kit',
    price: 34,
    tag: 'Most Popular Starter',
    difficulty: 'Beginner Friendly',
    typicalDays: '10–14 Days typical',
    flushes: 'Up to 2 harvests',
    cardBg: '#F9DFD5',
    accentColor: '#E58267',
    badgeText: 'Warm Countertop Favorite',
    image: '/templates/poppypatch/kit-first-sprout.png',
    shortDescription:
      'Our signature single-block kit that bursts into ruffled terracotta-coral caps right out of the front window.',
    flavorNotes: 'Savory, delicate, crisp edges when pan-seared in olive oil or butter',
    idealSpot: 'Warm kitchen counter away from direct midday sun (65–74°F)',
    boxContents: [
      '1× Colonized organic sawdust & oat bran fruiting block (3.2 lbs)',
      '1× BPA-free fine-mist handheld spritzer bottle',
      '1× Illustrated 16-page "First Sprout" folding field manual',
      '1× Wooden humidity tent peg & breathable kraft display box'
    ],
    substrateInfo:
      'Upcycled hardwood sawdust enriched with organic hulless oat bran, hydrated with filtered spring water and fully colonized before shipping.',
    yieldNote:
      'First flush typically yields 1 to 1.5 bowls of fresh mushrooms (~220–320g), depending on room humidity and daily misting.'
  },
  {
    id: 'oyster-party',
    name: 'Oyster Party',
    subtitle: 'Cream Pearl & Velvet Lilac Oyster Duo',
    price: 48,
    tag: 'Double Color Harvest',
    difficulty: 'Beginner Friendly',
    typicalDays: '10–14 Days typical',
    flushes: '2–3 harvests',
    cardBg: '#EFE0F0',
    accentColor: '#C58EC2',
    badgeText: 'Two Flavor Profiles',
    image: '/templates/poppypatch/kit-oyster-party.png',
    shortDescription:
      'A joyful pairing of plump cream pearl caps and cool-toned lilac-gray oyster mushrooms for weeknight pasta & toast.',
    flavorNotes: 'Velvety, mellow umami with a subtle nutty aroma when roasted whole',
    idealSpot: 'Cooler bookshelf, pantry nook, or kitchen island (60–70°F)',
    boxContents: [
      '1× Cream Pearl Oyster fruiting block (2.8 lbs)',
      '1× Velvet Dove/Lilac-tinted Oyster fruiting block (2.8 lbs)',
      '1× Refillable amber-glass fine mister',
      '2× Botanical harvest log postcards & recipe booklet'
    ],
    substrateInfo:
      'Locally sourced beech and maple sawdust blend inoculated with vigorous culinary Pleurotus strains.',
    yieldNote:
      'Combined typical harvest of 2 to 3 medium bowls across both blocks over a two-week window.'
  },
  {
    id: 'kitchen-garden',
    name: 'Kitchen Garden',
    subtitle: 'Complete Countertop Trio + Gardenery Set',
    price: 68,
    tag: 'Full Studio Bundle',
    difficulty: 'Curious All-Rounder',
    typicalDays: '10–16 Days typical',
    flushes: 'Up to 3 harvests',
    cardBg: '#E3EBC9',
    accentColor: '#A8B96C',
    badgeText: 'Free Shipping Included',
    image: '/templates/poppypatch/kit-kitchen-garden.png',
    shortDescription:
      'Everything you need to turn a sunny windowsill shadow into a staggered three-part culinary mushroom patch.',
    flavorNotes: 'Full range from crisp coral petals to meaty, buttery golden-cream clusters',
    idealSpot: 'Any shaded countertop or dining sideboard with gentle household airflow',
    boxContents: [
      '3× Staggered-ready fruiting blocks (Coral, Cream Pearl, and Golden Oyster)',
      '1× Continuous fine-mist botanical atomizer',
      '1× Carbon-steel folding mushroom harvest knife with brush',
      '1× Collectible clay gardener keepsake & illustrated recipe deck'
    ],
    substrateInfo:
      'Three individually dated blocks so you can open them all at once for a feast or stagger them week by week.',
    yieldNote:
      'Staggering one box every 7 days provides a steady countertop harvest for nearly a month under typical indoor conditions.'
  }
];

export const GROW_STAGES: GrowStage[] = [
  {
    id: 'stage-open',
    stepNumber: '01',
    verb: 'OPEN',
    title: 'Pop the perforated window & wake the block',
    daysWindow: 'Day 1 · 5 Minutes of Setup',
    summary:
      'Press along the dotted kraft cardboard petals on the front of your Poppy Patch box and scratch a gentle "X" into the inner wrap.',
    detail:
      'Inside the box lives a solid, snowy-white block of colonized hardwood sawdust. Pressing open the cardboard window lets fresh kitchen air signal to the mycelium that it has reached the surface of a fallen log—its natural cue to start forming baby mushrooms.',
    conditionTip:
      'Place your box somewhere you walk past every morning—indirect kitchen light is great; avoid direct window sun or heating vents.',
    image: '/templates/poppypatch/kit-first-sprout.png',
    accentBg: '#F9DFD5'
  },
  {
    id: 'stage-mist',
    stepNumber: '02',
    verb: 'MIST',
    title: 'Give it a gentle morning & evening spritz',
    daysWindow: 'Days 2–5 · 30 Seconds Twice a Day',
    summary:
      'Use the included spritzer to mist the exposed slit with 6 to 8 puffs of regular tap water around breakfast and dinner.',
    detail:
      'Mushrooms breathe like we do and Drink through micro-droplets on their surface. You are not soaking soil—just keeping a light, dewy sheen inside the cardboard recess so the emerging pinheads stay supple while they organize.',
    conditionTip:
      'If your home runs dry in winter or with AC, an extra midday spritz (3x daily) keeps the tiny caps from drying at the edges.',
    image: '/templates/poppypatch/cutout-gardener.png',
    accentBg: '#EFE0F0'
  },
  {
    id: 'stage-watch',
    stepNumber: '03',
    verb: 'WATCH',
    title: 'Watch tiny pinheads double in size overnight',
    daysWindow: 'Days 6–11 · The Daily Magic Phase',
    summary:
      'Tiny coral and cream clusters ("pins") emerge around day 5–7 and visibly double in size every 24 hours.',
    detail:
      'This is the part nobody quite believes until they see it on their own counter. One morning you will spot pebble-sized buds; three days later, sculptural ruffles are spilling out of the kraft window like a miniature clay sculpture come to life.',
    conditionTip:
      'Growth speed naturally varies with room temperature (64–72°F is the sweet spot). Cooler rooms grow slightly slower and denser.',
    image: '/templates/poppypatch/cutout-coral-oysters.png',
    accentBg: '#E3EBC9'
  },
  {
    id: 'stage-harvest',
    stepNumber: '04',
    verb: 'HARVEST',
    title: 'Twist, gather, sear & soak for round two',
    daysWindow: 'Days 12–14 · Typical First Flush',
    summary:
      'When the mushroom caps uncurl nearly flat at the edges, hold the base of the cluster and twist gently free.',
    detail:
      'Harvest the whole cluster at once right before the edges turn fully upward. Brush off any specks of sawdust at the base, tear into ribbons for a hot skillet, and let your block rest for a week before soaking it overnight for a bonus second flush.',
    conditionTip:
      'Actual harvest weight and timing always depend on your room humidity, airflow, and temperature—every patch grows with its own personality.',
    image: '/templates/poppypatch/cutout-cream-mushrooms.png',
    accentBg: '#F9DFD5'
  }
];

export const WHY_DIFFERENT_ITEMS = [
  {
    id: 'plain-human-guide',
    number: '01',
    title: 'Written in human, not laboratory mycology',
    description:
      'No sterile petri dishes, Latin taxonomy quizzes, or complicated humidity tents. Our illustrated pocket manual walks you through every stage with real photos showing what healthy pins, dry edges, and harvest-ready caps actually look like.',
    accent: '#F9DFD5',
    stamp: 'ZERO LAB JARGON'
  },
  {
    id: 'countertop-worthy-box',
    number: '02',
    title: 'Designed to live proudly next to the kettle',
    description:
      'Most grow kits look like industrial shipping cartons you want to hide in a basement. We use warm, thick-walled unbleached kraft board with recessed moisture flaps and botanical ink stamps meant for open kitchen shelves.',
    accent: '#E3EBC9',
    stamp: 'KITCHEN READY'
  },
  {
    id: 'realistic-expectations',
    number: '03',
    title: 'Honest expectations about how nature grows',
    description:
      'We will never promise ten pounds of giant supermarket mushrooms from a small box. One kit typically yields 1 to 2 delicious bowls of ultra-fresh culinary mushrooms over 10–14 days, depending on your home temperature and misting rhythm.',
    accent: '#EFE0F0',
    stamp: 'HONEST YIELDS'
  },
  {
    id: 'small-daily-wonder',
    number: '04',
    title: 'A two-week ritual of tiny morning surprises',
    description:
      'Half the joy is dinner; the other half is wandering into the kitchen with your first cup of coffee to see how much your mushroom bouquet grew while you were asleep.',
    accent: '#FBF4E4',
    stamp: 'EVERYDAY WONDER'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'picking-countertop-spot',
    title: 'Finding the Goldilocks Spot on Your Kitchen Counter',
    category: 'Getting started',
    readTime: '3 min read',
    seasonNote: 'Field Guide No. 01',
    excerpt:
      'Not too sunny, not too drafty: how to pick a happy corner where your kit stays humid and reminds you to spritz.',
    image: '/templates/poppypatch/kit-first-sprout.png',
    accentTint: '#F9DFD5',
    keyTakeaways: [
      'If you can comfortably read a book there without turning on a lamp, the light is plenty.',
      'Keep your kit at least 3 feet away from toaster ovens, stovetop steam, and radiator vents.',
      'Near the kitchen sink or coffee maker is ideal so misting becomes a 20-second habit.'
    ],
    bodyParagraphs: [
      'One of the biggest misconceptions about growing mushrooms at home is that they belong in a pitch-black cellar. In nature, oyster mushrooms fruit on shaded forest logs where dappled daylight filters through the canopy.',
      'On your countertop, indirect ambient room light—or even normal kitchen lighting for a few hours a day—gives your mushrooms the cue they need to develop rich coral, cream, or dusty-lilac color.',
      'The real secret to a happy kit is avoiding fast-moving dry air. Place your Poppy Patch box tucked slightly back against a tile backsplash or beside a cookbook stand to buffer household drafts.'
    ]
  },
  {
    id: 'art-of-the-morning-mist',
    title: 'How to Tell When Your Mushrooms Are Thirsty',
    category: 'Care',
    readTime: '4 min read',
    seasonNote: 'Field Guide No. 02',
    excerpt:
      'Reading cap edges and surface sheen so you never under-mist in dry winter heating or over-water during humid weeks.',
    image: '/templates/poppypatch/cutout-gardener.png',
    accentTint: '#EFE0F0',
    keyTakeaways: [
      'Mist from 8–10 inches away so micro-droplets settle gently like morning fog.',
      'Slightly pale or crinkly cap rims mean your room air is dry—add one midday spritz.',
      'Never let standing puddles collect inside the bottom of the plastic bag.'
    ],
    bodyParagraphs: [
      'Because culinary mushrooms expand so quickly—sometimes doubling in size between Tuesday morning and Wednesday night—they draw a surprising amount of moisture from the air right around the box.',
      'Hold your mister about eight inches back from the box window and pump 6 to 8 times. You want to see tiny beads of mist on the plastic folds and a velvety, matte-satin finish on the mushroom caps, rather than heavy dripping drops.',
      'Going away for a Saturday night? Give your kit a slightly heavier mist before you leave and tuck a loose tent of parchment or wax paper over the top to slow evaporation until Sunday evening.'
    ]
  },
  {
    id: 'crispy-coral-oyster-toast',
    title: 'Crispy Skillet Coral Oysters on Garlic Sourdough',
    category: 'Recipes',
    readTime: '5 min read',
    seasonNote: 'Kitchen Table No. 04',
    excerpt:
      'Tear, press, and sear your first harvest until the ruffled edges turn lacy and golden-brown over whipped ricotta.',
    image: '/templates/poppypatch/cutout-coral-oysters.png',
    accentTint: '#E3EBC9',
    keyTakeaways: [
      'Tear oyster clusters by hand along their natural gills instead of chopping them into cubes.',
      'Start in a hot skillet with a heavy pan pressed on top for 3 minutes to sear the edges.',
      'Finish with salted butter, lemon zest, and thyme right at the very end.'
    ],
    recipeIngredients: [
      '1 full cluster fresh Poppy Patch Coral or Cream Oyster mushrooms (~200g)',
      '2 thick slices country sourdough bread, toasted',
      '2 tbsp extra-virgin olive oil + 1 tbsp salted butter',
      '1/2 cup whole-milk ricotta or creamy white bean spread',
      '1 clove garlic (halved for rubbing toast), flaky sea salt & fresh thyme'
    ],
    bodyParagraphs: [
      'Freshly harvested home-grown oyster mushrooms contain far less water than plastic-wrapped grocery store mushrooms, which means they sear into crisp, nutty ribbons in under seven minutes.',
      'Hold your harvested cluster by the firm central stem, trim away the very bottom 1/4 inch where sawdust clings, and gently pull the caps apart into bite-sized fans.',
      'Heat olive oil in a cast-iron or heavy stainless skillet over medium-high heat. Lay the mushroom fans flat without crowding, press them gently with the back of a spatula, and let them sizzle undisturbed for 3 minutes until deeply caramelized before flipping with butter and thyme.'
    ]
  },
  {
    id: 'waking-up-second-flush',
    title: 'Coaxing a Bonus Second Harvest From Your Block',
    category: 'Care',
    readTime: '4 min read',
    seasonNote: 'Field Guide No. 05',
    excerpt:
      'After your first harvest, your mycelium block isn’t finished yet—here is the simple rest-and-soak method for round two.',
    image: '/templates/poppypatch/cutout-side-oysters.png',
    accentTint: '#F9DFD5',
    keyTakeaways: [
      'Let the block rest dry in a cool cabinet for 5 to 7 days after your first harvest.',
      'Submerge the block in a bowl of cold water weighted with a plate for 6–8 hours.',
      'Second harvests are usually smaller (3 to 5 larger caps) with deeper, meatier stems.'
    ],
    bodyParagraphs: [
      'Once you twist off your first big bouquet of mushrooms, the sawdust block inside your Poppy Patch box has spent a lot of its initial water reserve—Wait before soaking it right away.',
      'Clean off any tiny leftover stem stubs from the opening, fold the plastic flaps closed, and let the block rest quietly for about a week. This pause lets the mycelium consolidate its energy.',
      'After its rest, soak the block in cold tap water for 6 hours, drain thoroughly, pop it back into the kraft box, and resume twice-daily misting. Within 7 to 12 days, a second wave of pins often appears!'
    ]
  },
  {
    id: 'brown-butter-miso-noodles',
    title: '15-Minute Brown Butter & Roasted Oyster Udon',
    category: 'Recipes',
    readTime: '4 min read',
    seasonNote: 'Kitchen Table No. 07',
    excerpt:
      'Plump cream pearl mushrooms glazed in white miso, toasted sesame, and nutty brown butter for a cozy weeknight bowl.',
    image: '/templates/poppypatch/cutout-cream-mushrooms.png',
    accentTint: '#EFE0F0',
    keyTakeaways: [
      'Roast whole mini clusters at 425°F for 14 minutes for crisp tops and tender stems.',
      'Whisk white miso with warm noodle water so it emulsifies into a glossy sauce.',
      'Top with sliced scallions and a squeeze of lime.'
    ],
    recipeIngredients: [
      '200g fresh Cream Pearl or Lilac Oyster mushrooms, torn into clusters',
      '2 packs fresh or frozen sanuki udon noodles',
      '3 tbsp unsalted butter + 1.5 tbsp sweet white miso paste',
      '1 tsp toasted sesame oil, thinly sliced scallions, toasted sesame seeds'
    ],
    bodyParagraphs: [
      'When your Oyster Party kit gives you those round, pillowy cream clusters, roasting them at high heat locks in their bounce while turning the thin cap margins crisp as potato chips.',
      'While the mushrooms roast on a parchment-lined sheet pan, brown the butter in a wide pan until it smells like toasted hazelnuts, then swirl in the white miso and a splash of starchy udon cooking water.',
      'Toss the chewy noodles through the glaze and pile the roasted homegrown mushrooms right on top so half stay crunchy and half soak up the broth.'
    ]
  },
  {
    id: 'unboxing-day-one-checklist',
    title: 'Just Opened Your Box? Your 5-Minute Day-One Checklist',
    category: 'Getting started',
    readTime: '2 min read',
    seasonNote: 'Field Guide No. 03',
    excerpt:
      'Whether you want to start growing tonight or store your kit for a gift next month, here is what to do first.',
    image: '/templates/poppypatch/kit-kitchen-garden.png',
    accentTint: '#E3EBC9',
    keyTakeaways: [
      'Starting today? Pop the front cardboard panel and cut a 3-inch X in the bag.',
      'Saving it for later? Keep the box unopened in a cool closet (up to 3 weeks) or fridge.',
      'Snap a Day 1 photo so you can compare it with Day 10!'
    ],
    bodyParagraphs: [
      'Your Poppy Patch kit arrives alive and breathing, packed in dormant readiness. If you are ready to start immediately, all you need is a pair of clean kitchen scissors and tap water.',
      'Press open the perforated front window, make a clean 3-inch "X" slice through the clear inner film (only about 1/8 inch deep into the white block), and mist the X five times.',
      'If you bought the kit as a birthday gift or are leaving on vacation soon, leave the cardboard window sealed and store it in a cool pantry (below 68°F) for up to three weeks before starting.'
    ]
  }
];

export const COMMUNITY_VIGNETTES: GrowerVignette[] = [
  {
    id: 'vignette-1',
    growerName: 'Clara & Theo',
    location: 'Portland, OR (Fictional Studio Story)',
    kitUsed: 'First Sprout · Coral Oyster',
    daysToHarvest: 'Harvested on Day 11',
    countertopSpot: 'Next to the espresso machine',
    quote:
      '“We named our box Barnaby. Between Day 7 and Day 9 the coral ruffles grew so fast our seven-year-old ran downstairs before school every morning with a ruler.”',
    image: '/templates/poppypatch/cutout-coral-oysters.png',
    bgTint: '#F9DFD5'
  },
  {
    id: 'vignette-2',
    growerName: 'Mateo R.',
    location: 'Brooklyn, NY (Fictional Studio Story)',
    kitUsed: 'Oyster Party Duo',
    daysToHarvest: 'Harvested on Day 13',
    countertopSpot: 'North-facing bookshelf nook',
    quote:
      '“My apartment gets almost zero direct sunlight—every basil plant I have ever owned gave up in a week. These pearl oysters thrived in the shade and made two Sunday pasta nights.”',
    image: '/templates/poppypatch/cutout-lilac-mushrooms.png',
    bgTint: '#EFE0F0'
  },
  {
    id: 'vignette-3',
    growerName: 'Sora & Jin',
    location: 'Chicago, IL (Fictional Studio Story)',
    kitUsed: 'Kitchen Garden Trio',
    daysToHarvest: 'Staggered over 3 weeks',
    countertopSpot: 'Butcher-block island corner',
    quote:
      '“Because our radiator heat makes the kitchen dry, we misted three times a day like the field guide suggested. Watching the cream caps pop out of the little kraft window felt like stop-motion animation.”',
    image: '/templates/poppypatch/cutout-cream-mushrooms.png',
    bgTint: '#E3EBC9'
  },
  {
    id: 'vignette-4',
    growerName: 'Hannah L.',
    location: 'Austin, TX (Fictional Studio Story)',
    kitUsed: 'First Sprout · Second Flush',
    daysToHarvest: 'Bonus flush on Day 24',
    countertopSpot: 'Shaded pantry baker’s rack',
    quote:
      '“I genuinely didn’t expect the overnight cold-water soak to work after we ate the first batch, but ten days later five huge velvety caps popped right back out.”',
    image: '/templates/poppypatch/cutout-side-oysters.png',
    bgTint: '#FBF4E4'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-timeline',
    category: 'Growing & Timing',
    question: 'Will my kit definitely grow in 10 to 14 days?',
    answer:
      '10 to 14 days is our typical countertop window when room temperatures sit between 64°F and 72°F with twice-daily misting. Because mushrooms are living organisms, cooler rooms (58–63°F) or drier winter air can stretch pinning closer to 16–20 days. Every block grows on nature’s schedule!'
  },
  {
    id: 'faq-storage',
    category: 'Storage & Gifting',
    question: 'How long can I store a Poppy Patch kit before opening it?',
    answer:
      'If you are gifting a kit or waiting until after a trip, keep the kraft box closed in a cool, dark closet (60–68°F) for up to 3 weeks from delivery. For storage up to 6 weeks, place the sealed inner block in your refrigerator vegetable crisper (never the freezer), then let it warm to room temperature for 24 hours before slicing the X.'
  },
  {
    id: 'faq-light-space',
    category: 'Placement',
    question: 'Do mushrooms need sunlight or a dark closet?',
    answer:
      'Neither! Skip the dark closet and skip the sunny south windowsill. Culinary oyster mushrooms love ordinary, indirect kitchen light—just enough ambient daylight or room lamps to read a recipe card. Direct sun can overheat the box and dry out the delicate pinheads.'
  },
  {
    id: 'faq-spores-pets',
    category: 'Home & Kitchen',
    question: 'Is it safe and tidy to keep on an open kitchen counter?',
    answer:
      'Yes—our kits grow common culinary oyster mushrooms (Pleurotus species) on clean hardwood sawdust and oat bran. When you harvest at our recommended stage (just as the cap edges unflatten), the mushrooms are at peak tenderness before heavy spore release. As with any houseplant or raw produce, keep out of reach of curious pets who like to chew cardboard.'
  },
  {
    id: 'faq-cooking',
    category: 'Culinary Use',
    question: 'Can I eat the mushrooms raw, or should I always cook them?',
    answer:
      'Always cook home-grown oyster mushrooms thoroughly before eating! A hot skillet sear with olive oil or butter breaks down their firm chitin cell walls, brings out their savory, nutty flavor, and turns their ruffled edges deliciously crisp. We focus purely on culinary joy—no medicinal claims or supplements.'
  },
  {
    id: 'faq-after-harvest',
    category: 'Second Harvest & Compost',
    question: 'What do I do with the block once it finishes fruiting?',
    answer:
      'After 2 to 3 harvests, your block has given everything it has. Because it is made purely of hardwood sawdust, oat bran, and mushroom mycelium, you can crumble the spent block directly into an outdoor garden bed, compost bin, or mulch ring around backyard shrubs.'
  }
];
