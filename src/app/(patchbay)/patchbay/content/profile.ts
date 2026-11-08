export const PROFILE = {
  name: "Noa Lindqvist",
  handle: "noa.lindqvist",
  location: "Gothenburg, SE · UTC+1",
  email: "hello@noalindqvist.example",
  availability: "Booking from January",
  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Read.cv", href: "https://read.cv/" },
  ],
  about: [
    "I started in a print shop, moved to front-end at 22, and have spent the last nine years shipping software at companies with 4 and 4,000 people.",
    "I like the seam between disciplines: the design token that saves a standup, the schema that makes the interface obvious, the eval that makes an AI feature trustworthy.",
  ],
  timeline: [
    { year: "2026", what: "Independent · AI product engineering" },
    { year: "2023", what: "Staff engineer · Harbourlight (payments)" },
    { year: "2020", what: "Senior front-end · Tidewell (retail SaaS)" },
    { year: "2017", what: "Front-end developer · Sixfold Studio" },
  ],
} as const;

export type Profile = typeof PROFILE;
