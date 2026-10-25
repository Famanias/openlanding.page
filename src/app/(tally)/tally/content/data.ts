import type { ArchetypeId, PlanId } from "../counter/ticket";

export type ServiceAddOn = {
  id: string;
  label: string;
  price: number;
  code: string;
};

export type ServiceArchetype = {
  id: ArchetypeId;
  name: string;
  shopExample: string;
  city: string;
  serviceTitle: string;
  sku: string;
  basePrice: number;
  durationLabel: string;
  turnaround: string;
  benchStation: string;
  pastelTone: "mint" | "blush" | "lilac";
  slots: string[];
  addOns: ServiceAddOn[];
  stopNotes: [string, string, string, string];
};

export const ARCHETYPES: ServiceArchetype[] = [
  {
    id: "tailor",
    name: "Denim & Garment Atelier",
    shopExample: "Hem & Haw Atelier",
    city: "Portland, OR",
    serviceTitle: "Union Special Chain-Stitch Hem & Taper",
    sku: "SRV-HEM-432",
    basePrice: 68,
    durationLabel: "25 min pin-fitting",
    turnaround: "Ready in 4 working days",
    benchStation: "Bench 02 · Juki & Union Special",
    pastelTone: "blush",
    slots: ["Thu · 10:30 AM", "Thu · 2:15 PM", "Fri · 11:00 AM", "Sat · 1:30 PM"],
    addOns: [
      { id: "darn", label: "Indigo warp darning reinforcement", price: 24, code: "ADD-DRN" },
      { id: "hardware", label: "Laurel-leaf copper button replacement", price: 14, code: "ADD-BTN" },
    ],
    stopNotes: [
      "Customer selects inseam length + Thursday 10:30 AM fitting slot directly on the Shopify product page.",
      "Denim checked in at counter; thermal bench tag prints with cuff allowance (+0.75 in shrinkage note).",
      "Assigned to Master Tailor Lin; indigo thread #04 matched and chain-stitched on Bench 02.",
      "SMS pickup pass sent with one-tap Apple Pay balance link and locker code #14.",
    ],
  },
  {
    id: "cycle",
    name: "Bicycle Repair Bay",
    shopExample: "Spoke & Pawl Cycleworks",
    city: "Minneapolis, MN",
    serviceTitle: "Complete Commuter Drivetrain Overhaul",
    sku: "SRV-BYK-108",
    basePrice: 120,
    durationLabel: "48 hr bay window",
    turnaround: "2-day stand turnaround",
    benchStation: "Workstand 01 · Ultrasonic Tank",
    pastelTone: "mint",
    slots: ["Tue · 8:30 AM Drop", "Wed · 9:00 AM Drop", "Thu · 12:00 PM Drop", "Fri · 4:00 PM Drop"],
    addOns: [
      { id: "chain", label: "Hot-melt paraffin chain wax bath", price: 28, code: "ADD-WAX" },
      { id: "bleed", label: "Hydraulic brake bleed (front + rear)", price: 42, code: "ADD-BLD" },
    ],
    stopNotes: [
      "Rider books Workstand 01 drop-off window and pays 50% bench reservation deposit in Shopify.",
      "Frame tagged at front roll-up door; tire pressure & chain wear (0.5%) logged on POS tablet.",
      "Cassette ultrasonic-cleaned; mechanic adds 11-speed shift cable from Shopify inventory.",
      "Test-ridden 0.4 miles; ready stub texted to rider with itemized parts + labor invoice.",
    ],
  },
  {
    id: "kiln",
    name: "Ceramic Kiln & Classes",
    shopExample: "Kiln & Glaze Studio",
    city: "Burlington, VT",
    serviceTitle: "Cone 6 Glaze Firing + 2-Hr Wheel Session",
    sku: "SRV-KLN-219",
    basePrice: 84,
    durationLabel: "2 hr wheel + kiln shelf",
    turnaround: "Fired & cooled in 5 days",
    benchStation: "Skutt Kiln #3 · Half-Shelf",
    pastelTone: "lilac",
    slots: ["Wed · 6:00 PM Wheel", "Fri · 5:30 PM Wheel", "Sat · 10:00 AM Wheel", "Sun · 1:00 PM Wheel"],
    addOns: [
      { id: "clay", label: "12 lb speckled buff stoneware pug", price: 18, code: "ADD-CLY" },
      { id: "glaze", label: "Dip in studio celadon & pistachio glaze", price: 16, code: "ADD-GLZ" },
    ],
    stopNotes: [
      "Maker reserves Wheel #4 and a half-shelf in Kiln #3; seat capacity decrements live in Shopify.",
      "Pieces weighed and stamped at the damp-room counter; glaze slip attached to drying rack.",
      "Loaded into Cone 6 oxidation firing cycle; thermocouple curve reaches 2,232 °F.",
      "Unloaded warm from kiln; photo + shelf pickup stub sent so pieces are collected within 7 days.",
    ],
  },
  {
    id: "watch",
    name: "Watch & Instrument Bench",
    shopExample: "Movement & Crown",
    city: "Savannah, GA",
    serviceTitle: "Mechanical Caliber Clean, Oil & Regulation",
    sku: "SRV-WTC-804",
    basePrice: 190,
    durationLabel: "Insured mail-in or counter",
    turnaround: "10-day horology bench",
    benchStation: "Horology Bench 03 · Witschi Timer",
    pastelTone: "blush",
    slots: ["Mon · Counter Intake", "Tue · Insured Mail Kit", "Thu · Counter Intake", "Fri · Insured Mail Kit"],
    addOns: [
      { id: "gasket", label: "Caseback + crown Viton gasket pressure test", price: 32, code: "ADD-GSK" },
      { id: "crystal", label: "Acrylic dome crystal buff & polish", price: 26, code: "ADD-CRY" },
    ],
    stopNotes: [
      "Collector books an insured mail-in shipping box or counter intake with a refundable bench deposit.",
      "Serial & case reference photographed at intake; movement amplitude baseline (+14 s/day) recorded.",
      "Mainspring barrel serviced and regulated to +2 s/day across 5 positions on Witschi timing tape.",
      "Final balance cleared via Shopify draft-order link; return tracking or counter claim code issued.",
    ],
  },
];

export type TicketStop = {
  step: "01" | "02" | "03" | "04";
  title: string;
  tag: string;
  summary: string;
  shopifyEvent: string;
};

export const TICKET_STOPS: TicketStop[] = [
  {
    step: "01",
    title: "Booked at Checkout",
    tag: "STOREFRONT · DEPOSIT",
    summary:
      "Your customer picks a real time slot, bay, or mail-in kit right on your Shopify product page and pays a partial deposit or full fare.",
    shopifyEvent: "checkout.completed · deposit_captured",
  },
  {
    step: "02",
    title: "Checked In at Counter",
    tag: "SHOPIFY POS · INTAKE",
    summary:
      "Scan the claim stub in Shopify POS. Tally prints the physical bench tag, logs intake photos or measurements, and assigns a workstation.",
    shopifyEvent: "pos.ticket_stamped · station_assigned",
  },
  {
    step: "03",
    title: "On the Workbench",
    tag: "BENCH LOG · PARTS SYNC",
    summary:
      "Add replacement parts from your live Shopify inventory, check off bench steps, and let customers peek at progress without calling the shop.",
    shopifyEvent: "bench.stage_updated · inventory_reserved",
  },
  {
    step: "04",
    title: "Ready for Pickup",
    tag: "STUB TEAR · BALANCE PAID",
    summary:
      "One tap stamps the ticket Ready. Tally texts the customer their pickup code and collects the remaining balance before they reach the counter.",
    shopifyEvent: "ticket.ready_stamped · balance_settled",
  },
];

export type ServiceMode = {
  id: string;
  number: string;
  title: string;
  kicker: string;
  pastel: "mint" | "blush" | "lilac" | "paper";
  description: string;
  storefrontLine: {
    title: string;
    meta: string;
    depositBadge: string;
    price: string;
  };
  posBenchLine: {
    station: string;
    status: string;
    inventoryLink: string;
    actionLabel: string;
  };
};

export const SERVICE_MODES: ServiceMode[] = [
  {
    id: "appointments",
    number: "MODE 01",
    title: "1-on-1 Fittings & Consultations",
    kicker: "Calendar slots synced to staff hours",
    pastel: "mint",
    description:
      "Sell bridal fittings, custom frame consultations, or knife-sharpening windows without double-booking your one workbench.",
    storefrontLine: {
      title: "45-Min Custom Suit Measure & Fabric Pull",
      meta: "Slot: Fri Oct 30 · 2:00 PM · Tailor: M. Vance",
      depositBadge: "$40 deposit (credited to garment)",
      price: "$40.00 due today",
    },
    posBenchLine: {
      station: "Fitting Room B · 45m block locked",
      status: "CHECKED IN · Measurements attached to Customer Profile",
      inventoryLink: "Linked SKU: Wool Flannel Bolt #19 (3.5 yds held)",
      actionLabel: "Apply $40 Deposit to Bespoke Order",
    },
  },
  {
    id: "repairs",
    number: "MODE 02",
    title: "Drop-Off & Mail-In Repairs",
    kicker: "Two-part claim stubs + parts invoicing",
    pastel: "blush",
    description:
      "Issue numbered repair tickets for boots, watches, espresso machines, or bicycles. Add replacement parts from Shopify stock mid-repair.",
    storefrontLine: {
      title: "Goodyear Welt Resole — Vibram Lug + Cork Fill",
      meta: "Intake: Counter Drop-Off or Prepaid Label",
      depositBadge: "50% bench deposit · $65 at pickup",
      price: "$65.00 due today",
    },
    posBenchLine: {
      station: "Cobbler Press 02 · Ticket #TLY-26-1409",
      status: "ON BENCH · Midsole cork replaced, awaiting edge ink",
      inventoryLink: "Pulled 1× Vibram No. 430 Heel Pair from Stock",
      actionLabel: "Stamp Ready & Send $65 Balance Link",
    },
  },
  {
    id: "addons",
    number: "MODE 03",
    title: "Bespoke Product Add-Ons",
    kicker: "Attach labor to physical Shopify SKUs",
    pastel: "lilac",
    description:
      "When a shopper buys raw denim, a cast-iron skillet, or a tennis frame, offer chain-stitch hemming, seasoning, or custom stringing in the same cart.",
    storefrontLine: {
      title: "+ Add Custom Racquet Stringing (Mains 52 lb / Crosses 50 lb)",
      meta: "Attached to: Yonex Percept 97 Frame in Cart",
      depositBadge: "Adds +1 bench day before shipping",
      price: "+$32.00 labor",
    },
    posBenchLine: {
      station: "Stringing Machine 01 · Hold Fulfillment",
      status: "HOLD SHIPPING · Complete service before printing label",
      inventoryLink: "Parent Order No. 4812 unblocked once ticket stamped",
      actionLabel: "Stamp Strung & Release to Ship Station",
    },
  },
  {
    id: "workshops",
    number: "MODE 04",
    title: "Small-Group Bench Classes",
    kicker: "Seat counters + automatic waitlist",
    pastel: "paper",
    description:
      "Turn Sunday afternoons into steady high-margin revenue: floral arranging, wheel throwing, espresso dialing, or visible-mending nights.",
    storefrontLine: {
      title: "Sunday Sashiko Denim Mending Workshop (6 Seats)",
      meta: "Sun Nov 8 · 4:00 PM – 6:30 PM · 2 seats left",
      depositBadge: "Includes Sashiko needle kit & indigo scrap pack",
      price: "$75.00 / seat",
    },
    posBenchLine: {
      station: "Communal Table · Roster 6 / 6 Full",
      status: "ROSTER LOCKED · 3 guests on 1-click SMS waitlist",
      inventoryLink: "6× Beginner Mending Kits deducted from shelf",
      actionLabel: "Print Table Place-Stubs (6)",
    },
  },
];

export type ReceiptLine = {
  code: string;
  label: string;
  amount: string;
};

export type MerchantStory = {
  id: string;
  shopName: string;
  category: string;
  location: string;
  pastel: "mint" | "blush" | "lilac";
  quote: string;
  owner: string;
  metricValue: number;
  metricSuffix: string;
  metricLabel: string;
  secondaryStat: string;
  illustrationType: "tailor" | "cycle" | "kiln";
  receipt: {
    serial: string;
    date: string;
    customer: string;
    station: string;
    items: ReceiptLine[];
    depositPaid: string;
    balancePaid: string;
    pickupNote: string;
  };
};

export const MERCHANT_STORIES: MerchantStory[] = [
  {
    id: "hem-and-haw",
    shopName: "Hem & Haw Denim Atelier",
    category: "Garment Alterations & Retail",
    location: "Portland, Oregon",
    pastel: "blush",
    quote:
      "Before Tally, 40% of our alterations lived on paper tags that never talked to Shopify. Now every pair of jeans bought online or in-store gets a numbered hem stub before it touches the sewing table.",
    owner: "Marta Lindqvist, Founder & Head Tailor",
    metricValue: 94,
    metricSuffix: "%",
    metricLabel: "fittings show up on time with 50% deposit",
    secondaryStat: "+$4,800/mo in attached hemming & darning labor",
    illustrationType: "tailor",
    receipt: {
      serial: "TLY-26-1050",
      date: "OCT 24 · 11:18 AM",
      customer: "E. Takahashi · Order No. 8841",
      station: "Bench 02 · Union Special 43200G",
      items: [
        { code: "GOD-14OZ", label: "14oz Japanese Selvedge Jean (32×34)", amount: "$245.00" },
        { code: "SRV-HEM", label: "Chain-Stitch Hem to 30.5 in (Gold Thread)", amount: "$35.00" },
        { code: "ADD-DRN", label: "Pocket Bag Canvas Reinforcement", amount: "$20.00" },
      ],
      depositPaid: "$272.50 at checkout",
      balancePaid: "$27.50 on counter pickup",
      pickupNote: "Picked up in 3 days · Added leather belt at counter (+$85)",
    },
  },
  {
    id: "spoke-and-pawl",
    shopName: "Spoke & Pawl Cycleworks",
    category: "Bicycle Service & Parts",
    location: "Minneapolis, Minnesota",
    pastel: "mint",
    quote:
      "Spring tune-up season used to jam our hallway with 35 bikes and angry phone calls. Tally caps our daily workstand capacity and pulls brake pads straight from our Shopify inventory as we wrench.",
    owner: "Devon Reyes, Service Manager",
    metricValue: 38,
    metricSuffix: " hrs",
    metricLabel: "saved each month on status phone calls",
    secondaryStat: "0 overbooked workstands across 420 spring tune-ups",
    illustrationType: "cycle",
    receipt: {
      serial: "TLY-26-2150",
      date: "OCT 22 · 08:45 AM",
      customer: "S. Lindstrom · Commuter Bay #1",
      station: "Stand 01 · Mechanic D. Reyes",
      items: [
        { code: "SRV-TUN", label: "Full Commuter Drivetrain Overhaul", amount: "$120.00" },
        { code: "PRT-PAD", label: "Shimano L05A Resin Disc Pads (×2)", amount: "$48.00" },
        { code: "ADD-WAX", label: "Ultrasonic Strip + Hot Melt Paraffin Wax", amount: "$28.00" },
      ],
      depositPaid: "$98.00 bay deposit",
      balancePaid: "$98.00 via SMS tap-to-pay",
      pickupNote: "Ready SMS sent 4:12 PM · Picked up 5:30 PM",
    },
  },
  {
    id: "kiln-and-glaze",
    shopName: "Kiln & Glaze Studio",
    category: "Classes & Custom Firing",
    location: "Burlington, Vermont",
    pastel: "lilac",
    quote:
      "We sell finished mugs, six-week wheel courses, and per-shelf kiln firing on one Shopify store. Tally treats kiln space and wheel seats with the same inventory discipline as our stoneware.",
    owner: "Jun & Tessa Park, Studio Co-Directors",
    metricValue: 100,
    metricSuffix: "%",
    metricLabel: "class seats filled via automated SMS waitlist",
    secondaryStat: "3.2× faster piece pickup once kiln shelf stubs are stamped",
    illustrationType: "kiln",
    receipt: {
      serial: "TLY-26-3325",
      date: "OCT 25 · 02:10 PM",
      customer: "A. Beaumont · Member No. 118",
      station: "Skutt Kiln #3 · Shelf B (Cone 6)",
      items: [
        { code: "SRV-WHL", label: "Open Wheel Session (2 hrs · Wheel #4)", amount: "$48.00" },
        { code: "SRV-FIR", label: "Half-Shelf Cone 6 Glaze Firing (6 bowls)", amount: "$36.00" },
        { code: "ADD-CLY", label: "12 lb Speckled Buff Stoneware Pug", amount: "$18.00" },
      ],
      depositPaid: "$51.00 at booking",
      balancePaid: "$51.00 on shelf unload",
      pickupNote: "Shelf B unloaded · Cubby #09 claim stub verified",
    },
  },
];

export type MerchantPlan = {
  id: PlanId;
  name: string;
  price: number;
  cadence: string;
  badge: string;
  pastel: "paper" | "mint" | "lilac";
  idealFor: string;
  includedTickets: string;
  features: string[];
};

export const PLANS: MerchantPlan[] = [
  {
    id: "counter",
    name: "Counter",
    price: 19,
    cadence: "/ month",
    badge: "Solo Bench & Pop-Ups",
    pastel: "paper",
    idealFor: "Independent makers, solo tailors, and single-chair studios starting on Shopify Basic.",
    includedTickets: "Up to 80 service tickets / mo · 0% Tally commission",
    features: [
      "Theme 2.0 slot picker & service add-on block",
      "Partial deposit or full prepay in Shopify Checkout",
      "Printable & SMS perforated claim stubs",
      "4-stop customer status page (Booked → Ready)",
    ],
  },
  {
    id: "workshop",
    name: "Workshop",
    price: 49,
    cadence: "/ month",
    badge: "Most Small Shops",
    pastel: "mint",
    idealFor: "Busy neighborhood storefronts combining physical retail, Shopify POS, and 2–5 workbench bays.",
    includedTickets: "Unlimited service tickets · 0% Tally commission",
    features: [
      "Full Shopify POS tile: scan, stamp & print thermal bench tags",
      "Mid-repair parts pull from live Shopify SKU inventory",
      "Automated SMS pickup pass + 1-tap balance invoice",
      "Multi-staff & multi-bay capacity rules",
    ],
  },
  {
    id: "guild",
    name: "Guild",
    price: 99,
    cadence: "/ month",
    badge: "Multi-Location & Mail-In",
    pastel: "lilac",
    idealFor: "Multi-location ateliers and national mail-in repair programs with high-volume bench routing.",
    includedTickets: "Unlimited tickets across up to 5 locations",
    features: [
      "Prepaid mail-in repair kit generator + return label sync",
      "Before/after bench photo attachments on customer stubs",
      "Custom webhook events & Klaviyo / Shopify Flow triggers",
      "Dedicated counter onboarding & theme migration",
    ],
  },
];

export type FaqItem = {
  id: string;
  question: string;
  tag: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    id: "pos-sync",
    question: "Does Tally work with both my online Shopify store and Shopify POS at the counter?",
    tag: "SHOPIFY POS + ONLINE",
    answer:
      "Yes. Customers can book a slot or mail-in repair online 24/7, or walk up to your physical counter where staff issue a claim ticket in two taps inside the native Shopify POS extension. Both share the exact same bench capacity and ticket ledger.",
  },
  {
    id: "deposits",
    question: "How do partial deposits and final pickup balances work in Shopify Checkout?",
    tag: "DEPOSITS & BALANCES",
    answer:
      "Tally uses Shopify's native partial-payment and draft-order rails. You set whether a service collects 25%, 50%, or 100% upfront. When the job is stamped Ready on the bench, Tally texts a one-tap checkout link for the remaining balance—plus any extra parts added during the repair.",
  },
  {
    id: "physical-goods",
    question: "Can a customer buy a physical product and a service in the exact same cart?",
    tag: "MIXED CARTS",
    answer:
      "Absolutely. That is why we built Tally. A shopper can buy a pair of selvedge jeans, attach a $35 chain-stitch hemming ticket, and book a Friday fitting—all in a single Shopify checkout without splitting orders or breaking inventory.",
  },
  {
    id: "rescheduling",
    question: "What happens when a customer needs to move their appointment or runs late?",
    tag: "RESCHEDULE & NO-SHOWS",
    answer:
      "Every Customer Claim Stub includes a self-serve reschedule link governed by your cutoff window (for example, free rescheduling up to 24 hours before the slot). Within your cutoff window, the deposit is protected so your bench hour is never wasted.",
  },
  {
    id: "theme-install",
    question: "Will this slow down my storefront or require editing Liquid code?",
    tag: "THEME 2.0 APP BLOCK",
    answer:
      "Never. Tally installs as a lightweight Online Store 2.0 App Block (< 9 KB gzipped) that inherits your theme's typography and colours automatically. If you ever uninstall, zero stray Liquid snippets are left behind.",
  },
];
