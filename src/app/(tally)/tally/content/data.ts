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
      "Customer selects fitting slot and inseam on Shopify.",
      "Denim checked in at counter; thermal bench tag prints.",
      "Assigned to Bench 02; chain-stitched with indigo thread #04.",
      "SMS pickup pass sent with one-tap Apple Pay link.",
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
      "Rider books bay window and pays 50% deposit online.",
      "Frame tagged at roll-up door; chain wear logged on POS.",
      "Ultrasonic drivetrain clean; new shift cable added.",
      "Test-ridden; ready stub texted with parts invoice.",
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
      "Maker reserves Wheel #4 and half-shelf in Kiln #3.",
      "Pieces weighed and stamped; glaze slip tagged on drying rack.",
      "Loaded into Cone 6 cycle; fired to 2,232 °F.",
      "Unloaded warm; photo and cubby pickup stub texted.",
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
      "Collector books intake with refundable bench deposit.",
      "Serial photographed at intake; amplitude baseline logged.",
      "Mainspring serviced; regulated across 5 positions.",
      "Balance cleared via Shopify link; claim code issued.",
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
      "Customer selects a time slot or mail-in kit and pays the deposit in Shopify Checkout.",
    shopifyEvent: "checkout.completed · deposit_captured",
  },
  {
    step: "02",
    title: "Checked In at Counter",
    tag: "SHOPIFY POS · INTAKE",
    summary:
      "Scan the stub in Shopify POS. Print the bench tag, log intake notes, and assign a station.",
    shopifyEvent: "pos.ticket_stamped · station_assigned",
  },
  {
    step: "03",
    title: "On the Workbench",
    tag: "BENCH LOG · PARTS SYNC",
    summary:
      "Pull parts from live Shopify inventory and update progress without status phone calls.",
    shopifyEvent: "bench.stage_updated · inventory_reserved",
  },
  {
    step: "04",
    title: "Ready for Pickup",
    tag: "STUB TEAR · BALANCE PAID",
    summary:
      "Stamp the ticket Ready. Text the pickup pass and collect the remaining balance.",
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
      "Book fittings and consultations directly from product pages without double-booking workbenches.",
    storefrontLine: {
      title: "45-Min Custom Suit Measure & Fitting",
      meta: "Fri Oct 30 · 2:00 PM · Tailor: M. Vance",
      depositBadge: "$40 deposit credited to order",
      price: "$40.00 due today",
    },
    posBenchLine: {
      station: "Fitting Room B · 45m block",
      status: "CHECKED IN · Measurements logged",
      inventoryLink: "Held: Wool Flannel Bolt #19",
      actionLabel: "Apply Deposit to Bespoke Order",
    },
  },
  {
    id: "repairs",
    number: "MODE 02",
    title: "Drop-Off & Mail-In Repairs",
    kicker: "Two-part claim stubs + parts invoicing",
    pastel: "blush",
    description:
      "Issue numbered claim tickets for repairs. Add parts from Shopify stock as work progresses.",
    storefrontLine: {
      title: "Goodyear Welt Resole — Vibram Lug",
      meta: "Drop-Off or Prepaid Label",
      depositBadge: "50% deposit · $65 at pickup",
      price: "$65.00 due today",
    },
    posBenchLine: {
      station: "Cobbler Press 02 · #TLY-26-1409",
      status: "ON BENCH · Midsole cork replaced",
      inventoryLink: "Pulled 1× Vibram No. 430 Heel",
      actionLabel: "Stamp Ready & Send Balance Link",
    },
  },
  {
    id: "addons",
    number: "MODE 03",
    title: "Bespoke Product Add-Ons",
    kicker: "Attach labor to physical Shopify SKUs",
    pastel: "lilac",
    description:
      "Attach hemming, stringing, or custom assembly directly to physical products in the same cart.",
    storefrontLine: {
      title: "+ Custom Racquet Stringing (52/50 lb)",
      meta: "Attached to: Yonex Percept 97 in Cart",
      depositBadge: "+1 bench day before shipping",
      price: "+$32.00 labor",
    },
    posBenchLine: {
      station: "Stringing Machine 01 · Hold Shipping",
      status: "HOLD SHIPPING · In progress",
      inventoryLink: "Order No. 4812 held for stringing",
      actionLabel: "Stamp Complete & Release to Ship",
    },
  },
  {
    id: "workshops",
    number: "MODE 04",
    title: "Small-Group Bench Classes",
    kicker: "Seat counters + automatic waitlist",
    pastel: "paper",
    description:
      "Host studio classes and workshops with real-time seat caps and automated waitlists.",
    storefrontLine: {
      title: "Sunday Sashiko Denim Mending Workshop",
      meta: "Sun Nov 8 · 4:00 PM · 2 seats left",
      depositBadge: "Includes needle & scrap pack",
      price: "$75.00 / seat",
    },
    posBenchLine: {
      station: "Communal Table · Roster 6 / 6 Full",
      status: "ROSTER FULL · 3 on SMS waitlist",
      inventoryLink: "6× Mending Kits deducted",
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
      "Every pair of jeans bought online or in-store gets a numbered claim stub before it touches the sewing table.",
    owner: "Marta Lindqvist, Founder & Head Tailor",
    metricValue: 94,
    metricSuffix: "%",
    metricLabel: "fittings arrive on time with 50% deposit",
    secondaryStat: "+$4,800/mo attached labor",
    illustrationType: "tailor",
    receipt: {
      serial: "TLY-26-1050",
      date: "OCT 24 · 11:18 AM",
      customer: "E. Takahashi · Order No. 8841",
      station: "Bench 02 · Union Special 43200G",
      items: [
        { code: "GOD-14OZ", label: "14oz Selvedge Jean (32×34)", amount: "$245.00" },
        { code: "SRV-HEM", label: "Chain-Stitch Hem to 30.5 in", amount: "$35.00" },
        { code: "ADD-DRN", label: "Pocket Bag Reinforcement", amount: "$20.00" },
      ],
      depositPaid: "$272.50 at checkout",
      balancePaid: "$27.50 at pickup",
      pickupNote: "Picked up in 3 days · Added leather belt (+$85)",
    },
  },
  {
    id: "spoke-and-pawl",
    shopName: "Spoke & Pawl Cycleworks",
    category: "Bicycle Service & Parts",
    location: "Minneapolis, Minnesota",
    pastel: "mint",
    quote:
      "Tally caps daily workstand capacity and pulls parts straight from Shopify inventory as we wrench.",
    owner: "Devon Reyes, Service Manager",
    metricValue: 38,
    metricSuffix: " hrs",
    metricLabel: "saved monthly on status phone calls",
    secondaryStat: "0 overbooked workstands",
    illustrationType: "cycle",
    receipt: {
      serial: "TLY-26-2150",
      date: "OCT 22 · 08:45 AM",
      customer: "S. Lindstrom · Bay #1",
      station: "Stand 01 · Mechanic D. Reyes",
      items: [
        { code: "SRV-TUN", label: "Commuter Drivetrain Overhaul", amount: "$120.00" },
        { code: "PRT-PAD", label: "Shimano L05A Disc Pads (×2)", amount: "$48.00" },
        { code: "ADD-WAX", label: "Ultrasonic Hot Melt Paraffin Wax", amount: "$28.00" },
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
      "Kiln space and wheel seats are tracked with the exact same inventory discipline as our stoneware.",
    owner: "Jun & Tessa Park, Studio Co-Directors",
    metricValue: 100,
    metricSuffix: "%",
    metricLabel: "class seats filled via SMS waitlist",
    secondaryStat: "3.2× faster pickup once fired",
    illustrationType: "kiln",
    receipt: {
      serial: "TLY-26-3325",
      date: "OCT 25 · 02:10 PM",
      customer: "A. Beaumont · Member No. 118",
      station: "Skutt Kiln #3 · Shelf B (Cone 6)",
      items: [
        { code: "SRV-WHL", label: "Open Wheel (2 hrs · Wheel #4)", amount: "$48.00" },
        { code: "SRV-FIR", label: "Half-Shelf Cone 6 Glaze Firing", amount: "$36.00" },
        { code: "ADD-CLY", label: "12 lb Buff Stoneware Pug", amount: "$18.00" },
      ],
      depositPaid: "$51.00 at booking",
      balancePaid: "$51.00 on shelf unload",
      pickupNote: "Shelf B unloaded · Cubby #09 stub verified",
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
    idealFor: "Solo makers and studios starting on Shopify.",
    includedTickets: "Up to 80 tickets / mo · 0% commission",
    features: [
      "Online slot & add-on picker",
      "Upfront deposits in Shopify Checkout",
      "Printable & SMS claim stubs",
      "4-stop customer status tracking",
    ],
  },
  {
    id: "workshop",
    name: "Workshop",
    price: 49,
    cadence: "/ month",
    badge: "Most Small Shops",
    pastel: "mint",
    idealFor: "Neighborhood shops with retail and 2–5 bench bays.",
    includedTickets: "Unlimited tickets · 0% commission",
    features: [
      "Shopify POS tile: scan & print thermal tags",
      "Mid-repair parts pull from Shopify stock",
      "Automated SMS pickup pass & balance link",
      "Multi-staff & bay capacity rules",
    ],
  },
  {
    id: "guild",
    name: "Guild",
    price: 99,
    cadence: "/ month",
    badge: "Multi-Location & Mail-In",
    pastel: "lilac",
    idealFor: "Multi-location shops and national mail-in repair programs.",
    includedTickets: "Unlimited tickets across 5 locations",
    features: [
      "Prepaid mail-in repair kit generator",
      "Before/after bench photo attachments",
      "Shopify Flow & webhook triggers",
      "Dedicated counter onboarding",
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
    question: "Does Tally work with both online Shopify and Shopify POS?",
    tag: "SHOPIFY POS + ONLINE",
    answer:
      "Yes. Customers can book online 24/7 or at your physical counter via Shopify POS. Both channels share the same real-time bench capacity and ticket ledger.",
  },
  {
    id: "deposits",
    question: "How do partial deposits and final pickup balances work?",
    tag: "DEPOSITS & BALANCES",
    answer:
      "You choose the deposit percentage (25%, 50%, or 100%). When work is stamped Ready, Tally texts a one-tap link for the remaining balance and any added parts.",
  },
  {
    id: "physical-goods",
    question: "Can customers buy physical products and services in the same cart?",
    tag: "MIXED CARTS",
    answer:
      "Yes. Shoppers can add goods, attach service labor like hemming, and reserve fitting slots in a single Shopify checkout without split orders.",
  },
  {
    id: "rescheduling",
    question: "What happens when a customer reschedules or cancels?",
    tag: "RESCHEDULE & NO-SHOWS",
    answer:
      "Every claim stub includes a self-serve reschedule link. Within your custom cutoff window, deposits remain non-refundable to protect bench hours.",
  },
  {
    id: "theme-install",
    question: "Will Tally slow down my storefront or require code edits?",
    tag: "THEME 2.0 APP BLOCK",
    answer:
      "No. Tally installs as a lightweight Theme 2.0 app block (< 9 KB) that adopts your store styling automatically. Zero Liquid edits required.",
  },
];
