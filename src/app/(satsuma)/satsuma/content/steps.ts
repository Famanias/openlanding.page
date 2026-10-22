export type Step = { n: string; title: string; body: string; figure: number; unit: string; figureLabel: string };

export const STEPS: readonly Step[] = [
  { n: "01", title: "Send a brief", body: "Tell us the product, the feeling and the platform. A sentence is enough; a moodboard is a bonus.", figure: 60, unit: "sec", figureLabel: "to brief" },
  { n: "02", title: "Meet your maker", body: "We match you with a handpicked maker whose last ten reels look like what you described, then you say yes or ask for another.", figure: 24, unit: "h", figureLabel: "to a match" },
  { n: "03", title: "Peel off your reels", body: "Your maker shoots, cuts and captions. You get finished vertical clips, ready to post, with the raw footage on request.", figure: 5, unit: "days", figureLabel: "to first reels" },
];

export const CATEGORIES: readonly string[] = [
  "Sneakers",
  "Skincare",
  "Coffee",
  "Houseplants",
  "Headphones",
  "Florals",
  "Ceramics",
  "Serums",
  "Candles",
  "Cookware",
];
