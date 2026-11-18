export const CLINIC = {
  name: "Snoot",
  address: "12 Lantern Street, Easton",
  phone: "020 7946 0123",
  phoneHref: "tel:+442079460123",
  emergency: "020 7946 0999",
  emergencyHref: "tel:+442079460999",
  email: "hello@snoot.vet",
};

export const NAV = [
  { href: "#checkup", label: "Check-up" },
  { href: "#patients", label: "Patients" },
  { href: "#plans", label: "Plans" },
  { href: "#team", label: "Team" },
  { href: "#visit", label: "Your visit" },
] as const;

export type Patient = { name: string; detail: string; done: string };

/** The waiting-room board. Fictional patients. */
export const PATIENTS: Patient[] = [
  { name: "Biscuit", detail: "4 · spaniel", done: "jabs done" },
  { name: "Marmalade", detail: "12 · moggy", done: "bloods back" },
  { name: "Dumpling", detail: "3 · mini lop", done: "teeth trimmed" },
  { name: "Gerald", detail: "41 · tortoise", done: "woke up fine" },
  { name: "Noodle", detail: "2 · whippet", done: "stitches out" },
  { name: "Mochi", detail: "7 · ragdoll", done: "weigh-in −300 g" },
  { name: "Captain", detail: "9 · labrador", done: "heart sounds great" },
  { name: "Fig", detail: "1 · guinea pig", done: "nails clipped" },
  { name: "Waffles", detail: "5 · corgi", done: "ear drops sorted" },
  { name: "Pesto", detail: "10 · bearded dragon", done: "UV lamp advice" },
];

export type Vet = { name: string; role: string; pet: string; note: string; image: string; alt: string };

export const TEAM: Vet[] = [
  {
    name: "Dr Adaeze Okafor",
    role: "Clinical director",
    pet: "Pudding, retired greyhound",
    note: "Twenty years in practice. Still says hello to the patient before the owner.",
    image: "team-adaeze",
    alt: "Dr Adaeze Okafor kneeling on the clinic floor with Pudding the grey greyhound leaning into her",
  },
  {
    name: "Dr Ruth Lindgren",
    role: "Surgeon",
    pet: "Moth, three-legged tabby",
    note: "Runs both theatres. Moth was her first amputation patient, and never left.",
    image: "team-ruth",
    alt: "Dr Ruth Lindgren in navy scrubs holding a three-legged tabby cat against her shoulder",
  },
  {
    name: "Dr Kenji Arai",
    role: "Exotics",
    pet: "Basil, bearded dragon",
    note: "Rabbits, reptiles, birds and the occasional hedgehog. Keeps a UV lamp in his bag.",
    image: "team-kenji",
    alt: "Dr Kenji Arai smiling with a bearded dragon perched on his forearm",
  },
  {
    name: "Sol Medina RVN",
    role: "Head nurse",
    pet: "Pickle, lop rabbit",
    note: "Runs the weigh-in club and the follow-up calls. Knows every patient's treat order.",
    image: "team-sol",
    alt: "Nurse Sol Medina cradling a lop-eared rabbit, laughing",
  },
];

export type VisitStep = { n: string; title: string; body: string; image: string; alt: string };

export const VISIT_STEPS: VisitStep[] = [
  {
    n: "01",
    title: "Two doors, two waiting rooms",
    body: "Dogs on the left, cats and small pets on the right. No staring contests before anyone is seen.",
    image: "visit-door",
    alt: "A clinic entrance with two painted doors, one marked with a paw and one with a whisker",
  },
  {
    n: "02",
    title: "Treats before needles",
    body: "Five minutes to sniff the room, a lick mat or a dish of greens, and only then the stethoscope.",
    image: "visit-treats",
    alt: "A nurse offering a treat to a nervous beagle in a sunny consult room",
  },
  {
    n: "03",
    title: "The check, on their level",
    body: "Big dogs on a padded floor mat, cats in the bottom of their carrier. Nose to tail, out loud, so you hear it too.",
    image: "visit-floor",
    alt: "A vet sitting cross-legged on the floor listening to a large dog's chest",
  },
  {
    n: "04",
    title: "Out the door with a plan",
    body: "You see the price before we start, and the written plan lands in your inbox before you reach the car.",
    image: "visit-walkout",
    alt: "An owner and a happy dog walking out of a bright clinic door onto the street",
  },
];

export const IMAGE_KEYS = [
  "team-adaeze",
  "team-ruth",
  "team-kenji",
  "team-sol",
  "visit-door",
  "visit-treats",
  "visit-floor",
  "visit-walkout",
  "patient-dog",
  "patient-cat",
  "patient-rabbit",
  "patient-tortoise",
] as const;
