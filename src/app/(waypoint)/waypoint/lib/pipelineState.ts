export type PipelineStage = "pitched" | "in_review" | "panel_round" | "offer_stage";

export interface PipelineCard {
  id: string;
  company: string;
  role: string;
  stage: PipelineStage;
  daysAgo: number;
  highlight?: string;
  contactName?: string;
}

export const STAGES: { id: PipelineStage; label: string }[] = [
  { id: "pitched", label: "Pitched" },
  { id: "in_review", label: "In Review" },
  { id: "panel_round", label: "Panel Round" },
  { id: "offer_stage", label: "Offer Stage" },
];

export const INITIAL_PIPELINE: PipelineCard[] = [
  {
    id: "linear",
    company: "Linear",
    role: "Staff Design Engineer",
    stage: "pitched",
    daysAgo: 2,
    contactName: "Karri",
  },
  {
    id: "stripe",
    company: "Stripe",
    role: "Core Infra Engineer",
    stage: "pitched",
    daysAgo: 4,
    contactName: "David",
  },
  {
    id: "figma",
    company: "Figma",
    role: "Founding Systems Engineer",
    stage: "in_review",
    daysAgo: 7,
    contactName: "Rasmus",
  },
  {
    id: "vercel",
    company: "Vercel",
    role: "Lead Framework Architect",
    stage: "panel_round",
    daysAgo: 11,
    contactName: "Guillermo",
    highlight: "Architecture sync",
  },
  {
    id: "anthropic",
    company: "Anthropic",
    role: "Research Systems",
    stage: "offer_stage",
    daysAgo: 14,
    highlight: "$420k Total Comp",
    contactName: "Elena",
  },
];

const STAGE_ORDER: PipelineStage[] = ["pitched", "in_review", "panel_round", "offer_stage"];

export function advanceCardStage(pipeline: PipelineCard[], cardId: string): PipelineCard[] {
  return pipeline.map((card) => {
    if (card.id !== cardId) return card;
    const currentIndex = STAGE_ORDER.indexOf(card.stage);
    const nextIndex = (currentIndex + 1) % STAGE_ORDER.length;
    return {
      ...card,
      stage: STAGE_ORDER[nextIndex],
    };
  });
}

export function countByStage(pipeline: PipelineCard[]): Record<PipelineStage, number> {
  const initialCounts: Record<PipelineStage, number> = {
    pitched: 0,
    in_review: 0,
    panel_round: 0,
    offer_stage: 0,
  };

  return pipeline.reduce((acc, card) => {
    acc[card.stage] = (acc[card.stage] || 0) + 1;
    return acc;
  }, initialCounts);
}
